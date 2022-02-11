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
//歌词按钮的js && 歌词整体的js

//FPlayer播放器HTML的插入
document.getElementById("FPlayer").innerHTML = "<div id=\"FPAll\"><div id=\"FPControlBar\"><div id=\"FPImgBar\"><img src=\"./svg/jiaopian.svg\" alt=\"./svg/jiaopian.svg\"></div><div id=\"FPButtonBarAll\"><div id=\"FPArtistBar\"><p id=\"FPMusicName\">未知</p><p id=\"FPArtistName\">未知</p></div><div class=\"FPControlButton\"><img id=\"button_go\" src=\"./svg/previous.svg\" type=\"image/svg+xml\"></div><div class=\"FPControlButton\"><img id=\"button_pause\" src=\"./svg/zanting.svg\" type=\"image/svg+xml\"></div><div class=\"FPControlButton\"><img id=\"button_back\" src=\"./svg/previous.svg\" type=\"image/svg+xml\"></div><div class=\"FPControlButton\"><img id=\"button_list\" src=\"./svg/liebiao.svg\" type=\"image/svg+xml\"></div></div></div><div class=\"FPlayer_Animation\" id=\"FPLyricBar\"><div id=\"FPLyricBar_in_bar\"></div></div><div id=\"FPListBar\"><div id=\"FPListBar_in_bar\"></div></div></div>"
//FPlayer播放器CSS的插入
function addConfigBoxStyle() {
    let style = document.createElement('style')
    style.type = "text/css";
    let styleString = `*{padding:0;margin:0}.FPlayer_Animation{transition:all 600ms cubic-bezier(.23,1,.32,1);animation-duration:5s}#FPAll{width:300px;height:160px;position:relative;border-radius:12px;overflow:hidden;box-shadow:0 0 10px black;top:50px;left:5px}#FPControlBar{width:300px;height:120px;background-color:#462e7c;position:absolute;z-index:1}#FPImgBar{position:absolute;width:100%;height:auto;float:left;overflow:hidden;transform:translateY(-10%)}#FPImgBar img{width:100%;height:auto}#FPMusicName{overflow:hidden}#FPArtistName{overflow:hidden}#FPButtonBarAll{width:100%;height:100%;float:right;position:relative;background-color:rgba(0,0,0,0.4)}#FPArtistBar{width:100%;height:60%;float:left}#FPArtistBar p:nth-child(1){height:65%;display:block;color:white;width:100%;font-size:30px;margin-left:6%}#FPArtistBar p:nth-child(2){width:100%;height:35%;display:block;color:#c2c2c2;font-size:15px;margin-left:6%}.FPControlButton{width:25%;height:30%;float:left}.FPControlButton img{width:100%;height:100%}#button_back{transform:rotateY(180deg)}#button_list{transform:scale(.9)}#FPLyricBar{width:300px;height:40px;background-color:#58438b;position:absolute;bottom:0;z-index:1;overflow:hidden}#FPLyricBar_in_bar{color:white;text-align:center;width:90%;height:100%;margin-left:5%;position:absolute}.FPlayerLyricContent p{width:100%;height:100%;font-size:25px}#FPLyricBar_in_bar::-webkit-scrollbar{display:none}.FPlayer_lyric{display:block;font-size:20px;white-space:nowrap;margin-top:4px}.FPlayerLyricContent{width:100%;height:40px}#FPListBar{width:100%;height:100%;background-color:#462e7c;position:relative;z-index:0;transform:translateY(160px);overflow:scroll}#FPListBar_in_bar{width:100%;height:auto;overflow:hidden;padding-top:2px;padding-bottom:2px;position:absolute}#FPListBar::-webkit-scrollbar{display:none}.FPlayerListContents{width:48%;height:72px;margin:1%;border-radius:12px;display:block;float:left;overflow:hidden;box-shadow:0 0 5px #190634;position:relative}.FPlayerListContents div:nth-child(1){position:absolute;width:100%;height:auto;float:left;overflow:hidden}.FPlayerListContent_img{width:100%;height:auto;float:left;border-radius:10%;background-color:#fff;transform:translateY(0%)}.FPlayerListContents div:nth-child(2),.FPlayerListContents div:nth-child(3){position:absolute;display:block;width:100%;height:36px;float:left;color:white;background-color:rgba(0,0,0,0.41);line-height:36px;text-align:center}.FPlayerListContents div:nth-child(2){top:0}.FPlayerListContents div:nth-child(3){bottom:0}.FPlayerListContent_p1,.FPlayerListContent_p2{width:100%;height:50%;white-space:nowrap;overflow:hidden;color:white;position:absolute;font-size:20px;text-align:center;background-color:rgba(0,0,0,0.30)}.FPlayerListContent_p2{margin-top:36px}`
    let text = document.createTextNode(styleString)
    style.appendChild(text);
    document.getElementsByTagName('head')[0].appendChild(style);
}
addConfigBoxStyle()

