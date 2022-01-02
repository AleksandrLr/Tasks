let randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let generateCode = codeLen => {
    let code = "";
    for (let i = 0; i < codeLen; i++) {
        randomNumber = randomInt(0, 9);
        while (code.includes(String(randomNumber))) {
            randomNumber = randomInt(0, 9)
        }
        code += String(randomNumber);
    }
    return code;
}

let setOfNumbers = (numbers) => {
    let num = new Set();
    for (let i = 0; i < numbers.length; i++){
        num.add(numbers[i]);
    }
    return num;
}

let guessCheck = (original, compared) => {
    let rightPlace = [];
    let wrongPlace = [];
    for (let i = 0; i < original.length; i++) {
        if (original.includes(compared[i])) {
            if (compared[i] == original[i]) {
                rightPlace.push(compared[i]);
            } else {
                wrongPlace.push(compared[i]);
            }
        }
    }
    return [wrongPlace, rightPlace];
}

const codeLength = randomInt(3, 6);
const hiddenCode = generateCode(codeLength);
//console.log('hiddenCode', hiddenCode);
console.log(`Длина числа равна ${codeLength}, все цифры в числе различаются.`);
const readlineSync = require('readline-sync');
console.log('Введите количество попыток, за которое вы попробуете отгадать число: ')
const attempts = readlineSync.question('');
let numbers;
let num;
let answer;
for (let i = 0; i < attempts; i++) {
    console.log(`Попытка № ${i + 1}`);
    console.log('Ваше предположение:')
    numbers = readlineSync.question('');
    num = setOfNumbers(numbers);
    while (numbers.length != hiddenCode.length || isNaN(Number(numbers)) || num.size != numbers.length || numbers.includes('.') || numbers.includes('+') || numbers.includes('-')) {
        console.log(`Введите число из ${hiddenCode.length} цифр, ввод осуществляется без пробелов и посторонних символов`)
        console.log('Ваше предположение: ')
        numbers = readlineSync.question('');
        num = setOfNumbers(numbers);
    }
    if (hiddenCode == numbers) {
        console.log(`Поздравляю! Вы угадали загаданное число. Оно равно ${hiddenCode}`);
        break;
    }
    answer = guessCheck(hiddenCode, numbers);
    console.log(`Совпавших цифр не на своих местах - ${answer[0].length} (${answer[0]}), цифр на своих местах - ${answer[1].length} (${answer[1]})`);
    if (i == attempts - 1) {
        console.log(`Вы не угадали число за отведённое количество попыток. Загаданное число: ${hiddenCode}`);
    }
}


// node BullsAndCows.js

