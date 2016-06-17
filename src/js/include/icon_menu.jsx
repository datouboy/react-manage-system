import React from "react";

/*****************************************************/
//带Icon的按钮组件，颜色可自定义
class IconMenu extends React.Component {
	render(){
		return(
			<a className={"aMenuIcon " + this.props.iconName} href={this.props.url}>
				<span>{this.props.title}</span>
			</a>
		);
	}
}

/*****************************************************/
module.exports = IconMenu;