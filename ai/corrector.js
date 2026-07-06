/* ============================================================
   AI CORRECTOR — Semantic correction engine
   ============================================================ */
window.AICorrector = (() => {
  const SYSTEM_PROMPT = `Tu es un enseignant expert en administration système GNU/Linux. 
Tu corriges des exercices d'examen de manière pédagogue et bienveillante.
Tu t'appuies uniquement sur les connaissances du support de cours fourni.
Tu ne compares jamais les réponses caractère par caractère : tu évalues la compréhension.
Tu acceptes toute formulation correcte, synonyme, ou réorganisation valide des idées.
Tu identifies les concepts présents, manquants, les erreurs et les confusions.
Tu produis une correction détaillée avec note et conseils personnalisés.`;

  const GRADING_PROMPT = `Tu dois évaluer la réponse selon ce barème :
- Compréhension du concept : /5
- Exactitude technique : /5
- Complétude : /5
- Précision technique : /3
- Qualité de l'expression : /2
Total : /20

Retourne UNIQUEMENT un objet JSON valide avec cette structure exacte, sans texte avant ni après :
{
  "comprehension": { "score": 0, "max": 5, "commentaire": "" },
  "exactitude": { "score": 0, "max": 5, "commentaire": "" },
  "completude": { "score": 0, "max": 5, "commentaire": "" },
  "precision": { "score": 0, "max": 3, "commentaire": "" },
  "expression": { "score": 0, "max": 2, "commentaire": "" },
  "total": 0,
  "pourcentage": 0,
  "ideesCorrectes": ["idee1", "idee2"],
  "notionsOubliees": ["notion1"],
  "erreurs": ["erreur1"],
  "confusions": ["confusion1"],
  "conseils": ["conseil1"],
  "reponseModele": "réponse idéale synthétique",
  "revisionChapitres": ["ch1-s3", "ch2-s1"]
}`;

  function buildCorrectionMessages(q, studentAnswer) {
    const messages = [
      AIProvider.systemPrompt(SYSTEM_PROMPT),
      AIProvider.userPrompt(`QUESTION :
${q.question}

RÉPONSE IDÉALE (tirée du cours) :
${q.answer || q.explanation || ''}

RÉPONSE DE L'ÉTUDIANT :
${studentAnswer}

${GRADING_PROMPT}`)
    ];
    return messages;
  }

  function buildQCMMessages(q, selectedIndices) {
    const selectedTexts = selectedIndices.map(i => q.options[i].text);
    const selection = q.options.map((o, i) =>
      `${i + 1}. ${o.text} [${selectedIndices.includes(i) ? 'SÉLECTIONNÉ' : 'non choisi'}]`
    ).join('\n');

    return [
      AIProvider.systemPrompt(SYSTEM_PROMPT),
      AIProvider.userPrompt(`QUESTION QCM :
${q.question}

PROPOSITIONS :
${q.options.map((o, i) => `${i + 1}. ${o.text}`).join('\n')}

SÉLECTION DE L'ÉTUDIANT :
${selectedTexts.join(', ')}

Détail des choix :
${selection}

Pour chaque proposition, explique :
1. Pourquoi elle est correcte ou incorrecte
2. Référence au cours si pertinent

Retourne UNIQUEMENT un objet JSON sans texte avant/après :
{
  "explications": [
    { "numero": 1, "texte": "proposition", "correcte": true, "explication": "..." },
    { "numero": 2, "texte": "proposition", "correcte": false, "explication": "..." }
  ],
  "score": 0,
  "max": 20,
  "commentaire": "résumé pédagogique",
  "conseils": ["conseil"],
  "revisionChapitres": ["ch1-s1"]
}`)
    ];
  }

  function buildPracticalMessages(q, studentSolution) {
    return [
      AIProvider.systemPrompt(SYSTEM_PROMPT),
      AIProvider.userPrompt(`EXERCICE PRATIQUE :
${q.question}

SOLUTION ATTENDUE :
${q.answer || ''}

SOLUTION DE L'ÉTUDIANT :
${studentSolution}

Analyse en détail :
1. La logique générale est-elle correcte ?
2. Les commandes sont-elles appropriées et bien utilisées ?
3. L'ordre des opérations est-il correct ?
4. Y a-t-il des erreurs de syntaxe, de logique ou de fond ?
5. Y a-t-il des risques (suppression de fichiers, sécurité...) ?
6. Existe-t-il d'autres solutions valides ?

Retourne UNIQUEMENT un objet JSON sans texte avant/après :
{
  "logique": { "note": 0, "max": 5, "commentaire": "" },
  "commandes": { "note": 0, "max": 5, "commentaire": "" },
  "ordre": { "note": 0, "max": 4, "commentaire": "" },
  "syntaxe": { "note": 0, "max": 3, "commentaire": "" },
  "risques": { "note": 0, "max": 3, "commentaire": "" },
  "total": 0,
  "pourcentage": 0,
  "pointsFort": "ce qui est bien",
  "erreurs": ["erreur"],
  "solutionsAlternatives": ["solution 1", "solution 2"],
  "conseils": ["conseil"],
  "revisionChapitres": ["ch4-s3"],
  "reponseModele": "solution complète et commentée"
}`)
    ];
  }

  async function correctOpen(q, studentAnswer) {
    if (!studentAnswer || !studentAnswer.trim()) {
      return { error: 'Aucune réponse à corriger.' };
    }
    const messages = buildCorrectionMessages(q, studentAnswer);
    const raw = await AIProvider.ask(messages, { temperature: 0.2 });
    return parseJSON(raw);
  }

  async function correctQCM(q, selectedIndices) {
    const messages = buildQCMMessages(q, selectedIndices);
    const raw = await AIProvider.ask(messages, { temperature: 0.2 });
    return parseJSON(raw);
  }

  async function correctPractical(q, studentSolution) {
    if (!studentSolution || !studentSolution.trim()) {
      return { error: 'Aucune solution à corriger.' };
    }
    const messages = buildPracticalMessages(q, studentSolution);
    const raw = await AIProvider.ask(messages, { temperature: 0.2 });
    return parseJSON(raw);
  }

  function parseJSON(raw) {
    if (!raw) return { error: 'Réponse API vide.' };
    try {
      const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*$/g, '').trim();
      const json = JSON.parse(cleaned);
      return json;
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch { /* fall through */ }
      }
      return { error: 'Impossible de parser la réponse.', raw };
    }
  }

  return { correctOpen, correctQCM, correctPractical };
})();
