// EU Cloud Sovereignty Assessment Tool - Main Application
// Version: 3.0 - aligned with the official Implementation Guidance &
// Sovereignty Assessment Calculator (European Commission, 1 June 2026).
//
// Two independent outputs, exactly as in the official calculator:
//   1. Sovereignty Score = weighted average of the 8 objective scores, /1000.
//   2. SEAL level         = the MINIMUM (weakest-link) SEAL across every answered
//                           criterion, on the official 0-4 scale.

// Application State
let currentObjectiveIndex = 0;
let currentQuestionIndex = 0;
let answers = {};            // globalIndex -> selected answer index
let objectiveResults = {};

// Flatten questions for easier navigation
let flatQuestions = [];

// Initialize the application
function initializeApp() {
    flatQuestions = [];
    assessmentData.objectives.forEach((objective, objIndex) => {
        objective.questions.forEach((question, qIndex) => {
            flatQuestions.push({
                objectiveIndex: objIndex,
                questionIndex: qIndex,
                objective: objective,
                question: question,
                globalIndex: flatQuestions.length
            });
        });
    });
}

// Start the assessment
function startAssessment() {
    initializeApp();
    currentObjectiveIndex = 0;
    currentQuestionIndex = 0;
    answers = {};
    objectiveResults = {};

    showScreen('assessment-screen');
    displayQuestion();
}

// Show a specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

