/* ============================================================
   SCRIPT.JS — Documentation GNU/Linux
   ============================================================ */
document.addEventListener('DOMContentLoaded',()=>{

/* --- CHAPTER TOGGLE --- */
document.querySelectorAll('.ch-toggle').forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.stopPropagation();
    const ch=btn.closest('.chapter');
    document.querySelectorAll('.chapter.open').forEach(c=>{if(c!==ch)c.classList.remove('open')});
    ch.classList.toggle('open');
  });
});
document.querySelectorAll('.ch-header').forEach(hdr=>{
  hdr.addEventListener('click',()=>{
    const ch=hdr.closest('.chapter');
    document.querySelectorAll('.chapter.open').forEach(c=>{if(c!==ch)c.classList.remove('open')});
    ch.classList.toggle('open');
  });
});

/* --- SIDEBAR NAV TOGGLE --- */
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click',e=>{
    const parent=link.closest('.nav-chapter');
    const wasOpen=parent.classList.contains('open');
    document.querySelectorAll('.nav-chapter.open').forEach(c=>c.classList.remove('open'));
    if(!wasOpen)parent.classList.add('open');
  });
});

/* --- ACTIVE NAV LINK ON SCROLL --- */
const sections=document.querySelectorAll('.section[id]');
const navLinks=document.querySelectorAll('.nav-subs a');
function updateActiveNav(){
  let cur='';
  const top=window.scrollY+130;
  sections.forEach(s=>{if(s.offsetTop<=top)cur=s.id});
  navLinks.forEach(a=>{
    a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
    if(a.classList.contains('active')){
      const parent=a.closest('.nav-chapter');
      if(parent)parent.classList.add('open');
    }
  });
}
window.addEventListener('scroll',updateActiveNav);
updateActiveNav();

/* --- PROGRESS BAR --- */
const pf=document.getElementById('progressFill');
const pp=document.getElementById('progressPct');
function updProgress(){
  const st=window.scrollY;
  const dh=document.documentElement.scrollHeight-window.innerHeight;
  const pct=dh>0?Math.min(Math.round(st/dh*100),100):0;
  if(pf)pf.style.width=pct+'%';
  if(pp)pp.textContent=pct+'%';
}
window.addEventListener('scroll',updProgress);
updProgress();

/* --- SEARCH --- */
const si=document.getElementById('searchInput');
si.addEventListener('input',()=>{
  const q=si.value.trim().toLowerCase();
  document.querySelectorAll('.search-hit').forEach(el=>{
    const p=el.parentNode;p.replaceChild(document.createTextNode(el.textContent),el);p.normalize();
  });
  if(q.length<2){
    document.querySelectorAll('.section').forEach(s=>s.style.display='');
    document.querySelectorAll('.chapter').forEach(c=>c.style.display='');
    document.querySelectorAll('.nav-chapter').forEach(c=>c.style.display='');
    return;
  }
  let any=false;
  document.querySelectorAll('.section').forEach(sec=>{
    const txt=sec.textContent.toLowerCase();
    const match=txt.includes(q);
    sec.style.display=match?'':'none';
    if(match){
      any=true;
      const w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,null,false);
      const reps=[];
      while(w.nextNode()){
        const n=w.currentNode;
        if(n.parentElement?.classList.contains('search-hit'))continue;
        const idx=n.textContent.toLowerCase().indexOf(q);
        if(idx!==-1)reps.push(n);
      }
      reps.forEach(n=>{
        const idx=n.textContent.toLowerCase().indexOf(q);
        if(idx===-1)return;
        const sp=document.createElement('span');
        sp.className='search-hit';
        sp.textContent=n.textContent.substring(idx,idx+q.length);
        const frag=document.createDocumentFragment();
        frag.appendChild(document.createTextNode(n.textContent.substring(0,idx)));
        frag.appendChild(sp);
        frag.appendChild(document.createTextNode(n.textContent.substring(idx+q.length)));
        n.parentNode.replaceChild(frag,n);
      });
    }
  });
  document.querySelectorAll('.chapter').forEach(ch=>{
    const vis=ch.querySelectorAll('.section:not([style*="display: none"])');
    ch.style.display=vis.length>0?'':'none';
    if(vis.length>0)ch.classList.add('open');
    else ch.classList.remove('open');
  });
  document.querySelectorAll('.nav-chapter').forEach(nc=>{
    const id=nc.querySelector('.nav-link')?.getAttribute('href')?.slice(1);
    const sec=id?document.getElementById(id):null;
    nc.style.display=sec&&sec.style.display!=='none'?'':'none';
  });
});

/* --- COPY --- */
document.querySelectorAll('.cmd-copy').forEach(btn=>{
  btn.addEventListener('click',()=>{
    let text=btn.getAttribute('data-cmd');
    if(!text){
      const code=btn.closest('.cmd-card, .code-block')?.querySelector('code');
      if(code)text=code.textContent;
    }
    if(!text)return;
    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(text).then(()=>showCopied(btn));
    }else{
      const ta=document.createElement('textarea');
      ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';
      document.body.appendChild(ta);ta.select();
      try{document.execCommand('copy')}catch(e){}
      document.body.removeChild(ta);
      showCopied(btn);
    }
  });
});
function showCopied(btn){
  const orig=btn.textContent;
  btn.textContent='Copié !';
  btn.classList.add('copied');
  setTimeout(()=>{btn.textContent=orig;btn.classList.remove('copied')},2000);
}

/* --- THEME --- */
const themeBtn=document.getElementById('themeToggle');
const saved=localStorage.getItem('linux-doc-theme');
function setThemeIcon(dark){
  if(!themeBtn)return;
  themeBtn.innerHTML=dark
    ?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    :'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}
if(saved==='dark'){document.body.classList.add('dark');setThemeIcon(true)}
if(themeBtn)themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  const d=document.body.classList.contains('dark');
  setThemeIcon(d);
  localStorage.setItem('linux-doc-theme',d?'dark':'light');
});

/* --- BACK TO TOP --- */
const topBtn=document.getElementById('backToTop');
window.addEventListener('scroll',()=>topBtn?.classList.toggle('visible',window.scrollY>400));
topBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* --- HAMBURGER --- */
const hmb=document.getElementById('hamburger');
const sb=document.querySelector('.sidebar');
const ov=document.getElementById('sidebarOverlay');
hmb?.addEventListener('click',()=>sb?.classList.toggle('open'));
ov?.addEventListener('click',()=>sb?.classList.remove('open'));
document.querySelectorAll('.nav-subs a').forEach(a=>{
  a.addEventListener('click',()=>{if(window.innerWidth<=768)sb?.classList.remove('open')});
});

