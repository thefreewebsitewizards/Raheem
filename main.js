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
    const rawId = urlParams.get('id');
    const isSpecialChapter = rawId === '90.2';
    let currentChapter = rawId !== null ? parseInt(rawId) : 1;
    
    // Ensure chapter is within valid range (now includes chapter 0)
    if (!isSpecialChapter) {
        if (currentChapter < 0) currentChapter = 0;
        if (currentChapter > 204) currentChapter = 204;
    }
    
    // Update chapter title
    const chapterTitle = document.querySelector('.chapter-title');
    if (chapterTitle) {
        chapterTitle.textContent = isSpecialChapter ? 'Chapter 90.2' : `Chapter ${currentChapter}`;
    }
    
    // Load chapter content
    loadChapterContent(isSpecialChapter ? '90.2' : currentChapter);
    
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
        
        // Add chapters 1-90
        for (let i = 1; i <= 90; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Chapter ${i}`;
            if (!isSpecialChapter && i === currentChapter) {
                option.selected = true;
            }
            chapterSelect.appendChild(option);
        }
        
        // Add special Chapter 90.2 option (placed between 90 and 91)
        const specialOption = document.createElement('option');
        specialOption.value = '90.2';
        specialOption.textContent = 'Chapter 90.2';
        if (isSpecialChapter) {
            specialOption.selected = true;
        }
        chapterSelect.appendChild(specialOption);
        
        // Add chapters 91-204
        for (let i = 91; i <= 204; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Chapter ${i}`;
            if (!isSpecialChapter && i === currentChapter) {
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
     } else if (chapterNumber === 12) {
         // Load Chapter 12 images (03.jpg to 30.jpg and 32.jpg)
         const pages = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32];
         for (const i of pages) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 12/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 12 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 12 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 12 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 12 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 13) {
         // Load Chapter 13 images (03.jpg to 24.jpg)
         for (let i = 3; i <= 24; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 13/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 13 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 13 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 13 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 13 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 14) {
         // Load Chapter 14 images (03.jpg to 21.jpg and 23.jpg to 32.jpg)
         const pages = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32];
         for (const i of pages) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 14/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 14 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 14 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 14 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 14 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 15) {
         // Load Chapter 15 images (03.jpg to 24.jpg)
         for (let i = 3; i <= 24; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 15/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 15 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 15 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 15 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 15 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 16) {
         // Load Chapter 16 images (03.jpg to 31.jpg)
         for (let i = 3; i <= 31; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 16/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 16 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 16 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 16 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 16 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 17) {
         // Load Chapter 17 images (03.jpg to 34.jpg)
         for (let i = 3; i <= 34; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 17/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 17 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 17 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 17 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 17 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 18) {
         // Load Chapter 18 images (03.jpg to 29.jpg and 31.jpg to 38.jpg)
         for (let i = 3; i <= 38; i++) {
             if (i === 30) continue; // Skip missing image 30.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 18/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 18 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 18 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 18 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 18 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 19) {
         // Load Chapter 19 images (03.jpg to 29.jpg and 31.jpg to 33.jpg)
         for (let i = 3; i <= 33; i++) {
             if (i === 30) continue; // Skip missing image 30.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 19/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 19 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 19 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 19 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 19 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 20) {
         // Load Chapter 20 images (03.jpg to 20.jpg and 22.jpg)
         for (let i = 3; i <= 22; i++) {
             if (i === 21) continue; // Skip missing image 21.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 20/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 20 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 20 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 20 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 20 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 21) {
         // Load Chapter 21 images (03.jpg to 19.jpg and 21.jpg to 43.jpg)
         for (let i = 3; i <= 43; i++) {
             if (i === 20) continue; // Skip missing image 20.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 21/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 21 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 21 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 21 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 21 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 22) {
         // Load Chapter 22 images (03.jpg to 45.jpg, skipping 36.jpg)
         for (let i = 3; i <= 45; i++) {
             if (i === 36) continue; // Skip missing image 36.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 22/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 22 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 22 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 22 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 22 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 23) {
         // Load Chapter 23 images (02.jpg to 27.jpg, skipping 07.jpg)
         for (let i = 2; i <= 27; i++) {
             if (i === 7) continue; // Skip missing image 07.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 23/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 23 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 23 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 23 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 23 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 24) {
         // Load Chapter 24 images (02.jpg to 29.jpg)
         for (let i = 2; i <= 29; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 24/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 24 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 24 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 24 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 24 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 25) {
         // Load Chapter 25 images (02.jpg to 26.jpg, skipping 24.jpg)
         for (let i = 2; i <= 26; i++) {
             if (i === 24) continue; // Skip missing image 24.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 25/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 25 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 25 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 25 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 25 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 26) {
         // Load Chapter 26 images (02.jpg to 26.jpg, skipping 14.jpg)
         for (let i = 2; i <= 26; i++) {
             if (i === 14) continue; // Skip missing image 14.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 26/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 26 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 26 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 26 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 26 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 27) {
         // Load Chapter 27 images (02.jpg to 38.jpg)
         for (let i = 2; i <= 38; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 27/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 27 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 27 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 27 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 27 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 28) {
         // Load Chapter 28 images (02.jpg to 37.jpg)
         for (let i = 2; i <= 37; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 28/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 28 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 28 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 28 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 28 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 29) {
         // Load Chapter 29 images (02.jpg to 42.jpg)
         for (let i = 2; i <= 42; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 29/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 29 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 29 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 29 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 29 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 30) {
         // Load Chapter 30 images (01.jpg to 30.jpg, skipping 19.jpg)
         for (let i = 1; i <= 30; i++) {
             if (i === 19) continue; // Skip missing image 19.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 30/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 30 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 30 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 30 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 30 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 31) {
         // Load Chapter 31 images (01.jpg to 25.jpg)
         for (let i = 1; i <= 25; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 31/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 31 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 31 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 31 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 31 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 32) {
         // Load Chapter 32 images (01.jpg to 27.jpg)
         for (let i = 1; i <= 27; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 32/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 32 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 32 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 32 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style="color: white;">Failed to load Chapter 32 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 33) {
         // Load Chapter 33 images (01.jpg to 30.jpg)
         for (let i = 1; i <= 30; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 33/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 33 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 33 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 33 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 33 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 34) {
         // Load Chapter 34 images (01.jpg to 34.jpg)
         for (let i = 1; i <= 34; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 34/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 34 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 34 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 34 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 34 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 35) {
         // Load Chapter 35 images (01.jpg to 27.jpg, skipping 10.jpg)
         for (let i = 1; i <= 27; i++) {
             if (i === 10) continue;
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 35/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 35 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 35 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 35 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 35 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 36) {
         // Load Chapter 36 images (01.jpg to 26.jpg, skipping 13.jpg)
         for (let i = 1; i <= 26; i++) {
             if (i === 13) continue;
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 36/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 36 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 36 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 36 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 36 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 37) {
         // Load Chapter 37 images (01.jpg to 30.jpg, skipping 04.jpg, 19.jpg, 29.jpg)
         for (let i = 1; i <= 30; i++) {
             if (i === 4 || i === 19 || i === 29) continue;
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 37/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 37 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 37 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 37 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 37 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 38) {
         // Load Chapter 38 images (01.jpg to 33.jpg)
         for (let i = 1; i <= 33; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 38/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 38 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 38 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 38 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 38 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 39) {
         // Load Chapter 39 images (01.jpg to 33.jpg)
         for (let i = 1; i <= 33; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 39/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 39 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 39 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 39 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 39 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 40) {
         // Load Chapter 40 images (01.jpg to 26.jpg)
         for (let i = 1; i <= 26; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 40/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 40 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 40 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 40 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 40 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 41) {
         // Load Chapter 41 images (01.jpg to 28.jpg)
         for (let i = 1; i <= 28; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 41/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 41 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 41 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 41 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 41 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 42) {
         // Load Chapter 42 images (01.jpg to 25.jpg)
         for (let i = 1; i <= 25; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 42/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 42 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 42 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 42 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 42 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 43) {
         // Load Chapter 43 images (02.png to 15.png, skipping 05.png)
         for (let i = 2; i <= 15; i++) {
             if (i === 5) continue; // Skip missing 05.png
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 43/${i.toString().padStart(2, '0')}.png`;
             img.alt = `Chapter 43 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 43 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 43 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 43 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 44) {
         // Load Chapter 44 images (01.jpg to 26.jpg)
         for (let i = 1; i <= 26; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 44/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 44 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 44 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 44 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 44 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 45) {
         // Load Chapter 45 images (01.jpg to 38.jpg, skipping 03.jpg and 35.jpg)
         for (let i = 1; i <= 38; i++) {
             if (i === 3 || i === 35) continue; // Skip missing files
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 45/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 45 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 45 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 45 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 45 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 46) {
         // Load Chapter 46 images (01.jpg to 21.jpg)
         for (let i = 1; i <= 21; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 46/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 46 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 46 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 46 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 46 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 47) {
         // Load Chapter 47 images (01.jpg to 26.jpg)
         for (let i = 1; i <= 26; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 47/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 47 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 47 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 47 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 47 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 48) {
         // Load Chapter 48 images (02.jpg to 23.jpg)
         for (let i = 2; i <= 23; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 48/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 48 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 48 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 48 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 48 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 49) {
         // Load Chapter 49 images (01.jpg to 29.jpg, skipping 26.jpg)
         for (let i = 1; i <= 29; i++) {
             if (i === 26) continue; // Skip missing 26.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 49/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 49 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 49 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 49 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 49 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 50) {
         // Load Chapter 50 images (01.jpg to 32.jpg)
         for (let i = 1; i <= 32; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 50/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 50 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 50 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 50 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 50 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 51) {
         // Load Chapter 51 images (01.jpg to 39.jpg)
         for (let i = 1; i <= 39; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 51/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 51 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 51 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 51 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 51 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 52) {
         // Load Chapter 52 images (01.jpg to 31.jpg, skipping 30.jpg)
         for (let i = 1; i <= 31; i++) {
             if (i === 30) continue; // Skip missing 30.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 52/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 52 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 52 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 52 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 52 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 53) {
         // Load Chapter 53 images (01.jpg to 40.jpg, skipping 18.jpg and 36.jpg)
         for (let i = 1; i <= 40; i++) {
             if (i === 18 || i === 36) continue; // Skip missing files
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 53/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 53 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 53 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 53 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 53 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 54) {
         // Load Chapter 54 images (01.jpg to 31.jpg)
         for (let i = 1; i <= 31; i++) {
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 54/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 54 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 54 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 54 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 54 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 55) {
         // Load Chapter 55 images (01.jpg to 27.jpg, skipping 03.jpg)
         for (let i = 1; i <= 27; i++) {
             if (i === 3) continue; // Skip missing 03.jpg
             const panel = document.createElement('div');
             panel.className = 'panel';
             panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
             
             const img = document.createElement('img');
             img.src = `images/chapter 55/${i.toString().padStart(2, '0')}.jpg`;
             img.alt = `Chapter 55 - Page ${i}`;
             img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
             
             // Add error handling for image loading
             img.onload = function() {
                 console.log(`Chapter 55 - Image ${i} loaded successfully`);
             };
             img.onerror = function() {
                 console.error(`Failed to load Chapter 55 image ${i}: ${img.src}`);
                 panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 55 image ${i}</p>`;
             };
             
             panel.appendChild(img);
             chapterContent.appendChild(panel);
         }
     } else if (chapterNumber === 56) {
          // Load Chapter 56 images (01.jpg to 31.jpg, skipping 23.jpg)
          for (let i = 1; i <= 31; i++) {
              if (i === 23) continue; // Skip missing 23.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 56/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 56 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 56 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 56 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 56 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 57) {
          // Load Chapter 57 images (01.jpg to 36.jpg, skipping 02.jpg)
          for (let i = 1; i <= 36; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 57/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 57 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 57 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 57 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 57 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 58) {
          // Load Chapter 58 images (01.jpg to 37.jpg, skipping 02.jpg)
          for (let i = 1; i <= 37; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 58/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 58 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 58 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 58 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 58 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 59) {
          // Load Chapter 59 images (01.jpg to 32.jpg, skipping 02.jpg)
          for (let i = 1; i <= 32; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 59/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 59 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 59 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 59 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 59 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 60) {
          // Load Chapter 60 images (01.jpg to 29.jpg, skipping 02.jpg)
          for (let i = 1; i <= 29; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 60/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 60 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 60 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 60 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 60 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 61) {
          // Load Chapter 61 images (01.jpg to 23.jpg, skipping 02.jpg)
          for (let i = 1; i <= 23; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 61/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 61 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 61 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 61 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 61 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 62) {
          // Load Chapter 62 images (01.jpg to 25.jpg, skipping 02.jpg)
          for (let i = 1; i <= 25; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 62/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 62 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 62 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 62 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 62 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 63) {
          // Load Chapter 63 images (01.jpg to 25.jpg, skipping 02.jpg)
          for (let i = 1; i <= 25; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 63/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 63 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              img.onload = function() {
                  console.log(`Chapter 63 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 63 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 63 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 64) {
          // Load Chapter 64 images (01.jpg to 33.jpg, skipping 02.jpg)
          for (let i = 1; i <= 33; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 64/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 64 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 64 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 64 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 64 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 65) {
          // Load Chapter 65 images (01.jpg to 36.jpg, skipping 02.jpg and 32.jpg)
          for (let i = 1; i <= 36; i++) {
              if (i === 2 || i === 32) continue; // Skip missing 02.jpg and 32.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 65/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 65 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 65 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 65 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 65 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 66) {
          // Load Chapter 66 images (01.jpg to 32.jpg, skipping 02.jpg)
          for (let i = 1; i <= 32; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 66/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 66 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 66 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 66 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 66 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 67) {
          // Load Chapter 67 images (01.jpg to 36.jpg, skipping 02.jpg)
          for (let i = 1; i <= 36; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 67/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 67 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 67 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 67 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 67 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 68) {
          // Load Chapter 68 images (01.jpg to 45.jpg, skipping 02.jpg)
          for (let i = 1; i <= 45; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 68/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 68 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 68 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 68 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 68 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 69) {
          // Load Chapter 69 images (01.jpg to 42.jpg, skipping 02.jpg)
          for (let i = 1; i <= 42; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 69/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 69 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 69 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 69 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 69 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 70) {
          // Load Chapter 70 images (01.jpg to 36.jpg, skipping 02.jpg)
          for (let i = 1; i <= 36; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 70/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 70 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 70 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 70 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 70 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 71) {
          // Load Chapter 71 images (01.jpg to 42.jpg, skipping 02.jpg)
          for (let i = 1; i <= 42; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 71/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 71 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 71 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 71 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 71 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 72) {
          // Load Chapter 72 images (01.jpg to 40.jpg, skipping 02.jpg)
          for (let i = 1; i <= 40; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 72/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 72 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 72 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 72 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 72 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 73) {
          // Load Chapter 73 images (01.jpg to 30.jpg, skipping 02.jpg)
          for (let i = 1; i <= 30; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 73/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 73 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 73 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 73 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 73 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 74) {
          // Load Chapter 74 images (01.jpg to 18.jpg, skipping 02.jpg)
          for (let i = 1; i <= 18; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 74/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 74 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 74 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 74 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 74 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 75) {
          // Load Chapter 75 images (01.jpg to 23.jpg)
          for (let i = 1; i <= 23; i++) {
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 75/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 75 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 75 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 75 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 75 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 76) {
          // Load Chapter 76 images (01.jpg to 30 with 02 missing and 30.png)
          for (let i = 1; i <= 30; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              const ext = i === 30 ? 'png' : 'jpg';
              img.src = `images/chapter 76/${i.toString().padStart(2, '0')}.${ext}`;
              img.alt = `Chapter 76 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 76 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 76 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 76 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 77) {
          // Load Chapter 77 images (01.jpg to 25.jpg, skipping 02.jpg)
          for (let i = 1; i <= 25; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 77/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 77 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 77 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 77 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 77 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 78) {
          // Load Chapter 78 images (01.jpg to 27.jpg, skipping 03.jpg)
          for (let i = 1; i <= 27; i++) {
              if (i === 3) continue; // Skip missing 03.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 78/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 78 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 78 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 78 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 78 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 79) {
          // Load Chapter 79 images (01.jpg to 30.jpg, skipping 04.jpg)
          for (let i = 1; i <= 30; i++) {
              if (i === 4) continue; // Skip missing 04.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 79/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 79 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 79 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 79 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 79 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 80) {
          // Load Chapter 80 images (01.jpg to 35.jpg, skipping 02.jpg)
          for (let i = 1; i <= 35; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 80/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 80 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 80 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 80 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 80 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 81) {
          // Load Chapter 81 images (01.jpg to 35.jpg, skipping 02.jpg)
          for (let i = 1; i <= 35; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 81/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 81 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 81 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 81 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 81 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 82) {
          // Load Chapter 82 images (01.jpg to 29.jpg, skipping 02.jpg)
          for (let i = 1; i <= 29; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 82/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 82 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 82 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 82 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 82 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 83) {
          // Load Chapter 83 images (01.jpg to 24.jpg, skipping 02.jpg)
          for (let i = 1; i <= 24; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 83/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 83 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 83 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 83 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 83 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 84) {
          // Load Chapter 84 images (01.jpg to 30.jpg, skipping 02.jpg)
          for (let i = 1; i <= 30; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 84/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 84 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 84 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 84 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 84 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 85) {
          // Load Chapter 85 images (01.jpg to 31.jpg, skipping 02.jpg)
          for (let i = 1; i <= 31; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 85/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 85 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 85 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 85 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 85 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 86) {
          // Load Chapter 86 images (01.jpg to 25.jpg, skipping 02.jpg)
          for (let i = 1; i <= 25; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 86/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 86 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 86 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 86 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 86 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 87) {
          // Load Chapter 87 images (01.jpg to 30.jpg, skipping 02.jpg)
          for (let i = 1; i <= 30; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 87/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 87 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 87 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 87 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 87 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 88) {
          // Load Chapter 88 images (01.jpg to 32.jpg, skipping 02.jpg)
          for (let i = 1; i <= 32; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 88/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 88 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 88 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 88 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 88 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 89) {
          // Load Chapter 89 images (01.jpg to 34.jpg, skipping 02.jpg)
          for (let i = 1; i <= 34; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 89/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 89 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 89 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 89 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 89 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 90) {
          // Load Chapter 90 images (01.jpg to 27.jpg, skipping 02.jpg)
          for (let i = 1; i <= 27; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 90/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 90 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 90 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 90 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 90 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === '90.2') {
          // Load Chapter 90.2 images (01.png to 43.png)
          for (let i = 1; i <= 43; i++) {
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 90.2/${i.toString().padStart(2, '0')}.png`;
              img.alt = `Chapter 90.2 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              img.onload = function() {
                  console.log(`Chapter 90.2 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 90.2 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style="color: white;">Failed to load Chapter 90.2 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 91) {
          // Load Chapter 91 images (01.jpg to 24.jpg, skipping 02.jpg)
          for (let i = 1; i <= 24; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 91/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 91 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 91 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 91 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 91 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 92) {
          // Load Chapter 92 images (01.jpg to 31.jpg, skipping 02.jpg)
          for (let i = 1; i <= 31; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 92/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 92 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 92 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 92 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 92 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 93) {
          // Load Chapter 93 images (01.jpg to 26.jpg, skipping 02.jpg)
          for (let i = 1; i <= 26; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 93/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 93 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 93 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 93 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 93 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 94) {
          // Load Chapter 94 images (01.jpg to 52.jpg, skipping 02.jpg)
          for (let i = 1; i <= 52; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 94/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 94 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 94 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 94 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 94 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 95) {
          // Load Chapter 95 images (01.jpg to 46.jpg, skipping 02.jpg)
          for (let i = 1; i <= 46; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 95/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 95 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 95 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 95 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 95 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 96) {
          // Load Chapter 96 images (01.jpg to 37.jpg, skipping 02.jpg)
          for (let i = 1; i <= 37; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 96/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 96 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 96 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 96 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 96 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 97) {
          // Load Chapter 97 images (01.jpg to 35.jpg, skipping 02.jpg)
          for (let i = 1; i <= 35; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 97/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 97 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 97 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 97 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 97 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 98) {
          // Load Chapter 98 images (01.jpg to 37.jpg, skipping 02.jpg)
          for (let i = 1; i <= 37; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 98/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 98 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 98 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 98 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 98 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 99) {
          // Load Chapter 99 images (01.jpg to 39.jpg, skipping 02.jpg)
          for (let i = 1; i <= 39; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 99/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 99 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 99 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 99 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 99 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 100) {
          // Load Chapter 100 images (01.jpg to 50.jpg, skipping 02.jpg)
          for (let i = 1; i <= 50; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 100/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 100 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 100 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 100 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 100 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 101) {
          // Load Chapter 101 images (01.jpg to 34.jpg, skipping 02.jpg)
          for (let i = 1; i <= 34; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 101/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 101 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 101 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 101 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 101 image ${i}</p>`;
              };
              
              panel.appendChild(img);
              chapterContent.appendChild(panel);
          }
      } else if (chapterNumber === 102) {
          // Load Chapter 102 images (01.jpg to 43.jpg, skipping 02.jpg)
          for (let i = 1; i <= 43; i++) {
              if (i === 2) continue; // Skip missing 02.jpg
              const panel = document.createElement('div');
              panel.className = 'panel';
              panel.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: flex !important; min-height: 600px;';
              
              const img = document.createElement('img');
              img.src = `images/chapter 102/${i.toString().padStart(2, '0')}.jpg`;
              img.alt = `Chapter 102 - Page ${i}`;
              img.style.cssText = 'opacity: 1 !important; visibility: visible !important; display: block !important; width: 100%; height: auto;';
              
              // Add error handling for image loading
              img.onload = function() {
                  console.log(`Chapter 102 - Image ${i} loaded successfully`);
              };
              img.onerror = function() {
                  console.error(`Failed to load Chapter 102 image ${i}: ${img.src}`);
                  panel.innerHTML = `<p style=\"color: white;\">Failed to load Chapter 102 image ${i}</p>`;
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
        <div class="chapter-number" data-chapter-id="0">${getChapterText(0)}</div>
    `;
    
    chaptersGrid.appendChild(chapterZeroCard);
    
    // Force visibility for chapter 0
    setTimeout(() => {
        chapterZeroCard.classList.add('active');
    }, 25); // Show first
    
    // Add chapters 1-90
    for (let i = 1; i <= 90; i++) {
        const card = document.createElement('div');
        card.className = 'chapter-card fade-in';
        card.style.cursor = 'pointer';
        card.onclick = () => window.location.href = `chapter.html?id=${i}`;
        
        card.innerHTML = `
            <div class="chapter-number">${getChapterText(i)}</div>
        `;
        // Tag with dataset for resize handling
        const numberEl = card.querySelector('.chapter-number');
        if (numberEl) numberEl.dataset.chapterId = i.toString();
        
        chaptersGrid.appendChild(card);
        
        // Force visibility for dynamically created cards
        setTimeout(() => {
            card.classList.add('active');
        }, (i + 1) * 50); // Stagger the animations (i+1 to account for chapter 0)
    }
    
    // Insert special Chapter 90.2 card between 90 and 91
    const specialCard = document.createElement('div');
    specialCard.className = 'chapter-card fade-in';
    specialCard.style.cursor = 'pointer';
    specialCard.onclick = () => window.location.href = 'chapter.html?id=90.2';
    specialCard.innerHTML = `<div class="chapter-number" data-chapter-id="90.2">Chapter 90.2</div>`;
    chaptersGrid.appendChild(specialCard);
    setTimeout(() => {
        specialCard.classList.add('active');
    }, (92) * 50); // After 0..90
    
    // Add chapters 91-204
    for (let i = 91; i <= 204; i++) {
        const card = document.createElement('div');
        card.className = 'chapter-card fade-in';
        card.style.cursor = 'pointer';
        card.onclick = () => window.location.href = `chapter.html?id=${i}`;
        
        card.innerHTML = `
            <div class="chapter-number">${getChapterText(i)}</div>
        `;
        // Tag with dataset for resize handling
        const numberEl = card.querySelector('.chapter-number');
        if (numberEl) numberEl.dataset.chapterId = i.toString();
        
        chaptersGrid.appendChild(card);
        
        // Force visibility for dynamically created cards
        setTimeout(() => {
            card.classList.add('active');
        }, (i + 1) * 50); // Stagger the animations (i+1 to account for chapter 0)
    }
    
    // Update chapter text on window resize
    window.addEventListener('resize', () => {
        const chapterNumbers = document.querySelectorAll('.chapter-number');
        chapterNumbers.forEach((element) => {
            const chapterId = element.dataset.chapterId;
            if (chapterId === '90.2') {
                element.textContent = window.innerWidth <= 768 ? '90.2' : 'Chapter 90.2';
            } else {
                const num = parseInt(chapterId || '0', 10);
                element.textContent = getChapterText(num);
            }
        });
    });
}

// Run chapter card generation if on chapters page
document.addEventListener('DOMContentLoaded', generateChapterCards);