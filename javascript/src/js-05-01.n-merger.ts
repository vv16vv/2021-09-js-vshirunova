import {open} from "fs/promises"
import {finished} from "stream/promises"

import {Buffer2Number} from "./js-05-01.Buffer2Number"
import {WATERMARK} from "./js-05-01.const"
import {FileHandle} from "fs/promises"
import {ReadStream, WriteStream} from "fs"
import {NUMBER_SEPARATOR} from "./js-05-01.const"

let countW = 0

class File {
    private readonly n: number
    private readonly srcFile: FileHandle
    private readonly source: ReadStream
    private readonly transformer: Buffer2Number
    readonly r: Buffer2Number

    curr: number | null
    isFinished: boolean
    count: number

    constructor(srcFile: FileHandle, n: number) {
        this.n = n
        this.srcFile = srcFile
        this.source = srcFile.createReadStream({highWaterMark: WATERMARK})
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

const processData = (files: Array<File>, dst: WriteStream) => {
    if (files.some((file: File) => (file.curr === undefined) || (file.curr === null && !file.isFinished))) {
        // хотя бы один поток еще не прочитал начальные данные
        // или какие-то потоки сдали данные в выходной поток,
        // но новые данные еще не прочитали
        return
    }

    // потоки, в которых еще есть какие-то данные = незавершенные потоки
    const stillRunningFiles: Array<File> = files.filter(file => file.curr !== null)

    if (stillRunningFiles.length === 0) {
        // Все потоки завершены = из всех файлов прочитаны все числа
        dst.end()
        return
    }

    // сортируем потоки по возрастанию curr, чтобы найти
    // из какого потока сейчас будем брать число
    // stillRunningFiles всегда имеет как минимум 1 поток
    const sorted: Array<File> = stillRunningFiles
        .sort((f1, f2) => f1.curr - f2.curr)

    sorted
        // в нулевом элементе лежит кандидат на запись
        // заодно отбираем все такие же элементы
        .filter((f: File) => f.curr === sorted[0].curr)
        .forEach((f: File) => {
            // Дополнительная проверка на null,
            // по идее тут никогда null быть не должно
            if (f.curr !== null) {
                write(dst, f.curr)
                f.curr = null
                if (!f.isFinished) {
                    f.resume()
                } else {
                    // Если текущий поток завершился, то это значит, что
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

const write = (dst: WriteStream, data: number | null) => {
    // Дополнительная проверка на null - по идее его тут никогда не может быть
    if (data !== null) {
        const canWrite = dst.write(`${data}${NUMBER_SEPARATOR}`)
        countW++
        if (!canWrite) {
            dst.removeAllListeners("drain")
            dst.once("drain", () => write(dst, data))
        }
    }
}

export const mergerNFiles = async (fileNames: string[], outputFileName: string): Promise<void> => {
    const sources: Array<File> = []
    let index = 1
    for (const fileName of fileNames) {
        sources.push(new File(await open(fileName, 'r'), index++))
    }

    const dstFile: FileHandle = await open(outputFileName, 'w')
    const dst: WriteStream = dstFile.createWriteStream({autoClose: true})

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

    console.log(`Прочитано ${sources.map(f => f.count).reduce((p, c) => p + c, 0)} чисел, записано ${countW} чисел`)
}
