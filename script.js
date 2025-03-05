let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//winning pattern array
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
let xTurn = true;
let count = 0;

//disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};

//enable all buttons (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else { 
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

//new game
newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
})

//Win logic
const winChecker = () => {
    //Loop through all win patterns
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
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //display Y
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click
        count += 1;
        if (count == 9) {
            drawFunction();
        }
        //Check for win on every click
        winChecker();
    });
});

//enable buttons and disable popup on page load
window.onload = enableButtons;