const {open, mkdir} = require("fs/promises");
const {once} = require("events")
const {sep} = require("path")

const consts = require("./js-05-01.const")

const args = process.argv.slice(2)

const nextRandomNumber = (minNumber, maxNumber) => {
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber)
}

const generator = async (fileName, minNumber, maxNumber, capacity) => {
    await mkdir(consts.FILES, {recursive: true})

    const dstFileName = `${consts.FILES}${sep}${fileName}`
    const dstHandler = await open(dstFileName, 'w')
    const file = dstHandler.createWriteStream()

    let canWrite = true
    let remainder = capacity

    while (remainder > 0) {
        const newNumber = `${nextRandomNumber(minNumber, maxNumber)} `
        remainder -= newNumber.length

        canWrite = file.write(Buffer.from(newNumber, 'utf8'))
        if (!canWrite) {
            await once(file, 'drain')
        }
    }
}

(async (args) => {
    const label = "generator"

    const fileName = args.length >= 1 ? args[0] : consts.FILENAME
    const minNumber = args.length >= 2 ? args[1] : consts.MIN_NUMBER
    const maxNumber = args.length >= 3 ? args[2] : consts.MAX_NUMBER
    const capacity = args.length >= 4 ? args[3] : consts.SRC_FILE_CAPACITY

    console.time(label)
    await generator(fileName, minNumber, maxNumber, capacity)
    console.timeLog("generator")
    console.timeEnd(label)
})(args)
