/*
- Dominic Martinez
- Project: JS Match Game
- Description: Uses HTML images and JS variables to stimulate a card match game 
- Due Date: 2/3/2023
*/


let startButton = document.getElementById('start-btn');
let cardImagesContainer = document.getElementById('card-images').querySelectorAll('img');
let triesCounterDisplay = document.getElementById('tries-counter');

let cardNums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let currentSet = [];

let triesCounter = 0;
let correctMatches = 0;
let tryComplete = false;
let tryAllowed = true;
let priorCardNum;
let priorImageID;

let StartGame = () => {

    startButton.disabled = true;
    triesCounter = 0;
    triesCounterDisplay.innerText = "Tries: 0";
    document.getElementById('win-prompt').style.display = "none";


    for (i=0; i < 16; i++) {
        let randIndex = Math.floor(Math.random()*cardNums.length);
        currentSet.push(cardNums[randIndex]);
        cardNums.splice(randIndex, 1);
    };
    
    cardImagesContainer.forEach(img => {
        img.src = 'img/backcard.jpg'
        img.addEventListener("click", CheckCard)
    });
}

let CheckCard = (e) => {
    id = e.target.id;
    let currentCard = currentSet[id];

    if (!tryAllowed || id === priorImageID)
        return;

    document.getElementById(id).src = `img/${currentCard}.png`;

    if (!tryComplete) {
        priorCardNum = currentCard;
        priorImageID = id;
        tryComplete = true;
    } else {
        if (currentCard === priorCardNum) {
            
            if (++correctMatches >= 8){
                document.getElementById('win-prompt').style.display = "block";
                startButton.disabled = false;
            }

            setTimeout(SetImage, 1000, id, priorImageID, "");
            document.getElementById(id).removeEventListener("click", CheckCard);
            document.getElementById(priorImageID).removeEventListener("click", CheckCard); 

        } else {
            setTimeout(SetImage, 1000, id, priorImageID, "img/backcard.jpg");
        }
        
        triesCounterDisplay.innerText = `Tries: ${ ++triesCounter }`;

        tryComplete = false;
        tryAllowed = false;
    }
}


let SetImage = (id1, id2, src) => {
    document.getElementById(id1).src = src;
    document.getElementById(id2).src = src;
    tryAllowed = true;
}