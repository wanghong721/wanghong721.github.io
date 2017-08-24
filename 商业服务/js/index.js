$("#main").fullpage({
    anchors:["p1","p2","p3","p4","p5","p6"],
    scrollingSpeed:"700",
    easing:"easeOutBounce",
    slidesNavigation:"true",
    loopHorizontal:"false",
    afterLoad:function(archor,index){
        if(index==1){
            $('.box1').removeClass('leftOut').addClass('leftIn');
            $('.box2').removeClass('reftOut').addClass('rightIn');
            $('.box3').removeClass('upOut').addClass('upIn');
        }
        if(index==2){
            $('.box5').addClass('num5In');
            $('.box6').addClass('num6In');
        }
    },
    onLeave:function(index){
        if(index==1){
            $('.box1').removeClass('leftIn').addClass('leftOut');
            $('.box2').removeClass('rightIn').addClass('reftOut')
            $('.box3').removeClass('upIn').addClass('upOut')
        }
    }
})
$(".menu ul li a").css({
    background:"white",
    color:"black"})
    .mouseover(function () {
    $(".menu ul li a").css({
        background:"white",
        color:"black"
    })
    $(this).css({
        background:"black",
        color:"white"
    })
})
$(".menu ul li a").mouseout(function () {
    $(".menu ul li a").css({
        background:"white",
        color:"black"
    })
})
$(".box4").css("background","#1f3755").mouseover(function () {
    $(".box4").css("background","#EB4346")
})
$(".box4").mouseout(function () {
    $(".box4").css("background","#1f3755")
});
$(".box56 ul li").css("background","#EB4346").mouseover(function () {
    $(".box56 ul li").css("background","#EB4346");
    $(this).css("background","#361E28");
});
$(".box56 ul li").mouseout(function () {
    $(".box56 ul li").css({
        background:"#EB4346",
    })
})
$(".bian").css("color","#EB4346").mouseover(function () {
    $(".bian").css("color","#EB4346");
    $(this).css("color","blue");
});
$(".bian").mouseout(function () {
    $(".bian").css({
        color:"#EB4346",
    })
})
{
var galleryTop = new Swiper('.gallery-top', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 10,
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;
}
{
var swiper = new Swiper('.box18 .swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 4,
    centeredSlides: true,
    paginationClickable: true,
    spaceBetween: 30
});
}
$(".list li").css("background","#080808").mouseover(function () {
    $(".list li").css("background","#080808");
    $(this).css("background","#EB4346");
});
$(".list li").mouseout(function () {
    $(".list li").css({
        background:"#080808",
    })
})
