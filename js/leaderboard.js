const defaultPlayers = [
    { name: 'Nassypkeliyev Yerassyl', quizzes: 20, correct: 188, score: 980 },
    { name: 'Aibergen Amanzhol', quizzes: 18, correct: 162, score: 920 },
    { name: 'Rassul Sissenbay', quizzes: 17, correct: 150, score: 870 },
    { name: 'Adilzhan Tolegen', quizzes: 16, correct: 139, score: 830 },
    { name: 'Alex Johnson', quizzes: 15, correct: 123, score: 810 },
    { name: 'Emma Brown', quizzes: 14, correct: 111, score: 760 }
];

function getPlayers() {
    const localScores = JSON.parse(localStorage.getItem('quiznovaScores') || '[]');
    const players = defaultPlayers.map(player => ({ ...player }));

    localScores.forEach(local => {
        const index = players.findIndex(player => player.name.toLowerCase() === local.name.toLowerCase());
        if (index >= 0) {
            players[index].score += local.score;
            players[index].correct += local.correct;
            players[index].quizzes += local.quizzes;
        } else {
            players.push({ name: local.name, score: local.score, correct: local.correct, quizzes: local.quizzes });
        }
    });

    return players.sort((a, b) => b.score - a.score);
}

function renderLeaderboard() {
    const players = getPlayers();
    const podium = document.getElementById('podium');
    const body = document.getElementById('leaderboardBody');
    const medals = ['🥇', '🥈', '🥉'];

    podium.innerHTML = players.slice(0, 3).map((player, index) => `
        <div class="col-md-4">
            <article class="podium-card">
                <div class="podium-rank">${medals[index]}</div>
                <h3>${player.name}</h3>
                <p>${player.quizzes} quizzes · ${Math.round((player.correct / (player.quizzes * 10)) * 100)}% accuracy</p>
                <div class="podium-score">${player.score} points</div>
            </article>
        </div>
    `).join('');

    body.innerHTML = players.map((player, index) => {
        const accuracy = Math.round((player.correct / Math.max(player.quizzes * 10, 1)) * 100);
        return `<tr><td>#${index + 1}</td><td>${player.name}</td><td>${player.quizzes}</td><td>${accuracy}%</td><td>${player.score}</td></tr>`;
    }).join('');
}

document.addEventListener('DOMContentLoaded', renderLeaderboard);
