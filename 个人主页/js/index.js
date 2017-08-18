$("#main").fullpage({
    anchors:["p1","p2","p3","p4","p5"],
    scrollingSpeed:"700",
    easing:"easeOutBounce",
    navigation:"true",
    navigationPosition:"left",
    navigationColor:"blue",
    navigationTooltips:["首页","个人信息","作品展示","技能展示","联系我"],
    slidesNavigation:"true",
    // controlArrowColor:"blue",
    slidesNavPosition:"bottom",
    loopHorizontal:"false",
    // continuousVertical:"true",
    fixedElements:"#menu",
    afterLoad:function(archor,index){
        if(index==1){
            $('.box1').removeClass('leftOut').addClass('leftIn');
            $('.box2').removeClass('reftOut').addClass('rightIn');
        }
    },
    onLeave:function(index){
        if(index==1){
            $('.box1').removeClass('leftIn').addClass('leftOut');
            $('.box2').removeClass('rightIn').addClass('reftOut')
        }
    }
})