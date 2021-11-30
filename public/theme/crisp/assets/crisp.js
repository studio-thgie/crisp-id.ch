let sans_index = 0,
    sans = document.querySelectorAll('.sans > *'),
    serif_index = 0,
    serif = document.querySelectorAll('.serif > *');

let upping = false, downing = false, meeting = false,
    x_down = null, y_down = null;

document.addEventListener('DOMContentLoaded', () => {

    let lets_greet = document.querySelector('#lets-greet'),
        greet = document.querySelector('#greet'),
        lets_meet = document.querySelector('#lets-meet'),
        meet = document.querySelector('#meet'),
        close_all = document.querySelector('#close-all');
        
    lets_meet.addEventListener('click', evt => {
        lets_greet.classList.remove('active');
        greet.classList.add('invisible');

        close_all.classList.remove('hidden');

        lets_meet.classList.add('active');
        meet.classList.remove('invisible');
    })

    lets_greet.addEventListener('click', evt => {
        lets_meet.classList.remove('active');
        meet.classList.add('invisible');

        close_all.classList.remove('hidden');

        lets_greet.classList.add('active');
        greet.classList.remove('invisible');
    })

    close_all.addEventListener('click', evt => {
        lets_meet.classList.remove('active');
        meet.classList.add('invisible');

        lets_greet.classList.remove('active');
        greet.classList.add('invisible');

        close_all.classList.add('hidden');
    })

    sans[sans_index].classList.add('show');
    serif[serif_index].classList.add('show');

    window.addEventListener('wheel', wheeling);
    window.addEventListener('mousewheel', wheeling);
    window.addEventListener('DOMMouseScroll', wheeling);

    /* touch */
    document.addEventListener('touchstart', touch_start, false);        
    document.addEventListener('touchmove', touch_move, false);      
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

function touch_start(evt) {
    const firstTouch = get_touches(evt)[0];                                      
    x_down = firstTouch.clientX;                                      
    y_down = firstTouch.clientY;                                      
};                                                
                                                                        
function touch_move(evt) {
    if ( ! x_down || ! y_down ) {
        return;
    }

    var x_up = evt.touches[0].clientX;                                    
    var y_up = evt.touches[0].clientY;

    var x_diff = x_down - x_up;
    var y_diff = y_down - y_up;
                                                                        
    if ( Math.abs( x_diff ) > Math.abs( y_diff ) ) {
        if ( x_diff > 0 ) {
            /* right swipe */ 
        } else {
            /* left swipe */
        }                       
    } else {
        if ( y_diff > 0 ) {
            down();
        } else { 
            up();
        }                                                                 
    }

    x_down = null;
    y_down = null;                                             
};

function get_touches(evt) {
    return evt.touches ||
        evt.originalEvent.touches;
}    