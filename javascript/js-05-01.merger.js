const {open} = require("fs/promises")
const {finished} = require("stream")
const util = require("util")
const path = require("path")

const finishedPromise = util.promisify(finished)

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

    const write = async (data) => {
        const canWrite = dst.write(`${data}${consts.NUMBER_SEPARATOR}`);
        countW++
        if (!canWrite) {
            dst.removeAllListeners("drain")
            dst.once("drain", () => write(data))
        }
    }

    const processData = async () => {
        if (curr1 === undefined || curr2 === undefined) {
            // хотя бы один поток еще не прочитал данные
            return
        }
        if (curr1 === null) {
            if (curr2 !== null) await write(curr2)
            curr2 = null
            if (!isR2Finished) await r2.resume()
            else {
                if (!dst.writableEnded) await dst.end()
            }
            return
        }
        if (curr2 === null) {
            await write(curr1)
            curr1 = null
            if (!isR1Finished) r1.resume()
            else {
                if (!dst.writableEnded) await dst.end()
            }
            return
        }
        if (+curr1 <= +curr2) {
            await write(curr1)
            curr1 = null
            if (isR1Finished && !isR2Finished) await r2.resume()
            else await r1.resume()
        } else {
            await write(curr2)
            curr2 = null
            if (isR2Finished && !isR1Finished) await r1.resume()
            else await r2.resume()
        }
    }

    r1.on("data", async chunk => {
        countR1++
        curr1 = chunk?.toString() ?? null
        await r1.pause()
        await processData()
    })

    r2.on("data", async chunk => {
        countR2++
        curr2 = chunk?.toString() ?? null
        await r2.pause()
        await processData()
    })

    r1.on("end", async () => {
        isR1Finished = true
        if (!isR2Finished) {
            await processData()
        }
    })

    r2.on("end", async () => {
        isR2Finished = true
        if (!isR1Finished) {
            await processData()
        }
    })

    await finishedPromise(r1)
    await finishedPromise(r2)
    await finishedPromise(dst)
}

const testMerger = async () => {
    const label = "merger2files"
    console.time(label)
    await merger2files(
        `files${path.sep}generated.00001.txt`,
        `files${path.sep}generated.00002.txt`,
        `files${path.sep}output.txt`,
    )
    console.timeEnd(label)
    console.log(`Слияние: первый файл = ${countR1} чисел, второй файл = ${countR2} чисел, итоговый файл = ${countW} чисел`)
}

module.exports = {
    merger2files,
}