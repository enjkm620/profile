//비주얼 무한 슬라이드
{
    const $container = $('#wrap > .visual > .slides-container > .slides');
    const $indicator = $('#wrap > .visual > .slides-container > .indicator > li > a');
    const $btnPrev = $('#wrap > .visual > .slides-container > .pagination.prev');
    const $btnNext = $('#wrap > .visual > .slides-container > .pagination.next');

    let nowIdx = 1;

    //indicator 클릭
    $indicator.on('click', function(evt){
        evt.preventDefault();

        nowIdx = $indicator.index(this)+1;

        $indicator.eq(nowIdx-1).parent().addClass('on').siblings().removeClass('on');

        $container.stop().animate({
            left: -1920 * nowIdx
        },600);
    });


    //이전버튼
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        nowIdx--;
        
        $container.stop().animate({
            left: -1920 * nowIdx
        },600,function(){
            if(nowIdx===0){
                $container.css({
                    left : -1920*6
                });

                nowIdx = 6;
            }//end of if

            $indicator.eq(nowIdx-1).parent().addClass('on').siblings().removeClass('on');
        });
    });


    //다음버튼
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        nowIdx++;

        $container.stop().animate({
            left: -1920 * nowIdx
        },600,function(){
            if(nowIdx===7){
                $container.css({
                    left : -1920
                });
    
                nowIdx = 1;

            }//end of if

            $indicator.eq(nowIdx-1).parent().addClass('on').siblings().removeClass('on');
        });
        
    });


    //자동재생
    $(window).on('load', function(){
        intervalKey = setInterval(function(){
            $btnNext.trigger('click');
        },2000);
    });
}

//아티클 - 이전 다음 슬라이드
{
    const $container = $('#wrap > .best-article > article > .article-list');
    const $btnPrev = $('#wrap > .best-article > article > .container > .pagination > .prev');
    const $btnNext = $('#wrap > .best-article > article > .container > .pagination > .next');

    let nowIdx = 0;

    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<1){
            $container.stop().animate({
                left:0
            });
        }else{
            nowIdx--;
            $container.stop().animate({
                left:-1200*nowIdx
            });
        }
        console.log(nowIdx);
    });
    
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<2){
            nowIdx++;
            $container.stop().animate({
                left:-1200*nowIdx
            });
        }else{
            nowIdx=0;
            $container.stop().animate({
                left:0
            });
        }
        console.log(nowIdx);
    });
}

//링커 - 이전 다음 슬라이드
{
    const $container = $('#wrap > .linker > ul');
    const $btnPrev = $('#wrap > .linker > .container > .pagination > .prev');
    const $btnNext = $('#wrap > .linker > .container > .pagination > .next');

    let nowIdx = 0;

    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<1){
            $container.stop().animate({
                left:0
            },600);
        }else{
            nowIdx--;
            $container.stop().animate({
                left:-1200*nowIdx
            },600);
        }
        console.log(nowIdx);
    });
    
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<2){
            nowIdx++;
            $container.stop().animate({
                left:-1200*nowIdx
            },600);
        }else{
            nowIdx=0;
            $container.stop().animate({
                left:0
            },600);
        }
        console.log(nowIdx);
    });
}