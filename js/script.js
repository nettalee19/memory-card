// const btnStart = document.querySelector(".btn-start");
// const start = document.querySelector(".start");
// const input = document.querySelector(".input");


// btnStart.addEventListener("click", () =>{
//   start.remove()
// })

// const num = document.querySelector('.input').value
// const game = document.querySelector(".game")

// const cardsNum = num*2;
// const cards = document.createElement(".div")

// const cardArray =[
// {
//   name:"cat"
//   img: ""
// }
// ]

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false; //is it the first or second flip
let lockBoard= false;
let firstCard, secondCard;

function flipCard(){
  if(lockBoard) return; //if it is true, the rest will not be executed
  if(this === firstCard) return;

  this.classList.add('flip'); //was toggle

  if(!hasFlippedCard){
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  
  //second click
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();

}

function checkForMatch(){//do the cards match?
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  isMatch? disableCards() : unFlipCards()

}

function disableCards(){
  firstCard.removeEventListener("click", flipCard)
  secondCard.removeEventListener("click", flipCard)

  resetBoard();
}

function unFlipCards(){
  lockBoard = true; //if there is not a match- locking until cards are done with the flip;

  setTimeout(()=>{
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    //lockBoard = false; //until done
    resetBoard()
  }, 1000)
}

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
}

(function shuffle(){
  cards.forEach((card) =>{
    let randomPos = Math.floor(Math.random()*12)
    card.style.order = randomPos;
  })
})(); //executed right after it's definition 

cards.forEach(card => card.addEventListener("click", flipCard));