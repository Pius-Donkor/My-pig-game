"use strict";

//buttton selects
const roll = document.querySelector(".roll");
const switchP = document.querySelector(".switch");
const reset = document.querySelector(".reset");
//input selects
const dice = document.querySelector("img");
const currentScore1 = document.querySelector(".c_score_inp--1");
const currentScore2 = document.querySelector(".c_score_inp--2");
const score1 = document.querySelector(".inp__player--1");
const score2 = document.querySelector(".inp__player--2");

let cur, scores, active, winCount, acc, limit, random;

const diceRoll = function (random) {
  dice.style.transform = "scale(1.15) rotate(90deg)";
  dice.style.transition = "all 0.3s";
  dice.src = `img/dice-${random}.png`;

  setTimeout(function () {
    dice.style.transition = " all 0.3s";
    dice.style.transform = "scale(1) rotate(360deg) ";
  }, 1000);
};

const toggler = function () {
  acc = 0;
  active = active === 1 ? 0 : 1;
  document.querySelectorAll(".player").forEach((playerAc) => {
    playerAc.classList.toggle("active");
  });
};

const randomCol = function () {
  if (winCount > 1) return;
  document.querySelector(
    `.player__${cur[active]}`
  ).style.backgroundColor = `rgba( ${Math.floor(Math.random() * 255) + 1}, ${
    Math.floor(Math.random() * 255) + 1
  }, ${Math.floor(Math.random() * 255) + 1}, 0.512)`;
};
function init1() {
  score1.textContent = "";
  score2.textContent = "";
}

function init2() {
  cur = [1, 2];
  scores = [0, 0];
  active = 0;
  winCount = 0;
  random;
  acc = 0;
  limit = 30;
}

dice.style.opacity = 0;
init2();
init1();

roll.addEventListener("click", function () {
  if (scores[active] >= limit) return;

  random = Math.floor(Math.random() * 6) + 1;
  diceRoll(random);
  acc += random;
  dice.style.opacity = 1;
  console.log(active);
  document.querySelector(`.inp__player--${cur[active]}`).textContent = acc;

  if (random === 1) {
    init1();
    toggler();
  }

  // console.log(random);
});

//switching player and  implement win
switchP.addEventListener("click", function () {
  if (winCount > 0) return;
  scores[active] += acc;
  console.log(active);
  document.querySelector(`.c_score_inp--${cur[active]}`).textContent =
    scores[active];

  //winner

  if (scores[active] >= limit) {
    winCount++;
    const html = `
    <div class="winner">
          <p>player 1 wins 🎊🏆🎉</p>
        </div>
 `;
    document
      .querySelector(`.current__${cur[active]}`)
      .insertAdjacentHTML("afterend", html);
    setInterval(function () {
      if (winCount > 1) return;
      randomCol();
    }, 1000);
  } else {
    init1();
    toggler();
  }
});

//resetting
reset.addEventListener("click", function () {
  console.log(winCount);
  currentScore1.textContent = "";
  currentScore2.textContent = "";
  init1();
  init2();
  document.querySelector(".winner")?.remove();
  location.reload();
});