/* --- SMOOTH ANCHORS --- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const h=a.getAttribute('href');
    if(h==='#')return;
    const t=document.querySelector(h);
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}
  });
});

/* --- OPEN FROM URL HASH --- */
if(window.location.hash){
  const t=document.querySelector(window.location.hash);
  if(t){
    const ch=t.closest('.chapter');
    if(ch)ch.classList.add('open');
    setTimeout(()=>t.scrollIntoView({behavior:'smooth',block:'start'}),300);
  }
}

});

/* ============================================================
   EXAM TRAINING PLATFORM
   ============================================================ */
document.addEventListener('DOMContentLoaded',()=>{

if(typeof window.questionBank === 'undefined') return;

const QB = window.questionBank;
const ANS_KEY = 'linux-exam-answers';
const STAT_KEY = 'linux-exam-stats';

let state = {
  filterChapter: 'all',
  filterLevel: 'all',
  filterType: 'all',
  filterStatus: 'all',
  examQuestions: [],
  examIndex: 0,
  examAnswers: {},
  examTimer: null,
  examTimeLeft: 0,
  examTotal: 0,
  currentMode: 'browse',
  userAnswers: JSON.parse(localStorage.getItem(ANS_KEY) || '{}'),
  stats: JSON.parse(localStorage.getItem(STAT_KEY) || '{"solved":0,"correct":0,"incorrect":0,"byChapter":{},"byLevel":{},"byType":{},"badges":[],"streak":0,"maxStreak":0,"lastDate":null}')
};

const BADGES = [
  { id:'premier-pas', label:'Premier pas', desc:'Répondre à 1 question', check:s=>s.solved>=1 },
  { id:'determine', label:'Déterminé', desc:'Répondre à 5 questions', check:s=>s.solved>=5 },
  { id:'apprenti', label:'Apprenti', desc:'Répondre à 10 questions', check:s=>s.solved>=10 },
  { id:'expert', label:'Expert', desc:'Répondre à 20 questions', check:s=>s.solved>=20 },
  { id:'maitre', label:'Maître', desc:'Répondre à 50 questions', check:s=>s.solved>=50 },
  { id:'parfait', label:'Parfait', desc:'100% à un examen', check:s=>s.examPerfect },
  { id:'sans-erreur', label:'Sans erreur', desc:'5 bonnes réponses à la suite', check:s=>s.maxStreak>=5 },
  { id:'polyvalent', label:'Polyvalent', desc:'Questions de tous les chapitres', check:s=>Object.keys(s.byChapter).length>=8 },
  { id:'rapide', label:'Rapide', desc:'Finir un examen avec +50% temps restant', check:s=>s.examFast },
  { id:'perseverant', label:'Persévérant', desc:'Session 7 jours consécutifs', check:s=>s.streak>=7 }
];

function el(id) { return document.getElementById(id); }

function initExam() {
  populateFilters();
  renderBrowseQuestions(getFilteredQuestions());
  updateStatsBar();
  bindExamEvents();
  switchMode('browse');
}

function populateFilters() {
  const chapters = QB.chapters;
  const fc = el('filterChapter');
  const ec = el('examChapter');
  if(fc) {
    fc.innerHTML = '<option value="all">Tous les chapitres</option>';
    chapters.forEach(ch => {
      fc.innerHTML += `<option value="${ch.id}">${ch.title.replace(/Ch\.\w+\s*/,'')}</option>`;
    });
  }
  if(ec) {
    ec.innerHTML = '<option value="all">Tous les chapitres</option>';
    chapters.forEach(ch => {
      ec.innerHTML += `<option value="${ch.id}">${ch.title.replace(/Ch\.\w+\s*/,'')}</option>`;
    });
  }
}

function getFilteredQuestions() {
  let qs = QB.allQuestions();
  if(state.filterChapter !== 'all') qs = qs.filter(q => q.chapter === state.filterChapter);
  if(state.filterLevel !== 'all') qs = qs.filter(q => q.level === state.filterLevel);
  if(state.filterType !== 'all') qs = qs.filter(q => q.type === state.filterType);
  if(state.filterStatus !== 'all') {
    if(state.filterStatus === 'untouched') qs = qs.filter(q => !state.userAnswers[q.id]);
    else qs = qs.filter(q => state.userAnswers[q.id]?.correct === (state.filterStatus === 'correct'));
  }
  return qs;
}

function renderBrowseQuestions(questions) {
  const c = el('questionContainer');
  if(!c) return;
  const fc = el('filterCount');
  if(fc) fc.textContent = questions.length + ' question' + (questions.length>1?'s':'');
  if(!questions.length) {
    c.innerHTML = '<div class="stats-placeholder">Aucune question ne correspond aux filtres.</div>';
    return;
  }
  c.innerHTML = '';
  questions.forEach(q => {
    const card = createQuestionCard(q);
    c.appendChild(card);
  });
}

function createQuestionCard(q, examMode) {
  const card = document.createElement('div');
  card.className = 'question-card';
  card.dataset.qid = q.id;

  const status = state.userAnswers[q.id];
  let statusBadge = '';
  if(status) {
    statusBadge = status.correct
      ? '<span class="question-badge qb-correct">Réussi</span>'
      : '<span class="question-badge qb-incorrect">Échoué</span>';
  }

  const chapterTitle = QB.chapters.find(c => c.id === q.chapter)?.title || q.chapter;

  card.innerHTML = `
    <div class="question-meta">
      <span class="question-badge qb-chapter">${chapterTitle}</span>
      <span class="question-badge qb-level-${q.level}">${q.level === 'debutant' ? 'Débutant' : q.level === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}</span>
      <span class="question-badge qb-type">${typeLabel(q.type)}</span>
      ${statusBadge}
    </div>
    <div class="question-text">${q.question}</div>
  `;

  const responseArea = document.createElement('div');
  responseArea.className = 'question-response';
  card.appendChild(responseArea);

  renderResponseArea(q, responseArea, examMode, card);

  if(status && !examMode) {
    const answerDiv = card.querySelector('.question-answer');
    if(answerDiv) {
      answerDiv.classList.add('revealed');
      answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
    }
  }

  const revealBtn = document.createElement('button');
  revealBtn.className = 'reveal-btn';
  revealBtn.textContent = status ? 'Masquer la réponse' : 'Voir la réponse';
  card.appendChild(revealBtn);

  const answerDiv = document.createElement('div');
  answerDiv.className = 'question-answer';
  answerDiv.innerHTML = buildAnswerHTML(q);
  card.appendChild(answerDiv);

  if(status) {
    answerDiv.classList.add('revealed');
    answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
  }

  revealBtn.addEventListener('click', () => {
    const revealed = answerDiv.classList.toggle('revealed');
    if(revealed) {
      answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      revealBtn.textContent = 'Masquer la réponse';
      // Mark as seen
      if(!state.userAnswers[q.id]) {
        state.userAnswers[q.id] = { seen: true, correct: false };
        localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
      }
    } else {
      answerDiv.style.maxHeight = '0';
      revealBtn.textContent = 'Voir la réponse';
    }
  });

  // AI Correction button (only for open-ended types, not in exam mode)
  const aiTypes = ['ouverte', 'commande', 'pratique', 'erreur', 'interpretation'];
  if(aiTypes.includes(q.type) && !examMode) {
    const aiBtn = document.createElement('button');
    aiBtn.className = 'reveal-btn ai-correct-btn';
    aiBtn.textContent = 'Corriger par IA';
    card.appendChild(aiBtn);

    const aiResult = document.createElement('div');
    aiResult.className = 'ai-correction';
    aiResult.id = 'ai-result-' + q.id;
    card.appendChild(aiResult);

    aiBtn.addEventListener('click', async () => {
      if(!window.AIProvider || !AIProvider.isConfigured()) {
        aiResult.innerHTML = '<div class="ai-error">Configurez d\'abord une clé API dans l\'onglet Configuration IA.</div>';
        aiResult.style.display = 'block';
        return;
      }
      const userAns = state.userAnswers[q.id];
      const text = userAns?.text || '';
      if(!text.trim()) {
        aiResult.innerHTML = '<div class="ai-error">Écrivez d\'abord une réponse avant de demander une correction.</div>';
        aiResult.style.display = 'block';
        return;
      }
      aiBtn.disabled = true;
      aiBtn.textContent = 'Correction en cours...';
      aiResult.innerHTML = '<div class="ai-loading">Analyse de votre réponse par l\'IA...</div>';
      aiResult.style.display = 'block';
      try {
        const result = await AICorrector.correctOpen(q, text);
        renderAICorrection(aiResult, result, q);
        if(result && !result.error) {
          AITutor.recordCorrection(q.id, result, q);
        }
      } catch(e) {
        aiResult.innerHTML = '<div class="ai-error">Erreur lors de la correction : ' + e.message + '</div>';
      } finally {
        aiBtn.disabled = false;
        aiBtn.textContent = 'Corriger par IA';
      }
    });
  }

  return card;
}

function typeLabel(t) {
  const map = { qcm:'QCM', vraifaux:'Vrai/Faux', ouverte:'Question ouverte', commande:'Commande', pratique:'Pratique', erreur:'Trouver l\'erreur', interpretation:'Interprétation' };
  return map[t] || t;
}

function renderResponseArea(q, container, examMode, card) {
  if(q.type === 'qcm') renderQCM(q, container, examMode, card);
  else if(q.type === 'vraifaux') renderVF(q, container, examMode, card);
  else if(q.type === 'ouverte') renderOpen(q, container, examMode, card);
  else if(q.type === 'commande') renderCmd(q, container, examMode, card);
  else if(q.type === 'pratique') renderPratique(q, container, examMode, card);
  else if(q.type === 'erreur') renderErreur(q, container, examMode, card);
  else if(q.type === 'interpretation') renderInterpretation(q, container, examMode, card);
}

function renderQCM(q, container, examMode, card) {
  const div = document.createElement('div');
  div.className = 'qcm-options';

  const saved = state.userAnswers[q.id];
  const single = q.options.filter(o => o.correct).length === 1;

  q.options.forEach((opt, i) => {
    const label = document.createElement('label');
    label.className = 'qcm-option';
    const input = document.createElement('input');
    input.type = single ? 'radio' : 'checkbox';
    input.name = 'qcm-' + q.id;
    input.value = i;

    if(saved) {
      if(saved.selected?.includes(i)) {
        input.checked = true;
        label.classList.add('selected');
      }
      if(saved.correct !== undefined) {
        if(opt.correct) label.classList.add('revealed-correct');
        if(saved.selected?.includes(i) && !opt.correct) label.classList.add('incorrect');
      }
    }

    input.addEventListener('change', () => {
      if(!examMode && state.userAnswers[q.id]?.correct !== undefined) return;
      if(single) {
        div.querySelectorAll('.qcm-option').forEach(el => el.classList.remove('selected'));
      }
      label.classList.toggle('selected');
      saveQCMAnswer(q, div);
    });

    label.appendChild(input);
    label.appendChild(document.createTextNode(opt.text));
    div.appendChild(label);
  });

  container.appendChild(div);
  // Add AI explanation button for QCM
  if(!examMode) addQCMCorrectBtn(q, card);
}

function saveQCMAnswer(q, div) {
  const selected = [];
  div.querySelectorAll('.qcm-option input:checked').forEach(inp => selected.push(parseInt(inp.value)));
  const correct = q.options.every((o, i) => o.correct === selected.includes(i));
  state.userAnswers[q.id] = { selected, correct, type: 'qcm' };
  localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
  if(correct) markCorrect(div.closest('.question-card'), q);
  else markIncorrect(div.closest('.question-card'), q);
  updateStatsBar();
}

function renderVF(q, container, examMode, card) {
  const div = document.createElement('div');
  div.className = 'vf-buttons';

  const saved = state.userAnswers[q.id];

  const vrai = document.createElement('button');
  vrai.className = 'vf-btn vrai';
  vrai.textContent = 'Vrai';
  const faux = document.createElement('button');
  faux.className = 'vf-btn faux';
  faux.textContent = 'Faux';

  if(saved) {
    if(saved.value === true) vrai.classList.add('selected-vrai');
    if(saved.value === false) faux.classList.add('selected-faux');
  }

  function selectVF(val) {
    if(!examMode && state.userAnswers[q.id]?.correct !== undefined) return;
    [vrai, faux].forEach(b => { b.classList.remove('selected-vrai', 'selected-faux'); });
    if(val) vrai.classList.add('selected-vrai');
    else faux.classList.add('selected-faux');

    const correct = val === q.correct;
    state.userAnswers[q.id] = { value: val, correct, type: 'vraifaux' };
    localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
    if(correct) markCorrect(card, q);
    else markIncorrect(card, q);
    updateStatsBar();
  }

  vrai.addEventListener('click', () => selectVF(true));
  faux.addEventListener('click', () => selectVF(false));
  div.appendChild(vrai);
  div.appendChild(faux);
  container.appendChild(div);
}

function renderOpen(q, container, examMode, card) {
  const div = document.createElement('div');
  div.className = 'open-response';
  const ta = document.createElement('textarea');
  ta.placeholder = 'Écrivez votre réponse ici...';
  const saved = state.userAnswers[q.id];
  if(saved?.text) ta.value = saved.text;
  ta.addEventListener('input', () => {
    state.userAnswers[q.id] = { text: ta.value, correct: false, type: 'ouverte' };
    localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
  });
  div.appendChild(ta);
  container.appendChild(div);
}

function renderCmd(q, container, examMode, card) {
  const div = document.createElement('div');
  div.className = 'cmd-response';
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.placeholder = 'Tapez la commande...';
  const saved = state.userAnswers[q.id];
  if(saved?.text) inp.value = saved.text;
  inp.addEventListener('input', () => {
    state.userAnswers[q.id] = { text: inp.value, correct: false, type: 'commande' };
    localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
  });
  inp.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
      const revealBtn = card.querySelector('.reveal-btn');
      if(revealBtn) revealBtn.click();
    }
  });
  div.appendChild(inp);
  container.appendChild(div);
}

