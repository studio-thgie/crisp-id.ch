let sans_index = 0,
    sans = document.querySelectorAll('.sans > *'),
    serif_index = 0,
    serif = document.querySelectorAll('.serif > *');

let upping = false, downing = false, meeting = false;

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#lets-meet').addEventListener('click', evt => {
        document.querySelector('#lets-greet').classList.remove('active');
        document.querySelector('#greet').classList.add('invisible');

        document.querySelector('#close-all').classList.remove('hidden');

        document.querySelector('#lets-meet').classList.toggle('active');
        document.querySelector('#meet').classList.toggle('invisible');
    })

    document.querySelector('#lets-greet').addEventListener('click', evt => {
        document.querySelector('#lets-meet').classList.remove('active');
        document.querySelector('#meet').classList.add('invisible');

        document.querySelector('#close-all').classList.remove('hidden');

        document.querySelector('#lets-greet').classList.toggle('active');
        document.querySelector('#greet').classList.toggle('invisible');
    })

    document.querySelector('#close-all').addEventListener('click', evt => {
        document.querySelector('#lets-meet').classList.remove('active');
        document.querySelector('#meet').classList.add('invisible');

        document.querySelector('#lets-greet').classList.remove('active');
        document.querySelector('#greet').classList.add('invisible');

        document.querySelector('#close-all').classList.add('hidden');
    })

    sans[sans_index].classList.add('show');
    serif[serif_index].classList.add('show');

    window.addEventListener('wheel', wheeling);
    window.addEventListener('mousewheel', wheeling);
    window.addEventListener('DOMMouseScroll', wheeling);

});

function wheeling(evt) {
    
    if (evt.type == "wheel") supportsWheel = true;
    else if (supportsWheel) return;

    let delta_raw = (evt.deltaY || -evt.wheelDelta || evt.detail);

    if(delta_raw > 5 || delta_raw < -5) {

        var delta = (delta_raw >> 10) || 1;

        if (delta < 0) {
            up();
        } else if (delta > 0) {
            down();
        }

        setTimeout(() => {
            document.querySelector('#arrows').classList.add('opacity-0');
        }, 500);
        
    }
}

function up() {
    if(! upping) {
        upping = true;

        let current = sans[sans_index];

        current.classList.remove('show');
        current.classList.add('gone');
        sans_index++;

        if(sans_index >= sans.length) {
            sans_index = 0;
        }
        
        sans[sans_index].classList.add('show');

        setTimeout(() => {
            current.classList.remove('gone');
            upping = false;
        }, 500);
    }
}

function down() {
    if(! downing) {
        downing = true;

        let current = serif[serif_index];

        current.classList.remove('show');
        current.classList.add('gone');
        serif_index++;

        if(serif_index >= serif.length) {
            serif_index = 0;
        }
        
        serif[serif_index].classList.add('show');

        setTimeout(() => {
            current.classList.remove('gone');
            downing = false;
        }, 500);
    }
}