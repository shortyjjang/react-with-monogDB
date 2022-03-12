
const collectionsList = [
    {key: 1, name: "Men"},
    {key: 2, name: "Women"},
    {key: 3, name: "Shoes"},
    {key: 4, name: "Bag"},
]
const prices = [
    {
        id:1,
        name:'Any',
        range: []
    },{
        id:2,
        name:'$0 to $9',
        range: [0, 9]
    },{
        id:3,
        name:'$10 to $19',
        range: [10,19]
    },{
        id:4,
        name:'More than $20',
        range: [20,15000000]
    }
]

export {collectionsList, prices}