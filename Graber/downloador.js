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
		 
		/*
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091411294002.png','./img/002.png');
		//saveImg('https://cdn2.jianshu.io/assets/default_avatar/9-cceda3cf5072bcdd77e8ca4f21c40998.jpg','./img/1.jpg');		
 
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091412950003.png','./img/003.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091412479004.png','./img/004.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091412358005.png','./img/005.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091412813006.png','./img/006.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091413636007.png','./img/007.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091413264008.png','./img/008.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091413464009.png','./img/009.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091414239010.png','./img/010.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091414586011.png','./img/011.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091414978012.png','./img/012.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091415281013.png','./img/013.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091415803014.png','./img/014.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091415286015.png','./img/015.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091415542016.png','./img/016.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091416975017.png','./img/017.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091416897018.png','./img/018.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091416770019.png','./img/019.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091416181020.png','./img/020.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091417678021.png','./img/021.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091417108022.png','./img/022.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091417800023.png','./img/023.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091417714024.png','./img/024.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091417309025.png','./img/025.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091418884026.png','./img/026.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091418912027.png','./img/027.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091418504028.png','./img/028.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091419116029.png','./img/029.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091419285030.png','./img/030.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091419805031.png','./img/031.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091420162032.png','./img/032.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091420651033.png','./img/033.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091420417034.png','./img/034.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091421491035.png','./img/035.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091421606036.png','./img/036.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091421486037.png','./img/037.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091422286038.png','./img/038.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091422847039.png','./img/039.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091422682040.png','./img/040.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091423130041.png','./img/041.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091423402042.png','./img/042.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091423492043.png','./img/043.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091423453044.png','./img/044.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091424585045.png','./img/045.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091424460046.png','./img/046.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091425315047.png','./img/047.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091425426048.png','./img/048.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091425298049.png','./img/049.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091425900050.png','./img/050.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091425105051.png','./img/051.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091426206052.png','./img/052.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091426687053.png','./img/053.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091427265054.png','./img/054.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091427312055.png','./img/055.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091427453056.png','./img/056.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091428128057.png','./img/057.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091428698058.png','./img/058.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091428146059.png','./img/059.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091429460060.png','./img/060.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091429408061.png','./img/061.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091429373062.png','./img/062.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091430233063.png','./img/063.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091430609064.png','./img/064.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091430624065.png','./img/065.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091430160066.png','./img/066.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091431542067.png','./img/067.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091431562068.png','./img/068.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091431615069.png','./img/069.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091432732070.png','./img/070.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091432669071.png','./img/071.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091432919072.png','./img/072.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091433314073.png','./img/073.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091433976074.png','./img/074.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091433368075.png','./img/075.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091433363076.png','./img/076.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091434665077.png','./img/077.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091434305078.png','./img/078.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091434235079.png','./img/079.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091435395080.png','./img/080.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091435414081.png','./img/081.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091435324082.png','./img/082.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091436489083.png','./img/083.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091436132084.png','./img/084.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091437598085.png','./img/085.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091437734086.png','./img/086.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091437595087.png','./img/087.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091438450088.png','./img/088.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091438167089.png','./img/089.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091438247090.png','./img/090.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091438566091.png','./img/091.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091439432092.png','./img/092.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091439851093.png','./img/093.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091439577094.png','./img/094.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091440608095.png','./img/095.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091440978096.png','./img/096.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091440259097.png','./img/097.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091441117098.png','./img/098.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091441263099.png','./img/099.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091441931100.png','./img/100.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091442407101.png','./img/101.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091442282102.png','./img/102.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091443360103.png','./img/103.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091443782104.png','./img/104.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091443934105.png','./img/105.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091444545106.png','./img/106.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091444329107.png','./img/107.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091444912108.png','./img/108.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091445805109.png','./img/109.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091445493110.png','./img/110.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091446974111.png','./img/111.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091446734112.png','./img/112.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091446536113.png','./img/113.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091447560114.png','./img/114.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091447358115.png','./img/115.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091447921116.png','./img/116.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091448261117.png','./img/117.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091448810118.png','./img/118.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091449695119.png','./img/119.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091449208120.png','./img/120.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091450457121.png','./img/121.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091450684122.png','./img/122.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091450132123.png','./img/123.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091450673124.png','./img/124.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091450187125.png','./img/125.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091451940126.png','./img/126.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091451591127.png','./img/127.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091451930128.png','./img/128.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091452170129.png','./img/129.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091452458130.png','./img/130.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091453922131.png','./img/131.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091453283132.png','./img/132.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091453695133.png','./img/133.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091455121134.png','./img/134.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091455132135.png','./img/135.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091455215136.png','./img/136.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091455474137.png','./img/137.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091456806138.png','./img/138.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091456593139.png','./img/139.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091456418140.png','./img/140.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091457639141.png','./img/141.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091457797142.png','./img/142.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091457928143.png','./img/143.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091457805144.png','./img/144.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091458882145.png','./img/145.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091458231146.png','./img/146.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091458927147.png','./img/147.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091459771148.png','./img/148.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091459822149.png','./img/149.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091459279150.png','./img/150.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091459238151.png','./img/151.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091500820152.png','./img/152.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091500728153.png','./img/153.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091501193154.png','./img/154.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091501771155.png','./img/155.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091501268156.png','./img/156.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091501219157.png','./img/157.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091501181158.png','./img/158.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091501474159.png','./img/159.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091502271160.png','./img/160.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091502111161.png','./img/161.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091503182162.png','./img/162.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091503406163.png','./img/163.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091503849164.png','./img/164.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091504986165.png','./img/165.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091504315166.png','./img/166.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091504350167.png','./img/167.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091504411168.png','./img/168.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091505904169.png','./img/169.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091505702170.png','./img/170.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091506422171.png','./img/171.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091506862172.png','./img/172.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091506398173.png','./img/173.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091507287174.png','./img/174.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091507374175.png','./img/175.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091507146176.png','./img/176.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091508149177.png','./img/177.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091508289178.png','./img/178.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091509504179.png','./img/179.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091509897180.png','./img/180.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091509124181.png','./img/181.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091509972182.png','./img/182.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091510287183.png','./img/183.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091511325184.png','./img/184.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091511516185.png','./img/185.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091512175186.png','./img/186.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091512454187.png','./img/187.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091512326188.png','./img/188.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091513584189.png','./img/189.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091513940190.png','./img/190.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091513454191.png','./img/191.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091514373192.png','./img/192.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091514510193.png','./img/193.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091514429194.png','./img/194.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091515968195.png','./img/195.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091515317196.png','./img/196.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091516981197.png','./img/197.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091516327198.png','./img/198.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091516755199.png','./img/199.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091516431200.png','./img/200.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091517193201.png','./img/201.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091517984202.png','./img/202.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091517676203.png','./img/203.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091518855204.png','./img/204.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091518401205.png','./img/205.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091519974206.png','./img/206.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091519969207.png','./img/207.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091519248208.png','./img/208.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091520692209.png','./img/209.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091520536210.png','./img/210.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091520964211.png','./img/211.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091521199212.png','./img/212.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091521755213.png','./img/213.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091521595214.png','./img/214.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091522420215.png','./img/215.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091522604216.png','./img/216.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091522274217.png','./img/217.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091523436218.png','./img/218.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091523700219.png','./img/219.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091523839220.png','./img/220.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091524134221.png','./img/221.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091524169222.png','./img/222.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091525672223.png','./img/223.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091525297224.png','./img/224.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091525154225.png','./img/225.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091526736226.png','./img/226.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091526511227.png','./img/227.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091527104228.png','./img/228.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091527254229.png','./img/229.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091527786230.png','./img/230.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091528449231.png','./img/231.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091528602232.png','./img/232.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091528575233.png','./img/233.png');
		saveImg('http://xtfgw.xiangtan.gov.cn/uploadfiles/202106/20210603091528135234.png','./img/234.png');
 */
