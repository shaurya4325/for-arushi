/* the kiss booth, the reel of us, and the flirt arcade ♡ */
(() => {
  'use strict';
  const L = window.LOVE;
  if (!L) return;
  const { $, $$, rand, pick, sleep, reduced, fine, store, log, toast, burst, confetti, heartsConf, cannons, at, plural, buzz } = L;

  // ---------------- little sounds: web audio, so a kiss can play over alfaaz on her phone ----------------
  const SFX = {};
  let actx = null;
  function sfxInit() {
    if (actx) { if (actx.state === 'suspended') actx.resume().catch(() => {}); return; }
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    actx = new C();
    const s = actx.createBufferSource();
    s.buffer = actx.createBuffer(1, 1, 22050);
    s.connect(actx.destination);
    s.start(0);
    ['kiss', 'kiss-back', 'smack'].forEach(n => fetch(`sfx/${n}.mp3`)
      .then(r => r.arrayBuffer())
      .then(b => new Promise((ok, no) => actx.decodeAudioData(b, ok, no)))
      .then(buf => { SFX[n] = buf; })
      .catch(() => {}));
  }
  addEventListener('pointerdown', sfxInit, { capture: true, passive: true });
  function sfx(name, rate = 1, vol = 1) {
    if (!actx || !SFX[name]) return;
    if (actx.state === 'suspended') actx.resume().catch(() => {});
    const s = actx.createBufferSource(), g = actx.createGain();
    s.buffer = SFX[name];
    s.playbackRate.value = rate;
    g.gain.value = vol;
    s.connect(g);
    g.connect(actx.destination);
    s.start();
  }

  // ---------------- us, frame by frame (stills from our snapchat videos) ----------------
  const REEL = [
    ['cheeks-a', 'cheek to cheek, heart to heart'],
    ['looking-at-her', 'the camera was right there. i was looking at you.'],
    ['pout', 'kissy face + heart crown = illegal'],
    ['tongue', 'my mastikhor 😛'],
    ['eyes-closed', 'eyes closed, still glowing'],
    ['cheeks-c', 'my favourite place: right next to you'],
    ['pout-b', 'she pouts, i melt'],
    ['he-looks', 'caught staring at you. again.'],
  ];
  const reel = $('#reel');
  REEL.forEach(([id, cap], i) => {
    const src = `img/us/s-${id}.webp`;
    const f = document.createElement('figure');
    f.className = 'reel-card';
    f.style.setProperty('--r', `${[-2, 1.5, -1, 2][i % 4]}deg`);
    f.tabIndex = 0;
    f.setAttribute('role', 'button');
    f.setAttribute('aria-label', `open photo: ${cap}`);
    f.innerHTML = `<img src="${src}" alt="arushi and shaurya: ${cap}" loading="lazy" draggable="false"><figcaption></figcaption>`;
    f.querySelector('figcaption').textContent = cap;
    f.addEventListener('click', () => L.lightbox(src));
    f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); L.lightbox(src); } });
    L.addPhoto(src, cap);
    reel.appendChild(f);
  });

  // ---------------- the kiss booth ----------------
  const kst = $('#kstage'), kHer = $('#kHer'), kHim = $('#kHim'), kAsk = $('#kAsk'), kYes = $('#kYes'), kNo = $('#kNo'), kAfter = $('#kAfter');
  const herSay = $('#kHerSay'), himSay = $('#kHimSay'), mwah = $('#kMwah'), flash = $('#kFlash');
  kst.appendChild(himSay); // his bubble stays at the stage edge while he walks in
  const KLINES = [
    "if kisses were stars, i'd give you the whole night sky. that was star number one 🌙",
    "of all the cheeks in all the world, i'd walk into yours. every single time.",
    "careful. if you smile like that again, i'm going to need another one 😚",
    "you're the poem i never knew how to write, so i just keep kissing the page.",
    'okay, that one counted double. birthday rules 🎂',
    "i'd choose you in every lifetime. and kiss you in all of them.",
    "you're blushing. don't deny it. the camera saw everything 📸",
  ];
  const BACK = ["she kissed me back?? i'm not okay 🫠", 'illegal. extremely illegal. do it again 😳', 'i forgot my own name 😵‍💫', 'okay now I\'m the one blushing 🙈', 'best birthday ever and it\'s not even mine 🥹'];
  const NO = ['no', 'are you sure?', 'really sure?? 🥺', 'think again', 'wrong button, babe', 'error 404: no not found', 'nice try 😌', 'nope, not today', "okay i'm hiding now"];
  let kissN = 0, backN = 0, busy = false, noTries = 0, lastDodge = 0;

  function say(el, text, ms = 1600) {
    el.textContent = text;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(el._t);
    if (ms) el._t = setTimeout(() => el.classList.remove('show'), ms);
  }
  function retrigger(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  // the "no" button runs away from her finger. the "yes" button grows.
  function dodge(e) {
    if (e) e.preventDefault();
    if (kNo.disabled) return;
    noTries++;
    log('kiss_no', '', noTries, 15);
    buzz(12);
    if (noTries >= NO.length) {
      kNo.classList.add('gone');
      kNo.disabled = true;
      $('#kQ').textContent = 'the "no" button has left the chat 🏃 so… yes? 🥺';
      kYes.style.scale = '1.3';
      return;
    }
    kNo.textContent = NO[noTries];
    const grow = 1 + Math.min(noTries, 7) * .07;
    kYes.style.scale = grow.toFixed(2);
    // never land on top of "yes" (at its grown size): she must always be able to say yes
    const yw = kYes.offsetWidth * grow, yh = kYes.offsetHeight * grow;
    const ycx = kYes.offsetLeft + kYes.offsetWidth / 2, ycy = kYes.offsetTop + kYes.offsetHeight / 2;
    const yes = { l: ycx - yw / 2 - 12, t: ycy - yh / 2 - 12, r: ycx + yw / 2 + 12, b: ycy + yh / 2 + 12 };
    const bw = kNo.offsetWidth, bh = kNo.offsetHeight, x0 = kNo.offsetLeft, y0 = kNo.offsetTop;
    const W = kAsk.clientWidth, H = kAsk.clientHeight, top = $('#kQ').offsetTop + $('#kQ').offsetHeight + 4;
    let x = 0, y = 0;
    for (let i = 0; i < 40; i++) {
      const nx = rand(6, W - bw - 6), ny = rand(top, Math.max(top, H - bh - 4));
      const hitsYes = nx < yes.r && nx + bw > yes.l && ny < yes.b && ny + bh > yes.t;
      const far = Math.hypot(nx - x0 - parseFloat(kNo.dataset.x || 0), ny - y0 - parseFloat(kNo.dataset.y || 0)) > 60;
      x = nx - x0; y = ny - y0;
      if (!hitsYes && far) break;
    }
    kNo.dataset.x = x; kNo.dataset.y = y;
    kNo.style.translate = `${x.toFixed(0)}px ${y.toFixed(0)}px`;
    say(herSay, pick(['hehe 🤭', 'why is it running 😭', '🙈', 'just say yes 🥺']), 1300);
  }
  kNo.addEventListener('pointerdown', e => { lastDodge = Date.now(); dodge(e); });
  kNo.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { lastDodge = Date.now(); dodge(); } });
  kNo.addEventListener('click', e => { e.preventDefault(); if (Date.now() - lastDodge > 500) dodge(); });

  kYes.addEventListener('click', () => {
    if (busy) return;
    sfxInit();
    kAsk.classList.add('away');
    setTimeout(() => { kAsk.hidden = true; }, 420);
    walkIn(true);
  });

  const AWAY = 'translate(-95%, 4%) rotate(-6deg)';
  async function walkIn(first) {
    busy = true;
    kissN++;
    log('kiss_yes', '', kissN, 30);
    kst.classList.remove('kissed');
    const ease = 'ease-in-out';
    const kf = first ? [
      { transform: AWAY, easing: ease },
      { transform: 'translate(-70%, 0%) rotate(-4deg)', offset: .16, easing: ease },
      { transform: 'translate(-52%, 4%) rotate(-6deg)', offset: .3, easing: ease },
      { transform: 'translate(-34%, 0%) rotate(-4deg)', offset: .44, easing: ease },
      { transform: 'translate(-19%, 3%) rotate(-5deg)', offset: .58, easing: ease },
      { transform: 'translate(-10%, 1%) rotate(-3deg)', offset: .72 },
      { transform: 'translate(-10%, 1%) rotate(-3deg)', offset: .88, easing: 'cubic-bezier(.5,0,.8,.6)' },
      { transform: 'translate(0, 0) rotate(0deg)' },
    ] : [
      { transform: 'translate(0, 0) rotate(0deg)', easing: 'ease-out' },
      { transform: 'translate(-16%, 2%) rotate(-4deg)', offset: .42 },
      { transform: 'translate(-16%, 2%) rotate(-4deg)', offset: .6, easing: 'cubic-bezier(.5,0,.8,.6)' },
      { transform: 'translate(0, 0) rotate(0deg)' },
    ];
    if (first) {
      say(himSay, 'hiii birthday girl 😌', 1250);
      setTimeout(() => say(himSay, "she's so pretty 🥹", 1150), 1350);
      setTimeout(() => say(herSay, '🙈', 900), 2350);
    }
    const an = kHim.animate(kf, { duration: reduced ? 350 : first ? 3300 : 1250, fill: 'forwards' });
    await an.finished.catch(() => {});
    kHim.style.transform = 'translate(0, 0) rotate(0deg)';
    an.cancel();
    contact();
    await sleep(reduced ? 300 : 1000);
    kAfter.hidden = false;
    retrigger(kAfter, 'show');
    $('#kLine').textContent = KLINES[(kissN - 1) % KLINES.length];
    countLine();
    if (first) printSheet();
    busy = false;
  }
  function contact() {
    sfx('kiss', rand(.96, 1.06));
    buzz([25, 40, 70]);
    kst.classList.add('kissed');
    kHer.animate([{ transform: 'none' }, { transform: 'translate(1.2%, -.6%) rotate(1.6deg) scale(.99)' }, { transform: 'none' }], { duration: 650, easing: 'cubic-bezier(.3,1.5,.5,1)' });
    retrigger(mwah, 'pop');
    retrigger(flash, 'go');
    const r = kst.getBoundingClientRect(), x = r.left + r.width * .53, y = r.top + r.height * .68;
    heartsConf({ particleCount: 40, spread: 80, startVelocity: 26, ticks: 160, origin: { x: x / innerWidth, y: y / innerHeight } });
    burst(x, y, 10, 90);
  }
  function countLine() {
    $('#kCount').textContent = `birthday kisses so far: ${kissN} 💋${backN ? ` · kisses you gave back: ${backN} 😘` : ''}`;
  }
  $('#kAgain').addEventListener('click', () => { if (!busy) walkIn(false); });
  $('#kBack').addEventListener('click', async () => {
    if (busy) return;
    busy = true;
    backN++;
    log('kiss_back', '', backN, 30);
    kHer.animate([{ transform: 'none' }, { transform: 'translate(-2.5%, -.5%) rotate(-3deg)' }, { transform: 'none' }], { duration: 700, easing: 'ease-in-out' });
    await sleep(reduced ? 50 : 300);
    sfx('kiss-back', rand(1.04, 1.14));
    buzz(30);
    retrigger(kst, 'backed');
    kHim.animate([{ transform: 'none' }, { transform: 'translate(-3%, 1%) rotate(-4deg)' }, { transform: 'translate(1%, 0) rotate(2deg)' }, { transform: 'none' }], { duration: 800, easing: 'ease-out' });
    say(himSay, BACK[(backN - 1) % BACK.length], 2200);
    const r = kst.getBoundingClientRect();
    heartsConf({ particleCount: 30, spread: 70, startVelocity: 22, ticks: 150, origin: { x: (r.left + r.width * .36) / innerWidth, y: (r.top + r.height * .62) / innerHeight } });
    countLine();
    await sleep(700);
    busy = false;
  });
  // after the first kiss, poking either of us gets a reaction
  kst.addEventListener('click', e => {
    if (busy || !kissN) return;
    const r = kst.getBoundingClientRect();
    if ((e.clientX - r.left) / r.width < .45) {
      say(himSay, pick(['hey! 😳', 'that tickles', "ma'am pls 😮‍💨", 'one more kiss? 🥺']), 1400);
      kHim.animate([{ transform: 'none' }, { transform: 'rotate(-2deg)' }, { transform: 'rotate(1.5deg)' }, { transform: 'none' }], { duration: 450 });
    } else {
      say(herSay, pick(['hehe 🤭', 'stop it 🙈', 'again? 😚', 'he\'s so annoying (i love him)']), 1400);
      kHer.animate([{ transform: 'none' }, { transform: 'scale(1.015)' }, { transform: 'none' }], { duration: 400 });
    }
  });

  const BOOTH = [['booth-1', 'the kiss 💋'], ['booth-2', 'peace ✌️ + your hand on my face'], ['booth-3', 'the hug i still think about'], ['booth-4', 'never letting go']];
  function printSheet() {
    const sh = $('#sheet');
    if (!sh.hidden) return;
    sh.hidden = false;
    BOOTH.forEach(([id, cap], i) => {
      const src = `img/us/${id}.webp`;
      L.addPhoto(src, cap);
      const f = document.createElement('figure');
      f.className = 'sheet-shot';
      f.style.setProperty('--i', i);
      f.tabIndex = 0;
      f.setAttribute('role', 'button');
      f.setAttribute('aria-label', `open photobooth photo: ${cap}`);
      f.innerHTML = `<div class="stamp-photo"><img src="${src}" alt="photobooth: ${cap}" draggable="false"></div><figcaption></figcaption>`;
      f.querySelector('figcaption').textContent = cap;
      f.addEventListener('click', () => L.lightbox(src));
      f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); L.lightbox(src); } });
      $('#sheetGrid').appendChild(f);
    });
    requestAnimationFrame(() => sh.classList.add('print'));
  }

  // while she's in the booth or playing, the floating hearts step back so they don't get in the way
  const calm = new Set();
  const calmIO = new IntersectionObserver(es => {
    es.forEach(e => (e.isIntersecting ? calm.add(e.target) : calm.delete(e.target)));
    document.body.classList.toggle('calm', calm.size > 0);
  }, { threshold: .35 });
  [kst, document.querySelector('.gstage')].forEach(el => calmIO.observe(el));

  // ---------------- arcade tabs ----------------
  const gtabs = $$('.gpick [role=tab]');
  let curG = gtabs[0];
  const onShow = {};
  function selectGame(btn, focus) {
    if (btn === curG) return;
    gtabs.forEach(t => {
      const on = t === btn, panel = $(`#${t.getAttribute('aria-controls')}`);
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      panel.hidden = !on;
      if (on) retrigger(panel, 'enter');
    });
    if (curG.id === 'g-catch') stopCatch(true);
    curG = btn;
    if (focus) btn.focus();
    log('game', btn.textContent.trim());
    (onShow[btn.id] || (() => {}))();
  }
  gtabs.forEach(t => t.addEventListener('click', () => selectGame(t)));
  $('.gpick').addEventListener('keydown', e => {
    const i = gtabs.indexOf(curG);
    if (e.key === 'ArrowRight') selectGame(gtabs[(i + 1) % gtabs.length], true);
    else if (e.key === 'ArrowLeft') selectGame(gtabs[(i - 1 + gtabs.length) % gtabs.length], true);
  });

  // ---------------- 1. catch my kisses ----------------
  const cv = $('#catchCvs'), cx = cv.getContext('2d'), catchBox = $('#catch'), over = $('#catchOver');
  const faceHer = new Image(), faceHim = new Image();
  faceHer.src = 'img/us/face-her.webp';
  faceHim.src = 'img/us/face-him.webp';
  const KINDS = [
    { ch: '💋', w: .64, pts: 1 },
    { ch: '🌹', w: .12, pts: 2 },
    { ch: '💖', w: .06, pts: 5 },
    { ch: '💔', w: .18, pts: 0, bad: true },
  ];
  const sprite = {};
  KINDS.forEach(k => {
    const c = document.createElement('canvas');
    c.width = c.height = 96;
    const g = c.getContext('2d');
    g.font = '72px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(k.ch, 48, 54);
    sprite[k.ch] = c;
  });
  const BAD_SAYS = ["hey! that one wasn't from me 😤", 'who threw that?? not me 😤', 'nope, not mine 💔'];
  let CW = 0, CH = 0, running = false, items = [], floats = [], score = 0, lives = 3, tLeft = 30, px = 0, tx = 0, last = 0, spawnIn = 0, elapsed = 0, raf = 0, squash = 0, hx = 0;
  function sizeCatch() {
    const r = cv.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    CW = r.width; CH = r.height;
    cv.width = Math.round(CW * dpr);
    cv.height = Math.round(CH * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!px) px = tx = CW / 2;
    if (!running) drawCatch(performance.now());
  }
  addEventListener('resize', sizeCatch);
  faceHer.onload = faceHim.onload = () => sizeCatch();
  const hud = () => {
    $('#cScore').textContent = `${score} 💋`;
    $('#cTime').textContent = `${Math.ceil(tLeft)}s`;
    $('#cLives').textContent = '💗'.repeat(Math.max(0, lives)) + '🤍'.repeat(3 - Math.max(0, lives));
  };
  function startCatch() {
    sfxInit();
    sizeCatch();
    items = []; floats = []; score = 0; lives = 3; tLeft = 30; elapsed = 0; spawnIn = .4;
    px = tx = CW / 2;
    running = true;
    catchBox.classList.add('on');
    hud();
    floats.push({ x: CW / 2, y: CH / 2, t: 0, text: 'go! 💋', big: 1 });
    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(stepCatch);
  }
  function stopCatch(silent) {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    catchBox.classList.remove('on');
    if (silent) return;
    const best = Math.max(score, store.get('arushi-catch-best', 0));
    store.set('arushi-catch-best', best);
    log('catch_score', '', score);
    $('#coText').textContent = score < 8 ? `only ${score}? that's okay. i'll deliver the rest in person 😌`
      : score < 20 ? `${score} kisses caught! not bad at all, birthday girl 😘`
      : score < 35 ? `${score}?! okay kiss champion, i'm a little scared of you 🫣`
      : `${score}. you're a professional. i'm framing this 🏆`;
    $('#coBest').textContent = `your best: ${best} 💋`;
    $('#cStart').textContent = 'play again 💋';
    heartsConf({ particleCount: 60, spread: 90, origin: at(catchBox) });
    buzz([20, 40, 20]);
  }
  function stepCatch(now) {
    if (!running) return;
    let dt = Math.min(.05, (now - last) / 1000);
    last = now;
    if (document.hidden) dt = 0;
    elapsed += dt;
    tLeft -= dt;
    // he drifts along the top, throwing
    hx = CW / 2 + Math.sin(elapsed * 1.25) * (CW / 2 - 46) + Math.sin(elapsed * 3.1) * 12;
    spawnIn -= dt;
    if (spawnIn <= 0) {
      spawnIn = Math.max(.3, .7 - elapsed * .013);
      let r = Math.random(), k = KINDS[0];
      for (const kind of KINDS) { if ((r -= kind.w) <= 0) { k = kind; break; } }
      items.push({ k, x: hx, y: 116, vx: rand(-45, 45), vy: rand(110, 150) + elapsed * 6, rot: rand(-.5, .5), vr: rand(-2, 2) });
    }
    px += (tx - px) * Math.min(1, dt * 14);
    const py = CH - 54;
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.vy += 70 * dt;
      it.x += it.vx * dt;
      it.y += it.vy * dt;
      it.rot += it.vr * dt;
      if (it.x < 18 || it.x > CW - 18) it.vx *= -1;
      if (Math.hypot(it.x - px, it.y - py) < 46) {
        items.splice(i, 1);
        if (it.k.bad) {
          lives--;
          floats.push({ x: px, y: py - 50, t: 0, text: pick(BAD_SAYS) });
          buzz([40, 30, 40]);
          if (lives <= 0) { hud(); stopCatch(); return; }
        } else {
          score += it.k.pts;
          squash = 1;
          floats.push({ x: px, y: py - 46, t: 0, text: it.k.pts > 1 ? `+${it.k.pts} ${it.k.ch}` : '+1' });
          sfx('smack', rand(.9, 1.3), .5);
          if (it.k.pts >= 5) buzz(15);
        }
      } else if (it.y > CH + 40) items.splice(i, 1);
    }
    squash = Math.max(0, squash - dt * 5);
    floats.forEach(f => { f.t += dt; f.y -= 40 * dt; });
    floats = floats.filter(f => f.t < 1.1);
    hud();
    if (tLeft <= 0) { tLeft = 0; hud(); stopCatch(); return; }
    drawCatch(now);
    raf = requestAnimationFrame(stepCatch);
  }
  function sticker(img, x, y, s, sx = 1, sy = 1) {
    if (!img.complete || !img.naturalWidth) return;
    cx.save();
    cx.translate(x, y);
    cx.scale(sx, sy);
    cx.shadowColor = 'rgba(150, 20, 60, .3)';
    cx.shadowBlur = 10;
    cx.shadowOffsetY = 4;
    cx.drawImage(img, -s / 2, -s / 2, s, s);
    cx.restore();
  }
  function drawCatch(now) {
    if (!CW) return;
    cx.clearRect(0, 0, CW, CH);
    const t = now / 1000;
    const hy = 94 + Math.sin(t * 4) * 3;
    sticker(faceHim, running ? hx : CW / 2, hy, 64);
    for (const it of items) {
      cx.save();
      cx.translate(it.x, it.y);
      cx.rotate(it.rot);
      cx.drawImage(sprite[it.k.ch], -20, -20, 40, 40);
      cx.restore();
    }
    const sq = squash * .18;
    sticker(faceHer, running ? px : CW / 2, CH - 54, 84, 1 + sq, 1 - sq);
    cx.textAlign = 'center';
    for (const f of floats) {
      cx.globalAlpha = Math.max(0, 1 - f.t / 1.1);
      cx.font = f.big ? '700 34px Fredoka, sans-serif' : '700 18px Fredoka, sans-serif';
      cx.fillStyle = '#d8285e';
      cx.fillText(f.text, Math.min(CW - 90, Math.max(90, f.x)), f.y);
    }
    cx.globalAlpha = 1;
  }
  const aim = e => { const r = cv.getBoundingClientRect(); tx = Math.min(CW - 30, Math.max(30, e.clientX - r.left)); };
  cv.addEventListener('pointerdown', e => { if (!running) return; aim(e); try { cv.setPointerCapture(e.pointerId); } catch {} });
  cv.addEventListener('pointermove', e => { if (running && (e.pointerType === 'mouse' || e.buttons || e.pressure)) aim(e); });
  addEventListener('keydown', e => {
    if (!running) return;
    if (e.key === 'ArrowLeft') { tx = Math.max(30, tx - 60); e.preventDefault(); }
    if (e.key === 'ArrowRight') { tx = Math.min(CW - 30, tx + 60); e.preventDefault(); }
  });
  $('#cStart').addEventListener('click', startCatch);
  document.addEventListener('visibilitychange', () => { last = performance.now(); });
  $('#coBest').textContent = store.get('arushi-catch-best', 0) ? `your best: ${store.get('arushi-catch-best', 0)} 💋` : '';
  onShow['g-catch'] = sizeCatch;
  new IntersectionObserver(es => { if (es[0].isIntersecting) sizeCatch(); }).observe(catchBox);

  // ---------------- 2. this or that (swipe cards) ----------------
  const TT = [
    ['😚', 'forehead kisses', '😘', 'cheek kisses', 'noted. forehead kisses on demand 📝', 'cheeks it is. prepare them 😌'],
    ['🧥', 'stealing my hoodie', '🍟', 'stealing my fries', "it's already in your closet, isn't it 🙄", 'you do that anyway, thief 😤'],
    ['📞', 'late-night calls', '☀️', 'good morning texts', 'till you fall asleep on me. deal 🌙', 'first thing you see every morning ☀️'],
    ['🥟', 'momos', '😌', 'me', 'replaced by a dumpling. wow 💔', 'correct answer. gold star for you ⭐'],
    ['🎤', 'me singing (badly)', '💃', 'me dancing (worse)', 'free concert. ear damage guaranteed 🎤', "i'll embarrass myself for your laugh anytime 💃"],
    ['🤝', 'holding hands', '🫂', 'back hugs', 'pinky first, then the whole hand 🤝', 'sneak-attack hugs incoming 🫂'],
    ['📱', 'you text first', '🙋‍♂️', 'i text first', "lies. it's always me 🙄 (i love it)", "true. i literally can't help it 🥺"],
    ['🌹', 'a surprise date', '🛋️', 'a lazy day together', "dress cute. i'll handle the rest 🌹", 'blanket, snacks, you. perfect 🛋️'],
    ['🥺', 'me being clingy', '🥺🥺', 'me being EXTRA clingy', "trick question, there's only option b 😌", 'good choice. it was happening anyway 🥺🥺'],
    ['💌', 'love letters', '🎧', 'voice notes', 'more letters coming. so many more 💌', "i'll record one tonight 🎧"],
    ['🤚', 'a kiss on the hand', '👃', 'a kiss on the nose', 'very royal of you, princess 👑', 'boop. nose kiss secured 👃'],
    ['😳', 'me staring at you', '🙈', 'you catching me staring', "i'll try to stop. (i won't) 😳", 'you always do. and you always smile 🙈'],
  ];
  const sw = $('#swipe');
  let ti = 0;
  function renderSwipe() {
    sw.innerHTML = '';
    $('#swEnd').hidden = true;
    if (ti >= TT.length) {
      $('#swEnd').hidden = false;
      $('#swCount').textContent = `${TT.length} / ${TT.length}`;
      heartsConf({ particleCount: 60, spread: 90, origin: at(sw) });
      return;
    }
    if (ti + 1 < TT.length) sw.appendChild(card(TT[ti + 1], true));
    const c = card(TT[ti], false);
    sw.appendChild(c);
    $('#swCount').textContent = `${ti + 1} / ${TT.length}`;
  }
  function card([ea, a, eb, b], under) {
    const c = document.createElement('div');
    c.className = `swcard${under ? ' under' : ''}`;
    c.innerHTML = `<p class="sw-k">this or that?</p><button class="sw-opt a" type="button"><span></span><b></b><i>← swipe</i></button><button class="sw-opt b" type="button"><span></span><b></b><i>swipe →</i></button><em class="sw-or" aria-hidden="true">or</em>`;
    const [oa, ob] = c.querySelectorAll('.sw-opt');
    oa.querySelector('span').textContent = ea; oa.querySelector('b').textContent = a;
    ob.querySelector('span').textContent = eb; ob.querySelector('b').textContent = b;
    oa.setAttribute('aria-label', `pick ${a}`);
    ob.setAttribute('aria-label', `pick ${b}`);
    if (!under) dragCard(c);
    return c;
  }
  function choose(c, side) {
    if (c.dataset.done) return;
    c.dataset.done = 1;
    const [ea, a, eb, b, ra, rb] = TT[ti];
    log('thisorthat', `${a} vs ${b}`, side === 'a' ? a : b);
    $('#swSay').textContent = side === 'a' ? ra : rb;
    c.classList.add('fly');
    c.style.transform = `translate(${side === 'a' ? -130 : 130}%, 0) rotate(${side === 'a' ? -24 : 24}deg)`;
    c.style.opacity = 0;
    const o = c.querySelector(`.sw-opt.${side}`);
    if (o) heartsConf({ particleCount: 18, spread: 60, startVelocity: 18, ticks: 110, origin: at(o) });
    ti++;
    setTimeout(renderSwipe, reduced ? 10 : 320);
  }
  function dragCard(c) {
    let id = null, sx = 0, sy = 0, dx = 0, moved = false;
    c.addEventListener('pointerdown', e => {
      if (e.button) return;
      id = e.pointerId; sx = e.clientX; sy = e.clientY; dx = 0; moved = false;
    });
    c.addEventListener('pointermove', e => {
      if (e.pointerId !== id) return;
      dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (!moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { moved = true; try { c.setPointerCapture(id); } catch {} }
      if (!moved) return;
      c.style.transition = 'none';
      c.style.transform = `translate(${dx}px, ${dy * .15}px) rotate(${dx * .06}deg)`;
      c.style.setProperty('--pa', Math.min(1, Math.max(0, -dx / 90)));
      c.style.setProperty('--pb', Math.min(1, Math.max(0, dx / 90)));
    });
    const end = e => {
      if (e.pointerId !== id) return;
      id = null;
      c.style.transition = '';
      if (moved && Math.abs(dx) > 90) choose(c, dx < 0 ? 'a' : 'b');
      else if (!moved && e.type === 'pointerup') {
        const o = e.target.closest('.sw-opt');
        if (o) choose(c, o.classList.contains('a') ? 'a' : 'b');
      } else {
        c.style.transform = '';
        c.style.setProperty('--pa', 0);
        c.style.setProperty('--pb', 0);
      }
    };
    c.addEventListener('pointerup', end);
    c.addEventListener('pointercancel', end);
    // keyboard: the two halves are real buttons
    c.querySelectorAll('.sw-opt').forEach(o => o.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(c, o.classList.contains('a') ? 'a' : 'b'); }
    }));
  }
  $('#swAgain').addEventListener('click', () => { ti = 0; $('#swSay').textContent = ''; renderSwipe(); });
  renderSwipe();

  // ---------------- 3. spin a dare ----------------
  const DARES = [
    ['🎧', 'send him a voice note saying "i love you"'],
    ['🤳', 'send him your cutest selfie, right now'],
    ['📞', 'call him and say "hi handsome" in your sweetest voice'],
    ['✍️', 'give him a brand new cute nickname'],
    ['💋', 'send him 10 kiss emojis. no explanation.'],
    ['💗', 'text him one thing you love about him'],
    ['🍫', 'lucky spin! he owes you chocolate. go collect.'],
    ['😌', 'rate his looks out of 10 (the answer is 10)'],
  ];
  const WCOL = ['#ffc2d4', '#ffe08a', '#d4c4ff', '#b8ecd9', '#ffbfb3', '#c4e2ff', '#ffd1ec', '#ffd9a8'];
  const wheel = $('#wheel');
  wheel.style.background = `conic-gradient(${WCOL.map((c, i) => `${c} ${i * 45}deg ${(i + 1) * 45}deg`).join(', ')})`;
  DARES.forEach(([e], i) => {
    const b = document.createElement('b');
    b.textContent = e;
    b.style.setProperty('--a', `${i * 45 + 22.5}deg`);
    wheel.appendChild(b);
  });
  let wrot = 0, spinning = false, dareK = -1;
  $('#spin').addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    $('#dare').hidden = true;
    $('#dareSay').textContent = '';
    dareK = Math.floor(Math.random() * DARES.length);
    const c = dareK * 45 + 22.5 + rand(-14, 14);
    const cur = ((wrot % 360) + 360) % 360;
    wrot += 360 * 5 + ((360 - c - cur) % 360 + 360) % 360;
    wheel.style.transitionDuration = reduced ? '.5s' : '4.2s';
    wheel.style.transform = `rotate(${wrot}deg)`;
    buzz(10);
  });
  wheel.addEventListener('transitionend', () => {
    if (!spinning) return;
    spinning = false;
    const [e, t] = DARES[dareK];
    $('#dareT').textContent = `${e} ${t}`;
    $('#dare').hidden = false;
    $('#dareYes').disabled = $('#dareNo').disabled = false;
    log('dare_spin', t);
    buzz(20);
  });
  $('#dareYes').addEventListener('click', () => {
    const t = DARES[dareK][1];
    log('dare', t, 'accepted');
    $('#dareYes').disabled = $('#dareNo').disabled = true;
    $('#dareSay').textContent = "dare accepted ✅ he's waiting 👀 go go go!";
    heartsConf({ particleCount: 50, spread: 80, origin: at($('#dare')) });
  });
  $('#dareNo').addEventListener('click', () => {
    const t = DARES[dareK][1];
    log('dare', t, 'chickened out');
    $('#dareYes').disabled = $('#dareNo').disabled = true;
    $('#dareSay').textContent = '🐔 bawk bawk. fine, but now you owe him 2 kisses. those are the rules.';
  });

  // ---------------- 4. the shaurya quiz (rigged, obviously) ----------------
  const QUIZ = [
    { q: "what's shaurya's favourite thing in the whole world?", o: ['momos 🥟', 'sleeping 😴', 'his phone 📱', 'arushi 💗'], a: [3], no: "wrong 😤 it's you. it's always been you.", yes: 'correct. obviously 💗' },
    { q: 'what does shaurya think about the most?', o: ['exams 📚', 'food 🍕', 'arushi', "arushi's smile"], a: [2, 3], no: 'hmm, no. try thinking about… someone 👀', yes: 'trick question. c and d are both right 😌' },
    { q: 'who is the cutest person alive?', o: ['arushi', 'arushi', 'arushi', 'shaurya 😎'], a: [0, 1, 2], no: 'aww thanks, but no. it\'s you. (a, b and c were all correct)', yes: 'correct. any of those three, really 🥹' },
    { q: 'how many times a day does shaurya think about arushi?', o: ['10', '100', '1,000', 'error: number too big'], a: [3], no: 'way, way more than that 🙄', yes: 'correct. the calculator gave up 💥' },
    { q: 'if arushi is sad, shaurya will…', o: ['send memes', 'call her', 'come running', 'all of the above, in that order'], a: [3], no: 'close! but it\'s all of them, in that order 🏃', yes: 'memes, call, sprint. every single time 🏃' },
    { q: "what's shaurya's favourite sound?", o: ['alfaaz 🎵', 'her laugh', 'her voice notes', 'her saying his name'], a: [1, 2, 3], no: "alfaaz is great, but no. it's you 🎧", yes: 'yes. replaying it in my head rn 🥹' },
    { q: 'who loves who more?', o: ['arushi loves shaurya more', 'shaurya loves arushi more'], a: [1], no: "nice try. wrong 😤 it's me. always me.", yes: 'correct. finally you admit it 😌' },
  ];
  let qi = 0, qScore = 0;
  function renderQ() {
    $('#quiz').hidden = false;
    $('#qEnd').hidden = true;
    const Q = QUIZ[qi];
    $('#qNum').textContent = `question ${qi + 1} / ${QUIZ.length}`;
    $('#qQ').textContent = Q.q;
    $('#qSay').textContent = '';
    $('#qNext').hidden = true;
    const box = $('#qOpts');
    box.innerHTML = '';
    Q.o.forEach((txt, i) => {
      const b = document.createElement('button');
      b.className = 'q-opt';
      b.innerHTML = `<i>${'abcd'[i]}</i><span></span>`;
      b.querySelector('span').textContent = txt;
      b.addEventListener('click', () => answer(i));
      box.appendChild(b);
    });
  }
  function answer(i) {
    const Q = QUIZ[qi], right = Q.a.includes(i), opts = $$('.q-opt');
    opts.forEach((b, k) => { b.disabled = true; if (Q.a.includes(k)) b.classList.add('right'); });
    if (!right) opts[i].classList.add('wrong');
    else { qScore++; heartsConf({ particleCount: 16, spread: 60, startVelocity: 18, ticks: 110, origin: at(opts[i]) }); }
    buzz(right ? 10 : [30, 30, 30]);
    $('#qSay').textContent = right ? Q.yes : Q.no;
    log('quiz', Q.q, `${Q.o[i]} ${right ? '✓' : '✗'}`);
    $('#qNext').hidden = false;
    $('#qNext').textContent = qi + 1 < QUIZ.length ? 'next →' : 'see my score 🏅';
  }
  $('#qNext').addEventListener('click', () => {
    qi++;
    if (qi < QUIZ.length) { renderQ(); return; }
    $('#quiz').hidden = true;
    $('#qEnd').hidden = false;
    $('#qScore').textContent = `you scored ${qScore} / ${QUIZ.length}… but i rigged it, so you scored 100% anyway 💘`;
    log('quiz_done', '', qScore);
    cannons(1200);
  });
  $('#qAgain').addEventListener('click', () => { qi = 0; qScore = 0; renderQ(); });
  renderQ();

  // ---------------- keep the site on her home screen ----------------
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let installEvt = null;
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; $('#homeAdd').hidden = standalone; });
  if (ios && !standalone) $('#homeAdd').hidden = false;
  $('#homeBtn').addEventListener('click', async () => {
    if (installEvt) {
      installEvt.prompt();
      const r = await installEvt.userChoice.catch(() => null);
      if (r && r.outcome === 'accepted') $('#homeHow').textContent = 'yayy, now i live on your phone 🥹📲';
      installEvt = null;
    } else {
      $('#homeHow').textContent = 'tap the share button ⬆️ at the bottom of safari, then "add to home screen". now i live on your phone 🥹';
    }
  });
  addEventListener('appinstalled', () => { log('install'); $('#homeAdd').hidden = true; });
  if (standalone) log('opened_app', '', '', 50);
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
