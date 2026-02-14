(() => {

const konamiBase = [
  "arrowup","arrowup",
  "arrowdown","arrowdown",
  "arrowright","arrowleft",
  "arrowright","arrowleft"
];

const soundURL = "https://store.soundeffectgenerator.org/instants/free-pachinko-sound-effect/bf042be2-cr-symphogear-pachinko.mp3";

let input = [];
let active = false;

let tapCount = 0;
let tapTimer = null;

let a1 = new Audio(soundURL);
let a2 = new Audio(soundURL);
let a3 = new Audio(soundURL);

[a1,a2,a3].forEach(a=>{
  a.volume = 1.0;
  a.preload = "auto";
});

/* ===============================
   PC 入力コード
================================ */

document.addEventListener("keydown", (e) => {

  const key = e.key.toLowerCase();
  input.push(key);

  if (input.length > 10) input.shift();

  if (checkKonami()) {
    if (!active) enableMode();
    input = [];
  }

});

function checkKonami() {

  if (input.length !== 10) return false;

  for (let i = 0; i < 8; i++) {
    if (input[i] !== konamiBase[i]) return false;
  }

  const last = input.slice(8);

  if (last[0] === "b" && last[1] === "a") return true;
  if (last[0] === "ば") return true;

  return false;
}

/* ===============================
   スマホ　タップコード
================================ */

document.addEventListener("touchstart", () => {

  if (active) return;

  tapCount++;

  clearTimeout(tapTimer);

  tapTimer = setTimeout(()=>{
    tapCount = 0;
  }, 1000); // 1秒以内に連続で

  if (tapCount >= 10) {
    tapCount = 0;
    enableMode();
  }

});

/* ===============================
   FEVER
================================ */

function enableMode() {

  active = true;

  if (!document.getElementById("konami-style")) {
    const style = document.createElement("style");
    style.id = "konami-style";
    style.innerHTML = `
    @keyframes flashRainbow {
      0%{background:#ff0000;}
      8%{background:#ff6600;}
      16%{background:#ffcc00;}
      24%{background:#99ff00;}
      32%{background:#00ff66;}
      40%{background:#00ffff;}
      48%{background:#0099ff;}
      56%{background:#0033ff;}
      64%{background:#6600ff;}
      72%{background:#cc00ff;}
      80%{background:#ff00aa;}
      88%{background:#ff0066;}
      100%{background:#ff0000;}
    }

    @keyframes textFlash {
      0%{color:#ff0000;}
      25%{color:#00ffff;}
      50%{color:#ffff00;}
      75%{color:#ff00ff;}
      100%{color:#00ff00;}
    }

    @keyframes iconRainbow {
      0%{filter:hue-rotate(0deg) saturate(3);}
      100%{filter:hue-rotate(360deg) saturate(3);}
    }
    `;
    document.head.appendChild(style);
  }

  document.body.style.animation = "flashRainbow 0.2s linear infinite";

  document.querySelectorAll("p, .big, i").forEach(el=>{
    el.style.animation = "textFlash 0.2s linear infinite";
  });

  document.querySelectorAll("img, svg").forEach(el=>{
    el.style.animation = "iconRainbow 0.2s linear infinite";
  });

  [a1,a2,a3].forEach(a=>{
    a.currentTime = 0;
    a.play().catch(()=>{});
  });

  a1.onended = disableMode;

  console.log("🔥 FEVER突入");
}

function disableMode() {

  active = false;

  document.body.style.animation = "";

  document.querySelectorAll("p, .big, i, img, svg").forEach(el=>{
    el.style.animation = "";
  });

  [a1,a2,a3].forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });

  console.log("FEVER終了");
}

console.log("😈😈😈😈😈");

})();
