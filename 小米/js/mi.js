'use strict';
window.onload=function(){
	let  tu=document.querySelectorAll(".banner-right .tu-right1");
	let  dian=document.querySelectorAll(".tu-dian .tu-yuan")
	let  ting=document.querySelector(".banner-right")
	let  now =0;
	let  flag=true;
	let  t=setInterval(move,3000);
	function move (mav='r'){
		if(flag){
			flag=false;
			if(mav=='r'){
				now++;
				if(now>=tu.length){
					now=0;
				}	
			}else if(mav=='j'){
				now--;
				if(now<0){
					now=tu.length-1
				}
			}
			
			for(let a=0;a<tu.length;a++){
				tu[a].classList.remove("active");
				dian[a].classList.remove('tuyuan2');
			}
			tu[now].classList.add('active');
			dian[now].classList.add('tuyuan2')	
		}
		tu.forEach(function (value){
			value.addEventListener('transitionend', function(){
				flag=true;
			})
		})
	}

	dian.forEach(function(value,index){
		value.onclick=function(){
			for(let i=0;i<dian.length;i++){
				dian[i].classList.remove('tuyuan2');
				tu[i].classList.remove('active');
			}
			this.classList.add("tuyuan2");
			tu[index].classList.add('active');
			now=index; 
		}
	})
	ting.onmousemove=function(){
		clearInterval(t);
	}
	ting.onmouseout=function(){
		t=setInterval(move,3000);
	}
	document.querySelector('.tu-left').onclick=function(){
		move('j');
	}
	document.querySelector('.tu-right').onclick=function(){
		move();
	}




	let xuan=document.querySelectorAll(".banner-left>ul>li");
	let ka=document.querySelectorAll('.banner-left .xuanxian');
	xuan.forEach(function(value,index){
		value.onmousemove=function(){
			for(let a=0;a<xuan.length;a++){
				ka[a].classList.remove('xianshi');
			}
			ka[index].classList.add("xianshi");
		}
		value.onmouseout=function(){
			for(let b=0;b<xuan.length;b++){
				ka[b].classList.remove('xianshi');
			}
		}
	})




	let shop=document.querySelector(".header-gou");
	let shops=document.querySelector(".header-gou .active01");

	shop.onmousemove=function(){
		animate(shops,{height:95},300);
		shops.style.boxShadow="0 0 10px #ccc";
	}
	shop.onmouseout=function(){
		animate(shops,{height:0},300);
	}



	// 导航选项卡
	// 获取通屏的大盒子
	let nav=document.querySelector('.daoh');
	//获取每个选项卡
	let mian=document.querySelectorAll('.daoh .mian');
	//获取每个选项的字
	let hanz=document.querySelectorAll('.daohan-center .llaa');
	// 移入大盒子
	hanz.forEach(function(value,index){
		value.onmouseover=function(){
			
			for(let a=0; a<mian.length;a++){
				mian[a].classList.remove('actives');
				hanz[a].classList.remove('ziy');
			}
			mian[index].classList.add('actives');
			hanz[index].classList.add('ziy');
			animate(nav,{height:243},300)
			nav.classList.add('daoh-1');
			nav.style.borderTop='1px solid #ccc';
		}
		value.onmouseout=function(){
			animate(nav,{height:0},300);
			// nav.style.borderTop=0;
			// nav.classList.remove('daoh-1');
			for(let a=0; a<mian.length;a++){
				hanz[a].classList.remove('ziy');
			}
		}
	})
	// 移入每个选项卡让大盒子显示
		mian.forEach(function(value,index){
			value.onmouseover=function(){
				animate(nav,{height:243},300);
				nav.style.borderTop='1px solid #ccc';
		}
			value.onmouseout=function(){
				animate(nav,{height:0},300);
				nav.style.borderTop=0;
			}

		})
		// 移入大盒子让大盒子显示
		nav.onmouseover=function(){
			animate(nav,{height:243},300);
			nav.style.borderTop='1px soild #ccc';
		}
		nav.onmouseout=function(){
			animate(nav,{height:0},300);
			nav.style.borderTop=0;
		}




	// 小米单品
	let big=document.querySelector('.bigbox');

	function zhun (parent){
		let bigs=parent;
		let width=parseInt(getComputedStyle(bigs,null).width);
		let bigbox=parent.querySelector('.bigboxs');
		let time=setInterval(mova, 5000);
		let kai=true;
		function mova(){
			if(kai==true){
				animate(bigbox,{left:-width},600,function(){
				let first=bigbox.firstElementChild;
				first.style.left='-100%';	
				return  kai=false;
				});
			}else if(kai==false){
				animate(bigbox,{left:0},600,function(){
				return kai=true;
				});
			}	
		}
		let  zuo=document.querySelector('.jiantou-2-l');
		let  you=document.querySelector('.jiantou-2-r');
		zuo.onclick=function(){
			animate(bigbox,{left:-width},600,)
		}
		you.onclick=function(){
			animate(bigbox,{left:0},600,)
		}
	}
	zhun (big);
	//为你推荐
	
	let tubig=document.querySelector('.tubig');
	let tuboxs=tubig.firstElementChild;
	let width1=parseInt(getComputedStyle(tubig,null).width);
	let leftone=document.querySelector('.jiantou-zuo');
	let rightone=document.querySelector('.jiantou-you');
	let tiall=document.querySelectorAll('.tuboxs .tuijian-tu');
	let noww=0;
	function movb(){
			noww++
		if(noww>=tiall.length-1){
			noww=tiall.length-1;
		}
		animate(tuboxs,{left:-width1*noww},500,)	
	}
	rightone.onclick=movb;
	leftone.onclick=function(){
		if(noww==0){
			return;
		}
		noww--;
		if(noww<0){
			noww=0
		}
		animate(tuboxs,{left:-width1*noww},500,)
	}

	// 内容开始
	function lun (parents){
		let tushu=parents.querySelector('.tushu');
		let width2=parseInt(getComputedStyle(tushu,null).width);
		let tusu=tushu.firstElementChild;
		let lefttwo=parents.querySelector('.neiron-jiantou');
		let righttwo=parents.querySelector('.neiron-jiantou1');
		let suall=parents.querySelectorAll('.tusu .shum');
		let diand=parents.querySelectorAll('.neiron-dian .neiron-dian2')
		let no=0;
		function movd(){
				no++
			if(no>=suall.length-1){
				no=suall.length-1;
			}
			animate(tusu,{left:-width2*no},500,)
			for(let n=0;n<diand.length;n++){
					diand[n].classList.remove('neiron-dian1');
				}
				diand[no].classList.add('neiron-dian1');	
		}
		righttwo.onclick=movd;
		lefttwo.onclick=function(){
			if(no==0){
				return;
			}
			no--;
			if(no<0){
				no=0
			}
			animate(tusu,{left:-width2*no},500,)
			for(let n=0;n<diand.length;n++){
					diand[n].classList.remove('neiron-dian1');
				}
				diand[no].classList.add('neiron-dian1');
		}
		diand.forEach(function(value,index){
			value.onclick=function(){
				for(let n=0;n<diand.length;n++){
					diand[n].classList.remove('neiron-dian1');
				}
				diand[index].classList.add('neiron-dian1');
				animate(tusu,{left:-width2*index},500,);
			}
			
		})
	}
	let neiron=document.querySelectorAll('.neiron-tu .neiron-left')
	neiron.forEach(function(value,index){
		lun(value);
	})
	
		

	























}