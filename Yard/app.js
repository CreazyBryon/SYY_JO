//let fetch = require('node-fetch');
import fetch from 'node-fetch';

fetch('https://www.missioncloud.com/resources/tools')
.then((response) => response.text())
.then((data) => console.log(data));

