import React from "react";

/*****************************************************/
//轮播组件
class FlashBanner extends React.Component {
	render(){
		var className = "indexFlash animateStart";
		if(this.props.classData){
			className += " animateEnd";
		}

		var styleObj = {}
		styleObj.backgroundImage = "url(./images/banner/" + this.props.data[0].img + ")";

		return(
			<div className={className}>
				<a href={this.props.data[0].url} target={"_black"} style={styleObj}></a>
			</div>
		);
	}
}

/*****************************************************/
module.exports = FlashBanner;