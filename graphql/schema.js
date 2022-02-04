const {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString, GraphQLList, GraphQLSchema, GraphQLEnumType,
} = require('graphql')
const _ = require("lodash")

const categories = require("./data/categories")
const items = require("./data/items")
const storage = require("./data/storage")
const customers = require("./data/customers")
const orders = require("./data/orders")

const Category = new GraphQLObjectType({
    name: "category",
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
    },
})

const Item = new GraphQLObjectType({
    name: "item",
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        category: {
            type: Category,
            resolve(parent) {
                return _.find(categories, {id: parent.categoryId})
            },
        },
        name: {type: GraphQLString},
        price: {type: GraphQLFloat},
    },
})

const Operation = new GraphQLEnumType({
    name: 'operation',
    values: {
        INCOME: {value: '+'},
        OUTCOME: {value: '-'},
    },
})

const OrderContent = new GraphQLObjectType({
    name: "orderContent",
    fields: () => ({
        item: {
            type: new GraphQLNonNull(Item),
            resolve(parent) {
                return _.find(items, {id: parent.itemId})
            },
        },
        quantity: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve(parent) {
                console.log(`OrderContent.quantity.resolve: ${JSON.stringify(parent)}`)
                return parent.quantity
            },
        },
    }),
})

const Order = new GraphQLObjectType({
    name: "order",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        customer: {
            type: Customer,
            resolve(parent) {
                return _.find(customers, {id: parent.customerId})
            },
        },
        date: {
            type: GraphQLString,
            resolve(parent) {
                return parent.date.toLocaleDateString()
            },
        },
        isClosed: {type: GraphQLBoolean},
        content: {
            type: new GraphQLList(OrderContent),
            resolve(parent) {
                return _.filter(storage, {orderId: parent.id})
            },
        },
    }),
})

const Storage = new GraphQLObjectType({
    name: "storage",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        type: {type: new GraphQLNonNull(Operation)},
        order: {
            type: Order,
            resolve(parent) {
                return parent.orderId !== undefined ? _.find(orders, {id: parent.orderId}) : null
            },
        },
        item: {
            type: new GraphQLNonNull(Item),
            resolve(parent) {
                return _.find(items, {id: parent.itemId})
            },
        },
        quantity: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve(parent) {
                const income = _.sumBy(_.filter(storage, {type: '+', itemId: parent.itemId}), 'quantity')
                const outcome = _.sumBy(_.filter(storage, {type: '-', itemId: parent.itemId}), 'quantity')
                return income - outcome
            },
        },
    }),
})

const Customer = new GraphQLObjectType({
    name: "customer",
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
    },
})

const zooSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'ZooQuery',
        fields: {
            customer: {
                type: Customer,
                args: {id: {type: GraphQLString}},
                resolve(parent, args) {
                    return _.find(customers, {id: args.id})
                },
            },
            customers: {
                type: GraphQLList(Customer),
                resolve() {
                    return customers
                },
            },
            item: {
                type: Item,
                args: {id: {type: GraphQLString}},
                resolve(parent, args) {
                    return _.find(items, {id: args.id})
                },
            },
            items: {
                type: GraphQLList(Item),
                resolve() {
                    return items
                },
            },
            categories: {
                type: GraphQLList(Category),
                resolve() {
                    return categories
                },
            },
            itemsByCategory: {
                type: GraphQLList(Item),
                args: {id: {type: GraphQLString}},
                resolve(parent, args) {
                    return _.filter(items, {categoryId: args.id})
                },
            },
            currentOrder: {
                type: Order,
                args: {customerId: {type: GraphQLString}},
                resolve(parent, args) {
                    return _.find(orders, {customerId: args.customerId, isClosed: false})
                },
            },
            closedOrders: {
                type: GraphQLList(Order),
                args: {customerId: {type: GraphQLString}},
                resolve(parent, args) {
                    return _.filter(orders, {customerId: args.customerId, isClosed: true})
                },
            },
            storage: {
                type: GraphQLList(Storage),
                resolve() {
                    return storage
                },
            },
        },
    }),
})

module.exports = {
    zooSchema,
}