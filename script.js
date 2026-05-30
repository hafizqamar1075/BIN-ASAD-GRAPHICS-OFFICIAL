const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),450));

const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const sections=[...document.querySelectorAll('main section')];
const navLinks=[...document.querySelectorAll('nav a')];
window.addEventListener('scroll',()=>{
  let current='home';
  sections.forEach(section=>{if(scrollY>=section.offsetTop-140) current=section.id});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
});

const words=['That Boost Your Business','Professional Graphics Designer','Modern Web Developer','Social Media Post Expert'];
let wi=0,ci=0,deleting=false;
const typing=document.getElementById('typingText');
function type(){
  const word=words[wi];
  typing.textContent=word.slice(0,ci);
  if(!deleting && ci<word.length) ci++; else if(deleting && ci>0) ci--; else {deleting=!deleting;if(!deleting) wi=(wi+1)%words.length;}
  setTimeout(type,deleting?45:90);
}
type();

document.querySelectorAll('.filter').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.work-card').forEach(card=>{const cats=card.dataset.category.split(' ');card.style.display=(f==='all'||cats.includes(f))?'block':'none';});document.querySelectorAll('.portfolio-title').forEach(title=>{title.style.display=(f==='all')?'block':'none';});});});

const reviewGrid=document.getElementById('reviewGrid');
const reviewForm=document.getElementById('reviewForm');
const waReview=document.getElementById('waReview');
function stars(n){return '★★★★★'.slice(0,n)+'☆☆☆☆☆'.slice(0,5-n)}
function addReview(name,rating,text,save=true){
  const card=document.createElement('div');
  card.className='review-card show';
  card.innerHTML=`<div class="stars">${stars(Number(rating))}</div><h3>${escapeHtml(name)}</h3><p>${escapeHtml(text)}</p>`;
  reviewGrid.appendChild(card);
  if(save){
    const reviews=JSON.parse(localStorage.getItem('bagcReviews')||'[]');
    reviews.push({name,rating,text});
    localStorage.setItem('bagcReviews',JSON.stringify(reviews));
  }
}
function escapeHtml(str){return str.replace(/[&<>'"]/g,t=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[t]))}
JSON.parse(localStorage.getItem('bagcReviews')||'[]').forEach(r=>addReview(r.name,r.rating,r.text,false));
reviewForm.addEventListener('input',()=>{
  const name=document.getElementById('reviewName').value.trim();
  const rating=document.getElementById('reviewStars').value;
  const text=document.getElementById('reviewText').value.trim();
  const msg=`Assalam o Alaikum, I want to give a review for Bin Asad Graphics Center.%0AName: ${encodeURIComponent(name)}%0ARating: ${rating} Stars%0AReview: ${encodeURIComponent(text)}`;
  waReview.href='https://wa.me/923259137481?text='+msg;
});
reviewForm.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('reviewName').value.trim();
  const rating=document.getElementById('reviewStars').value;
  const text=document.getElementById('reviewText').value.trim();
  if(!name||!text)return;
  addReview(name,rating,text,true);
  reviewForm.reset();
  alert('Thank you! Your review has been added.');
});

const backTop=document.getElementById('backTop');
window.addEventListener('scroll',()=>backTop.classList.toggle('show',scrollY>650));
backTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));


// Portfolio full screen image preview / lightbox
const workCards = [...document.querySelectorAll('.work-card')];
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentWorkIndex = 0;

function visibleWorkCards(){
  return workCards.filter(card => card.style.display !== 'none');
}

function openLightbox(index){
  const cards = visibleWorkCards();
  if(!cards.length) return;
  currentWorkIndex = Math.max(0, Math.min(index, cards.length - 1));
  const card = cards[currentWorkIndex];
  const img = card.querySelector('img');
  const title = card.querySelector('.work-info strong')?.textContent || 'Portfolio Design';
  const type = card.querySelector('.work-info span')?.textContent || '';
  lightboxImg.src = img.getAttribute('src');
  lightboxImg.alt = img.getAttribute('alt') || title;
  lightboxCaption.textContent = type ? `${title} — ${type}` : title;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
}

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('no-scroll');
  setTimeout(()=>{ lightboxImg.src=''; }, 200);
}

function changeLightbox(step){
  const cards = visibleWorkCards();
  if(!cards.length) return;
  currentWorkIndex = (currentWorkIndex + step + cards.length) % cards.length;
  openLightbox(currentWorkIndex);
}

workCards.forEach((card)=>{
  card.setAttribute('tabindex','0');
  card.setAttribute('role','button');
  card.setAttribute('aria-label','Open design preview');
  card.addEventListener('click',()=>{
    const cards = visibleWorkCards();
    openLightbox(cards.indexOf(card));
  });
  card.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      const cards = visibleWorkCards();
      openLightbox(cards.indexOf(card));
    }
  });
});

if(lightbox){
  lightboxClose.addEventListener('click',closeLightbox);
  lightboxPrev.addEventListener('click',()=>changeLightbox(-1));
  lightboxNext.addEventListener('click',()=>changeLightbox(1));
  lightbox.addEventListener('click',(e)=>{ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown',(e)=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') changeLightbox(-1);
    if(e.key === 'ArrowRight') changeLightbox(1);
  });
}
