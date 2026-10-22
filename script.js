/* Allora Studio · link na bio */

// WhatsApp que recebe as mensagens: 55 + DDD + número, só números
var WHATSAPP = '5545988098743';

// Monta os links do WhatsApp com a mensagem pronta de cada botão
document.querySelectorAll('[data-wa]').forEach(function (link) {
  link.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(link.getAttribute('data-wa'));
  link.target = '_blank';
  link.rel = 'noopener';
});

// Prévia dos posts: puxa a imagem direto do Instagram.
// (Se você colocar uma capa em assets/posts/post-N.jpg, ela aparece por cima.)
document.querySelectorAll('.post').forEach(function (card) {
  var codigo = (card.getAttribute('href').match(/\/p\/([^/?#]+)/) || [])[1];
  if (codigo) {
    var quadro = document.createElement('iframe');
    quadro.src = 'https://www.instagram.com/p/' + codigo + '/embed/';
    quadro.title = 'Prévia do post no Instagram';
    quadro.loading = 'lazy';
    quadro.setAttribute('scrolling', 'no');
    quadro.setAttribute('tabindex', '-1');
    quadro.setAttribute('aria-hidden', 'true');
    card.appendChild(quadro);
  }

  var img = card.querySelector('img');
  if (img) {
    var tirar = function () { img.remove(); };
    if (img.complete && img.naturalWidth === 0) tirar();
    img.addEventListener('error', tirar);
  }
});

// Ajusta o tamanho da prévia ao tamanho do card
function ajustarPrevias() {
  document.querySelectorAll('.post').forEach(function (card) {
    if (card.offsetWidth) card.style.setProperty('--escala', card.offsetWidth / 326);
  });
}
window.addEventListener('resize', ajustarPrevias);

// Mostra uma tela por vez, de acordo com o #endereço
document.documentElement.classList.add('js');
var telas = document.querySelectorAll('.screen');
function mostrarTela() {
  var id = (location.hash || '#inicio').slice(1);
  var alvo = document.getElementById(id);
  if (!alvo || !alvo.classList.contains('screen')) alvo = document.getElementById('inicio');
  telas.forEach(function (t) { t.classList.toggle('ativa', t === alvo); });
  window.scrollTo(0, 0);
  ajustarPrevias();
}
window.addEventListener('hashchange', mostrarTela);
mostrarTela();
