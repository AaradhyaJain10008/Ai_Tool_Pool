(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();




    document.addEventListener('DOMContentLoaded', function() {
        var animationContainers = document.querySelectorAll('.animation-container');
    
        function checkAnimation() {
            animationContainers.forEach(function(container) {
                if (isElementInViewport(container)) {
                    container.classList.add('animation-show');
                } else {
                    container.classList.remove('animation-show');
                }
            });
        }
    
        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    
        window.addEventListener('scroll', checkAnimation);
        checkAnimation(); // Initial check
    });
    

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);


// SPIRAL ANIMATION
var _3DPretty = (function () {
  var obj = [],
      _x = 0,
      _y = 0,
      _x1 = 0,
      _y1 = 0,
      parts = 500,
      $,
      _tx,
      _ty,
      _w,
      _h;

  var resize = function () {
      _w = window.innerWidth * 0.5;
      _h = window.innerHeight * 0.5;
  };

  var set = function (n, f) {
      if (!!n) parts = n;
      $ = document.getElementById("space");
      window.addEventListener("mousemove", function (e) {
          _x = e.clientX;
          _y = e.clientY;
      });
      window.addEventListener("touchmove", function (e) {
          e.preventDefault();
          _x = e.touches[0].clientX;
          _y = e.touches[0].clientY;
      });
      resize();
      window.addEventListener("resize", resize);
      _set(f);
      run();
  };

  var run = function () {
      window.requestAnimationFrame(run);
      anime();
  };

  var _set = function (f) {
      for (var i = 0; i < parts; i++) {
          var o = {};
          o.p = document.createElement("span");
          $.appendChild(o.p);
          var r = i / parts,
              j,
              a,
              b;
          j = i % (parts * 0.5);
          a = Math.floor(j) / 100 + ((Math.floor(j / 2) % 10) / 5) * Math.PI * 2;
          b = Math.acos(-0.9 + (j % 4) * 0.6);
          r = !!f ? f(r) : r - r * r + 0.5;
          var sbr = Math.sin(b) * r;
          o.x = Math.sin(a) * sbr;
          o.y = Math.cos(a) * sbr;
          o.z = Math.cos(b) * r;
          obj.push(o);
          o.transform = function () {
              var ax = 0.02 * _tx,
                  ay = 0.02 * _ty,
                  cx = Math.cos(ax),
                  sx = Math.sin(ax),
                  cy = Math.cos(ay),
                  sy = Math.sin(ay);

              var z = this.y * sx + this.z * cx;
              this.y = this.y * cx + this.z * -sx;
              this.z = this.x * -sy + z * cy;
              this.x = this.x * cy + z * sy;

              var sc = 1 / (1 + this.z),
                  x = this.x * sc * _h + _w - sc * 2,
                  y = this.y * sc * _h + _h - sc * 2;

              var p = this.p.style;
              if (x >= 0 && y >= 0 && x < window.innerWidth - sc * 2 && y < window.innerHeight - sc * 2) {
                  var c = Math.round(256 + -this.z * 256);
                  p.left = Math.round(x) + "px";
                  p.top = Math.round(y) + "px";
                  p.width = Math.round(sc * 2) + "px";
                  p.height = Math.round(sc * 2) + "px";
                  p.background = "hsla(" + y + ",80%,80%,1)";
                  p.zIndex = 200 + Math.floor(-this.z * 100);
              } else {
                  p.width = "0px";
              }
          };
      }
  };

  var anime = function () {
      var se = 1 / _h;
      _tx = (_y - _x1) * se;
      _ty = (_x - _y1) * se;
      _x1 += _tx;
      _y1 += _ty;
      for (var i = 0, o; (o = obj[i]); i++) o.transform();
  };

  return {
      set: set
  };
})();

window.onload = function () {
  _3DPretty.set(500, function (r) {
      return r * r;
  });
};




// CARDS ROTATION

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  
  cards.forEach((card, index) => {
    let timeout;

    card.addEventListener("mouseenter", function () {
      clearTimeout(timeout); // Clear the timeout to prevent delayed rotation
      this.classList.remove("rotate");
    });

    card.addEventListener("mouseleave", function () {
      timeout = setTimeout(() => {
        this.classList.add("rotate");
      }, index * 100); // Adjust the delay time as needed
    });
  });
});



