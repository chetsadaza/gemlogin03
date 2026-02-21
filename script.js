document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation Initialization
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger animations for elements already in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typewriter effect
    const typeWriterElement = document.getElementById('typewriter-code');
    if (typeWriterElement) {
        const textToType = typeWriterElement.getAttribute('data-text');
        typeWriterElement.innerHTML = '<span class="cursor"></span>';

        let index = 0;
        let isTyping = false;

        function type() {
            if (index < textToType.length) {
                typeWriterElement.innerHTML = textToType.substring(0, index + 1) + '<span class="cursor"></span>';
                index++;
                setTimeout(type, Math.random() * 30 + 20); // Random delay for realistic effect
            }
        }

        const typeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTyping) {
                    isTyping = true;
                    // Start typing shortly after it comes into view
                    setTimeout(type, 600);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const editorGlass = document.querySelector('.code-editor-glass');
        if (editorGlass) {
            typeObserver.observe(editorGlass);
        }
    }
});
