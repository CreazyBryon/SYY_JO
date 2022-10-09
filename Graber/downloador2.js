/**************************************************************
Build:2.1

20210305

  
***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var getScraper = function(){
	
	
	var scraper={};
  
	
	scraper.start=function(){
		console.log('Start to grab..........................');
		 
		scraper.download('luohe','http://www.luohe.gov.cn/sitegroup/root/html/40288be5789194bb0178d32cdeda10e3/0d7a88136be7481d931cee7b7885a49a.html', '.context img');
		//scraper.download('yingkou','http://www.yingkou.gov.cn/govxxgk/ykszf/2021-07-01/21e2eeeb-e025-490e-bc83-fe57209f1858.html', '.ewb-article-content img');

//saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819938001.jpg','./imgs/luohe/001.png')
/*
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819938001.jpg','./imgs/luohe/001.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819488002.jpg','./imgs/luohe/002.jpg');

saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819473003.jpg','./imgs/luohe/003.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819851004.jpg','./imgs/luohe/004.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819638005.jpg','./imgs/luohe/005.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819245006.jpg','./imgs/luohe/006.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819156007.jpg','./imgs/luohe/007.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819366008.jpg','./imgs/luohe/008.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819688009.jpg','./imgs/luohe/009.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103819792010.jpg','./imgs/luohe/010.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820901011.jpg','./imgs/luohe/011.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820145012.jpg','./imgs/luohe/012.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820437013.jpg','./imgs/luohe/013.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820793014.jpg','./imgs/luohe/014.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820533015.jpg','./imgs/luohe/015.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820175016.jpg','./imgs/luohe/016.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820664017.jpg','./imgs/luohe/017.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820613018.jpg','./imgs/luohe/018.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820903019.jpg','./imgs/luohe/019.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820467020.jpg','./imgs/luohe/020.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820967021.jpg','./imgs/luohe/021.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820419022.jpg','./imgs/luohe/022.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820482023.jpg','./imgs/luohe/023.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820212024.jpg','./imgs/luohe/024.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820739025.jpg','./imgs/luohe/025.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820798026.jpg','./imgs/luohe/026.jpg');

saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820414027.jpg','./imgs/luohe/027.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820501028.jpg','./imgs/luohe/028.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820950029.jpg','./imgs/luohe/029.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820403030.jpg','./imgs/luohe/030.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820330031.jpg','./imgs/luohe/031.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103820822032.jpg','./imgs/luohe/032.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821286033.jpg','./imgs/luohe/033.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821411034.jpg','./imgs/luohe/034.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821149035.jpg','./imgs/luohe/035.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821807036.jpg','./imgs/luohe/036.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821866037.jpg','./imgs/luohe/037.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821741038.jpg','./imgs/luohe/038.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821745039.jpg','./imgs/luohe/039.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821162040.jpg','./imgs/luohe/040.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821274041.jpg','./imgs/luohe/041.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821705042.jpg','./imgs/luohe/042.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821541043.jpg','./imgs/luohe/043.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821921044.jpg','./imgs/luohe/044.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821963045.jpg','./imgs/luohe/045.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821741046.jpg','./imgs/luohe/046.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821733047.jpg','./imgs/luohe/047.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821167048.jpg','./imgs/luohe/048.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821217049.jpg','./imgs/luohe/049.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103821642050.jpg','./imgs/luohe/050.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103822310051.jpg','./imgs/luohe/051.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103822281052.jpg','./imgs/luohe/052.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103822957053.jpg','./imgs/luohe/053.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103822504054.jpg','./imgs/luohe/054.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103822454055.jpg','./imgs/luohe/055.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103822834056.jpg','./imgs/luohe/056.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823765057.jpg','./imgs/luohe/057.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823205058.jpg','./imgs/luohe/058.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823364059.jpg','./imgs/luohe/059.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823162060.jpg','./imgs/luohe/060.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823194061.jpg','./imgs/luohe/061.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823283062.jpg','./imgs/luohe/062.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823717063.jpg','./imgs/luohe/063.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823378064.jpg','./imgs/luohe/064.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823509065.jpg','./imgs/luohe/065.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823973066.jpg','./imgs/luohe/066.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823959067.jpg','./imgs/luohe/067.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823412068.jpg','./imgs/luohe/068.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823876069.jpg','./imgs/luohe/069.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823375070.jpg','./imgs/luohe/070.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823239071.jpg','./imgs/luohe/071.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823113072.jpg','./imgs/luohe/072.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823948073.jpg','./imgs/luohe/073.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823854074.jpg','./imgs/luohe/074.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823963075.jpg','./imgs/luohe/075.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823331076.jpg','./imgs/luohe/076.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103823995077.jpg','./imgs/luohe/077.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824779078.jpg','./imgs/luohe/078.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824977079.jpg','./imgs/luohe/079.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824556080.jpg','./imgs/luohe/080.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824514081.jpg','./imgs/luohe/081.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824804082.jpg','./imgs/luohe/082.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824191083.jpg','./imgs/luohe/083.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824624084.jpg','./imgs/luohe/084.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824714085.jpg','./imgs/luohe/085.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824125086.jpg','./imgs/luohe/086.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824582087.jpg','./imgs/luohe/087.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824660088.jpg','./imgs/luohe/088.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824187089.jpg','./imgs/luohe/089.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824161090.jpg','./imgs/luohe/090.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824631091.jpg','./imgs/luohe/091.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824928092.jpg','./imgs/luohe/092.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824284093.jpg','./imgs/luohe/093.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824770094.jpg','./imgs/luohe/094.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103824712095.jpg','./imgs/luohe/095.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825625096.jpg','./imgs/luohe/096.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825217097.jpg','./imgs/luohe/097.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825684098.jpg','./imgs/luohe/098.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825762099.jpg','./imgs/luohe/099.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825194100.jpg','./imgs/luohe/100.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825202101.jpg','./imgs/luohe/101.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825197102.jpg','./imgs/luohe/102.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825821103.jpg','./imgs/luohe/103.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825840104.jpg','./imgs/luohe/104.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825145105.jpg','./imgs/luohe/105.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825880106.jpg','./imgs/luohe/106.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825820107.jpg','./imgs/luohe/107.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825269108.jpg','./imgs/luohe/108.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825137109.jpg','./imgs/luohe/109.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825374110.jpg','./imgs/luohe/110.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825306111.jpg','./imgs/luohe/111.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825562112.jpg','./imgs/luohe/112.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825101113.jpg','./imgs/luohe/113.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825246114.jpg','./imgs/luohe/114.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825200115.jpg','./imgs/luohe/115.jpg');
saveImg('http://www.luohe.gov.cn/upload/402881fa2194c26c012194c38dc80001/20210708/20210708103825615116.jpg','./imgs/luohe/116.jpg');

*/

		console.log('End to grab..........................');
	}


    scraper.download = function (site, mainUrl, listFilter) {

        var tempPath = './imgs/' + site + '/';
        try {
            fs.statSync(tempPath);
        } catch (err) {
            scraper.log("creating folder:" + tempPath);
            fs.mkdirSync(tempPath);
        }
 

        scraper.grab(mainUrl, function ($1) {

            var mytl = $1("title").text();
			console.log(mytl);

            $1(listFilter).each(function (i, elem) {

                var imgsrc = $1(elem).attr("src");


    
                var subUrl = imgsrc;

                if (!subUrl.startsWith('http')) {

                    var murl = new URL(subUrl, mainUrl);
                    subUrl = murl.href;
                }
				
				var fileP = tempPath + (i+"").padStart(4,0) + '.jpg'
				
				saveImg(subUrl,fileP);

                 
				
            });
        });
    }	


	function saveImg(url, path){
		  
		var readStream = request(url);
		console.log(url);
		var writeStream = fs.createWriteStream(path);
		readStream.pipe(writeStream);
		 
		 readStream.on('end', function() {
			console.log('download end');
		});
		readStream.on('error', function(err) {
			console.log("read error:"+err)
		})
		writeStream.on("error", function(err) {
		  console.log("write error:"+err)
		});
		writeStream.on("finish", function() {
			console.log("doc write finished");
			writeStream.end();
		});								
		
	}

	
	scraper.grab = function (url, cb) {
		
		var reqdata = {
				headers: { 
				  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66'
				  //'Content-Type': 'text/html; charset=UTF-8'
				},
				uri: url
			  };
		
console.log("started");
        request(url, function (error, response, html) {
			
			console.log(html);
 
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
	 
	scraper.log=function(msg){
		
		console.log(msg);
		
		var alltxt = scraper.getNowFormatDate()+' | '+msg+ "\r\n";
		
		fs.appendFile('./log.txt', alltxt, function (error) {
		  if (error) {
			console.log('write failed')
		  } else {
			//console.log('writed')
		  }
		});
 	
	}
	
	scraper.getNowFormatDate=function(){
		var nowTime=new Date();
		var month=nowTime.getMonth()+1;//一定要+1,表示月份的参数介于 0 到 11 之间。也就是说，如果希望把月设置为 8 月，则参数应该是 7。
		var date=nowTime.getDate();
		var seperator1="-";//设置成自己想要的年月日格式：年-月-日
		var seperator2=":";//设置成自己想要的时分秒格式：时:分:秒
		if(month>=1&&month<=9){
			month="0"+month;
		}
		if(date<=9){
			date="0"+date;
		}
		var currentDate=nowTime.getFullYear()+seperator1+month+seperator1+date+" "+
		nowTime.getHours()+seperator2+nowTime.getMinutes()+seperator2+nowTime.getSeconds()+'.'+nowTime.getMilliseconds();
		return currentDate;
	}
	 
	
	
	function saveImg(url, path){
		  
		var readStream = request(url);
		console.log(url);
		var writeStream = fs.createWriteStream(path);
		readStream.pipe(writeStream);
		 
		 readStream.on('end', function() {
			console.log('download end');
		});
		readStream.on('error', function(err) {
			console.log("read error:"+err)
		})
		writeStream.on("error", function(err) {
		  console.log("write error:"+err)
		});
		writeStream.on("finish", function() {
			console.log("doc write finished");
			writeStream.end();
		});								
		
	}
 


	return scraper;
	

};


var sss= getScraper();
sss.start();