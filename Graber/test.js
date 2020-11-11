/**************************************************************
Build:2.1

20201109.3

save to seperate files
sites 

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
			var objStr = fs.readFileSync('loadedTitles.json', 'utf8');
			scraper.loadedTitles=JSON.parse(objStr);
		}catch(err){
			console.log('history not existing'); 
			scraper.loadedTitles={mee:[],gov:[],cenews:[]};	
			
		}	 
	}
	
	scraper.run=function(){
		console.log('Start to grab..........................');
		 
		scraper.startedRequestCount=0;
		scraper.endedRequestCount=0;
 
		var meePath='./data2/customs/';
		try{		
		 fs.statSync(meePath);
		}catch(err){
			console.log("creating folder:"+meePath);
			fs.mkdirSync(meePath);
		}		
		 
		scraper.climb_customs('http://www.customs.gov.cn/customs/302249/302274/jcyjfxwz/jcyjfxwz39/index.html');
		 
				 
		console.log('End to grab..........................');
	}
	
	
	scraper.climb_customs=function(rootUrl){
		
		scraper.grab(rootUrl,function($2){
			
			var mytl =  $2("title").text();
			
			console.log(mytl);
			
			var mctNode = $2(".conList_ull");
			
			mctNode.find('a').each(function(i, elem) {
				
				var wordurl = $2(elem).attr('href');
				var wName = $2(elem).text();
				
				var dt = $2(elem).next();
				
				var pagePath='./data2/customs/' +dt.text()+"/";
				
				//var pp = $2(elem).parent();
				
				//$2(pp).text(imgurl);//replace mark
				//console.log(imgName);
															
				saveWord(rootUrl+imgurl,pagePath+ wName+".doc");					
			});				
				
			  
			 
		});			
				 
	}
	
	scraper.loadCookie = function(code,header){
			code = code.replace('eval','jasonY').replace('eval','getCode2').replace('jasonY','eval')
	 
			scraper.ydyl_code="";
			
			
			//console.log("code="+code);
			
			eval(code);
			//console.log(scraper.ydyl_code);
			
			global.setTimeout2=global.setTimeout;
			global.setTimeout=function(cmd,intv){
				console.log(cmd);	
				 
			}
			global.window={};
			if(!global.document){
				global.document = {attachEvent:function(evName,cb){
					cb(); 
				}}; 
			 
				var setCk=header['set-cookie'][0];
				global.document.setCookie=setCk.slice(0,setCk.indexOf(';'));
			}
			eval(scraper.ydyl_code);
			
			//console.log(global.document)
		
	}
 
	 
	function saveCustoms(subUrl, $2){

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

			console.log(response.statusCode);
			  
			if(!error){
				// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
				var $ = cheerio.load(html,{decodeEntities: false});
				
				if(response.statusCode==412){
					
					var scrs = $("script");
					
					var s2=scrs.eq(1);
					
					console.log(s2.text());
					global.window={};
					global.document={};
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
	 
	
	
	function saveWord(url, path){
		 
		 
		
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