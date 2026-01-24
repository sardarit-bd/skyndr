// Add this at the beginning of script.js to see what's running
console.log('script.js loaded');

const trustTabs = document.querySelectorAll(".trust-tab");
const trustImage = document.getElementById("trustImage");
const trustTitle = document.getElementById("trustTitle");
const trustText = document.getElementById("trustText");
const trustAuthor = document.getElementById("trustAuthor");

/* -------------------------------------------
   SERVICE SLIDERS — FULLY MODULAR VERSION
--------------------------------------------*/

document.addEventListener("scroll", () => {
    const section = document.querySelector(".why-work-section");
    const progress = document.querySelector(".why-progress-line");
    const dots = document.querySelectorAll(".why-dot");

    if (!section || !progress) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let visible = windowHeight - rect.top;
    if (visible < 0) visible = 0;

    let progressPercent = (visible / rect.height) * 150;
    if (progressPercent > 100) progressPercent = 100;

    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
        progress.style.width = "1px";
        progress.style.height = progressPercent + "%";
        progress.style.top = "15px";    
        progress.style.bottom = "auto"; 
    } else {
        progress.style.height = "1px";
        progress.style.width = progressPercent + "%";
        progress.style.transform = "none";
    }

    // DOT ACTIVATION
    dots.forEach((dot, index) => {
        const dotPosition = (index / (dots.length - 1)) * 100;
        dot.classList.toggle("why-active", progressPercent >= dotPosition);
    });
});

document.querySelectorAll(".service-slider").forEach((slider) => {
    const slides = slider.querySelector(".slides");
    const images = slider.querySelectorAll(".slide-img");
    const dotsContainer = slider.querySelector(".dots");
    const next = slider.querySelector(".right");
    const prev = slider.querySelector(".left");

    let index = 0;
    const total = images.length;

    /* Create dots */
    dotsContainer.innerHTML = "";
    images.forEach((_, i) => {
        let dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function update() {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove("active"));
        if (dots[index]) dots[index].classList.add("active");
    }

    function nextSlide() {
        index = (index + 1) % total;
        update();
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        update();
    }

    function goTo(i) {
        index = i;
        update();
    }

    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", prevSlide);
    update();
});

const trustData = {
    kdx: {
        title: "Ads Management + Strategy",
        text: `We've been partnering with Skyndr for nearly a year now, and their impact on our ad performance has been outstanding. From the very beginning, they took the time to understand our brand, our audience, and our goals and then built campaigns that actually delivered results.<br><br>What sets Skyndr apart is their strategic approach. They don't just run ads; they constantly analyze, test, and optimize every detail to make sure each dollar spent creates real growth.`,
        author: "Odai, Founder of KDX Middle East",
        image: "https://res.cloudinary.com/dg83pvgls/image/upload/v1769227221/whyus_kthxxn.png"
    },
    washclub: {
        title: "Paid Social",
        text: `We've worked with Skyndr for several months now, and the difference in our paid social results has been incredible. Their team took over our Meta ads, optimized our funnels, and even improved parts of our website to help increase conversions.`,
        author: "Mahmoud CEO of Washclub",
        image: "https://res.cloudinary.com/dg83pvgls/image/upload/v1769232317/whyus3_tkwezu.jpg"
    },
    luster: {
        title: "Full-Service Marketing (Strategy + Ads + UGC)",
        text: `Our partnership with Skyndr has completely transformed our online presence. From ad strategy to creative production and content testing, they've managed every detail with precision and passion.`,
        author: "Hassan Co-founder of Luster ",
        image: "https://res.cloudinary.com/dg83pvgls/image/upload/v1769226021/div.flex-50_1_c6uxzn.svg"
    },
    sunguard: {
        title: "UGC Content + Creative Ads",
        text: `Working with Skyndr on our creative ad strategy has been a game changer. They helped us completely revamp our content with fresh UGC-style videos and authentic visuals that actually connect with our audience.`,
        author: "Saad CEO of Sunguard",
        image: "https://res.cloudinary.com/dg83pvgls/image/upload/v1769226021/div.flex-50_2_yrlrem.svg"
    },
    snake: {
        title: "Branding",
        text: `Our experience with Skyndr on our paid social, branding, and content creation has been nothing short of amazing. They took our scattered online presence and transformed it into a cohesive, high-performing brand.`,
        author: "Ahmad Owner of Snake Protection",
        image: "https://res.cloudinary.com/dg83pvgls/image/upload/v1769227227/whyus6_koipo2.png"
    }
};

// Trust tabs functionality (uncommented version)
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".trust-tab");
    const imgEl = document.getElementById("trustImage");
    const titleEl = document.getElementById("trustTitle");
    const textEl = document.getElementById("trustText");
    const authorEl = document.getElementById("trustAuthor");
    
    if (!tabs.length || !imgEl) return;
    
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            const key = this.getAttribute("data-target");
            const data = trustData[key];
            if (data) {
                titleEl.textContent = data.title;
                textEl.innerHTML = data.text;
                authorEl.textContent = data.author;
                const imgLoader = new Image();
                imgLoader.src = data.image;
                imgEl.style.opacity = "0.2";
                imgLoader.onload = () => {
                    imgEl.src = data.image;
                    imgEl.style.opacity = "1";
                };
            }
        });
    });
});

