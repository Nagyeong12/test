$(function(){

$('.pages-wrap').scroll(function(){

    $('.page-indicator > ul > li > a').click(function(e) {
        var targetTop = $($(this).attr('href')).position().top;
        console.log(targetTop)
        $('.pages-wrap').stop().animate({scrollTop:targetTop}, 300);
        e.preventDefault();
    });

    function Page__updateIndicatorActive() {
        var scrollTop = $('.pages-wrap').scrollTop();
        
        $($('.page').get()).each(function(index, node) {
            var positionTop = $(this).position().top;
            
            if ( scrollTop <= positionTop + 300 ) {
                // 기존 활성화 풀고
                $('.page-indicator > ul > li.active').removeClass('active');
                
                // 해당 활성화
                var currentPageIndex = $(this).index();
                $('.page-indicator > ul > li').eq(currentPageIndex).addClass('active');
                
                $('html').attr('data-current-page-index', currentPageIndex);
                
                return false; // 더 이상 다른 페이지를 검사하지 않는다.
            }
        });
    }

    // 각 페이지의 positionTop 속성을 업데이트
    function Page__updatepositionTop() {
        
        $('.page').each(function(index, node) {
            var $page = $(node);
            var positionTop = $page.position.top;
            
            $page.attr('data-position-top', positionTop);
        });
        
        // 계산이 바뀌었으니까, 다시 상태 업데이트
        Page__updateIndicatorActive();
    }

    function Page__init() {
        Page__updatepositionTop();
    }

    // 초기화
    Page__init();

    // 화면이 리사이즈 할 때 마다, positionTop을 다시계산
    $(window).resize(Page__updatepositionTop);

    // 스크롤이 될 때 마다, 인디케이터의 상태를 갱신
    $(window).scroll(Page__updateIndicatorActive);

})
})