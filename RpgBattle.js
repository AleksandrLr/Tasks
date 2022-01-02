const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

const mage = {
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

let getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

let cooldownsPerRoundIncreace = (cooldowns, round) => {
    for (let i = 0; i < cooldowns.length; i++){
        if(cooldowns[i] != round){
            continue;
        }
        cooldowns[i]++;
    }
}

let showMoves = moves => {
    for (let i = 0; i < moves.length; i++){
        console.log(`${moves[i]["name"]}: ФизУрон: ${moves[i]["physicalDmg"]}, МагУрон: ${moves[i]["magicDmg"]}, ФизБроня(%): ${moves[i]["physicArmorPercents"]}, МагБроня(%): ${moves[i]["magicArmorPercents"]}, Перезарядка(ходы): ${moves[i]["cooldown"]}`);
    } 
} 

let showMove = (moves, i) => {
    console.log(`${moves[i]["name"]}: ФизУрон: ${moves[i]["physicalDmg"]}, МагУрон: ${moves[i]["magicDmg"]}, ФизБроня(%): ${moves[i]["physicArmorPercents"]}, МагБроня(%): ${moves[i]["magicArmorPercents"]}, Перезарядка(ходы): ${moves[i]["cooldown"]}`);
}

let readyMovesIndexes = (readyMoves, cooldowns, round) => {
    for(let i = 0; i < cooldowns.length; i++){
        if (cooldowns[i] == round){
            readyMoves.push(i);
        }
    }
}

let readyOrNotMoves = (moves, availableMovesIndexes, cooldowns,  round) => {
    console.log(`Умений на перезарядке(${moves.length - availableMovesIndexes.length}) : `);
    for (let i = 0; i < moves.length; i++){
        if (!availableMovesIndexes.includes(i)){
            if (cooldowns[i] - round == 1){
                console.log(`Будет доступно на ${cooldowns[i] + 1}-ом ходу(через: 1 ход) `);
            } else {
                console.log(`Будет доступно на ${cooldowns[i] + 1}-ом ходу(через: ${cooldowns[i] - round} хода)`);
            }
            console.log("Умение №", i + 1);
            showMove(moves, i);
        }
    }
    console.log(`\nДоступные умения(${availableMovesIndexes.length}) : `);
    for (let i = 0; i < moves.length; i++){
        if (availableMovesIndexes.includes(i)){
            console.log("Умение №", i + 1);
            showMove(moves, i);
        }
    }
}

const readlineSync = require('readline-sync');
console.log('Рекомендуемые значения здоровья Ефстафия(уровни сложности): (9-11) - трудный, (12-15) - средний, 15+ - режим истории');
console.log('Введи количество здоровья Евстафия:');
let mageHealthInput = readlineSync.question('');
let mageHealth = Number(mageHealthInput);
while (mageHealthInput.includes('.') || mageHealthInput.includes('+') || mageHealth <=0 || isNaN(mageHealth)){
    console.log('Введено некорректное значение, введите число больше нуля');
    mageHealthInput = readlineSync.question('');
    mageHealth = Number(mageHealthInput);
}
let monsterHealth = monster.maxHealth;
console.log(`\nСпособности Лютого: `);
showMoves(monster.moves);
console.log(`\nСпособности Евстафия: `);
showMoves(mage.moves);
let cooldowns = [new Array(monster.moves.length).fill(0), new Array(mage.moves.length).fill(0)];
let availableMovesIndexes = [[],[]];
let round = 0;
let chosenMonsterMove;
let playerInput;
let playerInputIndex;
let threshhold = 1e-5;
while(true){
    console.log(`\n\nХод № ${round + 1}`);
    readyMovesIndexes(availableMovesIndexes[0], cooldowns[0], round);
    console.log(`Статус умений Лютого: `);
    readyOrNotMoves(monster.moves, availableMovesIndexes[0], cooldowns[0], round);
    if(availableMovesIndexes[0].length > 1){
        indexInavailableMovesIndexes = getRandomInt(0,availableMovesIndexes[0].length);
        chosenMonsterMove = availableMovesIndexes[0][indexInavailableMovesIndexes];
    } else {
        indexInavailableMovesIndexes = 0;
        chosenMonsterMove = availableMovesIndexes[0][indexInavailableMovesIndexes];
    }
    cooldowns[0][chosenMonsterMove] += monster.moves[chosenMonsterMove]["cooldown"] + 1;
    readyMovesIndexes(availableMovesIndexes[1], cooldowns[1], round);
    console.log(`\nСтатус умений Евстафия: `);
    readyOrNotMoves(mage.moves, availableMovesIndexes[1], cooldowns[1], round);
    console.log('\nЛютый использует: ');
    showMove(monster.moves, chosenMonsterMove);
    console.log('Выбери доступное умение(номер умения) Евстафия: ');
    playerInput = readlineSync.question('');
    playerInputIndex = Number(playerInput) - 1;
    while(playerInputIndex < 0 || !(availableMovesIndexes[1].includes(playerInputIndex)) || playerInput.includes('.') || playerInput.includes('+')){
        console.log('Некорректный ввод, выбери доступное умение(номер умения): ');
        playerInput = readlineSync.question('');
        playerInputIndex = Number(playerInput) - 1;
    }
    console.log('Евстафий использует: ');
    showMove(mage.moves, playerInputIndex);
    cooldowns[1][playerInputIndex] += mage.moves[playerInputIndex]["cooldown"] + 1;
    monsterHealth -= ( (mage.moves[playerInputIndex]["physicalDmg"] * (1 - monster.moves[chosenMonsterMove]["physicArmorPercents"]/100)) + (mage.moves[playerInputIndex]["magicDmg"] * (1 - monster.moves[chosenMonsterMove]["magicArmorPercents"]/100)));
    mageHealth -= ( (monster.moves[chosenMonsterMove]["physicalDmg"] * (1 - mage.moves[playerInputIndex]["physicArmorPercents"]/100)) + (monster.moves[chosenMonsterMove]["magicDmg"] * (1 - mage.moves[playerInputIndex]["magicArmorPercents"]/100)));
    cooldownsPerRoundIncreace(cooldowns[0], round);
    cooldownsPerRoundIncreace(cooldowns[1], round);
    round++;
    availableMovesIndexes[0].splice(0,availableMovesIndexes[0].length);
    availableMovesIndexes[1].splice(0,availableMovesIndexes[1].length);
    // на случай, если у кого-то останется 0.000...1 хп 
    if (monsterHealth <= threshhold){
        monsterHealth = 0;
    }
    if (mageHealth <= threshhold){
        mageHealth = 0;
    }
    if (mageHealth == 0 || monsterHealth == 0){
        if (monsterHealth == 0 && mageHealth == 0){
            console.log('Борьба была равна...');
        } else if (monsterHealth == 0){
            console.log('Лютый побеждён');
        } else {
            console.log('Евстафий пал');
        }
        break;
    }
    console.log('\nЗдоровье Евстафия:', mageHealth);
    console.log('Здоровье Лютого:', monsterHealth);
}

//node RpgBattle.js