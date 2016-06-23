import React from "react";

//利用自执行函数，将url信息转成完整Url路径，写入原Json数据
topNavListArray = (function getUrl(topNavList){
	for(var i = 0; i <= topNavList.length-1; i++){
		var topNavData = topNavList[i];
		topNavData.fullUrl = shopInfo.siteUrl + topNavData.url;
		topNavListArray[i] = topNavData;
	}
	return topNavListArray;
})(topNavListArray);

//顶部导航栏单独按钮组件
class TopNavLi extends React.Component {
	render(){
		var topNavLiClassName = this.props.data.className;
		if(this.props.data.onThis){
			topNavLiClassName += " onthis";
		}
		return(
			<li className={topNavLiClassName}>
				<a href={this.props.data.fullUrl}><strong>{this.props.data.name}</strong></a>
			</li>
		);
	}
}

/*****************************************************/
//顶部退出按钮组件
class TopLogOut extends React.Component {
	handleClick(e){
		window.location.href = "/url/logout";
		e.stopPropagation();
		e.preventDefault();
	}
	render(){
		return(
			<div className={"topLogout"} onClick={this.handleClick}>
				<p>{this.props.data.shopName}</p>
				<p>[ 退出登录 ]</p>
			</div>
		);
	}
}

/*****************************************************/
//顶部导航栏列表组件
class TopNavPrint extends React.Component {
	render(){
		/* 
		 * 循环插入导航栏单独按钮组件至topNav数组
		 * 这里的index是数组元素的数字索引
		 * bind是将function外层的this带到function内部，和var _self = this的效果一样
		 */
		var topNav = [];
		topNavListArray.forEach(function(value,index){
			// key={index} 用于React优化性能
			topNav.push(<TopNavLi key={index} data={value} />);
			//console.log(value);
		}.bind(this));

		return(
			<div className={"pageTop"}>
				<div className={"logo"}>
					<a href={shopInfo.siteUrl}></a>
				</div>
				<div id={"topNavBox"}>
					<div className={"topNav"}>
						<ul>
							{topNav}
						</ul>
						<TopLogOut data={shopInfo} />
					</div>
				</div>
			</div>
		);
	}
}

/*****************************************************/
module.exports = TopNavPrint;