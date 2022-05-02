let header = document.querySelector('header');
let slider = document.querySelector('.slider__item');
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;
console.log('height slider: ' + heightSlider);

//change bg header
function changeBgHeader() {
    let scrollY = window.pageYOffset;
    if (scrollY > heightSlider - heightHeader) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
}
//back to top

let backtotop = document.querySelector('.totop');
let scrollTop = document.querySelector('.scroll-top');
let getHeightWindow = window.innerHeight;

function showBackTopTop() {
    let scrollY = window.pageYOffset;

    if (scrollY > getHeightWindow) {
        backtotop.classList.add('active');
    } else {
        backtotop.classList.remove('active');
    }
}

backtotop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'

    })
});
scrollTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'

    })
});

document.addEventListener('scroll', function() {
    changeBgHeader();
    showBackTopTop();
});
// langugage
let lang = document.querySelector('.lang');
let langCurr = document.querySelector('.lang .lang__select span');
let langItems = document.querySelectorAll('.lang .lang__options .lang__options-item li');
console.log('lang curr:' + langCurr);
console.log('items: ' + langItems);
lang.addEventListener('click', function(event) {
    event.stopPropagation();
    lang.classList.toggle('active');
});
langItems.forEach(function(item) {
    item.addEventListener('click', function() {
        let langText = this.textContent;
        let langOld = langCurr.textContent;
        langCurr.innerHTML = langText;
        this.innerHTML = langOld;
    });
});
document.addEventListener('click', function() {
    lang.classList.remove('active');
})

// modal 3 video
let videoList = document.querySelectorAll('.video__content-item');
let modal = document.querySelector('.modal');
let video = document.querySelector('.modal .video');
let btnClose = document.querySelector('.modal .close');
let srcVideo = video.getAttribute('src');
videoList.forEach((item) => {
    item.addEventListener('click', () => {
        modal.classList.add('show');
        let id = item.querySelector('div').getAttribute('data-video-id');
        console.log('id: ' + id);
        video.setAttribute('src', srcVideo + id + '?autoplay=1');
    });
});
btnClose.addEventListener('click', (event) => {
    modal.classList.remove('show');
    video.setAttribute('src', srcVideo);

});
modal.addEventListener('click', () => {
    modal.classList.remove('show');
    video.setAttribute('src', '');

});

// accordion
let accList = document.querySelectorAll('.accordion');
let charPlus = document.querySelector('.accordion span');
accList.forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        if ($('.accordion').hasClass('active')) {
            item.querySelector('span').innerHTML = '&#8722;'
        } else {
            item.querySelector('span').innerHTML = '&#43;';
        }
        let panel = item.nextElementSibling;
        if (panel.style.display === 'block') {

            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }


    })
});
// menu mobile
function toggleMenuModile() {
    let btn = document.querySelector('.menu__icon');
    let menu = document.querySelector('.menu');

    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        removeTop();

    });

    function removeTop() {
        if ($('.menu').hasClass('active')) {
            menu.style.marginTop = heightHeader + 'px';
        } else {
            menu.style.marginTop = 0 + 'px';
        }
    }

    function hideMenu() {
        btn.classList.remove('active');
        menu.classList.remove('active');
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            removeTop();
            hideMenu();
        }
    });
}
toggleMenuModile();
//progressbar
function setProgressBar() {
    let windowHeight = window.innerHeight;
    let progressbar = document.querySelector('.progressbar');
    let heightBody = document.querySelector('body').clientHeight;
    let scrollY = window.pageYOffset;
    let percent = Number(scrollY / (heightBody - windowHeight) * 100);
    progressbar.style.width = `${percent}%`;
}
document.addEventListener('scroll', function() {
        setProgressBar();
    })
    //tabs
