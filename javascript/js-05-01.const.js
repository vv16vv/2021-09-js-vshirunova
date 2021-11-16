const path = require("path")
const FILES = "files"
const FILENAME = "generated.txt"
const MIN_NUMBER = 0
const MAX_NUMBER = 100000
const SRC_FILE_CAPACITY = 104857600 // ~100MB
const DST_FILE_CAPACITY = 50 * 1024 // ~50KB

const getFileName = (name, order) => {
    const srcObject = path.parse(name)
    return `${FILES}${path.sep}${srcObject.name}.${("00000" + order).slice(-5)}${srcObject.ext}`
}

module.exports = {
    FILES, FILENAME, MIN_NUMBER, MAX_NUMBER, SRC_FILE_CAPACITY, DST_FILE_CAPACITY, getFileName
}