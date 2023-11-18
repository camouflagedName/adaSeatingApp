fetch('/about')
.then(res => res.json())
.then(aboutData => {
    document.getElementById('port').innerText = aboutData.port;
    document.getElementById('time').innerText = aboutData.time;
    document.getElementById('env').innerText = aboutData.env;
})

fetch('/status')
.then(res => res.json())
.then(statData => {
    document.getElementById('uptime').innerText = statData.uptime;
    document.getElementById('totalMem').innerText = statData.totalMemory;
    document.getElementById('freeMem').innerText = statData.freeMemory;
})

fetch('/get-heroku-dynos')
.then(res => res.json())
.then(dynoData => {
    document.getElementById('condition').innerText = dynoData.status;
    document.getElementById('started').innerText = `${dynoData.date} ${dynoData.time}`;
    document.getElementById('length').innerText = dynoData.timeLength;
})

