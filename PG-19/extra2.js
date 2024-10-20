const imgSlider = document.querySelector('.img-slider');
const items = document.querySelectorAll('.item');
const imgItems = document.querySelectorAll('.img-item');
const infoItems = document.querySelectorAll('.info-item');

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let indexSlider = 0;
let index = 0;

let colors = ['rgb(200, 161, 127)', 'rgb(255, 187, 128)', '#50cee1', '#5b5bdb', '#d8da56', 'rgba(199, 75, 3)', 'rgb(31, 5, 134)', 'rgb(12, 3, 49)'];

const slider = () => {
    imgSlider.style.transform = `rotate(${indexSlider * 45}deg)`;

    items.forEach(item => {
        item.style.transform = `rotate(${indexSlider * -45}deg)`;
    });

    document.querySelector('.img-item.active').classList.remove('active');
    imgItems[index].classList.add('active');

    document.querySelector('.info-item.active').classList.remove('active');
    infoItems[index].classList.add('active');

    document.body.style.background = colors[index];
}

nextBtn.addEventListener('click', () => {
    indexSlider++;

    index++;
    if (index > imgItems.length - 1) {
        index = 0;
    }

    slider();
});

prevBtn.addEventListener('click', () => {
    indexSlider--;

    index--;
    if (index < 0) {
        index = imgItems.length - 1;
    }

    slider();
});
