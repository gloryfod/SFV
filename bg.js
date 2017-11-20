/*
var start_get = function(){
	//console.log(window.location.href);
	//唤醒content_script开始抓取。
	var data = {msg:'start'};
	try{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendRequest(tabs[0].id, data, function(data) {}); 
	});	
	}catch(e){console.log('error,exit');return;};
	//*
	chrome.extension.sendRequest(data, function(data) {
		console.log(data);
	});*--
}
var start_get2 = function(){
	//console.log(window.location.href);
	//唤醒content_script开始抓取。
	var data = {msg:'start2'};
	try{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendRequest(tabs[0].id, data, function(data) {}); 
	});	
	}catch(e){console.log('error,exit');return;};
	//*
	chrome.extension.sendRequest(data, function(data) {
		console.log(data);
	});*--
}
*/
/*
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	//如果是visa页面或者是本地页面，才启用本功能
	if (tab.url.indexOf("visaservices") > -1 || /^file:\/\//i.test(tab.url) || /australiavisa\-china/.test(tab.url)) {  
		chrome.pageAction.show(tabId);
	}
});
*/
var flag = false;
var def_func = function(){
	var data = {msg:'def'};
	try{
	// chrome.tabs.query({}, function(tabs){
		// console.log(tabs);
	// });
	chrome.tabs.query({active: true, currentWindow: true, highlighted:true}, function(tabs) {
		//if( !tabs[0].pinned ){
			//data.tabid = tabs[0].id;
			//chrome.tabs.sendRequest
			data.id = tabs[0].id;//经过测试，这里会得到当前激活页面的tab的ID
			data.taburl = tabs[0].url;
			chrome.tabs.sendMessage(tabs[0].id, data, function(data) {flag = true}); 
		//}
	});	
	}catch(e){console.log('error,exit');return;};
	
}