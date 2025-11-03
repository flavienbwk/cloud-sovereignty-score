// EU Cloud Sovereignty Assessment Tool - Main Application
// Version: 2.0 Web Edition

// Application State
let currentObjectiveIndex = 0;
let currentQuestionIndex = 0;
let answers = {};
let objectiveScores = {};

// Flatten questions for easier navigation
let flatQuestions = [];

// Initialize the application
function initializeApp() {
    flatQuestions = [];

    // Flatten all questions with their objective context
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
    objectiveScores = {};

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

    // Update progress
    const progress = ((globalIndex + 1) / flatQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Question ${globalIndex + 1} of ${flatQuestions.length}`;

    // Update objective header
    document.getElementById('current-objective-code').textContent = objective.code;
    document.getElementById('current-objective-name').textContent = objective.name;
    document.getElementById('current-objective-weight').textContent = `${objective.weight}%`;

    // Update question
    document.getElementById('question-number').textContent = question.id;
    document.getElementById('question-text').textContent = question.text;

    // Render options
    renderQuestionOptions(question, globalIndex);

    // Update navigation buttons
    updateNavigationButtons();
}

// Render question options based on type
function renderQuestionOptions(question, globalIndex) {
    const optionsContainer = document.getElementById('question-options');
    optionsContainer.innerHTML = '';

    if (question.type === 'yes_no') {
        const options = [
            { label: 'Yes', value: 'yes' },
            { label: 'Partial/In Progress', value: 'partial' },
            { label: 'No', value: 'no' }
        ];

        options.forEach(option => {
            const button = createOptionButton(option.label, option.value, globalIndex);
            optionsContainer.appendChild(button);
        });
    } else if (question.type === 'multiple_choice') {
        question.options.forEach((option, index) => {
            const button = createOptionButton(option.label, index, globalIndex);
            optionsContainer.appendChild(button);
        });
    }
}

// Create an option button
function createOptionButton(label, value, globalIndex) {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.onclick = () => selectOption(globalIndex, value);

    const radio = document.createElement('div');
    radio.className = 'option-radio';

    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;

    button.appendChild(radio);
    button.appendChild(labelSpan);

    // Check if this option is already selected
    if (answers[globalIndex] === value) {
        button.classList.add('selected');
    }

    return button;
}

// Select an option
function selectOption(globalIndex, value) {
    answers[globalIndex] = value;

    // Update UI
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // Enable next button
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
        // Move to next question
        const nextGlobalIndex = globalIndex + 1;
        const next = flatQuestions[nextGlobalIndex];
        currentObjectiveIndex = next.objectiveIndex;
        currentQuestionIndex = next.questionIndex;
        displayQuestion();
    } else {
        // Assessment complete
        calculateResults();
        showScreen('results-screen');
    }
}

// Navigate to previous question
function previousQuestion() {
    const globalIndex = getCurrentGlobalIndex();

    if (globalIndex > 0) {
        const prevGlobalIndex = globalIndex - 1;
        const prev = flatQuestions[prevGlobalIndex];
        currentObjectiveIndex = prev.objectiveIndex;
        currentQuestionIndex = prev.questionIndex;
        displayQuestion();
    }
}

// Update navigation buttons state
function updateNavigationButtons() {
    const globalIndex = getCurrentGlobalIndex();

    // Previous button
    document.getElementById('prev-btn').disabled = globalIndex === 0;

    // Next button - enabled if question is answered
    const isAnswered = answers[globalIndex] !== undefined;
    document.getElementById('next-btn').disabled = !isAnswered;

    // Update next button text
    const nextBtn = document.getElementById('next-btn');
    if (globalIndex === flatQuestions.length - 1) {
        nextBtn.textContent = 'View Results';
    } else {
        nextBtn.textContent = 'Next';
    }
}

// Calculate results
function calculateResults() {
    objectiveScores = {};
    let totalScore = 0;
    const maxScore = 1000;

    // Calculate score for each objective
    assessmentData.objectives.forEach((objective, objIndex) => {
        let objectiveScore = 0;

        objective.questions.forEach((question, qIndex) => {
            const globalIndex = getGlobalIndexForQuestion(objIndex, qIndex);
            const answer = answers[globalIndex];

            if (answer !== undefined) {
                if (question.type === 'yes_no') {
                    const baseScore = answer === 'yes' ? 10 : (answer === 'partial' ? 5 : 0);
                    objectiveScore += baseScore * question.multiplier;
                } else if (question.type === 'multiple_choice') {
                    objectiveScore += question.options[answer].score;
                }
            }
        });

        objectiveScores[objective.id] = {
            score: objectiveScore,
            maxScore: objective.max_score,
            name: objective.name,
            code: objective.code,
            weight: objective.weight
        };

        totalScore += objectiveScore;
    });

    // Display results
    displayResults(totalScore, maxScore);
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
function displayResults(totalScore, maxScore) {
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Determine SEAL level
    const sealLevel = getSEALLevel(percentage);

    // Update score display
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('percentage-score').textContent = `${percentage}%`;

    // Update SEAL badge
    const sealBadge = document.getElementById('seal-badge');
    sealBadge.className = `seal-badge seal-${sealLevel.level}`;
    sealBadge.innerHTML = `
        <div>${sealLevel.name}</div>
        <div style="font-size: 16px; font-weight: 400; margin-top: 5px;">${sealLevel.description}</div>
    `;

    // Display objectives breakdown
    displayObjectivesBreakdown();

    // Display recommendations
    displayRecommendations();
}

// Get SEAL level based on percentage
function getSEALLevel(percentage) {
    if (percentage >= 90) {
        return {
            level: 5,
            name: 'SEAL 5 - Maximum Sovereignty',
            description: 'Highest level of cloud sovereignty compliance'
        };
    } else if (percentage >= 75) {
        return {
            level: 4,
            name: 'SEAL 4 - High Sovereignty',
            description: 'Strong sovereignty with minimal dependencies'
        };
    } else if (percentage >= 60) {
        return {
            level: 3,
            name: 'SEAL 3 - Moderate Sovereignty',
            description: 'Adequate sovereignty for many use cases'
        };
    } else if (percentage >= 40) {
        return {
            level: 2,
            name: 'SEAL 2 - Limited Sovereignty',
            description: 'Basic sovereignty measures in place'
        };
    } else {
        return {
            level: 1,
            name: 'SEAL 1 - Minimal Sovereignty',
            description: 'Significant sovereignty gaps'
        };
    }
}

// Display objectives breakdown
function displayObjectivesBreakdown() {
    const container = document.getElementById('objectives-breakdown');
    container.innerHTML = '<h3>Score Breakdown by Objective</h3>';

    Object.values(objectiveScores).forEach(obj => {
        const percentage = Math.round((obj.score / obj.maxScore) * 100);

        const item = document.createElement('div');
        item.className = 'breakdown-item';
        item.innerHTML = `
            <div class="breakdown-label">
                <strong>${obj.code}</strong> ${obj.name} (${obj.weight}%)
            </div>
            <div class="breakdown-score">${obj.score} / ${obj.maxScore}</div>
            <div class="breakdown-bar">
                <div class="breakdown-bar-fill" style="width: ${percentage}%"></div>
            </div>
        `;

        container.appendChild(item);
    });
}

// Display recommendations
function displayRecommendations() {
    const container = document.getElementById('recommendations');
    container.innerHTML = '<h3>Recommendations for Improvement</h3>';

    const recommendations = [];

    Object.values(objectiveScores).forEach(obj => {
        const percentage = (obj.score / obj.maxScore) * 100;
        if (percentage < 75) {
            recommendations.push({
                code: obj.code,
                name: obj.name,
                score: obj.score,
                maxScore: obj.maxScore,
                percentage: Math.round(percentage)
            });
        }
    });

    if (recommendations.length === 0) {
        container.innerHTML += '<div class="recommendation-item">Excellent! All objectives are above 75% threshold.</div>';
    } else {
        recommendations.sort((a, b) => a.percentage - b.percentage);

        recommendations.forEach(rec => {
            const item = document.createElement('div');
            item.className = 'recommendation-item';
            item.textContent = `${rec.code} ${rec.name}: Score is below 75% threshold (${rec.score}/${rec.maxScore} = ${rec.percentage}%)`;
            container.appendChild(item);
        });
    }
}

// Download report
function downloadReport() {
    const totalScore = document.getElementById('total-score').textContent;
    const percentage = document.getElementById('percentage-score').textContent;
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];

    let report = `EU CLOUD SOVEREIGNTY FRAMEWORK ASSESSMENT
==========================================

Assessment Date: ${new Date().toLocaleString()}
Assessment ID: cloud-sovereignty-assessment-${timestamp}

SCORE BREAKDOWN (Based on Official EU Framework Weights)
--------------------------------------------------------

`;

    Object.values(objectiveScores).forEach(obj => {
        report += `${obj.code} ${obj.name} (${obj.weight}%): ${obj.score}/${obj.maxScore}\n`;
    });

    report += `
TOTAL SCORE: ${totalScore}/1000 (${percentage})

SEAL LEVEL: ${document.getElementById('seal-badge').textContent.trim()}

RECOMMENDATIONS FOR IMPROVEMENT
-------------------------------

`;

    const recContainer = document.getElementById('recommendations');
    const recItems = recContainer.querySelectorAll('.recommendation-item');
    recItems.forEach(item => {
        report += `• ${item.textContent}\n`;
    });

    report += `
Reference: EU Cloud Sovereignty Framework v1.2.1 (October 2025)

This tool is provided for informational and self-assessment purposes only.
It does not constitute legal advice or official EU certification.
`;

    // Create download
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
    objectiveScores = {};
    showScreen('welcome-screen');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});
