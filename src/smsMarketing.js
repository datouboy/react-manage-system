//全局公共css文件
import "./css/style.less";
//首页css文件
import "./css/insidePages.less";

import React from "react";
import ReactDOM from "react-dom";

//头部信息条组件
import TopNavInfo from "./js/top_info.jsx";

//头部导航组件
import TopNavPrint from "./js/top_nav.jsx";

//左侧导航组件
import LeftNavPrint from "./js/left_nav.jsx";

//短信营销页面组件
import SmsMarketingPrint from "./js/sms_marketing.jsx";

ReactDOM.render(
	<TopNavInfo />,
	document.getElementById("topBar")
);

ReactDOM.render(
	<TopNavPrint />,
	document.getElementById("pageTop")
);

ReactDOM.render(
	<LeftNavPrint />,
	document.getElementById("leftNav")
);

ReactDOM.render(
	<SmsMarketingPrint />,
	document.getElementById("bodyBox")
);