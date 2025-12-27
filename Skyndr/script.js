const trustTabs = document.querySelectorAll(".trust-tab");

const trustImage = document.getElementById("trustImage");
const trustTitle = document.getElementById("trustTitle");
const trustText = document.getElementById("trustText");
const trustAuthor = document.getElementById("trustAuthor");

const tSlider = document.getElementById("tSlider");
const tDots = document.querySelectorAll(".t-dot");
const tPrev = document.getElementById("tPrev");
const tNext = document.getElementById("tNext");
const cards = document.querySelectorAll(".testimonial-card");

let index = 0;


/* -------------------------------------------
   SERVICE SLIDERS — FULLY MODULAR VERSION
--------------------------------------------*/

document.addEventListener("scroll", () => {
    const section = document.querySelector(".why-work-section");
    const progress = document.querySelector(".why-progress-line");
    const dots = document.querySelectorAll(".why-dot");

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let visible = windowHeight - rect.top;
    if (visible < 0) visible = 0;

    let progressPercent = (visible / rect.height) * 150;
    if (progressPercent > 100) progressPercent = 100;

    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
        progress.style.width = "1px"; // force correct value
        progress.style.height = progressPercent + "%";
    } else {
        progress.style.height = "1px"; // force correct value
        progress.style.width = progressPercent + "%";
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
        dots[index].classList.add("active");
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

    //setInterval(nextSlide, 4000);

    update();
});

const trustData = {
    kdx: {
        title: "Ads Management + Strategy",
        text: `We've been partnering with Skyndr for nearly a year now, and their impact on our ad performance has been outstanding. From the very beginning, they took the time to understand our brand, our audience, and our goals and then built campaigns that actually delivered results.<br><br>What sets Skyndr apart is their strategic approach. They don't just run ads; they constantly analyze, test, and optimize every detail to make sure each dollar spent creates real growth.`,
        author: "Odai, Founder of KDX Middle East",
        image: "assets/images/whyus.png"
    },
    washclub: {
        title: "Paid Social",
        text: `We've worked with Skyndr for several months now, and the difference in our paid social results has been incredible. Their team took over our Meta ads, optimized our funnels, and even improved parts of our website to help increase conversions.`,
        author: "Mahmoud CEO of Washclub",
        image: "assets/images/whyus2.jpg"
    },
    luster: {
        title: "Full-Service Marketing (Strategy + Ads + UGC)",
        text: `Our partnership with Skyndr has completely transformed our online presence. From ad strategy to creative production and content testing, they've managed every detail with precision and passion.`,
        author: "Hassan Co-founder of Luster ",
        image: "assets/images/whyus3.jpg"
    },
    sunguard: {
        title: "UGC Content + Creative Ads",
        text: `Working with Skyndr on our creative ad strategy has been a game changer. They helped us completely revamp our content with fresh UGC-style videos and authentic visuals that actually connect with our audience.`,
        author: "Saad CEO of Sunguard",
        image: "assets/images/whyus4.jpg"
    },
    snake: {
        title: "Branding",
        text: `Our experience with Skyndr on our paid social, branding, and content creation has been nothing short of amazing. They took our scattered online presence and transformed it into a cohesive, high-performing brand.`,
        author: "Ahmad Owner of Snake Protection",
        image: "assets/images/whyus6.jpg"
    }
};
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
                console.log("Loading image for:", key);
            }
        });
    });
});


