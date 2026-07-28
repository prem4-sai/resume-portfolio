/* ============================= PRELOADER ============================= */
window.addEventListener('load',()=>{
  setTimeout(()=>{document.getElementById('preloader').classList.add('hide');},900);
});

/* ============================= CURSOR GLOW ============================= */
const glow=document.getElementById('cursor-glow');
if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove',e=>{
    glow.style.transform=`translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
} else { glow.style.display='none'; }

/* ============================= PARTICLE CANVAS (hero) ============================= */
const canvas=document.getElementById('particle-canvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resizeCanvas(){
  const hero=document.querySelector('.hero');
  canvas.width=window.innerWidth;
  canvas.height=hero.offsetHeight;
}
function initParticles(){
  particles=[];
  const count=Math.min(70, Math.floor(window.innerWidth/22));
  for(let i=0;i<count;i++){
    particles.push({
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      r:Math.random()*1.6+.4, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25,
      hue: Math.random()>.5?'139,92,246':'59,130,246'
    });
  }
}
function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const p of particles){
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r*2,0,Math.PI*2);
    ctx.fillStyle=`rgba(${p.hue},.7)`;
    ctx.fill();
  }
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i], b=particles[j];
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<120){
        ctx.beginPath();
        ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(139,92,246,${(1-d/120)*.15})`;
        ctx.lineWidth=1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
resizeCanvas(); initParticles(); drawParticles();
window.addEventListener('resize',()=>{resizeCanvas(); initParticles();});

/* ============================= HEADER SCROLL STATE ============================= */
const header=document.getElementById('site-header');
const backToTop=document.getElementById('back-to-top');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled', window.scrollY>30);
  backToTop.classList.toggle('show', window.scrollY>500);
},{passive:true});
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ============================= MOBILE NAV ============================= */
const hamburger=document.getElementById('hamburger');
const mobileNav=document.getElementById('mobile-nav');
const mnClose=document.getElementById('mn-close');
const overlay=document.getElementById('mobile-overlay');
function openMobile(){mobileNav.classList.add('open'); overlay.classList.add('open');}
function closeMobile(){mobileNav.classList.remove('open'); overlay.classList.remove('open');}
hamburger.addEventListener('click',openMobile);
mnClose.addEventListener('click',closeMobile);
overlay.addEventListener('click',closeMobile);
document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',closeMobile));

/* ============================= THEME TOGGLE ============================= */
const themeToggle=document.getElementById('theme-toggle');
const root=document.documentElement;
themeToggle.addEventListener('click',()=>{
  const isLight=root.getAttribute('data-theme')==='light';
  root.setAttribute('data-theme', isLight?'dark':'light');
  themeToggle.innerHTML = isLight? '<i class="fa-solid fa-moon"></i>':'<i class="fa-solid fa-sun"></i>';
});

/* ============================= SCROLLSPY ============================= */
const navLinks=document.querySelectorAll('#main-nav a');
const sections=[...navLinks].map(l=>document.querySelector(l.getAttribute('href')));
window.addEventListener('scroll',()=>{
  let idx=sections.length-1;
  const y=window.scrollY+120;
  for(let i=0;i<sections.length;i++){
    if(sections[i] && sections[i].offsetTop<=y) idx=i;
  }
  navLinks.forEach(l=>l.classList.remove('active'));
  navLinks[idx].classList.add('active');
},{passive:true});

/* ============================= TYPED ROLE TEXT ============================= */
const roles=["Data Analyst & ML Enthusiast","Python & SQL Developer","Cloud & Analytics Explorer"];
const typedEl=document.getElementById('typed');
let rIdx=0, cIdx=0, deleting=false;
function typeLoop(){
  const current=roles[rIdx];
  if(!deleting){
    cIdx++;
    typedEl.textContent=current.slice(0,cIdx);
    if(cIdx===current.length){deleting=true; setTimeout(typeLoop,1600); return;}
  } else {
    cIdx--;
    typedEl.textContent=current.slice(0,cIdx);
    if(cIdx===0){deleting=false; rIdx=(rIdx+1)%roles.length;}
  }
  setTimeout(typeLoop, deleting?35:65);
}
typeLoop();

/* ============================= SCROLL REVEAL ============================= */
const revealEls=document.querySelectorAll('.reveal, .reveal-scale');
const io=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{threshold:.15});
revealEls.forEach(el=>io.observe(el));

/* ============================= SKILL BARS ============================= */
const skillFills=document.querySelectorAll('.skill-fill');
const skillIO=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.width=entry.target.dataset.w+'%';
      skillIO.unobserve(entry.target);
    }
  });
},{threshold:.4});
skillFills.forEach(el=>skillIO.observe(el));

