import React from "react";
import { Menu, Dropdown, Icon } from 'antd';



/*****************************************************/
//顶部信息显示组件
class InfoShow extends React.Component {
	render(){
		return(
			<p className={"info"}>
				<span>{this.props.title} : </span>
				<span className={"yellow"}>{this.props.info}</span>
			</p>
		);
	}
}

/*****************************************************/
//顶部充值按钮组件
class PaycheckMenu extends React.Component {
	render(){
		return(
			<p className={"info"}>
				<a className={"paycheckMenu"} href={this.props.url} target={"_blank"}>{this.props.title}</a>
			</p>
		);
	}
}

/*****************************************************/
//组装子店铺Jsx数据
var otherShopsArray = [];
var otherShopsKey = 0;
shopInfo.otherShops.forEach(function(value,index){
	otherShopsArray.push(
	    <Menu.Item key={otherShopsKey}>
			<a href={"http://www.taobao.com/" + value.id}>{value.title}</a>
	    </Menu.Item>
    )
    otherShopsKey++;
    if(shopInfo.otherShops.length - 1 > index){
    	otherShopsArray.push(<Menu.Divider key={otherShopsKey} />);
    	otherShopsKey++;
    }
});
var menu = (
	<Menu>
		{otherShopsArray}
	</Menu>
);

/*****************************************************/
//组装选择子店铺组件
class SelectOtherShop extends React.Component {
	render(){
		return(
			<div className={"selectOtherShop"}>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className={"ant-dropdown-link"} href={"#"}>
						选择子店铺：<Icon type={"down"} />
					</a>
				</Dropdown>
			</div>
		);
	}
}

/*****************************************************/
//新消息提醒
class MessageNum extends React.Component {
	render(){
		//如果消息数为0，则不显示
		var styleObj = {};
		if(this.props.messageNum == 0){
			styleObj.display = "none";
		}

		return(
			<p className={"info"} style={styleObj}>
				<span>新消息</span> <span className={"messageNumBox"}>{this.props.messageNum}</span>
			</p>
		);
	}
}

/*****************************************************/
//顶部导航栏列表组件
class TopInfoPrint extends React.Component {
	render(){
		return(
			<div>
				<div className={"infoLeft"}>
					<InfoShow title={"短信余额"} info={shopInfo.smsBalance} />
					<InfoShow title={"邮件余额"} info={shopInfo.edmBalance} />
					<PaycheckMenu title={"充值"} url={shopInfo.paycheckUrl} />
					<p className={"info"}>
						{shopInfo.systemModel}
					</p>
					<InfoShow title={"软件有效期至"} info={shopInfo.deadline} />
					<PaycheckMenu title={"续费"} url={shopInfo.crmPaycheckUrl} />
				</div>
				<div className={"infoRight"}>
					<MessageNum messageNum={shopInfo.messageNum} />
					<SelectOtherShop />
				</div>
			</div>
		);
	}
}

/*****************************************************/
module.exports = TopInfoPrint;