// IMPROVED TESTIMONIAL SLIDER - SINGLE IMPLEMENTATION
// document.addEventListener("DOMContentLoaded", () => {
//     const slider = document.getElementById("tSlider");
//     const prevBtn = document.getElementById("tPrev");
//     const nextBtn = document.getElementById("tNext");
    
//     if (!slider) return;
    
//     const cards = slider.querySelectorAll(".testimonial-card");
//     if (cards.length === 0) return;
    
//     const container = slider.parentElement;
//     const isMobile = () => window.innerWidth <= 768;
    
//     // Configurations
//     const gap = 30;
//     const cardWidthDesktop = 400;
//     const cardWidthMobile = window.innerWidth * 0.85;
//     const totalCardWidthDesktop = cardWidthDesktop + gap;
    
//     // State variables
//     let dotsContainer = null;
//     let dots = [];
//     let currentIndex = 0;
//     let isAnimating = false;
//     let autoSlideTimer = null;
//     let scrollTimeout = null;
    
//     // Create dots container for mobile
//     function createDots() {
//         if (dotsContainer) return;
        
//         dotsContainer = document.createElement("div");
//         dotsContainer.className = "mobile-dots-container";
//         dotsContainer.style.cssText = `
//             display: none;
//             justify-content: center;
//             gap: 8px;
//             padding: 15px 0;
//             width: 100%;
//             margin-top: 20px;
//         `;
        
//         for (let i = 0; i < cards.length; i++) {
//             const dot = document.createElement("button");
//             dot.className = "mobile-slider-dot";
//             dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
//             dot.setAttribute("data-index", i);
//             dot.style.cssText = `
//                 width: 12px;
//                 height: 12px;
//                 border-radius: 50%;
//                 border: none;
//                 background-color: ${i === 0 ? '#ff3d00' : '#dddddd'};
//                 cursor: pointer;
//                 transition: all 0.3s ease;
//                 padding: 0;
//             `;
//             dotsContainer.appendChild(dot);
//         }
        
//         container.parentNode.insertBefore(dotsContainer, container.nextSibling);
//         dots = dotsContainer.querySelectorAll(".mobile-slider-dot");
        
//         // Add click events to dots
//         dots.forEach(dot => {
//             dot.addEventListener("click", function() {
//                 const dotIndex = parseInt(this.getAttribute("data-index"));
//                 goToSlide(dotIndex);
//             });
//         });
//     }
    
//     // Update dots state
//     function updateDots(activeIndex) {
//         if (!dots || dots.length === 0) return;
        
//         dots.forEach((dot, i) => {
//             const isActive = i === activeIndex;
//             dot.style.backgroundColor = isActive ? '#ff3d00' : '#dddddd';
//             dot.style.transform = `scale(${isActive ? 1.3 : 1})`;
//         });
//     }
    
//     // Go to specific slide
//     function goToSlide(index) {
//         if (isAnimating) return;
        
//         currentIndex = index;
        
//         if (isMobile()) {
//             // Mobile: scroll to position
//             const cardWidth = window.innerWidth * 0.85;
//             const containerWidth = window.innerWidth;
//             const offset = (containerWidth - cardWidth) / 2;
//             const scrollPosition = (index * (cardWidth + gap)) - offset;
            
//             slider.scrollTo({
//                 left: scrollPosition,
//                 behavior: "smooth"
//             });
//             updateDots(index);
//         } else {
//             // Desktop: transform animation
//             isAnimating = true;
//             slider.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
//             slider.style.transform = `translateX(-${index * totalCardWidthDesktop}px)`;
            
//             // Reset animation flag after transition
//             setTimeout(() => {
//                 isAnimating = false;
//             }, 600);
//         }
//     }
    
//     // Next slide
//     function nextSlide() {
//         if (isAnimating) return;
        
//         if (currentIndex >= cards.length - 1) {
//             goToSlide(0);
//         } else {
//             goToSlide(currentIndex + 1);
//         }
//     }
    
//     // Previous slide
//     function prevSlide() {
//         if (isAnimating) return;
        
//         if (currentIndex <= 0) {
//             goToSlide(cards.length - 1);
//         } else {
//             goToSlide(currentIndex - 1);
//         }
//     }
    
