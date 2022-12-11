//WOW 플러그인 연동
$(function() {
	$(window).on("load", function(){
		new WOW().init();
	});		
});

//visual 영역, 네비게이션 메뉴
$(function() {
	const $h1 = $('h1');
	const $home = $('#home');
    const $intro = $home.children('.intro');

	const $header = $('header');
	const $nav = $header.find('nav');
	const $btnGnb = $header.find('.btn-gnb');

	//처음 로딩과 브라우저창 크기를 줄였을때 설정
	$(window).on('load resize', function() {
		//$home.height($(window).height());
		$home.height(window.innerHeight);

		// $h1.css({
		// 	top: $intro.offset().top - 72,
		// 	marginLeft: -$h1.width() / 2
		// });

		//가로폭 크기 기준 - window객체의 경우 .width()가 정확히 측정하지 못하므로(17px 모자름) window.innerWidth 사용권장
		if(window.innerWidth>640){//PC모드
			//PC모드
			// $h1.css({
			// 	top: $intro.offset().top - 72,
			// 	marginLeft: -$h1.width() / 2
			// });

			$nav.show();
		} else {
			//모바일
			// $h1.css({
			// 	top: $intro.offset().top - 100,
			// 	marginLeft: -$h1.width() / 2
			// });

			$btnGnb.removeClass('clse');
			$nav.hide();
		}
	});

	//햄버거버튼
	$btnGnb.on('click', function() {
		$(this).toggleClass('clse');
		$nav.toggle();
	});

	$(window).on('scroll', function() {
		//현재 스크롤바의 top 값 추출
		let scrollTop = $(this).scrollTop();

		if (scrollTop > $(this).height()) {
			$header.addClass('fixed');
			//const headerH = $header.outerHeight()
			$('#aboutme').css({
				marginTop: $header.height()
			});
			
		} else {
			$header.removeClass('fixed');
			$('#aboutme').css({
				marginTop: 0
			});
		}

        //네이버라인 비주얼 효과       
        if(window.innerWidth>640){//PC모드
            if(scrollTop>window.innerHeight-400){
                $home.css({
                    //top:66,
                    transform:'scale(0.7)'
                });
            }else{
                $home.css({
                    top:0,
                    transform:'initial'
                });
            }
        }          
	}); //end of scroll



});


//ability 영역
$(function(){

    //라이트박스
    const $btnIAM = $(".iam a");
    const $shadow = $(".iam .shadow");
    const $lightbox = $('.iam .lightbox');
    const $btnClse = $(".iam .clse");

    $btnIAM.on('click', function(evt){
        evt.preventDefault();

        $shadow.show();//그림자 노출
        $lightbox.show();
    })

    //닫기
    $btnClse.on('click', function(){
        $lightbox.hide();
        $shadow.hide();
    });


    //그림자영역을 클릭하면 닫힘
    $shadow.on('click', function(){
        $lightbox.hide();
        $shadow.hide();
    });


    //이벤트전파 안되게 설정
    $lightbox.on('click', function(evt){
        evt.stopPropagation();
    });


    //ESC키를 이용한 닫기설정
    $(document).on('keyup', function(evt){
        console.log('현재 눌린 키의 번호는 '+ evt.which);
        if(evt.which=='27'){
            $lightbox.hide();
            $shadow.hide();
        }
    });




	//inview 이벤트는 화면이 요소가 출현했을 때 작동
	$("#ability").on("inview", function(evt, visible){
		if(visible==true){
			console.log("inview 이벤트 작동완료");
/*			
			$("#ability .bar").each(function(){
				$(this).css({
				//	"width" : $(this).children("span").text()
				
					"width" : $(this).parent().attr("data-bar")+"%"
				});
			});
*/		

			for(var i=0;i<=5;i++){
				var $that = $("#ability .bar").eq(i);
				$that.css({
					"width" : $that.parent().attr("data-bar")+"%"
				});
			}
		}
	});
	
	

	$(window).on("scroll", function(){
        const scrollTop = $(this).scrollTop();

		if(scrollTop < $("#ability").offset().top-$(this).height()){
			
			$("#ability .bar").width(0);
		}
     
	});

	
	$(".piechart").on("inview", function(evt, visible){
		
		if(visible==true){
			
			$('.chart').easyPieChart({
				//your configuration goes here
				easing: 'easeInOutCubic',
				delay: 3000,
				barColor:'#68c3a3',
				trackColor:'rgba(255,255,255,0.2)',
				scaleColor: false,
				lineWidth: 8,
				size: 140,
				animate: 2000,
				onStep: function(from, to, percent) {
					this.el.children[0].innerHTML = Math.round(percent);
				}
			});
			
			
		}
		
	});
	
});


