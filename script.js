document.getElementById("scream-sound").volume = 1.0;
const audio = document.getElementById("scream-sound");
setInterval(() => {
    if (audio.muted) {
        audio.muted = false;
    }
    audio.volume = 1.0;
}, 500);

const scareImages = [
    "https://i.imgur.com/7eO1fjy.jpeg",
    "https://i.imgur.com/BJltEmK.jpeg",
    "https://i.imgur.com/RPgNDW3.jpeg",
    "https://i.imgur.com/EiIO9Nb.jpeg",
    "https://i.imgur.com/kdKkMI0.gif"
    



];

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
        cell.addEventListener("click", function() {
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
    scareImage.src = scareImages[Math.floor(Math.random() * scareImages.length)];
    const jumpscare = document.getElementById("jumpscare");
    jumpscare.style.display = "flex";
    document.getElementById("scream-sound").play();
    document.body.classList.add("shake");
    setTimeout(() => {
        jumpscare.style.display = "none";
        document.body.classList.remove("shake");
    }, 2000);
}
