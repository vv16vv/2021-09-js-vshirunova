jest.mock("process")
jest.mock("fs/promises")

const fsPromises = require("fs/promises")
import {processFolder, FileObject} from "./js-04-01"

describe("processFolder", () => {
    const FILES = [
        "C:\\folder1\\file11.txt",
        "C:\\folder1\\file12.txt",
        "C:\\folder2\\file21.txt",
        "C:\\folder2\\folder21\\file211.txt",
        "C:\\folder2\\folder21\\file212.txt",
        "C:\\folder2\\folder22\\file221.txt",
        "C:\\file1.txt",
    ]
    it("should return list of files if a folder contains only them - 1", async () => {
        fsPromises.__setMockFiles(FILES)
        const actual: Array<FileObject> = await processFolder("C:\\folder2\\folder22", [])
        expect(actual).toStrictEqual(["file221.txt"])

    })
    it("should return list of files if a folder contains only them - 2", async () => {
        fsPromises.__setMockFiles(FILES)
        const actual: Array<FileObject> = await processFolder("C:\\folder1", [])
        expect(actual).toStrictEqual([
            "file11.txt",
            "file12.txt",
        ])

    })
    it("should return list of files including directories", async () => {
        fsPromises.__setMockFiles(FILES)

        const actual: Array<FileObject> = await processFolder("C:\\folder2\\", [])
        const expected: Array<FileObject> = [
            "file21.txt",
            {
                "folder21":
                    [
                        "file211.txt",
                        "file212.txt",
                    ],
            },
            {
                "folder22":
                    [
                        "file221.txt",
                    ],
            },
        ]

        expect(actual).toStrictEqual(expected)
    })
    it("should return list of files including directories - entire tree", async () => {
        fsPromises.__setMockFiles(FILES)

        const actual: Array<FileObject> = await processFolder("C:\\", [])
        const expected: Array<FileObject> = [
            {
                "folder1": [
                    "file11.txt",
                    "file12.txt",
                ],
            },
            {
                "folder2": [
                    "file21.txt",
                    {
                        "folder21": [
                            "file211.txt",
                            "file212.txt",
                        ],
                    },
                    {
                        "folder22": [
                            "file221.txt",
                        ],
                    },
                ],
            },
            "file1.txt",
        ]
        expect(actual).toStrictEqual(expected)
    })
})
