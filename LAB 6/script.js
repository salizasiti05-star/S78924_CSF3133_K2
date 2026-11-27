// 1. Questions Array
const questions = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<style>", "<css>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: "font-size"
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answer: "<script>"
    },
    {
        question: "Which semantic HTML5 tag is best suited for introductory content?",
        options: ["<section>", "<header>", "<article>", "<footer>"],
        answer: "<header>"
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
        answer: "alert('Hello World');"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval;
let timeLeft = 15;
let isAnswered = false;

// Elemen DOM
const questionNumberEl = document.getElementById("question-number");
const timeLeftEl = document.getElementById("time-left");
const questionTextEl = document.getElementById("question-text");
const optionsContainerEl = document.getElementById("options-container");
const feedbackSectionEl = document.getElementById("feedback-section");
const feedbackTextEl = document.getElementById("feedback-text");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplayEl = document.getElementById("score-display");
const quizSectionEl = document.getElementById("quiz-section");

// 2. shuffleQuestions(): Mengocok urutan soalan secara rawak (Fisher-Yates Shuffle)
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. startTimer(): Menetapkan pemasa undur bagi setiap soalan
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    timeLeftEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Mengendalikan keadaan apabila masa tamat
function handleTimeOut() {
    if (isAnswered) return;
    isAnswered = true;

    const currentQ = shuffledQuestions[currentQuestionIndex];
    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSectionEl.className = "feedback-wrong";
    feedbackTextEl.textContent = `Time's up! The correct answer is: ${currentQ.answer}`;
    feedbackSectionEl.classList.remove("hidden");

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 4. displayQuestion(): Memaparkan soalan semasa dan pilihan jawapan
function displayQuestion() {
    isAnswered = false;
    selectedOption = null;
    feedbackSectionEl.classList.add("hidden");
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionTextEl.textContent = currentQ.question;

    optionsContainerEl.innerHTML = "";
    currentQ.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.onclick = () => selectOption(button, option);
        optionsContainerEl.appendChild(button);
    });
}

// Fungsi bantuan untuk menanda pilihan jawapan pengguna
function selectOption(button, option) {
    if (isAnswered) return;

    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
    selectedOption = option;
}

// 5. checkAnswer(): Menyemak jawapan yang dipilih dan mengemas kini skor
function checkAnswer() {
    if (isAnswered) return;

    if (!selectedOption) {
        alert("Please select an answer before submitting!");
        return;
    }

    isAnswered = true;
    clearInterval(timerInterval);

    const currentQ = shuffledQuestions[currentQuestionIndex];
    const allButtons = optionsContainerEl.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption && selectedOption !== currentQ.answer) {
            btn.classList.add("wrong");
        }
    });

    if (selectedOption === currentQ.answer) {
        score++;
        feedbackSectionEl.className = "feedback-correct";
        feedbackTextEl.textContent = "Correct! Well done.";
    } else {
        feedbackSectionEl.className = "feedback-wrong";
        feedbackTextEl.textContent = `Incorrect! The correct answer is: ${currentQ.answer}`;
    }

    scoreDisplayEl.textContent = `Current Score: ${score}`;
    feedbackSectionEl.classList.remove("hidden");
    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 6. nextQuestion(): Beralih ke soalan seterusnya, menetapkan semula pemasa & skor
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

// Memaparkan keputusan akhir apabila semua soalan selesai
function endQuiz() {
    clearInterval(timerInterval);
    quizSectionEl.classList.add("hidden");
    feedbackSectionEl.classList.add("hidden");
    submitBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");

    scoreDisplayEl.textContent = `Quiz Completed! Final Score: ${score} / ${shuffledQuestions.length}`;
}

// 7. startQuiz(): Memulakan kuiz dengan mengocok soalan, memaparkan soalan pertama & memulakan pemasa
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreDisplayEl.textContent = `Current Score: ${score}`;

    quizSectionEl.classList.remove("hidden");
    restartBtn.classList.add("hidden");

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Mulakan kuiz secara automatik apabila halaman dimuatkan
window.onload = startQuiz;