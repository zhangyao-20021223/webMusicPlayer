let FPlayer = {}

FPlayer.xhr = function () {
    const FPlayer_xhr = new XMLHttpRequest;
    // xhr.open("GET", "https://zk-nhbook.osdn.io/getMusic.php");
    FPlayer_xhr.open("GET", "json.json", false);
    // FPlayer_xhr.responseType = "json";
    FPlayer_xhr.onreadystatechange = function () {
        let result;
        if (FPlayer_xhr.readyState == 4) {
            if ((FPlayer_xhr.status >= 200 && FPlayer_xhr.status < 300) || (FPlayer_xhr.status == 304)) {
                result = JSON.parse(FPlayer_xhr.responseText);
                // FPlayer.resTxt = new Object();
                FPlayer.resTxt = result;
            } else {
                alert("播放器加载失败");
            }
        }
    }
    FPlayer_xhr.send();
}

FPlayer.templatelist = '<div class="FPlayerListContents"><div><img class="FPlayerListContent_img" src="svg/jiaopian.svg" alt="#"></div><div><p class="FPlayerListContent_p1"></p></div><div><p class="FPlayerListContent_p2"></p></div></div>'
FPlayer.resTxt = {};
FPlayer.list = [];
FPlayer_Audio = new Audio();
FPlayer.num = 0;
var FPlayer_Audio_flag = false;
FPlayer.star = function () {
    //初始化
    const xhrLength = FPlayer.resTxt.result.length;
    //向列表中填充
    let FPListBar_in_bar_js = document.getElementById("FPListBar_in_bar");
    for (let i = 0; i < xhrLength; i++) {
        FPListBar_in_bar_js.innerHTML += FPlayer.templatelist;
        FPListBar_in_bar_js.children[i].setAttribute("id", "FPlayerListContents_" + i);
    }
    for (let i = 0; i < xhrLength; i++) {
        FPListBar_in_bar_js.children[i].children[0].children[0].src = FPlayer.resTxt.result[i].cover + "";
        FPListBar_in_bar_js.children[i].children[1].children[0].innerHTML = FPlayer.resTxt.result[i].name;
        FPListBar_in_bar_js.children[i].children[2].children[0].innerHTML = FPlayer.resTxt.result[i].artist;
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
        // debugger;
        for (let i = 0; i < FPlayer.resTxt.result.length; i++) {
            FPlayer.list[i] = FPlayer.resTxt.result[i].url;
        }
    }
    // debugger
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
    document.getElementsByClassName("button_pause")[0].addEventListener("click", function () {
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
    document.getElementsByClassName("button_go")[0].addEventListener('click', function () {
        FPlayer.Audio(3);
    })
}
FPlayer.back = function () {
    document.getElementsByClassName("button_back")[0].addEventListener('click', function () {
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
//歌词控制，获取audio的时间，并对歌词进行匹配,参数传递歌曲位置，进行歌词填充
let Lyric_js = document.getElementById("FPLyricBar_in_bar");
FPlayer.LyricTemplate = ""
FPlayer.Lyric = function () {
FPlayer.LyricTxt = []
    let Lyrics = FPlayer.resTxt.result[FPlayer.num].lrc.split('\n');
    for (let i = 0; i < Lyrics.length; i++) {
        FPlayer.LyricTxt[i] = Lyrics[i];
    }
    // debugger
    FPlayer.LyricTxt.pop();
    for (let i = 0; i < FPlayer.LyricTxt.length; i++){

    }
    for (let i = 0; i < FPlayer.LyricTxt.length; i++) {
        let time = FPlayer.LyricTxt[i].split("]")[0];
        time = time.slice(1);
        time = Number(time.split(":")[0]) * 60 + Number(time.split(":")[1]) * 1
        let content = FPlayer.LyricTxt[i].split("]")[1];
        FPlayer.LyricTxt[i] = {time: time, content: content}
    }

    LyrcFlag = "FPlayer";
    FPlayer_Audio.addEventListener('timeupdate', function () {
        // debugger
        for (let i = 0; i < FPlayer.LyricTxt.length; i++) {
            let AudioTime = this.currentTime + 0.5;
            if (AudioTime >= FPlayer.LyricTxt[i].time && AudioTime <= FPlayer.LyricTxt[i + 1].time) {
                if(LyrcFlag == "FPlayer"){
                console.log(FPlayer.LyricTxt[i].content);
                LyrcFlag = FPlayer.LyricTxt[i].content;
                }else if (LyrcFlag == FPlayer.LyricTxt[i].content){
                    LyrcFlag = FPlayer.LyricTxt[i].content;
                }else if (LyrcFlag != FPlayer.LyricTxt[i].content){
                    console.log(FPlayer.LyricTxt[i].content);
                    LyrcFlag = FPlayer.LyricTxt[i].content;
                }
            }
        }
    })
}
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

