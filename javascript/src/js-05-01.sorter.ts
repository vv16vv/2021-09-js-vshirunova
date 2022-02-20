import {createReadStream, createWriteStream} from "fs"

import {
    DST_FILE_CAPACITY,
    NUMBER_SEPARATOR,
} from "./js-05-01.const"

export async function sorter(fileName: string): Promise<void> {
    return new Promise(((resolve, reject) => {
        const source = createReadStream(fileName, {highWaterMark: DST_FILE_CAPACITY})
        let data = ""
        source.on("data", chunk => {
            data += chunk.toString()
        })
        source.on("end", () => {
                const dst = createWriteStream(fileName, {highWaterMark: DST_FILE_CAPACITY})
                data
                    .split(NUMBER_SEPARATOR)
                    .filter(s => s !== "")
                    .map(s => +s)
                    .sort((a, b) => a - b)
                    .forEach(n => {
                        const canWrite = dst.write(`${n}${NUMBER_SEPARATOR}`, 'utf8')
                        if (!canWrite) {
                            dst.removeAllListeners("drain")
                            dst.once("drain", () => dst.write(`${n}${NUMBER_SEPARATOR}`))
                        }
                    })
                dst.end()
                resolve()
            },
        )
        source.on("error", err => reject(err))
    }))
}
