const cactus = document.getElementById('cactus')
const playerBox = document.getElementById('player')
const Cac_ctx = cactus.getContext('2d')
const Dino_ctx = playerBox.getContext('2d')
const scoreBox = document.getElementById('score')
const lifeBox = document.getElementById('life')
const container = document.getElementById('container')
const game_play_container = document.getElementById('game-play')
const audioBtn = document.getElementById('audio_play')
const bestScoreBox = document.getElementById('best-score')
const footer = document.getElementById('score-box')
const startBtn = document.getElementById('start')

let mainBox = document.getElementById('game-main')
let howPlayBox = document.getElementById('game-how')

const[mainBgm,eatBgm,swingBgm,hurtBgm,missFoodBgm] = document.querySelectorAll('audio')

const playerImg = new Image()
playerImg.src='./Image/캐릭.jpeg'

//데이터상 필요한부분
const foodImg=document.getElementsByClassName('img')
let timer =0;
let cactusArray=[];
let score = 0;
let life=3;
let bestScore = localStorage.getItem('bestScore')?localStorage.getItem('bestScore'):score
bestScoreBox.textContent=`Best:${bestScore}`

/* ------------------------------ */ 

//기준 height는 일단 690px
cactus.width = window.innerWidth -600;
cactus.height = mainBox.offsetHeight;
playerBox.width = 300;
playerBox.height = mainBox.offsetHeight;

class Cactus{
    constructor(x,y,width,height,img,eat){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img=img
        this.eat=eat
    }
    create(){
            Cac_ctx.fillStyle = 'white'
            Cac_ctx.fillRect (this.x,this.y, this.width, this.height);
            Cac_ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}
class Doll{
    constructor(x,y,width,height,img){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img=img
    }
    create(){
            Dino_ctx.fillStyle = 'white'
            Dino_ctx.fillRect (this.x,this.y, this.width, this.height);
            Dino_ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}
//player 생성 -> 이미지 로드되면 캔버스에 create
let player = new Doll(100,0,100,100,playerImg)
playerImg.onload=function(){
    player.create()
}
//
audioBtn.addEventListener('click',function(){
    //내생각에 this를못쓰는 이유는 화살표함수여서인듯 => 정답
    if(this.getAttribute('aria-checked') === 'false'){
        mainBgm.play();
        mainBgm.loop = true
        this.setAttribute('aria-checked',"true")
        this.classList.remove('play_on')
        this.classList.add('play_off')
    }
    else if(this.getAttribute('aria-checked') === 'true'){
        mainBgm.pause();
        this.setAttribute('aria-checked',"false")
        this.classList.remove('play_off')
        this.classList.add('play_on')
    }
})
startBtn.addEventListener('click',function(){
    if(audioBtn.getAttribute('aria-checked') === 'true'){
        mainBgm.play();
    }
    game_play_container.classList.add('on')
    game_play_container.classList.remove('off')
    footer.classList.remove('off')
    footer.classList.add('on')
    mainBox.remove();
    window.addEventListener('keydown',(e)=>{
        if(e.key === ' ' && player.y===200){
            jumpDino()
        }
        else{ 
            moveDino(e.key)
        }
    })
    createCactus();
    }
)
howPlayBox.addEventListener('click',function(){
    console.log(mainBox)
    let template=`
    <div>Hello World!</div>
    `
    mainBox.innerHTML=template
})


function moveDino(arrow){
    Dino_ctx.clearRect(player.x,player.y,player.width,player.height)
    if(arrow === 'ArrowUp'){
        if(player.y !== 0){
            player.y = player.y-((playerBox.height-player.height)/2);
        }
    }
    if(arrow === 'ArrowDown'){
        if(player.y !== playerBox.height-player.height){
            player.y = player.y+((playerBox.height-player.height)/2);
        }
    }
    player.create()
}


function newCactusItem(x,y,width,height,img,eat){
    let cactusItem = new Cactus(x,y,width,height,img,eat);
    cactusArray.push(cactusItem)
    cactusItem.create();
}
function createCactus(){
    if(life===0){
        if(localStorage.getItem('bestScore')){
            if(score > localStorage.getItem('bestScore')){
                localStorage.setItem('bestScore',score)
            }
        }else{
            localStorage.setItem('bestScore',score)
        }
        return;
    }
    requestAnimationFrame(createCactus)
    let randomIndex = Math.trunc(Math.random()*foodImg.length)
    let randomFood = foodImg[randomIndex]
    timer++;
    if(timer%60 === 0){
        newCactusItem(800,(playerBox.height-player.height),70,70,randomFood,String(randomFood.dataset.eat))
    }
    if(timer%200 === 0){
        newCactusItem(800,(playerBox.height-player.height)/2,70,70,randomFood,String(randomFood.dataset.eat))
    }
    if(timer%123 === 0){
        newCactusItem(800,0,70,70,randomFood,String(randomFood.dataset.eat))
    }
    moveCactus(cactusArray)
}
//먹고 -> 다른거먹엇을때 음악이 시작중이면 pause하고 다시 play하는싯으로하자
function moveCactus(array=[]){
    if(array.length!==0){
        array.forEach((item,index) => {
            let case1 = (item.x <= player.x+player.width) && item.y === player.y//직선먹을때
            // 조건을 묶을수있겟지만 일단 그러지말자 => 먹는케이스를 다시생각
            function RectOut(){
                Cac_ctx.clearRect(item.x,item.y,item.width,item.height);
                array.splice(index,1)
                //넘어갔을때 아픈소리내고 
            }
            // let CASE1 = player.x+(player.width/2) > item.x+item.width
            let CASE2 = item.x === 0
            if(case1){
                if(item.x+item.width < player.x === false){
                    //캐릭터가 먹을시
                    if(item.eat === 'false'){
                        //비정상 음식먹음
                        hurtBgm.play()
                        life-=1;
                        lifeBox.textContent=`LIFE:${life}`
                    }
                    else{
                        //정상적으로 먹음
                        eatBgm.play()
                        score += 100;
                        scoreBox.textContent=`SCORE:${score}`
                    }
                    RectOut();
                }
                else{
                    //안먹엇을시
                Cac_ctx.clearRect(item.x,item.y,item.width,item.height);
                if(item.x === 0){//아깝게 못먹엇을시
                    missFoodBgm.play()
                    RectOut();
                    return;
                }
                item.x = item.x - 10;
                item.create();
                }
            }   
            else if(CASE2){
                //그냥흘렷을시
                RectOut();
                if(item.eat === 'true'){
                    life-=1;
                    lifeBox.textContent=`LIFE:${life}`
                    missFoodBgm.play()
                }else{
                    swingBgm.play()
                }
            }
            else{//그냥 움직이는상태
                Cac_ctx.clearRect(item.x,item.y,item.width,item.height);
                //장애물 속도 조절부분 => 위와 중복이지만 중간에 코드를 삽입해야되서 함수처리하진않겟다
                item.x = item.x - 10;
                item.create();
            }
        })
    }
}

//필살기같은것도 만들어서 음식다없어지게하는것도 잇으면 좋을듯?