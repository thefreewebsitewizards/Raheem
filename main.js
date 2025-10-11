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
    const elementsToAnimate = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-content .cta-button, .featured h2, .chapter-card, .chapter-title');
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        // Stagger the animations
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Re-initialize the intersection observer for newly added elements
    const newFadeElements = document.querySelectorAll('.fade-in');
    newFadeElements.forEach(element => {
        if (!element.hasAttribute('data-observed')) {
            fadeInObserver.observe(element);
            element.setAttribute('data-observed', 'true');
        }
    });
});

// Chapter navigation (for chapter.html)
function setupChapterNavigation() {
    const chapterView = document.querySelector('.chapter-view');
    if (!chapterView) return;

    // Get chapter ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    let currentChapter = urlParams.get('id') !== null ? parseInt(urlParams.get('id')) : 1;
    
    // Ensure chapter is within valid range (now includes chapter 0)
    if (currentChapter < 0) currentChapter = 0;
    if (currentChapter > 204) currentChapter = 204;
    
    // Update chapter title
    const chapterTitle = document.querySelector('.chapter-title');
    if (chapterTitle) {
        chapterTitle.textContent = `Chapter ${currentChapter}`;
    }
    
    // Load chapter content
    loadChapterContent(currentChapter);
    
    // Setup navigation buttons
    const prevButton = document.querySelector('.prev-chapter');
    const nextButton = document.querySelector('.next-chapter');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentChapter > 0) {
                window.location.href = `chapter.html?id=${currentChapter - 1}`;
            }
        });
        
        // Disable prev button if on chapter 0
        if (currentChapter === 0) {
            prevButton.disabled = true;
            prevButton.style.opacity = '0.5';
        }
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentChapter < 204) {
                window.location.href = `chapter.html?id=${currentChapter + 1}`;
            }
        });
        
        // Disable next button if on chapter 204
        if (currentChapter === 204) {
            nextButton.disabled = true;
            nextButton.style.opacity = '0.5';
        }
    }
    
    // Setup chapter dropdown
    const chapterSelect = document.querySelector('#chapter-select');
    if (chapterSelect) {
        // Add Chapter 0 first
        const chapterZeroOption = document.createElement('option');
        chapterZeroOption.value = 0;
        chapterZeroOption.textContent = 'Chapter 0';
        if (currentChapter === 0) {
            chapterZeroOption.selected = true;
        }
        chapterSelect.appendChild(chapterZeroOption);
        
        // Add chapters 1-204
        for (let i = 1; i <= 204; i++) {
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

// Load chapter content based on chapter number
function loadChapterContent(chapterNumber) {
    const chapterContent = document.querySelector('.chapter-content');
    if (!chapterContent) return;
    
    // Clear existing content
    chapterContent.innerHTML = '';
    
    // Force visibility of the container
    chapterContent.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important;';
    
    if (chapterNumber === 0) {
        // Load Chapter 0 images (02.jpg to 09.jpg)
        for (let i = 2; i <= 9; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 0/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 0 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 0 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 0 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 0 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 1) {
        // Load Chapter 1 images (01.jpg to 26.jpg)
        for (let i = 1; i <= 26; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 1/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 1 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 1 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 1 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 1 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 2) {
        // Load Chapter 2 images (01.jpg to 11.jpg)
        for (let i = 1; i <= 11; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 2/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 2 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 2 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 2 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 2 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 3) {
        // Load Chapter 3 images (01.jpg to 17.jpg)
        for (let i = 1; i <= 17; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 3/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 3 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 3 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 3 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 3 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 4) {
        // Load Chapter 4 images (01.jpg to 16.jpg)
        for (let i = 1; i <= 16; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 4/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 4 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 4 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 4 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 4 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 5) {
        // Load Chapter 5 images (01.jpg to 14.jpg)
        for (let i = 1; i <= 14; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 5/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 5 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 5 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 5 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 5 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 6) {
        // Load Chapter 6 images (03.jpg to 32.jpg)
        for (let i = 3; i <= 32; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 6/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 6 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 6 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 6 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 6 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 7) {
        // Load Chapter 7 images (03.jpg to 29.jpg)
        for (let i = 3; i <= 29; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 7/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 7 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 7 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 7 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 7 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 8) {
        // Load Chapter 8 images (03.jpg to 29.jpg)
        for (let i = 3; i <= 29; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 8/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 8 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 8 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 8 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 8 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 9) {
        // Load Chapter 9 images (03.jpg to 21.jpg)
        for (let i = 3; i <= 21; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 9/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 9 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 9 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 9 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 9 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 10) {
        // Load Chapter 10 images (03.jpg to 43.jpg)
        for (let i = 3; i <= 43; i++) {
            const panel = document.createElement('div');
            panel.className = 'panel';
            panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
            
            const img = document.createElement('img');
            img.src = `images/chapter 10/${i.toString().padStart(2, '0')}.jpg`;
            img.alt = `Chapter 10 - Page ${i}`;
            img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
            
            // Add error handling for image loading
            img.onload = function() {
                console.log(`Chapter 10 - Image ${i} loaded successfully`);
            };
            img.onerror = function() {
                console.error(`Failed to load Chapter 10 image ${i}: ${img.src}`);
                panel.innerHTML = `<p style="color: white;">Failed to load Chapter 10 image ${i}</p>`;
            };
            
            panel.appendChild(img);
            chapterContent.appendChild(panel);
        }
    } else if (chapterNumber === 11) {
         // Load Chapter 11 images (03.jpg to 34.jpg)
         for (let i = 3; i <= 34; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 11/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 11 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 11 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 11 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 11 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else {
         // For other chapters, keep the dummy panels
         for (let i = 0; i < 6; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel fade-in active';
             chapterContent.appendChild(panel);
         }
     }
 }
 
 // Run chapter navigation setup if on chapter page
 document.addEventListener('DOMContentLoaded', setupChapterNavigation);
 
 // Generate chapter cards for chapters.html
 function generateChapterCards() {
    const chaptersGrid = document.querySelector('.chapters-grid');
    if (!chaptersGrid) return;
    
    // Function to get chapter text based on screen size
    function getChapterText(number) {
        return window.innerWidth <= 768 ? number : `Chapter ${number}`;
    }
    
    // Add Chapter 0 first
    const chapterZeroCard = document.createElement('div');
    chapterZeroCard.className = 'chapter-card fade-in';
    chapterZeroCard.style.cursor = 'pointer';
    chapterZeroCard.onclick = () => window.location.href = 'chapter.html?id=0';
    
    chapterZeroCard.innerHTML = `
        <div class="chapter-number">${getChapterText(0)}</div>
    `;
    
    chaptersGrid.appendChild(chapterZeroCard);
    
    // Force visibility for chapter 0
    setTimeout(() => {
        chapterZeroCard.classList.add('active');
    }, 25); // Show first
    
    // Add chapters 1-204
    for (let i = 1; i <= 204; i++) {
        const card = document.createElement('div');
        card.className = 'chapter-card fade-in';
        card.style.cursor = 'pointer';
        card.onclick = () => window.location.href = `chapter.html?id=${i}`;
        
        card.innerHTML = `
            <div class="chapter-number">${getChapterText(i)}</div>
        `;
        
        chaptersGrid.appendChild(card);
        
        // Force visibility for dynamically created cards
        setTimeout(() => {
            card.classList.add('active');
        }, (i + 1) * 50); // Stagger the animations (i+1 to account for chapter 0)
    }
    
    // Update chapter text on window resize
    window.addEventListener('resize', () => {
        const chapterNumbers = document.querySelectorAll('.chapter-number');
        chapterNumbers.forEach((element, index) => {
            const chapterNum = index === 0 ? 0 : index;
            element.textContent = getChapterText(chapterNum);
        });
    });
}

// Run chapter card generation if on chapters page
document.addEventListener('DOMContentLoaded', generateChapterCards);