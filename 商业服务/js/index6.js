window.onload=function(){
    $('.box1').addClass('leftIn');
    $('.box2').addClass('rightIn');
    $('.box3').addClass('upIn');
}
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
$(".list li").css("background","#080808").mouseover(function () {
    $(".list li").css("background","#080808");
    $(this).css("background","#EB4346");
});
$(".list li").mouseout(function () {
    $(".list li").css({
        background:"#080808",
    })
})