let mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restartBtn = document.querySelector(".restart-btn");
const scoreDisplay = document.querySelector(".score");

let score = 0;
let scoreInterval = null;

let isGameOver = false;
let loop = null;

const jump = () => {
  if (isGameOver || !mario) return;

  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

document.addEventListener("keydown", jump);

const loopRestart = () => {
  score = 0;
  scoreDisplay.textContent = score;
  scoreInterval = setInterval(() => {
    if (!isGameOver) {
      score++;
      scoreDisplay.textContent = score;
    }
  }, 200);

  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    if (pipePosition < 110 && pipePosition > 0 && marioPosition < 110) {
      pipe.style.animation = "none";
      pipe.style.left = "${pipePosition}px";

      mario.style.animation = "none";
      mario.style.bottom = "${marioPosition}px";

      mario.src = "./images/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      isGameOver = true;
      clearInterval(loop);
      clearInterval(scoreInterval);

      restartBtn.style.display = "block";
    }
  }, 10);
};

const restartGame = () => {
  isGameOver = false;

  // Resetar o cano
  pipe.style.left = "";
  pipe.style.animation = "pipe-animation 2s infinite linear";

  // Remover o Mario antigo
  document.querySelector(".mario").remove();

  // Criar novo Mario
  const newMario = document.createElement("img");
  newMario.src = "./images/mario.gif";
  newMario.classList.add("mario");
  newMario.style.bottom = "0";
  newMario.style.width = "150px";
  newMario.style.marginLeft = "0";
  newMario.style.position = "absolute";
  newMario.style.zIndex = "1";

  document.querySelector(".game-board").appendChild(newMario);

  // Atualizar referência
  mario = newMario;

  // Reativar o pulo
  document.addEventListener("keydown", jump);

  // Esconder botão de reinício
  restartBtn.style.display = "none";

  // Reiniciar o loop
  loopRestart();
};

loopRestart();
//Faz o mario pular ao tocar na tela(mobile).
document.addEventListener("touchstart", jump);
