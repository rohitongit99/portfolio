<script>
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 5) + 'px';
    cursor.style.top = (my - 5) + 'px';
  });
  (function animateRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = (rx - 17) + 'px'; ring.style.top = (ry - 17) + 'px';
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; ring.style.opacity = '0.5'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.opacity = '1'; });
  });

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), 80); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Nav active link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 220) current = s.id; });
    navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : ''; });
  });
</script>

<script>
(function(){
  var cards=[].slice.call(document.querySelectorAll('.cert-card')),cur=0,m=document.getElementById('cert-modal');
  function show(i){cur=(i+cards.length)%cards.length;var c=cards[cur],d=c.dataset;
    document.getElementById('cm-img').src=c.querySelector('img').src;
    ['title','org','date','badge','where','how','skills'].forEach(function(k){document.getElementById('cm-'+k).textContent=d[k]});
    document.getElementById('cm-counter').textContent=(cur+1)+' / '+cards.length}
  window.openModal=function(i){show(i);m.classList.add('open');document.body.style.overflow='hidden'};
  window.closeModal=function(){m.classList.remove('open');document.body.style.overflow=''};
  window.prevCert=function(){show(cur-1)};window.nextCert=function(){show(cur+1)};
  m.addEventListener('click',function(e){if(e.target===m)closeModal()});
  document.addEventListener('keydown',function(e){if(!m.classList.contains('open'))return;
    if(e.key==='Escape')closeModal();if(e.key==='ArrowLeft')prevCert();if(e.key==='ArrowRight')nextCert()});
  var sx=0;m.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  m.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>60)(dx<0?nextCert:prevCert)()});
  window.openShot=function(s){document.getElementById('shot-img').src=s;document.getElementById('shot-box').style.display='flex'};
  // filters
  document.getElementById('filters').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    [].forEach.call(this.children,function(x){x.classList.toggle('active',x===b)});var f=b.dataset.f;
    document.querySelectorAll('.project-card').forEach(function(c){c.classList.toggle('hide',f!=='all'&&(c.dataset.cat||'').split(' ').indexOf(f)<0)})});
  // tilt
  if(matchMedia('(hover:hover)').matches)document.querySelectorAll('.project-card').forEach(function(c){
    c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      c.style.transform='perspective(900px) rotateY('+x*4+'deg) rotateX('+-y*4+'deg) translateY(-3px)'});
    c.addEventListener('mouseleave',function(){c.style.transform=''})});
  // progress + counters
  var pb=document.getElementById('progress');
  addEventListener('scroll',function(){pb.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%'},{passive:true});
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);
    var el=e.target,t=parseInt(el.textContent);if(isNaN(t))return;var s=el.textContent.replace(/[0-9]/g,''),n=0;
    var id=setInterval(function(){n++;el.textContent=n+s;if(n>=t)clearInterval(id)},90)})},{threshold:.6});
  document.querySelectorAll('.stat-box .num').forEach(function(n){co.observe(n)});
  // video
  window.playVideo=function(b){var w=b.parentNode;b.remove();
    var v=document.createElement('video');v.src='video.mp4';v.controls=true;v.autoplay=true;v.playsInline=true;
    v.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000';
    v.onerror=function(){v.remove();var f=document.createElement('iframe');
      f.src='https://drive.google.com/file/d/1WxkW_VUEnQEdwDFHTxMtJSd31xAq4T6Z/preview';f.allow='autoplay; fullscreen';f.allowFullscreen=true;w.appendChild(f)};
    w.appendChild(v)};
})();
</script>
