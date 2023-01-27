/*
- Dominic Martinez
- Project: JS Match Game
- Description: Uses HTML images and JS variables to stimulate a card match game 
- Due Date: 2/3/2023
*/


let startButton = document.getElementById('start-btn');
let cardImagesContainer = document.getElementById('card-images');

let cardNums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let currentSet = [];

let tryComplete = false;
let priorCardNum;
let priorImageID;

let StartGame = () => {

    startButton.disabled = true;

    for (i=0; i < 16; i++) {
        let randIndex = Math.floor(Math.random()*cardNums.length);
        currentSet.push(cardNums[randIndex]);
        cardNums.splice(randIndex, 1);
    };
    
}

let CheckCard = (id) => {
    let currentCard = currentSet[id];
    document.getElementById(id).src = `img/${currentCard}.png`;

    if (!tryComplete) {
        priorCardNum = currentCard;
        priorImageID = id;
        tryComplete = true;
    } else {
        if (currentCard === priorCardNum) {
            document.getElementById(id).src = "";
            document.getElementById(priorImageID).src = "";
        }
    }
}


