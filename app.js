/* happy birthday, arushi ♡ */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const params = new URLSearchParams(location.search);

  // ---------------- her little diary: every sweet thing she does gets written down for shaurya (admin.html) ----------------
  const FS = 'https://firestore.googleapis.com/v1/projects/anniversay/databases/(default)/documents';
  const FS_KEY = 'AIzaSyBCjYwL24hcrNjRDzrPwMiKBBccWgt1ZI8';
  const session = (params.has('preview') ? 'p-' : '') + Math.random().toString(36).slice(2, 10);
  const device = matchMedia('(pointer: coarse)').matches ? 'phone' : 'laptop';
  const noLog = params.has('nolog');
  const logged = {};
  function log(type, text = '', detail = '', cap = 0) {
    if (noLog) return;
    if (cap && (logged[type] = (logged[type] || 0) + 1) > cap) return; // chatty things (heart pops) only count so much
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const str = v => ({ stringValue: String(v) });
    const body = {
      writes: [{
        update: {
          name: `projects/anniversay/databases/(default)/documents/logs/${id}`,
          fields: { type: str(type), text: str(String(text).slice(0, 1100)), detail: str(String(detail).slice(0, 280)), clientAt: str(new Date().toISOString()), session: str(session), device: str(device) },
        },
        updateTransforms: [{ fieldPath: 'at', setToServerValue: 'REQUEST_TIME' }],
        currentDocument: { exists: false },
      }],
    };
    fetch(`${FS}:commit?key=${FS_KEY}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), keepalive: true }).catch(() => {});
  }

  // ---------------- the important dates ----------------
  const TOGETHER = new Date(2026, 7, 7); // 7 aug 2026, the day it became us
  const BDAY = { month: 10, day: 9 };     // 9 nov, the day she was born
  // the surprise opens at midnight on her birthday. ?preview skips the wait, ?lock=5 rehearses the unlock in 5s
  const UNLOCK = params.has('lock')
    ? new Date(Date.now() + (parseFloat(params.get('lock')) || 8) * 1000)
    : new Date(2026, BDAY.month, BDAY.day);
  const SONG_AT = 61; // alfaaz, from 1:01

  // ---------------- words ----------------
  const LINES = [
    'happy birthday, my kuchu puchu 🎂',
    'i love you so much, arushi 💗',
    'my biggest happiness was born today',
    "you're my everything",
    'you are my world 🌍',
    'i love you till the end ♾️',
    'i love you like i love you',
    'meri rasmalai 🥹',
  ];
  const POPS = [
    'happy birthday, birthday girl 🎂', 'i love you so much, arushi 💗', "you're my everything", 'you are my world 🌍',
    'i love you till the end ♾️', 'i love you like i love you', "you're so cute it should be illegal",
    'my favourite notification is you', 'thinking about you rn (and always)', 'muah! 😚',
    'best thing that ever happened to me', "you're my home 🏡", 'you + me = forever',
    'my mastikhor biwi hehe 😜', 'cutie patootie alert 🚨', "you're prettier than this whole website",
  ];
  const HCOL = ['#ff5d8f', '#ff8fab', '#ffb3c6', '#ff7aa2', '#f7a1c4', '#ffbfa3', '#e4a8ff'];
  const PARTY = ['#ff5d8f', '#ffd166', '#7fd4c1', '#b79cff', '#ff9f6e', '#8fc6ff'];

  // his words, exactly how he says them. *stars* mark the lines that get the highlighter.
  const LETTER = [
    'hieieeeee! babyyyy!! 🥰💗',
    'a verye veryyy veryy veryryyy happiiii birthdayy 🎂🎉 to myy dearrr cuitee patootieee kuchuu puchuuu babyyy ahahahha 🤭💋',
    'darlinggg, todays day is the most special day to mee 🥹 as on this day *the biggest biggessst happinesss of myyyy lifee was born..* ✨💗 oh i loveee youuuuuuu! 😘💋',
    'babyyy, iimmm gonnaaaaaaa *loveee you alll my life* 💞 and everydayy evenn moreeee! 🫶',
    "babyyy its been 3 monthss since we're together 🗓️💗 and i can tell youu how happyy i've been, the moments we've shared together.. 🥹🫂 and i have decided, *in this life i'm yours... and only yours* my babyyy... 💍💋 no matter how hard it will be.... *i'll wipe your every tear* 🥺 and makee you laugh... 😂 cuz i lovee my mastikhor biwi hehehe 😜💗",
    "once again babayyyyyyyyy, a very veryyyyyy happppy Arushi's birthdayy to mee.. 🎂🥳 hehehehhe 🙈 i loveee youu soo muchhh meri rasmalai 🍮 meri kuchu puchiii ahaha 😘💋 i lovee you moreeeee than someone can comprehend, *my beautiful wife...* 💗✨ i'm all yours... 💋💋💋",
  ];

  const COLLAGE = [
    { id: 'p10', cap: 'my pretty girl ♡', x: 2, y: 6, mx: 2, my: 3, r: -7, z: .9, f: 'tape', w: 1, hat: 1 },
    { id: 'p114', cap: 'ufff 🥹', x: 85, y: 5, mx: 70, my: 4, r: 6, z: .7, f: 'pin', w: 1 },
    { id: 'p24', cap: 'the main character', x: 14, y: 20, mx: 37, my: 1, r: 5, z: .5, f: 'glass', w: .9 },
    { id: 'p92', cap: 'birthday girl hiii', x: 74, y: 21, mx: 3, my: 75, r: -5, z: .6, f: 'clay', w: .9, hat: 1 },
    { id: 'p9', cap: 'my whole heart', x: 3, y: 41, mx: 37, my: 78, r: 4, z: 1, f: 'plain', w: 1.05 },
    { id: 'p128', cap: 'kissed by snapchat (jealous)', x: 86, y: 38, mx: 69, my: 76, r: -6, z: .85, f: 'tape', w: 1.05, hat: 1 },
    { id: 'p110', cap: 'cutest ever', x: 15, y: 62, r: -4, z: .6, f: 'pin', w: .95, desk: 1, hat: 1 },
    { id: 'p43', cap: 'night + you', x: 73, y: 58, r: 5, z: .7, f: 'glass', w: .95, desk: 1 },
    { id: 'p35', cap: 'princess vibes 👑', x: 4, y: 77, r: 6, z: .8, f: 'clay', w: 1, desk: 1 },
    { id: 'p32', cap: 'sunlight loves you too', x: 85, y: 73, r: -5, z: .9, f: 'plain', w: 1, desk: 1 },
    { id: 'p81', cap: 'that pose tho', x: 22.5, y: 2, r: -9, z: .4, f: 'plain', w: .78, desk: 1 },
    { id: 'p102', cap: "ma'am pls 😮‍💨", x: 66.5, y: 3, r: 8, z: .45, f: 'tape', w: .75, desk: 1 },
  ];

  const REASONS = [
    'your smile fixes my worst days',
    "you're my safe place 🏡",
    'the way you say my name 🥹',
    'my mastikhor biwi hehe 😜',
    'your goofy filter selfies 📸',
    'you make me want to be better',
    'every call with you ends too soon',
    'you chose me. out of everyone 🥺',
    "you're my forever. simple ♾️",
  ];
  const BCOL = ['#ff5d8f', '#ffb347', '#b79cff', '#7fd4c1', '#ff8fab', '#ffd166', '#8fc6ff', '#ff7a7a', '#e4a8ff'];
  const PAIR_IDS = ['p94', 'p82', 'p55', 'p85', 'p10', 'p9'];

  const LETTERS = [
    { e: '🥺', t: "open when you're sad", c: '#ffc9d9', s: 'rgba(255,110,155,.45)',
      b: "hey hey hey. come here. whatever it is, it's not bigger than us. you're not alone, you have me, always. now drink some water, take a deep breath, and send me a voice note pls. i'm right here." },
    { e: '🫂', t: 'open when you miss me', c: '#ffd9c7', s: 'rgba(255,140,90,.42)',
      b: "i miss you more. no arguments, i've already won this one. close your eyes for three seconds… that was me hugging you. felt it? good. you'll get the real one very soon." },
    { e: '🌙', t: "open when you can't sleep", c: '#e3d6ff', s: 'rgba(140,100,255,.4)',
      b: "count my i love yous instead of sheep: i love you, i love you, i love you… it's an infinite list, so you'll fall asleep way before it ends. goodnight my baby. dream of me, okay?" },
    { e: '😤', t: "open when you're mad at me", c: '#fff0b8', s: 'rgba(230,180,40,.42)',
      b: "okay. i probably deserved that. i'm sorry, my love. you're allowed to stay mad for five more minutes, then i'm coming with chocolate and my best puppy eyes. you can't resist those. i know it." },
    { e: '🌷', t: 'open when you doubt yourself', c: '#cff3e2', s: 'rgba(60,190,130,.38)',
      b: "you are SO enough. more than enough. you're kind and pretty and funny and the most beautifully annoying girl i know, and i'd pick you in every single universe. no doubts. never." },
    { e: '🤭', t: 'open when you need a laugh', c: '#d3e9ff', s: 'rgba(70,150,240,.38)',
      b: "why did shaurya fail his exam? because every chapter somehow turned into arushi. …okay that was terrible. but you smiled a little, didn't you? i saw that. mission complete 😌" },
  ];

  const COUPONS = [
    { e: '🫂', t: 'one tight hug', d: 'the long kind. no letting go first.', c: '#ff8fab' },
    { e: '🥟', t: 'momos on me', d: 'unlimited plates. zero judging.', c: '#ffb38a' },
    { e: '📞', t: 'a late-night call', d: 'until you fall asleep on me.', c: '#b79cff' },
    { e: '🏆', t: 'you win the next fight', d: "even if you're wrong. (you're never wrong.)", c: '#ffcf5c' },
    { e: '🎂', t: 'a birthday date', d: 'you dress cute, i plan everything. cake included.', c: '#ff6f91' },
    { e: '😚', t: 'forehead kisses', d: 'infinite. non-expiring. very important.', c: '#ff9ec4' },
  ];

  // ---------------- little helpers: particles, confetti, toast ----------------
  let live = 0;
  function particle(x, y, dx, dy, opt = {}) {
    if (live > 160) return;
    live++;
    const el = document.createElement('span');
    el.className = 'pop';
    el.textContent = opt.ch || (Math.random() < .85 ? '♥' : '✦');
    el.style.cssText = `--x0:${x}px;--y0:${y}px;--dx:${dx}px;--dy:${dy}px;--rot:${rand(-70, 70)}deg;--dur:${opt.dur || rand(.7, 1.2)}s;font-size:${opt.size || rand(12, 26)}px;color:${opt.color || pick(HCOL)}`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => { el.remove(); live--; }, { once: true });
  }
  function burst(x, y, n = 8, dist = 70, color) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2), d = rand(dist * .4, dist);
      particle(x, y, Math.cos(a) * d, Math.sin(a) * d - dist * .3, { color });
    }
  }
  function rain(n = 40) {
    for (let i = 0; i < n; i++) {
      setTimeout(() => particle(rand(0, innerWidth), -30, rand(-60, 60), innerHeight + 80,
        { dur: rand(2.2, 3.4), size: rand(16, 34) }), i * 45);
    }
  }

  const fx = typeof window.confetti === 'function' ? window.confetti : null;
  let heartShape = null;
  try { heartShape = fx && fx.shapeFromPath({ path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z' }); } catch {}
  function confetti(opts = {}) {
    const o = Object.assign({ particleCount: 80, spread: 80, startVelocity: 42, ticks: 230, colors: PARTY.concat('#ffffff'), zIndex: 150, disableForReducedMotion: true }, opts);
    if (fx) { fx(o); return; }
    if (o.origin) burst(o.origin.x * innerWidth, o.origin.y * innerHeight, 12, 110);
  }
  function heartsConf(opts = {}) {
    confetti(Object.assign({ shapes: heartShape ? [heartShape] : ['circle'], scalar: heartShape ? 1.7 : 1, colors: ['#ff3f7f', '#ff8fab', '#ff5d8f', '#ffc2d4', '#e2245e'] }, opts));
  }
  function cannons(ms = 1800) {
    if (!fx || reduced) return rain(30);
    const end = Date.now() + ms;
    (function f() {
      confetti({ particleCount: 4, angle: 60, spread: 58, startVelocity: 62, origin: { x: 0, y: .8 } });
      confetti({ particleCount: 4, angle: 120, spread: 58, startVelocity: 62, origin: { x: 1, y: .8 } });
      if (Date.now() < end) requestAnimationFrame(f);
    })();
  }
  const at = el => { const r = el.getBoundingClientRect(); return { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight }; };

  let toastT;
  function toast(html, ms = 2600) {
    const t = $('#toast');
    t.innerHTML = html;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), ms);
  }

  // ---------------- music: alfaaz, from 1:01 ----------------
  const song = $('#song'), musicBtn = $('#musicBtn');
  let songVol = .6, fadeT;
  function setPlaying(p) {
    musicBtn.classList.toggle('playing', p);
    musicBtn.setAttribute('aria-pressed', p);
    musicBtn.setAttribute('aria-label', p ? 'pause our song' : 'play our song');
  }
  function seekStart() { try { if (song.currentTime < SONG_AT - 1) song.currentTime = SONG_AT; } catch {} }
  function fadeTo(v, ms = 1500) {
    clearInterval(fadeT);
    const from = song.volume, steps = Math.max(1, Math.round(ms / 60));
    let k = 0;
    fadeT = setInterval(() => {
      k++;
      song.volume = Math.min(1, Math.max(0, from + (v - from) * (k / steps)));
      if (k >= steps) clearInterval(fadeT);
    }, 60);
  }
  function playSong(fade, vol) {
    if (vol != null) songVol = vol;
    seekStart();
    if (fade) song.volume = 0; else song.volume = songVol;
    const pr = song.play();
    if (!pr) return;
    pr.then(() => { if (fade) fadeTo(songVol, 2200); }).catch(() => setPlaying(false));
  }
  song.addEventListener('loadedmetadata', seekStart);
  song.addEventListener('ended', () => { song.currentTime = SONG_AT; song.play().catch(() => {}); });
  song.addEventListener('play', () => { setPlaying(true); log('song', '', 'play', 12); });
  song.addEventListener('pause', () => { setPlaying(false); log('song', '', 'pause', 12); });
  musicBtn.addEventListener('click', () => {
    if (song.paused) { playSong(false, .6); toast('playing <b>alfaaz</b> 🎵'); } else song.pause();
  });

  // ---------------- the gate: a wrapped gift until midnight ----------------
  const gate = $('#gate'), fav = $('#favicon');
  const setFav = emo => { fav.href = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emo}</text></svg>`)}`; };
  let gateOn = Date.now() < UNLOCK && !params.has('preview');
  log('visit', '', gateOn ? 'gate' : 'open');
  const pad = n => String(n).padStart(2, '0');
  if (gateOn) {
    gate.hidden = false;
    document.title = 'shhh… not yet 🤫';
    setFav('🎁');
    const g = { D: $('#gD'), H: $('#gH'), M: $('#gM'), S: $('#gS') };
    const tickGate = () => {
      const s = Math.max(0, Math.ceil((UNLOCK - Date.now()) / 1000));
      g.D.textContent = Math.floor(s / 86400);
      g.H.textContent = pad(Math.floor(s % 86400 / 3600));
      g.M.textContent = pad(Math.floor(s % 3600 / 60));
      g.S.textContent = pad(s % 60);
      if (s <= 0) { clearInterval(gateT); unwrap(); }
    };
    const gateT = setInterval(tickGate, 1000);
    tickGate();
    const PEEKS = [
      'no peeking, kuchu puchu 🙈', 'patience, rasmalai 😤', "it's still being wrapped… with love 🎀",
      "shaking it won't help, ma'am 😂", "okay fine, one hint: it's all about you 🤭", "worth the wait. i promise 🤍",
    ];
    let pk = 0;
    $('#gift').addEventListener('click', e => {
      if (gate.classList.contains('ready')) return openGate();
      const gift = $('#gift');
      gift.classList.remove('peek');
      void gift.offsetWidth;
      gift.classList.add('peek');
      burst(e.clientX, e.clientY, 8, 70);
      toast(PEEKS[pk++ % PEEKS.length], 2400);
      log('gift_peek', '', pk, 15);
    });
  }
  function unwrap() {
    gate.classList.add('ready');
    $('#gateKicker').textContent = "it's 9th november!!! 🎉";
    $('#gateTitle').innerHTML = 'happy birthday, <span class="s">my love</span>';
    $('#gateNote').textContent = "it's finally your day. your surprise is ready 🎂";
    $('#gateOpen').hidden = false;
    document.title = 'happy birthday arushi 🎂';
    setFav('🎂');
    heartsConf({ particleCount: 90, spread: 110, origin: at($('#gift')) });
    cannons(1500);
  }
  function openGate() {
    gateOn = false;
    log('gate_open');
    gate.classList.add('gone');
    setTimeout(() => gate.remove(), 1000);
  }
  $('#gateOpen').addEventListener('click', openGate);

  // ---------------- intro: lights, cake, her name on the candles ----------------
  const intro = $('#intro'), cord = $('#cord'), hero = $('#home'), partyHint = $('#partyHint');
  let stage = 'dark', entered = false;

  const fairy = $('#fairy');
  function stringLights() {
    const w = innerWidth, n = Math.max(8, Math.round(w / 64)), sag = 44;
    fairy.setAttribute('viewBox', `0 0 ${w} 120`);
    let h = `<path class="wire" d="M-10 12Q${w / 2} ${12 + sag * 2} ${w + 10} 12"/>`;
    for (let i = 1; i < n; i++) {
      const t = i / n, x = -10 + (w + 20) * t, y = 12 + 2 * (1 - t) * t * sag * 2;
      h += `<circle cx="${x.toFixed(1)}" cy="${(y + 8).toFixed(1)}" r="6" style="--c:${PARTY[i % PARTY.length]};--d:${(i * .27 % 1.8).toFixed(2)}s"/>`;
    }
    fairy.innerHTML = h;
  }
  stringLights();

  const candles = [...'ARUSHI'].map((ch, i) => {
    const c = document.createElement('button');
    c.className = 'candle';
    c.style.setProperty('--cc', PARTY[i]);
    c.style.setProperty('--i', i);
    c.setAttribute('aria-label', `blow out the ${ch} candle`);
    c.innerHTML = `<span class="flame"></span><span class="wax">${ch}</span>`;
    c.addEventListener('click', e => { e.stopPropagation(); blowOut(c); });
    $('#candles').appendChild(c);
    return c;
  });
  let litCount = candles.length;
  function blowOut(c, how = 'tap') {
    if (stage !== 'lit' || c.classList.contains('out')) return;
    c.classList.add('out');
    c.setAttribute('aria-label', 'candle blown out');
    litCount--;
    log('candle', c.textContent, how);
    if (!litCount) allOut();
    else partyHint.textContent = litCount === 1 ? 'one more… 🤭' : `${litCount} more to go… 🌬️`;
  }
  function lightsOn() {
    if (stage !== 'dark') return;
    stage = 'lit';
    cord.classList.add('pulled');
    log('lights_on');
    playSong(true, .45);
    setTimeout(() => intro.classList.add('lit'), 280);
  }
  async function allOut() {
    stage = 'blown';
    log('cake_done');
    stopMic();
    partyHint.textContent = 'yayyyy!! 🎉 your wish is on its way to the universe ✨';
    await sleep(600);
    intro.classList.add('blown');
    if (!song.paused) fadeTo(.6, 2500);
    heartsConf({ particleCount: 110, spread: 110, startVelocity: 46, origin: at($('#cake')) });
    cannons(2000);
    await sleep(1400);
    stage = 'done';
    intro.classList.add('done');
    setTimeout(enterSite, reduced ? 3000 : 6500);
  }
  cord.addEventListener('click', lightsOn);
  intro.addEventListener('click', () => {
    if (stage === 'dark') lightsOn();
    else if (stage === 'done') enterSite();
  });

  // blow into the mic for real: loud breathy noise leans the flames, a strong gust puts them out
  const micBtn = $('#micBtn');
  let micStream = null, micCtx = null, micRAF = 0;
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && (window.AudioContext || window.webkitAudioContext)) micBtn.hidden = false;
  else $('#orTap').textContent = 'tap each flame to blow it out';
  micBtn.addEventListener('click', async e => {
    e.stopPropagation();
    if (micStream) return;
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false } });
    } catch {
      toast('no mic? no worries, just tap the flames 🕯️', 3200);
      return;
    }
    if (stage !== 'lit') return stopMic();
    micBtn.classList.add('on');
    log('mic_on');
    micBtn.textContent = '🎤 listening… now blow!';
    if (!song.paused) fadeTo(.18, 600);
    micCtx = new (window.AudioContext || window.webkitAudioContext)();
    micCtx.resume && micCtx.resume();
    const an = micCtx.createAnalyser();
    an.fftSize = 1024;
    micCtx.createMediaStreamSource(micStream).connect(an);
    const buf = new Float32Array(an.fftSize);
    let power = 0;
    (function listen() {
      an.getFloatTimeDomainData(buf);
      let s = 0;
      for (let i = 0; i < buf.length; i++) s += buf[i] * buf[i];
      const rms = Math.sqrt(s / buf.length);
      intro.style.setProperty('--lean', `${Math.min(32, rms * 180).toFixed(1)}deg`);
      power = rms > .13 ? power + rms : Math.max(0, power - .03);
      if (power > .85) {
        power = .25;
        const on = candles.filter(c => !c.classList.contains('out'));
        if (on.length) blowOut(pick(on), 'mic');
      }
      if (stage === 'lit') micRAF = requestAnimationFrame(listen);
    })();
  });
  function stopMic() {
    cancelAnimationFrame(micRAF);
    if (micStream) micStream.getTracks().forEach(t => t.stop());
    if (micCtx) micCtx.close().catch(() => {});
    micStream = micCtx = null;
    intro.style.setProperty('--lean', '0deg');
  }

  function enterSite() {
    if (entered) return;
    entered = true;
    log('enter');
    intro.classList.add('gone');
    document.body.classList.remove('locked');
    const hr = hero.getBoundingClientRect();
    $$('.pola', hero).forEach(p => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--fx', `${hr.left + hr.width / 2 - (r.left + r.width / 2)}px`);
      p.style.setProperty('--fy', `${hr.top + hr.height / 2 - (r.top + r.height / 2)}px`);
    });
    hero.classList.add('ready');
    setTimeout(() => intro.remove(), 1000);
    setTimeout(() => toast('happy birthday, my kuchu puchu 🎂 scroll slowly, okayy?', 4200), 1800);
    setTimeout(() => toast('psst… pop the floating hearts and balloons. each one has a message 💗', 4200), 8500);
    spy();
  }

  // ---------------- hero: crown, name, typing ----------------
  const crown = $('#crown');
  for (let i = 0; i < 9; i++) {
    const a = -64 + i * 16, s = i === 4 ? 30 : i % 2 ? 17 : 23;
    crown.insertAdjacentHTML('beforeend', `<span style="--a:${a}deg"><i style="--s:${s}px;--d:${(i * .13).toFixed(2)}s">♥</i></span>`);
  }

  const nameEl = $('#name');
  let nameTaps = 0;
  nameEl.addEventListener('click', e => {
    nameTaps++;
    nameEl.classList.remove('wiggle');
    void nameEl.offsetWidth;
    nameEl.classList.add('wiggle');
    burst(e.clientX, e.clientY, 12, 110);
    if (nameTaps === 5) toast('okay okay, i know you love your name. me too 🤭', 3200);
  });

  const typed = $('#typed');
  const graphemes = s => (window.Intl && Intl.Segmenter)
    ? [...new Intl.Segmenter().segment(s)].map(x => x.segment) : Array.from(s);
  (async function typeLoop() {
    let i = 0;
    if (reduced) {
      setInterval(() => { typed.textContent = LINES[++i % LINES.length]; }, 3200);
      return;
    }
    await sleep(4200);
    for (;;) {
      const ch = graphemes(LINES[i % LINES.length]);
      for (let k = typed.textContent ? ch.length : 1; k <= ch.length; k++) {
        typed.textContent = ch.slice(0, k).join('');
        await sleep(rand(45, 95));
      }
      await sleep(2100);
      for (let k = ch.length; k >= 0; k--) {
        typed.textContent = ch.slice(0, k).join('');
        await sleep(22);
      }
      await sleep(320);
      i++;
    }
  })();

  // ---------------- the floating collage ----------------
  const collage = $('#collage');
  let zTop = 10;
  COLLAGE.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = `pola f-${p.f}${p.desk ? ' desk-only' : ''}`;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `open photo: ${p.cap}`);
    el.dataset.full = `img/m/${p.id}.webp`;
    el.style.cssText = `--x:${p.x}%;--y:${p.y}%;--mx:${p.mx ?? p.x}%;--my:${p.my ?? p.y}%;--r:${p.r}deg;--z:${p.z};--w:${p.w};--i:${i};--t:${rand(6, 9).toFixed(2)}s;--d:${(-rand(0, 6)).toFixed(2)}s`;
    el.innerHTML = `<div class="pola-par"><div class="pola-float"><figure class="pola-card">${p.hat ? '<span class="hat"></span>' : ''}<img src="img/t/${p.id}.webp" alt="arushi: ${p.cap}" draggable="false"><figcaption>${p.cap}</figcaption></figure></div></div>`;
    collage.appendChild(el);
    draggable(el);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(el.dataset.full); } });
  });

  function draggable(el) {
    let id = null, sx = 0, sy = 0, ox = 0, oy = 0, moved = false;
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      id = e.pointerId; sx = e.clientX; sy = e.clientY; moved = false;
      ox = parseFloat(el.style.getPropertyValue('--dx')) || 0;
      oy = parseFloat(el.style.getPropertyValue('--dy')) || 0;
      try { el.setPointerCapture(id); } catch {}
    });
    el.addEventListener('pointermove', e => {
      if (e.pointerId !== id) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.hypot(dx, dy) > 6) { moved = true; el.classList.add('dragging'); el.style.zIndex = ++zTop; }
      if (moved) { el.style.setProperty('--dx', `${ox + dx}px`); el.style.setProperty('--dy', `${oy + dy}px`); }
    });
    const end = e => {
      if (e.pointerId !== id) return;
      id = null;
      el.classList.remove('dragging');
      if (moved) { const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 6, 60); }
      else if (e.type === 'pointerup') openLightbox(el.dataset.full);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  // parallax: the pictures drift with the mouse, and with the scroll
  if (!reduced && fine) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--px', (((e.clientX - r.left) / r.width - .5) * -44).toFixed(1));
      hero.style.setProperty('--py', (((e.clientY - r.top) / r.height - .5) * -32).toFixed(1));
    });
  }

  // ---------------- the birthday letter ----------------
  const env = $('#envelope'), envStage = $('#envStage'), bletter = $('#bletter'), blBody = $('#blBody');
  const EMOJI = /\p{Extended_Pictographic}/u;
  let wi = 0;
  LETTER.forEach(par => {
    const p = document.createElement('p');
    let hot = false, first = true;
    par.split(' ').forEach(tok => {
      if (!tok) return;
      let word = tok;
      if (word.startsWith('*')) { hot = true; word = word.slice(1); }
      const close = word.endsWith('*');
      if (close) word = word.slice(0, -1);
      const s = document.createElement('span');
      s.className = `bw${hot ? ' bk' : ''}${EMOJI.test(word) && !/[a-z]/i.test(word) ? ' be' : ''}`;
      s.style.setProperty('--w', wi++);
      s.textContent = word;
      if (!first) p.append(' ');
      first = false;
      p.appendChild(s);
      if (close) hot = false;
    });
    blBody.appendChild(p);
  });
  bletter.style.setProperty('--n', wi);

  let letterOpen = false;
  function openBirthdayLetter() {
    if (letterOpen) return;
    letterOpen = true;
    log('letter_open');
    env.classList.add('open');
    setTimeout(() => heartsConf({ particleCount: 60, spread: 90, startVelocity: 34, origin: at(env) }), 650);
    setTimeout(() => {
      envStage.classList.add('away');
      setTimeout(() => {
        envStage.hidden = true;
        bletter.hidden = false;
        void bletter.offsetWidth;
        bletter.classList.add('open');
        setTimeout(() => { $('#reply').hidden = false; $('#reply').classList.add('show'); }, wi * 34 + 3600);
        scrollTo({ top: bletter.getBoundingClientRect().top + scrollY - 70, behavior: reduced ? 'auto' : 'smooth' });
      }, 650);
    }, 2100);
  }
  $('#seal').addEventListener('click', e => { e.stopPropagation(); openBirthdayLetter(); });
  env.addEventListener('click', openBirthdayLetter);

  let letterKisses = 0;
  $('#blAgain').addEventListener('click', e => {
    const l = document.createElement('span');
    l.className = 'lips extra';
    l.textContent = '💋';
    l.style.cssText = `left:${rand(4, 82).toFixed(1)}%;top:${rand(6, 88).toFixed(1)}%;rotate:${rand(-35, 35).toFixed(0)}deg;font-size:${rand(34, 60).toFixed(0)}px`;
    bletter.appendChild(l);
    burst(e.clientX, e.clientY, 10, 80);
    letterKisses++;
    log('letter_kiss', '', letterKisses, 30);
    toast(letterKisses === 1 ? 'mwah! 💋 felt that one.' : `<b>${letterKisses}</b> kisses on my letter. i'm melting 🫠`, 2200);
  });

  // ---------------- counter (neumorphism) ----------------
  const cells = { D: $('#cD'), H: $('#cH'), M: $('#cM'), S: $('#cS') };
  function setCell(k, v) {
    const el = cells[k];
    if (el.textContent === String(v)) return;
    el.textContent = v;
    if (!reduced) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); }
  }
  function tickCounter() {
    const s = Math.max(0, Math.floor((Date.now() - TOGETHER) / 1000));
    setCell('D', Math.floor(s / 86400));
    setCell('H', pad(Math.floor(s % 86400 / 3600)));
    setCell('M', pad(Math.floor(s % 3600 / 60)));
    setCell('S', pad(s % 60));
    $('#beats').textContent = Math.floor(s * 1.2).toLocaleString('en-IN');
  }
  tickCounter();
  setInterval(tickCounter, 1000);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayDiff = d => Math.round((d - today) / 86400000);
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  // monthiversary: the 7th of every month
  let nextM = new Date(today.getFullYear(), today.getMonth(), 7);
  if (nextM < today) nextM = new Date(today.getFullYear(), today.getMonth() + 1, 7);
  const months = (nextM.getFullYear() - 2026) * 12 + nextM.getMonth() - 7;
  const md = dayDiff(nextM);
  $('#monthText').innerHTML = md === 0 && months > 0
    ? `happy <b>${months}-month</b> anniversary, my love!! 🥳 ${months} months of us and i'd do every second again.`
    : `our <b>${months}-month</b> anniversary is in <b>${plural(md, 'day')}</b>. yes, i'm counting. obviously.`;

  // her birthday
  const bdayThisYear = new Date(today.getFullYear(), BDAY.month, BDAY.day);
  const bdayToday = +today === +bdayThisYear;
  let bday = bdayThisYear;
  if (bday < today) bday = new Date(today.getFullYear() + 1, BDAY.month, BDAY.day);
  const bd = dayDiff(bday);
  $('#bdayText').innerHTML = bdayToday
    ? "it's your birthdayyy!! 🎉 today the biggest happiness of my life was born. happy birthday, my love."
    : today > bdayThisYear && today.getMonth() === BDAY.month
      ? '9th november is officially my favourite day of the whole year. it gave the world <b>you</b> 🎂'
      : bd === 1
        ? "your birthday is <b>tomorrow</b> 🎂 i'm more excited than you, i swear."
        : `your birthday is in <b>${plural(bd, 'day')}</b>. clear your schedule, ma'am. i have plans.`;
  if (bdayToday) $('#bdayCard').classList.add('today');

  // ---------------- tabs (glass + liquid indicator) ----------------
  const tabbar = $('.tabbar'), tabs = $$('[role=tab]', tabbar), ind = $('.tab-ind');
  let curTab = tabs[0];
  function placeInd(btn, liquid) {
    const l = btn.offsetLeft, w = btn.offsetWidth;
    if (liquid && !reduced) {
      const l0 = curTab.offsetLeft, w0 = curTab.offsetWidth;
      const L = Math.min(l0, l), R = Math.max(l0 + w0, l + w);
      ind.style.left = `${L}px`; ind.style.width = `${R - L}px`;
      setTimeout(() => { ind.style.left = `${l}px`; ind.style.width = `${w}px`; }, 190);
    } else { ind.style.left = `${l}px`; ind.style.width = `${w}px`; }
  }
  function selectTab(btn, focus) {
    if (btn === curTab) return;
    placeInd(btn, true);
    tabs.forEach(t => {
      const on = t === btn, panel = $(`#${t.getAttribute('aria-controls')}`);
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      panel.hidden = !on;
      if (on) { panel.classList.remove('enter'); void panel.offsetWidth; panel.classList.add('enter'); }
    });
    curTab = btn;
    log('tab', btn.textContent);
    if (focus) btn.focus();
    tabbar.scrollTo({ left: btn.offsetLeft - tabbar.clientWidth / 2 + btn.offsetWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
  }
  tabs.forEach(t => t.addEventListener('click', () => selectTab(t)));
  tabbar.addEventListener('keydown', e => {
    const i = tabs.indexOf(curTab);
    if (e.key === 'ArrowRight') selectTab(tabs[(i + 1) % tabs.length], true);
    else if (e.key === 'ArrowLeft') selectTab(tabs[(i - 1 + tabs.length) % tabs.length], true);
  });
  const placeNow = () => placeInd(curTab, false);
  placeNow();
  if (document.fonts) document.fonts.ready.then(placeNow);
  addEventListener('resize', placeNow);

  // photo stacks: tap the top one to shuffle
  const gallery = COLLAGE.map(p => ({ src: `img/m/${p.id}.webp`, cap: p.cap }));
  const ROTS = [-3, 5, -8, 7];
  $$('.stack').forEach(st => {
    const items = st.dataset.photos.split(';').map(s => { const [id, cap] = s.split('|'); return { id, cap }; });
    const order = items.map((it, k) => {
      const img = document.createElement('img');
      img.src = `img/m/${it.id}.webp`;
      img.alt = `arushi: ${it.cap}`;
      img.loading = 'lazy';
      img.draggable = false;
      img.style.setProperty('--k', k);
      st.appendChild(img);
      gallery.push({ src: img.getAttribute('src'), cap: it.cap });
      return img;
    });
    const layout = () => order.forEach((img, k) => {
      img.style.zIndex = order.length - k;
      img.style.setProperty('--rr', `${ROTS[k] || 0}deg`);
      img.classList.toggle('top', k === 0);
    });
    layout();
    const zoom = document.createElement('button');
    zoom.className = 'stack-zoom';
    zoom.setAttribute('aria-label', 'open this photo');
    zoom.textContent = '🔍';
    zoom.addEventListener('click', () => openLightbox(order[0].getAttribute('src')));
    st.appendChild(zoom);
    if (order.length > 1) {
      st.insertAdjacentHTML('beforeend', '<p class="stack-hint">tap the photo to shuffle ♡</p>');
      let busy = false;
      st.addEventListener('click', e => {
        const img = e.target.closest('img');
        if (!img || img !== order[0] || busy) return;
        busy = true;
        img.classList.add('fly');
        setTimeout(() => {
          order.push(order.shift());
          layout();
          img.classList.remove('fly');
          busy = false;
        }, reduced ? 10 : 380);
      });
    } else {
      st.addEventListener('click', e => { if (e.target.tagName === 'IMG') openLightbox(order[0].getAttribute('src')); });
    }
  });
  const finalImg = $('.final-photo img');
  gallery.push({ src: finalImg.getAttribute('src'), cap: finalImg.dataset.cap });
  finalImg.addEventListener('click', () => openLightbox(finalImg.getAttribute('src')));

  // ---------------- lightbox (her retro cam) ----------------
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbTime = $('#lbTime');
  let lbIdx = 0, lastFocus = null;
  function stamp() {
    const d = new Date();
    const h = d.getHours() % 12 || 12, ap = d.getHours() < 12 ? 'am' : 'pm';
    const mon = d.toLocaleString('en-GB', { month: 'short' });
    return `${h}:${pad(d.getMinutes())} ${ap}\n${d.getDate()} ${mon} ${d.getFullYear()}`;
  }
  function showLb(i) {
    lbIdx = (i + gallery.length) % gallery.length;
    const g = gallery[lbIdx];
    lbImg.style.opacity = 0;
    lbImg.onload = () => { lbImg.style.transition = 'opacity .3s'; lbImg.style.opacity = 1; };
    lbImg.src = g.src;
    lbImg.alt = `arushi: ${g.cap}`;
    lbCap.textContent = g.cap;
    lbTime.textContent = stamp();
  }
  function openModal(m) {
    lastFocus = document.activeElement;
    m.hidden = false;
    void m.offsetWidth;
    m.classList.add('show');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeModal(m) {
    m.classList.remove('show');
    document.documentElement.style.overflow = '';
    setTimeout(() => { m.hidden = true; }, 350);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  function openLightbox(src) {
    showLb(Math.max(0, gallery.findIndex(g => g.src === src)));
    log('photo', gallery[lbIdx].cap, '', 60);
    openModal(lb);
    $('#lbClose').focus({ preventScroll: true });
  }
  $('#lbClose').addEventListener('click', () => closeModal(lb));
  $('#lbPrev').addEventListener('click', () => showLb(lbIdx - 1));
  $('#lbNext').addEventListener('click', () => showLb(lbIdx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeModal(lb); });
  let swipeX = null;
  lb.addEventListener('pointerdown', e => { swipeX = e.clientX; });
  lb.addEventListener('pointerup', e => {
    if (swipeX === null) return;
    const dx = e.clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) > 50) showLb(lbIdx + (dx < 0 ? 1 : -1));
  });

  // ---------------- birthday games ----------------
  const gtabs = $$('.gpick [role=tab]');
  let curG = gtabs[0];
  function selectGame(btn, focus) {
    if (btn === curG) return;
    gtabs.forEach(t => {
      const on = t === btn, panel = $(`#${t.getAttribute('aria-controls')}`);
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      panel.hidden = !on;
      if (on) { panel.classList.remove('enter'); void panel.offsetWidth; panel.classList.add('enter'); }
    });
    curG = btn;
    log('game', btn.textContent.trim());
    if (focus) btn.focus();
    if (btn.id === 'g-scratch') paintScratch();
  }
  gtabs.forEach(t => t.addEventListener('click', () => selectGame(t)));
  $('.gpick').addEventListener('keydown', e => {
    const i = gtabs.indexOf(curG);
    if (e.key === 'ArrowRight') selectGame(gtabs[(i + 1) % gtabs.length], true);
    else if (e.key === 'ArrowLeft') selectGame(gtabs[(i - 1 + gtabs.length) % gtabs.length], true);
  });

  // 1. nine balloons, nine reasons
  const balloonsEl = $('#balloons'), bCount = $('#bCount'), bEnd = $('#bEnd');
  let bPopped = 0;
  function buildBalloons() {
    balloonsEl.innerHTML = '';
    bPopped = 0;
    bCount.textContent = `0 / ${REASONS.length} popped`;
    bEnd.hidden = true;
    REASONS.forEach((reason, i) => {
      const slot = document.createElement('div');
      slot.className = 'bslot';
      const b = document.createElement('button');
      b.className = 'balloon';
      b.style.cssText = `--bc:${BCOL[i]};--t:${rand(2.8, 3.8).toFixed(2)}s;--d:${(-rand(0, 3)).toFixed(2)}s`;
      b.setAttribute('aria-label', `pop balloon ${i + 1}`);
      const tag = document.createElement('p');
      tag.className = 'btag';
      tag.innerHTML = `<span>reason #${i + 1}</span>`;
      tag.append(reason);
      b.addEventListener('click', () => {
        if (slot.classList.contains('open')) return;
        confetti({ particleCount: 28, spread: 75, startVelocity: 24, scalar: .8, ticks: 140, origin: at(b), colors: [BCOL[i], '#ffffff', '#ffd166'] });
        slot.classList.add('open');
        b.setAttribute('aria-label', `balloon ${i + 1} popped: ${reason}`);
        bPopped++;
        log('balloon', reason, `#${i + 1}`);
        bCount.textContent = `${bPopped} / ${REASONS.length} popped`;
        if (bPopped === REASONS.length) setTimeout(() => {
          bEnd.hidden = false;
          log('balloons_all');
          heartsConf({ particleCount: 90, spread: 120, origin: at(balloonsEl) });
        }, 600);
      });
      slot.append(b, tag);
      balloonsEl.appendChild(slot);
    });
  }
  buildBalloons();
  $('#bAgain').addEventListener('click', buildBalloons);

  // 2. the scratch card
  const sc = $('#scratchCvs'), sctx = sc.getContext('2d');
  let scPainted = false, scDone = false, scDown = false, scLast = null, scMoves = 0;
  function paintScratch() {
    if (scPainted) return;
    const r = sc.getBoundingClientRect();
    if (!r.width) return;
    scPainted = true;
    const dpr = Math.min(devicePixelRatio || 1, 2), w = r.width, h = r.height;
    sc.width = Math.round(w * dpr);
    sc.height = Math.round(h * dpr);
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const g = sctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#f5b3c7'); g.addColorStop(.3, '#ffe4ec'); g.addColorStop(.5, '#e796ae'); g.addColorStop(.75, '#ffd9e4'); g.addColorStop(1, '#eda2b9');
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 420; i++) {
      sctx.fillStyle = `rgba(255,255,255,${rand(.15, .75).toFixed(2)})`;
      sctx.fillRect(rand(0, w), rand(0, h), 1.6, 1.6);
    }
    sctx.textAlign = 'center';
    sctx.fillStyle = 'rgba(190,30,80,.16)';
    sctx.font = '22px sans-serif';
    for (let y = 30, row = 0; y < h + 20; y += 46, row++) for (let x = row % 2 ? 50 : 20; x < w + 20; x += 60) sctx.fillText('♥', x, y);
    sctx.fillStyle = 'rgba(255,250,252,.82)';
    sctx.beginPath();
    sctx.roundRect ? sctx.roundRect(w / 2 - 138, h / 2 - 50, 276, 100, 22) : sctx.rect(w / 2 - 138, h / 2 - 50, 276, 100);
    sctx.fill();
    sctx.fillStyle = '#b8264f';
    sctx.font = '700 30px Fredoka, sans-serif';
    sctx.fillText('scratch me ✨', w / 2, h / 2 - 6);
    sctx.font = '700 23px Caveat, cursive';
    sctx.fillText('your birthday gift is under here', w / 2, h / 2 + 28);
  }
  function scratchAt(x, y) {
    const r = sc.getBoundingClientRect(), px = x - r.left, py = y - r.top;
    sctx.globalCompositeOperation = 'destination-out';
    sctx.lineWidth = 46;
    sctx.lineCap = sctx.lineJoin = 'round';
    sctx.beginPath();
    sctx.moveTo(...(scLast || [px - .1, py]));
    sctx.lineTo(px, py);
    sctx.stroke();
    sctx.globalCompositeOperation = 'source-over';
    scLast = [px, py];
    if (++scMoves % 10 === 0) checkScratch();
  }
  function checkScratch() {
    if (scDone || !sc.width) return;
    const d = sctx.getImageData(0, 0, sc.width, sc.height).data;
    let clear = 0, n = 0;
    for (let i = 3; i < d.length; i += 4 * 23) { n++; if (d[i] < 128) clear++; }
    if (clear / n > .5) finishScratch();
  }
  function finishScratch() {
    scDone = true;
    log('scratch_done');
    sc.classList.add('gone');
    $('#scratchTxt').textContent = "yayyy 🎉 screenshot it and send it to me. it's legally binding 📸";
    heartsConf({ particleCount: 90, spread: 100, startVelocity: 38, origin: at(sc) });
  }
  sc.addEventListener('pointerdown', e => {
    if (scDone) return;
    paintScratch();
    scDown = true;
    scLast = null;
    try { sc.setPointerCapture(e.pointerId); } catch {}
    scratchAt(e.clientX, e.clientY);
  });
  sc.addEventListener('pointermove', e => { if (scDown) scratchAt(e.clientX, e.clientY); });
  const scUp = () => { if (!scDown) return; scDown = false; scLast = null; checkScratch(); };
  sc.addEventListener('pointerup', scUp);
  sc.addEventListener('pointercancel', scUp);

  // 3. find the pairs
  const pairsEl = $('#pairs'), pEnd = $('#pEnd');
  let pFirst = null, pLock = false, pMoves = 0, pFound = 0;
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function pairsText() {
    $('#pFound').textContent = `${pFound} / ${PAIR_IDS.length} pairs`;
    $('#pMoves').textContent = plural(pMoves, 'move');
  }
  function buildPairs() {
    pairsEl.innerHTML = '';
    pFirst = null; pLock = false; pMoves = 0; pFound = 0;
    pEnd.hidden = true;
    pairsText();
    shuffle([...PAIR_IDS, ...PAIR_IDS]).forEach((id, i) => {
      const c = document.createElement('button');
      c.className = 'pcard';
      c.dataset.id = id;
      c.setAttribute('aria-label', `card ${i + 1}, face down`);
      c.innerHTML = `<span class="pi"><span class="pface pback">A♡</span><span class="pface pfront" style="background-image:url(img/t/${id}.webp)"></span></span>`;
      c.addEventListener('click', () => flipCard(c, i));
      pairsEl.appendChild(c);
    });
  }
  function flipCard(c, i) {
    if (pLock || c === pFirst || c.classList.contains('done')) return;
    c.classList.add('flip');
    c.setAttribute('aria-label', `card ${i + 1}, a photo of arushi`);
    if (!pFirst) { pFirst = c; return; }
    const a = pFirst;
    pFirst = null;
    pMoves++;
    if (a.dataset.id === c.dataset.id) {
      a.classList.add('done');
      c.classList.add('done');
      pFound++;
      heartsConf({ particleCount: 16, spread: 60, startVelocity: 18, scalar: 1.2, ticks: 120, origin: at(c) });
      if (pFound === PAIR_IDS.length) setTimeout(() => {
        $('#pWinTxt').textContent = `you found every pair in ${plural(pMoves, 'move')} 🎉`;
        pEnd.hidden = false;
        log('pairs_win', '', pMoves);
        cannons(1300);
      }, 650);
    } else {
      pLock = true;
      setTimeout(() => {
        [a, c].forEach(x => { x.classList.remove('flip'); x.setAttribute('aria-label', 'card, face down'); });
        pLock = false;
      }, 850);
    }
    pairsText();
  }
  buildPairs();
  $('#pAgain').addEventListener('click', buildPairs);

  // ---------------- open when… (claymorphism) ----------------
  const readLetters = store.get('arushi-read', []);
  const grid = $('#clayGrid'), modal = $('#letterModal');
  LETTERS.forEach((l, i) => {
    const b = document.createElement('button');
    b.className = `clay rv${readLetters.includes(i) ? ' read' : ''}`;
    b.style.cssText = `--c:${l.c};--cs:${l.s}`;
    b.innerHTML = `<span class="clay-emoji" style="--d:${(i * .4).toFixed(1)}s">${l.e}</span><span class="clay-label">${l.t}</span>`;
    b.addEventListener('click', e => {
      $('#letterTitle').textContent = `${l.t}…`;
      log('openwhen', l.t);
      $('#letterBody').textContent = l.b;
      openModal(modal);
      $('#letterClose').focus({ preventScroll: true });
      burst(e.clientX, e.clientY, 10, 90);
      if (!readLetters.includes(i)) { readLetters.push(i); store.set('arushi-read', readLetters); b.classList.add('read'); }
    });
    grid.appendChild(b);
  });
  $('#letterClose').addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });

  addEventListener('keydown', e => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeModal(lb);
      else if (e.key === 'ArrowRight') showLb(lbIdx + 1);
      else if (e.key === 'ArrowLeft') showLb(lbIdx - 1);
    } else if (!modal.hidden && e.key === 'Escape') closeModal(modal);
  });

  // ---------------- love-o-meter: fills, swells, explodes ----------------
  const flask = $('#flask'), fsvg = $('svg', flask), liquid = $('#liquid'), pctEl = $('#pct'), read = $('#meterRead'), measureBtn = $('#measure');
  const crackPaths = $$('.cracks path', flask);
  const HP = $('#hp').getAttribute('d');
  const HEART_URI = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 184"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7aa2"/><stop offset="1" stop-color="#d81b56"/></linearGradient><radialGradient id="b" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><path d="${HP}" fill="url(#a)"/><path d="${HP}" fill="url(#b)"/><path d="${HP}" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M34 44c-9 10-12 24-8 40" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="7" stroke-linecap="round"/></svg>`)}")`;
  let level = 0;
  function setLevel(v) { level = v; liquid.setAttribute('transform', `translate(0 ${(184 - v * 178).toFixed(1)})`); }
  function fill(to, ms, p0, p1) {
    return new Promise(res => {
      const from = level, t0 = performance.now();
      (function f(t) {
        const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
        setLevel(from + (to - from) * e);
        if (p1 != null) pctEl.textContent = `${Math.round(p0 + (p1 - p0) * e)}%`;
        if (k < 1) requestAnimationFrame(f); else res();
      })(t0);
    });
  }
  function overcharge(ms) {
    return new Promise(res => {
      const t0 = performance.now();
      (function f(t) {
        const k = Math.min(1, (t - t0) / ms), j = reduced ? 0 : 7 * k * k;
        pctEl.textContent = `${Math.round(100 + 99899 * k * k * k).toLocaleString('en-IN')}%`;
        fsvg.style.transform = `translate(${rand(-j, j).toFixed(1)}px, ${rand(-j, j).toFixed(1)}px) scale(${(1 + .22 * k + Math.sin(t / 55) * .035 * k).toFixed(3)})`;
        fsvg.style.filter = `drop-shadow(0 0 ${Math.round(34 * k)}px rgba(255, 70, 130, ${(.35 + .55 * k).toFixed(2)})) brightness(${(1 + .3 * k).toFixed(2)})`;
        crackPaths.forEach((p, i) => { p.style.strokeDashoffset = 80 * (1 - Math.min(1, Math.max(0, k * 1.7 - i * .14))); });
        if (k < 1) requestAnimationFrame(f); else res();
      })(t0);
    });
  }
  // the heart breaks into real pieces of itself: each shard is the heart, clipped to one wedge
  function shatter(r) {
    const P = [50, 47], N = reduced ? 6 : 12;
    const angs = Array.from({ length: N + 1 }, (_, i) => (i + (i % N ? rand(-.3, .3) : 0)) / N * Math.PI * 2);
    const ring = angs.map(() => rand(20, 32));
    ring[N] = ring[0];
    const pt = (a, d) => [P[0] + Math.cos(a) * d, P[1] + Math.sin(a) * d];
    const polys = [];
    for (let i = 0; i < N; i++) {
      const a0 = angs[i], a1 = angs[i + 1], mid = pt((a0 + a1) / 2, (ring[i] + ring[i + 1]) / 2 + rand(-5, 5));
      const A0 = pt(a0, ring[i]), A1 = pt(a1, ring[i + 1]);
      polys.push([P, A0, mid, A1], [A0, pt(a0, 170), pt(a1, 170), A1, mid]);
    }
    const pieces = polys.map((poly, k) => {
      const el = document.createElement('div');
      el.className = 'shard';
      el.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;background-image:${HEART_URI};clip-path:polygon(${poly.map(p => `${p[0].toFixed(1)}% ${p[1].toFixed(1)}%`).join(',')})`;
      const cl = poly.map(p => [Math.min(100, Math.max(0, p[0])), Math.min(100, Math.max(0, p[1]))]);
      const cx = cl.reduce((s, p) => s + p[0], 0) / cl.length, cy = cl.reduce((s, p) => s + p[1], 0) / cl.length;
      el.style.transformOrigin = `${cx.toFixed(1)}% ${cy.toFixed(1)}%`;
      const dx = cx - P[0], dy = cy - P[1], len = Math.hypot(dx, dy) || 1, sp = rand(.35, .8) * (k % 2 ? 1.25 : .85);
      document.body.appendChild(el);
      return { el, vx: dx / len * sp, vy: dy / len * sp - .35, vr: rand(-.45, .45) };
    });
    const t0 = performance.now(), dur = 1600;
    (function f(t) {
      const e = t - t0, k = Math.min(1, e / dur);
      for (const p of pieces) {
        p.el.style.transform = `translate(${(p.vx * e).toFixed(1)}px, ${(p.vy * e + .0011 * e * e).toFixed(1)}px) rotate(${(p.vr * e).toFixed(1)}deg) scale(${(1 - .35 * k).toFixed(3)})`;
        p.el.style.opacity = k < .5 ? 1 : (1 - (k - .5) / .5).toFixed(3);
      }
      if (k < 1) requestAnimationFrame(f); else pieces.forEach(p => p.el.remove());
    })(t0);
  }
  function explode() {
    const r = fsvg.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height * .47;
    const origin = { x: cx / innerWidth, y: cy / innerHeight };
    flask.classList.add('gone');
    try { navigator.vibrate && navigator.vibrate([90, 40, 180]); } catch {}
    const fl = document.createElement('div');
    fl.className = 'flash';
    fl.style.cssText = `--x:${cx}px;--y:${cy}px`;
    document.body.appendChild(fl);
    fl.addEventListener('animationend', () => fl.remove(), { once: true });
    [0, 160].forEach(d => setTimeout(() => {
      const s = document.createElement('div');
      s.className = 'shock';
      s.style.left = `${cx}px`;
      s.style.top = `${cy}px`;
      document.body.appendChild(s);
      s.addEventListener('animationend', () => s.remove(), { once: true });
    }, d));
    if (!reduced) { document.body.classList.add('quake'); setTimeout(() => document.body.classList.remove('quake'), 600); }
    shatter(r);
    heartsConf({ particleCount: 150, spread: 360, startVelocity: 55, gravity: .85, ticks: 300, origin });
    confetti({ particleCount: 120, spread: 360, startVelocity: 42, ticks: 260, origin });
    for (let i = 0; i < 26; i++) {
      const a = rand(0, Math.PI * 2), d = rand(140, 420);
      particle(cx, cy, Math.cos(a) * d, Math.sin(a) * d, { ch: pick(['💗', '💖', '💕', '💘', '✨']), size: rand(18, 34), dur: rand(1.1, 1.8) });
    }
    setTimeout(() => cannons(1500), 350);
  }
  async function measure() {
    measureBtn.disabled = true;
    log('measure');
    flask.classList.remove('inf', 'reform', 'gone');
    crackPaths.forEach(p => { p.style.strokeDashoffset = ''; });
    await fill(0, 400, parseInt(pctEl.textContent, 10) || 0, 0);
    flask.classList.add('filling');
    const steps = [
      ['calibrating the love-o-meter…', null, 800],
      ['hmm, 27%… just warming up', .27, 27],
      ['64%… okay okay 👀', .64, 64],
      ["100%… wait. it's still going??", 1, 100],
    ];
    let p = 0;
    for (const [txt, lvl, val] of steps) {
      read.textContent = txt;
      if (lvl === null) { await sleep(val); continue; }
      await fill(lvl, 900, p, val);
      p = val;
      await sleep(380);
    }
    read.textContent = '250%… 999%… uh oh. the heart is swelling 😳';
    await overcharge(2600);
    explode();
    read.innerHTML = '<b>💥 BOOM. ERROR: love overflow</b>';
    await sleep(1900);
    flask.classList.remove('gone', 'filling');
    fsvg.style.transform = '';
    fsvg.style.filter = '';
    crackPaths.forEach(cp => { cp.style.strokeDashoffset = ''; });
    setLevel(1);
    pctEl.textContent = '∞';
    void flask.offsetWidth;
    flask.classList.add('reform', 'inf');
    read.textContent = "it exploded. turns out my love for you doesn't fit inside anything, not even a heart. i just love you like i love you ♡";
    measureBtn.textContent = 'measure again 💥';
    measureBtn.disabled = false;
  }
  measureBtn.addEventListener('click', measure);

  // ---------------- coupons (skeuomorphism) ----------------
  const used = store.get('arushi-coupons', []);
  const list = $('#couponList');
  COUPONS.forEach((c, i) => {
    const b = document.createElement('button');
    b.className = `coupon rv${used.includes(i) ? ' used' : ''}`;
    b.innerHTML = `<span class="ticket" style="--sc:${c.c}"><span class="c-stub">${c.e}</span><span class="c-body"><b class="c-title">${c.t}</b><span class="c-desc">${c.d}</span><span class="c-meta">No. 00${i + 1} · valid forever · only for arushi</span></span></span><span class="stamp">redeemed ♥</span>`;
    b.setAttribute('aria-pressed', used.includes(i));
    b.addEventListener('click', e => {
      const on = !b.classList.contains('used');
      b.classList.toggle('used', on);
      b.setAttribute('aria-pressed', on);
      const k = used.indexOf(i);
      if (on && k < 0) used.push(i); else if (!on && k >= 0) used.splice(k, 1);
      store.set('arushi-coupons', used);
      log('coupon', c.t, on ? 'redeemed' : 'given back');
      if (on) {
        burst(e.clientX, e.clientY, 14, 120);
        toast('redeemed! now <b>screenshot this</b> and send it to me 📸', 3200);
      } else toast("okay okay, it's back. coupons for you never really run out ♡", 3000);
    });
    list.appendChild(b);
  });

  // ---------------- night sky: wish lanterns ----------------
  const wishSec = $('#wish'), sky = $('#sky'), wishForm = $('#wishForm'), wishIn = $('#wishIn'), wishMsg = $('#wishMsg');
  const wishes = store.get('arushi-wishes', []);
  const starsEl = $('#stars');
  for (let i = 0; i < (innerWidth < 720 ? 55 : 95); i++) {
    const s = document.createElement('i');
    s.style.cssText = `left:${rand(0, 100).toFixed(1)}%;top:${rand(18, 99).toFixed(1)}%;--s:${rand(1, 2.6).toFixed(1)}px;--t:${rand(2, 5).toFixed(1)}s;--d:${(-rand(0, 5)).toFixed(1)}s;opacity:${rand(.35, 1).toFixed(2)}`;
    starsEl.appendChild(s);
  }
  const lanternEl = text => {
    const l = document.createElement('div');
    l.className = 'lantern';
    l.innerHTML = '<span class="l-body"><em></em></span><span class="l-fire"></span>';
    l.querySelector('em').textContent = text;
    return l;
  };
  if (!reduced) {
    for (let i = 0; i < (innerWidth < 720 ? 5 : 9); i++) {
      const l = lanternEl('');
      l.classList.add('amb');
      l.style.cssText = `left:${rand(4, 96).toFixed(1)}%;--s:${rand(.28, .6).toFixed(2)};--t:${rand(28, 46).toFixed(1)}s;--d:${(-rand(0, 46)).toFixed(1)}s;--sw:${rand(-40, 40).toFixed(0)}px`;
      sky.appendChild(l);
    }
  }
  // every wish she sends becomes a star that stays in her sky
  const starPos = i => {
    const a = Math.sin(i * 12.9898 + 4.1) * 43758.5453, b = Math.sin(i * 78.233 + 1.7) * 12345.678;
    return [8 + (a - Math.floor(a)) * 84, 21 + (b - Math.floor(b)) * 15];
  };
  function addStar(i, fresh) {
    const [x, y] = starPos(i);
    const s = document.createElement('span');
    s.className = `wstar${fresh ? ' fresh' : ''}`;
    s.textContent = '✦';
    s.style.cssText = `left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;--d:${(-rand(0, 3)).toFixed(1)}s`;
    sky.appendChild(s);
  }
  wishes.forEach((_, i) => addStar(i, false));
  const WMSG = [
    "sent ✓ the sky has your wish now. i'll take care of the rest ♡",
    "another one up there ✨ i'm working on all of them, promise.",
    'the sky is filling up with your wishes. i love that so much 🥹',
    'okay greedy girl 😂 keep going. every single one.',
  ];
  function release(text) {
    const sr = wishSec.getBoundingClientRect(), fr = wishForm.getBoundingClientRect();
    const i = wishes.length;
    wishes.push(text);
    log('wish', text);
    store.set('arushi-wishes', wishes);
    const [sx, sy] = starPos(i);
    const x0 = fr.left + fr.width / 2 - sr.left, y0 = fr.top - sr.top - 92;
    const dx = sx / 100 * sr.width - x0, dy = sy / 100 * sr.height - y0 - 38;
    const l = lanternEl(text);
    l.style.left = `${x0}px`;
    l.style.top = `${y0}px`;
    sky.appendChild(l);
    const kf = [0, .2, .4, .6, .8, 1].map(k => ({
      offset: k,
      opacity: k === 0 ? 0 : k === 1 ? 0 : 1,
      transform: `translate(${(dx * k + Math.sin(k * Math.PI * 3) * 28 * (1 - k)).toFixed(1)}px, ${(dy * k + (k === 0 ? 30 : 0)).toFixed(1)}px) scale(${(1 - .8 * k).toFixed(3)}) rotate(${(Math.sin(k * 10) * 6).toFixed(1)}deg)`,
    }));
    const an = l.animate(kf, { duration: reduced ? 1200 : 9000, easing: 'cubic-bezier(.3,.05,.5,1)', fill: 'forwards' });
    an.onfinish = () => { l.remove(); addStar(i, true); };
    wishMsg.innerHTML = '';
    wishMsg.append(WMSG[Math.min(i, WMSG.length - 1)]);
    wishMsg.insertAdjacentHTML('beforeend', `<br><b>${plural(wishes.length, 'wish')}</b> in your sky ✨`.replace('wishs', 'wishes'));
  }
  wishForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = wishIn.value.trim() || 'a secret wish 🤫';
    wishIn.value = '';
    wishIn.blur();
    const top = wishSec.getBoundingClientRect().top + scrollY + wishSec.offsetHeight * .08;
    if (Math.abs(scrollY - top) > 40) scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    setTimeout(() => release(text), Math.abs(scrollY - top) > 40 ? 650 : 0);
  });
  $$('#wishChips button').forEach(b => b.addEventListener('click', () => {
    wishIn.value = b.textContent;
    if (fine) wishIn.focus();
  }));

  // ---------------- her reply to my letter ----------------
  const reply = $('#reply'), replyIn = $('#replyIn'), replySent = $('#replySent');
  reply.addEventListener('submit', e => {
    e.preventDefault();
    const text = replyIn.value.trim();
    if (!text) { replySent.textContent = 'write me something first, babyyy 🥺'; replyIn.focus(); return; }
    log('reply', text);
    replyIn.blur();
    heartsConf({ particleCount: 70, spread: 90, startVelocity: 34, origin: at(reply) });
    reply.classList.add('flyaway');
    setTimeout(() => {
      reply.classList.remove('flyaway');
      replyIn.value = '';
      replySent.textContent = "sent ✓✓ i'm going to read it a hundred times 🥹 write another one whenever you want.";
    }, 1100);
  });

  // ---------------- how's her heart ----------------
  const MOODS = {
    'crying happy tears': "noooo don't cry 🥹 okay, cry a little. then come here. hug.",
    'feeling so so loved': "good. that's the whole point of me 🥰 you'll feel this every day.",
    'blushing like crazy': 'hehe mission successful 😌 my favourite colour is you, blushing.',
    "you're so cheesy omg": "cheesy? i'm literally a whole pizza for you 🍕 deal with it.",
    'i love you more': 'impossible. not allowed. i love you mostest 😘 (i win)',
  };
  $$('#moodRow button').forEach(b => b.addEventListener('click', e => {
    $$('#moodRow button').forEach(x => x.classList.toggle('on', x === b));
    $('#moodSay').textContent = MOODS[b.dataset.m];
    burst(e.clientX, e.clientY, 14, 120);
    log('mood', b.dataset.m);
  }));

  // ---------------- finale ----------------
  const m1 = "happy birthday, Arushi ♡ i love you so much ♡ you're my everything ♡ you are my world ♡ i love you till the end ♡ i love you like i love you ♡ ";
  const m2 = 'birthday girl ✦ my kuchu puchu ✦ meri rasmalai ✦ my world ✦ till the end ✦ ';
  $('.m1 .track').textContent = m1.repeat(2);
  $('.m2 .track').textContent = m2.repeat(5);

  let kisses = 0;
  const kissStatus = $('#kissStatus');
  $('#kissBtn').addEventListener('click', () => {
    kisses++;
    log('kiss', '', kisses, 40);
    for (let i = 0; i < 14; i++) {
      setTimeout(() => {
        const k = document.createElement('span');
        k.className = 'kiss';
        k.textContent = '💋';
        k.style.cssText = `left:${rand(4, 88)}vw;top:${rand(8, 82)}vh;--s:${rand(34, 82)}px;--rot:${rand(-35, 35)}deg`;
        document.body.appendChild(k);
        k.addEventListener('animationend', () => k.remove(), { once: true });
      }, i * 70);
    }
    kissStatus.textContent = 'sending… 💌';
    setTimeout(() => { kissStatus.textContent = 'kiss delivered ✓✓'; }, 700);
    setTimeout(() => {
      kissStatus.innerHTML = `seen <span class="ticks">✓✓</span> · he's blushing rn (${kisses} ${kisses === 1 ? 'kiss' : 'kisses'} sent)`;
    }, 1800);
  });

  // ---------------- floating hearts and balloons you can pop ----------------
  const cvs = $('#hearts'), ctx = cvs.getContext('2d');
  let W = 0, H = 0;
  const COUNT = reduced ? 6 : innerWidth < 720 ? 13 : 22;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cvs.width = W * dpr; cvs.height = H * dpr;
    cvs.style.width = `${W}px`; cvs.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener('resize', () => { resize(); stringLights(); });
  const mk = init => {
    const b = Math.random() < .22, s = b ? rand(26, 40) : rand(12, 28);
    return {
      b, x: rand(0, W), y: init ? rand(0, H) : H + s * 2 + rand(0, 140), s,
      vy: rand(.25, .65) * (reduced ? .25 : 1), ph: rand(0, 6.28), sp: rand(.008, .02),
      amp: rand(10, 30), rot: rand(-.4, .4), c: b ? pick(BCOL) : pick(HCOL), a: b ? rand(.55, .8) : rand(.35, .7), cx: 0, cy: 0,
    };
  };
  const hearts = Array.from({ length: COUNT }, () => mk(true));
  function drawHeart(h) {
    ctx.save();
    ctx.translate(h.cx, h.cy);
    ctx.rotate(h.rot + Math.sin(h.ph) * .15);
    const k = h.s / 32;
    ctx.scale(k, k);
    ctx.globalAlpha = h.a;
    ctx.fillStyle = h.c;
    ctx.beginPath();
    ctx.moveTo(0, 14);
    ctx.bezierCurveTo(-4, 10, -16, 2, -16, -6);
    ctx.bezierCurveTo(-16, -13, -10, -17, -5, -17);
    ctx.bezierCurveTo(-2, -17, 0, -15, 0, -12);
    ctx.bezierCurveTo(0, -15, 2, -17, 5, -17);
    ctx.bezierCurveTo(10, -17, 16, -13, 16, -6);
    ctx.bezierCurveTo(16, 2, 4, 10, 0, 14);
    ctx.fill();
    ctx.globalAlpha = h.a * .75;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(-8, -9, 3.6, 2.2, -.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  function drawBalloon(h) {
    const rx = h.s * .42, ry = h.s * .52;
    ctx.save();
    ctx.translate(h.cx, h.cy);
    ctx.rotate(Math.sin(h.ph) * .08);
    ctx.globalAlpha = h.a;
    ctx.strokeStyle = 'rgba(150, 80, 110, .5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, ry + 4);
    ctx.quadraticCurveTo(7, ry + h.s * .5, -2, ry + h.s * 1.15);
    ctx.stroke();
    ctx.fillStyle = h.c;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-3.5, ry + 5);
    ctx.lineTo(3.5, ry + 5);
    ctx.lineTo(0, ry - 1);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, .75)';
    ctx.beginPath();
    ctx.ellipse(-rx * .38, -ry * .42, rx * .2, ry * .14, -.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  (function frame() {
    ctx.clearRect(0, 0, W, H);
    for (const h of hearts) {
      h.y -= h.vy;
      h.ph += h.sp;
      h.cx = h.x + Math.sin(h.ph) * h.amp;
      h.cy = h.y;
      if (h.y < -h.s * 2) Object.assign(h, mk(false));
      (h.b ? drawBalloon : drawHeart)(h);
    }
    requestAnimationFrame(frame);
  })();

  let popped = 0;
  function tryPop(x, y) {
    let best = null, bd2 = 1e9;
    for (const h of hearts) {
      const d = Math.hypot(h.cx - x, h.cy - y);
      if (d < h.s * (h.b ? .6 : .8) + 16 && d < bd2) { best = h; bd2 = d; }
    }
    if (!best) return false;
    burst(best.cx, best.cy, best.b ? 16 : 12, best.b ? 110 : 90, best.c);
    Object.assign(best, mk(false));
    popped++;
    log(best.b ? 'float_balloon' : 'heart', POPS[(popped - 1) % POPS.length], popped, 40);
    toast(`<b>♥ ${popped}</b> · ${POPS[(popped - 1) % POPS.length]}`);
    return true;
  }
  addEventListener('pointerdown', e => {
    if (!entered) return;
    if (e.target.closest('a,button,input,form,.pola,.stack,.lightbox,.modal,.dock,.scratch,.name,.bletter')) return;
    if (!tryPop(e.clientX, e.clientY)) burst(e.clientX, e.clientY, 6, 55);
  });

  // a trail of tiny hearts behind the mouse
  if (fine && !reduced) {
    let last = 0;
    addEventListener('pointermove', e => {
      const t = performance.now();
      if (!entered || t - last < 70) return;
      last = t;
      particle(e.clientX, e.clientY, rand(-14, 14), rand(-50, -26), { size: rand(9, 14), dur: .85, ch: '♥' });
    });
  }

  // ---------------- dock: follows you down the page ----------------
  const dockLinks = $$('.dock a'), dockInd = $('.dock-ind');
  let active = null;
  function spy() {
    const vis = dockLinks.filter(a => a.offsetParent !== null);
    const mid = innerHeight * .42;
    let a = vis[0];
    vis.forEach(l => { if ($(l.getAttribute('href')).getBoundingClientRect().top <= mid) a = l; });
    if (a === active) return;
    active = a;
    dockInd.style.left = `${a.offsetLeft}px`;
    dockLinks.forEach(l => (l === a ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
  }
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      spy();
      if (!reduced && scrollY < innerHeight * 1.2) hero.style.setProperty('--sy', scrollY.toFixed(0));
    });
  }, { passive: true });
  addEventListener('resize', () => { active = null; spy(); });

  // ---------------- reveal on scroll ----------------
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  $$('section').forEach(sec => $$('.rv', sec).forEach((el, i) => { el.style.setProperty('--i', Math.min(i, 8)); io.observe(el); }));

  // ---------------- the browser tab misses her too ----------------
  const TITLES = ['happy birthday arushi 🎂', 'my birthday girl ♡', 'my everything ♡', 'i love you, arushi ♡'];
  let ti = 0;
  setInterval(() => { if (!document.hidden && !gateOn) document.title = TITLES[++ti % TITLES.length]; }, 3500);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { document.title = 'come back arushiii 🥺'; setFav('🥺'); }
    else { document.title = gateOn ? 'shhh… not yet 🤫' : "yayy you're back 💗"; setFav(gateOn ? '🎁' : '🎂'); }
  });
})();
