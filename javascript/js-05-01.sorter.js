const {createReadStream, createWriteStream} = require("fs")
const consts = require("./js-05-01.const")

async function sorter(fileName) {
    return new Promise(((resolve, reject) => {
        const source = createReadStream(fileName, {highWaterMark: consts.DST_FILE_CAPACITY})
        let data = ""
        source.on("data", chunk => {
            data += chunk.toString()
        })
        source.on("end", () => {
                const dst = createWriteStream(fileName, {highWaterMark: consts.DST_FILE_CAPACITY})
                data
                    .split(consts.NUMBER_SEPARATOR)
                    .filter(s => s !== "")
                    .map(s => +s)
                    .sort((a, b) => {
                        if (a < b) return -1
                        else if (a > b) return 1
                        else return 0
                    })
                    .forEach(n => {
                        const canWrite = dst.write(`${n}${consts.NUMBER_SEPARATOR}`, 'utf8')
                        if (!canWrite) {
                            dst.removeAllListeners("drain")
                            dst.once("drain", () => dst.write(`${n}${consts.NUMBER_SEPARATOR}`))
                        }
                    })
                dst.end()
                resolve()
            },
        )
        source.on("error", err => reject(err))
    }))
}

module.exports = {
    sorter,
}
