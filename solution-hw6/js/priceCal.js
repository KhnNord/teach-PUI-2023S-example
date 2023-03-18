/**
 * PUI Assignment 6
 * @author Jiaxi Gu <jiaxig@andrew.cmu.edu>
 */

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
let rollType = params.get('roll');
console.log(queryString);
console.log(params);
console.log(rollType);
//Image, title and price initialization
const rollImage = document.querySelector('#roll_detail_img');
const detailTitle = document.querySelector('#detail_topic');
const detailBasePrice = document.querySelector('#item_price');
if (rollType != null){
  rollImage.src = 'assets/products/' + rolls[rollType].imageFile;
  detailTitle.innerText = rollType + ' Cinnamon Roll';
  detailBasePrice.innerText = "$" + rolls[rollType].basePrice;
}
//Drop-down menu initialization
class Glazing {
  value;
  text;
  constructor(value, text) {
    this.value = value;
    this.text = text;
  }
}
class Pack{
  value;
  text;
  constructor(value, text) {
    this.value = value;
    this.text = text;
  }
}
// Initializing the Roll class for adding to cart
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
  this.type = rollType;
  this.glazing = rollGlazing;
  this.size = packSize;
  this.basePrice = basePrice;
  }
}
let glazingOption = [new Glazing(0,"Keep Original"), new Glazing(0,"Sugar milk"), new Glazing(0.5,"Vanilla milk"), new Glazing(1.5,"Double chocolate")];
let packOption = [new Pack(1, '1'), new Pack(3, '3'), new Pack(5, '6'), new Pack(10, '12')];
let glazingSel = document.querySelector('#glazing');
let packSel = document.querySelector('#pack');
// Initialize the curCart set for cart page
let tempCart = new Set();

if (rollType != null){
  for(var i = 0; i < packOption.length; i++) {
    var choice1 = packOption[i];
    var choice2 = document.createElement('option');
    choice2.textContent = choice1.text;
    choice2.value = choice1.value;
    packSel.appendChild(choice2);
  }
  for(var i = 0; i < glazingOption.length; i++) {
    var choice1 = glazingOption[i];
    var choice2 = document.createElement('option');
    choice2.textContent = choice1.text;
    choice2.value = choice1.value;
    glazingSel.appendChild(choice2);
  }
} else {
  rollType = "Original";
}
let curr = {
  glazing: Number(0),
  glazingTxt: "Keep Original",
  pack: Number(1),
  packDisplay: '1',
  base: Number(rolls[rollType].basePrice)
};

//Cart array initialization
let cart = getLocal();
if (cart == 0) {
  cart = [];
}
console.log(`Current cart: ${cart}`);

//Cart initialization
for (let tempRoll of tempCart) {
  let template = document.querySelector("#newcart");
  if (template != null) {
    let clone = template.content.cloneNode(true);
    let element = clone.querySelector(".cart_line");
    document.querySelector('.cart').prepend(element);
    let delButton = element.querySelector('.remove');
    delButton.addEventListener('click', (event) => removeItem(event, tempRoll, element));

    let cartImg = element.querySelector('#cart_img_id');
    let cartGlazing = element.querySelector('#cart_glazing');
    let cartPack = element.querySelector('#cart_pack_size');
    let cartItem = element.querySelector('#cart_item_name');
    cartImg.src = 'assets/products/' + rolls[tempRoll.type].imageFile;
    cartGlazing.innerText = "Glazing: " + tempRoll.glazing;
    cartPack.innerText = "Pack size: " + tempRoll.size;
    cartItem.innerText = tempRoll.type + " Cinnamon Roll";

    const newPrice = (parseFloat(tempRoll.basePrice) + parseFloat(glazingValue(tempRoll.glazing))) * parseFloat(packValue(tempRoll.size));
    let cartPrice = element.querySelector('#cart_item_price');
    cartPrice.innerText = "$" + newPrice.toFixed(2);
  }
}
// Update the total price of items in the cart
let totalPrice = 0;
for (let item of tempCart) {
  const tempPrice = parseFloat((item.basePrice + glazingValue(item.glazing)) * packValue(item.size));
  totalPrice += tempPrice;
}
let cartTotal = document.querySelector('#total2');
if (cartTotal != null) {
  cartTotal.innerText = `$${totalPrice.toFixed(2)}`;
}

/**
 * Below are the necessary functions
 */
// Remove item from cart and update total price
function removeItem(event, item, element){
  event.preventDefault();
  tempCart.delete(item);
  cart.splice(cart.indexOf(item), 1);
  element.remove();
  console.log(tempCart);
  console.log(cart);
  saveLocal();
  //Update total price
  let totalPrice = 0;
  for (const item of tempCart) {
    const tempPrice = (parseFloat(item.basePrice) + parseFloat(glazingValue(item.glazing))) * parseFloat(packValue(item.size));
    totalPrice += tempPrice;
  }
  const cartTotal = document.querySelector('#total2');
  if (cartTotal !== null) {
    cartTotal.innerText = "$" + totalPrice.toFixed(2);
  }  
}

// Save cart to local storage
function saveLocal() {
  const cartArray = Array.from(cart);
  const myCartJSON = JSON.stringify(cartArray);
  localStorage.setItem('storedCart', myCartJSON);
  console.log(`Cart saved to local storage: ${myCartJSON}`);
}
// Retrieve cart from local storage
function getLocal() {
  const myCartJSON = localStorage.getItem('storedCart');
  if (myCartJSON) {
    const myCart = JSON.parse(myCartJSON);
    tempCart = new Set(myCart);
    return myCart;
  }
  return [];
}
// Convert glazing names to values for calculation
function glazingValue(text) {
  switch (text) {
    case "Keep Original":
    case "Sugar milk":
      return 0;
    case "Vanilla milk":
      return 0.5;
    default:
      return 1.5;
  }
}
// Convert pack size names to values for calculation
function packValue(text) {
  switch (text) {
    case "1":
      return 1;
    case "3":
      return 3;
    case "6":
      return 5;
    default:
      return 10;
  }
}
// Add item to cart and save to local storage
function addCart(){
  let newItem = new Roll(rollType, curr.glazingTxt, curr.packDisplay, curr.base);
  cart.push(newItem);
  console.log(cart);
  saveLocal();
}
// Calculate current price and update display
function calculate() {
  const currPrice = (parseFloat(curr.base) + parseFloat(curr.glazing)) * parseFloat(curr.pack);
  curr.element.innerText = "$" + currPrice.toFixed(2); 
}
// Handle change of glazing selection
function glazingChange(element) {
  const newGlazing = element.value;
  curr.glazing = newGlazing;
  const glazingName = element.options[element.selectedIndex].text;
  curr.glazingTxt = glazingName;
  curr.element = document.querySelector('#item_price');
  calculate();
}
// Handle change of pack size selection
function packChange(element) {
  const newPack = element.value;
  curr.pack = newPack;
  const packName = element.options[element.selectedIndex].text;
  curr.packDisplay = packName;
  curr.element = document.querySelector('#item_price');
  calculate();
}