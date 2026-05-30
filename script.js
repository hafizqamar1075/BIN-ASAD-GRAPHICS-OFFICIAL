document.querySelectorAll('#portfolio img, .portfolio img, .work-card img, .portfolio-card img').forEach(img => {
  img.style.cursor = 'pointer';

  img.onclick = function () {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="close">&times;</span>
      <img src="${this.src}" alt="Portfolio Design">
    `;
    document.body.appendChild(lightbox);

    lightbox.onclick = function () {
      lightbox.remove();
    };
  };
});
