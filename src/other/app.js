require('./window.js');
require('/Users/ecot/Marfeel/ProTenants/LaPrensaNicaragua/www.laprensa.com.ni/index/custom.s.js');
var fs = require('fs');

window.mrfCustom[0]();

let trackers = {};
for (let i=0; i < window.Metrics.trackSystems.length; i++ ) {
    const trackSystem = window.Metrics.trackSystems[i];
    trackers = Object.assign(trackers, trackSystem.toJson());
};

fs.writeFile('metrics.json', JSON.stringify(trackers), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});