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

const {rmSync} = require("fs");

const utils = require("./js-05-01.const")
const {divider} = require("./js-05-01.divider")
const {mergerNFiles} = require("./js-05-01.n-merger");

(async (fileName) => {
    const label = "merger"

    console.time(label)
    const counter = await divider(fileName, utils.DST_FILE_CAPACITY)
    console.log(`Исходный файл разрезан на ${counter} небольших файлов`)
    console.timeLog(label)

    const fileNames = []
    for (let i = 0; i < counter; i++) {
        fileNames.push(utils.getFileName(fileName, i + 1))
    }

    const resultFile = utils.getResultFileName(fileName)
    await mergerNFiles(fileNames, resultFile)
    console.log(`Промежуточные файлы слиты в один`)
    console.timeLog(label)

    for (let i = 0; i < counter; i++) {
        rmSync(utils.getFileName(fileName, i + 1), {force: true})
    }
    console.log(`Промежуточные файлы удалены`)

    console.timeEnd(label)
})(utils.FILENAME)
