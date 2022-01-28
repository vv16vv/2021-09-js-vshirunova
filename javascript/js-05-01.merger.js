const {open} = require("fs/promises")
const {finished} = require("stream/promises")

const {Buffer2Number} = require("./js-05-01.Buffer2Number")
const consts = require("./js-05-01.const");

let countR1 = 0
let countR2 = 0
let countW = 0

const merger2files = async (fileName1, fileName2, outputFileName) => {
    const srcFile1 = await open(fileName1, 'r')
    const srcFile2 = await open(fileName2, 'r')

    const source1 = srcFile1.createReadStream()
    const source2 = srcFile2.createReadStream()

    const dstFile = await open(outputFileName, 'w')
    const dst = dstFile.createWriteStream()

    const transformer1 = new Buffer2Number()
    const transformer2 = new Buffer2Number()

    let curr1 = undefined
    let curr2 = undefined

    const r1 = source1.pipe(transformer1)
    const r2 = source2.pipe(transformer2)

    let isR1Finished = false
    let isR2Finished = false

    const write = (data) => {
        const canWrite = dst.write(`${data}${consts.NUMBER_SEPARATOR}`);
        countW++
        if (!canWrite) {
            dst.removeAllListeners("drain")
            dst.once("drain", () => write(data))
        }
    }

    const processData = () => {
        if (curr1 === undefined || curr2 === undefined) {
            // хотя бы один поток еще не прочитал данные
            return
        }
        if (curr1 === null) { // либо в последний раз мы читали из потока 1, либо поток 1 закончился
            if (curr2 !== null) write(curr2)
            curr2 = null
            if (!isR2Finished) r2.resume()
            else {
                if (isR1Finished && isR2Finished && !dst.writableEnded) dst.end()
            }
            return
        }
        if (curr2 === null) {
            write(curr1)
            curr1 = null
            if (!isR1Finished) r1.resume()
            else {
                if (isR1Finished && isR2Finished && !dst.writableEnded) dst.end()
            }
            return
        }
        if (+curr1 <= +curr2) {
            write(curr1)
            curr1 = null
            if (isR1Finished && !isR2Finished) r2.resume()
            else r1.resume()
        } else {
            write(curr2)
            curr2 = null
            if (isR2Finished && !isR1Finished) r1.resume()
            else r2.resume()
        }
    }

    r1.on("data", chunk => {
        countR1++
        curr1 = chunk?.toString() ?? null
        r1.pause()
        if(curr1 !== null) {
            processData()
        }
    })

    r2.on("data", chunk => {
        countR2++
        curr2 = chunk?.toString() ?? null
        r2.pause()
        if(curr2 !== null) {
            processData()
        }
    })

    r1.on("end", () => {
        isR1Finished = true
        if (!isR2Finished) {
            processData()
        }
    })

    r2.on("end", () => {
        isR2Finished = true
        if (!isR1Finished) {
            processData()
        }
    })

    await finished(r1)
    await finished(r2)

    await srcFile1.close()
    await srcFile2.close()
    await dstFile.close()
}

const testMerger = async () => {
    const label = "merger2files"
    console.time(label)
    await merger2files(
        consts.getFileName(consts.FILENAME, 1),
        consts.getFileName(consts.FILENAME, 2),
        consts.getTempFileName(),
    )
    console.timeEnd(label)
    console.log(`Слияние: первый файл = ${countR1} чисел, второй файл = ${countR2} чисел, итоговый файл = ${countW} чисел`)
}

// testMerger()

module.exports = {
    merger2files,
}