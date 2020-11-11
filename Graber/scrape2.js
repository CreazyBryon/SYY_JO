/**************************************************************
Build:2.1

20201109.3

save to seperate files
sites
财政部-财政数据	http://www.mof.gov.cn/gkml/caizhengshuju/	重大经济事件|经济数据速递	机构|职能部门|国家-财政	资讯类|资讯类属性	全国
商务部-统计数据-全国利用外资情况统计	http://www.mofcom.gov.cn/article/tongjiziliao/v/	重大经济事件|经济数据速递	机构|职能部门|国家-商务	资讯类|资讯类属性	全国
商务部-统计数据国外经济合作统计	http://www.mofcom.gov.cn/article/tongjiziliao/dgzz/	重大经济事件|经济数据速递	机构|职能部门|国家-商务	资讯类|资讯类属性	全国
国家统计局-最新发布	http://www.stats.gov.cn/tjsj/zxfb/	重大经济事件|经济数据速递	机构|职能部门|国家-统计	资讯类|资讯类属性	全国
国家发改委-经济数据概览	https://www.ndrc.gov.cn/fgsj/tjsj/jjsjgl/	重大经济事件|经济数据速递	机构|职能部门|国家-发改	资讯类|资讯类属性	全国
国家发改委-对外经贸及政策分析	https://www.ndrc.gov.cn/fgsj/tjsj/jjmy/dwjmjztfx/	重大经济事件|经济数据速递	机构|职能部门|国家-发改	资讯类|资讯类属性	全国
国家发改委-服务业	https://www.ndrc.gov.cn/fgsj/tjsj/cyfz/fwyfz/	重大经济事件|经济数据速递	机构|职能部门|国家-发改	资讯类|资讯类属性	全国
国家发改委-制造业	https://www.ndrc.gov.cn/fgsj/tjsj/cyfz/zzyfz/	重大经济事件|经济数据速递	机构|职能部门|国家-发改	资讯类|资讯类属性	全国
国家发改委-现代物流	https://www.ndrc.gov.cn/fgsj/tjsj/jjyx/xdwl/	重大经济事件|经济数据速递	机构|职能部门|国家-发改	资讯类|资讯类属性	全国
国家发改委-宏观经济运行	https://www.ndrc.gov.cn/fgsj/tjsj/jjyx/hgjjyx/	重大经济事件|经济数据速递	机构|职能部门|国家-发改	资讯类|资讯类属性	全国 

***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var getScraper = function(){
	
	
	var scraper={};
	 
	scraper.start=function(){ 
		scraper.run();
	}
	
	scraper.loadHis=function(){
		
		try{	
			var objStr = fs.readFileSync('histories.json', 'utf8');
			console.log(objStr);
			scraper.histories=JSON.parse(objStr);
		}catch(err){
			console.log('history not existing:'+err); 
			scraper.histories={'财政部':[],mofcom:[],stats:[],ndrc:[]};	
			
		}	 
		
		
	}
	
	scraper.run=function(){
		console.log('Start to grab..........................');
		
		scraper.loadHis();
		  
		scraper.startedRequestCount=0;
		scraper.endedRequestCount=0;
  
		scraper.climb('财政部','机构|职能部门|国家-财政','http://www.mof.gov.cn/gkml/caizhengshuju/','.xwfb_listerji a',saveMOF);
		
		
 
				 
		console.log('End to grab..........................');
	}
	
	scraper.climb=function(site,jigou, mainUrl, listFilter, saveCB){
		
		var tempPath='./data2/'+site+'/';
		try{		
		 fs.statSync(tempPath);
		}catch(err){
			console.log("creating folder:"+tempPath);
			fs.mkdirSync(tempPath);
		}			
		
		
		scraper.grab(mainUrl,function($1){
			
			var mytl =  $1("title").text();
			 
			$1(listFilter).each(function(i, elem) {
				 
				var href = $1(elem).attr("href");
				
				if(href.endsWith(".pdf")){
					
					return true;
				}
				
				var atitle = $1(elem).text().trim();				
				if(scraper.histories[site].indexOf(atitle)>-1){
					console.log("已下载的"+site+"文章:"+atitle);
					return true;
				}
				
				scraper.histories[site].push(atitle);
				
				scraper.startedRequestCount++;
	
				var subUrl = href; 
				
				if(!subUrl.startsWith('h')){
					subUrl = mainUrl+subUrl;
				} 				
 
				scraper.grab(subUrl,function($2){
					saveCB(subUrl,jigou,site,tempPath,$2);
				 
			  });			  
			  
			});			
				
			 
		});		 
	}
	
	function saveMOF(subUrl,jigou,site,savePath,$ct){
		 	
		var mtitle = $ct(".title_con").text().trim();
		
		var fullTxt = $ct(".TRS_Editor .TRS_Editor").text();
		
		if(!fullTxt){
			fullTxt = $ct(".TRS_Editor").text();
		}
		
		var parags = fullTxt.trim().split('\n');
		
		var topItem = parags[0]; 
		
		var mDate=topItem.slice(0,topItem.indexOf("日"));
		mDate = mDate.replace('年','-').replace('月','-');
		var mSrc=topItem.slice(topItem.indexOf('：')+1);
		 
		var pageC = getContent(parags.slice(1)); 
		
		if(mSrc.endsWith('司')){
			mSrc = site+mSrc;
		}
 
		var str = genTxt(mtitle,mSrc,jigou,mDate,pageC);
		 
		var pagePath = savePath +mDate+"/";
		
		try{		
		 fs.statSync(pagePath);
		}catch(err){
			console.log("creating folder:"+pagePath);
			fs.mkdirSync(pagePath);
		}						

		if(mtitle){
 
			saveTxt(pagePath +mtitle+'.txt', str); 			
		}else{
			console.log('!!!!!!failed:'+subUrl);
			
		}
		 
		
		finishRequest();
	}		
	
	
	
	function genTxt(mTitle,mSrc,jigou,mDate,mContent){
		  
		var str = "[标题]"+mTitle+"\r\n"; 
		str+="[来源]"+mSrc+"\r\n";
		str+="[地区]全国\r\n";	 
		str+="[机构]"+jigou+"\r\n";	 
		str+="[栏目]重大经济事件|经济数据速递\r\n";		
		str+="[专有属性]资讯类|资讯类属性\r\n";		
		str+="[日期]"+mDate+"\r\n";
		str+="[正文]\r\n"+mContent+"\r\n";		
		
		return str;
	}		
	
	 
	
	function getContent(parags){
		
		if(!parags||parags.length==0){
			return null;
		}
		
		var contentList=[];
		for(var pi=0;pi<parags.length;pi++){
	 
			var paraText = parags[pi];
			
			if(paraText.indexOf("　　")==-1){
				paraText= "　　"+paraText;
			}
			
			if(pi==parags.length-1){
				if(paraText.endsWith('）')){
					var leftCIndex = paraText.indexOf('（');
					
					if(leftCIndex!=-1){
						paraText = paraText.slice(0,leftCIndex);
					}
				}
			}
			
			contentList.push(paraText);
		}
		
		var pageC = contentList.join('\r\n');
		 
		
		return pageC;
		
	}
	
	function finishRequest(){
		scraper.endedRequestCount++;
		
		if(scraper.endedRequestCount==scraper.startedRequestCount){
			console.log("all finished======================================");
			
			var objStr = JSON.stringify(scraper.histories);
		 
			fs.writeFile("histories.json", objStr, function (error) {
				
				if (error) {
					console.log(error+" , "+objStr);
				} else {
					console.log('writed to histories.json');
				} 
			});				
		}else{
			console.log("started:"+scraper.startedRequestCount+"; finished:"+scraper.endedRequestCount);
			
		}
		
	}
		
	 
	function saveTxt(filePath, fileContent){
		
		fs.writeFile(filePath, '\ufeff'+fileContent, function (error) {
			
			if (error) {
				console.log(error+" , "+filePath);
			} else {
				console.log('writed to '+filePath);
			}
		
		});				
		
	}
	
	
 
	scraper.grab=function(url, cb, times){ 
 
		request(url, function(error, response, html){

			if(!error){
				// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
				var $ = cheerio.load(html,{decodeEntities: false});
				 		 
				cb($); 
			}
			else{
				console.log('eeror'+error);		
			}
		});			
	}
	
	scraper.log=function(msg){
		
		console.log(msg);
		
		var alltxt = loader.getNowFormatDate()+' | '+msg+ "\r\n";
		
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
		//console.log(subUrlRoot+imgurl);
		var writeStream = fs.createWriteStream(path);
		readStream.pipe(writeStream);
		 
		 readStream.on('end', function() {
			//console.log('download end');
		});
		readStream.on('error', function(err) {
			console.log(err)
		})
		writeStream.on("error", function(err) {
			//console.log("doc write finished");
		  console.log(err)
		});
		writeStream.on("finish", function() {
			//console.log("doc write finished");
			writeStream.end();
		});								
		
	}
 


	return scraper;
	

};


var sss= getScraper();
sss.start();