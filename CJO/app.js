

var getloader = require('./loader');
var ends = require('./ends');

let logger = console;

var myloader = getloader(logger);

for (var ii in ends) {
    console.log(ii);
    let item = ends[ii];

    myloader.climb(item.foldername, item.url, item.listfilter, item.cb);
}

//myloader.climb('mc', 'https://www.missioncloud.com/resources/tools', '.footer-wrap a', saveMC);


function saveMC(subUrl, $ct, contentCB) {

    var mtitle = $ct(".apn-content h2").text().trim();

    var parags = $ct(".apn-content p");

    var pageC = contentCB(parags);

    var mtime = '';
    var mDT = '';
    var mSrc = '';

    var str = "[标题]" + mtitle + "\r\n";
    str += "[来源]" + mSrc.slice(4) + "\r\n";
    str += "[地区]\r\n";
    str += "[作者]\r\n";
    str += "[摘要]\r\n";
    str += "[关键字]\r\n";
    str += "[栏目]\r\n";
    str += "[专有属性]\r\n";
    str += "[日期]" + mtime + "\r\n";
    str += "[正文]\r\n" + pageC + "\r\n";

    var pInfo = {
        "aDate": mtime,
        "aTitle": mtitle,
        "aData": str
    };
    return pInfo;

}
