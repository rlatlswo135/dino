const audioEle = document.getElementById('test')
const btn = document.getElementById('btn')
const range = document.getElementById('range')
const audioElement = document.querySelector('audio')
let audioCtx = new AudioContext();
let source = audioCtx.createMediaElementSource(audioEle)

source.connect(audioCtx.destination)

btn.addEventListener('click',function(){
    if(audioCtx.state === 'suspended'){
        console.log('first')
        audioCtx.resume();
    }

    if(this.dataset.playing === 'false'){
        audioEle.play() ;
        this.dataset.playing = 'true';
    }
    else if(this.dataset.playing === 'true'){
        audioEle.pause();
        this.dataset.playing='false'
    }
})

range.addEventListener('input',function(){
    console.log(this.value)
})

