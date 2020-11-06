/**************************************************************
Build:1.1





***************************************************************/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

exports.getScraper = function(){
	
	
	var scraper={};
	
	scraper.pages={gzf:{},gycq:{}};
	
	scraper.start=function(){
		//setInterval(scraper.run,10000);
		
		scraper.run();
	}
	
	scraper.run=function(){
		console.log('Start to grab..........................');
		
		/*
		scraper.grab('http://www.bphc.com.cn/article/list/b02e7e29e33642f789e4d1e41db08b7d.html',function($){
			
			var json = { 
				title : $("title").text(), 
				time:new Date(), 
				post: {
					subject:$(".publicity .list-right h2").first().text(),
					month:$(".publicity .list-left2").first().text(),
					day:$(".publicity .list-left1").first().text(),
					url:$(".publicity a").first().prop("href"),
					summary:$(".publicity ul li").first().text()
				}
			}; 
			
			scraper.pages.gzf=json;
		});
		
		scraper.grab('http://zzfws.bjjs.gov.cn/enroll/home.jsp',function($){
			
			var json = { 
				title : $("title").text(), 
				time:new Date(), 
				project: {
					summary:$("#projectContainer .ProjInfo").first().text(),
					subject:$("#projectContainer caption").first().text()
				}
			}; 
			
			scraper.pages.gycq=json;
		});		
		
		*/
		/**/	
		
		var meePath='./data/mee/';
		try{		
		 fs.statSync(meePath);
		}catch(err){
			console.log("creating folder:"+meePath);
			fs.mkdirSync(meePath);
		}		
		 
		scraper.climb_mee('http://www.mee.gov.cn/ywdt/hjywnews/');
		
		scraper.climb_mee('http://www.mee.gov.cn/ywdt/dfnews/');		
		
		var cnPath='./data/cenews/';
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

	
	
		var govPath='./data/gov/';
		try{		
		 fs.statSync(govPath);
		}catch(err){
			console.log("creating folder: "+govPath);
			fs.mkdirSync(govPath);
		}	
		
		scraper.gov={};	 	 
		scraper.gov.res=[];
		scraper.gov.urls=[];
		scraper.gov.maxClimb=16;
		scraper.gov.finishedClimb=0;
		
		scraper.gov.max=0;
		scraper.gov.finished=0;		
		
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

				console.log(href);
				var subUrl=rootUrl+href;
				//var subUrl='http://www.mee.gov.cn/ywdt/dfnews/202002/t20200206_761584.shtml';
				scraper.grab(subUrl,function($2){
				  
				 
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

					var mctNode = $2(".neiright_JPZ_GK_CP");
					
					if(!mctNode){
						mctNode = $2(".content_body_box");
						
					}
					var lastIndex= subUrl.lastIndexOf('/');
					var subUrlRoot = subUrl.slice(0,lastIndex +1);
					var pageName= subUrl.slice(lastIndex-subUrl.length+1);
					var pagePath='./data/mee/' +mtime+"/";
						
		
					try{		
					 fs.statSync(pagePath);
					}catch(err){
						console.log("creating folder:"+pagePath);
						fs.mkdirSync(pagePath);
					}
 					
					/*
					mctNode.find('img').each(function(i, elem) {
						
						var imgurl = $2(elem).attr('src');
						var imgName = imgurl.slice(imgurl.lastIndexOf('/')+1);
						var pp = $2(elem).parent();
						
						$2(pp).text(imgurl);//replace mark
						//console.log(imgName);
																	
						saveImg(subUrlRoot+imgurl,pagePath+ imgName);					
					});
					*/
					
					var mct=mctNode.text();								
					 
					console.log("No: "+i+"; doc:"+href+"; title:"+mtitle);

					var str = "[标题]"+mtitle+"\r\n";
					str+="[来源]"+msrc+"\r\n";
					str+="[栏目]\r\n";
					str+="[地区]\r\n";	  
					str+="[日期]"+mtime+"\r\n";
					str+="[正文]\r\n"+mct.trim()+"\r\n";

					fs.writeFile(pagePath +mtitle+'.txt', str, function (error) {
					  if (error) {
						console.log(error)
						
					  } else {
						console.log('writed context')
					  }
					});	
			  });			  
			  
			});			
				
			 
		});			
				
		
		
	}
	
	
	scraper.climb_cenews=function(rootUrl){
		
		scraper.grab(rootUrl,function($content){
			
			$content('.list_txt a').each(function(i, elem) {
				var href = $content(elem).attr("href");
				console.log(href);
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
				console.log(href);
				 
				 var subUrl = href;
				 var dotIndex=href.indexOf('./');
				
				if(dotIndex>-1){
					subUrl = rootUrl+href;
				} 
				
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
	
	function saveTxt(filePath, fileContent){
		
		fs.writeFile(filePath, fileContent, function (error) {
			
		if (error) {
			console.log(error+" , "+filePath);
		} else {
			console.log('writed to '+filePath);
		}
		
		});				
		
	}
	
	scraper.climb_gov=function(rootUrl){
		
		scraper.grab(rootUrl,function($content){
			scraper.gov.finishedClimb=scraper.gov.finishedClimb+1;
			var lists = $content('.list.list_1.list_2 a');
			scraper.gov.max+=lists.length;
			console.log(scraper.gov.max)
			
			lists.each(function(i, elem) {
				
				var href = $content(elem).attr("href");
				
				var subUrl = '';
				if(href.startsWith('http')){
					subUrl = href;
					
				}else{
					subUrl = 'http://www.gov.cn'+href;
				}
			       
				if(scraper.gov.urls.indexOf(subUrl)==-1){
					scraper.gov.urls.push(subUrl);
			  
					scraper.grab(subUrl,function($content2){
						 
						saveGOV(subUrl,$content2);
										 
					}); 
				}else{
					console.log("重复的文章:"+subUrl);
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
 
		scraper.gov.finished++;
		scraper.save_gov();		
		
	}	
	
	 
	function saveCenews(subUrl,$ct){
		 
		var mtitle = $ct(".hjbwap-xiangqing-h2").text();
		mtitle=mtitle.replace('"',"“").replace('"',"“").replace('|',' ');
	 
		var mtime=$ct(".public_func span").eq(0).text();
		var mauthor=$ct(".public_func span").eq(1).text();					
		var msrc=$ct(".public_func span").eq(2).text();

		var mct=$ct(".TRS_Editor").text();	
		
		
		mtime=mtime.replace('年','-').replace('月','-').replace('日','');

		var str = "[标题]"+mtitle+"\r\n";
		str+="[作者]"+mauthor.slice(3)+"\r\n";
		str+="[来源]"+msrc.slice(3)+"\r\n";
		str+="[栏目]\r\n";
		str+="[地区]\r\n";	  
		str+="[日期]"+mtime+"\r\n";
		str+="[正文]\r\n"+mct.trim()+"\r\n";

		var pagePath='./data/cenews/' +mtime+"/";
		
		try{		
		 fs.statSync(pagePath);
		}catch(err){
			console.log("creating folder:"+pagePath);
			fs.mkdirSync(pagePath);
		}					
		
		if(mtitle){
			fs.writeFile(pagePath +mtitle+'.txt', str, function (error) {
			  if (error) {
				console.log(error)
				
			  } else {
				console.log('writed context')
			  }
			});						
		}else{
			console.log('!!!!!!failed:'+subUrl);
			
		}			
		
	}
	
	function saveWx($ct){
		var mtitle = $ct(".rich_media_title").text().trim();
		mtitle=mtitle.replace('"',"“").replace('"',"“").replace('|',' ');
						
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

		var pagePath='./data/cenews/' +mtime+"/";

		try{		
		 fs.statSync(pagePath);
		}catch(err){
			console.log("creating folder:"+pagePath);
			fs.mkdirSync(pagePath);
		}					

		if(mtitle){
			fs.writeFile(pagePath +mtitle+'.txt', str, function (error) {
			  if (error) {
				console.log(error)
				
			  } else {
				console.log('writed context')
			  }
			});						
		}else{
			console.log('!!!!!!failed:'+subUrl);
			
		}			
		
		
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