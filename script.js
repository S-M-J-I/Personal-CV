document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.pub-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // CV PDF Path
    const CV_PATH = './assets/cvs/PhD_application_CV_S_M_Jishanul_Islam_Visa_Copy.pdf';

    // 1. Theme Toggle Management
    // Default theme is dark, check localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. Scroll-to-Top Button Visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. ScrollSpy Navigation Highlighting
    const spyOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Triggers when section occupies middle of viewport
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, spyOptions);

    sections.forEach(section => spyObserver.observe(section));

    // 4. Publications Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all filter buttons, add to clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            publicationItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Toggle visibility based on category match
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'flex';
                    // Trigger fade-in animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 5. Ctrl+P / Cmd+P Print Interception
    function printFile(url) {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.src = url;

        // Append to body
        document.body.appendChild(iframe);

        // Wait for load then print
        iframe.onload = function () {
            try {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            } catch (e) {
                console.error("Print failed, falling back to opening in a new tab.", e);
                // Fallback: Open in new window if iframe print fails (e.g. cross-origin/browser restrictions)
                window.open(url, '_blank');
            } finally {
                // Clean up after print dialog launched
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 2000);
            }
        };
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
            e.preventDefault(); // Stop default web page print dialog
            printFile(CV_PATH);
        }
    });
});