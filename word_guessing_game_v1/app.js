const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
const startGame = document.querySelector('.btn__reset'); 

let missed = 0;


const phrases = [
    'we are reading a book',
    'my hat is red',
    'we could meet tomorrow at my home',
    'web development makes fun',
    'we started to learn javascript',
    'it makes fun'
];

// splits a given string into characters and returns it as an array of characters
function getRandomPhraseAsArray(arr) {
    const index = Math.floor(Math.random() * phrases.length);
    return arr[index].split('');
}



/**
 * 'addPhraseToDisplay' puts each character from the given array of characters into a newly created list element
 * and appends that list item to '#phrase ul' in the HTML. If the letter is a character it adds a class 'letter'
 * to the list item
 */
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
        const item = document.createElement('li');
        item.textContent = char;
        phrase.append(item);

        if (char === ' ') {
            item.className = 'space';
        } else {
            item.className = 'letter';
        }
    }
}

// calling the above functions
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// checks if the chosen letter is in the given phrase
 function checkLetter(button) {
    const letters = document.querySelectorAll('.letter');
    const chosenLetter = button.textContent;
    let match = null;

    for (let i = 0; i < letters.length ; i++) {
        const item = letters[i];
        const givenLetter = item.textContent;

        if (givenLetter === chosenLetter) {
            item.classList.add('show');
            match = chosenLetter;
        } 
    }
    return match;
}

// checks if the game has been won or lost
function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const matchedLetters = document.querySelectorAll('.show');
    const overlay = document.getElementById('overlay');
    const headline = overlay.firstChild;

    if (missed > 4) {
        overlay.classList.add('lose');
        headline.textContent = 'You lost!';
        overlay.style.display = 'flex';
    }

    if (matchedLetters.length === letters.length) {
        overlay.classList.add('win');
        headline.textContent = 'You won!';
        overlay.style.display = 'flex';
    }
}

// listens for a click event on the start game button 
startGame.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}); 

// listens for a click event on a button from the onscreen keyboard
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        const chosenButton = e.target;
        chosenButton.className = 'chosen';
        chosenButton.disabled = true;
        const letterFound = checkLetter(chosenButton);
        if (letterFound === null) {
            missed += 1;
            const heartIMG = document.querySelector('img[src="images/liveHeart.png"]');
            heartIMG.src = 'images/lostHeart.png';
        }
        checkWin();
    }
});

























