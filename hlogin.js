const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// ========== MATRIX CHAR RAIN ==========
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

// ========== MESH LIGHT EFFECT ==========
let meshLines = [];
function generateMesh() {
  meshLines = Array.from({ length: 40 }, () => ({
    x1: Math.random() * canvas.width,
    y1: Math.random() * canvas.height,
    x2: Math.random() * canvas.width,
    y2: Math.random() * canvas.height,
    width: Math.random() * 3 + 1,
    glow: Math.floor(Math.random() * 8) + 4,
    opacity: Math.random() * 0.5 + 0.5
  }));
}
generateMesh();

function drawMesh() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  meshLines.forEach(line => {
    ctx.strokeStyle = `rgba(0, 255, 0, ${line.opacity})`;
    ctx.lineWidth = line.width;
    ctx.shadowBlur = line.glow;
    ctx.shadowColor = '#0F0';

    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();

    line.width += (Math.random() - 0.5) * 0.2;
    if (line.width < 1) line.width = 1;
    if (line.width > 4) line.width = 4;

    line.x1 = (line.x1 + (Math.random() - 0.5) * 3 + canvas.width) % canvas.width;
    line.y1 = (line.y1 + (Math.random() - 0.5) * 3 + canvas.height) % canvas.height;
    line.x2 = (line.x2 + (Math.random() - 0.5) * 3 + canvas.width) % canvas.width;
    line.y2 = (line.y2 + (Math.random() - 0.5) * 3 + canvas.height) % canvas.height;
  });
}
setInterval(drawMesh, 5000);

// ========== BOUNCING LETTERS EFFECT ==========
const bounceLetters = [];
for (let i = 0; i < 25; i++) {
  bounceLetters.push({
    text: letters.charAt(Math.floor(Math.random() * letters.length)),
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4
  });
}

function drawBounce() {
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff00';
  ctx.font = '20px monospace';

  bounceLetters.forEach(letter => {
    ctx.fillText(letter.text, letter.x, letter.y);
    letter.x += letter.dx;
    letter.y += letter.dy;

    if (letter.x < 0 || letter.x > canvas.width) letter.dx *= -1;
    if (letter.y < 0 || letter.y > canvas.height) letter.dy *= -1;
  });
}
setInterval(drawBounce, 7000);

// ========== LOGIN BUTTON HACK GLITCH ==========
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
  loginBtn.disabled = true;
  loginBtn.innerText = 'Authenticating...';
  setTimeout(() => {
    loginBtn.innerText = 'Access Denied';
    loginBtn.style.background = '#ff0000';
  }, 1500);
});

// ========== PASSWORD VISIBILITY SCAN ==========
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');

togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.textContent = isHidden ? '🙈' : '👁️';

  const scan = document.createElement('div');
  scan.className = 'scan-effect';
  passwordInput.parentElement.appendChild(scan);
  setTimeout(() => scan.remove(), 600);
});

// OPTIONAL: Add dynamic glitch flash
setInterval(() => {
  if (Math.random() > 0.998) {
    ctx.fillStyle = 'rgba(0,255,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}, 300);

loginBtn.addEventListener("click", function () {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  if (username.value.trim() === "" || password.value.trim() === "") {
    alert("⚠️ Access denied. Please enter both credentials.");

    // Add shake animation
    if (username.value.trim() === "") username.classList.add("input-error");
    if (password.value.trim() === "") password.classList.add("input-error");

    // Remove shake effect after animation
    setTimeout(() => {
      username.classList.remove("input-error");
      password.classList.remove("input-error");
    }, 500);
  } else {
    // Proceed (for now just simulate access)
    alert("🔓 Verifying credentials...");
  }
});