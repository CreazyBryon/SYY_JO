/**************************************************************
Build:3.3

2021-06-17



 ***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconvlite = require('iconv-lite');

exports.getScraper = function () {

    var scraper = {};

    scraper.start = function () {

        scraper.run();
    }

    scraper.loadHis = function () {

        try {
            var objStr = fs.readFileSync('histories1.json', 'utf8');
            scraper.histories = JSON.parse(objStr);
        } catch (err) {
            scraper.log('history not existing: ' + err);
            scraper.histories = {};

        }
    }

    
    scraper.climb = function (site, mainUrl, listFilter, readCB, encoding) {

        var tempPath = './data2/' + site + '/';
        try {
            fs.statSync(tempPath);
        } catch (err) {
            scraper.log("creating folder:" + tempPath);
            fs.mkdirSync(tempPath);
        }

        scraper.startedRequestCount++;

        scraper.grab(mainUrl, encoding, function ($1) {

            var mytl = $1("title").text();

            $1(listFilter).each(function (i, elem) {

                var href = $1(elem).attr("href");

                if (href.endsWith(".pdf")) {

                    return true;
                }

                var atitle = $1(elem).text().trim();

                if (!scraper.histories[site]) {
                    scraper.histories[site] = [];
                }

                if (scraper.histories[site].indexOf(atitle) > -1) {
                    scraper.log("已下载过的" + site + "文章:" + atitle);
                    return true;
                }

                scraper.histories[site].push(atitle);
                scraper.startedRequestCount++;

                var subUrl = href;

                if (!subUrl.startsWith('http')) {

                    var murl = new URL(subUrl, mainUrl);
                    subUrl = murl.href;
                }


                scraper.grab(subUrl, encoding, function ($2) {
                    var pageInfo = 0;
                    var tt = "";

                    try {
                        tt = $2("title").text();
                        pageInfo = readCB(href, $2);
                    } catch (err) {
                        scraper.log("Sub page failed, url=" + subUrl + " ; title=" + tt);
                        scraper.log(err);
                    }

                    if (pageInfo && pageInfo.aTitle) {

                        var datePath = tempPath + pageInfo.aDate + "/";

                        try {
                            fs.statSync(datePath);
                        } catch (err) {
                            scraper.log("creating folder:" + datePath);
                            fs.mkdirSync(datePath);
                        }

                        var validT = (pageInfo.aTitle.replace(/[ &\/\\#,+()$~%.'":*?<>{}|]/g, ""));

                        var fileP = datePath + validT + '.txt'

                            saveTxt(fileP, pageInfo.aData);
                    } else {
                        scraper.log('!!!!!!Pa failed:' + subUrl);

                    }

                });
				
            });
        });
    }

   
    //================================================================================================================
    //tools
    //================================================================================================================

    function getContent(parags) {

        if (!parags || parags.length == 0) {
            return null;
        }

        var contentList = [];
        for (var pi = 0; pi < parags.length; pi++) {
            var tp = parags.eq(pi);
            var paraText = tp.text();

            if (paraText.indexOf("　　") == -1) {
                paraText = "　　" + paraText;
            }

            if (pi == parags.length - 1) {
                if (paraText.endsWith('）')) {
                    var leftCIndex = paraText.indexOf('（');

                    if (leftCIndex != -1) {
                        paraText = paraText.slice(0, leftCIndex);
                    }
                }

                if (paraText.indexOf('不得转载') > -1) {
                    paraText = '';
                }
            }

            contentList.push(paraText);
        }

        var pageC = contentList.join('\r\n');

        return pageC;

    }
	
    function getContent2(fullStr) {

        if (!fullStr) {
            return null;
        }
		
		var parags = fullStr.split('\n');

        var contentList = [];
		
        for (var pi = 0; pi < parags.length; pi++) {
            var tp = parags[pi];
            var paraText = tp;
			var trimText = tp.trim();
			
			if(!trimText){
				continue;
			}
			

            if (paraText.indexOf("　　") != 0) {
                paraText = "　　" + paraText;
            }
			
			if (paraText.indexOf('更多内容，点击阅读') > -1) {
				paraText = paraText.replace('更多内容，点击阅读','');
			}			
			
			//last one
            if (pi == parags.length - 1) {
                if (paraText.endsWith('）')) {
                    var leftCIndex = paraText.indexOf('（');

                    if (leftCIndex != -1) {
                        paraText = paraText.slice(0, leftCIndex);
                    }
                }

                if (paraText.indexOf('不得转载') > -1) {
                    paraText = '';
                }
				
				if(paraText.trim().indexOf('记者') == 0){
					paraText = '';
				}
            }

            contentList.push(paraText);
        }

        var pageC = contentList.join('\r\n');

        return pageC;

    }	

    function finishRequest() {
        scraper.endedRequestCount++;

        if (scraper.endedRequestCount == scraper.startedRequestCount) {
            scraper.log("all finished======================================"+scraper.endedRequestCount);

            var objStr = JSON.stringify(scraper.histories);

            fs.writeFile("histories1.json", objStr, function (error) {

                if (error) {
                    scraper.log(error + " , " + objStr);
                } else {
                    scraper.log('writed to histories.json');
                }
            });
        } else {
            scraper.log("started:" + scraper.startedRequestCount + "; finished:" + scraper.endedRequestCount);

        }

    }

    function saveTxt(filePath, fileContent) {

        fs.writeFile(filePath, '\ufeff' + fileContent, function (error) {

            if (error) {
                scraper.log(error + " , " + filePath);
            } else {
                scraper.log('writed to ' + filePath);
            }

        });

    }

    scraper.grab = function (url, encoding, cb) {
		
		var reqdata = {
				headers: { 
				  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66'
				  //'Content-Type': 'text/html; charset=UTF-8'
				},
				uri: url
			  };
		
		if(encoding){
			reqdata.encoding=null;
		}

        request(reqdata, function (error, response, html) {

            finishRequest();

            if (!error) {
				
				if(encoding){
					html = iconvlite.decode(html, encoding).toString();
				}				
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                var $ = cheerio.load(html, {
                    decodeEntities: false
                });

                cb($);
            } else {
                scraper.log('grab-error:' + error + ' | ' + url);

            }
        });
    }

    scraper.log = function (msg) {

        console.log(msg);

        var alltxt = scraper.getNowFormatDatetime() + ' | ' + msg + "\r\n";

        var logName = "./log_" + scraper.getNowFormatDate() + ".txt";

        fs.appendFile(logName, alltxt, function (error) {
            if (error) {
                console.log('write failed')
            } else {
                //console.log('writed')
            }
        });

    }

    scraper.getNowFormatDatetime = function () {
        var nowTime = new Date();
        var month = nowTime.getMonth() + 1; //一定要+1,表示月份的参数介于 0 到 11 之间。也就是说，如果希望把月设置为 8 月，则参数应该是 7。
        var date = nowTime.getDate();
        var seperator1 = "-"; //设置成自己想要的年月日格式：年-月-日
        var seperator2 = ":"; //设置成自己想要的时分秒格式：时:分:秒
 
        var currentDate = nowTime.getFullYear() + seperator1 + scraper.padLeft(month,2) + seperator1 + scraper.padLeft(date,2) + " " +
            scraper.padLeft(nowTime.getHours(),2) + seperator2 + scraper.padLeft(nowTime.getMinutes(),2) + seperator2 + scraper.padLeft(nowTime.getSeconds(),2) + '.' + scraper.padLeft(nowTime.getMilliseconds(),3);
        return currentDate;
    }

    scraper.getNowFormatDate = function () {
        var nowTime = new Date();
        var month = nowTime.getMonth() + 1; //一定要+1,表示月份的参数介于 0 到 11 之间。也就是说，如果希望把月设置为 8 月，则参数应该是 7。
        var date = nowTime.getDate();
        var seperator1 = "-"; //设置成自己想要的年月日格式：年-月-日
 
        var currentDate = nowTime.getFullYear() + seperator1 + scraper.padLeft(month,2) + seperator1 + scraper.padLeft(date,2);

        return currentDate;
    }
	
    scraper.getFormatDate = function (dateStr) {
        var nowTime = new Date(dateStr);
        var month = nowTime.getMonth() + 1; //一定要+1,表示月份的参数介于 0 到 11 之间。也就是说，如果希望把月设置为 8 月，则参数应该是 7。
        var date = nowTime.getDate();
        var seperator1 = "-"; //设置成自己想要的年月日格式：年-月-日
 
        var currentDate = nowTime.getFullYear() + seperator1 + scraper.padLeft(month,2) + seperator1 + scraper.padLeft(date,2);

        return currentDate;
    }	
	 
	scraper.padLeft = function(src, fullLength){
		
		var str = src+"";
		while (str.length < fullLength)
			str = "0" + str;
		return str;		
		
	}
	
	 
    return scraper;

};
