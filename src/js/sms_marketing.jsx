/*
 * 短信营销页面组件
 */

import React from "react";

import Breadcrumb from './include/breadcrumb.jsx';


/*****************************************************/
//首页组件包加载
class ContentPrint extends React.Component {
	render(){
		return(
			<div>
				<Breadcrumb data={shopInfo.breadcrumb} />
				<div className={"contentBox"}>
					内容
				</div>
			</div>
		);
	}
}

/*****************************************************/
module.exports = ContentPrint;