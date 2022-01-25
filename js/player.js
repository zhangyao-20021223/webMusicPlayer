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


// var lrc = "string";
var xhr = new XMLHttpRequest;
// xhr.open("GET", "https://zk-nhbook.osdn.io/getMusic.php");
xhr.open("GET", "json.json");
xhr.responseType = "text";
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)) {
            var result = JSON.parse(xhr.responseText);
            setUpFplayer(result);
        } else {
            //失败
        }
    }
}
xhr.send();

var button_qianjin_js = document.getElementById("button_qianjin");
var button_zanting_js = document.getElementById("button_zanting");
var button_houtui_js = document.getElementById("button_houtui");
var button_liebiao_js = document.getElementById("button_liebiao");
var liebiao_gundong_div_js = document.getElementById("liebiao_gundong_div");
var musicPlayerLyricBar_js = document.getElementById("musicPlayerLyricBar");
var lrcText = String("string");
var liebiao_div_moban_a = '<div class="liebiao_neirong'
var liebiao_div_moban_b = '"><img class="liebiao_cover" src="" alt=""><div class="liebiao_name"><p></p></div><div class="liebiao_artist"><p></p></div></div>'
var liebiao_div_moban_in = ""

//拉回xhr时的逻辑都写在这里
function setUpFplayer(result) {
    let resultCode = JSON.parse(result.code);
    if (resultCode == 1) { //检测json的code是否为1，不为1抛出错误，错误可以自定义 
        let rL = result.result.length;
        for (let i = 0; i < rL; i++) {
            liebiao_gundong_div_js.innerHTML += liebiao_div_moban_a + " liebiao_neirong_" + i + liebiao_div_moban_b;

            // musicPlayerLyricBar_js.innerHTML += '<p class="musicPlayerLyricBar_content">' + lrcText + '</p>'

        }
        for (let i = 0; i < rL; i++) {
            document.getElementsByClassName("liebiao_cover")[i].src = JSON.parse(xhr.responseText).result[i].cover;
            document.getElementsByClassName("liebiao_name")[i].innerHTML = JSON.parse(xhr.responseText).result[i].name;
            document.getElementsByClassName("liebiao_artist")[i].innerHTML = JSON.parse(xhr.responseText).result[i].artist;
        }
        for (let i = 0; i < rL; i++) {
            let liebiao_neirong_$ = "liebiao_neirong_" + i;
            document.getElementsByClassName(liebiao_neirong_$)[0].addEventListener('click', function() {
                FPlayer_Audio_bofang(liebiao_neirong_$);
            })
        }
    } else {
        alert("哒咩哒咩~哒咩呦~哒咩那诺呦~");
    }
}


button_zanting_js.addEventListener('click', function() {
    console.log("暂停");
})

function FPlayer_Audio_bofang(content) {
    let FPlayer_Audio_num = content.slice(16);
    let FPlayer_Audio_src = JSON.parse(xhr.responseText).result[FPlayer_Audio_num].url;
    // console.log(xhr);
    let FPlayer_Audio = new Audio(FPlayer_Audio_src);
    FPlayer_Audio.play();
}

function FPlayer_Audio_zanting() {}

function FPlayer_Audio_qianjin() {}

function FPlayer_Audio_houtui() {}