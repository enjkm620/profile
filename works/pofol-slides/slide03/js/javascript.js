const $indicators = document.querySelectorAll('.slides>.slides-pagination>li>a');
const $container = document.querySelector('.slides>.slides-container');
const $btnPrev = document.querySelector('.slides>.slides-navigation.prev');
const $btnNext = document.querySelector('.slides>.slides-navigation.next');

const $btnAuto = document.querySelector('.slides>.slides-auto');

let nowIdx = 0;
let intervalKey = null;

//indicator에 대한 클릭이벤트 구문
$indicators.forEach(function($indicator, idx){
    $indicator.addEventListener('click',function(evt){
        evt.preventDefault();

        nowIdx = idx;

        $container.style.left = -100*nowIdx+'%';

        $indicators.forEach(function(anchor, actIdx){
            anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
        });
        
    });
});


//이전버튼에 대한 클릭이벤트 구문
$btnPrev.addEventListener('click',function(evt){
    evt.preventDefault();

    if(nowIdx>0){
        nowIdx--;
    }else{
        nowIdx=5;
    }

    $container.style.left = -100*nowIdx+'%';

    $indicators.forEach(function(anchor, actIdx){
        anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });

});


//다음버튼에 대한 클릭이벤트 구문
$btnNext.addEventListener('click',function(evt){
    evt.preventDefault();

    if(nowIdx<5){
        nowIdx++;
    }else{
        nowIdx=0;
    }

    $container.style.left = -100*nowIdx+'%';

    $indicators.forEach(function(anchor, actIdx){
        anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
    });

});


//자동재생 함수
const autoPlay = function(){
    clearInterval(intervalKey);//인터벌 중지

    //자동실행 코드
    intervalKey = setInterval(function(){
        $btnNext.click();//이벤트강제발생
    },2000);
};

autoPlay();//맨처음에 무조건 한번 실행

//원버튼 자동재생
$btnAuto.addEventListener('click',function(evt){
    evt.preventDefault();

    if(this.classList.contains('pause')){
        autoPlay();
        this.classList.remove('pause');
    }else{
        clearInterval(intervalKey);
        this.classList.add('pause');
    }
});