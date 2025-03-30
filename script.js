let balance = 0;
let bet = 0;
let playerHand = [];
let dealerHand = [];

// Set balance when user selects an option
function setBalance(amount) {
    balance = amount;
    document.getElementById("balance").innerText = `Balance: $${balance}`;
}

// Place a bet based on percentage input
function placeBet() {
    let percent = document.getElementById("betPercent").value;
    bet = Math.floor((percent / 100) * balance);
    if (bet > balance) bet = balance; // Prevent over-betting
    document.getElementById("betAmount").innerText = `Current Bet: $${bet}`;
}

// Draw a random card (value between 1 and 11)
function drawCard() {
    return Math.floor(Math.random() * 11) + 1;
}

// Start a new Blackjack round
function startGame() {
    if (bet === 0) {
        alert("Place a bet first!");
        return;
    }

    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];

    document.getElementById("player-hand").innerText = playerHand.join(", ");
    document.getElementById("dealer-hand").innerText = `${dealerHand[0]}, ?`;

    document.getElementById("result").innerText = "";
}

// Hit: Draw another card
function hit() {
    playerHand.push(drawCard());
    document.getElementById("player-hand").innerText = playerHand.join(", ");
    checkGame();
}

// Stand: Compare hands with dealer
function stand() {
    while (dealerHand.reduce((a, b) => a + b, 0) < 17) {
        dealerHand.push(drawCard());
    }
    
    document.getElementById("dealer-hand").innerText = dealerHand.join(", ");
    checkGame();
}

// Check game result
function checkGame() {
    let playerTotal = playerHand.reduce((a, b) => a + b, 0);
    let dealerTotal = dealerHand.reduce((a, b) => a + b, 0);

    if (playerTotal > 21) {
        document.getElementById("result").innerText = "You Busted! You lose.";
        balance -= bet;
    } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
        document.getElementById("result").innerText = "You Win!";
        balance += bet;
    } else if (playerTotal < dealerTotal) {
        document.getElementById("result").innerText = "You Lose.";
        balance -= bet;
    } else {
        document.getElementById("result").innerText = "It's a Tie!";
    }

    document.getElementById("balance").innerText = `Balance: $${balance}`;
}

// Reset game
function resetGame() {
    balance = 0;
    bet = 0;
    playerHand = [];
    dealerHand = [];
    document.getElementById("balance").innerText = "Balance: $0";
    document.getElementById("player-hand").innerText = "";
    document.getElementById("dealer-hand").innerText = "";
    document.getElementById("betAmount").innerText = "Current Bet: $0";
    document.getElementById("result").innerText = "";
}