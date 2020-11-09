/**************************************************************
Build:2.1

20201109.3

save to seperate files
sites
http://www.mee.gov.cn/ywdt/hjywnews/
https://www.cenews.com.cn/opinion/hjsp/
http://www.gov.cn/xinwen/lianbo/difang.htm

***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

exports.getScraper = function(){
	
	
	var scraper={};
	 
	scraper.start=function(){ 
		scraper.run();
	}
	
	scraper.loadHis=function(){
		
		try{	
			var objStr = fs.readFileSync('loadedTitles.json', 'utf8');
			scraper.loadedTitles=JSON.parse(objStr);
		}catch(err){
			console.log('history not existing'); 
			scraper.loadedTitles={mee:[],gov:[],cenews:[]};	
			
		}	 
	}
	
	scraper.run=function(){
		console.log('Start to grab..........................');
		
		scraper.loadHis();
		  
		scraper.startedRequestCount=0;
		scraper.endedRequestCount=0;
 
		var meePath='./data2/mee/';
		try{		
		 fs.statSync(meePath);
		}catch(err){
			console.log("creating folder:"+meePath);
			fs.mkdirSync(meePath);
		}		
		 
		scraper.climb_mee('http://www.mee.gov.cn/ywdt/hjywnews/');
		
		scraper.climb_mee('http://www.mee.gov.cn/ywdt/dfnews/');		
		
		var cnPath='./data2/cenews/';
		try{		
		 fs.statSync(cnPath);
		}catch(err){
			console.log("creating folder:"+cnPath);
			fs.mkdirSync(cnPath);
		}	
		//pinglun
		scraper.climb_cenews('https://www.cenews.com.cn/opinion/hjsp/');
		//touzi
		scraper.climb_cenews('https://www.cenews.com.cn/pollution_ctr/xydt/');		
		//lingdao
		scraper.climb_cenews('https://www.cenews.com.cn/leader/talk/');		
		//zhiliang
		scraper.climb_cenews('https://www.cenews.com.cn/environment/zlfb/');
 
		scraper.climb_cenews2('https://www.cenews.com.cn/news/');
		
		scraper.climb_cenews3('https://www.cenews.com.cn/news/index_1445_1.html');
	
		var govPath='./data2/gov/';
		try{
		 fs.statSync(govPath);
		}catch(err){
			console.log("creating folder: "+govPath);
			fs.mkdirSync(govPath);
		}	
		 
		 
		scraper.climb_gov('http://www.gov.cn/xinwen/lianbo/difang.htm');	 
		//gundong
		
		for(i=1;i<=15;i++){
			var gurl="http://sousuo.gov.cn/column/30611/"+i+".htm";
			scraper.climb_gov(gurl);
		}
 
				 
		console.log('End to grab..........................');
	}
	
	
	scraper.climb_mee=function(rootUrl){
		
		scraper.grab(rootUrl,function($){
			
			var mytl =  $("title").text();
			 
			$('.cjcx_biaob').each(function(i, elem) {
				 
				var href = $(elem).attr("href");
				
				var atitle = $(elem).text();				
				if(scraper.loadedTitles.mee.indexOf(atitle)>-1){
					console.log("已下载的mee文章:"+atitle);
					return true;
				}
				
				scraper.loadedTitles.mee.push(atitle);
				
				scraper.startedRequestCount++;
				//console.log(href);
				var subUrl=rootUrl+href;
				//var subUrl='http://www.mee.gov.cn/ywdt/dfnews/202002/t20200206_761584.shtml';
				scraper.grab(subUrl,function($2){
					saveMee(subUrl,$2);
				 
			  });			  
			  
			});			
				
			 
		});			
				 
	}
	
	
	scraper.climb_cenews=function(rootUrl){
		
		scraper.grab(rootUrl,function($content){
			
			$content('.list_txt a').each(function(i, elem) {
				var href = $content(elem).attr("href");
				
				var atitle = $content(elem).text();				
				if(scraper.loadedTitles.cenews.indexOf(atitle)>-1){
					console.log("已下载的cenews文章:"+atitle);
					return true;
				}
				
				scraper.loadedTitles.cenews.push(atitle);
				
				scraper.startedRequestCount++;
				
				var subUrl = rootUrl+href;
				scraper.grab(subUrl,function($content2){
					//var mytl =  $content2("title").text();
					saveCenews(subUrl,$content2);
					
					 				 
				});
 
			});			
			  
		}); 
	}
	
	
	scraper.climb_cenews2=function(rootUrl){
		
		scraper.grab(rootUrl,function($content){
			
			$content('#moreli .cjlisttil a').each(function(i, elem) {
				var href = $content(elem).attr("href");
 
				 var subUrl = href;
				 var dotIndex=href.indexOf('./');
				
				if(dotIndex>-1){
					subUrl = rootUrl+href;
				} 
				
				var atitle = $content(elem).text();				
				if(scraper.loadedTitles.cenews.indexOf(atitle)>-1){
					console.log("已下载的cenews文章:"+atitle);
					return true;
				}
				
				scraper.loadedTitles.cenews.push(atitle);
				
				scraper.startedRequestCount++;				
				
				scraper.grab(subUrl,function($content2){
					
					if(dotIndex>-1){
						saveCenews(subUrl,$content2);
					}else{
						saveWx($content2);
						
					}
					  		 
				}); 
				
			});				
			 
		});
		 
	};

	scraper.climb_cenews3=function(rootUrl){
		
		scraper.grab(rootUrl,function($content){
			
			$content('.cjlisttil a').each(function(i, elem) {
				//console.log(elem);
				var href = $content(elem).attr("href");
			  
				 var subUrl = href;
				 var dotIndex=href.indexOf('./');
				
				if(dotIndex>-1){
					subUrl = 'https://www.cenews.com.cn/news/'+href;
				} 
				
				var atitle = $content(elem).text();				
				if(scraper.loadedTitles.cenews.indexOf(atitle)>-1){
					console.log("已下载的cenews文章:"+atitle);
					return true;
				}
				
				scraper.loadedTitles.cenews.push(atitle);
				
				scraper.startedRequestCount++;				
				
				scraper.grab(subUrl,function($content2){
					
					if(dotIndex>-1){
						saveCenews(subUrl,$content2);
					}else{
						saveWx($content2);
						
					}
					  		 
				}); 
				
			});				
			 
		});
		 
	};

	scraper.climb_gov=function(rootUrl){
		
		scraper.grab(rootUrl,function($content){
		 
			var lists = $content('.list.list_1.list_2 a');
	   
			lists.each(function(i, elem) {
				
				var href = $content(elem).attr("href");
				
				var subUrl = '';
				if(href.startsWith('http')){
					subUrl = href;
					
				}else{
					subUrl = 'http://www.gov.cn'+href;
				}
				
				var atitle = $content(elem).text();				
				if(scraper.loadedTitles.gov.indexOf(atitle)>-1){
					console.log("已下载的gov文章:"+atitle);
					return true;
				}
				
				scraper.loadedTitles.gov.push(atitle);
				
				scraper.startedRequestCount++;				
			        
				scraper.grab(subUrl,function($content2){
					 
					saveGOV(subUrl,$content2);
									 
				}); 
			 
			});		 
		}); 
	};	
	 
	function saveMee(subUrl, $2){

		var mtitle = $2(".neiright_Title").text();
		
		if(!mtitle){
			mtitle=$2(".cjcs_phone_title").text();
		}
		
		var mtime =  $2(".time").text();
		
		if(!mtime){
			$2(".content_top_box div").each(function(i, elem) {
				var lbl=$2(elem.children[0]).text();
				var dtVal=elem.children[1];
				
				//scraper.log(lbl);
				
				if(lbl=="生成日期"){					
					//console.log(dtVal.data);
					mtime=dtVal.data; 
				}
				
				if(lbl=="发布机关"){					
					//console.log(dtVal);
					msrc=$2(dtVal).text();					
				}						
			});												
		}
		 
		var msrc=$2(".xqLyPc").last().text();
		
		if(!msrc){
			 
		}
		else{
			msrc=msrc.slice(3); 
		}

		var mct="";

		var mctNode = $2(".neiright_JPZ_GK_CP");
		
		if(!mctNode){
			mct = $2(".content_body_box").text();
			
		}else{
			var parags = $2(".neiright_JPZ_GK_CP p");
			mct = getContent(parags);
			
			if(!mct){
				parags = $2(".neiright_JPZ_GK_CP div");
				mct = getContent(parags);	
			}			
		}
		
		var lastIndex= subUrl.lastIndexOf('/');
		var subUrlRoot = subUrl.slice(0,lastIndex +1);
		var pageName= subUrl.slice(lastIndex-subUrl.length+1);
		var pagePath='./data2/mee/' +mtime+"/";
			

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
	
	function saveGOV(subUrl,$ct){
		 
		
		var mtitle = $ct(".article h1").text().trim();
		
		$ct(".pages_print").remove();
		
		var pageState=$ct(".pages-date").text().trim();
		
		var parags = $ct(".pages_content p");
		//
		//var contentList=[];
		//for(var pi=0;pi<parags.length;pi++){
		//	var tp=parags.eq(pi);
		//	contentList.push("　　"+tp.text());
		//}
		//
		//var pageC = contentList.join('\r\n');
		//var pageC=$ct(".pages_content").text();
		var pageC = getContent(parags);
		 
		
		var mDate=pageState.slice(0,10);
	    var mDT=pageState.slice(0,16);
		var mSrc=pageState.slice(16).trim();

		//var str = mtitle.trim()+"\r\n";
		//str+=pageState.trim()+"\r\n";
		//str+=pageC.trim()+"\r\n=============================================================\r\n"; 
		
		var str = "[标题]"+mtitle+"\r\n"; 
		str+="[来源]"+mSrc.slice(4)+"\r\n";
		str+="[地区]\r\n";	
		str+="[作者]\r\n";	
		str+="[摘要]\r\n";	
		str+="[关键字]\r\n"; 
		str+="[栏目]\r\n";		
		str+="[专有属性]\r\n";		
		str+="[日期]"+mDate+"\r\n";
		str+="[正文]\r\n"+pageC+"\r\n";		
		
		var pagePath='./data2/gov/' +mDate+"/";
		
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
	
	 
	function saveCenews(subUrl,$ct){
		 
		var mtitleOld = $ct(".hjbwap-xiangqing-h2").text();
		var mtitle=mtitleOld.replace('"',"“").replace('"',"“").replace('|',' ');
	 
		var mtime=$ct(".public_func span").eq(0).text();
		var mauthor=$ct(".public_func span").eq(1).text();					
		var msrc=$ct(".public_func span").eq(2).text();

		//var mct=$ct(".TRS_Editor").text();	
		var parags = $ct(".TRS_Editor p");
		var pageC = getContent(parags);
		
		mtime=mtime.replace('年','-').replace('月','-').replace('日','');

		var str = "[标题]"+mtitle+"\r\n";
		str+="[作者]"+mauthor.slice(3)+"\r\n";
		str+="[来源]"+msrc.slice(3)+"\r\n";
		str+="[栏目]\r\n";
		str+="[地区]\r\n";	  
		str+="[日期]"+mtime+"\r\n";
		str+="[正文]\r\n"+pageC+"\r\n";

		var pagePath='./data2/cenews/' +mtime+"/";
		
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
	
	function saveWx($ct){
		var mtitleOld = $ct(".rich_media_title").text().trim();
		var mtitle=mtitleOld.replace('"',"“").replace('"',"“").replace('|',' ');
						
		var mtime=$ct("em.rich_media_meta.rich_media_meta_text").text().trim();
	 
		if(!mtime){
			
			var timeSpStr='';
			var timeSp=$ct('script').filter(function(i, el) {
				var spText=$ct(el).html();
			 
				if(spText.indexOf('publish_time')>-1){
					timeSpStr=spText;
					return true;
				}
				return false; 
			});
			
			var spRows = timeSpStr.split('\n');
			
			
			
			var timeStr = spRows[7].slice(37,47);
			//var timeStr2=timeStr.replace('-','年').replace('-','月')+'日';
			
			mtime=timeStr;
		}
		
		var mauthor=$ct("span.rich_media_meta.rich_media_meta_text").text().trim();					
		var msrc=$ct(".rich_media_meta.rich_media_meta_nickname a").text().trim();

		var mct=$ct(".rich_media_content").text().trim();	


		var str = "[标题]"+mtitle+"\r\n";
		str+="[作者]"+mauthor+"\r\n";
		str+="[来源]"+msrc+"\r\n";
		str+="[栏目]\r\n";
		str+="[地区]\r\n";	  
		str+="[日期]"+mtime+"\r\n";
		str+="[正文]\r\n"+mct+"\r\n";

		var pagePath='./data2/cenews/' +mtime+"/";

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
	
	function getContent(parags){
		
		if(!parags||parags.length==0){
			return null;
		}
		
		var contentList=[];
		for(var pi=0;pi<parags.length;pi++){
			var tp=parags.eq(pi);
			var paraText = tp.text();
			
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
			
			var objStr = JSON.stringify(scraper.loadedTitles);
			saveTxt("loadedTitles.json",objStr); 		
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

			//console.log(response.headers);
			  
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