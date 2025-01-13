const words = [
    { word: 'kucing', clue: 'hewan imut' },
    { word: 'buku', clue: 'terbuat dari kertas' },
    { word: 'sekolah', clue: 'meja,buku,kursi' },
    { word: 'internet', clue: 'Jaringan' },
    { word: 'jawa', clue: 'jiwi' },
    { word: 'ilham', clue: 'hamli' },
    { word: 'pohon', clue: 'tanaman' },
    { word: 'meja', clue: 'alas buku' },
    { word: 'kursi', clue: 'tempat nyantai' },
    { word: 'semen', clue: 'pondasi rumah modern' },
    { word: 'tali', clue: 'alat untuk mengikat' },
    { word: 'sampah', clue: 'barang tidak berguna' },
    // Tambahkan 14 kata lainnya sesuai keinginan
];

let currentLevel = 0;
let score = 0;
let lives = 4;
let selectedWord;
let hiddenWord;

// Fungsi untuk mengacak array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Panggil fungsi shuffle untuk mengacak kata sebelum memulai game
shuffle(words);

function initializeGame() {
    if (currentLevel < words.length) {
        selectedWord = words[currentLevel].word;
        hiddenWord = '_'.repeat(selectedWord.length).split('');
        document.getElementById('clue').textContent = `Petunjuk: ${words[currentLevel].clue}`;
        displayWord();
        updateDisplays();
        document.getElementById('feedback').textContent = '';
        document.getElementById('letter-input').value = '';
        document.getElementById('letter-input').disabled = false;
        document.getElementById('guess-button').disabled = false;
        hintUsed = false; // Reset penggunaan hint saat level baru
    } else {
        document.getElementById('feedback').textContent = 'Selamat! Anda menyelesaikan semua level!';
    }
}

function displayWord() {
    document.getElementById('word-display').textContent = hiddenWord.join(' ');
}

function updateDisplays() {
    document.getElementById('level-display').textContent = `Level: ${currentLevel + 1}`;
    document.getElementById('score-display').textContent = `Skor: ${score}`;
    document.getElementById('lives-display').textContent = `Nyawa: ${lives}`;
}

function guessLetter() {
    const letterInput = document.getElementById('letter-input');
    const guessedLetter = letterInput.value.toLowerCase();

    if (guessedLetter && guessedLetter.length === 1) {
        let isCorrect = false;
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guessedLetter && hiddenWord[i] === '_') {
                hiddenWord[i] = guessedLetter;
                isCorrect = true;
            }
        }

        if (isCorrect) {
            document.getElementById('feedback').textContent = 'Benar!';
            document.getElementById('feedback').style.color = 'green';
            score += 10;
        } else {
            document.getElementById('feedback').textContent = 'Salah!';
            document.getElementById('feedback').style.color = 'red';
            lives--;
        }

        if (lives <= 0) {
            document.getElementById('feedback').textContent = 'Game Over! Coba lagi.';
            document.getElementById('guess-button').disabled = true;
            document.getElementById('letter-input').disabled = true;
        }

        if (!hiddenWord.includes('_')) {
            document.getElementById('feedback').textContent = 'Selamat! Anda menebak kata dengan benar!';
            currentLevel++;
            initializeGame();
        }

        displayWord();
        updateDisplays();
        letterInput.value = '';
    } else {
        document.getElementById('feedback').textContent = 'Masukkan satu huruf!';
        document.getElementById('feedback').style.color = 'red';
    }
}

let hintUsed = false; // Variabel untuk melacak apakah hint sudah digunakan

function initializeGame() {
    if (currentLevel < words.length) {
        selectedWord = words[currentLevel].word;
        hiddenWord = '_'.repeat(selectedWord.length).split('');
        document.getElementById('clue').textContent = `Petunjuk: ${words[currentLevel].clue}`;
        displayWord();
        updateDisplays();
        document.getElementById('feedback').textContent = '';
        document.getElementById('letter-input').value = '';
        document.getElementById('letter-input').disabled = false;
        document.getElementById('guess-button').disabled = false;
        hintUsed = false; // Reset penggunaan hint saat level baru
    } else {
        document.getElementById('feedback').textContent = 'Selamat! Anda menyelesaikan semua level!';
    }
}

function showHint() {
    if (!hintUsed) {
        const availableIndexes = hiddenWord
            .map((char, index) => (char === '_' ? index : null))
            .filter(index => index !== null);

        if (availableIndexes.length > 0) {
            const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
            hiddenWord[randomIndex] = selectedWord[randomIndex];
            displayWord();

            document.getElementById('feedback').textContent = 'Petunjuk diberikan!';
            document.getElementById('feedback').style.color = 'blue';
            hintUsed = true; // Tandai bahwa hint sudah digunakan
        } else {
            document.getElementById('feedback').textContent = 'Tidak ada petunjuk lagi yang tersedia!';
            document.getElementById('feedback').style.color = 'red';
        }
    } else {
        document.getElementById('feedback').textContent = 'Anda sudah menggunakan petunjuk untuk level ini!';
        document.getElementById('feedback').style.color = 'red';
    }
}

window.onload = function() {
    initializeGame();
    document.getElementById('guess-button').addEventListener('click', guessLetter);
    document.getElementById('restart-button').addEventListener('click', function() {
        currentLevel = 0;
        score = 0;
        lives = 4;
        initializeGame();
    });
    document.getElementById('hint-button').addEventListener('click', showHint);
    document.getElementById('letter-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            guessLetter();
        }
    });
};
      
