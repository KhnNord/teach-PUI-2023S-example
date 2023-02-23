const queryString = window.location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);
console.log(params);
const rollType = params.get('');
console.log(rollType);

const rollImage = document.querySelector('#');
rollImage.src = 'assets/products/' + rolls[rollType].imageFile;

const detailTitle = document.querySelector('#');
detailTitle.innerText = rollType + ' Cinnamon Roll';

const detailBasePrice = document.querySelector('#');
detailBasePrice.innerText = "$" + rolls[rollType].basePrice;

let cart = []
class Glazing {
    value;
    text;
    constructor(value, text) {
        this.value = value;
        this.text = text;
    }
}

class Pack {
    value;
    text;
    constructor(value, text) {
        this.value = value;
        this.text = text;
    }
}

let glazingOption = [new Glazing(0, "Keep Original"), new Glazing(0,"Sugar milk"), new Glazing(0.5,"Vanilla milk"), new Glazing(1.5,"Double chocolate")];
let packOption = [new Pack(1, '1'), new Pack(3, '3'), new Pack(5, '6'), new Pack(10, '12')];
let glazingSel = document.querySelector('#glazing');
let packSel = document.querySelector('#pack');
let curr = {
    glazing: Number(0),
    pack: Number(1),
    base: Number(2.49)
}

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
function calculate() {
    const currPrice = (parseFloat(curr.base) + parseFloat(curr.glazing)) * parseFloat(curr.pack);
    console.log("New price is " + currPrice);
    curr.element.innerText = "$" + currPrice.toFixed(2);
}

function glazingChange(element) {
    const newGlazing = element.value;
    curr.glazing = newGlazing;
    const glazingName = element.options[element.selectedIndex].text;
    curr.glazingText = glazingName;
    curr.element = document.querySelector('#item_price');
    calculate();
}

function packChange(element) {
    const newPack = element.value;
    curr.pack = newPack;
    const packName = element.options[element.selectedIndex].text;
    current.packDisplay = packName;
    curr.element = document.querySelector('#item_price');
    calculate();
}

class Roll {
    size;
    basePrice;
    type;
    glazing;
    constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
    }
}

function addCart(){
    let newItem = new Roll(
      rollType,
      current.glazingText,
      current.packDisplay,
      current.base
    );
    cart.push(newItem);
    console.log(cart);
  }
