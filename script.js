const portfolioItems = Array.from({length: 36}, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  const cats = ['branding','posters','flex','social'];
  const labels = ['Branding','Posters','Flex Posters','Logo / Social'];
  const idx = i % cats.length;
  return { img: `assets/portfolio/work-${n}.jpg`, cat: cats[idx], label: labels[idx], title: `Sample Design ${n}` };
});

const grid = document.getElementById('portfolioGrid');
function renderPortfolio(filter='all'){
  grid.innerHTML = portfolioItems
    .filter(item => filter === 'all' || item.cat === filter)
    .map(item => `
      <article class="portfolio-card reveal">
        <img src="${item.img}" alt="Bin Asad Graphics ${item.title}" loading="lazy">
        <div class="portfolio-info"><h3>${item.label}</h3><span>${item.title}</span></div>
      </article>
    `).join('');
  observeReveal();
}
renderPortfolio();

document.querySelectorAll('.filter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.dataset.filter);
  });
});

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click',()=>navMenu.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>navMenu.classList.remove('open')));

let observer;
function observeReveal(){
  if(observer) observer.disconnect();
  observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('show'); });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
observeReveal();
