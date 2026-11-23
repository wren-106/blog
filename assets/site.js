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

  /* ---------- 导航墨线：跟着指针滑，走了回原位 ---------- */
  var nav = document.getElementById('nav');
  var ink = document.getElementById('navInk');

  if (nav && ink) {
    var navLinks = [].slice.call(nav.querySelectorAll('.nav-link'));
    var navActive = nav.querySelector('.nav-link.is-active');
    var inkTimer = null;

    function inkTo(link) {
      if (!link) {
        ink.style.opacity = '0';
        return;
      }
      var r = link.getBoundingClientRect();
      var n = nav.getBoundingClientRect();
      if (!r.width) return;
      ink.style.opacity = '1';
      ink.style.width = r.width + 'px';
      ink.style.transform = 'translateX(' + (r.left - n.left) + 'px)';
      var tint = getComputedStyle(link).getPropertyValue('--tint').trim();
      ink.style.backgroundColor = tint || '';
    }

    navLinks.forEach(function (link) {
      link.addEventListener('mouseenter', function () { inkTo(link); });
      link.addEventListener('focus', function () { inkTo(link); });
    });

    // 指针离开导航：等一小会儿再回到当前栏目
    nav.addEventListener('mouseleave', function () {
      inkTimer = setTimeout(function () { inkTo(navActive); }, 140);
    });
    nav.addEventListener('mouseenter', function () {
      clearTimeout(inkTimer);
    });

    // 悬停时那一下轻微的下压感
    navLinks.forEach(function (link) {
      link.addEventListener('pointerdown', function () { link.classList.add('is-press'); });
      link.addEventListener('pointerup', function () { link.classList.remove('is-press'); });
      link.addEventListener('pointerleave', function () { link.classList.remove('is-press'); });
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { setTimeout(function () { inkTo(navActive); }, 60); });
    } else {
      setTimeout(function () { inkTo(navActive); }, 200);
    }

    window.addEventListener('resize', function () { inkTo(navActive); });
  }

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
