//1-자동실행 fade 슬라이드
{
    const $slides = document.querySelectorAll('section>.jeju1>.slides-container>.visit>li');
    const $indicators = document.querySelectorAll('section>.jeju1>.slides-container>.slides-pagination>li>a');
    const $btnPrev = document.querySelector('section>.jeju1>.slides-container>.pagination.prev');
    const $btnNext = document.querySelector('section>.jeju1>.slides-container>.pagination.next');
    const $btnAuto = document.querySelector('section>.jeju1>.slides-container>.btn_auto');

    let nowIdx = 0;
    let intervalKey = null;
    
    
    //fade 공통함수
    const fadeAction = function(nowIdx){
        //모든 슬라이드 숨김, indicator 비활성화
        for(let i=0;i<$indicators.length;i++){
            $slides[i].style.display = 'none';
            $indicators[i].parentElement.classList.remove('on');
        }
    
        //해당 슬라이드 노출, indicator 활성화
        $slides[nowIdx].style.display = 'block';
        $indicators[nowIdx].parentElement.classList.add('on');
    };
    
    
    //indicator 클릭 이벤트 구문
    $indicators.forEach(function($indicator, idx){
        $indicator.addEventListener('click', function(evt){
            evt.preventDefault();
            nowIdx = idx;
            fadeAction(nowIdx);
        });
    });
    
    
    ///이전버튼 클릭 이벤트 구문
    $btnPrev.addEventListener('click',function(evt){
        evt.preventDefault();
    
        nowIdx>0 ? nowIdx-- : nowIdx=$indicators.length-1;
        fadeAction(nowIdx);
    });
    
    
    //다음버튼 클릭 이벤트 구문
    $btnNext.addEventListener('click', function(evt){
        evt.preventDefault();
    
        (nowIdx<$indicators.length-1) ? nowIdx++ : nowIdx=0;
        fadeAction(nowIdx);
    });
    
    //자동재생 함수
    const autoPlay = function(){
        clearInterval(intervalKey);
    
        intervalKey = setInterval(function(){
            $btnNext.click();
        },3000);
    };
    
    
    autoPlay();


    //재생정지 버튼 클릭 이벤트 구문
    $btnAuto.addEventListener('click', function(evt){
        evt.preventDefault();

        if(this.classList.contains('pause')){
            autoPlay();
            this.classList.remove('pause');
        }else{
            clearInterval(intervalKey);
            this.classList.add('pause');
        }
    });
}

//2-이전다음 슬라이드
{
    const $slides = document.querySelector('section>.jeju2>.slides-container>.eating');
    const $btnPrev = document.querySelector('section>.jeju2>.pagination.prev');
    const $btnNext = document.querySelector('section>.jeju2>.pagination.next');
    
    let nowIdx = 0;

    //이전 버튼 클릭 이벤트 구문
    $btnPrev.addEventListener('click', function(evt){
        evt.preventDefault();
        
        $slides.style.left = 0+'px';
    });

    //다음 버튼 클릭 이벤트 구문
    $btnNext.addEventListener('click', function(evt){
        evt.preventDefault();
        
        $slides.style.left = -1100+'px';
    });
}


