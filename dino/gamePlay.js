let alreadyPlay = 'false'
const cactus = document.getElementById('cactus')
const playerBox = document.getElementById('player')
const Cac_ctx = cactus.getContext('2d')
const Player_ctx = playerBox.getContext('2d')
const scoreBox = document.getElementById('score')
const lifeBox = document.getElementById('life')
const levelBox = document.getElementById('level')
const game_play_container = document.getElementById('game-play')
let gameOverBox = document.getElementsByClassName('game-over')[0]
const[mainBgm,eatBgm,swingBgm,hurtBgm,missFoodBgm,levelUpBgm,gameEndBgm] = document.querySelectorAll('audio')

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
        Cac_ctx.fillStyle = '#ffffff00'
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
        Player_ctx.fillStyle = '#ffffff00'
        Player_ctx.fillRect (this.x,this.y, this.width, this.height);
        Player_ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}
const playerImg = new Image()
playerImg.src='./Image/캐릭.jpeg'
let player = new Doll(150,0,100,100,playerImg)
export function gamePlay(){
    /*
    지금드는 해결생각 -> player를 전역으로,
    */
    //player 생성 -> 이미지 로드되면 캔버스에 create
        player.create()
    //데이터상 필요한부분
    const foodImg=document.getElementsByClassName('img')
    let timer =0;
    let cactusArray=[];
    let score = 0;
    let level = 1;
    let speed = 10;
    let life=3;
    lifeBox.textContent=`LIFE:${life}`;
    levelBox.textContent=`LEVEL:${level}`;
    scoreBox.textContent=`SCORE:${score}`;
    
    /* ------------------------------ */ 
    if(alreadyPlay === 'false'){
        window.addEventListener('keydown',(e)=>{
                movePlayer(e.key)
                alreadyPlay = 'true'
        })
    }

    //기준 height는 일단 690px
    const gpc_width = window.getComputedStyle(game_play_container).width
    const gpc_height = window.getComputedStyle(game_play_container).height
    cactus.width = Number(gpc_width.slice(0,gpc_width.length-2))
    cactus.height = Number(gpc_height.slice(0,gpc_height.length-2))-5
    playerBox.width = 300;
    playerBox.height = Number(gpc_height.slice(0,gpc_height.length-2))-5
    function gameStart(){
        player.create()
        createCactus();
    }
           
    function movePlayer(arrow){
        Player_ctx.clearRect(player.x,player.y,player.width,player.height)
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
            mainBgm.pause();
            // 웃는소리틀꺼
            gameOverBox.classList.toggle('off')
            Player_ctx.clearRect(player.x,player.y,player.width,player.height)
            player.x=150;
            player.y=0;
            setTimeout(()=>{
                gameEndBgm.play()
            },500)
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
            newCactusItem(cactus.width,(playerBox.height-player.height),100,100,randomFood,String(randomFood.dataset.eat))
        }
        if(timer%200 === 0){
            newCactusItem(cactus.width,(playerBox.height-player.height)/2,100,100,randomFood,String(randomFood.dataset.eat))
        }
        if(timer%123 === 0){
            newCactusItem(cactus.width,0,100,100,randomFood,String(randomFood.dataset.eat))
        }
        moveCactus(cactusArray)
    }

    function lifeRemoveOne(){
        life-=1;
        lifeBox.textContent=`LIFE:${life}`
    }
    function RectOut(x,y,width,height,index){
        Cac_ctx.clearRect(x,y,width,height);
        cactusArray.splice(index,1)
        //넘어갔을때 아픈소리내고 
    }
    //먹고 -> 다른거먹엇을때 음악이 시작중이면 pause하고 다시 play하는싯으로하자
    function moveCactus(array=[]){
        if(array.length!==0){
            array.forEach((food,index) => {
                let eatCase = (food.x <= player.x+player.width) && food.y === player.y//직선먹을때
                // 조건을 묶을수있겟지만 일단 그러지말자 => 먹는케이스를 다시생각
                if(eatCase){
                    if(food.x+food.width < player.x === false){
                        //캐릭터가 먹을시
                        if(food.eat === 'false'){
                            //비정상 음식먹음
                            hurtBgm.load()
                            hurtBgm.play()
                            lifeRemoveOne()
                        }
                        else{
                            //정상적으로 먹음
                            eatBgm.load()
                            eatBgm.play()
                            score += 100;
                            scoreBox.textContent=`SCORE:${score}`
                            if(score % 1000 === 0){
                                level+=1;
                                levelUpBgm.play()
                                levelBox.textContent=`LEVEL:${level}`
                            }
                        }
                        RectOut(food.x,food.y,food.width,food.height,index);
                    }
                    else{
                        //캐릭-음식 동일선상 근데 음식이 캐릭 넘어감
                    Cac_ctx.clearRect(food.x,food.y,food.width,food.height,index);
                    if(food.x < 0){
                        if(food.eat==='true'){//그게음식일때
                            lifeRemoveOne();
                            missFoodBgm.play()
                        }
                        else{
                            swingBgm.load();
                            swingBgm.play();
                        }
                        RectOut(food.x,food.y,food.width,food.height,index);
                        return;
                    }
                    food.x = food.x - speed - ((level-1)*2);
                    food.create();
                    }
                }   
                else if(food.x < 0){
                    //그냥흘렷을시
                    RectOut(food.x,food.y,food.width,food.height,index);
                    if(food.eat === 'true'){
                        lifeRemoveOne();
                        missFoodBgm.load()
                        missFoodBgm.play()
                    }else{
                        swingBgm.load()
                        swingBgm.play()
                    }
                }
                else{//그냥 움직이는상태
                    Cac_ctx.clearRect(food.x,food.y,food.width,food.height,index);
                    //장애물 속도 조절부분 => 위와 중복이지만 중간에 코드를 삽입해야되서 함수처리하진않겟다
                    food.x = food.x - speed - ((level-1)*2);
                    food.create();
                }
            })
        }
    }
    gameStart()
    //필살기같은것도 만들어서 음식다없어지게하는것도 잇으면 좋을듯?
}