// Display the current question
function displayQuestion() {
    const current = flatQuestions[getCurrentGlobalIndex()];
    const { objective, question, globalIndex } = current;

    const progress = ((globalIndex + 1) / flatQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Question ${globalIndex + 1} of ${flatQuestions.length}`;

    document.getElementById('current-objective-code').textContent = objective.code;
    document.getElementById('current-objective-name').textContent = objective.name;
    document.getElementById('current-objective-weight').textContent = `${Math.round(objective.weight * 100)}%`;

    document.getElementById('question-number').textContent = `${objective.code} · Criterion ${question.number}`;
    document.getElementById('question-text').textContent = question.text;

    renderQuestionOptions(question, globalIndex);
    updateNavigationButtons();
}

// Render the ordinal answer options for a question
function renderQuestionOptions(question, globalIndex) {
    const optionsContainer = document.getElementById('question-options');
    optionsContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = createOptionButton(answer.label, index, globalIndex);
        optionsContainer.appendChild(button);
    });
}

// Create an option button
function createOptionButton(label, value, globalIndex) {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.onclick = (e) => selectOption(globalIndex, value, e);

    const radio = document.createElement('div');
    radio.className = 'option-radio';

    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;

    button.appendChild(radio);
    button.appendChild(labelSpan);

    if (answers[globalIndex] === value) {
        button.classList.add('selected');
    }

    return button;
}

// Select an option
function selectOption(globalIndex, value, e) {
    answers[globalIndex] = value;

    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    (e || window.event).currentTarget.classList.add('selected');

    document.getElementById('next-btn').disabled = false;
}

// Get current global question index
function getCurrentGlobalIndex() {
    let index = 0;
    for (let i = 0; i < currentObjectiveIndex; i++) {
        index += assessmentData.objectives[i].questions.length;
    }
    index += currentQuestionIndex;
    return index;
}

// Navigate to next question
function nextQuestion() {
    const globalIndex = getCurrentGlobalIndex();

    if (globalIndex < flatQuestions.length - 1) {
        const next = flatQuestions[globalIndex + 1];
        currentObjectiveIndex = next.objectiveIndex;
        currentQuestionIndex = next.questionIndex;
        displayQuestion();
    } else {
        calculateResults();
        showScreen('results-screen');
    }
}

// Navigate to previous question
function previousQuestion() {
    const globalIndex = getCurrentGlobalIndex();

    if (globalIndex > 0) {
        const prev = flatQuestions[globalIndex - 1];
        currentObjectiveIndex = prev.objectiveIndex;
        currentQuestionIndex = prev.questionIndex;
        displayQuestion();
    }
}

// Update navigation buttons state
function updateNavigationButtons() {
    const globalIndex = getCurrentGlobalIndex();

    document.getElementById('prev-btn').disabled = globalIndex === 0;
    document.getElementById('next-btn').disabled = answers[globalIndex] === undefined;

    const nextBtn = document.getElementById('next-btn');
    nextBtn.textContent = (globalIndex === flatQuestions.length - 1) ? 'View Results' : 'Next';
}

// Look up a SEAL level descriptor
function getSealDescriptor(level) {
    return assessmentData.sealLevels.find(s => s.level === level) || assessmentData.sealLevels[0];
}

// Calculate results following the official calculator methodology
function calculateResults() {
    objectiveResults = {};
    const divisor = assessmentData.framework.scoreDivisor || 1000;

    let weightedScore = 0;      // Σ (weight × objectiveScore)
    let overallSeal = null;     // weakest-link minimum across all criteria

    assessmentData.objectives.forEach((objective, objIndex) => {
        let objectiveScore = 0;
        let objectiveMax = 0;
        let objectiveSeal = null;          // min SEAL within this objective
        const limitingCriteria = [];       // criteria selected at the lowest SEAL

        objective.questions.forEach((question, qIndex) => {
            const globalIndex = getGlobalIndexForQuestion(objIndex, qIndex);
            const answerIndex = answers[globalIndex];

            // Per-question maximum value (top answer on the ordinal ladder).
            objectiveMax += Math.max(...question.answers.map(a => a.value));

            if (answerIndex !== undefined) {
                const answer = question.answers[answerIndex];
                objectiveScore += answer.value;

                if (overallSeal === null || answer.seal < overallSeal) overallSeal = answer.seal;
                if (objectiveSeal === null || answer.seal < objectiveSeal) objectiveSeal = answer.seal;
            }
        });

        // Record which criteria sit at this objective's minimum SEAL (the binding constraints).
        objective.questions.forEach((question, qIndex) => {
            const globalIndex = getGlobalIndexForQuestion(objIndex, qIndex);
            const answerIndex = answers[globalIndex];
            if (answerIndex !== undefined && question.answers[answerIndex].seal === objectiveSeal) {
                limitingCriteria.push({
                    number: question.number,
                    text: question.text,
                    selected: question.answers[answerIndex].label,
                    seal: objectiveSeal
                });
            }
        });

        objectiveResults[objective.id] = {
            code: objective.code,
            name: objective.name,
            weight: objective.weight,
            score: objectiveScore,
            maxScore: objectiveMax,
            percentage: objectiveMax ? Math.round((objectiveScore / objectiveMax) * 100) : 0,
            seal: objectiveSeal,
            limitingCriteria
        };

        weightedScore += objective.weight * objectiveScore;
    });

    // Sovereignty Score: weighted average of objective scores, normalised by the divisor.
    const sovScoreFraction = Math.min(weightedScore / divisor, 1);

    displayResults(sovScoreFraction, weightedScore / divisor, overallSeal ?? 0);
}

// Get global index for a specific objective/question combination
function getGlobalIndexForQuestion(objIndex, qIndex) {
    let index = 0;
    for (let i = 0; i < objIndex; i++) {
        index += assessmentData.objectives[i].questions.length;
    }
    index += qIndex;
    return index;
}

// Display results
function displayResults(sovScoreFraction, rawWeighted, overallSeal) {
    const percentage = Math.round(sovScoreFraction * 100);
    const seal = getSealDescriptor(overallSeal);

    // Sovereignty Score
    document.getElementById('sov-score-value').textContent = `${percentage}%`;
    document.getElementById('sov-score-detail').textContent =
        `Weighted sovereignty score · ${Math.round(rawWeighted * 1000)} / 1000`;

    // SEAL badge (weakest link)
    const sealBadge = document.getElementById('seal-badge');
    sealBadge.className = `seal-badge seal-${seal.level}`;
    sealBadge.innerHTML = `
        <div class="seal-code">${seal.code}</div>
        <div class="seal-name">${seal.name}</div>
        <div class="seal-desc">${seal.description}</div>
    `;

    displayObjectivesBreakdown();
    displayRecommendations(overallSeal);
}

// Display objectives breakdown
function displayObjectivesBreakdown() {
    const container = document.getElementById('objectives-breakdown');
    container.innerHTML = '<h3>Breakdown by Objective</h3>';

    Object.values(objectiveResults).forEach(obj => {
        const seal = getSealDescriptor(obj.seal);
        const item = document.createElement('div');
        item.className = 'breakdown-item';
        item.innerHTML = `
            <div class="breakdown-label">
                <strong>${obj.code}</strong> ${obj.name}
                <span class="breakdown-weight">weight ${Math.round(obj.weight * 100)}%</span>
            </div>
            <div class="breakdown-right">
                <span class="breakdown-seal seal-pill seal-${obj.seal}">${seal.code}</span>
                <span class="breakdown-score">${obj.percentage}%</span>
            </div>
            <div class="breakdown-bar">
                <div class="breakdown-bar-fill" style="width: ${obj.percentage}%"></div>
            </div>
        `;
        container.appendChild(item);
    });
}

// Display recommendations — focus on the weakest-link criteria that cap the SEAL
function displayRecommendations(overallSeal) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '<h3>Priorities for Improvement</h3>';

    const maxLevel = Math.max(...assessmentData.sealLevels.map(s => s.level));
    const sealName = getSealDescriptor(overallSeal).code;

    if (overallSeal >= maxLevel) {
        const top = getSealDescriptor(maxLevel);
        const p = document.createElement('p');
        p.className = 'rec-intro';
        p.innerHTML = `Outstanding — every criterion already reaches <strong>${top.code} (${top.name})</strong>, ` +
            `the highest SEAL. The only remaining work is lifting any objective below 100% to raise the Sovereignty Score.`;
        container.appendChild(p);
    } else {
        const intro = document.createElement('p');
        intro.className = 'rec-intro';
        intro.innerHTML = `Your overall SEAL is <strong>${sealName}</strong>, set by the lowest-scoring criteria below. ` +
            `Because SEAL is a weakest-link measure, raising it requires improving <em>every</em> criterion currently at ${sealName}.`;
        container.appendChild(intro);

        // Criteria across all objectives that sit at the overall (binding) SEAL.
        const binding = [];
        Object.values(objectiveResults).forEach(obj => {
            obj.limitingCriteria.forEach(c => {
                if (c.seal === overallSeal) binding.push({ code: obj.code, ...c });
            });
        });
        binding.forEach(c => {
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.innerHTML = `<strong>${c.code} · Criterion ${c.number}</strong> (currently ${getSealDescriptor(c.seal).code}): ` +
                `${c.text} <em>— your answer: "${c.selected}".</em>`;
            container.appendChild(div);
        });
    }

    // Also surface the lowest-scoring objectives for the Sovereignty Score.
    const weak = Object.values(objectiveResults)
        .filter(o => o.percentage < 75)
        .sort((a, b) => a.percentage - b.percentage);
    if (weak.length) {
        const h = document.createElement('p');
        h.className = 'rec-intro';
        h.textContent = 'Objectives dragging down the Sovereignty Score (below 75%):';
        container.appendChild(h);
        weak.forEach(o => {
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.textContent = `${o.code} ${o.name}: ${o.percentage}% (weight ${Math.round(o.weight * 100)}%)`;
            container.appendChild(div);
        });
    }
}

// Download report
function downloadReport() {
    const sovScore = document.getElementById('sov-score-value').textContent;
    const sealCode = document.querySelector('#seal-badge .seal-code')?.textContent || '';
    const sealName = document.querySelector('#seal-badge .seal-name')?.textContent || '';
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];

    let report = `EU CLOUD SOVEREIGNTY FRAMEWORK ASSESSMENT
==========================================

Assessment Date: ${new Date().toLocaleString()}
Assessment ID: cloud-sovereignty-assessment-${timestamp}

Methodology: ${assessmentData.framework.name} ${assessmentData.framework.version}
             ${assessmentData.framework.methodology}

RESULTS
-------
Sovereignty Score : ${sovScore}
SEAL (weakest link): ${sealCode} - ${sealName}

The SEAL level is the LOWEST SEAL achieved on any single criterion. The
Sovereignty Score is the weighted average of the eight objective scores.

SCORE BREAKDOWN BY OBJECTIVE
----------------------------
`;

    Object.values(objectiveResults).forEach(obj => {
        report += `${obj.code} ${obj.name} (weight ${Math.round(obj.weight * 100)}%): ` +
            `${obj.percentage}%  | objective SEAL: ${getSealDescriptor(obj.seal).code}\n`;
    });

    report += `
BINDING CRITERIA (currently capping the overall SEAL)
-----------------------------------------------------
`;
    const overallSeal = Math.min(...Object.values(objectiveResults).map(o => o.seal));
    Object.values(objectiveResults).forEach(obj => {
        obj.limitingCriteria.forEach(c => {
            if (c.seal === overallSeal) {
                report += `• ${obj.code} · Criterion ${c.number} (${getSealDescriptor(c.seal).code}): ${c.text}\n    Your answer: "${c.selected}"\n`;
            }
        });
    });

    report += `
Reference: ${assessmentData.framework.name} ${assessmentData.framework.version};
Implementation Guidance and Sovereignty Assessment Calculator (1 June 2026).

This tool is provided for informational and self-assessment purposes only.
It does not constitute legal advice or official EU certification. Point values
are reference figures that contracting authorities may adapt.
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cloud-sovereignty-assessment-${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Restart assessment
function restartAssessment() {
    currentObjectiveIndex = 0;
    currentQuestionIndex = 0;
    answers = {};
    objectiveResults = {};
    showScreen('welcome-screen');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
