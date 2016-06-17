//全局公共css文件
import "./css/style.less";
//首页css文件
import "./css/index.less";

import React from "react";
import ReactDOM from "react-dom";

//头部信息条组件
import TopNavInfo from "./js/top_info.jsx";

//头部导航组件
import TopNavPrint from "./js/top_nav.jsx";

//左侧导航组件
import LeftNavPrint from "./js/left_nav.jsx";

//首页内容区组件（左侧）
import IndexContentLeft from "./js/index_left.jsx";


ReactDOM.render(
	<TopNavInfo />,
	document.getElementById("topBar")
);

ReactDOM.render(
	<TopNavPrint />,
	document.getElementById("topNavBox")
);

ReactDOM.render(
	<LeftNavPrint />,
	document.getElementById("leftNav")
);

ReactDOM.render(
	<IndexContentLeft />,
	document.getElementById("indexLeft")
);