var FPLyricBar_js = document.getElementById("FPLyricBar");
//列表整体的DOM
var FPListBar_js = document.getElementById("FPListBar");
//歌词显示面板的DOM
var FPLyricBar_in_bar_js = document.getElementById("FPLyricBar_in_bar");
//列表的按钮的DOM
var button_list_js = document.getElementById("button_list");
//缓动函数附加
var Animation = "transition: all 600ms cubic-bezier(.23, 1, .32, 1);animation-duration: 5s;"
// 歌词面板开关flag
var FPlayerLyricBarFlag = false;

//监听歌词面板点击，对歌词面板进行大小操作
FPLyricBar_in_bar_js.addEventListener("click", function () {
    if (FPlayerLyricBarFlag == false) {
        FPLyricBar_js.style.cssText = "width: 100%;height:100%";
        this.style.cssText = "width:100%;height:100%;overflow: scroll;margin-left:0%;" + Animation;
        for (let i = 0; i < this.getElementsByClassName("FPlayerLyricContent").length; i++) {
            this.getElementsByClassName("FPlayerLyricContent")[i].style.cssText = "height: 20%";
        }
        FPlayerLyricBarFlag = true;
    } else if (FPlayerLyricBarFlag == true) {
        FPLyricBar_js.style.cssText = "width: 100%;height:40px";
        this.style.cssText = "width:90%;height:100%;overflow: hidden;" + Animation;
        for (let i = 0; i < this.getElementsByClassName("FPlayerLyricContent").length; i++) {
            this.getElementsByClassName("FPlayerLyricContent")[i].style.cssText = "height: 100%"
        }
        FPlayerLyricBarFlag = false;
    }
})
//播放器列表开关flag
var FPlayerListBarFlag = false;

button_list_js.addEventListener('click', function () {
    if (FPlayerListBarFlag == false) {
        FPListBar_js.style.cssText = "z-index: 1;transform: translateY(0px);" + Animation;
        FPlayerListBarFlag = true;
    }
})
FPListBar_js.addEventListener('click', function () {
    if (FPlayerListBarFlag == true) {
        FPListBar_js.style.cssText = "z-index:1;transform: translateY(160px);" + Animation
        FPlayerListBarFlag = false;
    }
})

let FPlayer = {}

FPlayer.FPlayer_url = document.getElementById("FPlayer").attributes.fplayer_url.value;

FPlayer.xhr = function () {
    const FPlayer_xhr = new XMLHttpRequest;
    FPlayer_xhr.open("GET", FPlayer.FPlayer_url, false);
    FPlayer_xhr.onreadystatechange = function () {
        let result;
        if (FPlayer_xhr.readyState == 4) {
            if ((FPlayer_xhr.status >= 200 && FPlayer_xhr.status < 300) || (FPlayer_xhr.status == 304)) {
                result = JSON.parse(FPlayer_xhr.responseText);
                FPlayer.resTxt = result;
            } else {
                alert("链接请求失败");
            }
        }
    }
    FPlayer_xhr.send();
}

