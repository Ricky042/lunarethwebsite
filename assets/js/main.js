
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

/**************************************************************************************************************************************************************************/

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

    

    // Function to handle sidebar navigation and content update
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('#sidebar-nav a');
        const articles = document.querySelectorAll('#content article');
        const sidebarImage = document.getElementById('sidebar-image'); // Image to change

        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();

                // Remove active class from all links
                navLinks.forEach(nav => nav.classList.remove('active'));

                // Add active class to the clicked link
                this.classList.add('active');

                // Hide all articles
                articles.forEach(article => article.style.display = 'none');

                // Show the corresponding article
                const targetId = this.getAttribute('href').substring(1);
                document.getElementById(targetId).style.display = 'block';

                // Change the image based on the clicked link's data attribute
                const newImage = this.getAttribute('data-image');
                sidebarImage.src = `../images/${newImage}`;

                // Optionally scroll to the section (if desired)
                const targetSection = document.querySelector(this.getAttribute('href'));
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        // Show the default article
        document.getElementById('overview').style.display = 'block';
    });

/*****************************************************************************************************************************************************************************/

    let currentIndex = 0;
    const cards = document.querySelectorAll(".tarot-card");
    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove("active", "prev", "next");
            if (index === currentIndex) {
                card.classList.add("active");
            } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
                card.classList.add("prev");
            } else if (index === (currentIndex + 1) % cards.length) {
                card.classList.add("next");
            }
        });
    }
    document.getElementById("prevCard").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
    });
    document.getElementById("nextCard").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCards();
    });
    updateCards();

/*****************************************************************************************************************************************************************************/

    // Handle spell card click to show description in fullscreen
    const spellCards = document.querySelectorAll('.tarot-card');
    const fullscreenCard = document.getElementById('fullscreenCard');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenTitle = document.getElementById('fullscreenTitle');
    const fullscreenDescription = document.getElementById('fullscreenDescription');
    const closeFullscreen = document.getElementById('closeFullscreen');

    spellCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardImage = card.querySelector('img').src;
            const cardTitle = card.querySelector('p').textContent;
            const cardDescription = card.querySelector('.card-back p').textContent;

            fullscreenImage.src = cardImage;
            fullscreenTitle.textContent = cardTitle;
            fullscreenDescription.textContent = cardDescription;

            fullscreenCard.classList.add('active');
        });
    });

    // Close fullscreen view
    closeFullscreen.addEventListener('click', () => {
        fullscreenCard.classList.remove('active'); // Hide fullscreen card
    });


/*****************************************************************************************************************************************************************************/



})(jQuery);