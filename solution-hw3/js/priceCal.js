class Glazing {
    text;
    value;
    constructor(newValue, newText) {
        text = newText;
        value = newValue;
    }
}

class Pack {
    text;
    value;
    constructor(newValue, newText) {
        text = newText;
        value = newValue;
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
    choice2.value = choice1.value;
    choice2.textContent = choice1.text;
    packSel.add(choice2);
}

for(var i = 0; i < glazingOption.length; i++) {
    var choice1 = glazingOption[i];
    var choice2 = document.createElement('option');
    choice2.value = choice1.value;
    choice2.textContent = choice1.text;
    glazingSel.add(choice2);
}
function calculate() {
    const currPrice = (parseFloat(curr.base) + parseFloat(curr.glazing)) * parseFloat(curr.pack);
    console.log("New price is " + currPrice);
    curr.element.innerText = "$" + currPrice.toFixed(2);
}

function newGlazing(element) {
    const newGlazing = element.value;
    curr.glazing = newGlazing;
    curr.element = document.querySelector('#item_price');
    calculate();
}

function newPack(element) {
    const newPack = element.value;
    curr.pack = newPack;
    curr.element = document.querySelector('#item_price');
    calculate();
}
