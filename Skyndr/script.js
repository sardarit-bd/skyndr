const trustTabs = document.querySelectorAll(".trust-tab");

const trustImage = document.getElementById("trustImage");
const trustTitle = document.getElementById("trustTitle");
const trustText = document.getElementById("trustText");
const trustAuthor = document.getElementById("trustAuthor");

const tSlider = document.getElementById("tSlider");
const tDots = document.querySelectorAll(".t-dot");
const tPrev = document.getElementById("tPrev");
const tNext = document.getElementById("tNext");

let tIndex = 0;
const tTotal = 3; // real slides count
let index = 0;


/* -------------------------------------------
   SERVICE SLIDERS — FULLY MODULAR VERSION
--------------------------------------------*/

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


function updateTestimonials() {

    const card = tSlider.querySelector(".testimonial-card");
    const cardWidth = card.offsetWidth;
    const gap = 30; // whatever your CSS gap is between cards

    const offset = -(tIndex * (cardWidth + gap));

    tSlider.style.transform = `translateX(${offset}px)`;

    tDots.forEach((dot, i) =>
        dot.classList.toggle("active", i === tIndex)
    );
}


tNext.addEventListener("click", () => {
    tIndex = (tIndex + 1) % tTotal;
    updateTestimonials();
});

tPrev.addEventListener("click", () => {
    tIndex = (tIndex - 1 + tTotal) % tTotal;
    updateTestimonials();
});

///* AUTO-SLIDE */
setInterval(() => {
    tIndex = (tIndex + 1) % tTotal;
    updateTestimonials();
}, 4000);


document.addEventListener("scroll", () => {
    const section = document.querySelector(".why-work-section");
    const progress = document.querySelector(".why-progress-line");
    const dots = document.querySelectorAll(".why-dot");

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let visible = windowHeight - rect.top;
    if (visible < 0) visible = 0;

    let progressPercent = (visible / rect.height) * 100;
    if (progressPercent > 100) progressPercent = 100;

    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
        progress.style.width = "4px"; // force correct value
        progress.style.height = progressPercent + "%";
    } else {
        progress.style.height = "4px"; // force correct value
        progress.style.width = progressPercent + "%";
    }

    // DOT ACTIVATION
    dots.forEach((dot, index) => {
        const dotPosition = (index / (dots.length - 1)) * 100;
        dot.classList.toggle("why-active", progressPercent >= dotPosition);
    });
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
