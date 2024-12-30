let userScore = 0;
let compScore = 0; 

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
const resetButton = document.querySelector("#reset-btn");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randmIndx = Math.floor(Math.random() * 3);
    return options[randmIndx];
}

const Draw = () => {
    console.log("Game was Draw");
    msg.innerText = `Game Was Draw! Play Again.`
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        console.log("You Win!");
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win!, Your ${userChoice} beats ${compChoice} `;
        msg.style.backgroundColor = "green";
    }
    else{
        console.log("You Loose!");
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Loose!, ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) => {
    console.log(`user choice is: ${userChoice}`)
    // Genereate Computer Choice 
    const compChoice = genCompChoice();
    console.log(`computer choice is: ${compChoice}`)

    if(userChoice === compChoice){
        //Draw Game
        Draw();
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            //scissors, paper
            userWin = compChoice === "paper" ? false:true;
        }
        else if(userChoice === "paper"){
            // rock, scissors
            userWin = compChoice === "scissors" ? false:true;
        }
        else{
            // rock, paper
            compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}

choices.forEach((choice) => {
    // console.log(choice);
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id")
        // console.log("choice was clicked", userChoice);
        playGame(userChoice);
    })
})

resetButton.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "rgba(208, 106, 208, 1)";
  });
