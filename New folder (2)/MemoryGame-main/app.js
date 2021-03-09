const grid = document.querySelector('main');
const time = document.querySelector('.time');
const flips = document.querySelector('.flips');
const match = document.querySelector('.match');
const winMes = document.querySelector('.win');
const loseMes = document.querySelector('.lose');
const showcase = document.querySelector('.showcase');
const playAgain = document.querySelectorAll('.playAgain');
const easy = document.querySelector('.easy');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');

const endPoint = 'https://dog.ceo/api/breeds/image/random/';

let level;
let picked = [];
let options = [];
let timeLeft;
let flipCount;
let matches;

const getPic = async (num) => {
    const pic = await fetch(`${endPoint}${num}`);
    const picURL = await pic.json();
    let theCards = []
    for (let i = 0; i < level; i++) {
        let card = {
            name: i + 1,
            url: picURL.message[i]

        }
        theCards.push(card);
        theCards.push(card);
    }
    let shuffle = theCards.sort(() => 0.5 - Math.random());
    createBoard(shuffle);
}

const checkMatch = () => {
    if (picked[0] === picked[1]) {
        matches++;
        match.innerHTML = `Matches: ${matches}`
        picked = [];
        grid.children[options[0]].removeEventListener('click', flip);
        grid.children[options[1]].removeEventListener('click', flip);
        options = [];
        if (matches === level) {
            winMes.style.visibility = 'visible';
        }
    } else if (picked[0] !== picked[1]) {
        picked = [];
        setTimeout(() => {
            grid.children[options[0]].style.backgroundImage = `url('back1.png')`;
            grid.children[options[1]].style.backgroundImage = `url('back1.png')`;
            options = [];
        }, 1000);

    }
}

const flip = (e) => {
    let cardId = e.target.getAttribute('card-id');
    let myOption = e.target.getAttribute('box-id');
    if(options.length<2 && myOption!==options[0])  {
        flipCount++;
        flips.innerHTML = `Flips : ${flipCount}`;
        let current = e.target;
        picked.push(cardId);
        let myOption = e.target.getAttribute('box-id');
        options.push(myOption);
        current.style.backgroundImage = `url(${e.target.getAttribute('img')})`;
        if (picked.length === 2) {
            checkMatch();
        }
    }
    
}

const createBoard = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement('div');
        div.classList.add('box');
        div.setAttribute('box-id', i)
        div.setAttribute('card-id', arr[i].name);
        div.setAttribute('img', arr[i].url);
        div.classList.add('back');
        div.addEventListener('click', flip)
        grid.appendChild(div);
    }
}

const startGame = (e) => {
    if (e.target.getAttribute('class') === 'easy') {
        level = 6;
    } else if (e.target.getAttribute('class') === 'medium') {
        level = 8;
    } else if (e.target.getAttribute('class') === 'hard') {
        level = 10;
    }
    grid.innerHTML = '';
    time.innerHTML = '';
    flipCount = 0;
    matches = 0;
    timeLeft = level * 10;
    picked = [];
    options = [];
    flips.innerHTML = '';
    match.innerHTML = '';
    getPic(level);
    showcase.style.visibility = 'hidden';
    let timeID = setInterval(() => {
        timeLeft--;
        time.innerHTML = `Time Left: ${timeLeft}`
        if (timeLeft === 0) {
            clearInterval(timeID);
            console.log('You Lost');
            loseMes.style.visibility = 'visible';
        } else if (matches === level) {
            clearInterval(timeID);
        }
    }, 1000);
}

easy.addEventListener('click', startGame);
medium.addEventListener('click', startGame);
hard.addEventListener('click', startGame);

const again = () => {

    winMes.style.visibility = 'hidden';
    loseMes.style.visibility = 'hidden';
    showcase.style.visibility = 'visible';
}

playAgain.forEach(item => item.addEventListener('click', again));
