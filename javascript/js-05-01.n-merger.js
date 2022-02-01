const {open} = require("fs/promises")
const {finished} = require("stream/promises")

const {Buffer2Number} = require("./js-05-01.Buffer2Number")
const consts = require("./js-05-01.const")

let countW = 0

class File {
    constructor(srcFile, n) {
        this.n = n
        this.srcFile = srcFile
        this.source = srcFile.createReadStream()
        this.transformer = new Buffer2Number()
        this.r = this.source.pipe(this.transformer)

        this.curr = undefined
        this.isFinished = false
        this.count = 0
    }

    async close() {
        await finished(this.r)
        await this.srcFile.close()
    }

    pause() {
        this.r.pause()
    }

    resume() {
        this.r.resume()
    }
}

const processData = (files, dst) => {
    if (files.some(file => (file.curr === undefined) || (file.curr === null && !file.isFinished))) {
        // хотя бы один поток еще не прочитал начальные данные
        // или какие-то потоки данные сдали в выходной поток,
        // но новые данные еще не прочитали
        return
    }

    // потоки, в которых еще есть какие-то данные = незавершенные потоки
    const stillRunningFiles = files.filter(file => file.curr !== null)

    if (stillRunningFiles.length === 0) {
        // Все потоки завершены = из всех файлов прочитаны все числа
        dst.end()
        return
    }

    // сортируем потоки по возрастанию curr, чтобы найти
    // из какого потока сейчас будем брать число
    // stillRunningFiles всегда имеет как минимум 1 поток
    const sorted = stillRunningFiles
        .sort((f1, f2) => {
            if (f1.curr < f2.curr) return -1
            else if (f1.curr > f2.curr) return 1
            else return 0
        })

    sorted
        // в нулевом элементе лежит кандидат на запись
        // заодно отбираем все такие же элементы
        .filter(f => f.curr === sorted[0].curr)
        .forEach(f => {
            // Дополнительная проверка на null,
            // по идее тут никогда null быть не должно
            if (f.curr !== null) {
                write(dst, f.curr)
                f.curr = null
                if (!f.isFinished) {
                    f.resume()
                } else {
                    // если текущий поток завершился, то это значит, что
                    // все остальные потоки сейчас стоят на паузе.
                    // Поэтому вызываем processData еще раз, чтобы
                    // взять следующее число из уже прочитанных и
                    // отправить его на запись. Если таким образом
                    // будут завершены все файлы, то произойдет выход
                    // при проверке выше stillRunningFiles.length === 0
                    processData(files, dst)
                }
            }
        })
}

const write = (dst, data) => {
    // Дополнительная проверка на null - по идее его тут никогда не может быть
    if (data !== null) {
        const canWrite = dst.write(`${data}${consts.NUMBER_SEPARATOR}`)
        countW++
        if (!canWrite) {
            dst.removeAllListeners("drain")
            dst.once("drain", () => write(dst, data))
        }
    }
}

const mergerNFiles = async (fileNames, outputFileName) => {
    const sources = []
    let index = 1
    for (const fileName of fileNames) {
        sources.push(new File(await open(fileName, 'r'), index++))
    }

    const dstFile = await open(outputFileName, 'w')
    const dst = dstFile.createWriteStream({highWaterMark: consts.DST_FILE_CAPACITY, autoClose: true})

    sources.forEach(source => {
        source.r.on("data", chunk => {
            source.count++
            source.curr = +(chunk?.toString()) ?? null
            if (!source.isFinished) {
                source.pause()
            }
            processData(sources, dst)
        })
        source.r.on("end", () => {
            source.isFinished = true
            processData(sources, dst)
        })
    })

    for (const source of sources) {
        await source.close()
    }

    await dstFile.close()

    console.log(`Прочитано ${sources.map(f => f.count).reduce((p,c) => p + c, 0)} чисел, записано ${countW} чисел`)
}

module.exports = {
    mergerNFiles,
}