//fade 슬라이드
{
    const $slides = $('#wrap > .visual > .slides-container > .slides > li');
    const $indicatorNow = $('#wrap > .visual > .slides-container > .indicator.now');
    const $btnPrev = $('#wrap > .visual > .slides-container > .pagination.prev');
    const $btnNext = $('#wrap > .visual > .slides-container > .pagination.next');

    let nowIdx = 0;
    let intervalKey = null;

    //fade 공통함수
    const fadeAction = function(){
        $slides.eq(nowIdx)
            .stop().animate({opacity:1},600)
            .siblings().stop().animate({opacity:0},600);

        const nowPage = $slides.eq(nowIdx).attr('data-page');
        $indicatorNow.text(nowPage);
    };

    //이전 버튼 클릭이벤트 구문
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx>0){
            nowIdx--;
        }else{
            nowIdx=6;
        }

        fadeAction();
    });


    //다음 버튼 클릭이벤트 구문
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        if(nowIdx<6){
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


}

//dessert 이전 다음 슬라이드
{
    const $container = $('#wrap > .content > .mnu-dessert > .slides-container > ul');
    const $btnPrev = $('#wrap > .content > .mnu-dessert > .pagination.prev');
    const $btnNext = $('#wrap > .content > .mnu-dessert > .pagination.next');

    //이전 버튼 클릭이벤트 구문
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        $container.stop().animate({left:0},600);
        $btnPrev.hide();
        $btnNext.show();
    });


    //다음 버튼 클릭이벤트 구문
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        $container.stop().animate({left:-1100},600);
        $btnNext.hide();
        $btnPrev.show();
    });
}

//tea 이전 다음 슬라이드
{
    const $container = $('#wrap > .content > .mnu-tea > .slides-container > ul');
    const $btnPrev = $('#wrap > .content > .mnu-tea > .pagination.prev');
    const $btnNext = $('#wrap > .content > .mnu-tea > .pagination.next');

    //이전 버튼 클릭이벤트 구문
    $btnPrev.on('click', function(evt){
        evt.preventDefault();

        $container.stop().animate({left:0},400);
        $btnPrev.hide();
        $btnNext.show();
    });


    //다음 버튼 클릭이벤트 구문
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        $container.stop().animate({left:-746},400);
        $container.children('li:nth-child(3)').css({marginRight:20});
        $btnNext.hide();
        $btnPrev.show();
    });
}

//포토갤러리 + 이전 다음 슬라이드
{
    const $photo = $('#wrap > .content > .gallery > .main-container > .sub-container > .photo');
    const $container = $('#wrap > .content > .gallery > .main-container > .sub-container > .thmbs-container > .thmbs');
    const $thmbs = $('#wrap > .content > .gallery > .main-container > .sub-container > .thmbs-container > .thmbs > li > a');
    const $btnPrev = $('#wrap > .content > .gallery > .main-container > .pagination.prev');
    const $btnNext = $('#wrap > .content > .gallery > .main-container > .pagination.next');

    let nowIdx = 0;
    let imgSrc = null;

    //썸네일 클릭 이벤트
    $thmbs.on('click', function(evt){
        evt.preventDefault();

        nowIdx = $thmbs.index(this);

        //큰 이미지 변경
        imgSrc = $(this).attr('href');
        $photo.css({
            backgroundImage: 'url('+imgSrc+')'
        });

        //활성화표시
        $(this).parent().addClass('on').siblings().removeClass('on');
    });

    //이전 버튼 클릭
    $btnPrev.on('click', function(evt){
        evt.preventDefault();
        
        nowIdx--;

        if(nowIdx<9){
            $container.stop().animate({
                left:-170*nowIdx
            },400,'easeInOutCubic');
            
        }else if(nowIdx>0){
            $btnNext.show();
        }

        console.log(nowIdx);

        //큰 이미지 변경
        imgSrc = $thmbs.eq(nowIdx).attr('href');
        $photo.css({
            backgroundImage: 'url('+imgSrc+')'
        });

        //활성화표시
        $thmbs.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');

        if(nowIdx<1){
            $btnPrev.hide();
            $btnNext.show();
        }

    });


    //다음 버튼 클릭
    $btnNext.on('click', function(evt){
        evt.preventDefault();

        $btnPrev.show();
        
        nowIdx++;
        
        if(nowIdx<9){
            $container.stop().animate({
                left:-170*nowIdx
            },400,'easeInOutCubic');

        }else if(nowIdx>10){
            $btnNext.hide();
        }
        
        console.log(nowIdx);
        
        //큰 이미지 변경
        imgSrc = $thmbs.eq(nowIdx).attr('href');
        $photo.css({
            backgroundImage: 'url('+imgSrc+')'
        });

        //활성화표시
        $thmbs.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    });

}

