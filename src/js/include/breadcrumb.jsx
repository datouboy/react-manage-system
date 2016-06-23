/*
 * 面包屑组件组件
 */

import React from "react";
import { Breadcrumb } from 'antd';

/*****************************************************/
class ContentPrint extends React.Component {
	render(){
		var domArray = this.props.data,
			domList = [];

		domArray.forEach(function(value, index){
			if(index == domArray.length-1){
				domList.push(<Breadcrumb.Item>{value.title}</Breadcrumb.Item>);
			}else{
				domList.push(<Breadcrumb.Item><a href={value.url}>{value.title}</a></Breadcrumb.Item>);
			}
		})
		return(
			<div className={"breadcrumb"}>
				<Breadcrumb>
				    <Breadcrumb.Item>首页</Breadcrumb.Item>
				    {domList}
				</Breadcrumb>
			</div>
		);
	}
}

/*****************************************************/
module.exports = ContentPrint;