/*  
 //document.querySelectorAll('.ewebeditor_doc img').forEach(function(ee,ii){ console.log('saveImg("'+ee.src+'","./img/'+ii.toString().padStart(3,'0')+'.png");')})
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a7b235dc124e489c95647f93d2886785.png","./img/000.png");


saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/97e946d00af04aba8633bad1e8299d72.png","./img/001.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/45316862131245ddb8fb61180b594cc0.png","./img/002.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f6477c470aba4047be07cad7496d3a90.png","./img/003.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/cbd95565121e409db239c14e71a05603.png","./img/004.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4dbcd2de4c984ef9a03a4d285d605f04.png","./img/005.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/9e9f7ddf501a440bbdf9387bf0865c72.png","./img/006.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/09da498f99ab4cb3948e1458c7fc7c2f.png","./img/007.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2b9976b574de4f5bbdcf1d69ecdb899a.png","./img/008.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a108d1b8f6254989af1f42a80ca17a3e.png","./img/009.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/abaa07e9661843de92719d6314164a17.png","./img/010.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/72560b04719e4901bc087aa5c94d9087.png","./img/011.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/fea6741d6758493a9652a8fd0d40b3ea.png","./img/012.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f31f2602add341d5b5e24db78027e024.png","./img/013.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/3ff0368ddcb640628e2cdf3de621a730.png","./img/014.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/963d9e0636d84b8cad6d2bb855891f2e.png","./img/015.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a58df325bdc5448895fb0d10c1d09539.png","./img/016.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1f2f5e6a1d694378b90fe2366be98e88.png","./img/017.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b622b67600ec478e802d72f2068127df.png","./img/018.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2d6eabeb366341ba8e936748dab411dc.png","./img/019.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/e04bd9cb1088432e9ab3248749779e36.png","./img/020.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1a864f74663d45fdb40a7ef89d6dc209.png","./img/021.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/e470eb23cbfd4f419ea65299405647a8.png","./img/022.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/964da822527747178222a2866ff8bf2b.png","./img/023.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/da5f6a4c1ba244b0a4cc17abf61aa5f3.png","./img/024.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/72f519e668e9411ca76ea855135b8291.png","./img/025.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/6095f98d0f9d47ce9bdeb0be238a1201.png","./img/026.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1909820ed2824c71beaa8d513f61361f.png","./img/027.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/51e0620f6a0348c193553b45c8c2b0c6.png","./img/028.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5132d0049f9947018e75d898a1df74b2.png","./img/029.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/76135933241045bc867b3d2413102ea0.png","./img/030.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b3c0f4df2c234e189820f9f2ce2a20e0.png","./img/031.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4d06972afdc44946b4528175d3277e43.png","./img/032.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/6e60ee0731f7476aa36133397eecfdec.png","./img/033.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/cce068ffe5a8419cb74609121241bad8.png","./img/034.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f4450f0c4e3a4462834404b6a106f405.png","./img/035.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2ea615eef43941ccbd07c5e02c32bef6.png","./img/036.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b549002f44b6473494041d3616bfcb45.png","./img/037.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f4efc7f4f668443e9ee466c1b7f79278.png","./img/038.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a74e3d48318742c99b6dcb6ba3fb00d2.png","./img/039.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/cc32c353cfed4ebd8ea48d59274f8c82.png","./img/040.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/7e22b8b19917489d8b72b8b550807a9e.png","./img/041.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/43140140357f4b4f9ec825e6489878b1.png","./img/042.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a3fc19d72e9c4641b4b94c239c1a3d11.png","./img/043.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/654ed77e24ee48e486596a8dbbff8d28.png","./img/044.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f9a2e3539eb644238263db16a941c70e.png","./img/045.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/9b259579c5f34def9e927d6405ea3e90.png","./img/046.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2cf74c01e3b1478e93c5a43d323ff107.png","./img/047.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/91a91386171e42c6b6d515205cc25bb4.png","./img/048.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/c1dbb693bd5e4a53a7e0c65ff53746e7.png","./img/049.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5430ab282dde4dea9abbe3b263bc42bd.png","./img/050.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/177bb6fea45f43dfbe08d4e98d759112.png","./img/051.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/43d48d8ca58340b9826cfb7062e5cd82.png","./img/052.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/0cd49a739b1248bf81fc44b537adfc50.png","./img/053.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/7cd523b40a814376baa49de414ef1680.png","./img/054.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/bd177093387f426c9140e32410004201.png","./img/055.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/7abf364ff1e14e69b0ecf62c3e41c07a.png","./img/056.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/cf70b0a84ab54c4380c43ccb14a044f0.png","./img/057.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/0638871d4978466c89d3cc9fe1e45d81.png","./img/058.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/92c186436c674058990c97a9fdfdea9d.png","./img/059.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/7a7e928790d8446eacd5c90920de3f86.png","./img/060.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/7b9da795ef11468e88ed2bbe9e2fde78.png","./img/061.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/554b54b636fc4362b5c4a527622fb9bc.png","./img/062.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/37b9847283d8463f8cebd3347327c864.png","./img/063.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/02008a5cd9ce4d508148c40bba5179de.png","./img/064.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2050f709c9d740038d9e627927b451f7.png","./img/065.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/c5fb4e081b9b4f51bbb4f5e8ecc2df4d.png","./img/066.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b00e72cee4454bbba076122de85b48ec.png","./img/067.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/87164a9c792e491ebda8e28dc25f4210.png","./img/068.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/88b444f8e47a4e0d9e549179a666ea38.png","./img/069.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/035511cb8eb042b1bd78e2cd27de5497.png","./img/070.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/e28ba2cb025649aaa9e576db586a60bc.png","./img/071.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/92757b47ec734a69b13078dde8d9fdd7.png","./img/072.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/8190a7a07b1345c09d5b2c72df44646b.png","./img/073.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ded7735727e44767a485c8532d56a59c.png","./img/074.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/60dafebe802b4b24abbf9b84374370ed.png","./img/075.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ecc12b8bde534069abd2c0fc92a3ac20.png","./img/076.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1d14a5f6f9db4473a3c5c410d4e9aeb1.png","./img/077.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a156700bb16b449e9477ce9f72c9d89a.png","./img/078.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5a9b3707ade646a9879ac5a20994c392.png","./img/079.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/159c9cb53f8c495290b2420b5cc5a80c.png","./img/080.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2fb1f902044845a4b200a54170b33403.png","./img/081.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5064099188c9479ab50ee392e80b73ec.png","./img/082.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/d0a964e1e65941568cfaf381228cb850.png","./img/083.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ad5c4a9df53140658feda22de2b3342f.png","./img/084.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f7b07afb13d748d886d9ea7a6ee2b029.png","./img/085.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/c7c95a99a2254f348be1fc2a8a0ed03e.png","./img/086.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/02ec2d294dc44d8ab29d7f19e7e9713b.png","./img/087.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/20ee7c7e6d384b16a762a15805346da4.png","./img/088.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/3de529b7452149e994875af5cdade187.png","./img/089.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/9665698fd14f427eae4ebefd5af25b22.png","./img/090.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/76118a0f6df742909069ba79270a4d09.png","./img/091.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/806ed966c7274c5c890820e4c9706940.png","./img/092.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/56178aab8ee54259b6d5d2ee3d448e85.png","./img/093.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f061112da9744487854ab9d486bdbad2.png","./img/094.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/8692bfd33e164f94b3b41be851c78a9d.png","./img/095.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/092efdc1ed4042e1899ee670f2bb7f58.png","./img/096.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/66357ff8e9514a78bbb3dbd5fb4bbcbe.png","./img/097.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/eed22c875aa545daaadcde22a8d11df5.png","./img/098.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/250273593df043609dcb3bab61df2711.png","./img/099.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b1be165357a34cc88fa7bd21633d734d.png","./img/100.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a214d7e727a04815bec70402adcabf72.png","./img/101.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2cfba0021ee24c40a84ffdbfb57705e0.png","./img/102.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4f98e70d828e4ef0b587b212c224dbda.png","./img/103.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/e83d0fa18d9e41e9b090ef9d3ee83e9a.png","./img/104.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/885c4eaf92c740a09b7ba569ce257c27.png","./img/105.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/811167913898446b8c11addf11a0a308.png","./img/106.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b6e974f992694a0cbf9553ddad65530f.png","./img/107.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/8b617dbf79684897b9008ada4cba5717.png","./img/108.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1b0e3792ba96486285d4170008768f50.png","./img/109.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/e482978235884ddbb46924a65158d8fa.png","./img/110.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/c9a04d987e7746a8bb405bbcc73c02ed.png","./img/111.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/e052ff492eb0497eb30de0b290c9798c.png","./img/112.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/9431cbcbc4ad44ce8f27e3a915371271.png","./img/113.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/6ef1d2fa79f24b48a7a7f426c2292acf.png","./img/114.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/94fd0603825d4832bc905ea555aadf36.png","./img/115.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/621628045fba466fbdac2b939eaba2b1.png","./img/116.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/48e344ee955c4c46b033900eb06763ab.png","./img/117.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/7a70c5b7b70d4281bffc37cd6d315ae0.png","./img/118.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4a529fd465c54c28b569df6a534e21c1.png","./img/119.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/34a5306a4f2e4c7aa2eab6dd934c2032.png","./img/120.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/74f71d9c43334a968d039430403cd22f.png","./img/121.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/e3335653dc7249e78b3e8bbfa4cf92b8.png","./img/122.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/139a85e4681d422e8dafb9a04fbde056.png","./img/123.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a51744f856f840ceb6c3a913d423a62d.png","./img/124.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a702777db07f413b85711285a4df23ae.png","./img/125.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5bbc2e51ee054aab8f5b0fa8b0407e14.png","./img/126.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/672e92217f074ee4b79a5c2db4470a85.png","./img/127.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4baf3c6ab3b94609a02b498485d8cd24.png","./img/128.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/9d4137696386447d88f66f36c881f6d4.png","./img/129.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/d387b570f4b042b39f72619f506acabe.png","./img/130.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/0aad4c1544144c5ebc855c81eb6ae7c9.png","./img/131.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/cb2c989a0c1a42ce87ab795d35d4ba54.png","./img/132.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ab53405f5b714c3a8034d15aace0e58e.png","./img/133.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5dbc8ac1998f4751bbcded0ac3e75ea1.png","./img/134.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b79e96bd88f74af08521cea01fafdff3.png","./img/135.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/0a7933406c4841428c66f7defa0655d9.png","./img/136.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/49b30f8578c3414f92885800cd0915a3.png","./img/137.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/32e55371706c4b58bd8162fab46bef40.png","./img/138.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/95cbc65f87dd4e2192ed940d57197c5b.png","./img/139.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/c19f2ff97d2548ae97c03fc76fa45346.png","./img/140.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/9b8bf68e1a6d46ff83350781a9ca8701.png","./img/141.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b5ec2584a52d431e9ac12e9468608ff8.png","./img/142.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/d6706ee58e164bf7885ed0f0e9858c14.png","./img/143.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/472c6fa7d30b4a5693eddbc70cf271df.png","./img/144.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/91eda78b87fd42d7baa9b50daad8222b.png","./img/145.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/69057d95faf649d3ab44c0e48d1f40f3.png","./img/146.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/0e0e898467614f38ba00e0aa23aa4c87.png","./img/147.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ff2fa1fca573409ba1693228babadf6e.png","./img/148.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/fd613dc1c1c344fe95e9a91bdad3afa5.png","./img/149.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/abb06294442e4803b9152a3ecb6ac097.png","./img/150.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5c0ba1508462419fb70668bedc498224.png","./img/151.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4b239c96367543f9b17ef594f05844f8.png","./img/152.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1959ee9be7d548248af1c2915868f52d.png","./img/153.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/23434fe660ad459faa0575656c3a1e9c.png","./img/154.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/56d7e28864c64199b0ab676875b0af00.png","./img/155.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1e82016350474439926e947a9199e71e.png","./img/156.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/10761f1f86414c409c26412e194666d8.png","./img/157.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ba2a6f00359a4b77afb1cd9a864cf106.png","./img/158.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/891856e1ea5749339ea803dcddd4c711.png","./img/159.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/d9c1c61bfce6498c9607389c9944ed9d.png","./img/160.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5c1b7875bad3432a93f50bf24cab9527.png","./img/161.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/75df058e750e44d897af016152687514.png","./img/162.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1ced6bb639044309b69e585169d33347.png","./img/163.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/3d929ecf7e8843eda69f713eaddefb16.png","./img/164.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ff6d0af376f246069677f01cfade096f.png","./img/165.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/fbea4ead23314668acaed0452793e459.png","./img/166.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/127e9f6f5ed44ac8bd2ea57aa8c332ac.png","./img/167.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1f669dc7ce8541ca89ee236d2d8bef6d.png","./img/168.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/a3251a85de964772be58702ab2996eef.png","./img/169.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ff0f169c37fb4e74ae39484d0413ffb4.png","./img/170.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1791eed42ae3491b91aede0cc6eb4b11.png","./img/171.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ae0dfeaea19144fcb6eb42b1fe12bff2.png","./img/172.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/85d2b1d5e40d4b029261185d65846f86.png","./img/173.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/f0719ae61fc14d8598f133f86d6a47e9.png","./img/174.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4cb1f80bd1504250953a9adaa089481c.png","./img/175.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/166569e6c43b45589509cdc3fa64d8d0.png","./img/176.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/d53af47f869a49fdaff57e338c87da2c.png","./img/177.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/613f8e84797a4c218da5caf8439ef036.png","./img/178.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/4943c5cde5074b0baec8191d9b2bc373.png","./img/179.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/401413dd8cce4ade8ff723596fcec1cf.png","./img/180.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b9d6fcab7cd34f9fbab7a28b6f2cde7a.png","./img/181.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/d341eb6147b04779985fe56ad8b3d9db.png","./img/182.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/fbad1335780a4d8d940321641a19f228.png","./img/183.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/06e240f0299c44418416db2f2035ecd3.png","./img/184.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1855b8da70504cbc9a7924992213ebe6.png","./img/185.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/2d3fecc4f11c429a84d7e0a1457e5574.png","./img/186.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/5253b28f9dd54d48994b79aed264998f.png","./img/187.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/ed2f26c4d3fe4e68b34239327cbc31b6.png","./img/188.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/af55d1081c06435e9f1f9e58b75183f3.png","./img/189.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/949130553bd1422bae94c60b6eb4cfa4.png","./img/190.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/1538f36e0c4347598090a7b2a6accf55.png","./img/191.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/c1fdc414bed943939801b5dc4f360fa8.png","./img/192.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/587633bc7fbb483aa82956eb97394fcf.png","./img/193.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/b3717eb99a1e455884608718c7c4563e.png","./img/194.png");
saveImg("http://www.huaihua.gov.cn/huaihua/c100236/202106/048cd3fffd19428c9215f1a230a1c00d/images/69e326ab9b9746a099265e41bd118c30.png","./img/195.png");

*/