//播放列表模板
FPlayer.templatelist = '<div class="FPlayerListContents"><img class="FPlayerListContent_img" src="svg/jiaopian.svg" alt="#"><p class="FPlayerListContent_p1"></p><p class="FPlayerListContent_p2"></p></div>'
//存放返回json变量
FPlayer.resTxt = {};
//播放器列表变量
FPlayer.list = [];
//生命播放器的Audio()
FPlayer_Audio = new Audio();
//播放器目前播放到的歌曲为止
FPlayer.num = 0;
//播放器Audio()播放状态flag
var FPlayer_Audio_flag = false;

FPlayer.star = function () {
    //初始化
    const xhrLength = FPlayer.resTxt.result.length;
    //向列表中填充
    let FPListBar_in_bar_js = document.getElementById("FPListBar_in_bar");
    for (let i = 0; i < xhrLength; i++) {
        FPListBar_in_bar_js.innerHTML += FPlayer.templatelist;
        FPListBar_in_bar_js.children[i].id = "FPlayerListContents_" + i;
    }
    for (let i = 0; i < xhrLength; i++) {
        FPListBar_in_bar_js.children[i].children[0].src = FPlayer.resTxt.result[i].cover;
        FPListBar_in_bar_js.children[i].children[1].innerHTML = FPlayer.resTxt.result[i].name;
        FPListBar_in_bar_js.children[i].children[2].innerHTML = FPlayer.resTxt.result[i].artist;
    }
    //默认控制面板封面是第一首
    //为列表中的所有块打上监听
    for (let i = 0; i < xhrLength; i++) {
        FPListBar_in_bar_js.children[i].addEventListener("click", function () {
            FPlayer.num = parseInt(this.id.slice(20));
            FPlayer.Audio(1);
        })
    }
    FPlayer.FPlayer_AllBar_in(0);
}
//music_num为歌曲位置，mode为模式，（ 0：停止播放（ 1：开始播放（ 2：上一首 （ 3：下一首 （ 4：
FPlayer.Audio = function (mode) {
    //生成播放列表
    if (FPlayer.list.length == 0) {
        for (let i = 0; i < FPlayer.resTxt.result.length; i++) {
            FPlayer.list[i] = FPlayer.resTxt.result[i].url;
        }
    }
    if (FPlayer_Audio.src != FPlayer.list[FPlayer.num]) {
        FPlayer_Audio.src = FPlayer.list[FPlayer.num];
    }
    switch (mode) {
        case 0:
            FPlayer_Audio.pause();
            FPlayer_Audio_flag = false;
            break;
        case 1:
            FPlayer.FPlayer_AllBar_in(FPlayer.num)
            FPlayer_Audio.play();
            FPlayer.Lyric();
            // FPlayer_Audio.currentTime = "200";
            FPlayer_Audio_flag = true;
            break;
        case 2:
            FPlayer.num = FPlayer.num + 1;
            if (FPlayer.num >= FPlayer.list.length) {
                alert("最后一首了")
                FPlayer.Audio(0);
            }
            FPlayer.Audio(1);
            FPlayer_Audio_flag = true;
            break;
        case 3:
            FPlayer.num = FPlayer.num - 1;
            if (FPlayer.num < 0) {
                FPlayer.num = 0;
                alert("前面没有了")
                FPlayer.Audio(0);
            }
            FPlayer.Audio(1);
            FPlayer_Audio_flag = true;
            break;
    }
}

FPlayer_Audio.addEventListener("ended", function () {
    if (FPlayer.num > FPlayer.list.length) {
        FPlayer.Audio(0);
    }
    FPlayer.num++;
    FPlayer.Audio(1);
})
FPlayer_Audio.addEventListener("error", function () {
    if (FPlayer.num > FPlayer.list.length) {
        FPlayer.Audio(0);
    }
    FPlayer.num++;
    FPlayer.Audio(1);
})