function renderPratique(q, container, examMode, card) {
  const div = document.createElement('div');
  div.className = 'open-response';
  const ta = document.createElement('textarea');
  ta.placeholder = 'Décrivez votre solution étape par étape...';
  const saved = state.userAnswers[q.id];
  if(saved?.text) ta.value = saved.text;
  ta.addEventListener('input', () => {
    state.userAnswers[q.id] = { text: ta.value, correct: false, type: 'pratique' };
    localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
  });
  div.appendChild(ta);
  container.appendChild(div);
}

function renderErreur(q, container, examMode, card) {
  const codeDiv = document.createElement('div');
  codeDiv.className = 'question-code';
  codeDiv.textContent = q.code;
  container.appendChild(codeDiv);

  const div = document.createElement('div');
  div.className = 'open-response';
  const ta = document.createElement('textarea');
  ta.placeholder = 'Quelle est l\'erreur ? Comment la corriger ?';
  const saved = state.userAnswers[q.id];
  if(saved?.text) ta.value = saved.text;
  ta.addEventListener('input', () => {
    state.userAnswers[q.id] = { text: ta.value, correct: false, type: 'erreur' };
    localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
  });
  div.appendChild(ta);
  container.appendChild(div);
}

function renderInterpretation(q, container, examMode, card) {
  const outDiv = document.createElement('div');
  outDiv.className = 'question-output';
  outDiv.textContent = q.output;
  container.appendChild(outDiv);

  const div = document.createElement('div');
  div.className = 'open-response';
  const ta = document.createElement('textarea');
  ta.placeholder = 'Interprétez cette sortie...';
  const saved = state.userAnswers[q.id];
  if(saved?.text) ta.value = saved.text;
  ta.addEventListener('input', () => {
    state.userAnswers[q.id] = { text: ta.value, correct: false, type: 'interpretation' };
    localStorage.setItem(ANS_KEY, JSON.stringify(state.userAnswers));
  });
  div.appendChild(ta);
  container.appendChild(div);
}

