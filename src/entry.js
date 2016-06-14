require("./css/style.less");
//require('./js/common.js');

var React = require("react");
var ReactDOM = require("react-dom");

//头部导航组件
var TopNavPrint = require("./js/top_nav.jsx");

//左侧导航组件
var LeftNavPrint = require("./js/left_nav.jsx");

ReactDOM.render(
	<TopNavPrint />,
	document.getElementById("topNavBox")
);

ReactDOM.render(
	<LeftNavPrint />,
	document.getElementById("leftNav")
);