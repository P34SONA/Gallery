const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");
const uploadInput = document.getElementById("upload");
const filter = document.getElementById("categoryFilter");
const darkToggle = document.getElementById("darkModeToggle");

/* Lightbox */
gallery.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
        lightbox.style.display = "flex";
        lightboxImg.src = e.target.src;
    }
});

closeBtn.onclick = () => lightbox.style.display = "none";

/* Upload Images */
uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.dataset.category = "all";
    gallery.appendChild(img);
});

/* Category Filter */
filter.addEventListener("change", () => {
    const category = filter.value;
    document.querySelectorAll(".gallery img").forEach(img => {
        img.style.display =
            category === "all" || img.dataset.category === category
                ? "block"
                : "none";
    });
});

/* Dark Mode */
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
