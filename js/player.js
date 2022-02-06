var xhr = new XMLHttpRequest;
// xhr.open("GET", "https://zk-nhbook.osdn.io/getMusic.php");
xhr.open("GET", "json.json");
xhr.responseType = "text";
xhr.onreadystatechange = function() {
    let result;
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)) {
            result = JSON.parse(xhr.responseText);
            FPlayer.resTxt = result;
            FPlayer.star();
        } else {
            alert("播放器加载失败");
        }
    }
}
xhr.send();

let FPlayer = {}
FPlayer.templatelist = '<div class="FPlayerListContents"><div><img class="FPlayerListContent_img" src="svg/jiaopian.svg" alt="#"></div><div><p class="FPlayerListContent_p1"></p></div><div><p class="FPlayerListContent_p2"></p></div></div>'
    // FPlayer.templatelist = '<div class="FPlayerListContents"><img class="FPlayerListContent_img" src="svg/jiaopian.svg" alt="#"><p class="FPlayerListContent_p1"></p><p class="FPlayerListContent_p2"></p></div>'
FPlayer.star = function() {
    //初始化
    let xhrLength = FPlayer.resTxt.result.length;
    //向列表中填充
    let FPListBar_in_bar_js = document.getElementById("FPListBar_in_bar");
    for (let i = 0; i < xhrLength; i++) {
        FPListBar_in_bar_js.innerHTML += FPlayer.templatelist;
        FPListBar_in_bar_js.children[i].setAttribute("id", "FPlayerListContents_" + i);
    }
    for (let i = 0; i < xhrLength; i++) {
        console.log(FPListBar_in_bar_js.children[i].children[0].children[0].src);
        FPListBar_in_bar_js.children[i].children[0].children[0].src = FPlayer.resTxt.result[i].cover;
        FPListBar_in_bar_js.children[i].children[1].children[0].innerHTML = FPlayer.resTxt.result[i].name;
        FPListBar_in_bar_js.children[i].children[2].children[0].innerHTML = FPlayer.resTxt.result[i].artist;
    }

}
FPlayer.pause = function() {}
FPlayer.go = function() {}
FPlayer.back = function() {}

FPlayer_core = function(type, data) {

}