const cactus = document.getElementById('cactus')
const Dino = document.getElementById('dino')
const Cac_ctx = cactus.getContext('2d')
const Dino_ctx = Dino.getContext('2d')
const scoreBox = document.getElementById('score')
const lifeBox = document.getElementById('life')
const container = document.getElementById('container')
const game_play_container = document.getElementById('game-play')
const audioBtn = document.getElementById('audio_play')
const mainAudio = document.getElementById('main-bgm')
const hurtAudio = document.getElementById('hurt-bgm')
const eatAudio = document.getElementById('eat-bgm')
const swingAudio = document.getElementById('swing-bgm')
const bestScoreBox = document.getElementById('best-score')
const footer = document.getElementById('score-box')
let main_ele = document.getElementById('game-main')

const missAudio = document.getElementById('miss-bgm')


//기준 height는 일단 690px
//cactus=오렌지 dino=초록 큰컨테이너=빨강 게임플레이박스=갈색 게임메인박스=파랑
cactus.width = window.innerWidth -600;
cactus.height = main_ele.offsetHeight
Dino.width = 300;
Dino.height = main_ele.offsetHeight

let timer =0;
let cactusArray=[];
let score = 0;
let life=3;
let bestScore = localStorage.getItem('bestScore')?localStorage.getItem('bestScore'):score
bestScoreBox.textContent=`Best:${bestScore}`
//window.innerWidth,Height가 뷰포트의 width,height를 받아오는거같다(mdn검색)
const DinoImg = new Image()
DinoImg.src='./Image/캐릭.jpeg'
const foodImg=document.getElementsByClassName('img')
const startBtn = document.getElementById('start')

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
            Cac_ctx.fillStyle = 'red'
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
            Dino_ctx.fillStyle = 'red'
            Dino_ctx.fillRect (this.x,this.y, this.width, this.height);
            Dino_ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}
let dino = new Doll(100,0,100,100,DinoImg)
audioBtn.addEventListener('click',function(){
    //내생각에 this를못쓰는 이유는 화살표함수여서인듯 => 정답
    if(this.getAttribute('aria-checked') === 'false'){
        mainAudio.play();
        mainAudio.loop = true
        this.setAttribute('aria-checked',"true")
        this.classList.remove('play_on')
        this.classList.add('play_off')
    }
    else if(this.getAttribute('aria-checked') === 'true'){
        mainAudio.pause();
        this.setAttribute('aria-checked',"false")
        this.classList.remove('play_off')
        this.classList.add('play_on')
    }
})
startBtn.addEventListener('click',()=>{
    if(audioBtn.getAttribute('aria-checked') === 'true'){
        mainAudio.play();
    }
    game_play_container.classList.add('on')
    game_play_container.classList.remove('off')
    footer.classList.remove('off')
    footer.classList.add('on')

    main_ele.remove();

    window.addEventListener('keydown',(e)=>{
        if(e.key === ' ' && dino.y===200){
            jumpDino()
        }
        else{ 
            moveDino(e.key)
        }
    })
    createCactus();
    }
)


function moveDino(arrow){
    Dino_ctx.clearRect(dino.x,dino.y,dino.width,dino.height)
    if(arrow === 'ArrowUp'){
        if(dino.y !== 0){
            dino.y = dino.y-((Dino.height-dino.height)/2);
        }
    }
    if(arrow === 'ArrowDown'){
        if(dino.y !== Dino.height-dino.height){
            dino.y = dino.y+((Dino.height-dino.height)/2);
        }
    }
    dino.create()
}

DinoImg.onload=function(){
    dino.create()
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
        newCactusItem(800,(Dino.height-dino.height),70,70,randomFood,String(randomFood.dataset.eat))
    }
    if(timer%200 === 0){
        newCactusItem(800,(Dino.height-dino.height)/2,70,70,randomFood,String(randomFood.dataset.eat))
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
            let case1 = (item.x <= dino.x+dino.width) && item.y === dino.y//직선먹을때
            // 조건을 묶을수있겟지만 일단 그러지말자 => 먹는케이스를 다시생각
            function RectOut(){
                Cac_ctx.clearRect(item.x,item.y,item.width,item.height);
                array.splice(index,1)
                //넘어갔을때 아픈소리내고 
            }
            // let CASE1 = dino.x+(dino.width/2) > item.x+item.width
            let CASE2 = item.x === 0
            if(case1){
                if(item.x+item.width < dino.x === false){
                    /*
                    먹는소리가 진행중에 먹으면 계속 오디오가 진행중이어서 새로 소리가안남
                    -> audio가 틀어져잇으면 새로틀고싶은데 새로 트는게아니라 pause는 일시정지라 원하는대로 안된다....
                    */
                    //캐릭터가 먹을시
                    if(item.eat === 'false'){
                        hurtAudio.play()
                        life-=1;
                        lifeBox.textContent=`LIFE:${life}`
                    }
                    else{
                        //정상적으로 먹음
                        eatAudio.play()
                        score += 100;
                        scoreBox.textContent=`SCORE:${score}`
                    }
                    RectOut();
                }
                else{
                Cac_ctx.clearRect(item.x,item.y,item.width,item.height);
                if(item.x === 0){
                    //캐릭터가 애썻지만 넘어갈시
                    missAudio.play()
                    RectOut();
                    return;
                }
                item.x = item.x - 10;
                item.create();
                }
            }   
            else if(CASE2){
                //그냥장애물이 넘어갈시
                RectOut();
                if(item.eat === 'true'){
                    life-=1;
                    lifeBox.textContent=`LIFE:${life}`
                    missAudio.play()
                }else{
                    swingAudio.play()
                }
            }
            else{
                Cac_ctx.clearRect(item.x,item.y,item.width,item.height);
                //장애물 속도 조절부분 => 위와 중복이지만 중간에 코드를 삽입해야되서 함수처리하진않겟다
                item.x = item.x - 10;
                item.create();
            }
        })
    }
}

//필살기같은것도 만들어서 음식다없어지게하는것도 잇으면 좋을듯?