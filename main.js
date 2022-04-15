import {gamePlay} from './gamePlay.js'
let mainBox = document.getElementById('game-main')
let howPlayBox = document.getElementById('game-how')
let howSwitch = 'true';
let bestScore = localStorage.getItem('bestScore')?localStorage.getItem('bestScore'):0
const audioBtn = document.getElementById('audio_play')
const game_play_container = document.getElementById('game-play')
const footerBox = document.getElementById('score-box')
let mainBgm_range = document.getElementById('bgm-range')
const backBtn = document.getElementById('back')
const arrow = document.getElementById('arrow')
let gameOverBox = document.getElementsByClassName('game-over')[0]

const[mainBgm,eatBgm,swingBgm,hurtBgm,missFoodBgm,levelUpBgm,gameEndBgm] = document.querySelectorAll('audio')
function renderView(container,template){
    container.innerHTML = template
}
function backBtnEvent(){
    const bestScoreBox = document.getElementById('best-score')
    const bS = localStorage.getItem('bestScore')
    //왜 ㅆ 다른박스는 수정되는데 베스트박스만안되냐고
    //howTobox는 밑에 main이 render할때 만든다. 그러니까 애초에 박스를 찝어도 안찝히지 없으니까
    //아우
    mainBox.classList.toggle('off')
    game_play_container.classList.toggle('off')
    gameOverBox.classList.toggle('off')
    footerBox.classList.toggle('off')
    howPlayBox.classList.toggle('off')
    arrow.classList.toggle('off')
    audioBtn.setAttribute('aria-checked',"false")
    audioBtn.classList.remove('play_off')
    audioBtn.classList.add('play_on')
    bestScoreBox.textContent = `Best:${bS}`
}
function startBtn_addEvent(){
    const startBtn = document.getElementById('start')
    startBtn.addEventListener('click',function(){
        if(audioBtn.getAttribute('aria-checked') === 'true'){
            mainBgm.play();
        }
        howPlayBox.classList.add('off')
        game_play_container.classList.toggle('off')
        arrow.classList.toggle('off')
        footerBox.classList.toggle('off')
        mainBox.classList.toggle('off');
        gamePlay();
    })
}

function audioBtnEvent(ele){
    if(ele.getAttribute('aria-checked') === 'false'){
        mainBgm.volume=0.5;
        mainBgm.play();
        mainBgm.loop = true
        ele.setAttribute('aria-checked',"true")
        ele.classList.remove('play_on')
        ele.classList.add('play_off')
    }
    else if(ele.getAttribute('aria-checked') === 'true'){
        mainBgm.pause();
        ele.setAttribute('aria-checked',"false")
        ele.classList.remove('play_off')
        ele.classList.add('play_on')
    }
}
function mainBgm_rangeEvent(value){
    mainBgm.volume = value

}
howPlayBox.addEventListener('click',function(){
        if(howSwitch === 'false'){
            howSwitch='true'
            renderView(mainBox,`
            <div class="font game-main-title">Umm~ eating and Die</div>
            <div id="arrow">----></div>
            <div class="game-main-content">
                <div id="start" class="btn">Game start
                </div>
                <div id="best-score" class="btn">Best:${bestScore}</div>
            </div>
            `)
            howPlayBox.textContent = 'How to Play'
            startBtn_addEvent()
        }else{
            howSwitch='false';
            renderView(mainBox,`
            <div class="game-main-title">How To Play</div>
            <div id="arrow">----></div>
            <div class="game-main-content how">
                <div class="how">음식이 나오면 <span style="color:red">가려서</span> 먹으세요</div>
                <div class="how">Life존재합니다. Score에따라 빨라집니다</div>
                <div style="color:red" class="how">전체화면을 권장합니다.......</div>
                <div style="color:red" class="how">소리나오니까 주의하시구요......</div>
            </div>
            `);
            howPlayBox.textContent = 'B A C K'
        }
    })

function mainView(){
    audioBtn.addEventListener('click',(e)=>audioBtnEvent(e.target))
    mainBgm_range.addEventListener('input',(e)=>mainBgm_rangeEvent(e.target.value))
    renderView(mainBox,`
    <div class="font game-main-title">Umm~ eating and Die</div>
    <div class="game-main-content">
        <div id="start" class="btn">Game start
        </div>
        <div id="best-score" class="btn">Best:${bestScore}</div>
    </div>
    `)
    startBtn_addEvent()
    backBtn.addEventListener('click',backBtnEvent)
}

mainView()
//새로고침후 최초렌더시에 베스트스코어 0인거. => 하우투플레이를 클릭후 돌아올때만 bestScore받아와서 넣으니까

