(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
  var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))};
  var hdr=$('#top'),navEl=$('#nav'),prog=$('#prog'),ticking=false,lastY=0;

  /* 1. headings split into masked words */
  $$('[data-split]').forEach(function(h){
    var words=h.textContent.trim().split(/\s+/);h.textContent='';h.classList.add('sp');h.setAttribute('aria-label',words.join(' '));
    words.forEach(function(t,i){
      var w=document.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
      var s=document.createElement('span');s.style.setProperty('--i',i);s.textContent=t;w.appendChild(s);h.appendChild(w);
      if(i<words.length-1)h.appendChild(document.createTextNode(' '));
    });
  });

  /* 2. scroll-scrubbed words */
  var scrubs=[];
  if(!reduce)$$('[data-sw]').forEach(function(p){
    var ws=p.textContent.trim().split(/\s+/);p.textContent='';p.setAttribute('aria-label',ws.join(' '));
    var spans=ws.map(function(t,i){var s=document.createElement('span');s.className='sw';s.setAttribute('aria-hidden','true');s.textContent=t;p.appendChild(s);if(i<ws.length-1)p.appendChild(document.createTextNode(' '));return s});
    scrubs.push({el:p,ws:spans,done:false});
  });

  /* 3. collect scroll-linked things */
  var pars=$$('[data-par]').map(function(el){return {el:el,p:el.parentElement,s:parseFloat(el.dataset.par)}});
  var layers=$$('.ph img.zoom');
  var hero=$('[data-hero]'),heroTxt=$('[data-herotxt]');
  var marqs=$$('[data-marq]').map(function(el){return {el:el,dir:parseFloat(el.dataset.dir||-1),sp:parseFloat(el.dataset.sp||.5),half:0}});
  var pins=$$('[data-pin]').map(function(el){return {el:el,trk:$('.track',el),bar:$('[data-pinbar]',el)}});
  var stacks=$$('[data-stack]').map(function(el){return [].slice.call(el.children)});
  var spin=$$('[data-spin]');

  function measure(){marqs.forEach(function(m){m.half=m.el.scrollWidth/2})}
  function onScroll(){
    var y=scrollY,vh=innerHeight;
    if(prog)prog.style.transform='scaleX('+Math.min(1,y/Math.max(1,document.documentElement.scrollHeight-vh))+')';
    if(hdr)hdr.classList.toggle('scrolled',y>10);
    if(!reduce){
      var dy=y-lastY;
      if(hdr&&Math.abs(dy)>4){hdr.classList.toggle('hide',dy>0&&y>240&&!(navEl&&navEl.classList.contains('open')));lastY=y}
      if(hero&&y<vh*1.3){
        hero.style.transform='translate3d(0,'+(y*0.22)+'px,0) scale('+(1.03+y/vh*0.06)+')';
        if(heroTxt){heroTxt.style.translate='0 '+(y*0.3)+'px';heroTxt.style.opacity=Math.max(0,1-y/(vh*.65))}
      }
      marqs.forEach(function(m){if(m.half)m.el.style.transform='translate3d('+(m.dir<0?-((y*m.sp)%m.half):-m.half+((y*m.sp)%m.half))+'px,0,0)'});
      spin.forEach(function(el){el.style.transform='rotate('+(y*.18)+'deg)'});
      pars.forEach(function(o){
        var r=o.p.getBoundingClientRect();if(r.bottom<-300||r.top>vh+300)return;
        o.el.style.translate='0 '+(((r.top+r.height/2)-vh/2)*o.s)+'px';
      });
      layers.forEach(function(el){
        var r=el.parentElement.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;
        var max=r.height*.1;
        el.style.transform='translate3d(0,'+clamp(((r.top+r.height/2)-vh/2)*.07,-max,max)+'px,0)';
      });
      pins.forEach(function(o){
        if(innerWidth>900){
          var r=o.el.getBoundingClientRect(),p=clamp(-r.top/(o.el.offsetHeight-vh),0,1);
          o.trk.style.transform='translate3d('+(-p*Math.max(0,o.trk.scrollWidth-innerWidth))+'px,0,0)';
          if(o.bar)o.bar.style.transform='scaleX('+p+')';
        }else o.trk.style.transform='';
      });
      stacks.forEach(function(cards){
        cards.forEach(function(c,i){
          var n=cards[i+1];if(!n)return;
          var k=clamp(1-(n.getBoundingClientRect().top-c.getBoundingClientRect().top)/c.offsetHeight,0,1);
          c.style.scale=1-.05*k;c.style.filter='brightness('+(1-.12*k)+')';
        });
      });
      scrubs.forEach(function(s){
        if(s.done)return;var r=s.el.getBoundingClientRect();if(r.top>vh||r.bottom<0)return;
        var p=clamp((vh*.9-r.top)/(vh*.5),0,1),n=s.ws.length;
        s.ws.forEach(function(w,i){w.style.opacity=.16+.84*clamp(p*n-i,0,1)});
        if(p>=1)s.done=true;
      });
    }
    ticking=false;
  }
  addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
  addEventListener('resize',function(){measure();onScroll()});
  addEventListener('load',function(){measure();onScroll()});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){measure();onScroll()});
  measure();onScroll();

  /* 4. reveal observer */
  var items=$$('.rv,.cur,.sp');
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in','go');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    items.forEach(function(el){io.observe(el)});
  }else items.forEach(function(el){el.classList.add('in','go')});

  /* 5. count-up */
  var cio='IntersectionObserver' in window&&!reduce?new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;cio.unobserve(e.target);
    var el=e.target,n=+el.dataset.count,t0=performance.now();
    (function tick(t){var k=Math.min(1,(t-t0)/1600),v=Math.round(n*(1-Math.pow(1-k,3)));el.textContent=v.toLocaleString('vi-VN');if(k<1)requestAnimationFrame(tick)})(t0);
  })},{threshold:.6}):null;
  if(cio)$$('[data-count]').forEach(function(el){cio.observe(el)});

  /* 6. menu + jump with veil + active link */
  var burger=$('#burger'),veil=$('#veil');
  function closeNav(){if(!navEl)return;navEl.classList.remove('open');document.body.classList.remove('menu-open');if(burger)burger.setAttribute('aria-expanded',false)}
  if(burger)burger.addEventListener('click',function(){var o=navEl.classList.toggle('open');document.body.classList.toggle('menu-open',o);burger.setAttribute('aria-expanded',o)});
  $$('[data-go]').forEach(function(a){
    a.addEventListener('click',function(e){
      var t=$(a.getAttribute('href'));if(!t)return;
      e.preventDefault();closeNav();
      if(reduce){t.scrollIntoView();return}
      veil.classList.add('on');
      setTimeout(function(){
        var off=hdr?hdr.offsetHeight-1:0;
        document.documentElement.style.scrollBehavior='auto';
        window.scrollTo(0,t.getBoundingClientRect().top+scrollY-(t.id==='home'?0:off));
        document.documentElement.style.scrollBehavior='';
        veil.classList.remove('on');
      },360);
    });
  });
  var links=$$('#nav a'),secs=links.map(function(a){return $(a.getAttribute('href'))});
  addEventListener('scroll',function(){
    var y=scrollY+200,cur=-1;
    secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top+scrollY<=y)cur=i});
    links.forEach(function(a,i){if(i===cur)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  },{passive:true});

  /* 7. lightbox, form */
  var lb=$('#lb'),lbImg=$('#lbImg');
  $$('[data-lb]').forEach(function(b){b.addEventListener('click',function(){var im=$('img',b);lbImg.src=im.src;lbImg.alt=im.alt;lb.classList.add('on')})});
  if(lb){lb.addEventListener('click',function(){lb.classList.remove('on')});addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')})}
  var f=$('#leadForm');if(f)f.addEventListener('submit',function(e){e.preventDefault();$('#thanks').hidden=false});
})();
