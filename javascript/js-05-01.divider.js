const path = require("path")
const {createReadStream, createWriteStream} = require("fs")

const utils = require("./js-05-01.const")
const consts = require("./js-05-01.const");

// srcFileName - имя исходного большого файла.
// dstCapacity - примерный размер файлов, на которые будет нарезан исходный.
// Функция возвращает количество получившихся файлов.
const divider = async (srcFileName, dstCapacity) => {
    const source = createReadStream(`${utils.FILES}${path.sep}${srcFileName}`, {highWaterMark: dstCapacity})
    return new Promise(((resolve, reject) => {
        let counter = 0
        let prev = ""
        source.on("data", (data) => {
            if (data !== null) {
                counter++
                const target = createWriteStream(utils.getFileName(srcFileName, counter))
                const lastSpace = data.lastIndexOf(consts.NUMBER_SEPARATOR)
                const numbers = (prev + data.slice(0, lastSpace))
                    .split(consts.NUMBER_SEPARATOR)
                    .sort((a, b) => +a - +b)
                    .join(consts.NUMBER_SEPARATOR)
                target.end(numbers)
                prev = data.slice(lastSpace + 1)
            }
        })
        source.on("end", () => resolve(counter))
        source.on("error", error => reject(error))
    }))
}

module.exports = {
    divider
}