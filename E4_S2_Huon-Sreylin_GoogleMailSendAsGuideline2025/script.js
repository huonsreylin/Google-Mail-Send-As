// Theme Toggle Functionality
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference or use system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitch.checked = false;
} else if (currentTheme === 'light') {
    body.classList.remove('dark-theme');
    themeSwitch.checked = true;
} else {
    // If no saved preference, use system preference
    if (prefersDarkScheme.matches) {
        body.classList.add('dark-theme');
        themeSwitch.checked = false;
    }
}

// Theme switch event listener
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Scroll to top button functionality
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// FAQ toggle functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
    
    // Update the toggle icon
    const toggleIcon = element.querySelector('.toggle-icon');
    if (faqItem.classList.contains('active')) {
        toggleIcon.textContent = '×';
    } else {
        toggleIcon.textContent = '+';
    }
}

// Add animation to steps when they come into view
const steps = document.querySelectorAll('.step');
const benefits = document.querySelectorAll('.benefit');
const tipCards = document.querySelectorAll('.tip-card');

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply initial styles and observe elements
[...steps, ...benefits, ...tipCards].forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Mobile navigation toggle (for smaller screens)
function createMobileNav() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.style.fontSize = '1.5rem';
    mobileMenuBtn.style.cursor = 'pointer';
    
    nav.prepend(mobileMenuBtn);
    
    const navLinks = document.querySelector('.nav-links');
    
    // Media query for mobile view
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleScreenChange(e) {
        if (e.matches) {
            mobileMenuBtn.style.display = 'block';
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'var(--primary-color)';
            navLinks.style.padding = '20px';
            navLinks.style.zIndex = '100';
            
            // Add margin to nav links
            const links = navLinks.querySelectorAll('li');
            links.forEach(link => {
                link.style.margin = '10px 0';
            });
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
            navLinks.style.padding = '0';
        }
    }
    
    // Initial check
    handleScreenChange(mediaQuery);
    
    // Add listener for changes
    mediaQuery.addEventListener('change', handleScreenChange);
    
    // Toggle menu on click
    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mediaQuery.matches) {
                navLinks.style.display = 'none';
            }
        });
    });
}

// Initialize mobile navigation
createMobileNav();

// Add hover effect to step numbers
steps.forEach(step => {
    const stepNumber = step.querySelector('.step-number');
    
    step.addEventListener('mouseenter', () => {
        stepNumber.style.transform = 'scale(1.1)';
        stepNumber.style.boxShadow = '0 0 15px rgba(66, 133, 244, 0.5)';
    });
    
    step.addEventListener('mouseleave', () => {
        stepNumber.style.transform = 'scale(1)';
        stepNumber.style.boxShadow = 'none';
    });
});