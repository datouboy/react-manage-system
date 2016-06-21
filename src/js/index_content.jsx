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
//首页系统公告列表组件
class SystemNoteList extends React.Component {
	render(){
		var className = "";
		if(this.props.data.open){
			className += "open";
		}
		if(this.props.data.type == "news"){
			var typeHtml = (
				<span className={"news"}>公告</span>
			);
		}else if(this.props.data.type == "fun"){
			var typeHtml = (
				<span className={"fun"}>新功能</span>
			);
		}
		return(
			<li className={className}>
				{typeHtml}<a href={"http://www.taobao.com" + this.props.data.id}>{this.props.data.title}</a><em>{this.props.data.date}</em>
			</li>
		);
	}
}

/*****************************************************/
//首页系统公告组件
class SystemNote extends React.Component {
	render(){
		var className = "commonDivBox animateStart";
		if(this.props.classData){
			className += " animateEnd";
		}

		//循环子组件列表
		var newsList = this.props.data;
		var newsListArray = [];

		if(newsList.length > 0){
			newsList.forEach(function(value, index){
				newsListArray.push(<SystemNoteList key={index} data={value} />);
			})
		}

		return(
			<div className={className} style={{"height":"270px","marginBottom":"20px"}}>
				<h3 className={"systemNote"}>系统公告</h3>
				<div className={"commonDivBoxNews"}>
					<ul>
						{newsListArray}
					</ul>
					<IconMenu iconName={"addFun"} url={"http://www.taobao.com"} title={"告诉我你想要的功能"} />
				</div>
			</div>
		);
	}
}

/*****************************************************/
//首页客服电话组件
class ContactServicePhone extends React.Component {
	render(){
		var text = "";
		if(this.props.data.type == "phone"){
			text = "客服热线：";
		}else if(this.props.data.type == "mobile"){
			text = "手机联系：";
		}
		var styleObj = {};
		if(this.props.last){
			styleObj.marginBottom = "10px";
		}
		return(
			<p className={"phoneNum"} style={styleObj}><span className={this.props.data.type}>{text + this.props.data.num}</span></p>
		);
	}
}

/*****************************************************/
//首页QQ客服IM组件
class ContactServiceImQQ extends React.Component {
	render(){
		return(
			<a target={"_blank"} href={"http://wpa.qq.com/msgrd?v=3&uin=" + this.props.num + "&site=qq&menu=yes"}>
				<img border={"0"} src={"http://wpa.qq.com/pa?p=2:" + this.props.num + ":51"} alt={"联系客服"} title={"联系客服"} />
			</a>
		);
	}
}

/*****************************************************/
//首页旺旺客服IM组件
class ContactServiceImWang extends React.Component {
	render(){
		return(
			<a target={"_blank"} href={"http://amos.alicdn.com/msg.aw?v=2&uid=" + this.props.userName + "&site=cnalichn&s=11&charset=gbk"}>
				<img border="0" src={"http://amos.alicdn.com/online.aw?v=2&uid=" + this.props.userName + "&site=cnalichn&s=11&charset=UTF-8"} alt={"联系客服"} />
				<span>{this.props.userName}</span>
			</a>
		);
	}
}

/*****************************************************/
//首页客服组件
class ContactService extends React.Component {
	render(){
		var className = "commonDivBox animateStart";
		if(this.props.classData){
			className += " animateEnd";
		}

		//加载客服电话数据
		var phoneArray = this.props.phone,
			phoneList = [];
			
		phoneArray.forEach(function(value, index){
			var last = false;
			if(index == phoneArray.length-1){
				last = true;
			}
			phoneList.push(<ContactServicePhone key={index} data={value} last={last} />);
		})

		//加载客服IM数据
		var imArray = this.props.im,
			imList = [];

		imArray.forEach(function(value, index){
			if(value.type == "wang"){
				imList.push(<ContactServiceImWang key={index} userName={value.userName} />);
			}else if(value.type == "qq"){
				imList.push(<ContactServiceImQQ key={index} num={value.num} />);
			}
		})

		return(
			<div className={className} style={{"marginBottom":"20px"}}>
				<h3 className={"contactService"}>联系客服</h3>
				<div className={"commonDivBoxNews"}>
					{phoneList}
					<p className={"imBox"}>
						{imList}
					</p>
					<IconMenu iconName={"service"} url={"http://www.taobao.com"} title={"反馈你的意见或建议"} />
				</div>
			</div>
		);
	}
}

/*****************************************************/
//首页组件包加载
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
			commonDivBox: false,
			systemNote: false,
			contactService: false,
			indexRightFlash: false
		}
	}
	componentDidMount(){
		//异步方式，动画加载首页模块
		this.boxAnimate({indexFlashBanner: true}, 10, function(){
			this.boxAnimate({indexMemberInfo: true}, 100, function(){
				this.boxAnimate({commonDivBox: true}, 100, function(){
					this.boxAnimate({systemNote: true}, 100, function(){
						this.boxAnimate({contactService: true}, 100, function(){
							this.boxAnimate({indexRightFlash: true}, 100, function(){
							}.bind(this));
						}.bind(this));
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}
	render(){
		return(
			<div className={"contentBox"}>
				<div className={"indexLeft"}>
					<IndexFlashBanner data={indexContent.flash} classData={this.state.indexFlashBanner} />
					<MemberInfo memberNum={shopInfo.memberNum} classData={this.state.indexMemberInfo} />
					<CommonFun data={indexContent.commonFun} classData={this.state.commonDivBox} />
				</div>
				<div className={"indexRight"}>
					<SystemNote data={indexContent.news} classData={this.state.systemNote} />
					<ContactService phone={shopInfo.phone} im={shopInfo.im} classData={this.state.contactService} />
					<IndexFlashBanner data={indexContent.rightFlash} classData={this.state.indexRightFlash} />
				</div>
			</div>
		);
	}
}

/*****************************************************/
module.exports = IndexLeftContentPrint;