/* ============================= STAT COUNTERS ============================= */
const counters=document.querySelectorAll('.stat-num');
const counterIO=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const target=+entry.target.dataset.count;
      let cur=0;
      const step=Math.max(1,Math.ceil(target/40));
      const t=setInterval(()=>{
        cur+=step;
        if(cur>=target){cur=target; clearInterval(t);}
        entry.target.textContent=cur+'+';
      },35);
      counterIO.unobserve(entry.target);
    }
  });
},{threshold:.5});
counters.forEach(el=>counterIO.observe(el));

/* ============================= TIMELINE LINE ============================= */
const timelineLine=document.getElementById('timeline-line');
const tlIO=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ timelineLine.classList.add('in'); tlIO.unobserve(entry.target);} });
},{threshold:.3});
tlIO.observe(document.getElementById('timeline'));

/* ============================= PROJECTS CAROUSEL BUTTONS ============================= */
const track=document.getElementById('projects-track');
document.getElementById('proj-next').addEventListener('click',()=>track.scrollBy({left:324,behavior:'smooth'}));
document.getElementById('proj-prev').addEventListener('click',()=>track.scrollBy({left:-324,behavior:'smooth'}));

/* ============================= PROJECT CARD TILT ============================= */
document.querySelectorAll('.proj-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-10px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
  });
  card.addEventListener('mouseleave',()=>{card.style.transform='';});
});

/* ============================= TESTIMONIAL CAROUSEL ============================= */
const testimonials=[
  {text:"Prem is a quick learner and possesses excellent analytical skills. He was proactive in every task and delivered high-quality work during the internship.",name:"Aravind K",role:"Team Lead, ApexPlanet Software",initial:"A"},
  {text:"A dedicated and curious engineer — his dashboards turned messy spreadsheets into insights our whole team could act on immediately.",name:"Divya R",role:"Mentor, Soft Nexis Technology",initial:"D"},
  {text:"Premsai brings both technical depth and genuine curiosity to every problem he tackles. A pleasure to collaborate with.",name:"Karthik S",role:"Hackathon Teammate, SIH",initial:"K"}
];
let tIdx=0;
const testiText=document.getElementById('testi-text');
const testiName=document.getElementById('testi-name');
const testiRole=document.getElementById('testi-role');
const testiAvatar=document.getElementById('testi-avatar');
const dotsWrap=document.getElementById('testi-dots');
testimonials.forEach((_,i)=>{
  const d=document.createElement('span');
  if(i===0) d.classList.add('active');
  d.addEventListener('click',()=>showTesti(i));
  dotsWrap.appendChild(d);
});
function showTesti(i){
  tIdx=i;
  const t=testimonials[i];
  testiText.style.opacity=0;
  setTimeout(()=>{
    testiText.textContent=t.text; testiName.textContent=t.name; testiRole.textContent=t.role; testiAvatar.textContent=t.initial;
    testiText.style.opacity=1;
  },250);
  [...dotsWrap.children].forEach((d,di)=>d.classList.toggle('active', di===i));
}
testiText.style.transition='opacity .25s ease';
setInterval(()=>showTesti((tIdx+1)%testimonials.length), 5500);

/* ============================= CONTACT FORM ============================= */
const form=document.getElementById('contact-form');
const formMsg=document.getElementById('form-msg');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const btn=form.querySelector('button[type="submit"]');
  const originalHTML=btn.innerHTML;
  btn.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
  btn.style.pointerEvents='none';
  setTimeout(()=>{
    btn.innerHTML=originalHTML;
    btn.style.pointerEvents='auto';
    formMsg.textContent='Message sent! I will get back to you soon.';
    formMsg.classList.add('ok');
    form.reset();
    setTimeout(()=>{formMsg.textContent=''; formMsg.classList.remove('ok');},4000);
  },1100);
});

/* ============================= DOWNLOAD CV (placeholder) ============================= */
[document.getElementById('download-cv'), document.getElementById('download-cv-2')].forEach(btn=>{
  btn.addEventListener('click',e=>{
    e.preventDefault();
    formMsgFallbackAlert();
  });
});
function formMsgFallbackAlert(){
  alert('Add your resume file and link it here (e.g. href="resume.pdf" download) to enable this button.');
}

/* ============================= SMOOTH ANCHOR SCROLL OFFSET ============================= */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const id=this.getAttribute('href');
    if(id.length>1 && document.querySelector(id)){
      e.preventDefault();
      const target=document.querySelector(id);
      const y=target.getBoundingClientRect().top+window.pageYOffset-70;
      window.scrollTo({top:y,behavior:'smooth'});
    }
  });
});
