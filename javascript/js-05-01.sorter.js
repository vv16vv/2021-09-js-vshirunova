const {createReadStream, createWriteStream} = require("fs")
const consts = require("./js-05-01.const");

async function sorter(fileName) {
    return new Promise(((resolve, reject) => {
        const source = createReadStream(fileName)
        let data = []
        source.on("data", chunk => {
            data = data.concat(
                chunk.toString()
                    .split(consts.NUMBER_SEPARATOR)
                    .map(s => +s),
            )
        })
        source.on("end", () => {
                const result = data.sort((a, b) => {
                    if (a < b) return -1
                    else if (a > b) return 1
                    else return 0
                })
                    .map(s => `${s}`)
                    .join(" ")
                const dst = createWriteStream(fileName)
                dst.end(result, 'utf8')
            resolve()
            },
        )
        source.on("error", err => reject(err))
    }))
}

module.exports = {
    sorter,
}
