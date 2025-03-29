let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Ẩn slide hiện tại
    slides[currentSlide].classList.remove('show');

    // Cập nhật chỉ số slide hiện tại
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Hiện slide mới
    slides[currentSlide].classList.add('show');

    // Cập nhật vị trí của slides
    const slidesContainer = document.querySelector('.slide-container');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Tự động chuyển slide mỗi 3 giây
setInterval(() => changeSlide(1), 6000);