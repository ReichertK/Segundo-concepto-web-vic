(function () {
  "use strict";

  // Navbar shrink al hacer scroll
  var mainNav = document.querySelector('#mainNav');
  var collapseNavbar = function () {
    if (!mainNav) return;
    var scrollTop = (typeof window.scrollY === 'number') ? window.scrollY : (window.pageYOffset || 0);
    if (scrollTop > 100) { mainNav.classList.add("navbar-shrink"); return; }
    mainNav.classList.remove("navbar-shrink");
  };
  collapseNavbar();
  try { window.addEventListener("scroll", collapseNavbar, { passive: true }); } catch (_) { window.addEventListener("scroll", collapseNavbar); }

  // Efecto de revelado suave para elementos con .reveal
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var onView = function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          observer.unobserve(entry.target);
        }
      });
    };
    try {
      var io = new IntersectionObserver(onView, { root: null, rootMargin: '0px', threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    } catch (_) {
      // Fallback simple: mostrar inmediatamente si no hay IntersectionObserver
      reveals.forEach(function (el) { el.classList.add('reveal-in'); });
    }
  }

  // Back to top
  var backTop = document.querySelector('.back-to-top');
  if (backTop) {
    var toggleBackTop = function () {
      var y = (typeof window.scrollY === 'number') ? window.scrollY : (window.pageYOffset || 0);
      if (y > 300) { backTop.classList.add('show'); return; }
      backTop.classList.remove('show');
    };
    toggleBackTop();
    try { window.addEventListener('scroll', toggleBackTop, { passive: true }); } catch (_) { window.addEventListener('scroll', toggleBackTop); }
    backTop.addEventListener('click', function (e) {
      e.preventDefault();
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (_) { window.scrollTo(0, 0); }
    });
  }
})();

