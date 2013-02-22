var intWidth = Ti.Platform.displayCaps.platformWidth;
var intHeight = Ti.Platform.displayCaps.platformHeight;
var strDensity = Ti.Platform.displayCaps.density;
var intDpi = Ti.Platform.displayCaps.dpi;
 
function isRetina() {
    return (strDensity === 'high' && intDpi === 320);
}
function isTall() {
    return (intHeight === 568);
}
exports.isRetina = isRetina;
exports.isTall = isTall;