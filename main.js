
game();



function game() {
    let isPause = false;
    let animationId = null;

    let speed = 3;
    let score = 0;

    const car = document.querySelector('.car');
   

    const carInfo = {
        ...createElementInfo(car),
        move:  {
            top:null,
            bottom:null,
            left:null,
            right:null,
        }
    } 


    const coin = document.querySelector('.coin');
    const coinInfo = createElementInfo(coin)


    const arrow = document.querySelector('.arrow');
    const arrowInfo = createElementInfo(arrow)
 
    const danger = document.querySelector('.danger');
    const dangerInfo = createElementInfo(danger)


    
     

    const road = document.querySelector('.road');
    const roadHeight = road.clientHeight;
    const roadWidth = road.clientWidth/2;

    const gameButton = document.querySelector('.game-button')
    const gameScore = document.querySelector('.game-score')
    const backdrop = document.querySelector('.backdrop')
    const restartButton = document.querySelector('.restart-button');

    
    const threes = document.querySelectorAll('.three');


    ///////

    
    
    document.getElementById('thorID').addEventListener("click", function() {
        document.getElementById('characterHeroID__container').classList.add('close')
        document.getElementById('characterHeroID').classList.add('close')
        document.getElementById('loki-car').remove()
        setTimeout(function(){
            const myElement = document.querySelector('.game-button')
            myElement.click() 
        }, 0)

        
    })
    document.getElementById('lokiID').addEventListener("click", function() {
        document.getElementById('characterHeroID__container').classList.add('close')
        document.getElementById('characterHeroID').classList.add('close')
        document.getElementById('loki-car').remove()
        document.getElementById('thor-car').src='./../img/main/lokiv1.png'
        
        //
        setTimeout(function(){
            const myElement = document.querySelector('.game-button')
            myElement.click() 
        }, 0)

        
    })


    document.addEventListener('DOMContentLoaded', function(e){ 
        setTimeout(function(){
              const myElement = document.querySelector('.game-button') 
              myElement.click() 
          }, 0) 
      })



    ///////



    const treesCoords = []

    for(let i=0;i<threes.length;i++){
        const tree = threes[i]
        const coordsTree = getCoords(tree)
        treesCoords.push(coordsTree)
    }
    document.addEventListener('keydown',(event) => {

         if(isPause){
             return;
         }
        const code = event.code;
        
        
        if(code === 'ArrowUp' && carInfo.move.top === null){
            carInfo.move.top = requestAnimationFrame(CarMoveToTop)

        }else if(code === 'ArrowDown' && carInfo.move.bottom === null) {
            carInfo.move.bottom = requestAnimationFrame(CarMovieToBottom)

        }else if(code === 'ArrowLeft' && carInfo.move.left === null) {
            carInfo.move.left = requestAnimationFrame(CarMovieToLeft)

        }else if(code === 'ArrowRight' && carInfo.move.right === null) {
            carInfo.move.right = requestAnimationFrame(CarMovieToRight)

        }else if(code === 'KeyW' && carInfo.move.top === null) {
            carInfo.move.top = requestAnimationFrame(CarMoveToTop)
        }else if(code === 'KeyS' && carInfo.move.bottom === null) {
            carInfo.move.bottom = requestAnimationFrame(CarMovieToBottom)
        }else if(code === 'KeyA' && carInfo.move.left === null) {
            carInfo.move.left = requestAnimationFrame(CarMovieToLeft)

        }else if(code === 'KeyD' && carInfo.move.right === null) {
            carInfo.move.right = requestAnimationFrame(CarMovieToRight)

        }
    })

    document.addEventListener('keyup',(event) => {
        const code = event.code;
        if(code === 'ArrowUp'){
            cancelAnimationFrame(carInfo.move.top)
            carInfo.move.top = null

        }else if(code === 'ArrowDown') {
            cancelAnimationFrame(carInfo.move.bottom)
            carInfo.move.bottom = null

        }else if(code === 'ArrowLeft') {
            cancelAnimationFrame(carInfo.move.left)
            carInfo.move.left = null

        }else if(code === 'ArrowRight') {
            cancelAnimationFrame(carInfo.move.right)
            carInfo.move.right = null
        }else if(code === 'KeyW') {
            cancelAnimationFrame(carInfo.move.top)
            carInfo.move.top = null
        }else if(code === 'KeyS') {
            cancelAnimationFrame(carInfo.move.bottom)
            carInfo.move.bottom = null

        }else if(code === 'KeyA') {
            cancelAnimationFrame(carInfo.move.left)
            carInfo.move.left = null

        }else if(code === 'KeyD') {
            cancelAnimationFrame(carInfo.move.right)
            carInfo.move.right = null
        }
        

    })

    function createElementInfo(element) {
        return {
            width:element.clientWidth/2,
            height:element.clientHeight,
            coords:getCoords(element),
            visible: true,
         };

       

    }

    function CarMoveToTop() {
        const newY = carInfo.coords.y -5;
        carInfo.coords.y = newY;
         if(newY < 0){
             return
         }
        carMove(carInfo.coords.x,newY)
        carInfo.move.top = requestAnimationFrame(CarMoveToTop)
        

    }
    function CarMovieToBottom() {
        const newY = carInfo.coords.y +5;
        carInfo.coords.y = newY;
         if(newY + carInfo.height > roadHeight) {
             return
         }
        carMove(carInfo.coords.x,newY)
        carInfo.move.bottom = requestAnimationFrame(CarMovieToBottom)
        
        
    }
    function CarMovieToLeft() {
        const newX = carInfo.coords.x -5;
        carInfo.coords.x = newX;
         if (newX < -roadWidth + carInfo.width) {
             return;
         }
        carMove(newX,carInfo.coords.y)
        carInfo.move.left = requestAnimationFrame(CarMovieToLeft)
        
        
    }
    function CarMovieToRight() {
        const newX = carInfo.coords.x +5;
        carInfo.coords.x = newX;
         if (newX > roadWidth - carInfo.width) {
             return;
         }
        carMove(newX,carInfo.coords.y)
        carInfo.move.right = requestAnimationFrame(CarMovieToRight)
        
        
    }
    function carMove (x,y) {
        car.style.transform = `translate(${x}px,${y}px)`;
        

    }


    animationId = requestAnimationFrame(startGame)


    function startGame() {

        if (hasCollision(carInfo,dangerInfo)){

            return finishGame();
           }

       
        
       threesAnimation();
       elementAnimation(coin ,coinInfo , -100);
       elementAnimation(danger, dangerInfo, -250);
       elementAnimation(arrow, arrowInfo, -1600);



       if (coinInfo.visible && hasCollision(carInfo,arrowInfo)){

            arrow.style.display = 'none';
            arrowInfo.visible = false;

          

            turbo();

            }

       if (coinInfo.visible && hasCollision(carInfo,coinInfo)) {
            score++;
            gameScore.innerText = score;
            coin.style.display = 'none';
            coinInfo.visible = false;

            if (score % 3 === 0) {
                speed+= 2;
              }
            if(score > 5) {
                speed+= 0.5;
            }else if(score > 20){
                speed+=1;
            }
            
       }

       animationId = requestAnimationFrame(startGame)
        
    }

    

    function threesAnimation() {

        for(let i=0;i<threes.length;i++){
            const tree = threes[i]
            const coords = treesCoords[i]
            

            let newYCoord = coords.y + speed;

            if(newYCoord > window.innerHeight ){
                newYCoord = -537;
            }
            treesCoords[i].y = newYCoord
            tree.style.transform = `translate(${coords.x}px,${newYCoord}px)`;
        }
    }

    function elementAnimation(element, elementInfo , elementInitialYCoord) {
         
            let newYCoord = elementInfo.coords.y + speed;
            let newXCoord = elementInfo.coords.x;
    

            if(newYCoord > window.innerHeight){
            newYCoord = elementInitialYCoord;
    
            const direction = parseInt(Math.random() * 2);
            const maxXCoord = (roadWidth + 1 - elementInfo.width);
            const randomXCoord = parseInt(Math.random() * maxXCoord ) 
    
            if (direction === 0) { // двигаем  влево
                newXCoord = -randomXCoord;
    
            }else if (direction === 1) { // двигаем вправо
                newXCoord = randomXCoord;
            }

            element.style.display = 'initial';
            elementInfo.visible = true;

             }

            

    
            elementInfo.coords.y = newYCoord;
            elementInfo.coords.x = newXCoord;
            element.style.transform = `translate(${newXCoord}px,${newYCoord}px)`;
        
    }
  

    function getCoords(element) {
       
        
        const matrix = window.getComputedStyle(element).transform;
        const array = matrix.split(',');
        const y = array[array.length - 1];
        const x = array[array.length - 2];
        const numericY = parseFloat(y);
        const numericX = parseFloat(x);

        return {x: numericX, y: numericY};

    }


    function hasCollision(elem1Info, elem2Info) {
        const carYTop = elem1Info.coords.y;
        const carYBottom = elem1Info.coords.y + elem1Info.height;

        const carXLeft = elem1Info.coords.x - elem1Info.width;
        const carXRight = elem1Info.coords.x + elem1Info.width;

        const coinYTop = elem2Info.coords.y;
        const coinYBottom = elem2Info.coords.y + elem2Info.height;

        const coinXLeft = elem2Info.coords.x - elem2Info.width;
        const coinXRight = elem2Info.coords.x + elem2Info.width;


        //y
        if(carYTop > coinYBottom || carYBottom < coinYTop) {
            return false;
        }

        //x
        if(carXLeft > coinXRight || carXRight < coinXLeft) {
            return false;
        }

        return true;
    }

    function cancelAnimations () {
        cancelAnimationFrame(carInfo.move.top)
        cancelAnimationFrame(carInfo.move.bottom)
        cancelAnimationFrame(carInfo.move.left)
        cancelAnimationFrame(carInfo.move.right)
        cancelAnimationFrame(animationId)

    }



    function finishGame () {
        cancelAnimations();
        
        gameScore.style.display = 'none';
        gameButton.style.display = 'none';
        backdrop.style.display = 'flex';
        const scoreText = backdrop.querySelector('.finish-text-score');
        scoreText.innerText = score;
        

    }


    function turbo() {
        if(speed < 10) {
            speed = 10;
            setTimeout(turboClear,1000)
        }else if(speed > 10) {
            speed = 10;
        
        }
    }
    function turboClear() {
        return speed = 5;
    }

    

    window.addEventListener('keydown', (e) => {
        if(e.key === "Escape") {
            gameButton.click();
        }
    
    });

    
    gameButton.addEventListener('click', ()=> {
        isPause = !isPause
        if (isPause) {
            cancelAnimationFrame(carInfo.move.top)
            cancelAnimationFrame(carInfo.move.bottom)
            cancelAnimationFrame(carInfo.move.left)
            cancelAnimationFrame(carInfo.move.right)

            cancelAnimationFrame(animationId)
            gameButton.children[0].style.display = 'none'
            gameButton.children[1].style.display = 'initial'
        }else {
            animationId = requestAnimationFrame(startGame)
            gameButton.children[1].style.display = 'none'
            gameButton.children[0].style.display = 'initial'

        }
        restartButton.addEventListener('click', () => {
            window.location.reload();
        })


    });

   







    
}