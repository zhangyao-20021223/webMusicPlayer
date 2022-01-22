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
var liebiao_div_moban = '<div class="liebiao_neirong"><img class="liebiao_cover" src="" alt=""><div class="liebiao_name"><p></p></div><div class="liebiao_artist"><p></p></div></div>'


function setUpFplayer(result) {
    let resultCode = JSON.parse(result.code);
    if (resultCode == 1) {
        let rL = result.result.length;
        for (let i = 0; i < rL; i++) {
            liebiao_gundong_div_js.innerHTML += liebiao_div_moban;
            console.log("ok");
        }
        for (let i = 0; i < rL; i++) {
            // console.log(result.result[i]);
            // console.log(result.result[i].name);
            // console.log(result.result[i].artist);
        }
        // musicPlayerLyricBar_js.innerHTML += '<p class="musicPlayerLyricBar_content">' + lrcText + '</p>'
    } else {
        alert("哒咩哒咩~哒咩呦~哒咩那诺呦~");
    }

}