
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('.filter').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.work-card').forEach(card=>{card.style.display=(f==='all'||card.dataset.category===f)?'block':'none';});});});
const portfolioImages = document.querySelectorAll('.portfolio img');

portfolioImages.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = `<img src="${img.src}" alt="Design"><span>&times;</span>`;
    document.body.appendChild(box);

    box.addEventListener('click', () => box.remove());
  });
});