function buildAnswerHTML(q) {
  let html = '<div class="answer-content">';

  if(q.answer) html += `<p><strong>Réponse :</strong></p><p>${q.answer}</p>`;
  if(q.code && q.type !== 'erreur') html += `<div class="answer-code">${q.code}</div>`;
  if(q.example) html += `<div class="answer-code">${q.example}</div>`;
  if(q.explanation) html += `<div class="answer-explanation"><strong>Explication</strong><br>${q.explanation}</div>`;
  if(q.commonMistake) html += `<div class="answer-mistake"><strong>Erreur fréquente</strong><br>${q.commonMistake}</div>`;
  if(q.keyTakeaway) html += `<div class="answer-keytakeaway"><strong>À retenir</strong><br>${q.keyTakeaway}</div>`;
  if(q.reviewChapter) html += `<a href="#${q.reviewChapter}" class="answer-review">Revoir le cours</a>`;

  html += '</div>';
  return html;
}

function markCorrect(card, q) {
  if(!card) return;
  card.style.borderLeft = '4px solid #1a7f37';
  updateStats(q.id, true);
}

function markIncorrect(card, q) {
  if(!card) return;
  card.style.borderLeft = '4px solid var(--red)';
  updateStats(q.id, false);
}

/* ─── AI Correction Display ─── */
function renderAICorrection(container, result, q) {
  if(!result || result.error) {
    container.innerHTML = '<div class="ai-error">' + (result?.error || 'Erreur inconnue') + '</div>';
    return;
  }

  let html = '<div class="ai-correction-content">';

  // Score overview
  const total = result.total || 0;
  const pct = result.pourcentage || Math.round(total / 20 * 100);
  let gradeClass = 'grade-fail';
  let grade = 'Insuffisant';
  if(pct >= 90) { grade = 'Excellent'; gradeClass = 'grade-excellent'; }
  else if(pct >= 75) { grade = 'Bien'; gradeClass = 'grade-good'; }
  else if(pct >= 50) { grade = 'Passable'; gradeClass = 'grade-passable'; }

  html += '<div class="ai-score-banner ' + gradeClass + '">';
  html += '<div class="ai-score-value">' + total + '<span class="ai-score-max">/20</span></div>';
  html += '<div class="ai-score-pct">' + pct + '% — ' + grade + '</div>';
  html += '<div class="ai-score-bar"><div class="ai-score-fill" style="width:' + pct + '%"></div></div>';
  html += '</div>';

  // Detailed scores
  const criteria = [
    { key: 'comprehension', label: 'Compréhension', max: 5 },
    { key: 'exactitude', label: 'Exactitude', max: 5 },
    { key: 'completude', label: 'Complétude', max: 5 },
    { key: 'precision', label: 'Précision technique', max: 3 },
    { key: 'expression', label: 'Expression', max: 2 }
  ];

  html += '<div class="ai-criteria">';
  criteria.forEach(c => {
    const item = result[c.key];
    if(!item) return;
    const score = item.score || 0;
    const pctC = Math.round(score / c.max * 100);
    html += '<div class="ai-criterion">';
    html += '<div class="ai-criterion-header"><span class="ai-criterion-label">' + c.label + '</span><span class="ai-criterion-score">' + score + '/' + c.max + '</span></div>';
    html += '<div class="ai-criterion-bar"><div class="ai-criterion-fill" style="width:' + pctC + '%"></div></div>';
    if(item.commentaire) html += '<p class="ai-criterion-comment">' + item.commentaire + '</p>';
    html += '</div>';
  });
  html += '</div>';

  // Ideas correctly expressed
  if(result.ideesCorrectes && result.ideesCorrectes.length) {
    html += '<div class="ai-section ai-section-good"><h4>Points positifs</h4><ul>';
    result.ideesCorrectes.forEach(idea => { html += '<li>' + idea + '</li>'; });
    html += '</ul></div>';
  }

  // Missing notions
  if(result.notionsOubliees && result.notionsOubliees.length) {
    html += '<div class="ai-section ai-section-missing"><h4>Notions oubliées</h4><ul>';
    result.notionsOubliees.forEach(n => { html += '<li>' + n + '</li>'; });
    html += '</ul></div>';
  }

  // Errors
  if(result.erreurs && result.erreurs.length) {
    html += '<div class="ai-section ai-section-error"><h4>Erreurs</h4><ul>';
    result.erreurs.forEach(e => { html += '<li>' + e + '</li>'; });
    html += '</ul></div>';
  }

  // Confusions
  if(result.confusions && result.confusions.length) {
    html += '<div class="ai-section ai-section-confusion"><h4>Confusions</h4><ul>';
    result.confusions.forEach(c => { html += '<li>' + c + '</li>'; });
    html += '</ul></div>';
  }

  // Advice
  if(result.conseils && result.conseils.length) {
    html += '<div class="ai-section ai-section-advice"><h4>Conseils d\'amélioration</h4><ul>';
    result.conseils.forEach(c => { html += '<li>' + c + '</li>'; });
    html += '</ul></div>';
  }

  // Model answer
  if(result.reponseModele) {
    html += '<div class="ai-model-answer"><h4>Réponse modèle</h4><div class="answer-code">' + result.reponseModele + '</div></div>';
  }

  // Revision links
  if(result.revisionChapitres && result.revisionChapitres.length) {
    html += '<div class="ai-revision-links"><h4>Sections à revoir</h4>';
    result.revisionChapitres.forEach(ref => {
      const found = document.querySelector('[id="' + ref + '"]');
      const label = found ? found.querySelector('.section-title')?.textContent || ref : ref;
      html += '<a href="#' + ref + '" class="answer-review">' + label + '</a>';
    });
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
  container.style.display = 'block';
}

/* ─── AI Settings ─── */
function initAISettings() {
  const cfg = window.AIProvider?.getConfig();
  if(!cfg) return;

  const provider = document.getElementById('aiProvider');
  const apiUrl = document.getElementById('aiApiUrl');
  const apiKey = document.getElementById('aiApiKey');
  const model = document.getElementById('aiModel');
  const temp = document.getElementById('aiTemperature');
  const maxTokens = document.getElementById('aiMaxTokens');

  if(provider) provider.value = cfg.provider || 'openai';
  if(apiUrl) apiUrl.value = cfg.apiUrl || 'https://api.openai.com/v1';
  if(apiKey) apiKey.value = cfg.apiKey || '';
  if(model) model.value = cfg.model || 'gpt-4o-mini';
  if(temp) temp.value = cfg.temperature ?? 0.3;
  if(maxTokens) maxTokens.value = cfg.maxTokens || 2048;

  const saveBtn = document.getElementById('aiSaveBtn');
  const testBtn = document.getElementById('aiTestBtn');
  const status = document.getElementById('aiStatus');

  if(saveBtn) saveBtn.addEventListener('click', () => {
    window.AIProvider.save({
      provider: provider?.value || 'openai',
      apiUrl: apiUrl?.value || 'https://api.openai.com/v1',
      apiKey: apiKey?.value || '',
      model: model?.value || 'gpt-4o-mini',
      temperature: parseFloat(temp?.value || '0.3'),
      maxTokens: parseInt(maxTokens?.value || '2048')
    });
    if(status) { status.textContent = 'Configuration enregistrée'; status.className = 'ai-status ai-status-ok'; }
    setTimeout(() => { if(status) status.textContent = ''; }, 3000);
  });

  if(testBtn) testBtn.addEventListener('click', async () => {
    if(status) { status.textContent = 'Test en cours...'; status.className = 'ai-status'; }
    window.AIProvider.save({
      provider: provider?.value || 'openai',
      apiUrl: apiUrl?.value || 'https://api.openai.com/v1',
      apiKey: apiKey?.value || '',
      model: model?.value || 'gpt-4o-mini',
      temperature: parseFloat(temp?.value || '0.3'),
      maxTokens: parseInt(maxTokens?.value || '2048')
    });
    try {
      const res = await window.AIProvider.ask([
        AIProvider.userPrompt('Réponds uniquement par OK si tu reçois ce message.')
      ], { maxTokens: 10, temperature: 0 });
      if(status) { status.textContent = 'Connexion réussie !'; status.className = 'ai-status ai-status-ok'; }
    } catch(e) {
      if(status) { status.textContent = 'Échec : ' + e.message; status.className = 'ai-status ai-status-error'; }
    }
  });
}

/* ─── QCM AI Correction ─── */
function addQCMCorrectBtn(q, card) {
  if(!card || q.type !== 'qcm') return;
  const existing = card.querySelector('.ai-correct-btn');
  if(existing) return;

  const aiBtn = document.createElement('button');
  aiBtn.className = 'reveal-btn ai-correct-btn';
  aiBtn.textContent = 'Explication détaillée';
  card.appendChild(aiBtn);

  const aiResult = document.createElement('div');
  aiResult.className = 'ai-correction';
  aiResult.id = 'ai-result-qcm-' + q.id;
  card.appendChild(aiResult);

  aiBtn.addEventListener('click', async () => {
    if(!window.AIProvider || !AIProvider.isConfigured()) {
      aiResult.innerHTML = '<div class="ai-error">Configurez d\'abord une clé API dans l\'onglet Configuration IA.</div>';
      aiResult.style.display = 'block';
      return;
    }
    const ans = state.userAnswers[q.id];
    const selected = ans?.selected || [];
    if(!selected.length) {
      aiResult.innerHTML = '<div class="ai-error">Sélectionnez d\'abord une ou plusieurs réponses.</div>';
      aiResult.style.display = 'block';
      return;
    }
    aiBtn.disabled = true;
    aiBtn.textContent = 'Analyse en cours...';
    aiResult.innerHTML = '<div class="ai-loading">Génération des explications...</div>';
    aiResult.style.display = 'block';
    try {
      const result = await AICorrector.correctQCM(q, selected);
      renderQCMCorrection(aiResult, result, q);
    } catch(e) {
      aiResult.innerHTML = '<div class="ai-error">Erreur : ' + e.message + '</div>';
    } finally {
      aiBtn.disabled = false;
      aiBtn.textContent = 'Explication détaillée';
    }
  });
}

function renderQCMCorrection(container, result, q) {
  if(!result || result.error) {
    container.innerHTML = '<div class="ai-error">' + (result?.error || 'Erreur') + '</div>';
    return;
  }

  let html = '<div class="ai-correction-content">';

  if(result.explications) {
    html += '<div class="ai-section ai-section-good"><h4>Analyse des propositions</h4>';
    result.explications.forEach(ex => {
      const icon = ex.correcte ? '✓' : '✗';
      const cls = ex.correcte ? 'qcm-explication-correct' : 'qcm-explication-incorrect';
      html += '<div class="qcm-explication ' + cls + '">';
      html += '<div class="qcm-explication-header"><span class="qcm-explication-icon">' + icon + '</span><span>' + ex.texte + '</span></div>';
      html += '<p>' + ex.explication + '</p></div>';
    });
    html += '</div>';
  }

  if(result.commentaire) {
    html += '<div class="ai-section ai-section-advice"><h4>Résumé</h4><p>' + result.commentaire + '</p></div>';
  }

  if(result.conseils && result.conseils.length) {
    html += '<div class="ai-section ai-section-missing"><h4>Conseils</h4><ul>';
    result.conseils.forEach(c => { html += '<li>' + c + '</li>'; });
    html += '</ul></div>';
  }

  if(result.revisionChapitres && result.revisionChapitres.length) {
    html += '<div class="ai-revision-links"><h4>Sections à revoir</h4>';
    result.revisionChapitres.forEach(ref => {
      const found = document.querySelector('[id="' + ref + '"]');
      const label = found ? found.querySelector('.section-title')?.textContent || ref : ref;
      html += '<a href="#' + ref + '" class="answer-review">' + label + '</a>';
    });
    html += '</div>';
  }

  html += '</div>';
  container.innerHTML = html;
  container.style.display = 'block';
}

function updateStats(qId, correct) {
  const q = QB.allQuestions().find(q => q.id === qId);
  if(!q) return;

  state.stats.solved++;
  if(correct) state.stats.correct++;
  else state.stats.incorrect++;

  state.stats.byChapter[q.chapter] = (state.stats.byChapter[q.chapter] || 0) + (correct ? 1 : 0);
  state.stats.byLevel[q.level] = (state.stats.byLevel[q.level] || 0) + (correct ? 1 : 0);
  state.stats.byType[q.type] = (state.stats.byType[q.type] || 0) + (correct ? 1 : 0);

  // Streak
  const today = new Date().toDateString();
  if(correct) {
    if(state.stats.lastDate === today) state.stats.streak++;
    else if(state.stats.lastDate && new Date(state.stats.lastDate) >= new Date(Date.now() - 2*86400000).toDateString()) state.stats.streak++;
    else state.stats.streak = 1;
    state.stats.lastDate = today;
    state.stats.maxStreak = Math.max(state.stats.maxStreak, state.stats.streak);
  }

  localStorage.setItem(STAT_KEY, JSON.stringify(state.stats));
  updateStatsBar();
  checkBadges();
}

function updateStatsBar() {
  const s = state.stats;
  const gs = el('globalScore');
  const sr = el('successRate');
  const cs = el('currentStreak');
  const sc = el('solvedCount');

  if(gs) gs.textContent = s.solved ? Math.round(s.correct / s.solved * 100) + '%' : '--';
  if(sr) sr.textContent = s.solved ? Math.round(s.correct / s.solved * 100) + '%' : '--';
  if(cs) cs.textContent = s.streak ? s.streak + 'j' : '0j';
  if(sc) sc.textContent = s.solved;
}

function checkBadges() {
  const s = state.stats;
  const earned = BADGES.filter(b => b.check(s) && !s.badges.includes(b.id));
  earned.forEach(b => {
    s.badges.push(b.id);
    showToast(`Badge débloqué : ${b.label}`);
  });
  if(earned.length) localStorage.setItem(STAT_KEY, JSON.stringify(state.stats));
}

function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:120px;right:24px;background:var(--gray-900);color:var(--white);padding:12px 20px;border-radius:12px;font-size:0.9rem;z-index:200;box-shadow:0 4px 20px rgba(0,0,0,0.3);animation:fadeSlideIn 0.3s ease;max-width:320px';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

/* TAB SWITCHING */
function switchMode(mode) {
  state.currentMode = mode;
  document.querySelectorAll('.exam-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  document.querySelectorAll('.exam-panel').forEach(p => p.classList.remove('active'));
  const panel = el('panel-' + mode);
  if(panel) panel.classList.add('active');

  if(mode === 'browse') renderBrowseQuestions(getFilteredQuestions());
  else if(mode === 'stats') renderStats();
  else if(mode === 'weak') renderWeakPoints();

  // Open exam chapter
  const examCh = el('exam-chapter');
  if(examCh) {
    document.querySelectorAll('.chapter.open').forEach(c => { if(c !== examCh) c.classList.remove('open'); });
    examCh.classList.add('open');
  }
  // Scroll to exam section
  const examSection = document.querySelector('#exam-chapter');
    if(examSection) {
    setTimeout(() => examSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }
}

/* EXAM MODE */
function startExam() {
  const count = parseInt(el('examCount')?.value || 10);
  const chapter = el('examChapter')?.value || 'all';
  const level = el('examLevel')?.value || 'all';
  const time = parseInt(el('examTime')?.value || 0);

  let pool = QB.allQuestions().filter(q => q.type === 'qcm' || q.type === 'vraifaux');
  if(chapter !== 'all') pool = pool.filter(q => q.chapter === chapter);
  if(level !== 'all') pool = pool.filter(q => q.level === level);
  pool.sort(() => Math.random() - 0.5);
  state.examQuestions = pool.slice(0, Math.min(count, pool.length));
  state.examIndex = 0;
  state.examAnswers = {};
  state.examTotal = state.examQuestions.length;

  el('examSetup')?.classList.add('hidden');
  el('examSession')?.classList.remove('hidden');
  el('examResults')?.classList.add('hidden');

  if(time > 0) startExamTimer(time);
  else {
    const timer = el('examTimer');
    if(timer) timer.textContent = '--:--';
  }

  renderExamQuestion();
  updateExamProgress();
}

function startExamTimer(seconds) {
  state.examTimeLeft = seconds;
  updateTimerDisplay();
  if(state.examTimer) clearInterval(state.examTimer);
  state.examTimer = setInterval(() => {
    state.examTimeLeft--;
    updateTimerDisplay();
    if(state.examTimeLeft <= 0) {
      clearInterval(state.examTimer);
      submitExam(true);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const t = el('examTimer');
  if(!t) return;
  const m = Math.floor(state.examTimeLeft / 60);
  const s = state.examTimeLeft % 60;
  t.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  t.className = 'exam-timer';
  if(state.examTimeLeft < 30) t.classList.add('danger');
  else if(state.examTimeLeft < 60) t.classList.add('warning');
}

function renderExamQuestion() {
  const c = el('examQuestionContainer');
  if(!c) return;
  const q = state.examQuestions[state.examIndex];
  if(!q) return;

  const saved = state.examAnswers[q.id];
  c.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'question-card';
  card.dataset.qid = q.id;

  const chapterTitle = QB.chapters.find(ch => ch.id === q.chapter)?.title || q.chapter;

  card.innerHTML = `
    <div class="question-meta">
      <span class="question-badge qb-chapter">${chapterTitle}</span>
      <span class="question-badge qb-level-${q.level}">${q.level === 'debutant' ? 'Débutant' : q.level === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}</span>
      <span class="question-badge qb-type">${typeLabel(q.type)}</span>
    </div>
    <div class="question-text">${q.question}</div>
  `;

  const responseArea = document.createElement('div');
  responseArea.className = 'question-response';
  card.appendChild(responseArea);

  // Temporarily set userAnswers to examAnswers for the response renderers
  const savedUA = state.userAnswers;
  state.userAnswers = state.examAnswers;
  renderResponseArea(q, responseArea, true, card);
  state.userAnswers = savedUA;

  c.appendChild(card);

  // Update nav buttons
  el('prevExamBtn').style.visibility = state.examIndex === 0 ? 'hidden' : 'visible';
  const nextBtn = el('nextExamBtn');
  const submitBtn = el('submitExamBtn');
  if(state.examIndex === state.examTotal - 1) {
    nextBtn.style.display = 'none';
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.style.display = '';
    submitBtn.classList.add('hidden');
  }
}

function updateExamProgress() {
  const p = el('examProgress');
  if(!p) return;
  p.textContent = `Question ${state.examIndex + 1}/${state.examTotal}`;
}

function navigateExam(dir) {
  const q = state.examQuestions[state.examIndex];
  if(q) {
    // Save answer from examAnswers
  }
  state.examIndex += dir;
  renderExamQuestion();
  updateExamProgress();
}

function submitExam(timeUp) {
  clearInterval(state.examTimer);
  el('examSession')?.classList.add('hidden');
  const results = el('examResults');
  results?.classList.remove('hidden');

  let correct = 0;
  let total = state.examTotal;

  // Grade QCM and VF questions
  state.examQuestions.forEach(q => {
    const ans = state.examAnswers[q.id];
    if(!ans) return;
    if(q.type === 'qcm') {
      const selected = ans.selected || [];
      if(q.options.every((o, i) => o.correct === selected.includes(i))) correct++;
    } else if(q.type === 'vraifaux') {
      if(ans.value === q.correct) correct++;
    }
  });

  const pct = Math.round(correct / total * 100);
  let grade = 'Échec';
  if(pct >= 90) grade = 'Excellent';
  else if(pct >= 70) grade = 'Bien';
  else if(pct >= 50) grade = 'Passable';

  // Save to permanent stats
  total = Math.max(total, 1);
  for(let i = 0; i < total; i++) {
    const q = state.examQuestions[i];
    if(!q) continue;
    const ans = state.examAnswers[q.id];
    let isCorrect = false;
    if(ans) {
      if(q.type === 'qcm') isCorrect = q.options.every((o, idx) => o.correct === (ans.selected || []).includes(idx));
      else if(q.type === 'vraifaux') isCorrect = ans.value === q.correct;
    }
    updateStats(q.id, isCorrect);
  }

  if(pct === 100) state.stats.examPerfect = true;
  if(!timeUp && state.examTimeLeft > 0) {
    const origTime = parseInt(el('examTime')?.value || 600);
    if(state.examTimeLeft > origTime / 2) state.stats.examFast = true;
  }
  checkBadges();

  results.innerHTML = `
    <div class="exam-results-card">
      <h3>${timeUp ? 'Temps écoulé' : 'Examen terminé'}</h3>
      <div class="exam-results-score">${correct}/${total}</div>
      <div style="font-size:1.2rem;font-weight:600;color:${pct>=50?'var(--blue)':'var(--red)'}">${pct}% — ${grade}</div>
      <div class="exam-results-detail">
        <div class="stat-item"><span class="stat-label">Correctes</span><span class="stat-value">${correct}</span></div>
        <div class="stat-item"><span class="stat-label">Incorrectes</span><span class="stat-value">${total - correct}</span></div>
        <div class="stat-item"><span class="stat-label">Précision</span><span class="stat-value">${pct}%</span></div>
      </div>
      <button class="exam-btn exam-btn-primary" id="reviewExamBtn">Revoir les réponses</button>
    </div>
  `;

  el('reviewExamBtn')?.addEventListener('click', () => {
    results.innerHTML = '';
    state.examQuestions.forEach((q, i) => {
      const card = createQuestionCard(q, true);
      const ans = state.examAnswers[q.id];
      if(q.type === 'qcm' && ans) {
        const selected = ans.selected || [];
        if(q.options.every((o, idx) => o.correct === selected.includes(idx))) {
          card.style.borderLeft = '4px solid #1a7f37';
        } else {
          card.style.borderLeft = '4px solid var(--red)';
        }
      }
      if(q.type === 'vraifaux' && ans) {
        card.style.borderLeft = ans.value === q.correct ? '4px solid #1a7f37' : '4px solid var(--red)';
      }
      const answerDiv = card.querySelector('.question-answer');
      if(answerDiv) {
        answerDiv.classList.add('revealed');
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      }
      results.appendChild(card);
    });
    const backBtn = document.createElement('button');
    backBtn.className = 'exam-btn exam-btn-primary';
    backBtn.textContent = 'Retour au tableau de bord';
    backBtn.onclick = () => { results.innerHTML = ''; switchMode('stats'); };
    results.appendChild(backBtn);
  });
}

/* STATS */
function renderStats() {
  const c = el('statsContent');
  if(!c) return;
  const s = state.stats;
  const p = el('panel-stats');
  const placeholder = p?.querySelector('.stats-placeholder');
  if(placeholder) placeholder.style.display = s.solved ? 'none' : 'block';

  if(!s.solved) { c.innerHTML = ''; return; }

  const rate = Math.round(s.correct / s.solved * 100);

  // Badge display
  let badgesHTML = '';
  BADGES.forEach(b => {
    const unlocked = s.badges.includes(b.id);
    badgesHTML += `<div class="stat-item" style="${unlocked?'':'opacity:0.4'}">
      <span class="stat-label">${b.label}</span>
      <span class="stat-value" style="font-size:0.75rem;font-weight:400">${b.desc}</span>
    </div>`;
  });

  // Chapter bars
  let chBars = '';
  QB.chapters.forEach(ch => {
    const count = s.byChapter[ch.id] || 0;
    const total = ch.questions.length;
    const pct = total ? Math.round(count / total * 100) : 0;
    chBars += `<div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--gray-500);margin-bottom:2px">
        <span>${ch.title.replace(/Ch\.\w+\s*/,'')}</span>
        <span>${count}/${total}</span>
      </div>
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--blue),#1a7f37)"></div></div>
    </div>`;
  });

  // Level bars
  const levels = { debutant:'Débutant', intermediaire:'Intermédiaire', avance:'Avancé' };
  let levelBars = '';
  Object.entries(levels).forEach(([k, v]) => {
    const count = s.byLevel[k] || 0;
    const pct = s.solved ? Math.round(count / s.solved * 100) : 0;
    levelBars += `<div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--gray-500)">
        <span>${v}</span><span>${count}</span>
      </div>
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
  });

  c.innerHTML = `
    <div class="stats-grid">
      <div class="stat-item"><span class="stat-label">Questions résolues</span><span class="stat-value">${s.solved}</span></div>
      <div class="stat-item"><span class="stat-label">Taux de réussite</span><span class="stat-value">${rate}%</span></div>
      <div class="stat-item"><span class="stat-label">Meilleure série</span><span class="stat-value">${s.maxStreak}j</span></div>
      <div class="stat-item"><span class="stat-label">Badges</span><span class="stat-value">${s.badges.length}/${BADGES.length}</span></div>
    </div>
    <div style="margin:16px 0"><h4 style="font-size:0.9rem;margin-bottom:10px;color:var(--gray-700)">Badges</h4><div class="stats-grid">${badgesHTML}</div></div>
    <div style="margin:16px 0"><h4 style="font-size:0.9rem;margin-bottom:10px;color:var(--gray-700)">Progression par chapitre</h4>${chBars}</div>
    <div style="margin:16px 0"><h4 style="font-size:0.9rem;margin-bottom:10px;color:var(--gray-700)">Répartition par niveau</h4>${levelBars}</div>
  `;
}

function renderWeakPoints() {
  const c = el('weakContent');
  if(!c) return;
  const p = el('panel-weak');
  const placeholder = p?.querySelector('.stats-placeholder');
  if(placeholder) placeholder.style.display = state.stats.solved ? 'none' : 'block';

  if(!state.stats.solved) { c.innerHTML = ''; return; }

  const weak = [];
  QB.chapters.forEach(ch => {
    const total = ch.questions.length;
    const solved = Object.keys(state.userAnswers).filter(id => id.startsWith(ch.id)).length;
    const correct = Object.entries(state.userAnswers).filter(([id, ans]) => id.startsWith(ch.id) && ans.correct).length;
    const rate = solved ? Math.round(correct / solved * 100) : 0;
    if(rate < 60 && solved > 0) weak.push({ id: ch.id, label: ch.title.replace(/Ch\.\w+\s*/,''), rate, solved, correct });
  });

  if(!weak.length) {
    c.innerHTML = '<div class="stats-placeholder">Aucun point faible détecté. Continuez ainsi.</div>';
    return;
  }

  c.innerHTML = '<h4 style="font-size:0.9rem;margin-bottom:10px;color:var(--gray-700)">Chapitres à réviser (moins de 60% de réussite)</h4>';
  weak.forEach(w => {
    const div = document.createElement('div');
    div.className = 'weak-chapter';
    div.innerHTML = `
      <h4>${w.label}</h4>
      <p style="font-size:0.85rem;color:var(--gray-500)">${w.correct}/${w.solved} correct (${w.rate}%)</p>
      <button class="exam-btn exam-btn-secondary weak-tag" data-chapter="${w.id}">Réviser ce chapitre</button>
    `;
    div.querySelector('.weak-tag')?.addEventListener('click', () => {
      state.filterChapter = w.id;
      el('filterChapter').value = w.id;
      switchMode('browse');
    });
    c.appendChild(div);
  });
}

/* EVENT BINDING */
function bindExamEvents() {
  // Tab clicks
  document.querySelectorAll('.exam-tab').forEach(tab => {
    tab.addEventListener('click', () => switchMode(tab.dataset.mode));
  });

  // Sidebar exam links
  document.querySelectorAll('.nav-subs a[data-mode]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const mode = a.dataset.mode;
      switchMode(mode);
      if(window.innerWidth <= 768) document.querySelector('.sidebar')?.classList.remove('open');
    });
  });

  // Filters
  ['filterChapter', 'filterLevel', 'filterType', 'filterStatus'].forEach(id => {
    const sel = el(id);
    if(sel) sel.addEventListener('change', () => {
      const key = id.replace('filter', '').toLowerCase();
      state['filter' + key.charAt(0).toUpperCase() + key.slice(1)] = sel.value;
      renderBrowseQuestions(getFilteredQuestions());
    });
  });

  // Shuffle
  el('shuffleBtn')?.addEventListener('click', () => {
    const qs = getFilteredQuestions();
    qs.sort(() => Math.random() - 0.5);
    renderBrowseQuestions(qs);
  });

  // Exam controls
  el('startExamBtn')?.addEventListener('click', startExam);
  el('endExamBtn')?.addEventListener('click', () => {
    if(confirm('Voulez-vous vraiment terminer l\'examen ?')) submitExam(false);
  });
  el('submitExamBtn')?.addEventListener('click', () => {
    if(confirm('Soumettre l\'examen ?')) submitExam(false);
  });
  el('prevExamBtn')?.addEventListener('click', () => navigateExam(-1));
  el('nextExamBtn')?.addEventListener('click', () => navigateExam(1));

  // Keyboard in exam
  document.addEventListener('keydown', e => {
    if(state.currentMode !== 'exam') return;
    if(e.key === 'ArrowLeft') navigateExam(-1);
    if(e.key === 'ArrowRight') navigateExam(1);
  });

  // AI Settings
  initAISettings();
}

// Store answers from exam mode
const origUA = state.userAnswers;
state.userAnswers = origUA;

initExam();

});

