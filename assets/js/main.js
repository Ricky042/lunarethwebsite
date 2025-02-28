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

        function debounce(func, delay) {
            let timer;
            return function(...args) {
                clearTimeout(timer);
                timer = setTimeout(() => func.apply(this, args), delay);
            };
        }
        
        var header = $('#header-wrapper');
        var lastState = false; // Track the last applied class state
        var scrollThreshold = 60; // Scroll threshold
        
        function handleScroll() {
            var scrollTop = $window.scrollTop();
            var shouldBeSmall = scrollTop > scrollThreshold; // True if it should be small
        
            // Only update if the state has changed
            if (shouldBeSmall !== lastState) {
                lastState = shouldBeSmall; // Update the state
                header.toggleClass('header-small', shouldBeSmall);
            }
        }

        // Apply debounce to prevent excessive execution
        $window.on('scroll', debounce(handleScroll, 50));

})(jQuery);