/*Задание 1.

Написать функцию maxItemAssociation(), получающую исторические данные покупок пользователей и
возвращающую максимальный список рекомендаций.

    Входные данные - массив исторических покупок пользователей [["a", "b"], ["a", "c"], ["d", "e"]].
    То есть пользователь 1 купил "a" и "b".
    Пользователь 2 купил продукты "a", "c".
    Пользователь 3 купил продукты "d", "e".
    Надо найти максимальную группу рекомендаций. Группа рекомендаций - это продукты, которые был куплены
    другими пользователями при условии, если они пересекаются с исходным списком.
    Если количество рекомендаций в группах одинаковое - вернуть первую группу,
    из отсортированных в лексикографическом порядке.

    Решение:
    Группа рекомендаций 1 - ["a", "b", "c"]. Покупка "a" содержится в списке 2, поэтому весь список 2 может быть добавлен в рекомендации.
    Группа рекомендаций 2 - ["d", "e"].

    Ответ: ["a", "b", "c"].

    Пример 2:

Входные данные: [
    ["q", "w", 'a'],
    ["a", "b"],
    ["a", "c"],
    ["q", "e"],
    ["q", "r"],
]

Ответ ["a", "b", "c", "e", "q", "r", "w"] - это максимальная по пересечениям группа.
Можно видеть, что первый массив пересекается со всеми остальными, и
потому результат является всем множеством значений. */

export type StringSetArray = Array<Set<string>>
export type StringArrayArray = Array<Array<string>>
export type StringSet = Set<string>
export type StringArray = Array<string>

export function hasIntersection(set1: StringSet, set2: StringSet): boolean {
    return Array.from(set1).filter(s1 => set2.has(s1)).length > 0
}

export function join(set1: StringSet, set2: StringSet): StringSet {
    return new Set([...set1, ...set2])
}

export function joinArrayOfSets(sets: StringSetArray): StringSet {
    return sets.reduce((acc, set) => join(acc, set), new Set())
}

// @ts-ignore
export function process(sets: StringSetArray | StringArrayArray): StringSetArray {
    let recs: Array<Set<string>> = []
    for (let cart of sets) {
        let cartSet: Set<string> = new Set(cart)
        if (recs.length === 0) recs.push(cartSet)
        else {
            const commonRec: Array<Set<string>> = []
            commonRec.push(cartSet)
            for (let i = 0; i < recs.length; i++) {
                if (hasIntersection(recs[i], cartSet)) {
                    commonRec.push(...recs.splice(i, 1))
                }
            }
            recs.push(joinArrayOfSets(commonRec))
        }
    }
    return recs
}

export function maxItemAssociation(carts: StringArrayArray): StringArray {
    const primaryRecs: StringSetArray = process(carts)
    const processedRecs: StringSetArray = process(primaryRecs)

    const maxLength: number = Math.max(...processedRecs.map(rec => rec.size))

    return processedRecs
        .filter(rec => rec.size === maxLength)
        .map(rec => Array.from(rec).sort())
        .sort()
        .shift()
}
