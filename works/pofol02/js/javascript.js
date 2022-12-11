//lnb 노출
{
    const $gnb = $('#wrap > header > .container > nav > .gnb');
    const $lnbs = $('#wrap > header > .container > nav > .gnb > li > .lnb');
    const $bg_lnb = $('#wrap > header > .bg-lnb');

    const navFadeIn = function(){
        $bg_lnb.stop().fadeIn(100);
        $lnbs.stop().fadeIn(110);
    };

    const navFadeOut = function(){
        $bg_lnb.stop().fadeOut(100);
        $lnbs.stop().fadeOut(110);
    };

    
    $gnb.on('mouseenter', function(){
        navFadeIn();
    });

    $gnb.on('mouseleave', function(){
        navFadeOut();
    });
    
    $bg_lnb.on('mouseenter', function(){
        navFadeIn();
    });

    $bg_lnb.on('mouseleave', function(){
        navFadeOut();
    });
}

//visual Fade 슬라이드
{
    const $visual = $('#wrap > .visual');
    const $slides = $('#wrap > .visual > .slides > li');
    const $indicators = $('#wrap > .visual > .container > .slides-pagination > li > a');
    const $btnPrev = $('#wrap > .visual > .container > .pagination.prev');
    const $btnNext = $('#wrap > .visual > .container > .pagination.next');

    let nowIdx = 0;
    let intervalKey = null;

    //fade 공통함수
    const fadeAction = function(){
        $slides.eq(nowIdx)
            .stop().animate({opacity:1},600)
            .siblings().stop().animate({opacity:0},600);
        $indicators.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    };

    //indicator 클릭이벤트 구문
    $indicators.on('click',function(evt){
        evt.preventDefault();

        nowIdx = $indicators.index(this);

        fadeAction();
    });

    //이전 버튼 클릭이벤트 구문
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx>0){
            nowIdx--;
        }else{
            nowIdx=9;
        }

        fadeAction();
    });


    //다음 버튼 클릭이벤트 구문
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<9){
            nowIdx++;
        }else{
            nowIdx=0;
        }

        fadeAction();
    });


    //자동재생함수
    const autoPlay = function(){
        clearInterval(intervalKey);
    
        intervalKey = setInterval(function(){
            $btnNext.click();
        },2500);
    };
 
    
    autoPlay();

    //이전, 다음 버튼 마우스 이벤트
    $visual.on('mouseenter', function(){
        $btnPrev.stop().fadeIn(400);
        $btnNext.stop().fadeIn(400);
    });

    $visual.on('mouseleave', function(){
        $btnPrev.stop().fadeOut(400);
        $btnNext.stop().fadeOut(400);
    });
}

//전시 안내 mouseenter 이벤트
{
    const $img = $('#wrap > .exhibit > ul > li > a > .frame');

    $img.on('mouseenter', function(){
        $(this).css({backgroundSize: 100+'%'});
        $(this).stop().animate({backgroundSize: 110+'%'},400);
    });

    $img.on('mouseleave', function(){
        $(this).css({backgroundSize: 100+'%'});
    });
    
}

//교육프로그램 이전다음 슬라이드
{
    const $container = $('#wrap > .class > .slides-container > .slides');
    const $btnPrev = $('#wrap > .class > .pagination.prev');
    const $btnNext = $('#wrap > .class > .pagination.next');

    let nowIdx = 0;

    //이전 버튼 클릭이벤트 구문
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        nowIdx--;

        if(nowIdx<9){
            $container.stop().animate({left:-280*nowIdx},400,'easeInOutCubic');
        }else if(nowIdx>0){
            $btnNext.show();
        }

        if(nowIdx<1){
            $btnPrev.hide();
            $btnNext.show();
        }
    });


    //다음 버튼 클릭이벤트 구문
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        $btnPrev.show();

        nowIdx++;

        console.log(nowIdx);

        if(nowIdx<9){
            $container.stop().animate({left:-280*nowIdx},400,'easeInOutCubic');
        }
        
        if(nowIdx>7){
            $btnNext.hide();
        }
    });
}

//투어프로그램 이전다음 슬라이드
{
    const $container = $('#wrap > .tour > .container > ul');
    const $slides = $('#wrap > .tour > .container > ul > li');
    const $btnPrev = $('#wrap > .tour > .page > .pagination.prev');
    const $btnNext = $('#wrap > .tour > .page > .pagination.next');
    const $indicatorNow = $('#wrap > .tour > .page > .now');

    let nowIdx = 1;
    let nowPage = null;
    
    //이전 버튼 클릭이벤트 구문
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        nowPage = $slides.eq(nowIdx).attr('data-num');
        
        nowIdx--;
        
        if(nowIdx>1){
            $container.stop().animate({left:-1100},600,'easeInOutCubic');
            nowPage = $slides.eq(nowIdx-1).attr('data-num');
        }
        console.log(nowIdx);
        
        if(nowIdx<2){
            $container.stop().animate({left:0},600,'easeInOutCubic');
            nowIdx=1;
            nowPage='01';
        }

        $indicatorNow.text(nowPage);

        console.log(nowIdx);
        console.log(`nowPage = ${nowPage}`);
    });
    
    
    //다음 버튼 클릭이벤트 구문
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        nowPage = $slides.eq(nowIdx).attr('data-num');

        $container.stop().animate({left:-1100*nowIdx},600,'easeInOutCubic');
        
        nowIdx++;

        if(nowIdx>3){
            $container.stop().animate({left:0},600,'easeInOutCubic');
            nowIdx=1;
            nowPage='01';
        }
        
        $indicatorNow.text(nowPage);

        console.log(nowIdx);
        console.log(`nowPage = ${nowPage}`);
    });
}