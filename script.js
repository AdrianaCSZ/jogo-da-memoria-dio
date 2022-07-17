/* 
    Splash Screen
*/

const splashScreen = document.querySelector('.splash-screen')

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        splashScreen.classList.add('display-none')
    }, 3100)
})

/* 
    Tela do jogo
*/

const cards = document.querySelectorAll('.card')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

// Função para virar as cartas selecionadas
function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add('flip')
    
    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return 
    }
    secondCard = this
    hasFlippedCard = false
    checkForMatch()
}

// Função para checar se as duas cartas selecionadas são iguais
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards()
        return
    }

    unflipCards()
}

// Desabilita o flip das cartas (usada para desabilitar em caso de duas cartas iguais)
function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

// Função para embaralhar as cartas aleatoriamente a cada nova rodada
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
})()

// Adiciona a propriedade de 'click' nas cartas e executa a função flipCard
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})
