/*
- Dominic Martinez
- Project: JS Match Game
- Description: Uses HTML images and JS variables to stimulate a card match game 
- Due Date: 2/3/2023
*/

// Store startButton so it can be disabled later when needed
let startButton = document.getElementById('start-btn');

// Get all images from the card-images DIV. Will be used to reset them when needed
let cardImagesContainer = document.getElementById('card-images').querySelectorAll('img');

// Get tries counter header to show users their number of tries in current game
let triesCounterDisplay = document.getElementById('tries-counter');

// Cards nums is an array with 16 elements (pairs of numbers 1-8). This array items will be
// Randomly sorted and stored in currentSet. 
let cardNums;

// CurrentSet is an array with 16 elements. Each of these elements corresponds to an individual card image.
// Ex. Image 3 = Third Element in Array
let currentSet = [];

// Variable will keep track of the number of tries user had made
let triesCounter = 0;

// Variable will keep track of the number of matches user makes and will check
// If user matched all cards
let correctMatches = 0;

// tryComplete will be used to check if user has completed their try and has selected two cards
// tryAllowed will be used to check if user is allowed to make a try, which will be false if user 
// Has already selected two cards
let tryComplete = false;
let tryAllowed = true;

// Both variables will keep information of the first card users choose when they are making a match
// Will be used to determine if user has made a match
let priorCardNum;
let priorImageID;

// Will initialize and setup the game, such as creating the currentSet
let StartGame = () => {

    // Disable start button. Will be enabled again when user wins game
    startButton.disabled = true;

    // Reset correctMatches and triesCounter variables and reset the tries counter display
    correctMatches = 0;
    triesCounter = 0;
    triesCounterDisplay.innerText = "Tries: 0";

    // Disable the win prompt if it is currently showing
    document.getElementById('win-prompt').style.display = "none";

    // Reset both cardNums and currentSet array so a new unique set can be created
    cardNums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    currentSet = [];

    // Iterates through loop 16 times(length of cardNums array) and for each
    // Iteration, push a random item from cardNums into currentSet, then remove that item
    // From cardNums. cardNums will be empty after for loop 
    for (i=0; i < 16; i++) {
        let randIndex = Math.floor(Math.random()*cardNums.length);
        currentSet.push(cardNums[randIndex]);
        cardNums.splice(randIndex, 1);
    };
    
    // Put all card images back to the default back card, and also add an event listener for when user clicks
    // One of cards, which will call the checkCard function
    cardImagesContainer.forEach(img => {
        img.src = 'img/backcard.jpg'
        img.addEventListener("click", CheckCard)
    });
}

// Will be called when user clicks on one of cards and will check if user has made a match
let CheckCard = (e) => {
  
    // Get the id of the card image that triggered the event
    id = e.target.id;

    // Check if user is allowed to click any more cards, and also check if the user
    // Selected the same card twice
    if (!tryAllowed || id === priorImageID)
        return;
    
    // Set the current card using the id as a index for currentSet
    let currentCard = currentSet[id];
    
    // Sets the image of the card the user choose
    document.getElementById(id).src = `img/${currentCard}.png`;

    // Check if user has selected both cards and completed their try or they just selected their first card
    if (!tryComplete) {
        // If user only selected one card, then store its information so it can be compared to second card
        priorCardNum = currentCard;
        priorImageID = id;
        // Set try complete to true
        tryComplete = true;
    } else {

        // Checks if user choose two cards that matched
        if (currentCard === priorCardNum) {
            
            // Check if user has matched all the 8 pairs of cards
            if (++correctMatches >= 8){
                // If so, display the win prompt and enable the start button
                document.getElementById('win-prompt').style.display = "block";
                startButton.disabled = false;
            }

            // Set both card images to transparent image making them blank. Do so in a timeout for 1 second
            setTimeout(SetImage, 1000, id, priorImageID, "img/transparent.png");

            // Remove the event listeners from both of the cards that were matched so they wont call this function anymore
            document.getElementById(id).removeEventListener("click", CheckCard);
            document.getElementById(priorImageID).removeEventListener("click", CheckCard); 

        } else {
            // If user does make a match, set both card images back to backcard.jpg. Do so in a timeout for 1 second
            setTimeout(SetImage, 1000, id, priorImageID, "img/backcard.jpg");
        }
        
        // Update the tries counter display with updated incremented value
        triesCounterDisplay.innerText = `Tries: ${ ++triesCounter }`;
        
        // Resets both priorImageID and priorCardNumber, so it doesn't interfere with users next matches
        priorImageID = 0;
        priorCardNumber = 0;

        // Set tryComplete back to false, since the current try is complete
        tryComplete = false;

        // Set tryAllowed to false so user can't choose more than 2 cards
        tryAllowed = false;
    }
}

// Function will be change two images(the 2 cards a user chooses) sources to a provided source 
let SetImage = (id1, id2, src) => {
    document.getElementById(id1).src = src;
    document.getElementById(id2).src = src;

    // Set tryAllowed to true so user can try to match again
    tryAllowed = true;
}