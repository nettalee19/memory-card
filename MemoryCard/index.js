const board = document.querySelector('.board');
const card = document.querySelector('.card');
const start = document.querySelector('#start');
const wrong = document.querySelector('#wrong');
const timer = document.querySelector('#timer');
const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let time = 0;
const chooseCards = {
    first: -1,
    second: -1,
    wrongHit: 0,
    successHit: 0
}

function suffle() {
    for (let i = 0; i < cards.length; i++) {
        let randomCard = Math.floor(Math.random() * cards.length);
        let temp = cards[i];
        cards[i] = cards[randomCard];
        cards[randomCard] = temp
    }
    // console.log(cards)
}

function createBoard() {
    board.innerHTML = "";
    clearInterval(runTimer);
    time = 0;
    suffle();
    runTimer();
    for (let i = 0; i < cards.length; i++) {
        board.innerHTML += `<div class="card red">${cards[i]}</div>`

        // card.addEventListener('click',lala);
        if ((i + 1) % 4 === 0) {
            board.innerHTML += '<br/>'
        }
    }
    const card = document.querySelectorAll('.card');

    card.forEach((c) => {
        c.addEventListener('click', flipCard);
    })
}

function flipCard(e) {
    let val = e.target.innerHTML;
    //write this to error
    // e.target.classList.remove('red')
    // e.target.classList.add('yellow')

    checkMatch(e.target)
}

function checkMatch(val) {

    if (chooseCards.first === -1) {
        chooseCards.first = val
        addYellow(val);

    } else if (chooseCards.second == -1) {
        chooseCards.second = val;
        addYellow(val);
        if (chooseCards.second.innerText !== chooseCards.first.innerText) {
            chooseCards.wrongHit++;
            wrong.innerHTML = chooseCards.wrongHit;
            setTimeout(() => {
                addRed(chooseCards.first);
                addRed(chooseCards.second);

                chooseCards.second = -1;
                chooseCards.first = -1
            }, 1000);
        } else {
            chooseCards.successHit++;
            if (chooseCards.successHit === cards.length / 2) {
                alert("yesss")
            }
            chooseCards.second = -1;
            chooseCards.first = -1
        }

    }
}

function addRed(event) {
    event.classList.add('red');
    event.classList.remove('yellow');
}

function addYellow(event) {
    event.classList.add('yellow');
    event.classList.remove('red');
}

let myVar = setInterval(runTimer, 1000);

function runTimer() {
    time++;
    timer.innerHTML =`${parseInt(time/60)}: ${parseInt(time%60)}`;
}

start.addEventListener('click', createBoard)
