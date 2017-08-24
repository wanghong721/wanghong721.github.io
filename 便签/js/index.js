$("#submit").click(function () {
    var val=$("#text").val();
    if(val==""){
        alert("请输入添加的内容");
        return
    };
    var data=getData();
    date=new Date();
    var time=date.getTime();
    data.push({text:val,time,isDone:false,isStar:false});
    saveData(data);
    reWrite();
    $("#text").val("");
    alert("添加成功");
})

//关闭添加页面
$(".guang").click(function () {
    $(".tian").slideUp(500);
    $(".wei").delay(500).slideDown(1000);
});
//获取信息的函数
function getData() {
    if(localStorage.todo){
        return JSON.parse(localStorage.todo);
    }else{
        return [];
    };
}
//保存信息的函数
function saveData(data) {
    localStorage.todo=JSON.stringify(data);
}
//重绘页面
function reWrite() {
    $(".xiao").empty();
    var data=getData();
    var str1="",str2="";
    $.each(data,function (index,value) {
        if(value.isDone==false){
            str1+=`<div class="num" id="${index}">
                           <input type="checkbox" class="check">
                           <div class="yuan"></div>
                           <p>${value.text}</p>
                           <time>
                               ${time(value.time)}
                           </time>
                       </div>`
        }else{
            str2+=`<div class="num" id="${index}">
                           <input type="checkbox" class="check">
                           <div class="yuan"></div>
                           <p>${value.text}</p>
                           <time>
                               ${time(value.time)}
                           </time>
                       </div>`
        }
    })
    $(".wei .xiao").html(str1);
    $(".yi .xiao").html(str2);
}
reWrite();
$("#rem").click(function () {
    $(".wei").slideUp(500);
    $(".tian").slideDown(500);
})
$("#move1").click(function () {
    $(".yi").slideUp(500);
    $(".tian").slideDown(500);
})
//处理时间格式的函数
function time(ms) {
    var date=new Date();
    date.setTime(ms);
    var year=date.getFullYear();
    var month=addZero(date.getMonth()+1);
    var getdate=addZero(date.getDate());
    var hour=addZero(date.getHours());
    var minute=addZero(date.getMinutes());
    var second=addZero(date.getSeconds());
    return year+"/"+month+"/"+getdate+"&nbsp;"+hour+":"+minute+":"+second;
}
function addZero(num) {
    return num<10?"0"+num:num;
}
//移动到已完成
$("#move").click(function () {
    $(".wei .xiao .num").each(function () {
        var data=getData();
        if($(this).find("input").prop("checked")){
            var index=$(this).attr("id");
            data[index].isDone=true;
        }
        saveData(data);
        reWrite();
    })
});
//跳转到添加页面
//删除已完成
$("#rem1").click(function () {
    var data=getData();
    $(".yi .xiao .num").each(function () {
        if($(this).find("input").prop("checked")){
            var index=$(this).attr("id");
            data[index].isDelete=true;
        }
    })
    data=data.filter(function (ele) {
        return !ele.isDelete;
    })
    saveData(data);
    reWrite();
});
// $(".wei .num").on("click",".wei .num .li",function () {
//     var data=getData();
//     var index=$(this).parent().attr("id");
//     data[index].isStar=!data[index].isStar;
//     saveData(data);
//     reWrite();
// });
// $(".num").on("click","p",function () {
//     alert($(this).html());
// })
$(".left .kuai").css("background","#E7C07B").click(function () {
    $(".left .kuai").css("background","#E7C07B");
    $(this).css("background","#AF7E46");
    $(".tian").slideUp(500);
    var index=$(this).index();
    $(".right .item").slideUp(500).eq(index).slideDown(500);
})