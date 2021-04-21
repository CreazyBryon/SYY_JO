/**************************************************************
Build:3.2

2021-04-19

add caijing


 ***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

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

    scraper.run = function () {
        scraper.log('Start to grab..........................');

        scraper.loadHis();

        scraper.startedRequestCount = 0;
        scraper.endedRequestCount = 0;

        /*    
        scraper.climb('mee', 'http://www.mee.gov.cn/ywdt/hjywnews/', '.cjcx_biaob', saveMee);
        scraper.climb('mee', 'http://www.mee.gov.cn/ywdt/dfnews/', '.cjcx_biaob', saveMee);

        scraper.climb('cenews', 'https://www.cenews.com.cn/opinion/hjsp/', '.list_txt li a', saveCenews);
        scraper.climb('cenews', 'https://www.cenews.com.cn/pollution_ctr/xydt/', '.list_txt li a', saveCenews);
        scraper.climb('cenews', 'https://www.cenews.com.cn/leader/talk/', '.list_txt a', saveCenews);
        scraper.climb('cenews', 'https://www.cenews.com.cn/environment/zlfb/', '.list_txt li a', saveCenews);

        scraper.climb('cenews', 'https://www.cenews.com.cn/news/', '#moreli .cjlisttil a', saveCenews);
        scraper.climb('cenews', 'https://www.cenews.com.cn/news/index_1445_1.html', '.cjlisttil a', saveCenews, 'https://www.cenews.com.cn/news/');

        scraper.climb('gov', 'http://www.gov.cn/xinwen/lianbo/difang.htm', '.list.list_1.list_2 a', saveGOV, 'http://www.gov.cn');

        for (i = 1; i <= 15; i++) {
        var gurl = "http://sousuo.gov.cn/column/30611/" + i + ".htm";
        //scraper.climb_gov(gurl);
        scraper.climb('gov', gurl, '.list.list_1.list_2 a', saveGOV, 'http://www.gov.cn');
        }

        scraper.climb('chinanews', 'http://www.chinanews.com/cj/gd.shtml', '.dd_bt a', saveChinanews, 'http://www.chinanews.com/');

        scraper.climb('kuaixun', 'https://kuaixun.stcn.com/', '#news_list2 li a', saveKuaixun);

        //https://kuaixun.stcn.com/index_17.html
        for (j = 1; j <= 19; j++) {

        var gurl = "https://kuaixun.stcn.com/index_" + j + ".html";
        //scraper.climb_gov(gurl);
        scraper.climb('kuaixun', gurl, '#news_list2 li a', saveKuaixun, 'https://kuaixun.stcn.com/');
        }

        for (j = 1; j <= 5; j++) {

        var gurl = "http://finance.eastmoney.com/a/cgnjj_" + j + ".html";

        scraper.climb('caijing', gurl, '#newsListContent .title a', readCaijing);
        }
 

        for (j = 1; j <= 5; j++) {

            var gurl = "http://finance.eastmoney.com/a/cgjjj_" + j + ".html";

            scraper.climb('caijing', gurl, '#newsListContent .title a', readCaijing);
        }
		
     */
		/*
        for (j = 0; j < 6; j++) {

			var pageNo="";
			
			if(j){
				pageNo="_"+j;
			}
			
            var gurl = "http://www.mee.gov.cn/ywgz/zrstbh/stwmsfcj/index" + pageNo + ".shtml";

            scraper.climb('meeHis', gurl, '.mobile_list a', readMeeHis);
        }	 
		
	 */
        scraper.log('Started grab..........................');
    }

    scraper.climb = function (site, mainUrl, listFilter, readCB, rootUrl) {

        var tempPath = './data2/' + site + '/';
        try {
            fs.statSync(tempPath);
        } catch (err) {
            scraper.log("creating folder:" + tempPath);
            fs.mkdirSync(tempPath);
        }

        scraper.startedRequestCount++;

        scraper.grab(mainUrl, function ($1) {

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

                scraper.grab(subUrl, function ($2) {
                    var pageInfo = 0;
                    var tt = "";

                    try {
                        tt = $1("title").text();
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

                        var validT = (pageInfo.aTitle.replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, ""));

                        var fileP = datePath + validT + '.txt'

                            saveTxt(fileP, pageInfo.aData);
                    } else {
                        scraper.log('!!!!!!Pa failed:' + subUrl);

                    }

                });
            });
        });
    }

    function saveMee(subUrl, $2) {

        var mtitle = $2(".neiright_Title").text();

        if (!mtitle) {
            mtitle = $2(".cjcs_phone_title").text();
        }

        var mtime = $2(".time").text();

        if (!mtime) {
            $2(".content_top_box div").each(function (i, elem) {
                var lbl = $2(elem.children[0]).text();
                var dtVal = elem.children[1];

                if (lbl == "生成日期") {
                    mtime = dtVal.data;
                }

                if (lbl == "发布机关") {
                    msrc = $2(dtVal).text();
                }
            });
        }

        var msrc = $2(".xqLyPc").last().text();

        if (!msrc) {}
        else {
            msrc = msrc.slice(3);
        }

        var mct = "";

        var mctNode = $2(".neiright_JPZ_GK_CP");

        if (!mctNode) {
            mct = $2(".content_body_box").text();

        } else {
            var parags = $2(".neiright_JPZ_GK_CP p");
            mct = getContent(parags);

            if (!mct) {
                parags = $2(".neiright_JPZ_GK_CP div");
                mct = getContent(parags);
            }
        }

        var str = "[标题]" + mtitle + "\r\n";
        str += "[来源]" + msrc + "\r\n";
        str += "[地区]\r\n";
        str += "[作者]\r\n";
        str += "[摘要]\r\n";
        str += "[关键字]\r\n";
        str += "[栏目]\r\n";
        str += "[专有属性]\r\n";
        str += "[日期]" + mtime + "\r\n";
        str += "[正文]\r\n" + mct + "\r\n";

        var pInfo = {
            "aDate": mtime,
            "aTitle": mtitle,
            "aData": str
        };
        return pInfo;

    }

    function saveGOV(subUrl, $ct) {

        var mtitle = $ct(".article h1").text().trim();

        $ct(".pages_print").remove();

        var pageState = $ct(".pages-date").text().trim();

        var parags = $ct(".pages_content p");

        var pageC = getContent(parags);

        var mtime = pageState.slice(0, 10);
        var mDT = pageState.slice(0, 16);
        var mSrc = pageState.slice(16).trim();

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

    function saveCenews(subUrl, $ct) {

        var dotIndex = subUrl.indexOf('./');

        if (dotIndex > -1) {

            var mtitle = $ct(".hjbwap-xiangqing-h2").text();

            var mtime = $ct(".public_func span").eq(0).text();
            var mauthor = $ct(".public_func span").eq(1).text();
            var msrc = $ct(".public_func span").eq(2).text();

            var parags = $ct(".TRS_Editor p");
            var pageC = getContent(parags);

            mtime = mtime.replace('年', '-').replace('月', '-').replace('日', '');

            var str = "[标题]" + mtitle + "\r\n";
            str += "[作者]" + mauthor.slice(3) + "\r\n";
            str += "[来源]" + msrc.slice(3) + "\r\n";
            str += "[栏目]\r\n";
            str += "[地区]\r\n";
            str += "[日期]" + mtime + "\r\n";
            str += "[正文]\r\n" + pageC + "\r\n";

            var pInfo = {
                "aDate": mtime,
                "aTitle": mtitle,
                "aData": str
            };
            return pInfo;

        } else {
            return saveWx(subUrl, $ct);
        }
    }

    function saveWx(subUrl, $ct) {

        var mtitle = $ct(".rich_media_title").text().trim();

        var mtime = $ct("em.rich_media_meta.rich_media_meta_text").text().trim();

        if (!mtime) {

            var timeSpStr = '';
            var timeSp = $ct('script').filter(function (i, el) {
                var spText = $ct(el).html();

                if (spText.indexOf('publish_time') > -1) {
                    timeSpStr = spText;
                    return true;
                }
                return false;
            });

            var spRows = timeSpStr.split('\n');

            var timeStr = spRows[7].slice(37, 47);

            mtime = timeStr;
        }

        var mauthor = $ct("span.rich_media_meta.rich_media_meta_text").text().trim();
        var msrc = $ct(".rich_media_meta.rich_media_meta_nickname a").text().trim();

        var mct = $ct(".rich_media_content").text().trim();

        var str = "[标题]" + mtitle + "\r\n";
        str += "[作者]" + mauthor + "\r\n";
        str += "[来源]" + msrc + "\r\n";
        str += "[栏目]\r\n";
        str += "[地区]\r\n";
        str += "[日期]" + mtime + "\r\n";
        str += "[正文]\r\n" + mct + "\r\n";

        var pInfo = {
            "aDate": mtime,
            "aTitle": mtitle,
            "aData": str
        };
        return pInfo;
    }

    function saveChinanews(subUrl, $ct) {
        var mtitle = $ct('.content>h1').text().trim();

        var leftt = $ct(".left-t").text().trim();

        var mtimeOld = leftt.slice(0, 10);
        var mtime = mtimeOld.replace('年', '-').replace('月', '-');

        var msrc = leftt.slice(21, -4);

        var parags = $ct(".left_zw p");

        var mct = getContent(parags);

        var str = "[标题]" + mtitle + "\r\n";
        str += "[作者]\r\n";
        str += "[来源]" + msrc + "\r\n";
        str += "[栏目]\r\n";
        str += "[地区]\r\n";
        str += "[日期]" + mtime + "\r\n";
        str += "[正文]\r\n" + mct + "\r\n";

        var pInfo = {
            "aDate": mtime,
            "aTitle": mtitle,
            "aData": str
        };
        return pInfo;

    }

    function saveKuaixun(subUrl, $ct) {

        if (subUrl.indexOf('jwview') > -1) {
            return saveKuaixun2(subUrl, $ct);
        } else {

            var mtitle = $ct('.intal_tit>h2').text().trim();

            var leftt = $ct(".info").text().trim();

            var mtime = leftt.slice(0, 10);

            var msrcOld = $ct(".info span").eq(0).text().trim();
            var msrc = msrcOld.slice(3).trim();

            var parags = $ct(".txt_con p");

            var mct = getContent(parags);

            var str = "[标题]" + mtitle + "\r\n";
            str += "[作者]\r\n";
            str += "[来源]" + msrc + "\r\n";
            str += "[栏目]\r\n";
            str += "[地区]\r\n";
            str += "[日期]" + mtime + "\r\n";
            str += "[正文]\r\n" + mct + "\r\n";

            var pInfo = {
                "aDate": mtime,
                "aTitle": mtitle,
                "aData": str
            };
            return pInfo;

        }
    }

    function saveKuaixun2(subUrl, $ct) {

        var mtitle = $ct('header h1').text().trim();

        var leftt = $ct("header em").text().trim();
        var mtime = leftt.slice(0, 10);

        var msrc = $ct("header p").text().trim();

        var parags = $ct("#article p");

        var mct = getContent(parags);

        var str = "[标题]" + mtitle + "\r\n";
        str += "[作者]\r\n";
        str += "[来源]" + msrc + "\r\n";
        str += "[栏目]\r\n";
        str += "[地区]\r\n";
        str += "[日期]" + mtime + "\r\n";
        str += "[正文]\r\n" + mct + "\r\n";

        var pInfo = {
            "aDate": mtime,
            "aTitle": mtitle,
            "aData": str
        };
        return pInfo;
    }

    function readCaijing(subUrl, $ct) {

        var mtitle = $ct('.newsContent h1').text().trim();

        var mtime = $ct(".newsContent .Info .time-source .time").text().trim(); //2021年04月16日 15:17
        var mdate = mtime.slice(0, 10).replace('年', '-').replace('月', '-'); ;

        var msrc = $ct(".newsContent .Info .time-source .source").text().trim().slice(4);

        var parags = $ct("#ContentBody p:not([class])");

        var mct = getContent(parags);

        var str = "[标题]" + mtitle + "\r\n";
        str += "[作者]\r\n";
        str += "[来源]" + msrc + "\r\n";
        str += "[栏目]\r\n";
        str += "[地区]\r\n";
        str += "[日期]" + mdate + "\r\n";
        str += "[正文]\r\n" + mct + "\r\n";

        var pInfo = {
            "aDate": mdate,
            "aTitle": mtitle,
            "aData": str
        };
        return pInfo;
    }

    function readMeeHis(subUrl, $ct) {

        var mtitle = $ct('.neiright_Title').text().trim();

        var mdate = $ct(".xqLyPc.time").text().trim(); //2021-03-14 
 
        var parags = $ct(".TRS_Editor>p");
		
		if(parags.length==0){
			parags = $ct(".TRS_Editor>div");
		}

        var mct = getContent(parags);

        var str = "[标题]" + mtitle + "\r\n";
        str += "[作者]\r\n";
        str += "[来源]生态环境部\r\n";
        str += "[栏目]污染防治|综合\r\n";
        str += "[专有属性]案例类|典型案例\r\n";		
        str += "[地区]\r\n";
        str += "[日期]" + mdate + "\r\n";
        str += "[正文]\r\n" + mct + "\r\n";

        var pInfo = {
            "aDate": mdate,
            "aTitle": mtitle,
            "aData": str
        };
        return pInfo;
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

    function finishRequest() {
        scraper.endedRequestCount++;

        if (scraper.endedRequestCount == scraper.startedRequestCount) {
            scraper.log("all finished======================================");

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

    scraper.grab = function (url, cb) {

        request(url, function (error, response, html) {

            finishRequest();

            if (!error) {
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
	
	
	scraper.padLeft = function(src, fullLength){
		
		var str = src+"";
		while (str.length < fullLength)
			str = "0" + str;
		return str;		
		
	}
	
	 
    return scraper;

};
