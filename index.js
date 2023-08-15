
// let playerOne = prompt("Player 1, please enter your name");
// alert("Player 1: " + playerOne);

// let playerTwo = prompt("Player 2, please enter your name");
// alert("Player 2: " + playerTwo);

// if (playerOne != "" && playerOne != null && playerOne != undefined && playerOne != " ") {
// document.getElementById("player1").innerHTML = playerOne;
// }

// if (playerTwo != " " && playerTwo != null && playerTwo != undefined && playerTwo != " "){
// document.getElementById("player2").innerHTML = playerTwo;
// }

document.getElementById('instructions').addEventListener('click', toggleActive);

document.getElementById('close').addEventListener('click', toggleInactive);

function toggleActive() {
    var element = document.getElementById('instructions-details');
    // element.classList.toggle('show');
    element.classList.toggle('hide');
}

function toggleInactive() {
    var element = document.getElementById('instructions-details');
    element.classList.add('hide');
}
