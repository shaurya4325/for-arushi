/* after the candles: a little story. he kneels with a flower, she gasps, lifts him up, they hug, the light comes in. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const G = 300; // the ground line
  const C = {
    skin: '#f3c7a5', skin2: '#e8b08c', hairB: '#2b2230', hairG: '#2f2228',
    shirt: '#34406b', shirt2: '#2a3459', pants: '#272436', shoe: '#1d1a26',
    dress: '#ff8fb0', dress2: '#f06f98', gshoe: '#d94f7c', blush: '#ff7aa2', ink: '#3a2030',
  };
  const svgEl = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };

  // two-bone ik: from joint a to target t, returns the middle joint and the reached end
  function ik(ax, ay, tx, ty, l1, l2, bend) {
    const dx = tx - ax, dy = ty - ay;
    const d = Math.max(.01, Math.min(Math.hypot(dx, dy), l1 + l2 - .01));
    const A = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
    const ang = Math.atan2(dy, dx) + bend * A;
    const jx = ax + l1 * Math.cos(ang), jy = ay + l1 * Math.sin(ang);
    const e = Math.atan2(ty - jy, tx - jx);
    return [jx, jy, jx + l2 * Math.cos(e), jy + l2 * Math.sin(e)];
  }

  function build(root) {
    root.innerHTML = '';
    const svg = svgEl('svg', { viewBox: '34 102 292 226', class: 'story-svg', 'aria-hidden': 'true' }, root);
    const defs = svgEl('defs', {}, svg);
    defs.innerHTML = `
      <radialGradient id="stSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6e0"/><stop offset=".55" stop-color="#ffe0c8" stop-opacity=".8"/><stop offset="1" stop-color="#ffd6dc" stop-opacity="0"/></radialGradient>
      <radialGradient id="stLight" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffdf6"/><stop offset=".35" stop-color="#fff3d6" stop-opacity=".95"/><stop offset=".7" stop-color="#ffe3ec" stop-opacity=".5"/><stop offset="1" stop-color="#ffe3ec" stop-opacity="0"/></radialGradient>
      <linearGradient id="stHill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3f1dc"/><stop offset="1" stop-color="#cfe6c8"/></linearGradient>
      <linearGradient id="stDress" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.dress}"/><stop offset="1" stop-color="${C.dress2}"/></linearGradient>`;

    // a soft sunrise behind them
    svgEl('circle', { cx: 180, cy: 190, r: 120, fill: 'url(#stSun)', class: 'st-sun' }, svg);
    // far hills and the ground
    svgEl('path', { d: 'M-600 288 L-10 292 C 60 262 120 270 180 282 C 240 294 300 266 370 276 L960 280 L960 1200 L-600 1200Z', fill: '#e9f4e4' }, svg);
    svgEl('path', { d: `M-600 ${G} L-10 ${G} C 80 ${G - 10} 260 ${G - 10} 370 ${G} L960 ${G} L960 1200 L-600 1200Z`, fill: '#dcefd5' }, svg);

    // minimal plants with soft flowers, each swaying on its own
    const plants = svgEl('g', { class: 'st-plants' }, svg);
    const PLANTS = [
      { x: 22, h: 70, c: '#9cc5a1', f: '#ffc2d4' }, { x: 48, h: 44, c: '#b5d6b2', f: '#d9c9ff' }, { x: 70, h: 58, c: '#8fb996', f: null },
      { x: 300, h: 64, c: '#9cc5a1', f: '#ffd6a5' }, { x: 324, h: 86, c: '#8fb996', f: '#ffc2d4' }, { x: 346, h: 50, c: '#b5d6b2', f: '#d9c9ff' },
      { x: 96, h: 30, c: '#b5d6b2', f: '#fff0b3' }, { x: 272, h: 34, c: '#b5d6b2', f: '#ffc2d4' },
    ];
    PLANTS.forEach((p, i) => {
      const g = svgEl('g', { class: 'st-plant', style: `--d:${(-i * .7).toFixed(1)}s;--t:${(4 + (i % 3)).toFixed(1)}s;transform-origin:${p.x}px ${G}px` }, plants);
      svgEl('path', { d: `M${p.x} ${G} C ${p.x - 4} ${G - p.h * .4} ${p.x + 4} ${G - p.h * .7} ${p.x} ${G - p.h}`, stroke: p.c, 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }, g);
      for (let k = 1; k <= 3; k++) {
        const y = G - p.h * (k / 4.2), s = k % 2 ? 1 : -1, L = 9 + (p.h / 12);
        svgEl('path', { d: `M${p.x} ${y} q ${s * L * .6} ${-L * .5} ${s * L} ${-L * .15} q ${-s * L * .5} ${L * .4} ${-s * L} ${L * .15}Z`, fill: p.c, opacity: .9 }, g);
      }
      if (p.f) {
        const fx = p.x, fy = G - p.h;
        for (let k = 0; k < 5; k++) {
          const a = k / 5 * Math.PI * 2;
          svgEl('circle', { cx: fx + Math.cos(a) * 4.2, cy: fy + Math.sin(a) * 4.2, r: 3.6, fill: p.f }, g);
        }
        svgEl('circle', { cx: fx, cy: fy, r: 2.4, fill: '#ffe08a' }, g);
      }
    });
    // little grass tufts
    [12, 88, 140, 210, 256, 338].forEach(x => svgEl('path', { d: `M${x} ${G + 2} l2 -9 l2 9 l2 -7 l2 7`, stroke: '#a8cfa0', 'stroke-width': 1.6, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg));

    // a few tiny flowers scattered in the meadow below them (shows on tall phone screens)
    [[52, 334, '#ffc2d4'], [118, 352, '#d9c9ff'], [196, 340, '#ffd6a5'], [262, 360, '#ffc2d4'], [312, 336, '#d9c9ff'],
      [86, 380, '#ffd6a5'], [228, 392, '#ffc2d4'], [160, 410, '#d9c9ff'], [300, 418, '#ffd6a5'], [40, 430, '#ffc2d4']].forEach(([x, y, c], i) => {
      const g = svgEl('g', { class: 'st-plant', style: `--d:${(-i * .5).toFixed(1)}s;--t:${(4.5 + (i % 3)).toFixed(1)}s;transform-origin:${x}px ${y}px` }, svg);
      svgEl('path', { d: `M${x} ${y} l0 -9`, stroke: '#a8cfa0', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, g);
      svgEl('path', { d: `M${x} ${y - 3} q4 -3 6 0 q-3 2 -6 0Z`, fill: '#a8cfa0' }, g);
      for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; svgEl('circle', { cx: x + Math.cos(a) * 2.6, cy: y - 11 + Math.sin(a) * 2.6, r: 2.3, fill: c }, g); }
      svgEl('circle', { cx: x, cy: y - 11, r: 1.5, fill: '#ffe08a' }, g);
    });

    const layer = name => svgEl('g', { class: name }, svg);
    const L = {
      boyFar: layer('st-l'), girlFar: layer('st-l'), boyBody: layer('st-l'), girlBody: layer('st-l'),
      flower: layer('st-l'), boyNear: layer('st-l'), girlNear: layer('st-l'), fx: layer('st-fx'),
    };
    const light = svgEl('circle', { cx: 180, cy: 190, r: 0, fill: 'url(#stLight)' }, svg);
    return { svg, L, light };
  }

  // one stick person, clothes on
  function person(L, kind, face) {
    const girl = kind === 'girl';
    const T = girl ? 54 : 60, thigh = girl ? 32 : 35, shin = girl ? 32 : 34, up = girl ? 26 : 29, fore = girl ? 25 : 27;
    const far = girl ? L.girlFar : L.boyFar, near = girl ? L.girlNear : L.boyNear, body = girl ? L.girlBody : L.boyBody;
    const limb = (parent, w, color) => svgEl('polyline', { fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
    const arm = parent => ({
      sleeve: limb(parent, girl ? 6.5 : 7.5, girl ? C.dress : C.shirt),
      fore: limb(parent, 5.6, C.skin),
      hand: svgEl('circle', { r: 3.6, fill: C.skin }, parent),
    });
    const leg = () => ({
      line: girl ? limb(body, 5.6, C.skin) : limb(body, 9, C.pants),
      shoe: svgEl('ellipse', { rx: girl ? 5 : 6, ry: girl ? 2.8 : 3.4, fill: girl ? C.gshoe : C.shoe }, body),
    });
    const P = { farArm: arm(far), legs: [leg(), leg()] };
    if (girl) P.dress = svgEl('path', { fill: 'url(#stDress)' }, body);
    else P.torso = limb(body, 22, C.shirt);
    if (!girl) P.collar = svgEl('path', { fill: 'none', stroke: '#e9edf8', 'stroke-width': 1.6, 'stroke-linecap': 'round' }, body);
    const head = svgEl('g', {}, body);
    P.head = head;
    // the face is drawn looking right; the group flips for her
    if (girl) {
      svgEl('path', { d: 'M-15 -3 C-17 -19 12 -22 16 -6 C 17 2 14 8 11 10 L 9 -1 C 5 -8 -3 -9 -6 -3 C -10 6 -9 18 -15 30 C -21 20 -20 6 -15 -3Z', fill: C.hairG }, head);
    }
    svgEl('circle', { r: girl ? 13.5 : 14.5, fill: C.skin }, head);
    svgEl('circle', { cx: -4, cy: 1, r: 3, fill: C.skin2 }, head); // ear
    if (girl) {
      svgEl('path', { d: 'M-13 -4 C-12 -16 8 -18 14 -6 C 8 -11 1 -11 -4 -7 C -7 -4 -10 -2 -13 -4Z', fill: C.hairG }, head);
      const fl = svgEl('g', { transform: 'translate(-7 -13)' }, head);
      for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; svgEl('circle', { cx: Math.cos(a) * 3.3, cy: Math.sin(a) * 3.3, r: 2.9, fill: '#ffd1e0', stroke: '#ff8fb0', 'stroke-width': .6 }, fl); }
      svgEl('circle', { r: 1.9, fill: '#ffd166' }, fl);
    } else {
      svgEl('path', { d: 'M-15 2 C-18 -13 -6 -21 5 -19 C 13 -18 17 -11 16 -5 C 10 -10 2 -9 -3 -4 C -6 -1 -9 2 -15 2Z', fill: C.hairB }, head);
    }
    const eyes = svgEl('g', {}, head);
    P.eyes = { normal: svgEl('g', {}, eyes), wide: svgEl('g', { opacity: 0 }, eyes), happy: svgEl('g', { opacity: 0 }, eyes) };
    [[4, -2], [10.5, -2]].forEach(([x, y]) => {
      svgEl('ellipse', { cx: x, cy: y, rx: 1.5, ry: 1.9, fill: C.ink }, P.eyes.normal);
      // shocked: the same button eyes, just bigger, with a shine
      svgEl('ellipse', { cx: x, cy: y - .4, rx: 2.5, ry: 3, fill: C.ink }, P.eyes.wide);
      svgEl('circle', { cx: x - .8, cy: y - 1.6, r: 1, fill: '#fff', class: 'st-shine' }, P.eyes.wide);
      svgEl('circle', { cx: x + .9, cy: y + .7, r: .5, fill: '#fff', opacity: .85 }, P.eyes.wide);
      svgEl('path', { d: `M${x - 2} ${y + .5} q2 -2.6 4 0`, fill: 'none', stroke: C.ink, 'stroke-width': 1.2, 'stroke-linecap': 'round' }, P.eyes.happy);
    });
    if (girl) svgEl('path', { d: 'M1.5 -5.5 l-2 -2 M5 -6.5 l-1 -2.4 M13 -6 l1.6 -2', stroke: C.ink, 'stroke-width': .8, 'stroke-linecap': 'round' }, P.eyes.normal);
    P.smile = svgEl('path', { d: 'M5 5 q3 3 6.5 0', fill: 'none', stroke: '#b2405e', 'stroke-width': 1.3, 'stroke-linecap': 'round' }, head);
    P.ooh = svgEl('ellipse', { cx: 8, cy: 6, rx: 1.8, ry: 2.4, fill: '#b2405e', opacity: 0 }, head);
    P.blush = svgEl('g', { opacity: girl ? .55 : .35 }, head);
    svgEl('ellipse', { cx: 2, cy: 3.5, rx: 2.8, ry: 1.6, fill: C.blush }, P.blush);
    svgEl('ellipse', { cx: 12.5, cy: 3.5, rx: 2.2, ry: 1.4, fill: C.blush }, P.blush);
    P.nearArm = arm(near);

    P.draw = s => {
      const ux = face * Math.sin(s.lean), uy = -Math.cos(s.lean); // up along the spine
      const nx = -uy * face, ny = ux * face;                      // forward
      const neck = [s.x + ux * T, s.y + uy * T];
      const sh = [neck[0] - ux * 6, neck[1] - uy * 6];
      // legs (far first)
      [[s.gx, s.gy], [s.fx, s.fy]].forEach(([tx, ty], i) => {
        const [kx, ky, ex, ey] = ik(s.x, s.y, tx, ty, thigh, shin, -face);
        P.legs[i].line.setAttribute('points', `${s.x},${s.y} ${kx},${ky} ${ex},${ey}`);
        P.legs[i].shoe.setAttribute('cx', ex + face * 2.5);
        P.legs[i].shoe.setAttribute('cy', ey + 1);
        P.legs[i].line.setAttribute('opacity', i ? 1 : .92);
      });
      if (girl) {
        const top = [neck[0] - ux * 3, neck[1] - uy * 3], hem = [s.x - ux * 22, s.y - uy * 22];
        P.dress.setAttribute('d', `M${top[0] - nx * 7} ${top[1] - ny * 7} L${top[0] + nx * 8} ${top[1] + ny * 8} L${s.x + nx * 7} ${s.y + ny * 7} Q ${hem[0] + nx * 24} ${hem[1] + ny * 24} ${hem[0] + nx * 22} ${hem[1] + ny * 22 + 2} Q ${hem[0]} ${hem[1] + 5} ${hem[0] - nx * 20} ${hem[1] - ny * 20 + 2} Q ${hem[0] - nx * 22} ${hem[1] - ny * 22} ${s.x - nx * 7} ${s.y - ny * 7}Z`);
      } else {
        P.torso.setAttribute('points', `${s.x},${s.y - 2} ${neck[0] - ux * 4},${neck[1] - uy * 4}`);
        P.collar.setAttribute('d', `M${neck[0] - ux * 7 + nx * 3} ${neck[1] - uy * 7 + ny * 3} l${-ux * 5 - nx * 3} ${-uy * 5 - ny * 3}`);
      }
      // arms: elbows bend back, forearms reach forward
      [['farArm', s.bx, s.by], ['nearArm', s.ax, s.ay]].forEach(([k, tx, ty]) => {
        const [ex, ey, hx, hy] = ik(sh[0], sh[1], tx, ty, up, fore, face);
        P[k].sleeve.setAttribute('points', `${sh[0]},${sh[1]} ${ex},${ey}`);
        P[k].fore.setAttribute('points', `${ex},${ey} ${hx},${hy}`);
        P[k].hand.setAttribute('cx', hx);
        P[k].hand.setAttribute('cy', hy);
        if (k === 'nearArm') P.hand = [hx, hy, Math.atan2(hy - ey, hx - ex)];
      });
      const hc = [neck[0] + ux * 15, neck[1] + uy * 15];
      head.setAttribute('transform', `translate(${hc[0]} ${hc[1]}) rotate(${(face * (s.lean + s.tilt)) * 57.3}) scale(${face} 1)`);
      const eye = Math.round(s.eye), ooh = s.ooh > .5;
      P.eyes.normal.setAttribute('opacity', eye === 0 ? 1 : 0);
      P.eyes.wide.setAttribute('opacity', eye === 1 ? 1 : 0);
      P.eyes.happy.setAttribute('opacity', eye === 2 ? 1 : 0);
      P.ooh.setAttribute('opacity', ooh ? 1 : 0);
      P.smile.setAttribute('opacity', ooh ? 0 : 1);
      P.blush.setAttribute('opacity', s.blush);
      P.headAt = hc;
    };
    return P;
  }

  // the rose he holds
  function rose(parent) {
    const g = svgEl('g', {}, parent);
    svgEl('path', { d: 'M0 0 C 4 -8 6 -16 8 -24', stroke: '#6fa36f', 'stroke-width': 1.8, fill: 'none', 'stroke-linecap': 'round' }, g);
    svgEl('path', { d: 'M4 -11 q 7 -4 9 1 q -5 2 -9 -1Z', fill: '#8fc28c' }, g);
    svgEl('circle', { cx: 8.5, cy: -27, r: 6.2, fill: '#e2245e' }, g);
    svgEl('path', { d: 'M4 -28 q4 -5 9 -1 M5.5 -25 q3 2 6 -1', stroke: '#ff8fb0', 'stroke-width': 1.2, fill: 'none', 'stroke-linecap': 'round' }, g);
    svgEl('path', { d: 'M3 -24 q2 4 6 3 q4 1 6 -3', fill: '#b5163f' }, g);
    return g;
  }

  function play(onDone) {
    const gsap = window.gsap;
    if (!gsap) { onDone(); return; }
    const box = document.createElement('div');
    box.className = 'story';
    box.innerHTML = '<div class="story-stage"></div><p class="story-cap" aria-live="polite"></p><button class="story-skip" type="button">skip ›</button><i class="story-glow"></i>';
    document.body.appendChild(box);
    const stage = box.querySelector('.story-stage'), cap = box.querySelector('.story-cap');
    const { L, light } = build(stage);
    const boy = person(L, 'boy', 1), girl = person(L, 'girl', -1);
    const flower = rose(L.flower);

    // poses: hip x/y, lean, head tilt, near hand a, far hand b, near foot f, far foot g
    const B = { x: 112, y: G - 36, lean: .1, tilt: .05, ax: 94, ay: 250, bx: 92, by: 252, fx: 148, fy: G - 2, gx: 78, gy: G, eye: 0, ooh: 0, blush: .35 };
    const W = { x: 238, y: G - 62, lean: 0, tilt: 0, ax: 233, ay: 266, bx: 243, by: 266, fx: 232, fy: G, gx: 244, gy: G, eye: 0, ooh: 0, blush: .55 };
    const draw = () => {
      boy.draw(B); girl.draw(W);
      const [hx, hy, a] = boy.hand;
      flower.setAttribute('transform', `translate(${hx} ${hy}) rotate(${(a * 57.3 + 52).toFixed(1)})`);
    };
    draw();

    const say = t => { cap.classList.remove('in'); void cap.offsetWidth; cap.textContent = t; cap.classList.add('in'); };
    const fx = (kind, x, y, n = 1) => {
      for (let i = 0; i < n; i++) {
        const t = svgEl('text', { x: x + (Math.random() - .5) * 26, y, class: `st-pop ${kind}`, style: `--dx:${((Math.random() - .5) * 30).toFixed(0)}px;--d:${(i * .12).toFixed(2)}s` }, L.fx);
        t.textContent = kind === 'heart' ? '♥' : kind === 'spark' ? '✦' : '!';
        setTimeout(() => t.remove(), 2600);
      }
    };
    let finished = false;
    const tl = gsap.timeline({ onUpdate: draw, defaults: { ease: 'power2.inOut' } });
    const finish = () => {
      if (finished) return;
      finished = true;
      tl.kill();
      box.classList.add('lit');
      setTimeout(() => {
        onDone();
        box.classList.add('out');
        setTimeout(() => box.remove(), 1600);
      }, 700);
    };
    box.querySelector('.story-skip').addEventListener('click', finish);

    requestAnimationFrame(() => box.classList.add('in'));
    tl.call(() => say("psst… someone's here to see you 🤭"), null, .3)
      // he brings the flower out from behind his back
      .to(B, { ax: 172, ay: 222, bx: 108, by: 262, lean: .02, duration: 1.1, ease: 'back.out(1.6)' }, 1.4)
      .call(() => { say('for you, my birthday girl 🌷'); fx('spark', 186, 196, 4); }, null, 1.9)
      // she gasps, hand over her mouth
      .to(W, { ax: 228, ay: 170, bx: 236, by: 214, tilt: -.16, lean: -.06, eye: 1, ooh: 1, blush: .9, duration: .55, ease: 'power3.out' }, 3.1)
      .call(() => { say('is that… for me?! 🫢'); fx('bang', 236, 140, 3); }, null, 3.2)
      // she steps in and takes his shoulders
      .to(W, { x: 196, fx: 190, gx: 204, ax: 138, ay: 214, bx: 142, by: 216, lean: .22, tilt: .05, eye: 0, ooh: 0, duration: 1.1 }, 4.5)
      .to(B, { ax: 168, ay: 248, lean: 0, tilt: -.12, duration: .9 }, 4.6)
      .call(() => say('come here, you 🥹'), null, 4.8)
      // and lifts him up
      .to(B, { y: G - 68, x: 134, fx: 140, fy: G, gx: 126, gy: G, ax: 160, ay: 238, bx: 126, by: 238, tilt: 0, duration: 1.3, ease: 'power2.inOut' }, 5.9)
      .to(W, { x: 182, fx: 176, gx: 190, ax: 146, ay: 180, bx: 150, by: 182, lean: .1, duration: 1.3 }, 5.9)
      // the tight hug
      .to(B, { x: 160, fx: 166, gx: 152, ax: 210, ay: 202, bx: 206, by: 196, lean: .1, tilt: .18, duration: .9 }, 7.4)
      .to(W, { x: 192, fx: 186, gx: 198, ax: 160, ay: 166, bx: 158, by: 170, lean: .12, tilt: .32, eye: 2, blush: 1, duration: .9 }, 7.4)
      .call(() => { say("and that's how forever starts 💗"); fx('heart', 176, 150, 7); }, null, 8)
      .to([B, W], { lean: '+=.05', duration: .8, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 8.3)
      .call(() => fx('heart', 176, 150, 5), null, 9.2)
      // the light
      .to(light, { attr: { r: 520 }, duration: 2.4, ease: 'power2.in' }, 9.6)
      .call(() => box.classList.add('glow'), null, 10.4)
      .call(finish, null, 12);
  }

  window.STORY = { play };
})();
