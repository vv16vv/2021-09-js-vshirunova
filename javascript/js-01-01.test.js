const {hasIntersection, join, joinArrayOfSets, process, maxItemAssociation} = require("./js-01-01")

describe("js-01-01", () => {
    describe("hasIntersection", () => {
        it("[] & [] => false", () => {
            const set1 = new Set()
            const set2 = new Set()
            expect(hasIntersection(set1, set2)).toBeFalsy()
        })
        it("[a, b] & [] => false", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set()
            expect(hasIntersection(set1, set2)).toBeFalsy()
        })
        it("[a, b] & [a] => true", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set(["a"])
            expect(hasIntersection(set1, set2)).toBeTruthy()
        })
        it("[a, b] & [c, a] => true", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set(["c", "a"])
            expect(hasIntersection(set1, set2)).toBeTruthy()
        })
        it("[a, b] & [c, d] => false", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set(["c", "d"])
            expect(hasIntersection(set1, set2)).toBeFalsy()
        })
    })
    describe("join", () => {
        it("returned type is Set", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set()
            expect(join(set1, set2)[Symbol.toStringTag]).toEqual("Set")
        })
        it("[] + [] => []", () => {
            const set1 = new Set()
            const set2 = new Set()
            expect(join(set1, set2)).toHaveProperty("size", 0)
        })
        it("[a, b] + [] => [a, b]", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set()
            expect(Array.from(join(set1, set2))).toStrictEqual(["a", "b"])
        })
        it("[a, b] + [c, a] => [a, b, c]", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set(["c", "a"])
            expect(Array.from(join(set1, set2))).toStrictEqual(["a", "b", "c"])
        })
        it("[a, b] + [c, d] => [a, b, c, d]", () => {
            const set1 = new Set(["a", "b"])
            const set2 = new Set(["c", "d"])
            expect(Array.from(join(set1, set2))).toStrictEqual(["a", "b", "c", "d"])
        })
    })
    describe("joinArrayOfSets", () => {
        it("[[]] => []", () => {
            const sets = [new Set()]
            expect(Array.from(joinArrayOfSets(sets))).toStrictEqual([])
        })
        it("[[], [a, b] => [a, b]", () => {
            const sets = [new Set(), new Set(["a", "b"])]
            expect(Array.from(joinArrayOfSets(sets))).toStrictEqual(["a", "b"])
        })
        it("[[a, b], [a, c] => [a, b, c]", () => {
            const sets = [new Set(["a", "b"]), new Set(["a", "c"])]
            expect(Array.from(joinArrayOfSets(sets))).toStrictEqual(["a", "b", "c"])
        })
        it("[[a, b], [a, c], [b, d] => [a, b, c, d]", () => {
            const sets = [
                new Set(["a", "b"]),
                new Set(["a", "c"]),
                new Set(["b", "d"]),
            ]
            expect(Array.from(joinArrayOfSets(sets))).toStrictEqual(["a", "b", "c", "d"])
        })
    })
    describe("process", () => {
        it("[[]] => []", () => {
            const sets = [new Set()]
            expect(Array.from(process(sets))).toStrictEqual([new Set()])
        })
        it("[[a, b]] => [[a, b]]", () => {
            const sets = [new Set(["a", "b"])]
            expect(Array.from(process(sets))).toStrictEqual([new Set(["a", "b"])])
        })
        it("[[a, b], [a, c]] => [[a, b, c]]", () => {
            const sets = [
                new Set(["a", "b"]),
                new Set(["a", "c"]),
            ]
            expect(Array.from(process(sets))).toStrictEqual([new Set(["a", "b", "c"])])
        })
        it("[[a, b], [a, c], [e, d] => [[a, b, c], [e, d]", () => {
            const sets = [
                new Set(["a", "b"]),
                new Set(["a", "c"]),
                new Set(["e", "d"]),
            ]
            expect(Array.from(process(sets))).toStrictEqual([
                new Set(["a", "b", "c"]),
                new Set(["e", "d"]),
            ])
        })
        it("[[a, b], [a, c], [e, d], [d, h], [h, i]] => [[a, b, c], [e, d, h, i]]", () => {
            const sets = [
                new Set(["a", "b"]),
                new Set(["a", "c"]),
                new Set(["e", "d"]),
                new Set(["d", "h"]),
                new Set(["h", "i"]),
            ]
            expect(Array.from(process(sets))).toStrictEqual([
                new Set(["a", "b", "c"]),
                new Set(["e", "d", "h", "i"]),
            ])
        })
        it("[[a, z], [b, c], [b, d], [b, z]] => [[b, c, d, z, a]]", () => {
            const sets = [
                new Set(["a", "z"]),
                new Set(["b", "c"]),
                new Set(["b", "d"]),
                new Set(["b", "z"]),
            ]
            expect(Array.from(process(sets))).toStrictEqual([
                new Set(["b", "d", "c"]),
                new Set(["b", "z", "a"]),
            ])
        })
    })
    describe("maxItemAssociation", () => {
        it("[[]] => []", () => {
            const sets = [[]]
            expect(maxItemAssociation(sets)).toStrictEqual([])
        })
        it("[[a, b]] => [a, b]", () => {
            const sets = [["a", "b"]]
            expect(maxItemAssociation(sets)).toStrictEqual(["a", "b"])
        })
        it("[[a, b], [a, c]] => [a, b, c]", () => {
            const sets = [
                ["a", "b"],
                ["a", "c"],
            ]
            expect(maxItemAssociation(sets)).toStrictEqual(["a", "b", "c"])
        })
        it("[[a, b], [a, c], [e, d] => [a, b, c]", () => {
            const sets = [
                ["a", "b"],
                ["a", "c"],
                ["e", "d"],
            ]
            expect(maxItemAssociation(sets)).toStrictEqual(["a", "b", "c"])
        })
        it("[[a, b], [a, c], [e, d], [d, h], [h, i]] => [d, e, h, i]", () => {
            const sets = [
                ["a", "b"],
                ["a", "c"],
                ["e", "d"],
                ["d", "h"],
                ["h", "i"],
            ]
            expect(maxItemAssociation(sets)).toStrictEqual(["d", "e", "h", "i"])
        })
        it("[[a, z], [b, c], [b, d], [b, z]] => [b, c, d, z, a]", () => {
            const sets = [
                ["a", "z"],
                ["b", "c"],
                ["b", "d"],
                ["b", "z"],
            ]
            expect(maxItemAssociation(sets)).toStrictEqual(["a", "b", "c", "d", "z"])
        })
        it("[[q, w, a], [a, b], [a, c], [q, e], [q, r], [w, o], [1, 2]] => [q, w, a, b, c, e, r, o]", () => {
            const sets = [
                ["q", "w", 'a'],
                ["a", "b"],
                ["a", "c"],
                ["q", "e"],
                ["q", "r"],
                ["w", "o"],
                ["1", "2"],
            ]
            expect(maxItemAssociation(sets)).toStrictEqual(["q", "w", "a", "b", "c", "e", "r", "o"].sort())
        })
        it("[['d', 'n'],['d', 'e'],['a', 'c'],['a', 'b']] => [a, b, c]", () => {
            const sets = [
                ["d", "n"],
                ["d", "e"],
                ["a", "c"],
                ["a", "b"]
            ]
            expect(maxItemAssociation(sets)).toStrictEqual(["a", "b", "c"])
        })
    })
})