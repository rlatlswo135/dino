
export function gamePlay(){
    const cactus = document.getElementById('cactus')
    const playerBox = document.getElementById('player')
    const Cac_ctx = cactus.getContext('2d')
    const Player_ctx = playerBox.getContext('2d')
    const scoreBox = document.getElementById('score')
    const lifeBox = document.getElementById('life')
    let mainBgm_range = document.getElementById('bgm-range')
    const container = document.getElementById('container')
    const game_play_container = document.getElementById('game-play')
    const audioBtn = document.getElementById('audio_play')
    const bestScoreBox = document.getElementById('best-score')
    const footerBox = document.getElementById('score-box')
    const startBtn = document.getElementById('start')
    const levelBox = document.getElementById('level')
    const backBtn = document.getElementById('back')
    let mainBox = document.getElementById('game-main')
    let howPlayBox = document.getElementById('game-how')
    let gameOverBox = document.getElementsByClassName('game-over')[0]
    
    const[mainBgm,eatBgm,swingBgm,hurtBgm,missFoodBgm,levelUpBgm,gameEndBgm] = document.querySelectorAll('audio')
    const playerImg = new Image()
    playerImg.src='./Image/캐릭.jpeg'
    
    //데이터상 필요한부분
    const foodImg=document.getElementsByClassName('img')
    let timer =0;
    let cactusArray=[];
    let score = 0;
    let level = 1;
    let speed = 10;
    let life=3;
    let alreadyPlay = 'false'
    
    /* ------------------------------ */ 
    
    function reset(){
        cactusArray.forEach(food => Cac_ctx.clearRect(food.x,food.y,food.width,food.height))
        Player_ctx.clearRect(player.x,player.y,player.width,player.height)
        cactusArray=[];
        timer=0;
        score=0;
        level=1;
        speed=10;
        life=3; 
        lifeBox.textContent=`LIFE:${life}`;
        levelBox.textContent=`LEVEL:${level}`;
        scoreBox.textContent=`SCORE:${score}`;
        player = new Doll(150,0,100,100,playerImg)
        player.create()
    }
    //기준 height는 일단 690px
    cactus.width = window.innerWidth -270;
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
    //player 생성 -> 이미지 로드되면 캔버스에 create
    let player = new Doll(150,0,100,100,playerImg)
    playerImg.onload=function(){
        player.create()
    }
    //
    backBtn.addEventListener('click',function(){
        reset()
        mainBox.classList.toggle('off')
        game_play_container.classList.toggle('off')
        gameOverBox.classList.toggle('off')
        footerBox.classList.toggle('off')
        alreadyPlay = 'true'
    })
    mainBgm_range.addEventListener('input',function(){
        mainBgm.volume=this.value
    })
    audioBtn.addEventListener('click',function(){
        //내생각에 this를못쓰는 이유는 화살표함수여서인듯 => 정답
        if(this.getAttribute('aria-checked') === 'false'){
            mainBgm.volume=0.5;
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
            howPlayBox.classList.add('off')
            game_play_container.classList.toggle('off')
            footerBox.classList.toggle('off')
            mainBox.classList.toggle('off');
            if(alreadyPlay === 'false'){
                window.addEventListener('keydown',(e)=>{
                        movePlayer(e.key)
                })
            }
            createCactus();
        }
    )
    
    
    
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
            setTimeout(()=>gameEndBgm.play(),700)
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
            newCactusItem(cactus.width,(playerBox.height-player.height),70,70,randomFood,String(randomFood.dataset.eat))
        }
        if(timer%200 === 0){
            newCactusItem(cactus.width,(playerBox.height-player.height)/2,70,70,randomFood,String(randomFood.dataset.eat))
        }
        if(timer%123 === 0){
            newCactusItem(cactus.width,0,70,70,randomFood,String(randomFood.dataset.eat))
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
    
    //필살기같은것도 만들어서 음식다없어지게하는것도 잇으면 좋을듯?
}


