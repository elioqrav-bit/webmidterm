const questionBank = [
    { category: 'Programming', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Management Language'], answer: 0 },
    { category: 'Programming', question: 'Which property changes the text color in CSS?', options: ['font-style', 'color', 'background', 'text-align'], answer: 1 },
    { category: 'Programming', question: 'Which HTML element is used for the largest heading?', options: ['<heading>', '<h6>', '<h1>', '<head>'], answer: 2 },
    { category: 'Programming', question: 'Which keyword declares a constant in JavaScript?', options: ['let', 'var', 'const', 'fixed'], answer: 2 },
    { category: 'Programming', question: 'Which layout system is useful for one-dimensional layouts?', options: ['Flexbox', 'SQL', 'Canvas', 'SVG'], answer: 0 },
    { category: 'Science', question: 'What is the chemical symbol for water?', options: ['CO2', 'H2O', 'O2', 'NaCl'], answer: 1 },
    { category: 'Science', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], answer: 1 },
    { category: 'Science', question: 'What force keeps planets in orbit around the Sun?', options: ['Magnetism', 'Friction', 'Gravity', 'Pressure'], answer: 2 },
    { category: 'Science', question: 'Which part of a plant usually absorbs water?', options: ['Flower', 'Root', 'Leaf', 'Fruit'], answer: 1 },
    { category: 'Science', question: 'How many bones are usually in an adult human body?', options: ['106', '206', '306', '406'], answer: 1 },
    { category: 'History', question: 'Which ancient civilization built Machu Picchu?', options: ['Roman', 'Inca', 'Greek', 'Egyptian'], answer: 1 },
    { category: 'History', question: 'Who was the first person to walk on the Moon?', options: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'John Glenn'], answer: 1 },
    { category: 'History', question: 'The Renaissance began in which country?', options: ['Italy', 'France', 'Spain', 'Germany'], answer: 0 },
    { category: 'History', question: 'Which city was divided by a famous wall from 1961 to 1989?', options: ['Paris', 'Berlin', 'Rome', 'Vienna'], answer: 1 },
    { category: 'History', question: 'Which empire used a network of roads across much of South America?', options: ['Ottoman Empire', 'Inca Empire', 'Mali Empire', 'Mongol Empire'], answer: 1 },
    { category: 'Geography', question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Osaka'], answer: 2 },
    { category: 'Geography', question: 'Which is the largest ocean?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 2 },
    { category: 'Geography', question: 'Which country has the city of Marrakech?', options: ['Morocco', 'Egypt', 'Greece', 'Mexico'], answer: 0 },
    { category: 'Geography', question: 'What is the longest river in South America?', options: ['Amazon', 'Nile', 'Yangtze', 'Danube'], answer: 0 },
    { category: 'Geography', question: 'Which continent has the most countries?', options: ['Asia', 'Africa', 'Europe', 'South America'], answer: 1 },
    { category: 'Movies', question: 'Which film series includes the character Luke Skywalker?', options: ['Harry Potter', 'Star Wars', 'The Matrix', 'Toy Story'], answer: 1 },
    { category: 'Movies', question: 'Who directed Titanic?', options: ['Christopher Nolan', 'James Cameron', 'Peter Jackson', 'Steven Spielberg'], answer: 1 },
    { category: 'Movies', question: 'Which studio created Toy Story?', options: ['Pixar', 'Marvel', 'Warner Bros.', 'Sony'], answer: 0 },
    { category: 'Movies', question: 'Which movie features the character Jack Sparrow?', options: ['Pirates of the Caribbean', 'Avatar', 'Interstellar', 'The Batman'], answer: 0 },
    { category: 'Movies', question: 'Which actor played Iron Man in the Marvel Cinematic Universe?', options: ['Chris Evans', 'Robert Downey Jr.', 'Tom Holland', 'Chris Hemsworth'], answer: 1 },
    { category: 'Sports', question: 'How many players are on the field for one football team in a match?', options: ['9', '10', '11', '12'], answer: 2 },
    { category: 'Sports', question: 'Which sport uses a racket and a shuttlecock?', options: ['Tennis', 'Badminton', 'Squash', 'Table tennis'], answer: 1 },
    { category: 'Sports', question: 'How many rings are on the Olympic symbol?', options: ['4', '5', '6', '7'], answer: 1 },
    { category: 'Sports', question: 'In basketball, how many points is a free throw worth?', options: ['1', '2', '3', '4'], answer: 0 },
    { category: 'Sports', question: 'Which country is strongly associated with sumo wrestling?', options: ['China', 'Japan', 'South Korea', 'Thailand'], answer: 1 }
];

const elements = {
    setup: document.getElementById('quizSetup'),
    area: document.getElementById('quizArea'),
    result: document.getElementById('resultArea'),
    name: document.getElementById('playerName'),
    category: document.getElementById('categorySelect'),
    start: document.getElementById('startQuiz'),
    next: document.getElementById('nextQuestion'),
    question: document.getElementById('questionText'),
    questionLabel: document.getElementById('questionLabel'),
    answers: document.getElementById('answers'),
    feedback: document.getElementById('feedback'),
    score: document.getElementById('scoreValue'),
    timer: document.getElementById('timerValue'),
    progress: document.getElementById('progressBar'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    finalScore: document.getElementById('finalScore'),
    finalCorrect: document.getElementById('finalCorrect'),
    finalPercent: document.getElementById('finalPercent'),
    playAgain: document.getElementById('playAgain')
};

let questions = [];
let currentIndex = 0;
let score = 0;
let correctAnswers = 0;
let timerId = null;
let timeLeft = 15;
let answered = false;

function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function getQuestions(category) {
    const source = category === 'Mixed' ? questionBank : questionBank.filter(item => item.category === category);
    return shuffle(source).slice(0, 10);
}

function startQuiz() {
    const name = elements.name.value.trim();
    if (!name) {
        elements.name.focus();
        elements.name.classList.add('is-invalid');
        setTimeout(() => elements.name.classList.remove('is-invalid'), 1200);
        return;
    }

    questions = getQuestions(elements.category.value);
    currentIndex = 0;
    score = 0;
    correctAnswers = 0;
    elements.score.textContent = score;
    elements.setup.classList.add('d-none');
    elements.result.classList.add('d-none');
    elements.area.classList.remove('d-none');
    renderQuestion();
}

function renderQuestion() {
    clearInterval(timerId);
    answered = false;
    timeLeft = 15;
    elements.timer.textContent = timeLeft;
    elements.next.disabled = true;
    elements.feedback.textContent = '';
    elements.questionLabel.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    elements.progress.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
    elements.question.textContent = questions[currentIndex].question;
    elements.answers.innerHTML = '';

    questions[currentIndex].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-btn';
        button.innerHTML = `<span class="answer-index">${String.fromCharCode(65 + index)}</span>${option}`;
        button.addEventListener('click', () => selectAnswer(index));
        elements.answers.appendChild(button);
    });

    timerId = setInterval(() => {
        timeLeft -= 1;
        elements.timer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            selectAnswer(-1);
        }
    }, 1000);
}

