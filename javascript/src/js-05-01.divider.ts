import {sep} from "path"
import {
    createReadStream,
    createWriteStream,
    ReadStream,
} from "fs"

import {FILES} from "./js-05-01.const"
import {getFileName} from "./js-05-01.const"
import {NUMBER_SEPARATOR} from "./js-05-01.const"

// srcFileName - имя исходного большого файла.
// dstCapacity - примерный размер файлов, на которые будет нарезан исходный.
// Функция возвращает количество получившихся файлов.
export const divider = async (srcFileName: string, dstCapacity: number): Promise<number> => {
    const source: ReadStream = createReadStream(`${FILES}${sep}${srcFileName}`, {highWaterMark: dstCapacity})
    return new Promise(((resolve, reject) => {
        let counter = 0
        let prev = ""
        source.on("data", (data) => {
            if (data !== null) {
                counter++
                const target = createWriteStream(getFileName(srcFileName, counter))
                const lastSpace = data.lastIndexOf(NUMBER_SEPARATOR)
                const numbers = (prev + data.slice(0, lastSpace))
                    .split(NUMBER_SEPARATOR)
                    .sort((a, b) => +a - +b)
                    .join(NUMBER_SEPARATOR)
                target.end(numbers)
                prev = data.slice(lastSpace + 1).toString()
            }
        })
        source.on("end", () => resolve(counter))
        source.on("error", error => reject(error))
    }))
}