FPlayer.pause = function () {
    document.getElementById("button_pause").addEventListener("click", function () {
        if (FPlayer_Audio_flag == false) {
            FPlayer.Audio(1);
            FPlayer_Audio_flag = true;
        } else if (FPlayer_Audio_flag == true) {
            FPlayer.Audio(0);
            FPlayer_Audio_flag = false;
        }
    })
}

FPlayer.go = function () {
    document.getElementById("button_go").addEventListener('click', function () {
        FPlayer.Audio(3);
    })
}
FPlayer.back = function () {
    document.getElementById("button_back").addEventListener('click', function () {
        FPlayer.Audio(2);
    })
}


//控制封面的变换，传递歌曲在json中的顺序参数：0,1,2,3,4、、、
FPlayer.FPlayer_AllBar_in = function () {
    let name, artist, img;
    name = FPlayer.resTxt.result[FPlayer.num].name;
    artist = FPlayer.resTxt.result[FPlayer.num].artist;
    img = FPlayer.resTxt.result[FPlayer.num].cover;
    document.getElementById("FPMusicName").innerHTML = name;
    document.getElementById("FPArtistName").innerHTML = artist;
    document.getElementById("FPImgBar").children[0].src = img;
}

//歌词控制，获取audio的时间，并对歌词进行匹配,进行歌词填充
FPlayer.LyricBartemplate = '<div class="FPlayerLyricContent"><p></p></div>'
FPlayer.Lyric = function () {
    FPlayer.LyricTxt = []
    let Lyrics = FPlayer.resTxt.result[FPlayer.num].lrc.split('\n');
    for (let i = 0; i < Lyrics.length; i++) {
        FPlayer.LyricTxt[i] = Lyrics[i];
    }
    FPlayer.LyricTxt.pop();
    for (let i = 0; i < FPlayer.LyricTxt.length; i++) {
        let time = FPlayer.LyricTxt[i].split("]")[0];
        time = time.slice(1);
        time = Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]) * 1
        let content = FPlayer.LyricTxt[i].split("]")[1];
        FPlayer.LyricTxt[i] = {time: time, content: content}
    }
    for (let i = 0; i < FPlayer.LyricTxt.length; i++) {
        FPLyricBar_in_bar_js.innerHTML += FPlayer.LyricBartemplate;
        FPLyricBar_in_bar_js.children[i].id = "FPlayerLyricContent_" + i;
        document.getElementsByClassName("FPlayerLyricContent")[i].children[0].innerHTML = FPlayer.LyricTxt[i].content;
    }
}


LyrcFlag = "FPlayer";

let removeTrainslate = 1;

FPlayer.LyricTrains = function () {
    FPLyricBar_in_bar_js.style.cssText = "top: -" + removeTrainslate * 40 + "px;"
    console.log(removeTrainslate, removeTrainslate * 40)
    removeTrainslate++;
}
FPlayer_Audio.addEventListener('timeupdate', function () {
    for (let i = 0; i < FPlayer.LyricTxt.length; i++) {
        let AudioTime = this.currentTime + 0;
        if (AudioTime >= FPlayer.LyricTxt[i].time && AudioTime <= FPlayer.LyricTxt[i + 1].time) {
            if (LyrcFlag == "FPlayer") {
                LyrcFlag = FPlayer.LyricTxt[i].content;
                FPlayer.LyricTrains()
            } else if (LyrcFlag == FPlayer.LyricTxt[i].content) {
                LyrcFlag = FPlayer.LyricTxt[i].content;
            } else if (LyrcFlag != FPlayer.LyricTxt[i].content) {
                LyrcFlag = FPlayer.LyricTxt[i].content;
                FPlayer.LyricTrains()
            }
        }
    }
})
FPlayer_core = function () {
    FPlayer.xhr();
    FPlayer.star();
    FPlayer.Audio();
    FPlayer.pause();
    FPlayer.go();
    FPlayer.back();
    FPlayer.Lyric();
}
FPlayer_core();

