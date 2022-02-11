import {sum} from "./js-01-02"

describe("sum", () => {
    describe("intermediate call should return function", () => {
        it("sum()", () => {
            expect(typeof sum()).toStrictEqual("function")
        })
        it("sum(1)", () => {
            expect(typeof sum(1)).toStrictEqual("function")
        })
        it("sum(1)(2)", () => {
            expect(typeof sum(1)(2)).toStrictEqual("function")
        })
    })
    describe("final call should return result", () => {
        it("sum(1)() => 1", () => {
            expect(sum(1)()).toEqual(1)
        })
        it("sum(1)(2)() => 3", () => {
            expect(sum(1)(2)()).toEqual(3)
        })
        it("string value: sum(1)(2)('3')() => 6", () => {
            expect(sum(1)(2)('3')()).toEqual(6)
        })
        it("hex value: sum(1)(2)('0xff')() => 258", () => {
            expect(sum(1)(2)('0xff')()).toEqual(258)
        })
    })
})