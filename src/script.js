import wikipedia from 'wikipedia';
import axios from 'axios';

const synth = speechSynthesis;
let voice;

const queryForm = document.querySelector('.form-container')
const query = document.querySelector('#query')
const queryOut = document.querySelector('#queryOut')
const appShotcuts = document.querySelector('.app-shotcuts')
const timeContainer = document.querySelector('.time')

function updateTime() {
    const date = new Date()
    timeContainer.innerText = date.toLocaleTimeString()
}

setInterval(() => {
    updateTime()
})

async function openWiki() {
    const queryString = query.value.replaceAll(' ', '_')
    queryOut.src = `https://en.wikipedia.org/wiki/${queryString}`
    const page = await wikipedia.page(queryString)
    const summary = (await page.summary()).extract
    say(summary.substr(0, summary.indexOf('.')), voice)
    document.getElementById('h3-message').style.display = 'none'
}

const say =(text, voice) => {
    let utternance = new SpeechSynthesisUtterance(text)
    utternance.voice = voice
    speechSynthesis.speak(utternance)
}


async function queryEvent(event) {
    event.preventDefault()
    if (query.value.includes('open')) {
        const querySplit = query.value.split(' ')
        if (querySplit[1].includes('.com') || querySplit[1].includes('.in') || querySplit[1].includes('.net') || querySplit[1].includes('.org') || querySplit[1].includes('.co')) {
            say(`opening ${querySplit[1]}`, voice)
            window.open(`https://www.${querySplit[1]}`, '', "width=800,height=500");
                queryOut.src = ''
                document.getElementById('h3-message').style.display = 'block'
        }
    } else {
        openWiki()
    }
    query.value = ''
}

queryForm.addEventListener('submit', queryEvent)
 
appShotcuts.addEventListener('click', (event) => {
    if (event.target.classList.contains('app') || event.target.classList[0].includes('.com')){
        const target = event.target.classList.contains('app') ? event.target.getElementsByTagName('img')[0].classList[0] : event.target.classList[0]
        say(`opening ${target}`, voice)
            window.open(`https://www.${target}`, '', "width=800,height=500");
                queryOut.src = ''
                document.getElementById('h3-message').style.display = 'block'
    }
})


setTimeout(() => {
    voice = synth.getVoices()[4]
}, 1)