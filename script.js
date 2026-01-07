const container = document.getElementById("container");
const openBtn = document.getElementById("openBtn");
const letterText = document.getElementById("letterText");
const forgiveBtn = document.getElementById("forgiveBtn");
const forgiveMsg = document.getElementById("forgiveMsg");
const filmBg = document.getElementById("filmBg");
const bgMusic = document.getElementById("bgMusic");

/* MUSIC RANGE */
const musicStart = 11;   // 0:11
const musicEnd = 237;    // 3:57

const text = `I’m really sorry kung nakalimutan kitang i-update. Hindi ko sinasadya,
and I know na kahit simpleng update lang, big deal yun.

Hindi dahil busy ako kaya kita nakalimutan. Ikaw pa rin yung nasa isip ko,
I just failed to show it that time.

I’m sorry kung pina-feel ko na parang hindi ka priority,
because the truth is, you are.

I promise to do better, not just with words, but with actions.
Thank you for being patient with me.`;

let index = 0;
const typingSpeed = 35;

/* TYPEWRITER */
function typeWriter() {
  if (index < text.length) {
    letterText.innerHTML +=
      text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
    index++;
    setTimeout(typeWriter, typingSpeed);
  }
}

/* SMOOTH VOLUME FADE */
function fadeVolume(target, duration = 800) {
  const stepTime = 40;
  const steps = duration / stepTime;
  const step = (target - bgMusic.volume) / steps;

  let count = 0;
  const fade = setInterval(() => {
    bgMusic.volume = Math.min(1, Math.max(0, bgMusic.volume + step));
    count++;
    if (count >= steps) clearInterval(fade);
  }, stepTime);
}

/* STOP MUSIC AT END TIME */
bgMusic.addEventListener("timeupdate", () => {
  if (bgMusic.currentTime >= musicEnd) {
    bgMusic.pause();
  }
});

openBtn.onclick = () => {
  container.classList.add("open");
  letterText.innerHTML = "";
  index = 0;

  filmBg.classList.add("blur");

  bgMusic.currentTime = musicStart;
  bgMusic.volume = 0.6;
  bgMusic.play().catch(() => {});

  fadeVolume(0.25); // lower volume while typing
  typeWriter();
};

forgiveBtn.onclick = () => {
  forgiveMsg.style.display = "block";
  forgiveBtn.style.display = "none";

  fadeVolume(0.4); // slight raise after forgive
};
