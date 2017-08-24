$("#main").fullpage({
    anchors:["p1","p2","p3","p4","p5"],
    scrollingSpeed:"700",
    easing:"easeOutBounce",
    navigation:"true",
    navigationPosition:"right",
    navigationColor:"blue",
    navigationTooltips:["首页","个人信息","作品展示","联系方式"],
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
            $('.box3').removeClass('upOut').addClass('upIn');
        };
    },
    onLeave:function(index){
        if(index==1){
            $('.box1').removeClass('leftIn').addClass('leftOut');
            $('.box2').removeClass('rightIn').addClass('reftOut')
            $('.box3').removeClass('upIn').addClass('upOut')
        }
    }
})
{
    let canvas1=document.querySelector(".can1")
    let canvas2=document.querySelector(".can2")
    let canvas3=document.querySelector(".can3")
    function percent(canvas,percent,color) {
        let cobj=canvas.getContext("2d");
        let [width,height]=[canvas.width,canvas.height];
        cobj.translate(width/2,height/2);
        let maxAngle=360*percent/100;
        cobj.strokeStyle=color;
        cobj.lineWidth=10;
        let angle=0;
        cobj.font="30px 微软雅黑";
        cobj.textAlign="center";
        cobj.textBaseline="middle";
        cobj.color="#fff";
        function fn() {
            angle++;
            cobj.clearRect(-width/2,-height/2,width,height);
            cobj.beginPath();
            cobj.arc(0,0,width*0.4,-Math.PI/2,(angle*Math.PI/180-Math.PI/2));
            cobj.fillText(Math.round(angle/360*100)+"%",0,0)
            cobj.stroke();
            if(angle>=maxAngle){
                return;
            }
            requestAnimationFrame(fn);
        }
        fn();
    }
    percent(canvas1,80,"#CEAC7C");
    percent(canvas2,90,"#1295DE");
    percent(canvas3,85,"yellow");
}
$(function(){

    var imgL=$(".pic .box").size();
    var deg=360/imgL;
    var roY=0,roX=-10;
    var xN=0,yN=0;
    var play=null;

    $(".pic .box").each(function(i){
        $(this).css({
            <!--translateZ 定义2d旋转沿着z轴-->
            "transform":"rotateY("+i*deg+"deg) translateZ(300px)"	});
        <!--防止图片被拖拽-->
        $(this).attr('ondragstart','return false');
    });

    $(document).mousedown(function(ev){
        var x_=ev.clientX;
        var y_=ev.clientY;
        clearInterval(play);
        console.log('我按下了');
        $(this).bind('mousemove',function(ev){
            /*获取当前鼠标的坐标*/
            var x=ev.clientX;
            var y=ev.clientY;
            /*两次坐标之间的距离*/
            xN=x-x_;
            yN=y-y_;

            roY+=xN*0.2;
            roX-=yN*0.1;
            console.log('移动');
            //$('body').append('<div style="width:5px;height:5px;position:absolute;top:'+y+'px;left:'+x+'px;background-color:red"></div>');

            $('.pic').css({
                transform:'perspective(800px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
            });
            /*之前的鼠标坐标*/
            x_=ev.clientX;
            y_=ev.clientY;

        });
    }).mouseup(function(){
        $(this).unbind('mousemove');
        var play=setInterval(function(){

            xN*=0.95;
            yN*=0.95
            if(Math.abs(xN)<1 && Math.abs(yN)<1){
                clearInterval(play);
            }
            roY+=xN*0.2;
            roX-=yN*0.1;
            $('.pic').css({
                transform:'perspective(800px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
            });

        },30);

    });

});
{
    $(function(){

        var arr= [
            '../img/1.jpg',
            '../img/2.jpg','../img/3.jpg',
            '../img/4.jpg','../img/5.jpg',
            '../img/1.jpg',
        ];
        $('#mybook').onebook(arr,{
            skin:['light','dark'],
            bgDark:'#222222 url(./bg.jpg)',
            flip:'soft',
            border:25
        });
    });
}