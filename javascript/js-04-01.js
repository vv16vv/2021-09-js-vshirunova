const fsPromises = require("fs/promises")
const path = require("path")

const processFolder = async (localPath, parent) => {
    try {
        const folder = await fsPromises.opendir(localPath)
        for await (const dirent of folder) {
            if (dirent.isFile()) {
                parent.push(dirent.name)
            } else if (dirent.isDirectory()) {
                const array = await processFolder(`${localPath}${localPath.endsWith(path.sep) ? "" : path.sep}${dirent.name}`, [])
                parent.push({
                    [dirent.name]: array,
                })
            }
        }
        return parent
    } catch (e) {
        console.error(e.message)
        process.exit(-1)
    }
}

module.exports = {
    processFolder
}