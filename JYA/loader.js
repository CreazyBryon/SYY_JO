
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconvlite = require('iconv-lite');


const getloader = function(logger){

    let myloader = {};
    myloader.startedRequestCount = 0;
    myloader.endedRequestCount = 0;

    myloader.climb = function (site, mainUrl, listFilter, readCB, encoding) {

        var tempPath = './result/' + site + '/';
        try {
            fs.statSync(tempPath);
        } catch (err) {
            logger.log("creating folder:" + tempPath);
            fs.mkdirSync(tempPath);
        }

        myloader.startedRequestCount++;

        myloader.grab(mainUrl, encoding, function ($1) {

            var mytl = $1("title").text();

            $1(listFilter).each(function (i, elem) {

                var href = $1(elem).attr("href");

                if (href.endsWith(".pdf")) {

                    return true;
                }
 
                myloader.startedRequestCount++;

                var subUrl = href;

                if (!subUrl.startsWith('http')) {

                    var murl = new URL(subUrl, mainUrl);
                    subUrl = murl.href;
                }


                myloader.grab(subUrl, encoding, function ($2) {
                    var pageInfo = 0;
                    var tt = "";

                    try {
                        tt = $2("title").text();
                        pageInfo = readCB(href, $2, getContent);
                    } catch (err) {
                        logger.log("Sub page failed, url=" + subUrl + " ; title=" + tt);
                        logger.log(err);
                    }

                    if (pageInfo && pageInfo.aTitle) {
 
                        var validT = (pageInfo.aTitle.replace(/[&\/\\#,+()$~%.'":*?<>{}|]/g, ""));

                        var fileP = tempPath + validT + '.txt'

                            saveTxt(fileP, pageInfo.aData);
                    } else {
                        logger.log('!!!!!!Pa failed:' + subUrl);

                    }

                });
				
            });
        });
    }

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
 
    function myparse(html,ecg){
    
        if(ecg){
            html = iconvlite.decode(html, ecg).toString();
        }        
 
        var $dom = cheerio.load(html, {
            decodeEntities: false
        });
     
        return $dom;
    }    

    function myfetch(url, encoding){

        var reqdata = {
            headers: { 
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66'
            },
            uri: url
        };

        return new Promise(function(resolve, reject){
            request(reqdata, function (err, response, html) { 
                if (err) return reject(err);

                try { 
                    let htmldom = myparse(html, encoding);
                    resolve(htmldom);
                } catch(e) {
                    reject(e);
                }
            });
        });        
    }

    myloader.grab = function (url, encoding, cb) {
		
        let pr = myfetch(url,encoding);

        //pr.then($dom=>console.log($dom("dom")))
 
    }

    function finishRequest() {
        myloader.endedRequestCount++;

        if (myloader.endedRequestCount == myloader.startedRequestCount) {
            logger.log("all finished======================================"+myloader.endedRequestCount);
 
        } else {
            logger.log("started:" + myloader.startedRequestCount + "; finished:" + myloader.endedRequestCount);

        }

    }

    function saveTxt(filePath, fileContent) {

        try {
            fs.statSync(filePath);
            logger.log("file exist:" + filePath);
        } catch (err) {
            logger.log("start to create new file:" + filePath);
            fs.writeFile(filePath, '\ufeff' + fileContent,{flag:'wx'}, function (error) {

                if (error) {
                    logger.log(error + " , " + filePath);
                } else {
                    logger.log('writed to ' + filePath);
                }

            });      
        }



    }

    return myloader;
}



module.exports=getloader;