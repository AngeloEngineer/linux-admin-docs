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
if(saved==='dark'){document.body.classList.add('dark');if(themeBtn)themeBtn.textContent='\u2600\uFE0F'}
if(themeBtn)themeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  const d=document.body.classList.contains('dark');
  themeBtn.textContent=d?'\u2600\uFE0F':'\uD83C\uDF19';
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
