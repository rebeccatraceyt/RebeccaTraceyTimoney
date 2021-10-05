$(function(){

    // Open nav menu
    $("#nav-btn").click(function() {
        $(this).toggleClass("animate");
        if ($(this).hasClass("animate")) {
            $("#nav-menu").slideDown();
            $("#nav-menu").css("display", "block");
        } else {
            $("#nav-menu").slideUp();      
                      
        }
    });

    // Open socials menu
    $('#socials span:last-child').click(function(){
        $('#socials span').not(':last-child').toggleClass('hidden show');
    });

    // Navbar active class
    let menuScrollTimer = null;
    $(".nav-active a").click(function (e) {
        // Prevent default behaviour ( scroll to element )
        e.preventDefault();
        if (menuScrollTimer === null) {
            // Highlight the clicked item
            $('.nav-active a.active').removeClass('active');
            $(this).addClass('active');
            // Smooth scroll to the target section
            let target = $(this).attr('href');
            $('html, body').animate({ scrollTop: $(target).offset().top - 100 }, 1050);
            // Set `menuScrollTimer` timer
            // This will prevents multiple clicks on menu items whule the smooth scroll is taking effect
            // This will also prevent the scroll logic from running
            menuScrollTimer = setTimeout(function () {
                clearTimeout(menuScrollTimer);
                menuScrollTimer = null;
            }, 1050);
        }
    });

    $(window).scroll(function (e) {
        // Avoid triggering the logic if the scroll event is triggered from clicking one of the items
        if (menuScrollTimer === null) {
            let windowTop = $(this).scrollTop();

            $('.nav-active a').each(function (event) {
                if (windowTop >= $($(this).attr('href')).offset().top - 100) {
                    $('.nav-active .active').removeClass('active');
                    $(this).addClass('active');
                }
            });
        }
    });

    // Footer Scroll function
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('.footer-content').addClass('show');
            $('#socials').css('display', 'none');
        } else {
            $('.footer-content').removeClass('show'); 
            $('#socials').css('display', 'flex');
        } 
    });

    // current year
    document.getElementById("footer-date").innerHTML = new Date().getFullYear();

    /* 
        EmailJs used to send email from contact form
    */

    /* Checking if form is valid 
    Sourced from https://codepen.io/tetnuc/pen/gRqOEO */
    $('#contactForm').validate({
        rules: {
            from_name: {
                required: true
            },
            from_email: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            from_name: {
                required: "This field is required"
            },
            from_email: {
                required: "This field is required"
            },
            message: {
                required: "This field is required"
            }
        },

    });

    // EmailJs Function
    $('#contactFormSubmit').click(function (event) {
        event.preventDefault();
        if($('#contactForm').valid()) {
            Swal.fire({
                icon: 'success',
                title: 'Thank You!',
                text: 'Your message has been received, I will be in touch as soon as possible.',
                showConfirmButton: true,
                timer: 2000
            });
            sendMail();
        }
    });
    function sendMail(){
        // reference: CI tutorial and https://www.youtube.com/watch?v=x7Ewtay0Q78
        let tempParams = {
            name: document.getElementById("from_name").value,
            email: document.getElementById("from_email").value,
            message: document.getElementById("message").value,
        };
        emailjs.send('service_xrhabtk', 'template_q2x67kt', tempParams);
    }
});
