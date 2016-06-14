var React = require("react");

/*
 * 完善初始化菜单的Json数据
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

/*****************************************************/
//左侧导航栏二级菜单打包组件
class LeftNavLiLevel_2_Box extends React.Component {
	render(){
		/* 
		 * 循环插入二级导航组件至当前一级菜单组件
		 * 这里的index是数组元素的数字索引
		 */
		var level2Array = this.props.data;
		var level2Nav = [];

		if(level2Array.length > 0){
			level2Array.forEach(function(value,index){
				// key={index} 用于React优化性能
				level2Nav.push(<LeftNavLiLevel_2 key={index} data={value} />);
			}.bind(this));
		}
		
		var styleObj = {}
		var classNameStr = "level2";
		if(this.props.navOpen){
			classNameStr += " onthis";
			styleObj.height = (level2Array.length * 39) + "px";
		}else{
			styleObj.height = 0;
		}

		return(
			<ul className={classNameStr} style={styleObj}>
				{level2Nav}
			</ul>
		);
	}
}

/*****************************************************/
//左侧导航栏单独按钮组件(一级)
class LeftNavLiLevel_1 extends React.Component {
	/*
	 * ES6中绑定事件需要通过bind(this)来传递this.props
	 */
	handleClick(e){
		//处理二级菜单的打开关闭
		if(this.props.data.level2){
			//点击修改按钮的打开状态
			this.props.clickLi();
			e.stopPropagation();
			e.preventDefault();
		}
	}
	render(){
		var liClass = "";
		//给不含有二级菜单的一级菜单，附上连接
		if(!this.props.data.level2){
			var hrefUrl = this.props.data.fullUrl;
		}else{
			var hrefUrl = "javascript:void(0);";
			liClass = "havelevel";
		}

		//二级菜单有选中项的，展开此二级菜单
		if(this.props.liState.onThis){
			//console.log(this.props.liState);
			liClass += " onthis";
		}

		return(
			<li className={liClass}>
				<a className={"level1Li"} href={hrefUrl} onClick={this.handleClick.bind(this)}><strong>{this.props.data.name}</strong></a>
				<LeftNavLiLevel_2_Box data={this.props.data.level2} navOpen={this.props.liState.onThis} />
			</li>
		);
	}
}

/*****************************************************/
//左侧导航栏合并组件
class LeftNavPrint extends React.Component {
	/*
	 * 通过修改ClassName，修改按钮的选中状态
	 */
	changeClass(index){
		return function(){
			var navClassName = this.state.navClassName;
			navClassName[index].onThis = !navClassName[index].onThis;

			this.setState({
				navClassName : navClassName
			})
			console.log("Cilck Level1 Li " + navClassName[index].onThis);
		}.bind(this);
	}
	/*
	 * 用State来储存会改变的内容,储存的内容通过this.state调用
	 * 这里用了储存className
	 * ES6的State语法和ES5的不同
	 * 技术参考：https://segmentfault.com/q/1010000005043145
	 */
	constructor(props) {
		super(props);
		this.state = {
			navClassName: [
				/*{
					onThis: fasle
				}*/
			]
		};
	}
	render(){
		var leftNav = [];

		//组装一级菜单
		leftNavListArray.forEach(function(value,index){

			//初始化State数据
			if(!this.state.navClassName[index]){
				if(leftNavListArray[index].onThis)
					this.state.navClassName[index] = {
						onThis: true
					}
				else{
					this.state.navClassName[index] = {
						onThis: false
					}
				}
			}

			leftNav.push(<LeftNavLiLevel_1 key={index} data={value} liState={this.state.navClassName[index]} clickLi={this.changeClass(index)} />);
		}.bind(this));

		return(
			<ul className={"level1"}>
				{leftNav}
			</ul>
		);
	}
}

/*****************************************************/
module.exports = LeftNavPrint;