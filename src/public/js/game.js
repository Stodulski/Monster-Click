let monsters = [{
  nombre: 'monsterOne.png',
  vida: 100,
  exp: 20
}, {
  nombre: 'monsterTwo.png',
  vida: 200,
  exp: 40
}, {
  nombre: 'monsterThree.png',
  vida: 300,
  exp: 60
}, {
  nombre: 'monsterFour.png',
  vida: 400,
  exp: 80
}, {
  nombre: 'monsterFive.png',
  vida: 500,
  exp: 100
}];

// inicializar
let cookiesPersonal = document.cookie.split(";");
if(cookiesPersonal.length == 1){
  document.cookie = `level=1`;
  document.cookie = `exp=0`;
  var expCookie = [0, 0]
  var levelCookie = [1, 1] 
}
for (let i = 0; i < cookiesPersonal.length; i++) {
  let element = cookiesPersonal[i].split('=');
  let elementType = element[0].trim();
  let elementValue = element;
  if(elementType == 'exp'){
      var expCookie = elementValue;
    
    
    
  }
  if(elementType == 'level'){
      var levelCookie = elementValue;

    
    
  }
}

let myLevel = parseInt(levelCookie[1]);
let myExp = parseInt(expCookie[1]);
let toLevelUp = 100 * (myLevel * 2) ;

let enemyDiv = document.getElementById('enemy');
let platform = document.getElementById('platform');
let monsterHp = document.getElementById('health');
let expActual = document.getElementById('expActual');
let expTotal = document.getElementById('expTotal');
let level = document.getElementById('nivelActual');
let expBar = document.getElementById('expBar');
let monsterSpawn = document.getElementById('monsterSpawn');

let multiplicador;
let sonido;

multiplicadorExp();

let random = Math.floor(Math.random() * 5);
let monsterExp = monsters[random].exp * multiplicador;
let monsterMaxHp = parseInt(monsters[random].vida * (myLevel * 2));
expBar.style.width = (100 / toLevelUp) * myExp + '%'
let actualMonsterHp = monsterMaxHp;

monsterSpawn.setAttribute('src', 'public/img/png/' + monsters[random].nombre);

antiInspec();
cursor();

monsterSpawn.addEventListener('mousedown', () => {
  clickAudio();
  animationClick();
  monsterDamage();
  antiInspec();
  multiplicadorExp();
  if (actualMonsterHp <= 0) {
      expSystem();
      spawnMonster();
  };
})

function cursor(){
  document.body.onmousedown = () => {
    document.body.style.cursor = "url('/public/img/png/cursorAtack.png'), auto";
  }
  document.body.onmouseup = () => {
    document.body.style.cursor = "url('/public/img/png/cursor.png'), auto";
  }
}
function expSystem(){
  actualMonsterHp = 0;
  monsterHp.innerHTML = parseInt(actualMonsterHp);
  myExp = monsterExp + myExp;
  expActual.innerHTML = myExp
  expBar.style.width = (100 / toLevelUp) * myExp + '%'
  
  if (myExp >= toLevelUp) {
      myExp = myExp - toLevelUp;
      toLevelUp = toLevelUp * 2;
      myLevel = myLevel + 1; 
      antiInspec()
      expBar.style.width = (100 / toLevelUp) * myExp + '%'
  }
}
function spawnMonster(){
      random = Math.floor(Math.random() * 5);
      enemyDiv.style.pointerEvents = "none";
      monsterSpawn.style.transition = '.5s'
      monsterSpawn.style.opacity = '0';
      monsterHp.style.background = 'unset';

      setTimeout(() => {
          monsterSpawn.setAttribute('src', ' ');
      }, 500);

      setTimeout(() => {
          monsterSpawn.style.opacity = '1';
          monsterSpawn.setAttribute('src', 'public/img/png/' + monsters[random].nombre);

          monsterExp = monsters[random].exp * multiplicador;
          monsterMaxHp = parseInt(monsters[random].vida * (myLevel * 2));
    
          actualMonsterHp = monsterMaxHp;
          antiInspec()

          monsterHp.style.background = 'linear-gradient(180deg, rgba(0,231,50,1) 0%, rgba(0,255,58,1) 50%, rgba(0,191,37,1) 100%)';
          monsterHp.style.width = '100%'
          setTimeout(() => {
              enemyDiv.style.pointerEvents = "unset";
          }, 500);
          
      }, 1000);
}
function antiInspec(){
  expTotal.innerHTML = toLevelUp;
  expActual.innerHTML = myExp;
  level.innerHTML = myLevel;
  monsterHp.innerHTML = parseInt(actualMonsterHp);
}
function animationClick(){
  monsterSpawn.classList.add('hit-monster');
  platform.classList.add('hit-platform');
  setTimeout(() => {
      monsterSpawn.classList.remove('hit-monster');
      platform.classList.remove('hit-platform');
  }, 100);
}
function multiplicadorExp(){
  if(myLevel <= 5){
    multiplicador = 5;
  }
  if(myLevel > 5 && myLevel <= 20){
    multiplicador = 4;
  }
  if(myLevel > 20){
    multiplicador = 3;
  }
}
function monsterDamage(){
  actualMonsterHp = actualMonsterHp - 100 * (myLevel * 1.5);
  monsterHp.style.width = (100 / monsterMaxHp) * actualMonsterHp + '%'
}
function clickAudio(){
  sonido = new Audio('/public/audio/hit.mp3');
  sonido.play();
}


setInterval(() => {
  document.cookie = `level=` + myLevel;
  document.cookie = `exp=` + myExp;
}, 100);