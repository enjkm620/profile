const $cityContainer = $('.city>.slides-city>.slides-container>.city-list');

const $citybtnPrev = $('.city>.slides-city>.pagination.prev');
const $citybtnNext = $('.city>.slides-city>.pagination.next');

const $eventIndicator = $('.event>.slides-event>.slides-pagination>li>a');
const $eventImg = $('.event>.slides-event>.slides-container>p');
const $eventbtnPrev = $('.event>.slides-event>.pagination.prev');
const $eventbtnNext = $('.event>.slides-event>.pagination.next');

let nowIdx = 0;
let evtIdx = 0;
let intervalKey = null;


//city 슬라이드 다음버튼 이벤트 구문
$citybtnNext.on('click',function(evt){
    evt.preventDefault();

    if(nowIdx>2){
        $cityContainer.stop().animate({left:0},400);
        nowIdx=0;
    }else{
        $cityContainer.stop().animate({left:-1060*nowIdx},400);
        nowIdx++;
    }

});


//city 슬라이드 이전버튼 이벤트 구문
$citybtnPrev.on('click',function(evt){
    evt.preventDefault();

    console.log(nowIdx);

    if(nowIdx>=2){
        $cityContainer.stop().animate({left:-1060},400);
        nowIdx--;
    }else{
        $cityContainer.stop().animate({left:0},400);
        nowIdx--;
    }
});

$eventImg.on('click', function(evt){
    evt.preventDefault();
});


//event 슬라이드 indicator에 대한 이벤트 구문
$eventIndicator.on('click', function(evt){
    evt.preventDefault();

    evtIdx = $eventIndicator.index(this);
    $eventImg.eq(evtIdx)
        .stop().animate({opacity:1},400)
        .siblings().stop().animate({opacity:0},400);
    $eventIndicator.eq(evtIdx).parent().addClass('on').siblings().removeClass('on');
});


//event 슬라이드 이전버튼 이벤트 구문
$eventbtnPrev.on('click', function(evt){
    evt.preventDefault();

    if(evtIdx>0){
        evtIdx--;
    }else{
        evtIdx=9;
    }
    
    $eventImg.eq(evtIdx)
        .stop().animate({opacity:1},400)
        .siblings().stop().animate({opacity:0},400);
    $eventIndicator.eq(evtIdx).parent().addClass('on').siblings().removeClass('on');
});


//event 슬라이드 다음버튼 이벤트 구문
$eventbtnNext.on('click', function(evt){
    evt.preventDefault();

    if(evtIdx<9){
        evtIdx++;
    }else{
        evtIdx=0;
    }
    
    $eventImg.eq(evtIdx)
        .stop().animate({opacity:1},400)
        .siblings().stop().animate({opacity:0},400);
    $eventIndicator.eq(evtIdx).parent().addClass('on').siblings().removeClass('on');
});


//자동재생 함수
const autoPlay = function(){
    clearInterval(intervalKey);

    intervalKey = setInterval(function(){
        $eventbtnNext.trigger('click');
    },2000);
};


autoPlay();