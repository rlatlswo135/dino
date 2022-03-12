import {gamePlay} from './gamePlay.js'
let mainBox = document.getElementById('game-main')
let howPlayBox = document.getElementById('game-how')
let howSwitch = 'true';
let bestScore = localStorage.getItem('bestScore')?localStorage.getItem('bestScore'):0
function renderView(container,template){
    container.innerHTML = template
}
howPlayBox.addEventListener('click',function(){
        if(howSwitch === 'false'){
            howSwitch='true'
            renderView(mainBox,`
            <div class="font game-main-title">Yummy Yummy</div>
            <div class="game-main-content">
                <div id="start" class="btn">Game start
                </div>
                <div id="best-score" class="btn">Best:${bestScore}</div>
            </div>
            `)
            howPlayBox.textContent = 'How to Play'
            gamePlay();
        }else{
            howSwitch='false';
            renderView(mainBox,`
            <div class="game-main-title">How To Play</div>
            <div class="game-main-content how">
                <div class="how">음식을 먹으세요</div>
                <div class="how">그렇다고 다먹으면 안됩니다..</div>
                <div class="how">운없으면 억까패턴 나와요..</div>
                <div style="color:red" class="how">소리나오니까 주의하시구요..</div>
            </div>
            `);
            howPlayBox.textContent = 'B A C K'
        }
    })

function mainView(fun=null){
    renderView(mainBox,`
    <div class="font game-main-title">Yummy Yummy</div>
    <div class="game-main-content">
        <div id="start" class="btn">Game start
        </div>
        <div id="best-score" class="btn">Best:${bestScore}</div>
    </div>
    `)
    if(fun !== null) fun()
}

mainView(gamePlay)
//새로고침후 최초렌더시에 베스트스코어 0인거. => 하우투플레이를 클릭후 돌아올때만 bestScore받아와서 넣으니까

