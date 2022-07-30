# Front-end Web Development 
## Technology Used - HTML, CSS, and JavaScript. 
### A Simple Classic Guessing Number Game
[Click here to run](https://tvn9.github.io/jsps/numguessgame/)

```javascript
// matching user input number with pc generated random number
function matchScores() {
   let message;
   if (gameScores.score > 1) {
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
   console.log(message);
   console.log(gameScores)
   return message;
}

// Update UI States 
function updateUIStates(message) {
   let scoreMsg = message;
   if (message === winmsg) {
      uiMessage.innerHTML = winmsg;
      uiBody.style.backgroundColor = "#60b347";
      uiRanNum.innerHTML = gameScores.pcNum;
      uiScore.innerHTML = gameScores.score;
      uiHighScore.innerHTML = gameScores.highScore;
      uiRanNum.style.width = "30rem";
   } else if (message === lossmsg) {
      uiMessage.innerHTML = lossmsg;
   } else {
      uiScore.innerHTML = gameScores.score;
      uiHighScore.innerHTML = gameScores.highScore;
      uiMessage.innerHTML = scoreMsg;
   }
}

// updateGameDate stores game scores to GameScores object
// then update the UI with the correct value based on game's scores
// stove in the gameScores object
function updateGameData(guessVal) {
   let userNum = Number(guessVal);
   gameScores.usrInput = userNum;
   gameScores.pcNum = ranNum;
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
}


```