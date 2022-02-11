// Написать функцию
//
// promiseReduce(asyncFunctions, reduce, initialValue)
//
// asyncFunctions - массив асинхронных функций, возвращающих промис
// reduce(memo, value) - функция, которая будет вызвана для каждого успешно завершившегося промиса.
// initialValue - стартовое значение для функции reduce
//
// promiseReduce последовательно вызывает переданные асинхронные функции
// и выполняет reduce функцию сразу при получении результата до вызова следующей асинхронной функции.
// Функция promiseReduce должна возвращать промис с конечным результатом.
//
// Пример использования
//
// var fn1 = () => {
//     console.log('fn1')
//     return Promise.resolve(1)
// }
//
// var fn2 = () => new Promise(resolve => {
//     console.log('fn2')
//     setTimeout(() => resolve(2), 1000)
// })
//
// function promiseReduce(asyncFunctions, reduce, initialValue) {
//     /*
//      * Реализация
//      */
// }
//
// promiseReduce(
//     [fn1, fn2],
//     function (memo, value) {
//         console.log('reduce')
//         return memo * value
//     },
//     1
// )
//     .then(console.log)
// Вывод в консоль
//
// fn1
// reduce
// fn2
// reduce
// 2
//

export type AsyncFunctionType<T> = () => Promise<T>
export type ReducerType<T> = (acc: T, value: T) => T

export function promiseReduce<T>(
    asyncFunctions: Array<AsyncFunctionType<T>>,
    reducer: ReducerType<T>,
    initialValue: T
): Promise<T> {
    let result: T = initialValue

    return asyncFunctions.reduce(
        (chain, asyncFunction) => chain
                .then(() => asyncFunction())
                .then((r: T) => {
                    result = reducer(result, r)
                    return result
                })
                .catch((reason: any) => {
                    console.log(`Failed: reason = ${reason}`)
                    return Promise.reject<T>(reason)
                }),
        Promise.resolve<T>(initialValue)
    )
}
