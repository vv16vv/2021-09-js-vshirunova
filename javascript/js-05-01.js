/*
Необходимо отсортировать большой файл со случайными целыми числами, размером 100 МБ,
в условиях ограниченной оперативной памяти - 50 МБ.
Решение должно быть построено с использованием потоков.

Для решения задачи можно использовать алгоритм “Сортировка слиянием”.
Процесс можно разделить на 3 этапа.

Этап 0
Любым удобным вам способом создаем исходный файл с числами размером 100 МБ.

Этап 1
Исходный файл с числами необходимо разбить на несколько файлов поменьше,
предварительно отсортировав их независимо друг от друга.

Этап 2
Необходимо создать механизм чтения чисел сразу из нескольких файлов (потоков).
Читать данные из потоков следует по принципу pause/resume.

Этап 3
Необходимо создать цикл, который будет работать с данными сразу из всех потоков.
Такой цикл будет прерван только тогда, когда будут полностью прочитаны все файлы.
В цикле следует искать наименьшее значение и записывать его в итоговый файл.
1 итерация = 1 число

Для проверки решения, скрипт необходимо запустить командой
$ node --max-old-space-size=50 script.js
* */

/*
* Как запускать:
* запустить файл js-05-01.generator.js чтобы сгенерировать большой файл
* запустить файл js-05-01.js - он разрежет большой файл на кусочки, отсортирует эти кусочки,
* а потом будет сливать их в один файл.
*
* Проблема:
* При сливании файла на второй итерации программа падает без каких-либо эксепшенов.
* Падение происходит на строчке 112 в файле js-05-01.merger.js - await finishedPromise(dst)
* на ожидании, когда закончится запись в выходной поток.
* Запуск отдельно взятого merger с любыми парами файлов отрабатывает нормально.
* Проблема воспроизводится только при общем запуске.
* */

const {renameSync, rmSync} = require("fs");

const utils = require("./js-05-01.const");
const {sorter} = require("./js-05-01.sorter");
const {divider} = require("./js-05-01.divider");
const {merger2files} = require("./js-05-01.merger");

(async (fileName) => {
    const label = "merger"

    // Нарезка исходного файла ~ 1.112 sec
    console.time(label)
    const counter = await divider(fileName, utils.DST_FILE_CAPACITY)
    console.log(`Исходный файл разрезан на ${counter} небольших файлов`)
    console.timeLog(label)

    // Сортировка частей ~13.523 sec - так долго,
    // т.к. файлы сортируются последовательно, чтобы уложиться
    // в ограниченную память
    let chain = Promise.resolve()
    for (let key = 1; key <= counter; key++) {
        chain = chain
            .then(() => sorter(utils.getFileName(fileName, key)))
            .catch(err => console.error(`Failed: ${err}`))
    }
    await chain
    console.log('Частичные файлы отсортированы')
    console.timeLog(label)

    let firstFile = utils.getFileName(fileName, 1)
    const resultFile = utils.getResultFileName(fileName)
    let outputFile;

    process.on("uncaughtException", err => console.error(err))
    process.on("unhandledRejection", err => console.error(err))

    for (let key = 2; key <= counter; key++) {
        const secondFile = utils.getFileName(fileName, key)
        outputFile = utils.getTempFileName(key)
        console.log(`key=${key}: Going to merge '${firstFile}' and '${secondFile}' to '${outputFile}'`)
        try {
            await merger2files(firstFile, secondFile, outputFile)
            console.timeLog(label)
        } catch (err) {
            console.error(`Failed: ${err}`)
        }
        rmSync(firstFile, {force: true})
        rmSync(secondFile, {force: true})
        firstFile = outputFile
        console.log(`key=${key} end of cycle`)
    }

    renameSync(outputFile, resultFile)

    console.timeEnd(label)
})(utils.FILENAME)
