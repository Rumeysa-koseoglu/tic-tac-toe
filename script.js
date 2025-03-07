let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//winning pattern array
//Identify possible ways to win
let winingPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

//Player 'X' plays first
//(if true, 'X' plays, if false 'O' plays)
let xTurn = true;
/*keeps track of the total number of moves made and controls the draw*/
let count = 0;

// Disable all buttons when the winner is determined, prevent further moves, and show the popup
const disableButtons = () => {
    setTimeout(() => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
    }, 300);
};

//enable all buttons (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        //Clear all boxes(btnRef)
        element.innerText = "";
        // all boxes are clickable again
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

//Call this function when the winner is determined
const winFunction = (letter) => {
    disableButtons();
    //show winner message in popup
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

//Function for draw
//run the function when there is a draw
const drawFunction = () => {
    //disable all boxes(btnRef)
    disableButtons();
    //display a draw message
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//new game
newGameBtn.addEventListener("click", () => {
    //reset move counter when new game button is clicked
    count = 0;
    // clear and activate buttons
    enableButtons();
});

//reset move counter when restart button is clicked
restartBtn.addEventListener("click", () => {
    count = 0;
    //clear and activate buttons
    enableButtons();
})

//Win logic
const winChecker = () => {
    //Loop through all win patterns (all winning combinations)
    for (let i of winingPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are filled
        //If 3 empty elements are same and would give win as would
        if (element1 != "" && (element2 != "") && (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //If all 3 buttons have same values then pass the value to winFunction
                winFunction(element1);
            }
        }
    }
}

//Display X/O on click
btnRef.forEach((element) => {
    //add click event to all boxes
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //display X
            //fill in the box, 
            element.innerText = "X";
            //prevent it from being clicked again
            element.disabled = true;
        } else {
            xTurn = true;
            //display O
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click
        count += 1;
        //if the numberof moves reaches 9 and no one wins, it is a draw
        if (count == 9) {
            drawFunction();
        }
        //Check for win on every click
        winChecker();
    });
});

//enable buttons and disable popup on page load
window.onload = enableButtons;