//portfolio 영역
$(function(){

    //페이드 슬라이드
    const $slides = $('section#portfolio > .slides > .slides-container > figure');
    const $indicator = $('section#portfolio > .slides > .slides-pagination > li > a');
	const $btnNext = $('section#portfolio > .slides > a.next');
	const $btnPrev = $('section#portfolio > .slides > a.prev');

    let nowIdx = 0;
    let oldIdx = nowIdx;


    function fadeFn(){
        $slides.eq(oldIdx).stop().fadeOut(200);//이전 슬라이드 사라짐 처리
        $slides.eq(nowIdx).stop().fadeIn(200).css({display:'flex'});//이번에 나타날 슬라이드 처리
        
        //활성화표시
        $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    }

    $indicator.on('click', function(evt){

        evt.preventDefault();

        oldIdx = nowIdx;
        nowIdx = $indicator.index(this);

        fadeFn();
    });

	$btnNext.on('click', function(evt){
		evt.preventDefault();

        oldIdx = nowIdx;
		
		if(nowIdx<$indicator.length-1){
			nowIdx++
		}else{
			nowIdx=0;
		}

		fadeFn();
	});

	$btnPrev.on('click', function(evt){
		evt.preventDefault();

        oldIdx = nowIdx;

		if(nowIdx<1){
			nowIdx=$indicator.length-1
		}else{
			nowIdx--;
		}

		fadeFn();
	});



    //작업과정
    const $btnProc = $("#portfolio>.slides .proc");
    const $shadow = $("#portfolio>.slides .shadow");
    const $lightbox = $('#portfolio>.slides .lightbox');
    const $btnClse = $("#portfolio>.slides .clse");

    $btnProc.on('click', function(evt){
        evt.preventDefault();

        $shadow.hide().eq(nowIdx).show();//그림자 노출
    })

    //닫기
    $btnClse.on('click', function(){
        $shadow.hide();
    });


    //그림자영역을 클릭하면 닫힘
    $shadow.on('click', function(){
        $shadow.hide();
    });


    //이벤트전파 안되게 설정
    $lightbox.on('click', function(evt){
        evt.stopPropagation();
    });


    //ESC키를 이용한 닫기설정
    $(document).on('keyup', function(evt){
        console.log('현재 눌린 키의 번호는 '+ evt.which);
        if(evt.which=='27'){
            $shadow.hide();
        }
    });




	//inview 이벤트는 화면이 요소가 출현했을 때 작동
	$("#ability").on("inview", function(evt, visible){
		if(visible==true){
			console.log("inview 이벤트 작동완료");
/*			
			$("#ability .bar").each(function(){
				$(this).css({
				//	"width" : $(this).children("span").text()
				
					"width" : $(this).parent().attr("data-bar")+"%"
				});
			});
*/		

			for(var i=0;i<=5;i++){
				var $that = $("#ability .bar").eq(i);
				$that.css({
					"width" : $that.parent().attr("data-bar")+"%"
				});
			}
		}
	});
	
	
	$(window).on("scroll", function(){
		if($(this).scrollTop() < $("#ability").offset().top-$(this).height()){
			$("#ability .bar").width(0);
		}
	});

	
	$(".piechart").on("inview", function(evt, visible){
		
		if(visible==true){
			
			$('.chart').easyPieChart({
				//your configuration goes here
				easing: 'easeInOutCubic',
				delay: 3000,
				barColor:'#68c3a3',
				trackColor:'rgba(255,255,255,0.2)',
				scaleColor: false,
				lineWidth: 8,
				size: 140,
				animate: 2000,
				onStep: function(from, to, percent) {
					this.el.children[0].innerHTML = Math.round(percent);
				}
			});

		}
		
	});

 
    const spreadFn = function (el) {
        for (let i = 0; i < 6; i++) {
            $(el).eq(i).delay((i * 100) + 100).fadeIn(600);
        }

        for (let k = 0; k < 6; k++) {
            $(el).eq(k).delay((k + 6) * 100).fadeOut(600);
        }
    };

    spreadFn(".ring");

    setInterval(function(){
        spreadFn("h4 .ring");
        spreadFn("h4+div .ring");
    }, 3000);

});


