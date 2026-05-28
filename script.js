const totalDesigns = 56;
const categories = [
  {name:'Branding', slug:'branding'},
  {name:'Posters', slug:'poster'},
  {name:'Flex Posters', slug:'flex'},
  {name:'Logo / Social', slug:'logo'}
];
const gallery = document.getElementById('gallery');
for (let i = 1; i <= totalDesigns; i++) {
  const cat = categories[(i - 1) % categories.length];
  const num = String(i).padStart(2, '0');
  const card = document.createElement('article');
  card.className = 'portfolio-card';
  card.dataset.category = cat.slug;
  card.innerHTML = `
    <img src="assets/design-${num}.jpg" alt="Bin Asad Graphics portfolio sample ${num}" loading="lazy">
    <div class="portfolio-info"><strong>${cat.name}</strong><span>Sample ${num}</span></div>
  `;
  card.addEventListener('click', () => openLightbox(`assets/design-${num}.jpg`));
  gallery.appendChild(card);
}

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
function openLightbox(src){ lightboxImg.src = src; lightbox.classList.add('active'); }
document.getElementById('closeLightbox').addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => { if(e.target === lightbox) lightbox.classList.remove('active'); });
