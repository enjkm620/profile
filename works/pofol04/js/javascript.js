//lnb 노출 (PC모드일 때만 실행)
{
    const $gnbs = $('#wrap > header > nav > .gnb > li > a');
    const $lnbs = $('#wrap > header > nav > .lnb > li');
    const $lnbArea = $('#wrap > header > nav > .lnb');
    const $nav = $('#wrap > header > nav');
    const $btnGnb = $('#wrap > header > .container > .btn-gnb');

    $(window).on('load resize', function(){
        
        let nowIdx = 0;

        if(window.innerWidth>640){
            $gnbs.on('mouseenter', function(evt){
                evt.preventDefault();
                
                nowIdx = $gnbs.index(this);
                
                $lnbArea.stop().fadeIn(200);
                $lnbs.eq(nowIdx).stop().fadeIn(200);
            });
            
            $lnbArea.on('mouseenter', function(){
                $lnbArea.stop().fadeIn(200);
                $lnbs.eq(nowIdx).stop().fadeIn(200);
            });
            
            $gnbs.on('mouseleave', function(evt){
                evt.preventDefault();
        
                nowIdx = $gnbs.index(this);
        
                $lnbs.eq(nowIdx).stop().fadeOut(200);
            });
        
            $lnbArea.on('mouseleave', function(){
                $lnbs.eq(nowIdx).stop().fadeOut(200);
            });
        } else {
            $lnbArea.hide();
        }
    });

    //모바일 메뉴 버튼 클릭 이벤트
	$btnGnb.on('click', function() {
		$(this).toggleClass('clse');
		$nav.toggle();
	});
}

//visual 배너 무한 슬라이드
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
            left: -100 * nowIdx + '%'
        },600);
    });


    //이전버튼
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        nowIdx--;
        
        $container.stop().animate({
            left: -100 * nowIdx + '%'
        },600,function(){
            if(nowIdx===0){
                $container.css({
                    left : -100 * 4 + '%'
                });

                nowIdx = 4;
            }//end of if

            $indicator.eq(nowIdx-1).parent().addClass('on').siblings().removeClass('on');
        });
    });


    //다음버튼
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        nowIdx++;

        $container.stop().animate({
            left: -100 * nowIdx + '%'
        },600,function(){
            if(nowIdx===5){
                $container.css({
                    left : -100 + '%'
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

//LIMITED GIFT 슬라이드
{
    const $container = $('#wrap > .limited-gift > .slides-container > .slides');
    const $btnPrev = $('#wrap > .limited-gift > .pagination.prev');
    const $btnNext = $('#wrap > .limited-gift > .pagination.next');

    let nowIdx = 0;

    $(window).on('load resize', function(){
    
        if(window.innerWidth>640){
            //PC - 이전 버튼 클릭이벤트 구문
            $btnPrev.on('click', function(evt){
                evt.preventDefault();

                nowIdx--;
                
                if(nowIdx<5){
                    $container.stop().animate({left:-25*nowIdx+'%'},400,'easeInOutCubic');
                }else if(nowIdx>0){
                    $btnNext.show();
                }
                
                if(nowIdx<1){
                    $btnPrev.hide();
                }
                
                if(nowIdx>2){
                    $btnNext.show();
                }

                console.log(nowIdx);

            });
        
            //PC - 다음 버튼 클릭이벤트 구문
            $btnNext.on('click', function(evt){
                evt.preventDefault();
        
                $btnPrev.show();
        
                nowIdx++;

                if(nowIdx<5){
                    $container.stop().animate({left:-25*nowIdx+'%'},400,'easeInOutCubic');
                }
                
                if(nowIdx>3){
                    $btnNext.hide();
                }

                console.log(nowIdx);
            });
    
        } else {
            //모바일 - 이전 버튼 클릭이벤트 구문
            $btnPrev.on('click', function(evt){
                evt.preventDefault();
    
                nowIdx--;

                console.log(nowIdx);
    
                if(nowIdx<5){
                    $container.stop().animate({left:-100*nowIdx+'%'},400,'easeInOutCubic');
                }else if(nowIdx>0){
                    $btnNext.show();
                }
    
                if(nowIdx<3){
                    $btnNext.show();
                }

                if(nowIdx<1){
                    $btnPrev.hide();
                }
            });
    
            //모바일 - 다음 버튼 클릭이벤트 구문
            $btnNext.on('click', function(evt){
                evt.preventDefault();
    
                $btnPrev.show();
    
                nowIdx++;
    
                console.log(nowIdx);
    
                if(nowIdx<5){
                    $container.stop().animate({left:-100*nowIdx+'%'},400,'easeInOutCubic');
                }
                
                if(nowIdx>2){
                    $btnNext.hide();
                }
            });
        }
    });
}

//CALENDARS 페이드 슬라이드
{
    const $slidesArea = $('#wrap > .calendar > .slides-container');
    const $slides = $('#wrap > .calendar > .slides-container > .slides > li');
    const $indicators = $('#wrap > .calendar > .slides-container > .indicators > li > a');
    const $btnPrev = $('#wrap > .calendar > .slides-container > .pagination.prev');
    const $btnNext = $('#wrap > .calendar > .slides-container > .pagination.next');

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
            nowIdx=2;
        }
        
        fadeAction();
    });


    //다음 버튼 클릭이벤트 구문
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<2){
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
    $slidesArea.on('mouseenter', function(){
        $btnPrev.stop().fadeIn(400);
        $btnNext.stop().fadeIn(400);
    });

    $slidesArea.on('mouseleave', function(){
        $btnPrev.stop().fadeOut(400);
        $btnNext.stop().fadeOut(400);
    });
}

//footer-mnu 모바일 버튼 클릭 이벤트
{
    const $btnTit = $('#wrap > footer > .info-2 > .footer-mnu > li > .container > .btn-tit');
    const $snb = $('#wrap > footer > .info-2 > .footer-mnu > li > .snb');

    let nowIdx = 0;

	$btnTit.on('click', function() {
        nowIdx = $btnTit.index(this);

        console.log(nowIdx);
        
        $(this).toggleClass('clse');
		$snb.eq(nowIdx).slideToggle();
	});
}