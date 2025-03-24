const audio = document.getElementById("scream-sound");

// Impedir que o usuário abaixe o volume ou mute
setInterval(() => {
    if (audio.muted) {
        audio.muted = false;
    }
    audio.volume = 1.0;
}, 500);

// NOVA LISTA DE IMAGENS HOSPEDADAS NO IMGUR (GIFs)
const scareImagesLinks = [
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

// Função para mostrar o menu novamente
function showMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("game").style.display = "none";
}

// Função para iniciar o jogo com base no modo escolhido
function startGame(mode) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    generateGrid(mode);
}

// Função para gerar a grade do campo minado
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

// Função para mostrar o jumpscare
function showJumpscare() {
    const scareImage = document.getElementById("scare-image");

    // Seleciona aleatoriamente uma imagem da lista
    const randomIndex = Math.floor(Math.random() * scareImagesLinks.length);
    scareImage.src = scareImagesLinks[randomIndex];

    const jumpscare = document.getElementById("jumpscare");
    jumpscare.style.display = "flex";
    document.getElementById("scream-sound").play();
    document.body.classList.add("shake");

    setTimeout(() => {
        jumpscare.style.display = "none";
        document.body.classList.remove("shake");
    }, 2000);
}
