(function () {
  var reduces = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 滚动入场 ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window) || reduces) {
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 页头吸顶 ---------- */
  var head = document.getElementById('masthead');

  /* ---------- 阅读进度 ---------- */
  var bar = document.getElementById('progress');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (head) head.classList.toggle('is-stuck', y > 8);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, Math.max(0, y / h)) : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- 随便翻一页 ---------- */
  var btn = document.getElementById('shuffleBtn');
  var dataEl = document.getElementById('post-index');
  var posts = [];

  if (dataEl) {
    try { posts = JSON.parse(dataEl.textContent); } catch (e) { posts = []; }
  }

  if (btn) {
    var label = btn.querySelector('.btn-label');
    var rolling = false;

    btn.addEventListener('click', function () {
      if (rolling || !posts.length) return;
      rolling = true;
      btn.classList.add('is-rolling');

      var target = posts[Math.floor(Math.random() * posts.length)];
      var ticks = 0;
      var total = reduces ? 0 : 14;

      var timer = setInterval(function () {
        var pick = posts[Math.floor(Math.random() * posts.length)];
        if (label) label.textContent = pick.title.slice(0, 12) + '…';
        ticks++;
        if (ticks >= total) {
          clearInterval(timer);
          if (label) label.textContent = target.title.slice(0, 12) + '…';
          setTimeout(function () {
            window.location.href = target.url;
          }, reduces ? 0 : 260);
        }
      }, 55);
    });
  }

  /* ---------- 盖章 ---------- */
  var sealBtn = document.getElementById('sealBtn');
  var sealHit = document.getElementById('sealHit');

  if (sealBtn && sealHit) {
    sealBtn.addEventListener('click', function () {
      var seed = (Math.random() * 22 - 11).toFixed(1);
      sealHit.style.setProperty('--seed', seed + 'deg');
      sealHit.classList.remove('is-drop');
      void sealHit.offsetWidth;
      sealHit.classList.add('is-drop');
      sealBtn.classList.add('is-sealed');
    });
  }
})();
