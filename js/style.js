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

gecichangdu = 0;

function pxjiajian() {
    let MPLBC = document.getElementsByClassName("musicPlayerLyricBar_content");
    let MPLBCL = document.getElementsByClassName("musicPlayerLyricBar_content").length;
    gecichangdu = gecichangdu + 36;
    for (i = 0; i < MPLBCL; i++) {
        MPLBC[i].setAttribute("style", " transform: translateY(-" + gecichangdu + "px);");
    }


}