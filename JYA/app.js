

var getloader = require('./loader');
var ends = require('./ends');

let logger = console;

var myloader = getloader(logger);

myloader.grab('https://www.missioncloud.com/resources/tools');