function selectAnswer(index) {
    if (answered) return;
    answered = true;
    clearInterval(timerId);

    const current = questions[currentIndex];
    const buttons = [...elements.answers.querySelectorAll('.answer-btn')];
    buttons.forEach(button => button.disabled = true);

    buttons[current.answer].classList.add('correct');

    if (index === current.answer) {
        score += 10;
        correctAnswers += 1;
        elements.feedback.textContent = 'Correct! +10 points';
    } else {
        if (index >= 0) buttons[index].classList.add('wrong');
        elements.feedback.textContent = index === -1 ? `Time is up. Correct answer: ${current.options[current.answer]}` : `Not quite. Correct answer: ${current.options[current.answer]}`;
    }

    elements.score.textContent = score;
    elements.next.disabled = false;
}

function nextQuestion() {
    if (!answered) return;
    currentIndex += 1;
    if (currentIndex >= questions.length) {
        finishQuiz();
    } else {
        renderQuestion();
    }
}

function saveScore(name) {
    const stored = JSON.parse(localStorage.getItem('quiznovaScores') || '[]');
    const index = stored.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
    const entry = { name, score, correct: correctAnswers, quizzes: 1 };

    if (index >= 0) {
        stored[index].score += score;
        stored[index].correct += correctAnswers;
        stored[index].quizzes += 1;
    } else {
        stored.push(entry);
    }
    localStorage.setItem('quiznovaScores', JSON.stringify(stored));
}

function finishQuiz() {
    clearInterval(timerId);
    const name = elements.name.value.trim();
    saveScore(name);
    const percent = Math.round((correctAnswers / questions.length) * 100);

    elements.area.classList.add('d-none');
    elements.result.classList.remove('d-none');
    elements.finalScore.textContent = score;
    elements.finalCorrect.textContent = `${correctAnswers}/${questions.length}`;
    elements.finalPercent.textContent = `${percent}%`;

    if (percent >= 80) {
        elements.resultTitle.textContent = 'Excellent result!';
        elements.resultMessage.textContent = `${name}, you really know your stuff. Your score is now on the local leaderboard.`;
    } else if (percent >= 50) {
        elements.resultTitle.textContent = 'Nice job!';
        elements.resultMessage.textContent = `Good work, ${name}. Try another category and push your score even higher.`;
    } else {
        elements.resultTitle.textContent = 'Keep practicing!';
        elements.resultMessage.textContent = `No problem, ${name}. Review the topics and try the quiz again.`;
    }
}

function resetQuiz() {
    clearInterval(timerId);
    elements.result.classList.add('d-none');
    elements.area.classList.add('d-none');
    elements.setup.classList.remove('d-none');
}

elements.start?.addEventListener('click', startQuiz);
elements.next?.addEventListener('click', nextQuestion);
elements.playAgain?.addEventListener('click', resetQuiz);
elements.name?.addEventListener('input', () => elements.name.classList.remove('is-invalid'));

document.addEventListener('DOMContentLoaded', () => {
    const selectedCategory = new URLSearchParams(window.location.search).get('category');
    if (selectedCategory && [...elements.category.options].some(option => option.value === selectedCategory)) {
        elements.category.value = selectedCategory;
    }
});
