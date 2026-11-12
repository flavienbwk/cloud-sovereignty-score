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
let questionsById = {};      // question id -> question (for localized re-rendering)

// ---------------------------------------------------------------------------
// i18n: translations live in i18n.js (`translations` global). English framework
// content in questions.js is the fallback source of truth; other locales only
// override strings via their dictionaries.
// ---------------------------------------------------------------------------
const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_STORAGE_KEY = 'css-lang';
let currentLanguage = DEFAULT_LANGUAGE;

// Translate a UI string, with {placeholder} substitution from `vars`.
function t(key, vars) {
    const dict = (translations[currentLanguage] && translations[currentLanguage].ui)
        || translations[DEFAULT_LANGUAGE].ui;
    let str = (dict[key] !== undefined ? dict[key] : translations[DEFAULT_LANGUAGE].ui[key]);
    if (str === undefined) str = key;
    if (vars) {
        Object.keys(vars).forEach(k => {
            str = str.split('{' + k + '}').join(String(vars[k]));
        });
    }
    return str;
}

// Localized view of an objective (falls back to questions.js English).
function localizedObjective(objective) {
    const ov = translations[currentLanguage] && translations[currentLanguage].objectives
        && translations[currentLanguage].objectives[objective.id];
    return {
        name: (ov && ov.name) || objective.name,
        description: (ov && ov.description) || objective.description
    };
}

function localizedObjectiveById(id) {
    const objective = assessmentData.objectives.find(o => o.id === id);
    return objective ? localizedObjective(objective) : { name: id, description: '' };
}

// Localized view of a SEAL level descriptor.
function localizedSeal(level) {
    const base = getSealDescriptor(level);
    const ov = translations[currentLanguage] && translations[currentLanguage].sealLevels
        && translations[currentLanguage].sealLevels[String(base.level)];
    return {
        ...base,
        name: (ov && ov.name) || base.name,
        description: (ov && ov.description) || base.description
    };
}

// Localized view of a question (text, help, answer labels).
function localizedQuestion(question) {
    const ov = translations[currentLanguage] && translations[currentLanguage].questions
        && translations[currentLanguage].questions[question.id];
    if (!ov) return question;
    return {
        ...question,
        text: ov.text || question.text,
        help: ov.help !== undefined ? ov.help : question.help,
        answers: question.answers.map((a, i) => ({
            ...a,
            label: (ov.answers && ov.answers[i]) || a.label
        }))
    };
}

// Apply translations to all static elements marked with data-i18n attributes.
function applyStaticTranslations() {
    document.title = t('docTitle');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const val = t(el.getAttribute('data-i18n-aria'));
        el.setAttribute('aria-label', val);
        el.setAttribute('title', val);
    });
    document.querySelectorAll('[data-i18n-obj]').forEach(el => {
        el.textContent = localizedObjectiveById(el.getAttribute('data-i18n-obj')).name;
    });
}

// Switch the UI language, persist the choice, and re-render the active screen.
function setLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANGUAGE;
    currentLanguage = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }

    const select = document.getElementById('language-select');
    if (select) select.value = lang;

    applyStaticTranslations();

    if (document.getElementById('assessment-screen').classList.contains('active')) {
        displayQuestion();
    } else if (document.getElementById('results-screen').classList.contains('active')) {
        calculateResults();
    }
}

