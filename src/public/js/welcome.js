let startContainer = document.getElementById('start');
let startButton = document.getElementById('startButton');
let main = document.getElementById('main');
let monsterTitle = document.getElementById('monsterTitle')
let loading = document.getElementById('loading');

new CircleType(monsterTitle)
  .radius(1000);


startContainer.onmousedown = ()=>{
    startContainer.style.transform = 'translateY(0.4em)';
    startContainer.style.boxShadow = '0px 3px 8px 0px rgb(41, 41, 41)';
}
startContainer.onmouseup = ()=>{
    
    startContainer.style.transform = 'unset';
    startContainer.style.boxShadow = '0px 10px -0px -3px rgb(41, 41, 41)'; 
    setTimeout(() => {
        window.location.href = "/";
    }, 500);
}




setTimeout(() => {
    setTimeout(() => {
        loading.remove()
    }, 500); 
    loading.style.opacity = '0'
}, 4500);