function hanldeNewsTab() {
    let btns = document.querySelectorAll('.news__control .btnctrl');
    let tabs = document.querySelectorAll('.news__blog-list');

    btns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            $('.news__control .btnctrl').removeClass('active');
            btn.classList.add('active');
            tabs.forEach((tab) => {
                tab.classList.remove('active');
            })
            tabs[index].classList.add('active');
        });
    });
}
hanldeNewsTab();
//menu click - scroll
function handleMenu() {
    let listItemMenu = document.querySelectorAll('.menu .menu__item ');
    let listSection = document.querySelectorAll('section');
    let scrollY = window.pageYOffset;
    listItemMenu.forEach((item) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            let sectionClick = item.querySelector('a').getAttribute('href').slice(1);
            let section = document.querySelector('.' + sectionClick);
            let sectionTop = section.offsetTop;
            let sectionHeight = section.clientHeight;
            console.log('section height: ' + sectionHeight);
            if (sectionTop < scrollY < sectionHeight) {
                window.scrollTo({
                    top: sectionTop - heightHeader,
                    behavior: 'smooth'

                })
            }
        });
    });
    window.addEventListener('scroll', () => {
        let currentSection = '';
        listSection.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - heightHeader - 5) {
                currentSection = section.getAttribute('class');
            }
        });
        listItemMenu.forEach((item) => {
            item.classList.remove('active');
            let hrefSection = '#' + currentSection;
            if (item.querySelector('a').getAttribute('href').includes(hrefSection)) {
                item.classList.add('active');
            }
        })

    });

}
handleMenu();

//slider
//-- slider - jquery
window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        $('.loading').remove();
    }, 1000);
    let $carousel = $('.slider__item-wrap');
    $carousel.flickity({
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        on: {
            ready: function() {
                let dotted = document.querySelector('.flickity-page-dots');
                let paging = document.querySelector('.slider__button-paging .dotted')
                paging.appendChild(dotted);
            },
            change: function(index) {
                let number = document.querySelector('.number');
                let indexPage = (index + 1).toString().padStart(2, 0);
                number.innerHTML = indexPage;
            }
        }
    });
    $('.slider__button-control .prev').on('click', function() {
        $carousel.flickity('previous');
    });
    $('.slider__button-control .next').on('click', function() {
        $carousel.flickity('next');
    });
    //list drag
    let $carouselDrag = $('.photos');
    $carouselDrag.flickity({
        cellAlign: 'right',
        contain: true,
        wrapAround: false,
        prevNextButtons: false,
        on: {

        }
    });
    let progressBar = document.querySelector('.progress-bar');
    console.log('flickity');
    $carouselDrag.on('scroll.flickity', function(event, progress) {
        progress = Math.max(0, Math.min(1, progress));
        console.log('progress bar: ' + progress);
        progressBar.style.width = progress * 100 + '%';

    });
});

// function handleSlider() {
//     let sliders = document.querySelectorAll('.slider__item');
//     let paging = document.querySelector('.number span');
//     let points = document.querySelectorAll('.list-point li');
//     let points1 = document.querySelector('.list-point li');
//     let btnPrev = document.querySelector('.btn-prev');
//     let btnNext = document.querySelector('.btn-next');
//     let index = 0;
//     //click btn-next
//     btnNext.addEventListener('click', (e) => {

//         if (index === sliders.length - 1) {
//             sliders[index].classList.remove('active');
//             points[index].classList.remove('active');
//             index = 0;
//             handleShowSlider(index);

//         } else {
//             sliders[index].classList.remove('active');
//             points[index].classList.remove('active');
//             index++;
//             handleShowSlider(index);


//         }
//     });
//     btnPrev.addEventListener('click', () => {
//         if (index === 0) {
//             sliders[index].classList.remove('active');
//             points[index].classList.remove('active');
//             index = sliders.length - 1;
//             console.log('index: ' + index);
//             handleShowSlider(index);
//         } else {
//             sliders[index].classList.remove('active');
//             points[index].classList.remove('active');
//             index--;
//             handleShowSlider(index);
//         }
//     });
//     points.forEach((point, indexPoint) => {

//         point.addEventListener('click', (e) => {
//             $(".list-point li").removeClass('active');
//             point.classList.add('active');
//             handleShowSlider(indexPoint);
//             sliders.forEach((slider) => {
//                 slider.classList.remove('active');
//             });
//             sliders[indexPoint].classList.add('active');
//             index = indexPoint;
//         });
//     });


//     function handleShowSlider(index) {
//         if (index === 0) {
//             sliders[index].classList.add('active');
//             points[index].classList.add('active');
//             paging.innerHTML = (index + 1).toString().padStart(2, '0');
//         } else {
//             sliders[index].classList.add('active');
//             points[index].classList.add('active');
//             paging.innerHTML = (index + 1).toString().padStart(2, '0');
//             let text = 'wooder' + ' ' + paging.textContent;
//             sliders[index].querySelector('.slider__item-text .title').innerHTML = text;
//         }
//     }
// }
// handleSlider();