//testimonial slider auto swipe in mobile
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("tSlider");
    const prevBtn = document.getElementById("tPrev");
    const nextBtn = document.getElementById("tNext");
    const cards = slider.querySelectorAll(".testimonial-card");
    const container = slider.parentElement;

    if (!slider || cards.length === 0) return;

    const isMobile = () => window.innerWidth <= 768;
    
    // Gap and card width
    const gap = 30;
    const cardWidth = 400;
    const totalCardWidth = cardWidth + gap;

    /* ========= VARIABLES ========= */
    let dotsContainer = null;
    let dots = [];
    let index = 0;
    let isMoving = false;
    let autoSlide;
    let scrollTimeout;
    
    /* ========= INITIAL SETUP ========= */
    if (isMobile()) {
        setupMobileSlider();
    } else {
        setupDesktopSlider();
    }
    
    /* ========= MOBILE SLIDER SETUP (WITH DOTS) ========= */
    function setupMobileSlider() {
        // Hide desktop navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
        
        // Create dots container ONLY for mobile
        if (!dotsContainer) {
            createDots();
        }
        dotsContainer.style.display = "flex";
        
        // Mobile specific styles - CENTER ALIGNMENT
        slider.style.cssText = `
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-left: calc(50vw - (85vw / 2)); /* Center cards */
        `;
        
        // Apply center alignment to cards
        cards.forEach((card, i) => {
            card.style.cssText = `
                flex: 0 0 auto;
                width: 85vw;
                scroll-snap-align: center; /* Changed from 'start' to 'center' */
                margin-right: ${gap}px;
            `;
            
            // Remove last card margin
            if (i === cards.length - 1) {
                card.style.marginRight = "0";
            }
        });
        
        // Hide scrollbar
        slider.style.scrollbarWidth = "none";
        slider.style.msOverflowStyle = "none";
        
        // Handle scroll event for dot updates
        slider.addEventListener("scroll", updateDotsOnScroll);
        
        // Initial center alignment
        setTimeout(() => {
            if (slider.scrollLeft === 0) {
                updateDots(0);
            }
        }, 100);
        
        // Handle dot click for mobile - CENTER THE CARD
        dots.forEach(dot => {
            dot.addEventListener("click", function() {
                const dotIndex = parseInt(this.getAttribute("data-index"));
                index = dotIndex;
                
                // Calculate scroll position to center the card
                const cardWidthMobile = window.innerWidth * 0.85;
                const containerWidth = window.innerWidth;
                const cardOffset = (containerWidth - cardWidthMobile) / 2;
                const scrollPosition = (dotIndex * (cardWidthMobile + gap)) - cardOffset;
                
                slider.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth"
                });
                
                updateDots(dotIndex);
            });
        });
        
        // Disable desktop autoplay on mobile
        if (autoSlide) clearInterval(autoSlide);
    }
    
    /* ========= DESKTOP SLIDER SETUP (NO DOTS) ========= */
    function setupDesktopSlider() {
        // Show desktop navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.style.display = "flex";
            nextBtn.style.display = "flex";
        }
        
        // HIDE DOTS CONTAINER on desktop
        if (dotsContainer) {
            dotsContainer.style.display = "none";
        }
        
        // Remove mobile styles
        slider.style.cssText = "";
        cards.forEach(card => {
            card.style.cssText = "";
        });
        
        // Desktop cloning for infinite effect
        const firstClone = cards[0].cloneNode(true);
        const lastClone = cards[cards.length - 1].cloneNode(true);
        
        slider.appendChild(firstClone);
        slider.insertBefore(lastClone, cards[0]);
        
        const allCards = slider.querySelectorAll(".testimonial-card");
        
        index = 1;
        slider.style.transform = `translateX(-${index * totalCardWidth}px)`;
        
        // Remove mobile scroll listener
        slider.removeEventListener("scroll", updateDotsOnScroll);
        
        // Desktop move function
        function moveDesktop() {
            if (isMoving) return;
            isMoving = true;
            
            slider.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
            slider.style.transform = `translateX(-${index * totalCardWidth}px)`;
        }
        
        // Desktop navigation
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                index++;
                moveDesktop();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                index--;
                moveDesktop();
            });
        }
        
        // Desktop transition end
        slider.addEventListener("transitionend", () => {
            slider.style.transition = "none";
            
            if (allCards[index] === firstClone) {
                index = 1;
                slider.style.transform = `translateX(-${index * totalCardWidth}px)`;
            }
            
            if (allCards[index] === lastClone) {
                index = allCards.length - 2;
                slider.style.transform = `translateX(-${index * totalCardWidth}px)`;
            }
            
            isMoving = false;
        });
        
        // Desktop autoplay
        autoSlide = setInterval(() => {
            if (nextBtn) nextBtn.click();
        }, 4000);
        
        slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
        slider.addEventListener("mouseleave", () => {
            autoSlide = setInterval(() => {
                if (nextBtn) nextBtn.click();
            }, 4000);
        });
        
        // Desktop touch support
        let startX = 0;
        
        slider.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            clearInterval(autoSlide);
        });
        
        slider.addEventListener("touchend", e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextBtn.click() : prevBtn.click();
            }
            autoSlide = setInterval(() => nextBtn.click(), 4000);
        });
    }
    
    /* ========= CREATE DOTS (MOBILE ONLY) ========= */
    function createDots() {
        dotsContainer = document.createElement("div");
        dotsContainer.className = "mobile-dots-container";
        dotsContainer.style.cssText = `
            display: none;
            justify-content: center;
            gap: 12px;
            
            padding: 15px 0;
            width: 100%;
        `;
        
        // Create dots based on number of cards
        for (let i = 0; i < cards.length; i++) {
            const dot = document.createElement("button");
            dot.className = "mobile-slider-dot";
            dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
            dot.setAttribute("data-index", i);
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background-color: ${i === 0 ? '#ff0000' : '#dddddd'}; /* RED for active */
                cursor: pointer;
                transition: all 0.3s ease;
                padding: 0;
            `;
            
            dotsContainer.appendChild(dot);
        }
        
        // Insert dots after slider container
        container.parentNode.insertBefore(dotsContainer, container.nextSibling);
        dots = dotsContainer.querySelectorAll(".mobile-slider-dot");
    }
    
    /* ========= UPDATE DOTS FUNCTION ========= */
    function updateDots(activeIndex) {
        if (!dots || dots.length === 0) return;
        
        dots.forEach((dot, i) => {
            const isActive = i === activeIndex;
            // RED COLOR for active dot
            dot.style.backgroundColor = isActive ? '#ff0000' : '#dddddd';
            dot.style.transform = `scale(${isActive ? 1.3 : 1})`;
            dot.style.boxShadow = isActive ? '0 0 8px rgba(255, 0, 0, 0.3)' : 'none';
        });
    }
    
    function updateDotsOnScroll() {
        if (!isMobile() || !dotsContainer || dotsContainer.style.display === "none") return;
        
        // Clear previous timeout
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        // Debounce scroll event
        scrollTimeout = setTimeout(() => {
            const cardWidthMobile = window.innerWidth * 0.85;
            const containerWidth = window.innerWidth;
            const cardOffset = (containerWidth - cardWidthMobile) / 2;
            
            // Calculate which card is currently centered
            const scrollLeft = slider.scrollLeft + cardOffset;
            const currentIndex = Math.round(scrollLeft / (cardWidthMobile + gap));
            
            if (currentIndex >= 0 && currentIndex < cards.length) {
                index = currentIndex;
                updateDots(currentIndex);
            }
        }, 150);
    }
    
    /* ========= RESIZE HANDLER ========= */
    function handleResize() {
        if (isMobile()) {
            setupMobileSlider();
        } else {
            setupDesktopSlider();
        }
    }
    
    // Initial setup based on screen size
    handleResize();
    
    // Listen for resize with debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Handle orientation change
    window.addEventListener("orientationchange", () => {
        setTimeout(() => {
            handleResize();
            // Re-center after orientation change
            if (isMobile()) {
                setTimeout(() => {
                    const cardWidthMobile = window.innerWidth * 0.85;
                    const containerWidth = window.innerWidth;
                    const cardOffset = (containerWidth - cardWidthMobile) / 2;
                    const scrollPosition = (index * (cardWidthMobile + gap)) - cardOffset;
                    
                    slider.scrollTo({
                        left: scrollPosition,
                        behavior: 'instant'
                    });
                }, 300);
            }
        }, 100);
    });
});

// Progress bar functionality (unchanged)
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("tSlider");
    const prevBtn = document.getElementById("tPrev");
    const nextBtn = document.getElementById("tNext");
    const cards = Array.from(slider.querySelectorAll(".testimonial-card"));
    const container = slider.parentElement;

    if (!slider || cards.length === 0) return;

    const isMobile = () => window.innerWidth <= 768;
    const gap = 30;
    const cardWidth = 400;
    const totalCardWidth = cardWidth + gap;

    let index = 0;
    let isMoving = false;
    let autoSlide;

    function init() {
        if (isMobile()) {
            setupMobileSlider();
        } else {
            setupDesktopSlider();
        }
    }

    /* ========= DESKTOP SLIDER (INFINITE LOOP) ========= */
    function setupDesktopSlider() {
        // Clear previous interval and clones if any
        clearInterval(autoSlide);
        slider.innerHTML = ""; 
        
        // ১. অরিজিনাল কার্ডগুলো আবার ইনসার্ট করা
        cards.forEach(card => slider.appendChild(card.cloneNode(true)));

        // ২. ডেক্সটপের জন্য ক্লোন তৈরি (Infinite feel এর জন্য শুরুতে এবং শেষে)
        const firstBatch = cards.map(card => card.cloneNode(true));
        const lastBatch = cards.map(card => card.cloneNode(true));

        firstBatch.forEach(clone => slider.appendChild(clone)); // শেষে যোগ
        lastBatch.reverse().forEach(clone => slider.insertBefore(clone, slider.firstChild)); // শুরুতে যোগ

        const allCards = slider.querySelectorAll(".testimonial-card");
        
        // ৩. শুরুর পজিশন সেট করা (আমরা এখন মিডল সেকশনে আছি)
        index = cards.length;
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${index * totalCardWidth}px)`;

        // ৪. মুভ ফাংশন
        function moveDesktop(direction) {
            if (isMoving) return;
            isMoving = true;

            index = direction === 'next' ? index + 1 : index - 1;
            
            slider.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
            slider.style.transform = `translateX(-${index * totalCardWidth}px)`;
        }

        // ৫. ট্রানজিশন শেষ হলে লুপ হ্যান্ডলিং (Jerk-free jump)
        slider.ontransitionend = () => {
            isMoving = false;
            // যদি একদম শেষের ক্লোন ব্যাচে চলে যায়
            if (index >= cards.length * 2) {
                slider.style.transition = "none";
                index = cards.length;
                slider.style.transform = `translateX(-${index * totalCardWidth}px)`;
            }
            // যদি একদম শুরুর ক্লোন ব্যাচে চলে যায়
            if (index <= cards.length - cards.length) {
                slider.style.transition = "none";
                index = cards.length;
                slider.style.transform = `translateX(-${index * totalCardWidth}px)`;
            }
        };

        // বাটনে ক্লিক ইভেন্ট
        nextBtn.onclick = () => moveDesktop('next');
        prevBtn.onclick = () => moveDesktop('prev');

        // অটো প্লে
        startAutoSlide();
        slider.onmouseenter = () => clearInterval(autoSlide);
        slider.onmouseleave = startAutoSlide;
    }

    function startAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => nextBtn.click(), 4000);
    }

    /* ========= MOBILE SLIDER (DOTS) ========= */
    // আপনার আগের মোবাইল লজিক এখানে থাকবে, শুধু কার্ডগুলোর ক্লোন রিমুভ নিশ্চিত করবেন।
    function setupMobileSlider() {
        clearInterval(autoSlide);
        slider.style.transition = "none";
        slider.innerHTML = "";
        cards.forEach(card => slider.appendChild(card.cloneNode(true)));
        
        // ... (বাকি মোবাইল ডটস কোড যা আপনি আগে দিয়েছিলেন)
    }

    // উইন্ডো রিসাইজ হ্যান্ডলার
    window.addEventListener("resize", () => {
        clearTimeout(window.resizer);
        window.resizer = setTimeout(init, 250);
    });

    init();
});






// MOBILE MENU DROPDOWN TOGGLE
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});

// CLOSE MOBILE MENU WHEN CLICKING A LINK
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
    });
});

/* CUSTOM SELECT DROPDOWN */
document.querySelectorAll(".custom-select").forEach(select => {
    const selected = select.querySelector(".selected-option");
    const optionsList = select.querySelector(".options-list");
    const hiddenInput = select.querySelector("input");

    // Toggle open / close
    selected.addEventListener("click", () => {
        select.classList.toggle("open");
    });

    // Select option
    optionsList.querySelectorAll("li").forEach(option => {
        option.addEventListener("click", () => {
            selected.textContent = option.textContent;
            hiddenInput.value = option.dataset.value;
            select.classList.remove("open");
        });
    });
});

// Close dropdown if clicking outside
document.addEventListener("click", (e) => {
    document.querySelectorAll(".custom-select").forEach(select => {
        if (!select.contains(e.target)) {
            select.classList.remove("open");
        }
    });
});
