/**************************************************************
Build:1.3
Date:2020-02-17




***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var getScraper = function(){
	
	
	var scraper={};
	
	scraper.pages={gzf:{},gycq:{}};
	
	scraper.start=function(){
 
		scraper.run();
	}
	
	scraper.run=function(){
		console.log('Start to grab..........................');
		
		 
		var govPath='./data/gov/';
		try{		
		 fs.statSync(govPath);
		}catch(err){
			console.log("creating folder: "+govPath);
			fs.mkdirSync(govPath);
		}	
		
		scraper.gov={};	 	 
		scraper.gov.res=[];
		scraper.gov.urlTitiles=[];
		
		scraper.gov.maxClimb=12;
		scraper.gov.finishedClimb=0;
		scraper.gov.failedUrl = [];
		
		scraper.gov.max=0;
		scraper.gov.finished=0;		
		
		scraper.climb_gov('http://www.gov.cn/xinwen/lianbo/difang.htm');	 
		//gundong
		scraper.climb_gov('http://www.gov.cn/xinwen/gundong.htm');		
		
		for(i=0;i<=9;i++){
			var gurl="http://sousuo.gov.cn/column/30611/"+i+".htm";
			scraper.climb_gov(gurl);
		}
 
				 
		console.log('End to grab..........................');
	}
	
	 
   
	function sortGov(a,b){
		return b.gDateTime-a.gDateTime; 
	}
	
	scraper.save_gov=function(){
		
		//console.log('finished:'+scraper.gov_finished+", "+scraper.gov_items)
		//console.log("finished:"+scraper.gov.finished+";max:"+scraper.gov.max+";maxc:"+scraper.gov.maxClimb+";fc:"+scraper.gov.finishedClimb);
		if(scraper.gov.finished===scraper.gov.max&&scraper.gov.maxClimb===scraper.gov.finishedClimb){
		
		
			var glist=scraper.gov.res.sort(sortGov);
			
			var filestr="";
			
			var resObj={};
			
			for(var item in glist){
				
				var tempItem = glist[item];
				var temp = tempItem.gTitle+'\r\n'+tempItem.gCt+'\r\n'+tempItem.gSrc;
				//console.log(temp);
								
						
				//console.log("title:"+item.gTitle+";src:"+item.gSrc+";ct:"+item.gCt);
		
				var oldTemp=resObj[tempItem.gDate];
				
				//if(oldTemp){
				//	resObj[tempItem.gDate]=oldTemp + temp+'\r\n'+'\r\n';
				//}else{
				//	resObj[tempItem.gDate]=temp+'\r\n'+'\r\n';
				//}
				
				if(!oldTemp){
					resObj[tempItem.gDate]=[];
				}
				
				resObj[tempItem.gDate].push(temp);
				
			}
			
			for(var item in resObj){
				
				if(item){
					var tempCt=resObj[item];				
					var tempPath='./data/gov/'+item+"("+tempCt.length+").txt";

					
					fs.writeFile(tempPath, tempCt.join('\r\n\r\n'), function (error) {
						
						if (error) {
							console.log(error)
						} else {
							console.log('writed done')
						}
					});		
				}
			}
			 
		}
	}
	
 
	scraper.climb_gov=function(rootUrl){
		
		scraper.grab(rootUrl,function($content){
			scraper.gov.finishedClimb=scraper.gov.finishedClimb+1;
			
			if(!$content){
				
				return;
			}
			
			
			var lists = $content('.list.list_1.list_2 a');
			scraper.gov.max+=lists.length;
			//console.log(scraper.gov.max)
			
			lists.each(function(i, elem) {
				
				var href = $content(elem).attr("href");
				var atitle = $content(elem).text();
				
				var subUrl = '';
				if(href.startsWith('http')){
					subUrl = href;
					
				}else{
					subUrl = 'http://www.gov.cn'+href;
				}
			       
				if(scraper.gov.urlTitiles.indexOf(atitle)==-1){
					scraper.gov.urlTitiles.push(atitle);
			  
					scraper.grab(subUrl,function($content2){
						scraper.gov.finished++;

						if(!$content2){
							scraper.gov.failedUrl.push(subUrl);
						}else{
						
							saveGOV(subUrl,$content2);
						}		 
					}); 
				}else{
					console.log("重复: "+atitle);
					scraper.gov.finished++;
				}
			});		 
		}); 
	};	
	
	
	function getP(ix, arr, res, payload){
		
		if(!res){
			res=[];
			payload=0;
		}
		
		var maxC=arr.length;
		if(ix >= maxC){
			return res; 
		}
		
		if(payload==3){
			return res;
			
		}
		
		 
		var ttt = arr.eq(ix).text();
		
		if(ttt){
			res.push(ttt);
			
			if(ttt.length>56){
				payload=payload+1;
				
			}
			
		}
		
		return getP(ix+1,arr,res,payload);
		
	}
	
	function saveGOV(subUrl,$ct){
		 
		
		var mtitle = $ct(".article h1").text().trim();
		
		$ct(".pages_print").remove();
		
		var pageState=$ct(".pages-date").text().trim();
		
		var pageC="";
		var contentPs=$ct(".pages_content p");
 
		var contentList=getP(0,contentPs);
		 
		
		pageC= contentList.join('\r\n');
		 
		
		var mDate=pageState.slice(0,10);
	    var mDT=pageState.slice(0,16);
		var mSrc=pageState.slice(16).trim();

		//var str = mtitle.trim()+"\r\n";
		//str+=pageState.trim()+"\r\n";
		//str+=pageC.trim()+"\r\n=============================================================\r\n"; 
		
		
		scraper.gov.res.push({
			gDate:mDate,
			gDateTime:new Date(mDT),
			gTitle:mtitle,
			gSrc:"【"+mSrc+"】",
			gCt:pageC,
			gUrl:subUrl
			
		});
  
		scraper.save_gov();		
		
	}	
	
	  
 
	scraper.grab=function(url, cb){ 
 

		request(url, function(error, response, html){

			//console.log(response.headers);
			  
			if(!error){
				// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
				var $ = cheerio.load(html,{decodeEntities: false});
				 		 
				cb($); 
			}
			else{
				console.log(error+', failed url:'+url);
				cb();
			}
		});			
	}
	
	scraper.log=function(msg){
				fs.appendFile('./log.txt', getNowFormatDate()+' | ', function (error) {
				  if (error) {
					console.log('write failed')
				  } else {
					//console.log('writed')
				  }
				})	

				fs.appendFile('./log.txt', msg, function (error) {
				  if (error) {
					console.log('write failed')
				  } else {
					console.log('writed log')
				  }
				})		
		
				fs.appendFile('./log.txt', "\r\n", function (error) {
				  if (error) {
					console.log('write failed')
				  } else {
					//console.log('writed')
				  }
				})			
	}
	 
 
	
	
	function getNowFormatDate(){
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
		nowTime.getHours()+seperator2+nowTime.getMinutes()+seperator2+nowTime.getSeconds();
		return currentDate;
	}
 
	function getNowFormatDate2(dayoff){
		var nowTime=new Date();
		var month=nowTime.getMonth()+1;//一定要+1,表示月份的参数介于 0 到 11 之间。也就是说，如果希望把月设置为 8 月，则参数应该是 7。
		var date=nowTime.getDate(); 
		
		if(month>=1&&month<=9){
			month="0"+month;
		}
		
		date=date+dayoff;
		
		if(date<=9){
			date="0"+date;
		}
		var currentDate=nowTime.getFullYear()+'年'+month+'年'+date+'日';
		
		return currentDate;
	}	
	
	return scraper;
	

};

var sss= getScraper();
sss.start();