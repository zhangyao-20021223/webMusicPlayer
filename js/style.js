var FPlayer_bar_js = document.getElementById("musicPlayerBeforeBar"); //FPlayer整体的js
var musicPlayerAllBar_js = document.getElementById("musicPlayerAllBar"); //控制面板的js
var musicPlayerLyricBar_js = document.getElementById("musicPlayerLyricBar"); //歌词按钮的js && 歌词整体的js
var musicPlayerListBar_js = document.getElementById("musicPlayerListBar"); //列表整体的js
var musicPlayerLyricBar_gundong_div = document.getElementById("musicPlayerLyricBar_gundong_div"); //歌词显示面板的js
var button_liebiao_js = document.getElementsByClassName("button_liebiao"); //列表的按钮的js
var huandong = "transition: all 600ms cubic-bezier(.23, 1, .32, 1);animation-duration: 5s;"
    //交互上的逻辑为：
    //       列表面板：
    //              列表按钮触发列表到最顶层，期间涉及到z-index的调整，如果对页面有影响可以自行更改
    //              点击列表中的任意一首歌曲都会触发音乐填充并且直接播放，长按会触发保存歌曲图片/复制文字等操作，并触发已保存/已复制的文字
    //       歌词面板：
    //              直接点击歌词触发歌词条变大直到填充整个播放器，点击任意歌词面板空白处可以收缩歌词面板
    //              直接点击歌词会触发复制，并且弹出“已复制”的图标
    //              上下滑动歌词可以调整进度，目前只有这一种调整进度的方式后续应该会更新（随缘
    //       控制面板：
    //              控制面板初始化在最上层，有四个显式按钮，三个隐式触发事件，四个按钮分别是（从左到右顺序）上一首/暂停/下一首/打开列表
    //              三个隐式按钮是：歌曲名称显式块/作曲家显式块/歌曲图片显式块，三个块长按可以触发复制/复制/保存图片，功能


var musicPlayerLyricBarFlag = false;
musicPlayerLyricBar_gundong_div.addEventListener("click", function() {
    if (musicPlayerLyricBarFlag == false) {
        musicPlayerLyricBar_js.style.cssText = "width: 100%;height:100%";
        this.style.cssText = "width:100%;height:100%;overflow: scroll;" + huandong;
        musicPlayerLyricBarFlag = true;
    } else if (musicPlayerLyricBarFlag == true) {
        musicPlayerLyricBar_js.style.cssText = "width: 100%;height:27%";
        this.style.cssText = "width:90%;height:80%;margin-left:5%;" + huandong;
        musicPlayerLyricBarFlag = false;
    }
})

var musicPlayerListBarFlag = false;
button_liebiao_js[0].addEventListener('click', function() {
    if (musicPlayerListBarFlag == false) {
        musicPlayerListBar_js.style.cssText = "z-index: 1;transform: translateY(0px);" + huandong;
        musicPlayerListBarFlag = true;
    }

})
musicPlayerListBar_js.addEventListener('click', function() {
    if (musicPlayerListBarFlag == true) {
        musicPlayerListBar_js.style.cssText = "z-index:1;transform: translateY(160px);" + huandong
        musicPlayerListBarFlag = false;
    }
})