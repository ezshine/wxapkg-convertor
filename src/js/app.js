const {
	shell,
	ipcRenderer
} = require('electron');
const exec = require('child_process').exec;
const path = require('path')
const fs = require('fs')
const axios = require('axios');
let iconv = require('iconv-lite');
let wxUnpackedPath;
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
	let cmdStr = 'node wuWxapkg.js ' + fname
	// 执行cmd命令的目录
	let cmdPath = path.join(__dirname)
	// 子进程名称
	let workerProcess
	// 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
	workerProcess = exec(cmdStr, { cwd: cmdPath })
	workerProcess.stdout.on('data', function(data) {
		console.log(data);
	})
	// 打印错误的后台可执行程序输出
	workerProcess.stderr.on('data', function(data) {
		console.log(data);
	})
	// 退出之后的输出
	workerProcess.on('close', function(code) {
		isRunning=false;
		wxUnpackedPath = fname.substring(0,fname.length-7);
		showTips("反编译成功");
		stopAni();
		setTimeout(function(){
			showButtons();
		},1000);
	})
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
	openExternal("https://juejin.im/user/2955079655898093");
}
function convertUniapp(){
	isRunning=true;
	showTips("转换为 uniapp 项目");
	hideButtons();
	startAni();
	let cmdStr = path.join(__dirname,"node_modules","miniprogram-to-uniapp","bin","wtu") +" ./";
	// 执行cmd命令的目录
	let cmdPath = wxUnpackedPath;
	// 子进程名称
	let workerProcess

	console.log(cmdStr,cmdPath);
	// 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
	workerProcess = exec(cmdStr, { cwd: cmdPath })
	workerProcess.stdout.on('data', function(data) {
		console.log(iconv.decode(Buffer.concat([data]), 'GBK'));
	})
	// 打印错误的后台可执行程序输出
	workerProcess.stderr.on('data', function(data) {
		console.log(iconv.decode(Buffer.concat([data]), 'GBK'));
	})
	// 退出之后的输出
	workerProcess.on('close', function(code) {
		isRunning=false;
		console.log("convert uniapp done");
		showTips("转换完成");
		stopAni();
		setTimeout(function(){
			showButtons();
		},1000);
	})
}
function convertTaro(){
	isRunning=true;
	showTips("转换为 taro 项目");
	hideButtons();
	startAni();
	let cmdStr = path.join(__dirname,"node_modules","@tarojs","cli","bin","taro") +" convert";
	// 执行cmd命令的目录
	let cmdPath = wxUnpackedPath;
	// 子进程名称
	let workerProcess
	// 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
	workerProcess = exec(cmdStr, { cwd: cmdPath })
	workerProcess.stdout.on('data', function(data) {
		console.log(data);
	})
	// 打印错误的后台可执行程序输出
	workerProcess.stderr.on('data', function(data) {
		console.log(data);
	})
	// 退出之后的输出
	workerProcess.on('close', function(code) {
		isRunning=false;
		console.log("convertTaro done");
		exec("mv taroConvert/ "+wxUnpackedPath+"_taro/", { cwd: cmdPath });
		showTips("转换完成");
		stopAni();
		setTimeout(function(){
			showButtons();
		},1000);
	})
}

let config = [
	{
		name:"全栈然叔",
		userid:"1978776660216136",
		head:"images/head_xia.jpg"
	},
	{
		name:"大帅搞全栈",
		userid:"2955079655898093",
		head:"images/head_shuai.jpg"
	},
	{
		name:"蜗牛老湿_大圣",
		userid:"1556564194370270",
		head:"images/head_sheng.jpg"
	},
	{
		name:"杨村长",
		userid:"325111174926350",
		head:"images/head_yang.jpg"
	}
];

async function getNews(){
	//https://apinew.juejin.im/content_api/v1/article/query_list
	let user = config[Math.floor(Math.random()*config.length)];
	let res = await axios.post(
		"https://apinew.juejin.im/content_api/v1/article/query_list",
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