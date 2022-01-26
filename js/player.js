this.fangkehou = this.fangkehou || {}

function FPlayer() {

}

FPlayer.init = function(container) {

}

FPlayer.Lyric = {
    start_time: undefined,
    end_time: undefined,
    content: undefined,
}

fangkehou.FPlayer = FPlayer

var a = document.getElementsByTagName('img');
// console.log(a.length);
for (let i = 0; i < a.length; i++) {
    a[i].addEventListener('click', function() {
        switch (this.id) {
            case "button_qianjin":
                break;
            case "button_zanting":
                break;
            case "button_houtui":
                break;
            case "button_xihuan":
                break;
        }
    })
}

//监听歌词面板，点击的是歌词面板，所以监听歌词面板
document.getElementById("musicPlayerLyricBar").addEventListener('click', function() {
    let MB = document.getElementById("musicPlayerLyricBar"); //MB为歌词面板的DOM
    let M = document.getElementById('musicPlayerAllBar'); //M为整体面板的DOM
    let L = document.getElementById('liebiao'); //L为列表的DOM
    let MH = M.offsetHeight; //获取整体面板的高度
    let LH = L.offsetHeight; //获取列表的高度
    if (LH == 480) {
        //如果列表的高度是长的，是展开的，那么让列表设置为短的，收缩的
        L.style.height = "160px";
        M.style.height = "480px";
        MB.style.height = "134px";
    } else if (MH == 480) {
        M.style.height = "160px";
        MB.style.height = "24px";
    } else if (LH == 160) {
        M.style.height = "480px";
        MB.style.height = "134px";
    }

})

document.getElementById("button_liebiao").addEventListener('click', function() {
    let MB = document.getElementById("musicPlayerLyricBar");
    let M = document.getElementById('musicPlayerAllBar');
    let L = document.getElementById('liebiao');
    let MH = M.offsetHeight;
    let LH = L.offsetHeight;
    if (MH == 480) {
        M.style.height = "160px";
        MB.style.height = "24px";
        L.style.height = "480px";
    } else if (LH == 480) {
        L.style.height = "160px";
    } else if (MH == 160) {
        L.style.height = "480px";
    }

})

var xhr = new XMLHttpRequest;
// xhr.open("GET", "https://zk-nhbook.osdn.io/getMusic.php");
xhr.open("GET", "json.json");
xhr.responseType = "text";
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)) {
            var result = JSON.parse(xhr.responseText);
            (result);
        } else {
            alert("播放器加载失败");
        }
    }
}
xhr.send();

var button_zanting_js = document.getElementById("button_zanting");
var button_qianjin_js = document.getElementById("button_qianjin");
var button_houtui_js = document.getElementById("button_houtui");
var button_liebiao_js = document.getElementById("button_liebiao");
var liebiao_gundong_div_js = document.getElementById("liebiao_gundong_div");
var musicPlayerLyricBar_js = document.getElementById("musicPlayerLyricBar");
var musicPlayerControlBar_information_name_js = document.getElementById("musicPlayerControlBar_information_name");
var musicPlayerImgBar_img_js = document.getElementById("musicPlayerImgBar_img");
var musicPlayerControlBar_information_author_js = document.getElementById("musicPlayerControlBar_information_author");
var liebiao_div_moban_a = '<div class="liebiao_neirong'
var liebiao_div_moban_b = '"><img class="liebiao_cover" src="" alt=""><div class="liebiao_name"><p></p></div><div class="liebiao_artist"><p></p></div></div>'
var FPlayer_Audio = new Audio("#");
var FPlayer_Audio_flag_ = 0;
//拉回xhr时的逻辑都写在这里
function setUpFplayer(result) {
    let rL = result.result.length;
    for (let i = 0; i < rL; i++) {
        liebiao_gundong_div_js.innerHTML += liebiao_div_moban_a + " liebiao_neirong_" + i + liebiao_div_moban_b;
    }
    for (let i = 0; i < rL; i++) {
        document.getElementsByClassName("liebiao_cover")[i].src = result.result[i].cover;
        document.getElementsByClassName("liebiao_name")[i].innerHTML = result.result[i].name;
        document.getElementsByClassName("liebiao_artist")[i].innerHTML = result.result[i].artist;
    }
    for (let i = 0; i < rL; i++) {
        let liebiao_neirong_$ = "liebiao_neirong_" + i;
        document.getElementsByClassName(liebiao_neirong_$)[0].addEventListener('click', function() {
            FPlayer_Audio_bofang(liebiao_neirong_$);
        })
    }
    button_qianjin_js.addEventListener("click", function() {

    })


    function FPlayer_Audio_bofang(content) {
        musicPlayerControlBar_information_name_js.innerHTML = document.getElementsByClassName(content)[0].getElementsByClassName("liebiao_name")[0].innerText;
        musicPlayerControlBar_information_author_js.innerHTML = document.getElementsByClassName(content)[0].getElementsByClassName("liebiao_artist")[0].innerText;
        musicPlayerImgBar_img_js.src = document.getElementsByClassName(content)[0].getElementsByClassName("liebiao_cover")[0].src;
        FPlayer_Audio_core(content);
    }

    button_zanting_js.addEventListener('click', function() {
        // console.log("暂停");
        if (FPlayer_Audio_flag_ == 0) {
            if (FPlayer_Audio.src == "") {
                console.log("还没有选择歌曲");
            } else if (FPlayer_Audio.src != "") {
                FPlayer_Audio.play();
            }
            FPlayer_Audio_flag_ = 1;
        } else if (FPlayer_Audio_flag_ == 1) {
            FPlayer_Audio.pause();
            FPlayer_Audio_flag_ = 0;
        }
    })

    //0为关闭，1为开启
    function FPlayer_Audio_flag(content) {
        let a = FPlayer_Audio_flag_;
        if (a == 0) {
            a = 1;
        } else {
            a = 0;
        }
        FPlayer_Audio_flag_ = a;
    }

    function FPlayer_Audio_core(content) {
        //播放器逻辑为，开启默认flag为0，所有的有播放音乐的function都会调用核心，核心会检测flag，flag为0接收url，执行FPlayer_Audio.play(),flag为1，执行FPlayer_Audio.
        if (FPlayer_Audio_flag_ == 0) {
            let FPlayer_Audio_num = content.slice(16);
            let FPlayer_Audio_src = JSON.parse(xhr.responseText).result[FPlayer_Audio_num].url;
            FPlayer_Audio.src = FPlayer_Audio_src;
            FPlayer_Audio.play();
            FPlayer_Audio_flag_ = 1;
        } else if (FPlayer_Audio_flag_ == 1) {
            FPlayer_Audio.pause();
            FPlayer_Audio_flag_ = 0;
            FPlayer_Audio_bofang(content);
        }

    }
}