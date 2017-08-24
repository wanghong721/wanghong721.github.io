{
    const banner=document.querySelectorAll(".lun .tu .da .banner");
    const active=document.querySelectorAll(".lun .tu .xiao .dian");
    const box=document.querySelector(".lun");
    const colorarr=["#212227","#C6D1E3","#EFDECC","#171D2B","#ECD2B7"];
    const next=document.querySelector(".jian2");
    const proe=document.querySelector(".jian1");
    console.log(banner);
    console.log(active);
    console.log(box);
    console.log(colorarr);
    active.forEach(function (ele,index) {
        ele.onmouseover=function () {
        for(var i=0;i<active.length;i++){
            banner[i].className=("banner");
            active[i].className=("dian");
        }
        banner[index].className=("banner active");
        active[index].className=("dian active");
        box.style.background=colorarr[index];
        num=index;
        }
    });
    let num=0;
    let move=function () {
        num++;
        if (num==active.length){
            num=0;
        }
        if(num==-1){
            num=active.length-1
        }
        for(var i=0;i<active.length;i++){
            active[i].className=("dian");
            banner[i].className=("banner");
        }
        active[num].className=("dian active");
        banner[num].className=("banner active");
        box.style.background=colorarr[num];
    };
    let st=setInterval(move,3000);
    box.onmouseover=function () {
        clearInterval(st);
    };
    box.onmouseout=function () {
        st=setInterval(move,3000);
    };
    next.onclick=function () {
        move();
    };
    proe.onclick=function () {
        num-=2;
        move();
    };

}
// {
//     const banner=document.querySelectorAll(".neirong .home .one .banner .item7");
//     const active=document.querySelectorAll(".neirong .home .one .yuan .active");
//     const next=document.querySelector(".neirong .home .one .jian2");
//     const pro=document.querySelector(".neirong .home .one .jian1");
//     console.log(banner);
//     console.log(active);
//     console.log(next);
//     console.log(pro);
//     active.forEach(function (ele,index) {
//         ele.onmouseover=function () {
//             active[index].className="active act";
//         }
//         ele.onmouseout=function () {
//             active[index].className="active";
//         }
//     });
//     active.forEach(function (ele,index) {
//         ele.onclick=function () {
//             for (var i=0;i<active.length;i++){
//                 banner[i].className=("item7");
//                 active[i].className=("active");
//             }
//             banner[index].className=("item7 active");
//             active[index].className=("active act");
//             num=index;
//         }
//     })
//     let num=0;
//     let move=function () {
//         num++;
//         for (var i=0;i<active.length;i++){
//             banner[i].className=("item7");
//             active[i].className=("active");
//         }
//         banner[num].className=("item7 active");
//         active[num].className=("active act");
//     }
//    next.onclick=function () {
//        if(num<2){
//        move();
//        }
//    };
//     pro.onclick=function () {
//         if(num>0){
//             num-=2;
//             move();
//         }
//     }
// }
{
    const banner=document.querySelector(".body .con");
    const next=document.querySelector(".body .next");
    const proe=document.querySelector(".body .pro");
    const box=document.querySelector(".body");
    let num=0;
    let move=function () {
            if(dir=="right"){
                num=0;
            }else{
                num=1;
            };
        banner.style.transition="all 0.5s";
        banner.style.marginLeft=-num*1226+"px";
        num=1;
    };
    let st=setInterval(move,2000);
    box.onmouseover=function () {
        clearInterval(st);
    };
    box.onmouseout=function () {
        st=setInterval(move,2000);
    };
    let dir="right";
    next.onclick=function () {
        dir="right";
        banner.style.marginLeft=-1226+"px";
    };
    proe.onclick=function () {
        dir="left";
        banner.style.marginLeft=0;
    };
}
{
    function xiaomi (box){
//        let box=box.querySelector(".num1");
        let banner=box.querySelector(".neirong .home .one .banner");
        console.log(banner);
        let active=box.querySelectorAll(".neirong .home .one .yuan .active");
        console.log(active);
        let next=box.querySelector(".neirong .home .jian2");
        let proe=box.querySelector(".neirong .home .jian1")
        console.log(next);
        console.log(proe);
        box.onmouseover=function () {
            next.style.opacity=1;
            proe.style.opacity=1;
        }
        box.onmouseout=function () {
            next.style.opacity=0;
            proe.style.opacity=0;
        }
        let now=0;
        active.forEach(function (ele,index) {
            ele.onclick=function  (){
                active[now].style.background="#CACACA";
                this.style.background="red";
                banner.style.marginLeft=-index*296+"px";
                now=index;
            }
        })
        next.onclick=function () {
            if(now==active.length-1){
                return;
            }
            active[now].style.background="#CACACA";
            now++;
            banner.style.marginLeft=-now*296+"px";
            active[now].style.background="red"
        }
        proe.onclick=function () {
            if(now==0){
                return;
            }
            active[now].style.background="#CACACA";
            now--;
            banner.style.marginLeft=-now*296+"px";
            active[now].style.background="red"
        }
    }

    let box=document.querySelectorAll(".neirong .home .one");
    box.forEach(function (ele) {
        xiaomi (ele);
    })
}