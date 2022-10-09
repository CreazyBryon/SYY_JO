/**************************************************************
Build:2.1

20210305

 
http://www.chinanews.com/cj/gd.shtml
https://kuaixun.stcn.com/

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
			var objStr = fs.readFileSync('histories3.json', 'utf8');
			scraper.histories=JSON.parse(objStr);
		}catch(err){
			console.log('history not existing:'+err); 
			scraper.histories={'中新网':[],'证券快讯':[]};	
			
		}	 
		
		
	}
	
	scraper.run=function(){
		console.log('Start to grab..........................');
		
		scraper.loadHis();
		  
		scraper.startedRequestCount=0;
		scraper.endedRequestCount=0;
  
		scraper.climb('财政部','http://www.chinanews.com/cj/gd.shtml','.xwfb_listerji a',saveMOF);
		
		scraper.climb('商务部','http://www.mofcom.gov.cn/article/tongjiziliao/v/','.txtList_01 a',saveMOFCOM,'http://www.mofcom.gov.cn');			
		scraper.climb('商务部','http://www.mofcom.gov.cn/article/tongjiziliao/dgzz/','.txtList_01 a',saveMOFCOM,'http://www.mofcom.gov.cn');
				 

		console.log('End to grab..........................');
	}
	
	scraper.climb=function(site, mainUrl, listFilter, saveCB, rootUrl){
		
		var tempPath='./data2/'+site+'/';
		try{		
		 fs.statSync(tempPath);
		}catch(err){
			console.log("creating folder:"+tempPath);
			fs.mkdirSync(tempPath);
		}			
		 
		scraper.grab(mainUrl,function($1){
			
			var mytl =  $1("title").text();
			//console.log(mainUrl);
			 
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
					if(subUrl.startsWith('/')){
						subUrl = rootUrl+subUrl;
					}else{
						subUrl = mainUrl+subUrl;
					}
				} 	 
				
				scraper.grab(subUrl,function($2){
					saveCB(subUrl,site,tempPath,$2);
				 
			  });	 
			});		 
		});		 
	}
	
	function saveMOF(subUrl,site,savePath,$ct){
		 	
		var mtitle = $ct(".title_con").text().trim();
		
		if(mtitle){
			
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
	 
			var str = genTxt(mtitle,mSrc,'机构|职能部门|国家-财政',mDate,pageC);
			 
			var pagePath = savePath +mDate+"/";
			
			try{		
			 fs.statSync(pagePath);
			}catch(err){
				console.log("creating folder:"+pagePath);
				fs.mkdirSync(pagePath);
			}						

		
 
			saveTxt(pagePath +mtitle+'.txt', str); 			
		}else{
			console.log('!!!!!!Unknown page:'+subUrl);
			
		}
		 
		
		finishRequest();
	}		
	
	function saveMOFCOM(subUrl,site,savePath,$ct){
		 	
		var mtitle = $ct(".art-title").text().trim();
		
		if(mtitle){
			
			var pes = $ct(".art-con p");
			var parags=[];
			for(var pi=0;pi<pes.length;pi++){
				var tp=pes.eq(pi);
				parags.push(tp.text());
			}		
			
			var pageC = getContent(parags); 
			
			//$ct('.at-left script').remove();		  
			//var topItems = $ct('.at-left p').text().trim().split('\n');	
			//var mSrc = $ct('.at-left p').text().trim();//topItems[0].slice(3);
			//var mDate=topItems[1].slice(-16,-6);
			 
			var script1 = $ct('body script').eq(0).html();
			//console.log(script1);
			eval(script1);
			var mSrc = source;
			var mDate = tm.slice(0,10);
			
			if(!mSrc.startsWith(site) && mSrc.endsWith('司')){
				mSrc = site+mSrc;
			}
	 
			var str = genTxt(mtitle,mSrc,'机构|职能部门|国家-商务',mDate,pageC);
			 
			var pagePath = savePath +mDate+"/";
			
			try{		
			 fs.statSync(pagePath);
			}catch(err){
				console.log("creating folder:"+pagePath);
				fs.mkdirSync(pagePath);
			}						
 
			saveTxt(pagePath +mtitle+'.txt', str); 			
		}else{
			console.log('!!!!!!Unknown page:'+subUrl);
			
		}
		 
		
		finishRequest();
	}		
	
	function saveNDRC(subUrl,site,savePath,$ct){
		 	
		var mtitle = $ct(".article_title").text().trim();
		
		if(mtitle){
			
			var pes = $ct(".TRS_Editor p");
			
			if(!pes||pes.length==0){
				pes = $ct(".TRS_Editor>div");
			}
			
			if(pes.length==1){
				var f1=pes.eq(0).text();
				
				if(f1.trim().startsWith('（')){
					pes = $ct(".TRS_Editor>div");
				}
			}			
			
			var parags=[];
			for(var pi=0;pi<pes.length;pi++){
				var tp=pes.eq(pi);
				parags.push(tp.text());
			}		
			
			var pageC = getContent(parags); 
			
			var mDate = $ct('.time').text().slice(5).replace('/','-').replace('/','-');		
			var mSrc = $ct('.laiyuantext span').text();		
			 
			
			if(!mSrc.startsWith(site) && (mSrc.endsWith('室')||mSrc.endsWith('局'))){
				mSrc = site+mSrc;
			}
	 
			var str = genTxt(mtitle,mSrc,'机构|职能部门|国家-发改',mDate,pageC);
			 
			var pagePath = savePath +mDate+"/";
			
			try{		
			 fs.statSync(pagePath);
			}catch(err){
				console.log("creating folder:"+pagePath);
				fs.mkdirSync(pagePath);
			}						
 
			saveTxt(pagePath +mtitle+'.txt', str); 			
		}else{
			console.log('!!!!!!Unknown page:'+subUrl);
			
		}
		 
		
		finishRequest();
	}		
	
	function saveST(subUrl,site,savePath,$ct){
		 	
		var mtitle = $ct(".xilan_tit").text().trim();
		
		if(mtitle){
			
			var pes = $ct(".TRS_Editor p");
			var parags=[];
			for(var pi=0;pi<pes.length;pi++){
				var tp=pes.eq(pi);
				parags.push(tp.text());
			}	
			  
			var pageC = getContent(parags); 
			
			var mDate = $ct('.xilan_titf').text().trim().slice(-16,-6)	
			var mSrc = $ct('.xilan_titf font font').text().trim();		
			 
 
			var str = genTxt(mtitle,mSrc,'机构|职能部门|国家-统计',mDate,pageC);
			 
			var pagePath = savePath +mDate+"/";
			
			try{		
			 fs.statSync(pagePath);
			}catch(err){
				console.log("creating folder:"+pagePath);
				fs.mkdirSync(pagePath);
			}						
 
			saveTxt(pagePath +mtitle+'.txt', str); 			
		}else{
			console.log("!!!!!!!!!!!!!!!!!!!!!!Unknown page:"+subUrl);
			
		}
		 
		
		finishRequest();
	}		
	
	function genTxt(mTitle,mSrc,jigou,mDate,mContent){
		
		if(!mContent){
			
			console.log("!!!!!!!!!!!!!!!!!!!!!!No cotent, date:"+mDate);
		}
		  
		
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
		 
			fs.writeFile("histories3.json", objStr, function (error) {
				
				if (error) {
					console.log(error+" , "+objStr);
				} else {
					console.log('writed to histories3.json');
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
				console.log('error:'+error);		
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