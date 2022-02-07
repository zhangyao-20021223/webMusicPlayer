let FPlayer = {}

FPlayer.xhr = function () {
    const FPlayer_xhr = new XMLHttpRequest;
    // xhr.open("GET", "https://zk-nhbook.osdn.io/getMusic.php");
    FPlayer_xhr.open("GET", "json.json");
    FPlayer_xhr.responseType = "text";
    FPlayer_xhr.onreadystatechange = function () {
        let result;
        if (FPlayer_xhr.readyState == 4) {
            if ((FPlayer_xhr.status >= 200 && FPlayer_xhr.status < 300) || (FPlayer_xhr.status == 304)) {
                result = JSON.parse(FPlayer_xhr.responseText);
                FPlayer.resTxt = result;
                FPlayer.star();
            } else {
                alert("播放器加载失败");
            }
        }
    }
    FPlayer_xhr.send();
}

FPlayer.templatelist = '<div class="FPlayerListContents"><div><img class="FPlayerListContent_img" src="svg/jiaopian.svg" alt="#"></div><div><p class="FPlayerListContent_p1"></p></div><div><p class="FPlayerListContent_p2"></p></div></div>'
// FPlayer.templatelist = '<div class="FPlayerListContents"><img class="FPlayerListContent_img" src="svg/jiaopian.svg" alt="#"><p class="FPlayerListContent_p1"></p><p class="FPlayerListContent_p2"></p></div>'


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
}
FPlayer.pause = function () {
}
FPlayer.go = function () {
}
FPlayer.back = function () {
}

FPlayer_core = function (type, data) {

    FPlayer.xhr();
}

FPlayer_core();
