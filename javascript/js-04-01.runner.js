// Цель:
//     Напишите NodeJS скрипт tree для вывода списка файлов и папок файловой системы.
//     Результатом работы должен быть объект с массивами { files, folders }.
// Вызовы файловой системы должны быть асинхронными.
//     Скрипт принимает входной параметр - путь до папки.
//     Добавить возможность выполнять этот скрипт через команду npm run tree -- path

const {processFolder} = require("./js-04-01.js")

const args = process.argv.slice(2)
if (args.length < 1) {
    console.log(`Path parameter not specified`)
    console.log(`Usage through npm: npm tree -- <path>`)
    console.log(`or node: node js-04-01.runner.js <path>`)
    console.log(`Attention: path must not end with '\\'`)
    process.exit(-1)
}

const exploredPath = args[0]
console.log(`Found path: ${exploredPath}`);

(async (path) => {
    const result = await processFolder(path, [])
    console.log(JSON.stringify(result))
})(exploredPath)

