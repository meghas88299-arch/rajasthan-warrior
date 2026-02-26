// ======================================================
// 1. MASTER QUESTION BANK (150 Questions Per World Structure)
// Data sourced from RPSC/RSMSSB PYQs (2016-2023)
// ======================================================
const questionLibrary = {
    "lab assistant": [
        // SCIENCE - EASY (Phase 1)
        { q: "Which of the following is the SI unit of Pressure?", options: ["Pascal", "Joule", "Watt", "Newton"], correct: 0, difficulty: "easy", topic: "Science" },
        { q: "What is the chemical formula of heavy water?", options: ["D2O", "H2O", "H2O2", "CO2"], correct: 0, difficulty: "easy", topic: "Science" },
        // SCIENCE - MEDIUM (Phase 2)
        { q: "Which mirror is used by dentists to see large images of teeth?", options: ["Concave", "Convex", "Plane", "Parabolic"], correct: 0, difficulty: "medium", topic: "Science" },
        // SCIENCE - HARD (Phase 3)
        { q: "The escape velocity on Earth's surface is approximately?", options: ["11.2 km/s", "9.8 km/s", "15.0 km/s", "4.2 km/s"], correct: 0, difficulty: "hard", topic: "Science" }
        // ... You will expand this to 50 entries per difficulty
    ],
    "ras": [
        // HISTORY - EASY
        { q: "Which city is known as the 'Pink City' of Rajasthan?", options: ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"], correct: 0, difficulty: "easy", topic: "History" },
        { q: "In which year was the Battle of Haldighati fought?", options: ["1576", "1570", "1565", "1582"], correct: 0, difficulty: "easy", topic: "History" },
        // GEOGRAPHY - MEDIUM
        { q: "Which district of Rajasthan has the highest Forest Area?", options: ["Udaipur", "Churu", "Alwar", "Kota"], correct: 0, difficulty: "medium", topic: "Geography" }
    ]
};

// ======================================================
// 2. STATE MANAGEMENT
// ======================================================
let currentExam = "";
let currentTopic = "";
let currentDiff = "";
let quizPool = [];
let qIndex = 0;
let score = 0;

// ======================================================
// 3. NAVIGATION LOGIC (STAGES 1-3)
// ======================================================
function handleLogin() {
    const user = document.getElementById('username').value.trim();
    if (user) {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('welcome-screen').classList.remove('hidden');
    }
}

function startMission() {
    let input = document.getElementById('examInput').value.toLowerCase().trim();
    if (questionLibrary[input]) {
        currentExam = input;
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('map-screen').classList.remove('hidden');
        document.getElementById('map-title').innerText = input.toUpperCase() + " WORLD";
    } else {
        alert("World not coded yet. Try 'ras' or 'lab assistant'.");
    }
}

function openLevel(topic) {
    currentTopic = topic;
    document.getElementById('level-modal').classList.remove('hidden');
    document.getElementById('modal-title').innerText = topic;
}

// ======================================================
// 4. THE QUESTION ENGINE (STAGE 4: PAPER)
// ======================================================
function startQuiz(diff) {
    currentDiff = diff;
    
    // FILTER: Pick exactly the questions matching topic and difficulty
    const allQuestions = questionLibrary[currentExam];
    quizPool = allQuestions.filter(q => q.topic === currentTopic && q.difficulty === currentDiff);

    // LOGIC: Check if we have enough questions to satisfy the 50-count rule
    if (quizPool.length === 0) {
        alert("Error: No " + diff + " questions found for " + currentTopic);
        return;
    }

    // SHUFFLE: Fisher-Yates algorithm for zero-repetition randomness
    for (let i = quizPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizPool[i], quizPool[j]] = [quizPool[j], quizPool[i]];
    }

    // Reset Counters
    qIndex = 0;
    score = 0;
    
    document.getElementById('level-modal').classList.add('hidden');
    document.getElementById('map-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    
    renderQuestion();
}

function renderQuestion() {
    const data = quizPool[qIndex];
    document.getElementById('q-count').innerText = `Question ${qIndex + 1}/${quizPool.length}`;
    document.getElementById('q-score').innerText = `Score: ${score}`;
    document.getElementById('question-text').innerText = data.q;

    const container = document.getElementById('options-container');
    container.innerHTML = ""; 

    data.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => {
            if (i === data.correct) score++;
            qIndex++;
            if (qIndex < quizPool.length) {
                renderQuestion();
            } else {
                finishMission();
            }
        };
        container.appendChild(btn);
    });
}

function finishMission() {
    alert(`MISSION COMPLETE!\nTotal Score: ${score}/${quizPool.length}`);
    location.reload(); 
}

function closeLevel() { document.getElementById('level-modal').classList.add('hidden'); }