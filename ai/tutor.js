/* ============================================================
   AI TUTOR — Learning progress management
   ============================================================ */
window.AITutor = (() => {
  const PROGRESS_KEY = 'linux-tutor-progress';
  const SESSIONS_KEY = 'linux-tutor-sessions';

  function defaults() {
    return {
      totalCorrected: 0,
      byChapter: {},
      byLevel: {},
      byType: {},
      weakChapters: [],
      weakCommands: [],
      recurrentErrors: [],
      scores: [],
      lastSession: null,
      sessions: 0
    };
  }

  let progress = defaults();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || 'null');
      progress = saved ? { ...defaults(), ...saved } : defaults();
    } catch { progress = defaults(); }
    return progress;
  }

  function save() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  function getProgress() { return { ...progress }; }

  function recordCorrection(qId, result, q) {
    if (!q) {
      const all = window.questionBank?.allQuestions();
      q = all?.find(item => item.id === qId);
    }
    if (!q) return;

    progress.totalCorrected++;
    progress.byChapter[q.chapter] = (progress.byChapter[q.chapter] || 0) + 1;
    progress.byLevel[q.level] = (progress.byLevel[q.level] || 0) + 1;
    progress.byType[q.type] = (progress.byType[q.type] || 0) + 1;

    if (result && result.total !== undefined) {
      progress.scores.push({
        qId,
        date: new Date().toISOString(),
        score: result.total,
        max: result.maxScore || 20,
        chapter: q.chapter
      });
    }

    if (result && result.erreurs && result.erreurs.length) {
      progress.recurrentErrors.push(...result.erreurs.map(e => ({
        error: e,
        qId,
        chapter: q.chapter,
        date: new Date().toISOString()
      })));
      if (progress.recurrentErrors.length > 200) {
        progress.recurrentErrors = progress.recurrentErrors.slice(-200);
      }
    }

    if (result && result.notionsOubliees && result.notionsOubliees.length) {
      const ch = q.chapter;
      if (!progress.weakChapters.includes(ch)) {
        progress.weakChapters.push(ch);
      }
    }

    if (q.type === 'commande' && result && result.erreurs) {
      progress.weakCommands.push({
        command: q.question.substring(0, 80),
        qId,
        date: new Date().toISOString()
      });
      if (progress.weakCommands.length > 50) {
        progress.weakCommands = progress.weakCommands.slice(-50);
      }
    }

    save();
  }

  function getWeakChapters() {
    if (!progress.weakChapters.length) return [];
    const bank = window.questionBank;
    if (!bank) return progress.weakChapters;
    return progress.weakChapters.map(id => {
      const ch = bank.chapters.find(c => c.id === id);
      return ch ? { id, title: ch.title } : { id, title: id };
    });
  }

  function getAverageScore() {
    if (!progress.scores.length) return null;
    const sum = progress.scores.reduce((a, s) => a + (s.score / s.max) * 100, 0);
    return Math.round(sum / progress.scores.length);
  }

  function getRecentScores(n = 10) {
    return progress.scores.slice(-n).reverse();
  }

  function getWeakCommands() {
    const cmdCount = {};
    progress.weakCommands.forEach(w => {
      cmdCount[w.command] = (cmdCount[w.command] || 0) + 1;
    });
    return Object.entries(cmdCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([cmd, count]) => ({ cmd, count }));
  }

  async function generateRevisionPlan() {
    if (!AIProvider.isConfigured()) return null;
    const weak = getWeakChapters();
    const avg = getAverageScore();
    const recent = getRecentScores(5);

    const messages = [
      AIProvider.systemPrompt(
        'Tu es un tuteur pédagogique expert en formation Linux. ' +
        'À partir des données de progression, génère un plan de révision personnalisé. ' +
        'Retourne UNIQUEMENT un objet JSON.'
      ),
      AIProvider.userPrompt(`Données de progression :
- Score moyen : ${avg ?? 'N/A'}%
- Nombre de corrections : ${progress.totalCorrected}
- Chapitres faibles : ${weak.map(w => w.title).join(', ') || 'aucun'}
- Derniers scores : ${recent.map(r => `${r.score}/${r.max}`).join(', ') || 'aucun'}
- Types d'exercices : ${Object.entries(progress.byType).map(([k, v]) => `${k}:${v}`).join(', ')}

Retourne un objet JSON :
{
  "priorite": ["chapitre prioritaire 1", "chapitre prioritaire 2"],
  "revisions": [
    { "chapitre": "nom", "seances": 2, "exercicesConseilles": ["QCM", "commandes"], "sectionsCours": ["ch1-s1"] }
  ],
  "conseilsGeneraux": ["conseil"],
  "objectifProchain": "description de l'objectif"
}`)
    ];

    const raw = await AIProvider.ask(messages, { temperature: 0.4 });
    try {
      return JSON.parse(raw.replace(/```json\s*/gi, '').replace(/```/g, '').trim());
    } catch { return null; }
  }

  async function generateSmartReview(topics) {
    if (!AIProvider.isConfigured()) return null;
    const topicList = topics.join(', ');

    const messages = [
      AIProvider.systemPrompt(
        'Tu es un professeur de Linux qui crée des questions de révision ciblées. ' +
        'Génère 3 questions QCM pertinentes sur les sujets demandés, basées sur le programme L3 informatique.'
      ),
      AIProvider.userPrompt(`Génère 3 questions QCM de révision sur : ${topicList}

Retourne UNIQUEMENT un objet JSON de cette forme :
{
  "questions": [
    {
      "question": "texte",
      "options": [
        { "text": "option", "correct": false },
        { "text": "option", "correct": true }
      ],
      "explication": "pourquoi"
    }
  ]
}`)
    ];

    const raw = await AIProvider.ask(messages, { temperature: 0.5 });
    try {
      return JSON.parse(raw.replace(/```json\s*/gi, '').replace(/```/g, '').trim());
    } catch { return null; }
  }

  function reset() {
    progress = defaults();
    save();
  }

  load();
  return {
    load, save, getProgress, recordCorrection,
    getWeakChapters, getAverageScore, getRecentScores,
    getWeakCommands, generateRevisionPlan, generateSmartReview,
    reset
  };
})();
