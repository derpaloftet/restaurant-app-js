import { menuArray } from "/data.js"

const listEl = document.getElementById("items-list")
const orderEl = document.getElementById("order-list-info")
const totalPriceEl = document.getElementById("total-price")
const paymentEl = document.getElementById("payment-modal")
const submitFormEl = document.getElementById("submit-form")
const orderConfEl = document.getElementById("order-confirmation")

const foodItem = document.createElement("ul")
foodItem.innerHTML = menuArray.map(item => {
   return `  
                    <li>
                      <div class="item">
                        <div class="item-emoji">${ item.emoji }</div>
                      </div>
                      <div class="item item-details">
                        <div class="item--name">${ item.name }</div>
                        <div class="item--ingredients">${ item.ingredients.join(", ") }</div>
                        <div class="item--price">$${ item.price }</div>
                      </div>
                      <div class="item item-btns">
                        <button class="plus--btn" id="plus--btn-${ item.id }">+</button>
                        <button class="minus--btn" id="minus--btn-${ item.id }">-</button>
                      </div>
                    </li>     
                    <hr />         
`
}).join(" ")
listEl.appendChild(foodItem)

const listArr = []
let totalPrice = 0

menuArray.forEach(item => {
        const plusBtnEl = document.getElementById(`plus--btn-${ item.id }`)
        plusBtnEl.addEventListener("click", () => {
            let hasItem = false
            listArr.forEach(listObj => {
                if (listObj.id === item.id) {
                    hasItem = true
                }
            })
            if (!hasItem) {
                listArr.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    itemsSum: 1
                })
            } else {
                listArr.map(objOrder => {
                    if (objOrder.id === item.id) {
                        objOrder.itemsSum++
                        objOrder.price = item.price * objOrder.itemsSum
                    }
                })
            }
            totalPrice += item.price
            plusBtnHandler()
        })
    const minusBtnEl = document.getElementById(`minus--btn-${ item.id }`)
    minusBtnEl.addEventListener("click", () => {
        listArr.map(listObj => {
            if (listObj.id === item.id && listObj.itemsSum > 0) {
                listObj.itemsSum--
                listObj.price = listObj.price - item.price
                totalPrice -= item.price
            }
        })
        plusBtnHandler()
    })
    }
)
function updateList() {
    const listItemsEl = document.getElementById("list-items")   
    listItemsEl.innerHTML = ""
    console.log(listArr)

    listArr.forEach(item => {
        const index = listArr.indexOf(item)
        const listItem = document.createElement("div")
        listItem.innerHTML += `
         <div class="list-name-price">
           <div class="list-name">${ item.name }</div>
           <button class="remove-btn" id="remove-btn-${ index }">remove</button>
           <div class="list-itemsSum">${ item.itemsSum }</div>
           <div class="list-price">$${ item.price }</div>
         </div>
         `  
         listItemsEl.appendChild(listItem)
         
         const removeBtnEl = document.getElementById(`remove-btn-${index}`)
         removeBtnEl.addEventListener("click", ()=>{
            listArr.splice(index, 1);
            
             if (listArr.length === 0) {
                 orderEl.style.display = "none"
             }
             totalPrice = totalPrice - item.price
             updateList()
         })
         })
    
         totalPriceEl.innerHTML = `<div class="total-price-final">
         <div>Total price: </div>
         <div>$${totalPrice}</div>
         </div>` 
     }

function plusBtnHandler() {
    orderEl.style.display = "block"
      updateList()
      const orderBtnEl = document.getElementById("order--btn")
      orderBtnEl.addEventListener("click", ()=>{
          paymentEl.style.display = "flex"
      })
    orderConfEl.style.display = "none"
    orderConfEl.innerHTML = ""
}
       
submitFormEl.addEventListener("submit", (e) =>{
              e.preventDefault();
              const formData = new FormData(submitFormEl);
              const nameData = formData.get('name')
              const confEl = document.createElement("div")
              confEl.innerHTML = `Thanks, ${nameData}! Your order is on it's way!`
              orderConfEl.appendChild(confEl)
              orderConfEl.style.display = "block"
              paymentEl.style.display = "none"
              orderEl.style.display = "none"
              listArr.length = 0
              totalPrice = 0
 })