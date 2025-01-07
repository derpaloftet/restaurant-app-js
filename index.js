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
                        <div class="item-emoji">${item.emoji}</div>
                      </div>
                      <div class="item">
                        <div class="item--name">${item.name}</div>
                        <div class="item--ingridients">${item.ingredients.join(", ")}</div>
                        <div class="item--price">$${item.price}</div>
                      </div>
                      <div class="item">
                        <button class="plus--btn" id="plus--btn-${item.id}">+</button>
                      </div>
                    </li>     
                    <hr />         
`
}).join(" ")
listEl.appendChild(foodItem)

 const listArr = []
 let totalPrice = 0
 
menuArray.forEach(item => {
    const plusBtnEl = document.getElementById(`plus--btn-${item.id}`)
    plusBtnEl.addEventListener("click", ()=>{
        listArr.push({
            name: item.name,
            price: item.price}) 
            totalPrice += item.price
            plusBtnHandler()
    })
    }
)

function updateList() {
    const listItemsEl = document.getElementById("list-items")   
    listItemsEl.innerHTML = ""
    listArr.forEach(item => {
        const index = listArr.indexOf(item)
        const listItem = document.createElement("div")
         listItem.innerHTML += `
         <div class="list-name-price">
           <div class="list-name">${item.name}<button class="remove-btn" id="remove-btn-${index}">remove</button></div>
           <div class="list-price">$${item.price}</div>
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