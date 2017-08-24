{
    let topbar=document.querySelector(".cang");
    // let tiao=document.querySelector(".fix");
    console.log(topbar);
    // console.log(tiao);
    window.onscroll=function () {
        let obj=document.body.scrollTop==0?document.documentElement:document.body;
        if(obj.scrollTop>=500){
            topbar.style.top=0;
        }else{
            topbar.style.top="-52px";
        };
        // if(obj.scrollTop>=400){
        //     tiao.style.left=0;
        //     tiao.style.top="40%";
        //     tiao.style.transform="scale(1)"
        // }else{
        //     tiao.style.left="-40px";
        //     tiao.style.top="-40px";
        //     tiao.style.transform="scale(0.1)";
        // }
    }

}
{
    var items=document.querySelectorAll(".hot .right ul li");
    var masks=document.querySelectorAll(".hot .right ul li .xian");
    console.log(items);
    console.log(masks);
    items.forEach(function (ele,index) {
        ele.onmouseover=function () {
            masks[index].style.display="block";
        };
        ele.onmouseout=function () {
            masks[index].style.display="none";
        }
    })
}
{
    const banner=document.querySelector(".hot .left .center ul");
    const next=document.querySelector(".jian2");
    const pro=document.querySelector(".jian1");
    console.log(banner);
    console.log(next);
    console.log(pro);
    let kaiguan=true;
    next.onclick=function () {
        if(kaiguan){
            banner.style.marginLeft=-480+"px";
        }
    };
    pro.onclick=function () {
        if(kaiguan){
            banner.style.marginLeft=0;
        }
    }
}
{
    const big=document.querySelectorAll(".hot .left .top ul .big");
    const small=document.querySelectorAll(".hot .left .center .small");
    const masks=document.querySelectorAll(".hot .left .center li .none .mask");
    small.forEach(function (ele,index) {
        ele.onmouseover=function () {
            big.forEach(function (ele,index) {
                ele.style.zIndex=1;
                ele.style.display="none";
                masks[index].style.display="none";
            });
            big[index].style.zIndex=2;
            big[index].style.display="block";
            masks[index].style.display="block";
        }
    })
}
// {
//     const active = document.querySelectorAll(".hot .left .top ul a .img");
//     console.log(active);
//     console.log(active.className)
//     active.onmouseover=function () {
//         active.className = "img active";
//     };
//     active.onmouseout=function () {
//         active.className = "img";
//     };
// }

    {
        var it = document.querySelectorAll(".like .shopping ul li");
        var ma = document.querySelectorAll(".like .shopping ul li .mask");
        console.log(it);
        console.log(ma);
        it.forEach(function (ele, index) {
            ele.onmouseover = function () {
                ma[index].style.display = "block";
            };
            ele.onmouseout = function () {
                ma[index].style.display = "none";
            }
        })
    }
    {
        var banner = document.querySelectorAll(".banner .con .right .tu li");
        var active = document.querySelectorAll(".banner .con .right .dian .active");
        var box = document.querySelector(".banner ");
        var colorarr = ["#E8E8E8", "#2191EF", "#F3F1F2", "#E8E8E8", "#2D5AEC", "#E8E8E8"];
        console.log(banner);
        console.log(active);
        console.log(box);
        console.log(colorarr);
        active.forEach(function (ele, index) {
            ele.onmouseover = function () {
                for (var i = 0; i < active.length; i++) {
                    banner[i].className = ("");
                    active[i].className = ("active");
                }
                banner[index].className = ("act");
                active[index].className = ("active ac");
                box.style.background = colorarr[index];
                num = index;
            }
        });
        let num = 0;
        let move = function () {
            num++;
            if (num == active.length) {
                num = 0;
            }

            for (var i = 0; i < active.length; i++) {
                active[i].className = ("active");
                banner[i].className = ("");
            }
            active[num].className = ("active ac");
            banner[num].className = ("act");
            box.style.background = colorarr[num];

        };
        let st = setInterval(move, 3000);
        box.onmouseover = function () {
            clearInterval(st);
        };
        box.onmouseout = function () {
            st = setInterval(move, 3000);
        };
    }
    {
        const banner = document.querySelectorAll(".dao .con .right .nei li");
        const active = document.querySelectorAll(".dao .con .right .nei li .active");
        console.log(banner);
        console.log(active);
        banner.forEach(function (ele, index) {
            ele.onmouseover = function () {
                active[index].className = "active act";
            };
            ele.onmouseout = function () {
                active[index].className = "active";
            }
        })
    }
    // {
    //     const active = document.querySelectorAll(".fix ul .active")
    //     let colorarr =
    //     console.log(active);
    //     console.log(colorarr);
    //     active.forEach(function (ele, index) {
    //         for (var i = 0; i < active.length; i++) {
    //             active[i].style.background = "#626262";
    //         }
    //         ele.onmouseover = function () {
    //             active[index].style.background = colorarr[index];
    //         };
    //         ele.onmouseout = function () {
    //             active[index].style.background = "#626262";
    //         }
    //     })
    // }
{
    let btn=document.querySelectorAll(".fix ul li");
    let btns=document.querySelector(".fix");
    // console.log(btns);
    let obj;
    let bn=document.querySelectorAll(".num");
    console.log(btns);
    console.log(btn);
    console.log(bn);
    window.onscroll=function () {
        obj=document.body.scrollTop==0?document.documentElement:document.body;
        if(obj.scrollTop>600){
            // alert(obj);
            btns.style.cssText="width:35px;height:300px";
        }else{
            btns.style.cssText="width:0;height:0";
        }
        btn.forEach(function (ele,index) {
            ele.onclick=function () {
                var ot=bn[index].offsetTop;
                animate(obj,{scrollTop:ot},500)
            }
        })
    }
    const colorarr=["red","#EA5F8D", "#0AA6E8", "#64C333", "#F15453", "#19C8A9", "#F7A945", "#FF0036"];
    window.addEventListener("scroll",function () {
        let st=obj.scrollTop;
        for(var i=0;i<bn.length;i++){
            if(st>=bn[i].offsetTop){
                btn.forEach(function (ele) {
                    ele.style.background="";
                });
                btn[i].style.background=colorarr[i];
            }
        }
    })
}
{
    let totop=document.querySelector(".fix .nine");
    console.log(totop);
    totop.onclick=function(){
        var obj=document.body.scrollTop==0?document.docunmentElement:document.body;
        var scrollt=obj.scrollTop;
        var time=500;
        var speed=scrollt/time*50;
        let st=setInterval(function(){
            scrollt-=speed;
            obj.scrollTop=scrollt;
            if(scrollt<=0){
                obj.scrollTop=0;
                clearInterval(st);
            }
        },50)
    }
}


