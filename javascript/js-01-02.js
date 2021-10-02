// Домашнее задание №1-2
// Написать функцию sum, которая может быть исполнена любое количество раз с не undefined аргументом.
//     Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.
//
// sum(1)(2)(3)....(n)() === 1 + 2 + 3 + ... + n

function sum(n1) {
    let s = +n1

    function innerSum(n2) {
        if (typeof n2 === "undefined")
            return s
        s += +n2
        return innerSum
    }

    return innerSum
}

module.exports = sum