var React = require("react");

//左侧导航栏单独按钮组件(二级)
class LeftNavLiLevel_2 extends React.Component {
	render(){
		var liClass = "";
		if(this.props.data.onThis){
			liClass = "onthis";
		}
		return(
			<li className={liClass}>
				<a href={this.props.data.fullUrl}><strong>{this.props.data.name}</strong></a>
			</li>
		);
	}
}

//左侧导航栏二级菜单打包组件
class LeftNavLiLevel_2_Box extends React.Component {
	render(){
		
		var level2Array = this.props.data;

		/* 
		 * 循环插入二级导航组件至当前一级菜单组件
		 * 这里的index是数组元素的数字索引
		 */
		var level2Nav = [];

		if(level2Array.length > 0){
			level2Array.forEach(function(value,index){
				// key={index} 用于React优化性能
				level2Nav.push(<LeftNavLiLevel_2 key={index} data={value} />);
			}.bind(this));
		}
		
		var classNameStr = "level2";
		if(this.props.navOpen){
			classNameStr += " onthis";
		}

		return(
			<ul className={classNameStr}>
				{level2Nav}
			</ul>
		);
	}
}

//左侧导航栏单独按钮组件(一级)
class LeftNavLiLevel_1 extends React.Component {
	render(){
		/*
		 * 二级菜单有选中项的，展开此二级菜单
		 */
		var liClass = "";
		if(this.props.data.onThis){
			liClass = "onthis";
		}
		
		//给不含有二级菜单的一级菜单，附上连接
		if(!this.props.data.level2){
			var hrefUrl = this.props.data.fullUrl;
		}else{
			var hrefUrl = "javascript:void(0);";
			liClass += " havelevel";
		}

		return(
			<li className={liClass}>
				<a className={"level1Li"} href={hrefUrl}><strong>{this.props.data.name}</strong></a>
				<LeftNavLiLevel_2_Box data={this.props.data.level2} navOpen={this.props.data.onThis} />
			</li>
		);
	}
}

//左侧导航栏合并组件
class LeftNavPrint extends React.Component {
	render(){
		/*
		 * 利用自执行函数，将url信息转成完整Url路径，写入原Json数据
		 * 二级菜单开启数据处理
		 */
		leftNavListArray = (function getUrl(leftNavList){
			for(var i = 0; i <= leftNavList.length-1; i++){
				var leftNavListData = leftNavList[i];
				leftNavListData.fullUrl = "./url/" + leftNavListData.url;
				
				if(leftNavListData.level2){
					//默认状态二级菜单关闭
					var navOpen = false;
					//查找二级菜单是否含有已被选中菜单
					for(var q = 0; q <= leftNavListData.level2.length-1; q++ ){
						//如果子菜单中有当前选中项，则展开子菜单
						if(leftNavListData.level2[q].onThis && !navOpen){
							navOpen = true;
						}

						var leftNavListLeve2Data = leftNavListData.level2[q];
						leftNavListLeve2Data.fullUrl = "./url/" + leftNavListLeve2Data.url;
						leftNavListData.level2[q] = leftNavListLeve2Data;
					}
					if(navOpen){
						leftNavListData.onThis = true;
					}else{
						//默认状态二级菜单关闭
						leftNavListData.onThis = false;
					}
				}

				leftNavListArray[i] = leftNavListData;
			}

			return leftNavListArray;
		})(leftNavListArray);

		//组装一级菜单
		var leftNav = [];
		leftNavListArray.forEach(function(value,index){
			leftNav.push(<LeftNavLiLevel_1 key={index} data={value} />);
		}.bind(this));

		return(
			<ul className={"level1"}>
				{leftNav}
			</ul>
		);
	}
}

module.exports = LeftNavPrint;