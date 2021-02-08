/**************************************************************
Build:2.1

20201109.3

save to seperate files
sites 

***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
const window = require('window');

var getScraper = function(){
	 
	var scraper={};
	 
	scraper.start=function(){ 
		scraper.run();
	}
	 
	
	scraper.run=function(){
		console.log('Start to grab..........................');
		 
		scraper.startedRequestCount=0;
		scraper.endedRequestCount=0;
		scraper.proviceDict={};
 
		var meePath='./data2/huixin/';
		try{		
		 fs.statSync(meePath);
		}catch(err){
			console.log("creating folder:"+meePath);
			fs.mkdirSync(meePath);
		}		
		 
		scraper.climb('https://www.huixinyun.com/policydeclaration/detail?id=11605');
		 
				 
		console.log('End to grab..........................');
	}
	
	
	scraper.climb=function(rootUrl){
		
		scraper.grab(rootUrl,function($2){
			
			var mytl =  $2("title").text();
			
			console.log(mytl);
			
			var contents = $2("#contentInput").val();
			
			//console.log(contents);
			$2("#content").html(contents);
			
			var currentProvice="";
			/*
			var firstEle = $2("#content").children()[0];
			
			console.log(firstEle);
			*/ 
			
			$2("#content>p>span").each(function(i, elem) {
				
				var eleText = $2(elem).text();
				
				if(eleText.indexOf("【")==0){
					currentProvice = eleText.replace("【","").replace("】","");
				}else if(eleText.indexOf("三五年远景目标的建议")>0){
					 
					var subUrl = $2(elem).find("a").attr('href');
					
					console.log(subUrl);
					
					if(subUrl){
					
						var pageid = getPageId(subUrl);
						scraper.proviceDict[pageid] = currentProvice;
						var wName = $2(elem).text();
						
						scraper.startedRequestCount++;
						
						scraper.grab(subUrl,function($3){
							saveHuixin(subUrl,$3);
						 
						});				
					}								
		 		}		
			});				
				
			
			 
		});			
				 
	}
	
	function getPageId(url){
		
		var pageName = url.slice(url.lastIndexOf("/")+1);
		
		return pageName.replace(".html","");
		
	}
	
	 
	function saveHuixin(subUrl, $2){

		$2(".title-view .title a").remove();
		var mtitle = $2(".title-view .title").text().trim();
	  
		var mtime =  $2(".notice-num span").eq(1).text().trim();
		 
		 
		var msrc="";

		
 
		var pes = $2(".news-info p");
		var parags=[];
		for(var pi=0;pi<pes.length;pi++){
			var tp=pes.eq(pi);
			parags.push(tp.text());
		}			
		
		var mct=getContent(parags);
		
		var pageid = getPageId(subUrl);
		var myProvice = scraper.proviceDict[pageid];		
			  
		var pagePath='./data2/huixin/' +myProvice+"/";
			 
		try{		
		 fs.statSync(pagePath);
		}catch(err){
			console.log("creating folder:"+pagePath);
			fs.mkdirSync(pagePath);
		}
		 
		var str = "[标题]"+mtitle+"\r\n";
		str+="[来源]"+msrc+"\r\n";
		str+="[地区]\r\n";	
		str+="[作者]\r\n";	
		str+="[摘要]\r\n";	
		str+="[关键字]\r\n"; 
		str+="[栏目]\r\n";		
		str+="[专有属性]\r\n";  
		str+="[日期]"+mtime+"\r\n";
		str+="[正文]\r\n"+mct+"\r\n";

		saveTxt(pagePath +mtitle+'.txt', str); 
		 
		finishRequest();
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
			console.log("all finished======================================"+scraper.startedRequestCount);
			 
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

			console.log(response.statusCode);
			  
			if(!error){
				// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
				var $ = cheerio.load(html,{decodeEntities: false});
				
				if(response.statusCode==412){
					
					var scrs = $("script");
					
					var s2=scrs.eq(1);
					
					console.log(s2.html());
				 
					global.document=window.document;
					eval(s2.html());
				}
				
				cb($); 
			}
			else{
				console.log('eeror'+error);
				
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
	 
	 


	return scraper;
	

};



var sss= getScraper();
sss.start();