/* Refract · the light: water caustics drawn live behind the hero (decoration only).
   Rendered at low resolution and scaled up by the browser, so the net stays soft.
   Pauses off screen and in a background tab; with reduced motion it paints one still frame. */
(function () {
  'use strict';
  var canvas = document.querySelector('.hero .light');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;

  /* read two theme tokens as RGB by painting them once */
  function tokenRGB(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    canvas.width = 1; canvas.height = 1;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = fallback; ctx.fillStyle = v;
    ctx.fillRect(0, 0, 1, 1);
    var d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }
  var shade = tokenRGB('--color-shade', 'rgb(180,222,224)');
  var deep = tokenRGB('--color-shade-2', 'rgb(99,199,200)');
  var light = tokenRGB('--color-light', 'rgb(254,254,252)');

  var W = 150, H = 90, img, buf;
  function size() {
    var r = canvas.getBoundingClientRect();
    var aspect = r.width && r.height ? r.height / r.width : 0.6;
    W = 150; H = Math.max(40, Math.round(W * aspect));
    canvas.width = W; canvas.height = H;
    img = ctx.createImageData(W, H); buf = img.data;
  }

  var TAU = 6.28318530718;
  function frame(time) {
    var inten = 0.005, x, y, n, px, py, ix, iy, t, c, b, o = 0;
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
        /* deep teal in the troughs, shade on the floor, near white on the bright seams */
        var lo = 0.35 + 0.65 * Math.min(1, b * 3);
        var r = deep[0] + (shade[0] - deep[0]) * lo, g = deep[1] + (shade[1] - deep[1]) * lo, bl = deep[2] + (shade[2] - deep[2]) * lo;
        buf[o] = r + (light[0] - r) * b;
        buf[o + 1] = g + (light[1] - g) * b;
        buf[o + 2] = bl + (light[2] - bl) * b;
        buf[o + 3] = 255;
        o += 4;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  size();
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var start = performance.now(), visible = true, raf = 0, last = 0;
  frame(23);
  if (reduce) return;

  function loop(now) {
    raf = 0;
    if (!visible || document.hidden) return;
    if (now - last > 40) { last = now; frame(23 + (now - start) / 1000 * 0.42); }
    raf = requestAnimationFrame(loop);
  }
  function wake() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; wake(); }).observe(canvas);
  }
  document.addEventListener('visibilitychange', wake);
  var rt;
  addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); frame(23 + (performance.now() - start) / 1000 * 0.42); }, 150); });
  wake();
})();