//오시는 길
{
    const $location = $('#wrap > .content > .location > a');

    $location.on('click', function(evt){
        evt.preventDefault();
    });
}

//스크롤 이벤트
{
    const $header = document.querySelector('header');
    const $mnus = document.querySelectorAll('#wrap > header .container > nav > .gnb > li > a');//메뉴 셀렉팅
    const $top = document.querySelector('aside>a.top');
    const $aside = document.querySelector('aside');
    
    //배열은 여러 데이터를 한번에 저장, 관리
    const arrTopVal = [];//각 article의 top 값 [0,1000,1845,2645,3245]
    
    
    //맨처음 로딩시
    let nowIdx = 0;
    let oldIdx = nowIdx;
    
    
    //.offsetTop : 어떤 요소의 top값(body의 시작점으로부터의 거리)
    //전자동으로 article의 top값을 가져와 배열에 추가
    document.querySelectorAll('article').forEach(function($article, idx){
        arrTopVal[idx] = $article.offsetTop;
    });
    
    
    //메뉴에 대한 click 이벤트 구문
    $mnus.forEach(function($mnu, idx){
        $mnu.addEventListener('click', function(evt){
            evt.preventDefault();

            //스크롤바의 top값을 설정
            window.scrollTo({top:arrTopVal[idx]-140, behavior:'smooth'});
        });
    });
    
    
    //window 객체에 대한 scroll 이벤트 구문
    window.addEventListener('scroll', function(){
        
        //현재 스크롤바의 top값
        
        const scrollTop = Math.ceil(window.scrollY);//scrollTop값에 소수점이 발생했을 때 해결
    
        //for문을 이용하여 5개의 if구문을 하나로 합침
        for(let i=0;i<$mnus.length;i++){
    
            if(scrollTop >= arrTopVal[i]-240){
    
                oldIdx = nowIdx;
                nowIdx = i;
        
                //활성화 표시
                $mnus[oldIdx].parentElement.classList.remove('on');
                $mnus[nowIdx].parentElement.classList.add('on');
    
            }else if(scrollTop < arrTopVal[0]-240){
                $mnus[nowIdx].parentElement.classList.remove('on');
            }
        }

        const footDist = document.querySelector('footer').offsetTop;
        const view = (scrollTop+window.innerHeight) - footDist;//음수, 0 , 양수
        
        if(view>0){//footer가 화면에 보인다.
            console.log(`view = ${view}`);
            $aside.style.marginBottom = view + 'px';
        }else{
            $aside.style.marginBottom = 0;
        }
    });
    
    
    //top 버튼에 대한 click 이벤트 구문
    $top.addEventListener('click', function(evt){
        evt.preventDefault();
        window.scrollTo({top:0, behavior:'smooth'});//스크롤바의 top값을 설정
    });
    
    
    //로고에 대한 click 이벤트 구문
    document.querySelector('.logo>a').addEventListener('click', function(evt){
        evt.preventDefault();
        $top.click();
    });
}