//디자인 포트폴리오 영역
$(function(){
	const $slides = $('section#portfolio > .works > .work-design > .slides > li');
	const $indicators = $('section#portfolio > .works > .work-design > .slides-pagination > li > a');
	const $btnPrev = $('section#portfolio > .works > .work-design > .pagination.prev');
	const $btnNext = $('section#portfolio > .works > .work-design > .pagination.next');

	let nowIdx = 0;
	
	//fade 공통함수
	const fadeAction = function(){
		$slides.eq(nowIdx)
			.stop().fadeIn(400)
			.siblings().stop().fadeOut(400);
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
			nowIdx=3;
		}

		fadeAction();
	});

	//다음 버튼 클릭이벤트 구문
	$btnNext.on('click', function(evt){
		evt.preventDefault();

		if(nowIdx<3){
			nowIdx++;
		}else{
			nowIdx=0;
		}

		fadeAction();
	});

});


//탑버튼
$(function() {
	const $aside = $('aside'); //오른쪽 하단 탑버튼

	$(window).on('scroll', function() {
		//현재 스크롤바의 top 값 추출
		let scrollTop = $(this).scrollTop();

		//스크롤바를 120px 이상 내리면 노출시킴
		if (scrollTop > 120) {
			$aside.stop().fadeIn();
		} else {
			$aside.stop().fadeOut();
		}

		//footer가 화면에 노출되는 순간부터 TOP 아이콘이 footer 바로 위에 있게 하고 싶다.
		//원리 = footer.offset().top = scrollTop + 브라우저의 높이값
		//view = (scrollTop + 브라우저의 높이값) - footer.offset().top
		//view = 0 이라면 브라우저 바로 밑에 푸터가 있는 상태(노출직전 상태)
		//view > 0 이라면 footer가 화면에 노출되었다는 것을 의미한다.
		//view > 0 상태에서 view 값이 갖는 의미는 footer가 노출되는 높이이다.

		const view = scrollTop + $(this).height() - $('footer').offset().top;

		if (view > 0) {
			$aside.css({ marginBottom: view });
		} else {
			$aside.css({ marginBottom: 0 });
		}
	}); //end of scroll
});


//원페이지 스크롤
$(function(){
	
    const $header = $("header");
    const headerH = $header.outerHeight();//헤더의 높이(보더,패딩 포함해서 측정)

	const $mnu = $('header>.container>nav>.gnb>li>a');//6개의 메뉴셀렉팅
    let idx = 0;//현재 선택된 메뉴의 인덱스

    let arrTopVal = [];//header이후에 나타나는 section의 top값

    
    // 함수는 반복되는 코드를 많들어 놓고 사용하면 코드의 재활용 측면에서 유용하게 사용 가능
    function pageAni(topVal){
        $('html, body').stop().animate({scrollTop:topVal});
    }

    //load 이벤트는 컨텐츠가 페이지에 노출된 시점에 딱 한번 일어남
    //resize 이벤트는 브라우저의 크기가 바뀌면 일어남
    $(window).on('load resize', function(){

        console.log("현재 메뉴의 개수 : "+$mnu.size());
        
        //어떤 요소의 top값(문서/브라우저/body로부터의 거리)를 구하는 방법 -> .offset().top
        //각 section의 top값을 자동으로 계산하는 장점
        //반복문을 이용한 처리
        for(let i=0;i<$mnu.size();i++){
            arrTopVal[i] = $("header~section").eq(i).offset().top;
        }
        
    });

	
	const $btnGnb = $header.find('.btn-gnb');

    $mnu.on('click', function(evt){
        //이번에 클릭한 요소의 index번호
        idx = $mnu.index(this);//0~5
        pageAni(arrTopVal[idx]-headerH+1);//fixed한 헤더의 높이값
        evt.preventDefault();

		if($(window).width()<=640){
			$btnGnb.trigger("click");
		}
    });


    $(window).on('scroll', function(){

        let scrollTop = $(this).scrollTop();
        //console.log("scrollTop = ",scrollTop);


        //메뉴 활성화 표시
        for(let i=0;i<$mnu.size();i++){
            if(scrollTop>=arrTopVal[i]-headerH-200){//fixed한 헤더의 높이값
                $mnu.eq(i).parent().addClass('on');
                $mnu.eq(i).parent().siblings().removeClass('on');
            }else if(scrollTop<arrTopVal[0]-headerH-200){//비주얼 슬라이드 구간
                $mnu.parent().removeClass('on');
            }
        }
		
    });


    //로고에 대한 클릭이벤트 구문
    $(".logo, aside").on('click', function(evt){
        evt.preventDefault();
        pageAni(0);
    });

	
	//최초 로딩시 맨위로 이동
    $(window).on('load', function(){
        pageAni(0);
    });




});