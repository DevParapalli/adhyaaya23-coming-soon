import './style.css'
import 'iconify-icon'
import TWEEN from "@tweenjs/tween.js"
// import SpaceTravel from "space-travel";

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore/lite';

import { website_date, firebaseConfig } from './data.js';

function set_loading() {
    document.getElementById("email-input").disabled = true;
    document.getElementById("email-submit-btn").disabled = true;
    document.getElementById("email-submit-btn").innerHTML = "Loading...";
}

function set_submitted() {
    document.getElementById("email-input").disabled = true;
    document.getElementById("email-submit-btn").disabled = true;
    document.getElementById("email-submit-btn").innerHTML = "Submitted!";
}

// new SpaceTravel({ canvas: document.getElementById("canvas"), throttle: 0 }).start();

// load video into canvas
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// video.addEventListener("play", () => {
//     function step() {
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         requestAnimationFrame(step);
//     }
//     requestAnimationFrame(step);
// })


async function submit_email() {
    set_loading();
    const email = document.getElementById("email-input").value;
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, `email/${email}`);
    const docRef2 = doc(db, `emails/${email}`);
    await setDoc(docRef, { notify: true });
    await setDoc(docRef2, { notify: true });
    set_submitted();
}


function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(total / (1000 * 60 * 60 * 24 * 7));
    return {
        total,
        weeks,
        days,
        hours,
        minutes,
        seconds
    };
}


function initializeClock(endtime) {
    const count_weeks = document.getElementById("weeks");
    const count_days = document.getElementById("days");
    const count_hours = document.getElementById("hours");

    function updateClock() {
        const t = getTimeRemaining(endtime);
        count_weeks.innerHTML = t.weeks;
        count_days.innerHTML = t.days - t.weeks * 7;
        count_hours.innerHTML = t.hours;
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

document.getElementById("email-submit-btn").addEventListener("click", submit_email);

initializeClock(website_date);

// const video = document.getElementById("video");
const container = document.getElementById('csc');
const bg = document.getElementById('bg-img');
const bg_f = document.getElementById('bg-img-f');


// video.addEventListener("play", () => {
//     setTimeout(() =>{
//         container.classList += " show";
//     }, 6000)
// })

// setTimeout(() =>{
//     document.getElementById('csc').classList += " show ";
// }, 1000)


// VANTA.RINGS({
//     el: "#app",
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.00,
//     minWidth: 200.00,
//     scale: 1.00,
//     scaleMobile: 1.00
//   })



// video.addEventListener('timeupdate', (e) => {
//     if (video.currentTime > 0.7) {
//         container.classList.add("show");
//     }
// })
// video.addEventListener('play', () => {
//     // video.classList.remove("scale-[4]");
//     // console.log(video.classList);
//     // video.classList.add("scale-100");
//     // video.playbackRate =1;
//     video.style.setProperty("--tw-scale-x", "1");
//     video.style.setProperty("--tw-scale-y", "1");
//     setTimeout(() => 
//     {

//     })
// })

// setTimeout(() => {
//     bg.style.setProperty("--tw-scale-x", "1.1");
//     bg.style.setProperty("--tw-scale-y", "1.1");
//     // bg.style.setProperty("--tw-rotate", "0deg");
//     bg.style.setProperty("--tw-opacity", "1");
//     setTimeout(() => {
//         container.classList.add("show");
//         // display the new bg and start rotating it
        
//     }, 1000)
// },0)
// video.play();

function animate(time=1) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

const anim = {rotate: 0, opacity: 0, scale: 1, scalebg: 100};
const rotate180 = new TWEEN.Tween(anim)
.to({rotate: 180, scalebg: 1}, 20000)
// .easing(TWEEN.Easing.Quadratic.In)
.onUpdate(() => {
    bg_f.style.setProperty("--tw-rotate", `${anim.rotate}deg`);
    bg.style.setProperty("--tw-scale-x", `${anim.scalebg}`);
    bg.style.setProperty("--tw-scale-y", `${anim.scalebg}`);
})


const rotate360 = new TWEEN.Tween(anim)
.to({rotate: 360, scalebg: 1.1}, 20000)
.onUpdate(() => {
    bg_f.style.setProperty("--tw-rotate", `${anim.rotate}deg`);
    bg.style.setProperty("--tw-scale-x", `${anim.scalebg}`);
    bg.style.setProperty("--tw-scale-y", `${anim.scalebg}`);
}
);
// .start();

const fadein = new TWEEN.Tween(anim)
.to({opacity: 1, scale: 1.1, scalebg: 1.1}, 1000)
// .delay(1000)
.onUpdate(() => {
    // bg_f.style.setProperty("--tw-opacity", `${anim.opacity}`);
    bg_f.style.setProperty("--tw-scale-x", `${anim.scale}`);
    bg_f.style.setProperty("--tw-scale-y", `${anim.scale}`);
    // bg.style.setProperty("--tw-opacity", `${1 - anim.opacity}`);
    bg.style.setProperty("--tw-scale-x", `${anim.scalebg}`);
    bg.style.setProperty("--tw-scale-y", `${anim.scalebg}`);
})
.onComplete(() => {
    bg_f.style.setProperty("--tw-opacity", `${anim.opacity}`);
})

const load = new TWEEN.Tween(anim)
.to({scale: 1.1, scalebg: 1.1}, 2000)
.easing(TWEEN.Easing.Quadratic.InOut)
.onUpdate(() => {
    bg_f.style.setProperty("--tw-scale-x", `${anim.scale}`);
    bg_f.style.setProperty("--tw-scale-y", `${anim.scale}`);
    bg.style.setProperty("--tw-scale-x", `${anim.scalebg}`);
    bg.style.setProperty("--tw-scale-y", `${anim.scalebg}`);
})
.onComplete(() => {
    container.classList.add("show");
})



load.chain(fadein);
fadein.chain(rotate180);
rotate180.chain(rotate360);
rotate360.chain(rotate180);

load.start();
