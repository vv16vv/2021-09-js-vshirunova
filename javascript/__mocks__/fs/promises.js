'use strict'

jest.mock("path")
const path = require("path")
const {dirname, basename} = jest.requireActual("path")

const promises = jest.createMockFromModule('fs/promises')

let mockFiles = Object.create(null)

function __setMockFiles(newMockFiles) {
    mockFiles = Object.create(null)
    for (const file of newMockFiles) {
        let dir = dirname(file)
        if (!dir.endsWith(path.sep)) dir += path.sep
        if (!mockFiles[dir]) {
            mockFiles[dir] = []
        }
        mockFiles[dir].push(basename(file))
    }
}

function opendir(folderPath) {
    if (!folderPath.endsWith(path.sep)) folderPath += path.sep
    const dirents = new Map()
    Object.entries(mockFiles)
        .filter(([key, value]) =>
            key.startsWith(folderPath),
        )
        .forEach(([key, names]) => {
            const isFile = key === folderPath
            const folderName = isFile ? "" : key.replace(folderPath, "").split(path.sep)[0]
            if (isFile) {
                for (const name of names) {
                    dirents.set(name, {
                        isDirectory: () => !isFile,
                        isFile: () => isFile,
                        name: name,
                    })
                }
            } else if (!dirents.has(folderName)) {
                dirents.set(folderName, {
                    isDirectory: () => !isFile,
                    isFile: () => isFile,
                    name: folderName,
                })
            }
        })
    return dirents.size > 0
        ? Promise.resolve(dirents.values())
        : Promise.reject(new Error(`${folderPath} not found`))
}

promises.__setMockFiles = __setMockFiles
promises.opendir = opendir

module.exports = promises