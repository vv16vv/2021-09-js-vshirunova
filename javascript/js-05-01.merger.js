const {open} = require("fs/promises")
const {finished} = require("stream")
const util = require("util")
const path = require("path")

const finishedPromise = util.promisify(finished)

const {Buffer2Number} = require("./js-05-01.Buffer2Number")

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

    const write = async (data) => {
        const canWrite = dst.write(data);
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
            // первый поток закончился
            if (curr2 !== null) await write(`${curr2} `)
            curr2 = null
            if (!r2.isFinished()) r2.resume()
            return
        }
        if (curr2 === null) {
            // второй поток закончился
            await write(`${curr1} `)
            curr1 = null
            if(!r1.isFinished()) r1.resume()
            return
        }
        if (+curr1 <= +curr2) {
            await write(`${curr1} `)
            curr1 = null
            if(r1.isFinished()) {
                await write(`${curr2} `)
                curr2 = null
                r2.resume()
                return
            }
            else r1.resume()
        } else {
            await write(`${curr2} `)
            curr2 = null
            if(r2.isFinished()) {
                await write(`${curr1} `)
                curr1 = null
                r1.resume()
                return
            }
            else r2.resume()
        }
        if (r1.isFinished() && r2.isFinished()) {
            // оба потока закончились
            dst.end()
        }
    }

    r1.on("data", async chunk => {
        curr1 = chunk?.toString() ?? null
        r1.pause()
        await processData()
    })

    r2.on("data", chunk => {
        curr2 = chunk?.toString() ?? null
        r2.pause()
        await processData()
    })

    await finishedPromise(r1)
    await finishedPromise(r2)
    await finishedPromise(dst)
}

(async () => {
    const label = "merger2files"
    console.time(label)
    await merger2files(
        `files${path.sep}generated.00001.txt`,
        `files${path.sep}generated.00002.txt`,
        `files${path.sep}output.txt`,
    )
    console.timeLog(label)
    console.timeEnd(label)
})()