// Initialize the application
function initializeApp() {
    flatQuestions = [];
    questionsById = {};
    assessmentData.objectives.forEach((objective, objIndex) => {
        objective.questions.forEach((question, qIndex) => {
            questionsById[question.id] = question;
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
    const objectiveL = localizedObjective(objective);
    const questionL = localizedQuestion(question);

    const progress = ((globalIndex + 1) / flatQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = t('progressText', { current: globalIndex + 1, total: flatQuestions.length });

    document.getElementById('current-objective-code').textContent = objective.code;
    document.getElementById('current-objective-name').textContent = objectiveL.name;
    document.getElementById('current-objective-weight').textContent = `${Math.round(objective.weight * 100)}%`;

    document.getElementById('question-number').textContent = t('criterionLabel', { code: objective.code, number: question.number });
    document.getElementById('question-text').textContent = questionL.text;

    // Contextual help (collapsed by default on every question)
    const helpEl = document.getElementById('question-help');
    const helpToggle = document.getElementById('help-toggle');
    helpEl.hidden = true;
    helpToggle.classList.remove('active');
    if (questionL.help) {
        helpEl.textContent = questionL.help;
        helpToggle.style.display = '';
    } else {
        helpEl.textContent = '';
        helpToggle.style.display = 'none';
    }

    renderQuestionOptions(questionL, globalIndex);
    updateNavigationButtons();
}

// Toggle the contextual help panel for the current question
function toggleHelp() {
    const helpEl = document.getElementById('question-help');
    const helpToggle = document.getElementById('help-toggle');
    helpEl.hidden = !helpEl.hidden;
    helpToggle.classList.toggle('active', !helpEl.hidden);
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
    nextBtn.textContent = (globalIndex === flatQuestions.length - 1) ? t('viewResults') : t('nextButton');
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
        // Store ids (not text) so results can be re-rendered in any language.
        objective.questions.forEach((question, qIndex) => {
            const globalIndex = getGlobalIndexForQuestion(objIndex, qIndex);
            const answerIndex = answers[globalIndex];
            if (answerIndex !== undefined && question.answers[answerIndex].seal === objectiveSeal) {
                limitingCriteria.push({
                    id: question.id,
                    number: question.number,
                    answerIndex: answerIndex,
                    seal: objectiveSeal
                });
            }
        });

        objectiveResults[objective.id] = {
            id: objective.id,
            code: objective.code,
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
    const seal = localizedSeal(overallSeal);

    // Sovereignty Score
    document.getElementById('sov-score-value').textContent = `${percentage}%`;
    document.getElementById('sov-score-detail').textContent =
        t('sovScoreDetail', { score: Math.round(rawWeighted * 1000) });

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
    container.innerHTML = `<h3>${t('breakdownTitle')}</h3>`;

    Object.values(objectiveResults).forEach(obj => {
        const seal = localizedSeal(obj.seal);
        const name = localizedObjectiveById(obj.id).name;
        const item = document.createElement('div');
        item.className = 'breakdown-item';
        item.innerHTML = `
            <div class="breakdown-label">
                <strong>${obj.code}</strong> ${name}
                <span class="breakdown-weight">${t('breakdownWeight', { weight: Math.round(obj.weight * 100) })}</span>
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
    container.innerHTML = `<h3>${t('recommendationsTitle')}</h3>`;

    const maxLevel = Math.max(...assessmentData.sealLevels.map(s => s.level));
    const sealName = localizedSeal(overallSeal).code;

    if (overallSeal >= maxLevel) {
        const top = localizedSeal(maxLevel);
        const p = document.createElement('p');
        p.className = 'rec-intro';
        p.innerHTML = t('recTopIntro', { sealCode: top.code, sealName: top.name });
        container.appendChild(p);
    } else {
        const intro = document.createElement('p');
        intro.className = 'rec-intro';
        intro.innerHTML = t('recIntro', { sealCode: sealName });
        container.appendChild(intro);

        // Criteria across all objectives that sit at the overall (binding) SEAL.
        const binding = [];
        Object.values(objectiveResults).forEach(obj => {
            obj.limitingCriteria.forEach(c => {
                if (c.seal === overallSeal) binding.push({ code: obj.code, ...c });
            });
        });
        binding.forEach(c => {
            const q = questionsById[c.id];
            const ql = q ? localizedQuestion(q) : null;
            const text = ql ? ql.text : c.id;
            const answer = ql && ql.answers[c.answerIndex] ? ql.answers[c.answerIndex].label : '';
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.innerHTML = t('recBindingItem', {
                code: c.code,
                number: c.number,
                sealCode: localizedSeal(c.seal).code,
                text: text,
                answer: answer
            });
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
        h.textContent = t('recWeakTitle');
        container.appendChild(h);
        weak.forEach(o => {
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.textContent = t('recWeakItem', {
                code: o.code,
                name: localizedObjectiveById(o.id).name,
                percentage: o.percentage,
                weight: Math.round(o.weight * 100)
            });
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

    let report = `${t('reportTitle')}
==========================================

${t('reportDateLabel')}: ${new Date().toLocaleString()}
${t('reportIdLabel')}: cloud-sovereignty-assessment-${timestamp}

${t('reportMethodologyLabel')}: ${assessmentData.framework.name} ${assessmentData.framework.version}
             ${assessmentData.framework.methodology}

${t('reportResultsHeader')}
-------
${t('reportScoreLabel')} : ${sovScore}
${t('reportSealLabel')}: ${sealCode} - ${sealName}

${t('reportSealNote')}

${t('reportBreakdownHeader')}
----------------------------
`;

    Object.values(objectiveResults).forEach(obj => {
        const name = localizedObjectiveById(obj.id).name;
        report += `${obj.code} ${name} (${t('reportWeightLabel')} ${Math.round(obj.weight * 100)}%): ` +
            `${obj.percentage}%  | ${t('reportObjectiveSealLabel')}: ${localizedSeal(obj.seal).code}\n`;
    });

    report += `
${t('reportBindingHeader')}
-----------------------------------------------------
`;
    const overallSeal = Math.min(...Object.values(objectiveResults).map(o => o.seal));
    Object.values(objectiveResults).forEach(obj => {
        obj.limitingCriteria.forEach(c => {
            if (c.seal === overallSeal) {
                const q = questionsById[c.id];
                const ql = q ? localizedQuestion(q) : null;
                const text = ql ? ql.text : c.id;
                const answer = ql && ql.answers[c.answerIndex] ? ql.answers[c.answerIndex].label : '';
                report += `\u2022 ${obj.code} \u00b7 ${t('reportCriterionWord')} ${c.number} (${localizedSeal(c.seal).code}): ${text}\n    ${t('reportYourAnswerLabel')}: "${answer}"\n`;
            }
        });
    });

    report += `
${t('reportReferenceLabel')}: ${assessmentData.framework.name} ${assessmentData.framework.version};
Implementation Guidance and Sovereignty Assessment Calculator (1 June 2026).

${t('reportDisclaimer')}
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
    let saved = null;
    try { saved = localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch (e) { /* storage unavailable */ }
    setLanguage(saved && translations[saved] ? saved : DEFAULT_LANGUAGE);
});
