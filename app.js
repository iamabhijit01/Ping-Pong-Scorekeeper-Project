const p1={
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Display"),
    score: 0,
    name:"Player One"
}

const p2={
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Display"),
    score: 0,
    name:"Player Two"
}

const resetButton=document.querySelector("#reset");

const winningScoreSelect=document.querySelector("#chooseScore");

const winstat=document.querySelector("#status");

let winningScore=parseInt(winningScoreSelect.value);
let isGameOver=false;

async function updateScores(player, opponent){
    if (!isGameOver) {
        player.score += 1;
        if(player.score===winningScore){
            isGameOver=true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled=true;
            opponent.button.disabled=true;
            const {default: confetti} = await import("https://cdn.skypack.dev/canvas-confetti@latest");
            confetti();
            //alert(`${player.name} WON!!`)
            winstat.textContent=`${player.name} WON!!`;
        }
        player.display.textContent = player.score;
      }
}

p1.button.addEventListener("click", function () {
    updateScores(p1,p2);
});

p2.button.addEventListener("click", function () {
    updateScores(p2,p1);
});

resetButton.addEventListener("click", reset);

winningScoreSelect.addEventListener("change", function(){
    winningScore=parseInt(this.value);
    reset();
});

function reset(){
    isGameOver=false;
    p1.score=0;
    p2.score=0;
    p1.display.textContent=0;
    p2.display.textContent=0;
    p1.display.classList.remove("has-text-success", "has-text-danger");
    p2.display.classList.remove("has-text-success", "has-text-danger");
    p1.button.disabled=false;
    p2.button.disabled=false;
    winstat.textContent="Use buttons to keep score";
    
}