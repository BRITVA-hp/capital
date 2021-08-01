document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.header__burger'),
          nav = document.querySelector('.header__nav--mobile'),
          navClose = document.querySelector('.header__nav__close');

    // Бургер и меню

    burger.addEventListener('click', () => {
        nav.classList.add('header__nav--active');
    });

    navClose.addEventListener('click', () => {
        nav.classList.remove('header__nav--active');
    });

    // faq

    function faq(title, itemActive) {

        const titles = document.querySelectorAll(title);

        titles.forEach((item) => {
            item.addEventListener('click', () => {
                item.parentElement.classList.toggle(itemActive);

            });
        });

    }

    faq('.faq__item__title', 'faq__item--active');


      // Функция слайдера
    function slider(window, field, cards, cardWidth, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass) {
        const window_ = document.querySelector(window),
              field_ = document.querySelector(field),
              cards_ = document.querySelectorAll(cards),
              arrowPrev_ = document.querySelector(arrowPrev),
              arrowNext_ = document.querySelector(arrowNext);

        let startPoint,
            swipeAction,
            endPoint,
            sliderCounter = 0,
            dots_ = [];

        // Устанавливаем фиксированную ширину поля слайдов

        field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
        field_.style.marginLeft = 'auto';
        field_.style.marginRight = 'auto';

        // Слайд следующий

        function slideNext() {
            sliderCounter++;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter >= cards_.length) {
                sliderCounter = cards_.length - 1;
            }
            if ((sliderCounter + 1) == cards_.length) {
                arrowNext_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                item.classList.remove(dotClassActive);
                if (index == sliderCounter) {
                    item.classList.add(dotClassActive);
                }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
        }

        // Слайд предыдущий

        function slidePrev() {
            sliderCounter--;
            arrowNext_.classList.remove(arrowClass);
            arrowPrev_.classList.remove(arrowClass);
            if (sliderCounter <= 0) {
                sliderCounter = 0;
            }
            if (sliderCounter == 0) {
                arrowPrev_.classList.add(arrowClass);
            }
            if (dotsWrap) {
                dots_.forEach((item, index)=> {
                item.classList.remove(dotClassActive);
                if (index == sliderCounter) {
                    item.classList.add(dotClassActive);
                }
                });
            }
            field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
        }

        // Рендер точек

        if (dotsWrap) {
            const dotsWrap_ = document.querySelector(dotsWrap);

            cards_.forEach(() => {
                const dot = document.createElement('div');
                dot.classList.add(dotClass);
                dotsWrap_.appendChild(dot);
                dots_.push(dot);
            });
            dots_[0].classList.add(dotClassActive);
            dots_.forEach((item, index) => {
                item.addEventListener('click', () => {
                sliderCounter = index;
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter == 0) {
                    arrowPrev_.classList.add(arrowClass);
                }
                if ((sliderCounter + 1) == cards_.length) {
                    arrowNext_.classList.add(arrowClass);
                }
                dots_.forEach(item_ => {
                    item_.classList.remove(dotClassActive);
                });
                item.classList.add(dotClassActive);
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                });
            });
        }

        // Переключение на стрелки

        arrowPrev_.addEventListener('click', () => {
            slidePrev();
        });

        arrowNext_.addEventListener('click', () => {
            slideNext();
        });

        // Свайп слайдов тач-событиями

        window_.addEventListener('touchstart', (e) => {
            startPoint = e.changedTouches[0].pageX;
        });

        window_.addEventListener('touchmove', (e) => {
            swipeAction = e.changedTouches[0].pageX - startPoint;
            field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
        });

        window_.addEventListener('touchend', (e) => {
            endPoint = e.changedTouches[0].pageX;
            if (Math.abs(startPoint - endPoint) > 50) {
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (endPoint < startPoint) {
                slideNext();
                } else {
                slidePrev();
                }
            } else {
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
            }
        });
    }

    slider('.reviews__window--desc',
           '.reviews__field--desc',
           '.reviews__card--desc',
           435,
           20,
           false,
           false,
           false,
           '.reviews__arrow--prev--desc',
           '.reviews__arrow--next--desc',
           'reviews__arrow--inactive'
    );

    slider('.reviews__window--mob',
            '.reviews__field--mob',
            '.reviews__card--mob',
            280,
            20,
            '.reviews__dots__wrap',
            'reviews__dot',
            'reviews__dot--active',
            '.reviews__arrow--prev--mob',
            '.reviews__arrow--next--mob',
            'reviews__arrow--inactive'
    );


    // функция для модалки

    function calcScroll() {
        let div = document.createElement('div');
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        
        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        
        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
                modal_ = document.querySelector(modal),
                modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });
    
            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains(modal.replace(/\./, ''))) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal', 'modal--visible', '[data-modal]', '.modal__form__close');


    let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;

    links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        let widthTop = document.documentElement.scrollTop,
            hash = this.hash,
            toBlock =document.querySelector(hash).getBoundingClientRect().top,
            start = null;

        requestAnimationFrame(step);

        function step(time) {
        if (start === null) {
            start = time;
        }

        let progress = time - start,
            r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

        document.documentElement.scrollTo(0, r);
        if (r != widthTop + toBlock) {
            requestAnimationFrame(step);
        } else {
            location.hash = hash;
        }
        }
    });
    });

});