//     // Setup mobile slider
//     function setupMobileSlider() {
//         // Hide desktop buttons
//         if (prevBtn && nextBtn) {
//             prevBtn.style.display = "none";
//             nextBtn.style.display = "none";
//         }
        
//         // Create and show dots
//         createDots();
//         if (dotsContainer) {
//             dotsContainer.style.display = "flex";
//         }
        
//         // Apply mobile styles
//         slider.style.cssText = `
//             display: flex;
//             overflow-x: auto;
//             scroll-snap-type: x mandatory;
//             scroll-behavior: smooth;
//             -webkit-overflow-scrolling: touch;
//             scrollbar-width: none;
//             -ms-overflow-style: none;
//             padding-left: calc(50vw - (85vw / 2));
//             gap: ${gap}px;
//         `;
        
//         // Style cards for mobile
//         cards.forEach((card, i) => {
//             card.style.cssText = `
//                 flex: 0 0 85vw;
//                 scroll-snap-align: center;
//             `;
//         });
        
//         // Hide scrollbar
//         slider.style.scrollbarWidth = "none";
        
//         // Update dots on scroll
//         function handleScroll() {
//             if (scrollTimeout) clearTimeout(scrollTimeout);
            
//             scrollTimeout = setTimeout(() => {
//                 const cardWidth = window.innerWidth * 0.85;
//                 const containerWidth = window.innerWidth;
//                 const offset = (containerWidth - cardWidth) / 2;
                
//                 const scrollLeft = slider.scrollLeft + offset;
//                 const newIndex = Math.round(scrollLeft / (cardWidth + gap));
                
//                 if (newIndex >= 0 && newIndex < cards.length && newIndex !== currentIndex) {
//                     currentIndex = newIndex;
//                     updateDots(currentIndex);
//                 }
//             }, 150);
//         }
        
//         slider.addEventListener("scroll", handleScroll);
        
//         // Clear any desktop timers
//         if (autoSlideTimer) {
//             clearInterval(autoSlideTimer);
//             autoSlideTimer = null;
//         }
//     }
    
//     // Setup desktop slider
//     function setupDesktopSlider() {
//         // Show desktop buttons
//         if (prevBtn && nextBtn) {
//             prevBtn.style.display = "flex";
//             nextBtn.style.display = "flex";
//         }
        
//         // Hide dots
//         if (dotsContainer) {
//             dotsContainer.style.display = "none";
//         }
        
//         // Reset styles
//         slider.style.cssText = `
//             display: flex;
//             transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//         `;
        
//         // Reset card styles
//         cards.forEach(card => {
//             card.style.cssText = `
//                 flex: 0 0 ${cardWidthDesktop}px;
//                 margin-right: ${gap}px;
//             `;
//         });
        
//         // Set initial position
//         slider.style.transform = `translateX(0px)`;
//         currentIndex = 0;
//         isAnimating = false;
        
//         // Setup navigation
//         if (nextBtn) {
//             nextBtn.onclick = nextSlide;
//         }
        
//         if (prevBtn) {
//             prevBtn.onclick = prevSlide;
//         }
        
//         // Auto-slide for desktop (optional)
//         // if (autoSlideTimer) clearInterval(autoSlideTimer);
//         // autoSlideTimer = setInterval(nextSlide, 4000);
        
//         // Pause on hover
//         // slider.addEventListener("mouseenter", () => {
//         //     if (autoSlideTimer) clearInterval(autoSlideTimer);
//         // });
        
//         // slider.addEventListener("mouseleave", () => {
//         //     if (autoSlideTimer) clearInterval(autoSlideTimer);
//         //     autoSlideTimer = setInterval(nextSlide, 4000);
//         // });
//     }
    
//     // Handle resize
//     function handleResize() {
//         if (isMobile()) {
//             setupMobileSlider();
//         } else {
//             setupDesktopSlider();
//         }
//     }
    
//     // Initialize
//     handleResize();
    
//     // Resize listener with debounce
//     let resizeTimer;
//     window.addEventListener("resize", () => {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(handleResize, 250);
//     });
    
//     // Touch/swipe support
//     let touchStartX = 0;
//     let touchStartY = 0;
    
//     slider.addEventListener("touchstart", (e) => {
//         touchStartX = e.touches[0].clientX;
//         touchStartY = e.touches[0].clientY;
//     });
    
//     slider.addEventListener("touchend", (e) => {
//         const touchEndX = e.changedTouches[0].clientX;
//         const touchEndY = e.changedTouches[0].clientY;
        
//         const diffX = touchStartX - touchEndX;
//         const diffY = touchStartY - touchEndY;
        
//         // Only handle horizontal swipes (not vertical scrolls)
//         if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
//             if (diffX > 0) {
//                 // Swipe left - next
//                 nextSlide();
//             } else {
//                 // Swipe right - previous
//                 prevSlide();
//             }
//         }
//     });
// });
