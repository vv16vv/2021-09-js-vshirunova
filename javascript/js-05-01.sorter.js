const {createReadStream, createWriteStream} = require("fs")

async function sorter(fileName) {
    return new Promise(((resolve, reject) => {
        const source = createReadStream(fileName)
        let data = []
        source.on("data", chunk => {
            data = data.concat(
                chunk.toString()
                    .split(" ")
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
