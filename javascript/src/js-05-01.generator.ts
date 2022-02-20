import {open, mkdir} from "fs/promises"
import {FileHandle} from "fs/promises"
import {once} from "events"
import {sep} from "path"

import {FILES} from "./js-05-01.const"
import {NUMBER_SEPARATOR} from "./js-05-01.const"
import {SRC_FILE_CAPACITY} from "./js-05-01.const"
import {MAX_NUMBER} from "./js-05-01.const"
import {MIN_NUMBER} from "./js-05-01.const"
import {FILENAME} from "./js-05-01.const"

const args = process.argv.slice(2)

const nextRandomNumber = (minNumber: number, maxNumber: number): number => {
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber)
}

const generator = async (fileName: string, minNumber: number, maxNumber: number, capacity: number) => {
    await mkdir(FILES, {recursive: true})

    const dstFileName: string = `${FILES}${sep}${fileName}`
    const dstHandler: FileHandle = await open(dstFileName, 'w')
    const file = dstHandler.createWriteStream()

    let canWrite = true
    let remainder = capacity

    while (remainder > 0) {
        const newNumber = `${nextRandomNumber(minNumber, maxNumber)}${NUMBER_SEPARATOR}`
        remainder -= newNumber.length

        canWrite = file.write(Buffer.from(newNumber, 'utf8'))
        if (!canWrite) {
            await once(file, 'drain')
        }
    }

    return dstFileName
}

(async (args) => {
    const label = "generator"

    const fileName = args.length >= 1 ? args[0] : FILENAME
    const minNumber = args.length >= 2 ? args[1] : MIN_NUMBER
    const maxNumber = args.length >= 3 ? args[2] : MAX_NUMBER
    const capacity = args.length >= 4 ? args[3] : SRC_FILE_CAPACITY

    console.time(label)
    const generated = await generator(fileName, +minNumber, +maxNumber, +capacity)
    console.timeEnd(label)
    console.log(`File '${generated}' generated`)
})(args)
