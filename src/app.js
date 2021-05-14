const {
	shell,
	ipcRenderer
} = require('electron');
const exec = require('child_process').exec;
const path = require('path')
const fs = require('fs')
const axios = require('axios');
let wxUnpackedPath;
const {doFile} = require("./wuWxapkg.js")
let isRunning=false;
Zepto(function($){
	initDragIn();
	
	hideButtons();
	showTips("拖入 .wxapkg<br><a href='javascript:openExternal(\"https://www.bilibili.com/video/BV1yz4y1C7ae\");' style='font-size:24px;color:#F8F5BD;'>查看教程</a>");
})
function showButtons(){
	$("#buttons").css("display","flex");
}
function hideButtons(){
	$("#buttons").css("display","none");
}
function showTips(msg){
	$("#tips").html(msg);
}
function startAni(){
	$(".gear1").css("animation-play-state","running");
	$(".gear2").css("animation-play-state","running");
}
function stopAni(){
	$(".gear1").css("animation-play-state","paused");
	$(".gear2").css("animation-play-state","paused");
	getNews();
}
function doUnpack(fname){
	hideButtons();
	showTips("反编译中");
	startAni();
	isRunning=true;

	doFile(fname,(res)=>{
		isRunning=false;
		wxUnpackedPath = fname.substring(0,fname.length-7);
		showTips("反编译成功");
		stopAni();
		setTimeout(function(){
			showButtons();
		},1000);
	},[]);
}
function initDragIn() {
	window.ondragover = function(e) {
		e.preventDefault();
		if(isRunning)return false;
		e.dataTransfer.dropEffect = 'copy';
		return false;
	};

	window.ondrop = function(e) {
		if(isRunning)return;

		e.preventDefault();
		wxUnpackedPath = "";
		let fileName = e.dataTransfer.files[0].path;
		console.log(e);
		console.log(fileName);

		let indexOf = fileName.lastIndexOf(".wxapkg");
		if (indexOf >= 0) {
			doUnpack(fileName);
		}else if(fs.statSync(fileName).isDirectory){
			if(fs.existsSync(path.join(fileName,"app.json"))){
				wxUnpackedPath = fileName;
				hideButtons();
				showTips("...检测中...");
				startAni();
				setTimeout(function(){
					showButtons();
					stopAni();
				},1000);
			}
		}

		return false;
	};

	window.ondragleave = function() {
		return false;
	};
}
function openExternal(url){
	shell.openExternal(url);
}
function goJuejin(){
	openExternal("https://space.bilibili.com/422646817");
}
function convertUniapp(){
	openExternal("https://github.com/zhangdaren/miniprogram-to-uniapp");
}
function convertTaro(){
	openExternal("https://github.com/NervJS/taro");
}

let config = [
	{
		name:"大帅搞全栈",
		userid:"2955079655898093",
		head:"images/head_shuai.jpg"
	}
];

async function getNews(){
	//https://apinew.juejin.im/content_api/v1/article/query_list
	let user = config[Math.floor(Math.random()*config.length)];
	let res = await axios.post(
		"https://api.juejin.cn/content_api/v1/article/query_list",
		{
			"cursor": "0",
			"sort_type": 2,
			"user_id": user.userid
		}
	);//https://juejin.im/post/
	let aindex = Math.floor(Math.random()*res.data.data.length);

	ipcRenderer.send('showNotification',{
		title:user.name,
		msg:res.data.data[aindex].article_info.title,
		icon:user.head,
		url:"https://juejin.im/post/"+res.data.data[aindex].article_info.article_id
	});
}

module.exports={
	convertTaro:convertTaro,
	convertUniapp:convertUniapp,
	goJuejin:goJuejin
}