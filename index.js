import { menuArray } from "/data.js"

const listEl = document.getElementById("items-list")
const orderEl = document.getElementById("order-list-info")
const totalPriceEl = document.getElementById("total-price")
const paymentEl = document.getElementById("payment-modal")
const submitFormEl = document.getElementById("submit-form")
const orderConfirmationEl = document.getElementById("order-confirmation")

const foodItem = document.createElement("ul")
foodItem.innerHTML = menuArray.map(item => {
    return `  
                    <li>
                      <div class="item-emoji">${ item.emoji }</div>
                      <div class="item-details">
                        <div class="item--name">${ item.name }</div>
                        <div class="item--ingredients">${ item.ingredients.join(", ") }</div>
                        <div class="item--price">$${ item.price }</div>
                      </div>
                      <div class="item-btns">
                        <button class="plus--btn" id="plus--btn-${ item.id }">+</button>
                        <button class="minus--btn" id="minus--btn-${ item.id }">-</button>
                      </div>
                    </li>     
                    <hr />         
`
}).join(" ")
listEl.appendChild(foodItem)

const orderItems = []
let totalPrice = 0

// add plus and minus buttons
menuArray.forEach(item => {
        const plusBtnEl = document.getElementById(`plus--btn-${ item.id }`)
        plusBtnEl.addEventListener("click", () => {
            let isItemInCart = false
            orderItems.forEach(listObj => {
                if (listObj.id === item.id) {
                    isItemInCart = true
                }
            })
            if (!isItemInCart) {
                orderItems.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    itemsSum: 1
                })
            } else {
                orderItems.map(orderItem => {
                    if (orderItem.id === item.id) {
                        orderItem.itemsSum++
                        orderItem.price = item.price * orderItem.itemsSum
                    }
                })
            }
            totalPrice += item.price
            showOrderSection()
        })

        const minusBtnEl = document.getElementById(`minus--btn-${ item.id }`)
        minusBtnEl.addEventListener("click", () => {
            orderItems.map(orderItem => {
                if (orderItem.id === item.id && orderItem.itemsSum > 0) {
                    orderItem.itemsSum--
                    orderItem.price = orderItem.price - item.price
                    totalPrice -= item.price
                }
            })
            rerenderOrder()
        })
    }
)

function rerenderOrder() {
    const orderListItemsEl = document.getElementById("order-list-items")
    orderListItemsEl.innerHTML = ""

    for (let i = 0; i < orderItems.length; i++) {
        const item = orderItems[i];
        const listItem = document.createElement("div")
        listItem.innerHTML = `
         <div class="list-name-price">
           <div class="list-name">${ item.name }</div>
           <button class="remove-btn" id="remove-btn-${ i }">remove</button>
           <div class="list-itemsSum">${ item.itemsSum }</div>
           <div class="list-price">$${ item.price }</div>
         </div>
         `
        orderListItemsEl.appendChild(listItem)

        const removeBtnEl = document.getElementById(`remove-btn-${ i }`)
        removeBtnEl.addEventListener("click", () => {
            orderItems.splice(i, 1);
            if (orderItems.length === 0) {
                orderEl.style.display = "none"
            }
            totalPrice = totalPrice - item.price
            rerenderOrder()
        })
    }

    totalPriceEl.innerHTML = `<div class="total-price-final">
         <div>Total price: </div>
         <div>$${ totalPrice }</div>
         </div>`
}

function showOrderSection() {
    // show order
    orderEl.style.display = "flex"
    rerenderOrder()
    const orderBtnEl = document.getElementById("order--btn")
    orderBtnEl.addEventListener("click", () => {
        // show payment
        paymentEl.style.display = "flex"
    })
    // hide confirmation
    orderConfirmationEl.style.display = "none"
    orderConfirmationEl.innerHTML = ""
}

submitFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(submitFormEl);
    const nameData = formData.get('name')
    const confEl = document.createElement("div")
    confEl.innerHTML = `Thanks, ${ nameData }! Your order is on it's way!`
    orderConfirmationEl.appendChild(confEl)
    orderConfirmationEl.style.display = "block"
    paymentEl.style.display = "none"
    orderEl.style.display = "none"
    orderItems.length = 0
    totalPrice = 0
})