var bg_page = chrome.extension.getBackgroundPage();
/*
document.getElementById('getme').onclick = function(){
	bg_page.start_get();
};
document.getElementById('getme2').onclick = function(){
	bg_page.start_get2();
};
*/
$(document).ready(function(){
	bg_page.def_func();
});
//console.log($('#getme'));
// var def_func = function(){
	// bg_page.def_func();
// }
// def_func();