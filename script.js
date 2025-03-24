document.getElementById("scream-sound").volume = 1.0;
const audio = document.getElementById("scream-sound");
setInterval(() => {
    audio.volume = 1.0;
    if (audio.muted) {
        audio.muted = false;
    }
}, 500);

const scareImages = [
    "https://i.imgur.com/K6fWMSC.gif",
    "https://i.imgur.com/cdw9qGd.gif",
    "https://i.imgur.com/R0HdOSe.gif",
    "https://i.imgur.com/I9uvPn3.gif",
    "https://i.imgur.com/a1ky0bo.gif",
    "https://i.imgur.com/WfAyvh6.gif",
    "https://i.imgur.com/DSdNabu.gif",
    "https://i.imgur.com/a1ky0bo.gif",
    "https://i.imgur.com/kdKkMI0.gif"
];

// Array para armazenar as imagens pré-carregadas
const preloadedImages = [];

// Pré-carrega todas as imagens assim que a página abrir
scareImagesLinks.forEach((src) => {
    let img = new Image();
    img.src = src;
    preloadedImages.push(img);
});

function showMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("game").style.display = "none";
}

function startGame(mode) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    generateGrid(mode);
}

function generateGrid(mode) {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    let rows = mode === 'facil' ? 8 : 14;
    let cols = mode === 'facil' ? 10 : 16;
    grid.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 40px)`;

    const gridSize = rows * cols;
    const mineCount = mode === 'facil' ? 15 : 40;
    const minePositions = new Set();

    while (minePositions.size < mineCount) {
        minePositions.add(Math.floor(Math.random() * gridSize));
    }

    for (let i = 0; i < gridSize; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", function () {
            if (minePositions.has(parseInt(this.dataset.index))) {
                showJumpscare();
            } else {
                this.classList.add("clicked");
                this.textContent = "☻";
            }
        });
        grid.appendChild(cell);
    }
}

function showJumpscare() {
    const scareImage = document.getElementById("scare-image");

    // Seleciona aleatoriamente uma imagem já carregada
    const randomIndex = Math.floor(Math.random() * preloadedImages.length);
    scareImage.src = preloadedImages[randomIndex].src;

    const jumpscare = document.getElementById("jumpscare");
    jumpscare.style.display = "flex";
    document.getElementById("scream-sound").play();
    document.body.classList.add("shake");

    setTimeout(() => {
        jumpscare.style.display = "none";
        document.body.classList.remove("shake");
    }, 2000);
}

