const promiseReduce = require("./js-02-01")
describe("promiseReduce", () => {
    const fn1 = () => {
        console.log('fn1')
        return Promise.resolve(1)
    }

    const fn2 = () => new Promise(resolve => {
        console.log('fn2')
        setTimeout(() => resolve(2), 1000)
    })

    const reducer = (memo, value) => {
        console.log('reduce')
        return memo * value
    }

    const mockReducer = jest.fn()

    it("should return initialValue in case of empty array", () => {
        const actual = promiseReduce(
            [],
            reducer,
            1,
        )
        expect(actual).resolves.toStrictEqual(1)
    })

    it("should call reducer once for each value in the array - 0", () => {
        return promiseReduce(
            [],
            mockReducer,
            1,
        ).then(() => expect(mockReducer).toBeCalledTimes(0))
    })

    it("should call reducer once for each value in the array - 1", () => {
        return promiseReduce(
            [fn1],
            mockReducer,
            1,
        ).then(() => expect(mockReducer).toBeCalledTimes(1))
    })

    it("should call reducer once for each value in the array - 2", () => {
        return promiseReduce(
            [fn1, fn2],
            mockReducer,
            1,
        ).then(() => expect(mockReducer).toBeCalledTimes(2))
    })

    it("call [fn1] -> 1", () => {
        const actual = promiseReduce(
            [fn1],
            reducer,
            1,
        )
        expect(actual).resolves.toStrictEqual(1)

    })

    it("call [fn1, fn2] -> 2", () => {
        const actual = promiseReduce(
            [fn1, fn2],
            reducer,
            1,
        )
        expect(actual).resolves.toStrictEqual(2)
    })
})