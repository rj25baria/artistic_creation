(function ($) {
    "use strict";

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


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
 // team
document.querySelectorAll('.team-member img').forEach(img => {
  img.addEventListener('click', () => {
    img.parentElement.classList.toggle('active');
  });
});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


const PRODUCTS = [
  {
    id: 1,
    title: "Ganesh Spiritual Painting",
    price: 1500,
    category: "Paintings",
    rating: 5,
    img: "assets/img/product_4.jpg"
  },
  {
    id: 2,
    title: "Wooden Toy Car",
    price: 800,
    category: "Toy making",
    rating: 4,
    img: "assets/img/product_3.jpg"
  },
  {
    id: 3,
    title: "Handmade Metal Art Plate",
    price: 2200,
    category: "Home Décor",
    rating: 5,
    img: "assets/img/product_2.jpg"
  },
  {
    id: 4,
    title: "Handmade Rakhi Set",
    price: 250,
    category: "Rakhi",
    rating: 4,
    img: "assets/img/product_11.jpeg"
  },
  {
    id: 5,
    title: "Colorful Clay Pot",
    price: 1200,
    category: "Home Décor",
    rating: 4,
    img: "assets/img/product_12.jpg"
  },
  {
    id: 6,
    title: "Traditional Wall Hanging",
    price: 1800,
    category: "Home Décor",
    rating: 5,
    img: "assets/img/product_13.jpg"
  },
  {
    id: 7,
    title: "Miniature Wooden Doll",
    price: 600,
    category: "Toy making",
    rating: 4,
    img: "assets/img/product_14.jpg"
  },
  {
    id: 8,
    title: "Krishna Painting",
    price: 2000,
    category: "Paintings",
    rating: 5,
    img: "assets/img/product_15.jpg"
  }
];