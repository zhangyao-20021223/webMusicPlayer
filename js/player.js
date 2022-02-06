var xhr = new XMLHttpRequest;
// xhr.open("GET", "https://zk-nhbook.osdn.io/getMusic.php");
xhr.open("GET", "../json.json");
xhr.responseType = "text";
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)) {
            result = JSON.parse(xhr.responseText);

        } else {
            alert("播放器加载失败");
        }
    }
}
xhr.send();

var FPlayer = {}
FPlayer.zanting = function() {}
FPlayer.qianjin = function() {}
FPlayer.houtui = function() {}