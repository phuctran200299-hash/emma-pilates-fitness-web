/* Refract · the light: water caustics drawn live on every canvas.light (decoration only).
   Each canvas renders at low resolution and the browser scales it up, so the net stays soft.
   A canvas only animates while it is on screen (hidden pages and closed dialogs cost nothing);
   with reduced motion each one paints a single still frame. */
(function () {
  'use strict';
  var probe = document.createElement('canvas');
  var pctx = probe.getContext && probe.getContext('2d', { willReadFrequently: true });
  if (!pctx) return;

  function tokenRGB(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    probe.width = 1; probe.height = 1;
    pctx.clearRect(0, 0, 1, 1);
    pctx.fillStyle = fallback; pctx.fillStyle = v;
    pctx.fillRect(0, 0, 1, 1);
    var d = pctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }
  var shade = tokenRGB('--color-shade', 'rgb(180,222,224)');
  var deep = tokenRGB('--color-shade-2', 'rgb(99,199,200)');
  var light = tokenRGB('--color-light', 'rgb(254,254,252)');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TAU = 6.28318530718, start = performance.now();
  var now = function () { return 23 + (performance.now() - start) / 1000 * 0.42; };

  function Light(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext('2d');
    this.W = 0; this.H = 0; this.visible = false;
  }
  Light.prototype.size = function () {
    var r = this.c.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    var W = 150, H = Math.max(30, Math.round(W * r.height / r.width));
    if (W !== this.W || H !== this.H) {
      this.W = W; this.H = H;
      this.c.width = W; this.c.height = H;
      this.img = this.ctx.createImageData(W, H);
    }
    return true;
  };
  Light.prototype.frame = function (time) {
    var W = this.W, H = this.H, buf = this.img.data, inten = 0.005, o = 0, x, y, n, px, py, ix, iy, t, c, b;
    for (y = 0; y < H; y++) {
      for (x = 0; x < W; x++) {
        px = ((x / W) * 1.6 * TAU) % TAU - 250;
        py = ((y / W) * 1.6 * TAU) % TAU - 250;
        ix = px; iy = py; c = 1;
        for (n = 0; n < 4; n++) {
          t = time * (1 - 3.5 / (n + 1));
          var nx = px + Math.cos(t - ix) + Math.sin(t + iy);
          var ny = py + Math.sin(t - iy) + Math.cos(t + ix);
          ix = nx; iy = ny;
          var dx = px / (Math.sin(ix + t) / inten), dy = py / (Math.cos(iy + t) / inten);
          c += 1 / Math.sqrt(dx * dx + dy * dy);
        }
        c /= 4;
        c = 1.17 - Math.pow(c, 1.4);
        b = Math.pow(Math.abs(c), 7);
        if (b > 1) b = 1;
        var lo = 0.35 + 0.65 * Math.min(1, b * 3);
        var r = deep[0] + (shade[0] - deep[0]) * lo, g = deep[1] + (shade[1] - deep[1]) * lo, bl = deep[2] + (shade[2] - deep[2]) * lo;
        buf[o] = r + (light[0] - r) * b;
        buf[o + 1] = g + (light[1] - g) * b;
        buf[o + 2] = bl + (light[2] - bl) * b;
        buf[o + 3] = 255;
        o += 4;
      }
    }
    this.ctx.putImageData(this.img, 0, 0);
  };

  var all = [], raf = 0, last = 0;
  function loop(ts) {
    raf = 0;
    if (document.hidden) return;
    var live = all.filter(function (l) { return l.visible; });
    if (!live.length) return;
    if (ts - last > 40) {
      last = ts;
      var tm = now();
      live.forEach(function (l) { if (l.size()) l.frame(tm); });
    }
    raf = requestAnimationFrame(loop);
  }
  function wake() { if (!raf && !reduce) raf = requestAnimationFrame(loop); }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var l = e.target.__light;
      l.visible = e.isIntersecting;
      if (l.visible && l.size()) l.frame(now());
    });
    wake();
  }) : null;

  function attach(canvas) {
    if (canvas.__light) return;
    var l = new Light(canvas);
    canvas.__light = l;
    all.push(l);
    if (io) io.observe(canvas);
    else { l.visible = true; if (l.size()) l.frame(now()); }
  }
  function scan() { Array.prototype.forEach.call(document.querySelectorAll('canvas.light'), attach); }

  scan();
  /* pages are rendered by emma.js after load: pick up canvases it adds */
  new MutationObserver(function () { scan(); }).observe(document.getElementById('main') || document.body, { childList: true, subtree: true });
  document.addEventListener('visibilitychange', wake);
  var rt;
  addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var tm = now(); all.forEach(function (l) { if (l.visible && l.size()) l.frame(tm); }); }, 150);
  });
  wake();
})();
