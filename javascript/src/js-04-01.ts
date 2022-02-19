import {opendir} from "fs/promises"
import {Dir} from "fs"
import {sep} from "path"

interface Folder {
    [key: string]: Array<FileObject>
}

type File = string
export type FileObject = Folder | File

export const processFolder = async (localPath: string, parent: Array<FileObject>): Promise<Array<FileObject>> => {
    try {
        const folder: Dir = await opendir(localPath)
        for await (const dirent of folder) {
            if (dirent.isFile()) {
                parent.push(dirent.name as File)
            } else if (dirent.isDirectory()) {
                const array: Array<FileObject> = await processFolder(`${localPath}${localPath.endsWith(sep) ? "" : sep}${dirent.name}`, [])
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
