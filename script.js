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
