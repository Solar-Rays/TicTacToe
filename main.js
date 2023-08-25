const X_CLASS = 'x'
const O_CLASS = 'o'
const CELLELEMENTS = document.querySelectorAll('[data-cell]');
const BOARD = document.getElementById('board');
let oTurn
const WINNING_COMBO = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]
const WINNING_MESSAGE = document.getElementById('winning-message')
const WINNING_MESSAGE_TEXT = document.querySelector('[data-winning-message-text]')
const RESTART_BTN = document.getElementById('restart-btn')




startGame()

RESTART_BTN.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    CELLELEMENTS.forEach(
        function (cell) {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(O_CLASS)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        }
    )
    boardHoverState()
    WINNING_MESSAGE.classList.remove('show')
}

// The parsed in 'e' is a built in part of JS. So basically any eventlistener can have e parsed into the function. .target gets the specific cell that was clicked
function handleClick(e) {
    const cell = e.target
    // This checks which person is playing
    const currentClass = currentPlayer()
    placeMark(cell, currentClass)

    // Check for win 
    // The checkWin() function returns a boolean. The result is then used to determine what to do, (continue the game or end it)
    if (checkWin(currentClass)) {
        endGame(false)
        // WINNING_MESSAGE_TEXT.innerText = currentClass + ' wins!'
        // WINNING_MESSAGE.classList.add('show')
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        boardHoverState()
    }
}

function endGame(draw) {
    if (draw) {
        WINNING_MESSAGE_TEXT.innerText = 'Draw!'
    } else {
        const currentClass = currentPlayer()
        WINNING_MESSAGE_TEXT.innerText = currentClass + ' wins!'
    }

    WINNING_MESSAGE.classList.add('show')

}

function isDraw() {
    return [...CELLELEMENTS].every(
        function (cell) {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
        }
    )
}

// This function adds the current marker. 
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// This function checks if oTurn is true. It would be false initially considering the variable is not set to anything yet
function currentPlayer() {
    if (oTurn == true) {
        return O_CLASS;
    } else {
        return X_CLASS
    }
}

function swapTurns() {
    oTurn = !oTurn
}

function boardHoverState() {
    BOARD.classList.remove(O_CLASS)
    BOARD.classList.remove(X_CLASS)
    if (oTurn == true) {
        BOARD.classList.add(O_CLASS)
    } else {
        BOARD.classList.add(X_CLASS)
    }
}

// This function returns true or false. The result is fed into the conditional statement above as a boolean 
function checkWin(currentClass) {
    // The .some method checks if at least one of out of the conditions is true
    return WINNING_COMBO.some(
        function (combination) {
            // .every - This checks if every one of the items in the method is true
            return combination.every(
                function (index) {
                    // .contains checks if each of the items in the CELLELEMENTS contains the current class 
                    return CELLELEMENTS[index].classList.contains(currentClass)
                }
            )
        }
    )
}