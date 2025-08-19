const userName = 'Andrew'
const userAge = 27

const user = {
     userName,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)


const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

const {label: productLabel, stock, price} = product

console.log(productLabel)