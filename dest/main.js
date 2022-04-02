let header = document.querySelector('header');
let slider = document.querySelector('slider');
let heightSlider = slider.clientHeight;
let heighHeader = header.clientHeight;
document.addEventListener('scroll', function() {
    let scrollY = window.pageYOffset;
    console.log(scrollY);
    if (scrollY > heightSlider - heighHeader) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});