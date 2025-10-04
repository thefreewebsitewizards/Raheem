// Navigation Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Fade-in animation for elements
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Add fade-in class to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .cta-button, .featured h2, .chapter-card');
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        // Stagger the animations
        element.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Chapter navigation (for chapter.html)
function setupChapterNavigation() {
    const chapterView = document.querySelector('.chapter-view');
    if (!chapterView) return;

    // Get chapter ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    let currentChapter = parseInt(urlParams.get('id')) || 1;
    
    // Ensure chapter is within valid range
    if (currentChapter < 1) currentChapter = 1;
    if (currentChapter > 100) currentChapter = 100;
    
    // Update chapter title
    const chapterTitle = document.querySelector('.chapter-title');
    if (chapterTitle) {
        chapterTitle.textContent = `Chapter ${currentChapter}`;
    }
    
    // Setup navigation buttons
    const prevButton = document.querySelector('.prev-chapter');
    const nextButton = document.querySelector('.next-chapter');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentChapter > 1) {
                window.location.href = `chapter.html?id=${currentChapter - 1}`;
            }
        });
        
        // Disable prev button if on first chapter
        if (currentChapter === 1) {
            prevButton.classList.add('disabled');
        }
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentChapter < 100) {
                window.location.href = `chapter.html?id=${currentChapter + 1}`;
            }
        });
        
        // Disable next button if on last chapter
        if (currentChapter === 100) {
            nextButton.classList.add('disabled');
        }
    }
    
    // Setup chapter dropdown
    const chapterSelect = document.querySelector('#chapter-select');
    if (chapterSelect) {
        for (let i = 1; i <= 100; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Chapter ${i}`;
            if (i === currentChapter) {
                option.selected = true;
            }
            chapterSelect.appendChild(option);
        }
        
        chapterSelect.addEventListener('change', (e) => {
            window.location.href = `chapter.html?id=${e.target.value}`;
        });
    }
}

// Run chapter navigation setup if on chapter page
document.addEventListener('DOMContentLoaded', setupChapterNavigation);

// Generate chapter cards for chapters.html
function generateChapterCards() {
    const chaptersGrid = document.querySelector('.chapters-grid');
    if (!chaptersGrid) return;
    
    for (let i = 1; i <= 100; i++) {
        const card = document.createElement('div');
        card.className = 'chapter-card fade-in';
        
        card.innerHTML = `
            <div class="chapter-number">Chapter ${i}</div>
            <a href="chapter.html?id=${i}" class="read-button">Read</a>
        `;
        
        chaptersGrid.appendChild(card);
    }
}

// Run chapter card generation if on chapters page
document.addEventListener('DOMContentLoaded', generateChapterCards);