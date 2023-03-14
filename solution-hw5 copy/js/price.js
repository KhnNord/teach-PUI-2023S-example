const queryString = window.location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);
console.log(params);
let rollType = params.get('roll');
console.log(rollType);

// Initialize the image
const rollImage = document.querySelector('#roll-detail-img');
if (rollType != null){
  rollImage.src = 'assets/products/' + rolls[rollType].imageFile;
}

// Initialize the title
const detailTitle = document.querySelector('#detail-topic');
if (rollType != null){
  detailTitle.innerText = rollType + ' Cinnamon Roll';
}


// Initialize the price
const detailBasePrice = document.querySelector('#item_price');
if (rollType != null){
  detailBasePrice.innerText = "$" + rolls[rollType].basePrice;
}


// Initializing the dropdown
class Glazing {
  value;
  text;
  constructor(value, text) {
    this.value = value;
    this.text = text;
  }
}
let allGlazing = [new Glazing(0,"Keep Original"), new Glazing(0,"Sugar milk"), new Glazing(0.5,"Vanilla milk"), new Glazing(1.5,"Double chocolate")];

class Pack{
  value;
  text;
  constructor(value, text) {
    this.value = value;
    this.text = text;
  }
}
let allPack = [new Pack(1, '1'), new Pack(3, '3'), new Pack(5, '6'), new Pack(10, '12')];

let selectG = document.querySelector('#glazingOptions');
let selectP = document.querySelector('#packOptions');

if (rollType != null){
  for(var i = 0; i < allGlazing.length; i++) {
  var opt = allGlazing[i];
  var newop = document.createElement('option');
  newop.textContent = opt.text;
  newop.value = opt.value;
  selectG.appendChild(newop);
}

for(var i = 0; i < allPack.length; i++) {
  var opt = allPack[i];
  var newop = document.createElement('option');
  newop.textContent = opt.text;
  newop.value = opt.value;
  selectP.appendChild(newop);
}
}

// All other functions calculating new cost
if (rollType == null){
  rollType = "Original";
}
let current = {
  base: Number(rolls[rollType].basePrice),
  glazing: Number(0),
  glazingText: "Keep Original",
  pack: Number(1),
  packDisplay: '1'
};

function glazingChange(element) {
  const glazeChange = element.value;
  current.glazing = glazeChange;
  const glazeName = element.options[element.selectedIndex].text;
  current.glazingText = glazeName;

  current.element = document.querySelector('#item_price');
  const newP = (parseFloat(current.base) + parseFloat(current.glazing)) * parseFloat(current.pack);
  console.log("new price is " + newP);
  current.element.innerText = "$" + newP.toFixed(2); 
  }

function packChange(element) {
  const packChange = element.value;
  current.pack = packChange;
  const packName = element.options[element.selectedIndex].text;
  current.packDisplay = packName;

  current.element = document.querySelector('#item_price');
  const newP = (parseFloat(current.base) + parseFloat(current.glazing)) * parseFloat(current.pack);
  console.log("new price is " + newP);
  current.element.innerText = "$" + newP.toFixed(2); 
  }


// Initializing cart array
let cart = []
// Initializing the Roll class for adding to cart
class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
  this.type = rollType;
  this.glazing = rollGlazing;
  this.size = packSize;
  this.basePrice = basePrice;
  }
}

function addToCart(){
  let newItem = new Roll(
    rollType,
    current.glazingText,
    current.packDisplay,
    current.base
  );
  cart.push(newItem);
  console.log(cart);
}

//Initialize the cart set and init all the four rolls
let curCart = new Set();
let initApple = new Roll("Apple", 
    allGlazing[0], 
    allPack[1],
    rolls["Apple"].basePrice);
curCart.add(initApple);

let initRaisin = new Roll("Raisin", 
    allGlazing[1], 
    allPack[1],
    rolls["Raisin"].basePrice);
curCart.add(initRaisin);

let initWalnut = new Roll("Walnut", 
    allGlazing[2], 
    allPack[3],
    rolls["Walnut"].basePrice);
curCart.add(initWalnut);

let initOriginal = new Roll("Original", 
    allGlazing[1], 
    allPack[0],
    rolls["Original"].basePrice);
curCart.add(initOriginal);

//Function to initialize each one of the roll
function initCart(newRoll){
  let template = document.querySelector("#var-cart");
  if (template != null) {
    let clone = template.content.cloneNode(true);
    let element = clone.querySelector(".cart-line");
    document.querySelector('.cart').prepend(element); 

    let deleteButton = element.querySelector('.remove');
    deleteButton.addEventListener('click', (event) => removeItem(event, newRoll, element));

    //Init the image, text and stuff for each cart item
    let CartImageElement = element.querySelector('#cart_img_id');
    CartImageElement.src = 'assets/products/' + rolls[newRoll.type].imageFile;

    let CartItemName = element.querySelector('#cart-item-name');
    CartItemName.innerText = newRoll.type + " Cinnamon Roll";

    let CartGlazing = element.querySelector('#cart-glazing');
    CartGlazing.innerText = "Glazing: " + newRoll.glazing.text;

    let CartPack = element.querySelector('#cart-pack-size');
    CartPack.innerText = "Pack size: " + newRoll.size.text;

    const newP = (parseFloat(newRoll.basePrice) + parseFloat(newRoll.glazing.value)) * parseFloat(newRoll.size.value);
    let CartPrice = element.querySelector('#cart-item-price');
    CartPrice.innerText = "$" + newP.toFixed(2);
  }
}

//Function to recalculate the total price whenever called
function updateTotalPrice(){
  let totalPrice = 0;
  for (let item of curCart){
    const oneP = (parseFloat(item.basePrice) + parseFloat(item.glazing.value)) * parseFloat(item.size.value);
    totalPrice = totalPrice + oneP;
    let CartTotalPrice = document.querySelector('#total2');
    if (CartTotalPrice != null){
      CartTotalPrice.innerText = "$" + totalPrice.toFixed(2);
    }
  }
  
}

//Function to remove item and update total price
function removeItem(event, item, element){
  event.preventDefault();
  if (curCart.size > 0){
    element.remove();
    curCart.delete(item);
  }
  console.log(curCart);
  updateTotalPrice();
}

//Initialize the cart
for (let item of curCart) {
  initCart(item);
}
updateTotalPrice();