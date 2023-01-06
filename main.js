import './style.css'
import 'iconify-icon'
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

const video = document.getElementById("video");
const container = document.getElementById('csc');
const bg = document.getElementById('bg-img');
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

setTimeout(() => {
    bg.style.setProperty("--tw-scale-x", "1");
    bg.style.setProperty("--tw-scale-y", "1");
    // bg.style.setProperty("--tw-rotate", "0deg");
    bg.style.setProperty("--tw-opacity", "1");
    setTimeout(() => {
        container.classList.add("show");
    }, 900)
}, 500)
// video.play();


