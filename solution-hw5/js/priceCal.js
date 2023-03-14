//author: Jiaxi Gu, andrew id: jiaxig

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

let cart = []
let glazingOption = [new Glazing(0,"Keep Original"), new Glazing(0,"Sugar milk"), new Glazing(0.5,"Vanilla milk"), new Glazing(1.5,"Double chocolate")];
let packOption = [new Pack(1, '1'), new Pack(3, '3'), new Pack(5, '6'), new Pack(10, '12')];
let glazingSel = document.querySelector('#glazing');
let packSel = document.querySelector('#pack');

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

function calculate() {
  const currPrice = (parseFloat(curr.base) + parseFloat(curr.glazing)) * parseFloat(curr.pack);
  console.log("New price is " + currPrice);
  curr.element.innerText = "$" + currPrice.toFixed(2);
}

function glazingChange(element) {
  const newGlazing = element.value;
  curr.glazing = newGlazing;
  const glazingName = element.options[element.selectedIndex].text;
  curr.glazingTxt = glazingName;
  curr.element = document.querySelector('#item_price');
  calculate();
}
function packChange(element) {
  const newPack = element.value;
  curr.pack = newPack;
  const packName = element.options[element.selectedIndex].text;
  curr.packDisplay = packName;
  curr.element = document.querySelector('#item_price');
  calculate();
}

class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }
}

function addCart(){
  let newItem = new Roll(rollType, curr.glazingTxt, curr.packDisplay, curr.base);
  cart.push(newItem);
  console.log(cart);
}

//Initialize the cart set and init all the four rolls
const tempCart = new Set([
  new Roll("Apple", glazingOption[0], packOption[1], rolls["Apple"].basePrice),
  new Roll("Raisin", glazingOption[1], packOption[1], rolls["Raisin"].basePrice),
  new Roll("Walnut", glazingOption[2], packOption[3], rolls["Walnut"].basePrice),
  new Roll("Original", glazingOption[1], packOption[0], rolls["Original"].basePrice)
]);

// Remove item from the cart
function removeItem(event, item, element) {
  event.preventDefault();
  element.remove();
  tempCart.delete(item);
  console.log(tempCart);
  let totalPrice = 0;
  for (const item of tempCart) {
    const tempPrice = parseFloat((item.basePrice + item.glazing.value) * item.size.value);
    totalPrice += tempPrice;
  }
  const CartTotalPrice = document.querySelector('#total2');
  if (CartTotalPrice !== null) {
    CartTotalPrice.innerText = "$" + totalPrice.toFixed(2);
  }
}

//Cart initialization
const template = document.querySelector("#newcart");
if (template !== null) {
  for (const tempRoll of tempCart) {
    const clone = template.content.cloneNode(true);
    const element = clone.querySelector(".cart_line");
    const delButton = element.querySelector('.remove');
    delButton.addEventListener('click', (event) => removeItem(event, tempRoll, element));

    const cartImg = element.querySelector('#cart_img_id');
    const cartGlazing = element.querySelector('#cart_glazing');
    const cartPack = element.querySelector('#cart_pack_size');
    const cartItem = element.querySelector('#cart_item_name');

    cartImg.src = `assets/products/${rolls[tempRoll.type].imageFile}`;
    cartGlazing.innerText = `Glazing: ${tempRoll.glazing.text}`;
    cartPack.innerText = `Pack size: ${tempRoll.size.text}`;
    cartItem.innerText = `${tempRoll.type} Cinnamon Roll`;

    const newPrice = parseFloat((tempRoll.basePrice + tempRoll.glazing.value) * tempRoll.size.value);
    const cartPrice = element.querySelector('#cart_item_price');
    cartPrice.innerText = `$${newPrice.toFixed(2)}`;
    document.querySelector('.cart').prepend(element);
  }
}
// Update the total price of items in the cart
let totalPrice = 0;
for (const item of tempCart) {
  const tempPrice = parseFloat((item.basePrice + item.glazing.value) * item.size.value);
  totalPrice += tempPrice;
}
const CartTotalPrice = document.querySelector('#total2');
if (CartTotalPrice !== null) {
  CartTotalPrice.innerText = "$" + totalPrice.toFixed(2);
}
