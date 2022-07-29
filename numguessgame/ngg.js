"use strict";

//Global game messages
const winmsg = "🏆 You Won!";
const lossmsg = "💥 Game over, try again?";
const highmsg = " ☝️️ Too high!";
const lowmsg = "👇 Too low!";
const oorang = "Try number from 1 to 20";
const uiScoreMsg = "Start guessing...";
const gameResetMsg = "reset";

// HTML classes variables - from index.html
const buttonReset = document.querySelector(".again");
const uiRanNum = document.querySelector(".number");
const uiGuess = document.querySelector(".guess");
const buttonCheck = document.querySelector(".btnCheck");
const uiMessage = document.querySelector(".message");
const uiScore = document.querySelector(".score");
const uiHighScore = document.querySelector(".highscore");
const uiBody = document.querySelector("body");

// Computer generate number
let ranNum = Math.trunc(Math.random() * 20) + 1;
console.log(ranNum);

// Game data object
const gameScores = {
   usrInput: 0,
   pcNum: 0,
   score: 20,
   highScore: 0,
};

const uiState = {
   uiRanNum: uiRanNum,
   uiGuess: uiGuess,
   uiMessage: uiMessage,
   uiScore: uiScore,
   uiHighScore: uiHighScore,
   uiBody: uiBody,
}

console.log(gameScores);

// Event listenners
uiGuess.addEventListener("keypress", function (event) {
   if (event.key === "Enter") {
      let guessVal = uiGuess.value;
      console.log(guessVal, typeof guessVal)
      updateGameData(guessVal);
   }
});

buttonCheck.addEventListener("click", function () {
   let guessVal = uiGuess.value;
   updateGameData(guessVal);
});

buttonReset.addEventListener("click", function () {
   gameReset();
});

// Play again data
function gameReset() {
   ranNum = Math.trunc(Math.random() * 20) + 1;
   gameScores.pcNum = ranNum;
   gameScores.usrInput = 0;
   if (gameScores.highScore > 0) {
      gameScores.score = gameScores.highScore;
      console.log(gameScores);
   } else {
      gameScores.score = 20;
      gameScores.highScore = 0;
      console.log(gameScores);
   }
   uiState.uiBody.style.backgroundColor = "#222222";
   uiState.uiRanNum.innerHTML = "?";
   uiState.uiGuess.value = "";
   uiState.uiScore.innerHTML = gameScores.score;
   uiState.uiMessage.innerHTML = uiScoreMsg;
}

// matching user input number with pc generated random number
function matchScores() {
   let message;
   if (gameScores.score > 0) {
      if (gameScores.usrInput > 0 && gameScores.usrInput <= 20) {
         if (gameScores.usrInput === gameScores.pcNum) {
            message = winmsg;
         } else if (gameScores.usrInput > gameScores.pcNum) {
            message = highmsg;
         } else if (gameScores.usrInput < gameScores.pcNum) {
            message = lowmsg;
         }
      } else {
         message = oorang;
      }
   } else {
      message = lossmsg;
   }
   console.log("From matchScores", message);
   return message;
}

// Update UI States 
function updateUIStates(message) {
   let scoreMsg = message;
   console.log(scoreMsg);
   console.log("from updateUIStates", scoreMsg)
   if (message === winmsg) {
      uiState.uiMessage.innerHTML = winmsg;
      uiState.uiBody.style.backgroundColor = "#60b347";
      uiState.uiRanNum.innerHTML = gameScores.pcNum;
      uiState.uiScore.innerHTML = gameScores.score;
      uiState.uiHighScore.innerHTML = gameScores.highScore;
      uiState.uiRanNum.style.width = "30rem";
   } else if (message === lossmsg ) {
      uiState.uiMessage.innerHTML = lossmsg;
   } else {
      uiState.uiScore.innerHTML = gameScores.score;
      uiState.uiHighScore.innerHTML = gameScores.highScore;
      uiState.uiMessage.innerHTML = scoreMsg;
   }
}


// Score to Game data object
function updateGameData(guessVal) {
   let userNum = Number(guessVal);
   gameScores.usrInput = userNum;
   gameScores.pcNum = ranNum;
   console.log("From updateGameDate", userNum, ranNum)
   let message = matchScores();
   if (message === winmsg) {
      gameScores.score += 1;
      gameScores.highScore = gameScores.score;
      updateUIStates(message);
   } else if (message === highmsg) {
      gameScores.score -= 1;
      updateUIStates(message);
   } else if (message === lowmsg) {
      gameScores.score -= 1;
      updateUIStates(message);
   } else if (message == oorang) {
      updateUIStates(message);
   } else if (message == lossmsg) {
      gameScores.score = 20;
      gameScores.highScore = 0;
      updateUIStates(message);
   }
   console.log("from updateGameDate", gameScores);
}