//document.querySelectorAll('.ewebeditor_doc img').forEach(function(ee,ii){ console.log('saveImg("'+ee.src+'","./img/'+ii.toString().padStart(3,'0')+'.png");')})
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344871001.png","./img/000.png");
/*saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344949002.png","./img/001.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344200003.png","./img/002.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344784004.png","./img/003.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344232005.png","./img/004.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344779006.png","./img/005.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344778007.png","./img/006.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344195008.png","./img/007.png");


saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163344877009.png","./img/008.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163345127010.png","./img/009.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163345960011.png","./img/010.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163345606012.png","./img/011.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163345187013.png","./img/012.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163345673014.png","./img/013.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163346701015.png","./img/014.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163346989016.png","./img/015.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163346700017.png","./img/016.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163346311018.png","./img/017.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347628019.png","./img/018.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347827020.png","./img/019.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347846021.png","./img/020.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347365022.png","./img/021.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347135023.png","./img/022.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347750024.png","./img/023.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347648025.png","./img/024.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163347765026.png","./img/025.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348920027.png","./img/026.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348169028.png","./img/027.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348886029.png","./img/028.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348871030.png","./img/029.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348972031.png","./img/030.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348646032.png","./img/031.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348900033.png","./img/032.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348572034.png","./img/033.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348574035.png","./img/034.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348863036.png","./img/035.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348949037.png","./img/036.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348737038.png","./img/037.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348674039.png","./img/038.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163348912040.png","./img/039.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163349553041.png","./img/040.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163349477042.png","./img/041.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163349946043.png","./img/042.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163349666044.png","./img/043.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163349573045.png","./img/044.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163349140046.png","./img/045.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163349788047.png","./img/046.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350610048.png","./img/047.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350820049.png","./img/048.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350988050.png","./img/049.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350483051.png","./img/050.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350159052.png","./img/051.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350640053.png","./img/052.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350184054.png","./img/053.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350466055.png","./img/054.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350251056.png","./img/055.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350557057.png","./img/056.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350292058.png","./img/057.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350750059.png","./img/058.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163350776060.png","./img/059.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163351120061.png","./img/060.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163351591062.png","./img/061.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163351931063.png","./img/062.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163351404064.png","./img/063.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163351465065.png","./img/064.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163351222066.png","./img/065.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163351129067.png","./img/066.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352763068.png","./img/067.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352395069.png","./img/068.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352999070.png","./img/069.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352277071.png","./img/070.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352462072.png","./img/071.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352110073.png","./img/072.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352879074.png","./img/073.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352133075.png","./img/074.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352983076.png","./img/075.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352976077.png","./img/076.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163352525078.png","./img/077.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163353474079.png","./img/078.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163353114080.png","./img/079.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163353957081.png","./img/080.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163353696082.png","./img/081.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163353882083.png","./img/082.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163353288084.png","./img/083.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163353367085.png","./img/084.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163354351086.png","./img/085.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163354140087.png","./img/086.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163354944088.png","./img/087.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163354903089.png","./img/088.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163354101090.png","./img/089.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355336091.png","./img/090.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355957092.png","./img/091.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355738093.png","./img/092.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355838094.png","./img/093.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355792095.png","./img/094.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355388096.png","./img/095.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355259097.png","./img/096.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355811098.png","./img/097.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163355392099.png","./img/098.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163356746100.png","./img/099.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163356897101.png","./img/100.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163356184102.png","./img/101.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163356574103.png","./img/102.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163356178104.png","./img/103.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163356620105.png","./img/104.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163356264106.png","./img/105.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357695107.png","./img/106.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357606108.png","./img/107.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357980109.png","./img/108.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357977110.png","./img/109.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357956111.png","./img/110.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357373112.png","./img/111.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357814113.png","./img/112.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357682114.png","./img/113.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357798115.png","./img/114.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357579116.png","./img/115.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357210117.png","./img/116.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357602118.png","./img/117.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357816119.png","./img/118.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163357674120.png","./img/119.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163358630121.png","./img/120.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163358305122.png","./img/121.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163359983123.png","./img/122.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163359749124.png","./img/123.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163359776125.png","./img/124.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163359212126.png","./img/125.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163359267127.png","./img/126.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400334128.png","./img/127.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400751129.png","./img/128.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400249130.png","./img/129.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400344131.png","./img/130.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400942132.png","./img/131.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400539133.png","./img/132.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400575134.png","./img/133.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400806135.png","./img/134.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400835136.png","./img/135.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400164137.png","./img/136.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400377138.png","./img/137.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400860139.png","./img/138.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163400269140.png","./img/139.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401678141.png","./img/140.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401147142.png","./img/141.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401262143.png","./img/142.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401406144.png","./img/143.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401600145.png","./img/144.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401991146.png","./img/145.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401341147.png","./img/146.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401583148.png","./img/147.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401617149.png","./img/148.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401134150.png","./img/149.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401193151.png","./img/150.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401267152.png","./img/151.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163401837153.png","./img/152.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163402370154.png","./img/153.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163402503155.png","./img/154.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163402981156.png","./img/155.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163402501157.png","./img/156.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163402852158.png","./img/157.png");
saveImg("http://www.czs.gov.cn/html/uploadfiles/202106/20210611163403363159.png","./img/158.png");

*/


		console.log('End to grab..........................');
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