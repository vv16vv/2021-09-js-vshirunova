import {
    parse,
    ParsedPath,
    sep,
} from "path"

export const FILES = "files"
export const FILENAME = "generated.txt"
export const NUMBER_SEPARATOR = " "
export const MIN_NUMBER = 0
export const MAX_NUMBER = 100000
export const SRC_FILE_CAPACITY = 104857600 // ~100MB
export const DST_FILE_CAPACITY = 5485761  // ~5MB
export const MEGA = 1024 * 1024
export const WATERMARK = 1024 // ~30kB

export const getFileName = (name: string, order: number): string => {
    const srcObject: ParsedPath = parse(name)
    return `./${FILES}${sep}${srcObject.name}.${("00000" + order).slice(-5)}${srcObject.ext}`
}

export const getResultFileName = (name: string): string => {
    const srcObject: ParsedPath = parse(name)
    return `./${FILES}${sep}${srcObject.name}.result${srcObject.ext}`
}

export const getTempFileName = (order: number = undefined): string => {
    const orderString = order !== undefined ? `.${("00000" + order).slice(-5)}` : ""
    return `./${FILES}${sep}output${orderString}.txt`
}

export const memoryReport = (): string => {
    const total = Math.round(process.memoryUsage().heapTotal / MEGA)
    const used = Math.round(process.memoryUsage().heapUsed / MEGA)
    const free = total - used
    return `total=${total}Mb, used=${used}Mb, free=${free}Mb`
}
