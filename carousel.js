document.querySelectorAll(".carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    const slides = [...track.children];
    const dotsBox = carousel.querySelector(".carousel__dots");
    let index = 0;
    let timer;

    const dots = slides.map((_, i) => {
        const dot = document.createElement("button");
        dot.className = "carousel__dot";
        dot.setAttribute("aria-label", `Go to image ${i + 1}`);
        dot.addEventListener("click", () => { goTo(i); restart(); });
        dotsBox.appendChild(dot);
        return dot;
    });

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.scrollTo({ left: track.clientWidth * index });
        dots.forEach((d, n) => d.classList.toggle("is-active", n === index));
    }

    // keep dots in sync when the user swipes
    track.addEventListener("scroll", () => {
        const i = Math.round(track.scrollLeft / track.clientWidth);
        if (i !== index) {
            index = i;
            dots.forEach((d, n) => d.classList.toggle("is-active", n === index));
        }
    });

    function restart() {
        clearInterval(timer);
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            timer = setInterval(() => goTo(index + 1), 5000);
        }
    }

    carousel.querySelector(".carousel__btn--prev").addEventListener("click", () => { goTo(index - 1); restart(); });
    carousel.querySelector(".carousel__btn--next").addEventListener("click", () => { goTo(index + 1); restart(); });
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", restart);

    goTo(0);
    restart();
});
