/*
    Verti by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var	$window = $(window),
        $body = $('body');

    // Breakpoints.
        breakpoints({
            xlarge:  [ '1281px',  '1680px' ],
            large:   [ '981px',   '1280px' ],
            medium:  [ '737px',   '980px'  ],
            small:   [ null,      '736px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    // Dropdowns.
        $('#nav > ul').dropotron({
            mode: 'fade',
            noOpenerFade: true,
            speed: 300
        });

    // Nav.

        // Toggle.
            $(
                '<div id="navToggle">' +
                    '<a href="#navPanel" class="toggle"></a>' +
                '</div>'
            )
                .appendTo($body);

        // Panel.
            $(
                '<div id="navPanel">' +
                    '<nav>' +
                        $('#nav').navList() +
                    '</nav>' +
                '</div>'
            )
                .appendTo($body)
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'navPanel-visible'
                });

        // Function to handle sticky navigation bar behavior
        function stickyNav() {
            var header = document.querySelector("#header-wrapper");  // Select the header
            var scrollValue = window.scrollY;  // Get the current scroll position

            // When scroll value exceeds a certain threshold (e.g., 50px), add the shrinking class
            if (scrollValue > 0) {
                header.classList.add("header-small");  // Shrink the navbar and adjust padding
            } else {
                header.classList.remove("header-small");  // Reset navbar size when scrolling back to the top
            }
        }

        // Attach the scroll event listener to the window
        window.addEventListener("scroll", stickyNav);
  

})(jQuery);