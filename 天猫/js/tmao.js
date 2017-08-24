'use strict';
window.onload=function(){
	let  tu=document.querySelectorAll(".tu-right li");
	let  dian=document.querySelectorAll(".tu-yuan .tu-yuan1")
	let  ting=document.querySelector(".tu-right");
	let  bei=document.querySelectorAll('.banner-bottom .bannerS')
	let  now =0;
	let  t=setInterval(move,3000);
	function move (mav='r'){
				now++;
				if(now>=tu.length){
					now=0;
				}
			for(let a=0;a<tu.length;a++){
				tu[a].classList.remove("active");
				dian[a].classList.remove('tu-yuan2');
				bei[a].classList.remove('shis');
				bei[a].style.width=window.innerWidth+"px";
			}
			tu[now].classList.add('active');
			dian[now].classList.add('tu-yuan2');
			bei[now].classList.add('shis');
	}
	dian.forEach(function(value,index){
		value.onclick=function(){
			for(let i=0;i<dian.length;i++){
				dian[i].classList.remove('tu-yuan2');
				tu[i].classList.remove('active');
				bei[i].classList.remove('shis');
				bei[i].style.width=window.innerWidth+"px";
			}
			this.classList.add("tu-yuan2");
			tu[index].classList.add('active');
			bei[index].classList.add('shis');
			now=index; 
		}
	})
	ting.onmouseover=function(){
		clearInterval(t);
	}
	ting.onmouseout=function(){
		t=setInterval(move,3000);
	}




	let xian=document.querySelectorAll('.tuleft-zi');
	let shi=document.querySelectorAll('.tuleft-zi .xuanxian');
	xian.forEach(function(value,index){
		value.onmouseover=function(){
			for(let a=0;a<xian.length;a++){
				shi[a].classList.remove('xianshi');
			}
			shi[index].classList.add("xianshi");
		}
		value.onmouseout=function(){
			for(let b=0;b<xian.length;b++){
				shi[b].classList.remove('xianshi');
			}
		}
	})


	let bot=document.querySelector('.head-right');
	let bown=bot.lastElementChild;
	let down=bown.lastElementChild;
	bown.onmouseover=function(){
		// animate(down,{height:243},200);
		down.classList.add('downs');
	}
	bown.onmouseout=function(){
		// animate(down,{height:0},200);
		down.classList.remove('downs');
	}
	let bowns=bown.previousElementSibling;
	// console.log(bowns)
	let bowna=bowns.lastElementChild;
	bowns.onmouseover=function(){
		// animate(bowna,{height:180},200);
		bowna.classList.add('downs');
	}
	bowns.onmouseout=function(){
		// animate(bowna,{height:0},200);
		bowna.classList.remove('downs');
	}
	let first=bot.firstElementChild;
	let zui=first.lastElementChild;
	first.onmouseover=function(){
		// animate(zui,{height:64},200);
		zui.classList.add('downs');
	}
	first.onmouseout=function(){
		// animate(zui,{height:0},200);
		zui.classList.remove('downs');
	}
	let shou=document.querySelector(".mytb-1");
	let hou=shou.lastElementChild;
	shou.onmouseover=function(){
		// animate(hou,{height:64},200);
		hou.classList.add('downs');
	}
	shou.onmouseout=function(){
		// animate(hou,{height:0},200);
		hou.classList.remove('downs');
	}
	let guan=document.querySelector('.guanzhu-1');
	let guanz=guan.lastElementChild;
	guan.onmouseover=function(){
		guanz.classList.add('downs');
	}
	guan.onmouseout=function(){
		guanz.classList.remove("downs")
	}






	let gu=document.querySelector(".gudin");
	let piao=document.querySelectorAll('.gudin .piao');

	let liall=document.querySelectorAll('.gudin .ullio');
	liall.forEach(function(value,index){
		value.onmouseover=function(){
			animate(piao[index],{left:-80,opacity:1},300,);
			piao[index].classList.add('dis');
		}
		value.onmouseout=function(){
			piao[index].classList.remove('dis');
			piao[index].style.left='-120'+'px';
		}
		
	})

	// let bom=document.querySelectorAll('.gu-bottom .bomm');
	// let piaos=document.querySelectorAll('.gu-bottom .piao');
	// bom.forEach(function(value,index){
	// 	value.onmouseover=function(){
	// 		piaos[index].classList.add('dis');
	// 		animate(piaos[index],{left:-80,opacity:1},500,);
			
	// 	}
	// 	value.onmouseout=function(){
	// 		piaos[index].classList.remove('dis');
	// 		piaos[index].style.left='-120'+'px';
	// 	}
		
	// })

	let bomm=document.querySelector('.bomms');
	let bigbox=document.querySelector('.bigbox')
	bomm.onmouseover=function(){
		bigbox.classList.add('bigboxs')
	}
	bomm.onmouseout=function(){
		bigbox.classList.remove('bigboxs')
	}


	let topa=bomm.nextElementSibling;
	let tops=document.body.scrollTop==0? document.documentElement:document.body;
	let Obj=tops.scrollTop;
	topa.onclick=function(){
		animate(document.body,{scrollTop:0},500)
	}
	let loua=document.querySelector('.loua');
	loua.onclick=function(){
		animate(document.body,{scrollTop:0},500)
	}

	let floors=document.querySelector('.floor');
	let mei=document.querySelectorAll('.mei');
	let navpar=document.querySelectorAll('.lou');
	let hef=document.querySelector('.hefu');
	let nn;
	let flag=true;
	let flags=false;
	// 储存颜色
	let color=['red','pink','blue','green','orange','yellow','black','purple','#25d364']
	window.onscroll=function(){
		let topss=document.body.scrollTop==0? document.documentElement:document.body;
		let Objs=topss.scrollTop;
		mei.forEach(function(value,index){
			if(Objs>=value.offsetTop-300){
				for(let i=0;i<navpar.length;i++){
					navpar[i].style.backgroundColor='rgba(0,0,0,0.6)';
				}
				navpar[index].style.backgroundColor=color[index];
				nn=index;
			}
			if(Objs>=mei[0].offsetTop-300){

				if(flag){
					flag=false;
					animate(floors,{width:35,height:350},300);
					animate(hef,{height:50},500,function(){
						flags=true;
					})
				}

			}else{
				if(flags){
					flags=false;
					animate(floors,{width:0,height:0},300);
					animate(hef,{height:0},500,function(){
						flag=true;
					})
				}

			};
			[...navpar].forEach(function(value,index){
				value.onclick=function (){
					animate(document.documentElement,{scrollTop:mei[index].offsetTop-80},600);
					animate(document.body,{scrollTop:mei[index].offsetTop-80},600);
					navpar[index].style.backgroundColor=color[index]
					nn=index;
				}
				value.onmouseover=function(){
					this.style.backgroundColor=color[index];
				}
				value.onmouseout=function(){
					if(index!=nn){
						this.style.backgroundColor='rgba(0,0,0,0.6)';
					}

				}
			})

		})

	}
    {
        const banner=document.querySelector(".nei-left .center ul");
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
        const big=document.querySelectorAll(".nei-left .top ul .big");
        const small=document.querySelectorAll(".nei-left .center .small");
        const masks=document.querySelectorAll(".nei-left .center li .none .mask");
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






}