//3-자동실행 이전다음 슬라이드
{
    const $container = document.querySelector('section>.jeju3>.slides-container>.activity');
    const $indicators = document.querySelectorAll('section>.jeju3>.slides-container>.slides-pagination>li>a');
    const $btnPrev = document.querySelector('section>.jeju3>.slides-container>.pagination.prev');
    const $btnNext = document.querySelector('section>.jeju3>.slides-container>.pagination.next');
    const $btnAuto = document.querySelector('section>.jeju3>.slides-container>.btn_auto');

    let nowIdx = 0;
    let intervalKey = null;


    //슬라이드 이동, indicator 활성화 공통함수
    const slideAction = function(){
        
        $container.style.left = -1100*nowIdx+'px';

        $indicators.forEach(function(anchor, actIdx){
            anchor.parentElement.classList.toggle('on',actIdx===nowIdx);
        });
    };


    //이전 버튼 클릭 이벤트 구문
    $btnPrev.addEventListener('click', function(evt){
        evt.preventDefault();

        if(nowIdx>0){
            nowIdx--;
        }else{
            nowIdx=5;
        }

        slideAction();
    });


    //다음 버튼 클릭 이벤트 구문
    $btnNext.addEventListener('click', function(evt){
        evt.preventDefault();

        if(nowIdx<5){
            nowIdx++;
        }else{
            nowIdx=0;
        }

        slideAction();
    });


    //자동재생함수
    const autoPlay = function(){
        clearInterval(intervalKey);
    
        intervalKey = setInterval(function(){
            $btnNext.click();
        },3000);
    };


    autoPlay();


    //재생정지 버튼 클릭 이벤트 구문
    $btnAuto.addEventListener('click', function(evt){
        evt.preventDefault();

        if(this.classList.contains('pause')){
            autoPlay();
            this.classList.remove('pause');
        }else{
            clearInterval(intervalKey);
            this.classList.add('pause');
        }
    });
}


//4-포토갤러리
{
    const $photo = document.querySelectorAll('section>.jeju4>.gallery>.photo>li');
    const $thmbs = document.querySelectorAll('section>.jeju4>.gallery>.container>.thmbs>li>a');
    const $content = document.querySelectorAll('section>.jeju4>.gallery>.container>.content>li');

    let nowIdx = 0;
    let oldIdx = nowIdx;

    $thmbs.forEach(function($thmb, idx){
        $thmb.addEventListener('click', function(evt){
            evt.preventDefault();

            oldIdx = nowIdx;
            nowIdx = idx;

            $photo[oldIdx].style.display = 'none';
            $content[oldIdx].style.display = 'none';
            $thmbs[oldIdx].parentElement.classList.remove('on');

            $photo[nowIdx].style.display = 'block';
            $content[nowIdx].style.display = 'block';
            $thmbs[nowIdx].parentElement.classList.add('on');
        });
    });

}


//스크롤 이벤트
{
    const $header = document.querySelector('header');
    const $mnus = document.querySelectorAll('header>.container>nav>.gnb>li>a');//메뉴 셀렉팅
    const $top = document.querySelector('aside>a.top');
    const $aside = document.querySelector('aside');

    //배열은 여러 데이터를 한번에 저장, 관리
    const arrTopVal = [];


    //맨처음 로딩시
    let nowIdx = 0;
    let oldIdx = nowIdx;


    //.offsetTop : 어떤 요소의 top값(body의 시작점으로부터의 거리)
    //전자동으로 article의 top값을 가져와 배열에 추가
    document.querySelectorAll('article').forEach(function($article, idx){
        arrTopVal[idx] = $article.offsetTop;
    });

    console.log('arrTopVal =',arrTopVal);


    //메뉴에 대한 click 이벤트 구문
    $mnus.forEach(function($mnu, idx){
        $mnu.addEventListener('click', function(evt){
            evt.preventDefault();

            //스크롤바의 top값을 설정
            window.scrollTo({top:arrTopVal[idx]-100, behavior:'smooth'});
        });
    });


    //window 객체에 대한 scroll 이벤트 구문
    window.addEventListener('scroll', function(){
        
        //현재 스크롤바의 top값
        
        const scrollTop = Math.ceil(window.scrollY);//scrollTop값에 소수점이 발생했을 때 해결
        console.log(`scrollTop = ${scrollTop}`);

        //for문을 이용하여 5개의 if구문을 하나로 합침
        for(let i=0;i<$mnus.length;i++){

            if(scrollTop >= arrTopVal[i]-200){

                oldIdx = nowIdx;
                nowIdx = i;
        
                //활성화 표시
                $mnus[oldIdx].parentElement.classList.remove('on');
                $mnus[nowIdx].parentElement.classList.add('on');

            }else if(scrollTop < arrTopVal[0]-200){
                $mnus[nowIdx].parentElement.classList.remove('on');
            }
        }

        //top 버튼이 section안에서만 위치하도록 설정
        const footDist = document.querySelector('footer').offsetTop;
        const view = (scrollTop+window.innerHeight) - footDist;

        if(view>0){
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