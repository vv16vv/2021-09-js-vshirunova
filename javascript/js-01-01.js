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

function hasIntersection(set1, set2) {
    return Array.from(set1).filter(s1 => set2.has(s1)).length > 0
}

function join(set1, set2) {
    return new Set([...set1, ...set2])
}

function joinArrayOfSets(sets) {
    return sets.reduce((acc, set) => join(acc, set), new Set())
}

function process(sets){
    let recs = []
    for (let cart of sets) {
        let cartSet = new Set(cart)
        if (recs.length === 0) recs.push(cartSet)
        else {
            const commonRec = []
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

function maxItemAssociation(carts) {
    const primaryRecs = process(carts)
    const processedRecs = process(primaryRecs)

    const maxLength = Math.max(...processedRecs.map(rec => rec.size))
    return Array.from(processedRecs.find(rec => rec.size === maxLength))
}

module.exports = {
    hasIntersection, 
    join, 
    joinArrayOfSets, 
    process, 
    maxItemAssociation
};