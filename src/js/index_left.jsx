import React from "react";

//导入轮播组件
import IndexFlashBanner from "./include/flash.jsx";

//导入带Icon的按钮组件
import IconMenu from "./include/icon_menu.jsx";

//数字千位符格式化函数
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}



/*****************************************************/
//会员信息组件（包含导入数据按钮）
class MemberInfo extends React.Component {
	render(){
		var className = "indexMemberInfo animateStart";
		if(this.props.classData){
			className += " animateEnd";
		}

		return(
			<div className={className}>
				<div className={"memberNum"}>
					<p>当前店铺会员数</p>
					<strong>{toThousands(this.props.memberNum)}</strong>
				</div>
				<div className={"importMember"}>
					<p style={{marginBottom:"13px"}}>
						<IconMenu iconName={"importRecords"} url={"http://www.taobao.com"} title={"导入历史交易记录"} />
						<span className={"note"}>导入官方历史交易记录，补全店铺的会员数据</span>
					</p>
					<p>
						<IconMenu iconName={"importNums"} url={"http://www.taobao.com"} title={"导入外部联系人"} />
						<span className={"note"}>导入其他联系人数据，增添营销对象</span>
					</p>
				</div>
			</div>
		);
	}
}

/*****************************************************/
//首页常用功能组件(子组件)
class CommonFunMenu extends React.Component {
	render(){
		var className = "iconBox ";
			className += this.props.data.className;

		return(
			<div className={"commonFunMenu"}>
				<a className={className} href={this.props.data.url} target={"_black"}></a>
				<h4>{this.props.data.title}</h4>
				<p>{this.props.data.description}</p>
			</div>
		);
	}
}

/*****************************************************/
//首页常用功能组件
class CommonFun extends React.Component {
	render(){
		var className = "commonDivBox animateStart";
		if(this.props.classData){
			className += " animateEnd";
		}

		//循环子组件列表
		var commonFun = this.props.data;
		var commonFunArray = [];

		if(commonFun.length > 0){
			commonFun.forEach(function(value, index){
				commonFunArray.push(<CommonFunMenu key={index} data={value} />);
			})
		}

		return(
			<div className={className}>
				<h3 className={"commonFun"}>常用功能</h3>
				<div className={"commonDivBoxMain"}>
					{commonFunArray}
				</div>
			</div>
		);
	}
}

/*****************************************************/
//首页左侧组件包加载
class IndexLeftContentPrint extends React.Component {
	boxAnimate(stateObj, times, callBack){
		setTimeout(function(){
			this.setState(stateObj);
			callBack && callBack();
		}.bind(this),times);
	}
	//设置初始State值,用于控制CSS3动画加载
	constructor(props) {
		super(props);
		this.state = {
			indexFlashBanner: false,
			indexMemberInfo: false,
			commonDivBox: false
		}
	}
	componentDidMount(){
		this.boxAnimate({indexFlashBanner: true}, 50, function(){
			this.boxAnimate({indexMemberInfo: true}, 200, function(){
				this.boxAnimate({commonDivBox: true}, 200, function(){
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}
	render(){
		return(
			<div>
				<IndexFlashBanner data={indexContent.flash} classData={this.state.indexFlashBanner} />
				<MemberInfo memberNum={shopInfo.memberNum} classData={this.state.indexMemberInfo} />
				<CommonFun data={indexContent.commonFun} classData={this.state.commonDivBox} />
			</div>
		);
	}
}

/*****************************************************/
module.exports = IndexLeftContentPrint;