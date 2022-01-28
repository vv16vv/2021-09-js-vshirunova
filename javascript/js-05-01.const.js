const path = require("path")
const FILES = "files"
const FILENAME = "generated.txt"
const NUMBER_SEPARATOR = " "
const MIN_NUMBER = 0
const MAX_NUMBER = 100000
const SRC_FILE_CAPACITY = 104857600 // ~100MB
const DST_FILE_CAPACITY = 10485761 // ~10MB

const getFileName = (name, order) => {
    const srcObject = path.parse(name)
    return `./${FILES}${path.sep}${srcObject.name}.${("00000" + order).slice(-5)}${srcObject.ext}`
}

const getResultFileName = (name) => {
    const srcObject = path.parse(name)
    return `./${FILES}${path.sep}${srcObject.name}.result${srcObject.ext}`
}

const getTempFileName = (order) => {
    const orderString = order !== undefined ? `.${("00000" + order).slice(-5)}` : ""
    return `./${FILES}${path.sep}output${orderString}.txt`
}

module.exports = {
    FILES, FILENAME, NUMBER_SEPARATOR,
    MIN_NUMBER, MAX_NUMBER,
    SRC_FILE_CAPACITY, DST_FILE_CAPACITY,
    getFileName, getResultFileName, getTempFileName
}