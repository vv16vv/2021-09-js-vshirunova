// Домашнее задание №1-2
// Написать функцию sum, которая может быть исполнена любое количество раз с не undefined аргументом.
//     Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.
//
// sum(1)(2)(3)....(n)() === 1 + 2 + 3 + ... + n

type SummandType = number | string
type IntermediateType = (n?: SummandType) => IntermediateType
type FunctionSumType = IntermediateType | number

export function sum(n1?: SummandType): IntermediateType {
    let s: number = +n1

    function innerSum(n2?: SummandType): FunctionSumType {
        if (typeof n2 === "undefined")
            return s
        s += +n2
        return innerSum as IntermediateType
    }

    return innerSum as IntermediateType
}
