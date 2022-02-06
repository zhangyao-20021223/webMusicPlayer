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
            alert("播放器加载失败");
        }
    }
}
xhr.send();

function setUpFplayer(result) {}


var FPlayer_Button_js = document.getElementById("musicPlayerControlBar");
for (let a = 0; a < 4; a++) {
    FPlayer_Button_js.getElementsByTagName("img")[a].addEventListener('click', function() {
        switch (this.id) {
            case "button_qianjin":
                break;
            case "button_zanting":
                break;
            case "button_houtui":
                break;
            case "button_liebiao":
                break;
        }
    })
}

//FPlayer的核心


function FPlayer_Audio_core() {

}