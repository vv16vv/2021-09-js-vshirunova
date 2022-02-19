jest.mock("path")
import path from "path"

const {dirname, basename} = jest.requireActual("path")

const promises = jest.genMockFromModule('fs/promises')

let mockFiles = Object.create(null)

const __setMockFiles = (newMockFiles: Array<string>): void => {
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

interface DirEntry {
    name: string,
    isDirectory: () => boolean,
    isFile: () => boolean
}

const opendir = (folderPath: string): Promise<Array<DirEntry>> => {
    if (!folderPath.endsWith(path.sep)) folderPath += path.sep
    const dirents: Map<string, DirEntry> = new Map()
    Object.entries<Array<string>>(mockFiles)
        .filter(([key]) =>
            key.startsWith(folderPath),
        )
        .forEach(([key, names]) => {
            const isFile: boolean = key === folderPath
            const folderName: string = isFile ? "" : key.replace(folderPath, "").split(path.sep)[0]
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
        ? Promise.resolve(Array.from(dirents.values()))
        : Promise.reject(new Error(`${folderPath} not found`))
}

(promises as any).__setMockFiles = __setMockFiles;
(promises as any).opendir = opendir;

module.exports = promises