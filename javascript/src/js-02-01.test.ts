import {AsyncFunctionType, promiseReduce, ReducerType,} from "./js-02-01"

describe("promiseReduce", () => {
    const fn1: AsyncFunctionType<number> = () => {
        return Promise.resolve(1)
    }

    const fn2: AsyncFunctionType<number> = () => new Promise(resolve => {
        setTimeout(() => resolve(2), 1000)
    })

    const reducer: ReducerType<number> = (memo, value) => {
        return memo * value
    }

    const mockReducer = jest.fn()

    it("should return initialValue in case of empty array", () => {
        const actual: Promise<number> = promiseReduce<number>(
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