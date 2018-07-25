window.onload = function(){ 
    initTbody(pageArray);
    total(pageArray);
    goPage(1,2);
    
}; 

var count = 1;// 用来后面添加select的option数目的确定
var currentPage,// 当前页数
    totalSize,// 总共的记录数
    totalPage;// 总共的页数
    psize = 2;// 每页要显示的记录数
// tfoot的一些数据
var dataTotal = document.getElementById("total");
var tPage = document.getElementById("totalPage");
var cPage = document.getElementById("currentPage");
var pageSelect = document.getElementById("page-select");
// 初始化最初的表格的生数据    
var pageArray=[
{index:1,name:'原炀',age:27,producer:'水千丞',height:188,bro:'顾靑裴',product:"《针锋对决》"},
{index:2,name:'顾海',age:18,producer:'柴鸡蛋',height:190,bro:'白洛因',product:"《overdose》"},
{index:3,name:'沈巍',age:10000,producer:'p大',height:187,bro:'赵云澜',product:"《镇魂》"},
{index:4,name:'柳辰风',age:23,producer:'妖然',height:185,bro:'楚沐',product:"《年少》"},
{index:5,name:'宋居寒',age:30,producer:'水千丞',height:181,bro:'何故',product:"《一醉经年》"},
{index:6,name:'邵群',age:31,producer:'水千丞',height:180,bro:'李程秀',product:"《shit》"},
{index:7,name:'袁纵',age:26,producer:'柴鸡蛋',height:189,bro:'夏耀',product:"《盛势》"},
{index:8,name:'彭泽',age:24,producer:'柴鸡蛋',height:184,bro:'李真真',product:"《盛势》"},
{index:9,name:'陆风',age:25,producer:'蓝淋',height:186,bro:'程亦辰',product:"《双程》"},
];

/*
**循环添加跳转到具体页的option
**总共有多少个页，就有多少个option
*/
var optionPage = function(){
    var optionStr = "";
    while(count<=totalPage){
        optionStr+="<option>"+count+"</option>";
        count++;
    }
    pageSelect.innerHTML = optionStr;
    count = 1;
};


/*
**计算总记录数以及总页数
**参数arr是要进行分页的数据数组
**每次进行操作的时候，产生新的对象，需要进行计算总量
*/
var total = function(arr){
    totalSize = arr.length;
    totalPage = Math.ceil(totalSize/psize);
    dataTotal.innerHTML=totalSize;
    tPage.innerHTML = totalPage;
    optionPage();
};

/*
**初始化table的身体
*/
function initTbody(trs){
	var tbody='';
	trs.forEach(function(item){
		tbody+='<tr id=\"everyLine\" onclick=\"editLine(this)\">'+
		'<td>' + item.index + '</td>'+
		'<td>' + item.name + '</td>'+
		'<td>' + item.producer + '</td>'+
		'<td>' + item.height + '</td>'+
		'<td>' + item.bro + '</td>'+
		'</tr>'
	});
	document.getElementById('table-body').innerHTML = tbody;
}

/*
**几个按钮失效的操作
*/
var buttonDisabled = function(){
    var nextPage = document.getElementById("nextPage");
    var tailPage = document.getElementById("tailPage");
    var lastPage = document.getElementById("lastPage");
    var firstPage = document.getElementById("firstPage");
    // 下一页和尾页按钮的失效
    if(currentPage == totalPage) {
        // 下一页按钮失效   
        nextPage.disabled=true;
        // 尾页失效      
        tailPage.disabled=true;     
    }else {
        nextPage.disabled=false;
        tailPage.disabled=false;
    }   
    // 上一页和首页按钮的失效
    // 由于page-select里的数据全是字符串
    if(parseInt(currentPage) === 1) {
        // 上一页按钮失效       
        lastPage.disabled=true;
        // 首页失效      
        firstPage.disabled=true;
    }else {
        lastPage.disabled=false;
        firstPage.disabled=false;
    }
};

/*
**弹出层的新增节点
*/
var popUpLayer = function(){
    // 创建一个div节点
    divLayer = document.createElement("div");
    // 增加一个id/class属性
    divLayer.id = "div-layer";
    divLayer.className = "div-layer";
    // 创建一个table节点
    tableLayer = document.createElement("table");
    tableLayer.id = "tableLayer-top";
    //  tableLayer.class = "tableLayer-top";
    tableLayer.className = "tableLayer-top";
    // 设计内容，添加需要填写的字段
    // 首先需要计算字段的数目，但是数组的项是对象，只能遍历来看个数
    // 一个求object的项的数目的函数
   
};

/*
**计算一个对象的项的个数
*/
var computeLength = function(o) {
        var counter = 0;
        for (var i in o) {
            counter++;
        }
        return counter;
};

/*
**对表格的身高一列进行排序
*/
var sortHeight = function(obj){
	var id = obj.getAttribute("id");
	var arr = pageArray;
	function compare(property){
		return function(obj1,obj2){
			var value1 = obj1[property];
			var value2 = obj2[property];
			if(id === "up-arrow"){
				return value1 - value2; // 升序
			}else if(id === "down-arrow"){
				return value2 - value1;
			}
			
		}
	}
	arr.sort(compare("height"));
	initTbody(arr);
    total(arr);
	goPage(1,psize);
};

/*
**跳页的函数
**pno---要去往的页数
**psize---每页的数目
**arr是total()的参数，也就是要分页的数据数组
*/
var goPage = function(pno,pSize){
    // 当前页数
    currentPage = pno;
    // 起始行和尾行
    var startRow = (currentPage - 1) * pSize+1;
    var endRow = currentPage * pSize;
    endRow = endRow > totalSize ? totalSize : endRow;
    // 获取tbody对象
    var tops = document.getElementById("table-tops");
    // 遍历数据实现分页
    for(var i=1;i<=totalSize;i++){
    	var tableBody = document.getElementById("table-body");
    	var irow = tableBody.children[i-1];
    	if(i>=startRow && i<=endRow){
            irow.style.display = "block";    
        }else{
            irow.style.display = "none";
        }
    }
    // 处理tfoot的数据
    cPage.innerHTML = currentPage;
    optionPage();     
    
    // 控制按钮失效
    buttonDisabled();
};


/*
**表格最后一行，关于页数与记录数以及跳页的
*/
// 上一页
var lastPage = function(){
	currentPage = parseInt(document.getElementById("currentPage").innerHTML);
	goPage(currentPage-1,psize);
};
// 下一页
var nextPage = function(add){
	currentPage = parseInt(document.getElementById("currentPage").innerHTML);
	goPage(currentPage+1,psize);
};
// 直接到尾页
var tailPage = function(){
	currentPage = parseInt(document.getElementById("currentPage").innerHTML);
	goPage(totalPage,psize);
};
// 跳转到具体的页面
var jumpPage = function(){
	var jumpPageSelect = document.getElementById("page-select");
	var value = jumpPageSelect.value;
    //  console.log("要跳转的页数是："+value+" "+typeof value);
    // 这里的数据类型是string
	goPage(value,psize);
};


/*
**表格的增加一条记录的操作
*/
var addLine = function(){
    // 创建弹出层
    popUpLayer();
    // pageArray数组中某一项的数目
    var len = computeLength(pageArray[0]);
    // 构造要添加的表格内容
    var str="";
    // 把表格第一列内容全放在一个数组中，用的时候直接取出来
    var objectArrayContent = ["index:","name:","age:","producer:","height:","bro:","product:"];
    // 循环添加每一行tr
    for (var i = 0;i < len;i++) {
    	str+="<tr><td>"+objectArrayContent[i]+"</td><td><input /></td></tr>";
    }
    str+="<tr><td><button id=\"button-addRecrod\">添加</button></td>"+
    "<td><button id=\"button-backToOrigin\">取消</button></td></tr>";  
    tableLayer.innerHTML = str;
    //  console.log("要添加的一条记录是："+str);
    divLayer.appendChild(tableLayer);
    document.body.appendChild(divLayer);
    
    // 添加数据到表格中
    // 先取出那些数据
    document.getElementById("button-addRecrod").onclick = function(){
        var tbody = tableLayer.children[0];
        var newRecord = [];// 每个项都是字符串
	    for(var i=0;i<len;i++){
	    	// 之所以没有取出数据是因为，获取的是innerHTML，并不是对象object
	    	// 所以需要获得这个input标签对象才能够获取到它的value属性
	    	// console.log(tbody.getElementsByTagName("tr")[i].children[1].children[0].value);
	    	// console.log(typeof tbody.getElementsByTagName("tr")[i].children[1].children[0].value);--string
            newRecord[i] = tbody.getElementsByTagName("tr")[i].children[1].children[0].value;
	    }
	    // 构造一条记录
	    var recordObject = {index:parseInt(newRecord[0]),name:newRecord[1],age:parseInt(newRecord[2]),
	    	producer:newRecord[3],height:parseInt(newRecord[4]),bro:newRecord[5],product:newRecord[6]};
	    // 逐一复制pageArray数据
	    var newArr=[];
	    for(var i=0;i<pageArray.length;i++){
	    	newArr[i] = pageArray[i];
	    }
        newArr.push(recordObject);
       // 计算totalSize和totalPage,goPage中有total函数
	    initTbody(newArr);
        total(newArr);       
	    goPage(1,2);
	    document.body.removeChild(divLayer);
    }
   
    // 关闭弹窗
    document.getElementById("button-backToOrigin").onclick = function(){
    	document.body.removeChild(divLayer);
    }   
};

// 根据记录的top和bottom的姓名来查询并且显示出结果
var searchLine = function(){
	// 取出输入的姓名关键字
	var name = document.getElementById("search-name");
	var value = name.value;// 字符串类型
	// 比照表格进行查询
	var arr = [];
	pageArray.forEach(function(item){
		if(value === item.name || value === item.bro){
			arr.push(pageArray[item.index-1]);
		}
	});
    total(arr);
    goPage(1,2);
	initTbody(arr);
    buttonDisabled();
};

// 编辑某一行的数据
var editLine = function(obj){
    // 创建一个弹出层
    popUpLayer();
    // pageArray数组中某一项的数目
    var len = computeLength(pageArray[0]);
    // 把选中的那行的每一列数据都取出来，放在一个数组中，每一个数据都是字符串
    // console.log(obj.children[0].innerHTML+" "+typeof obj.children[0].innerHTML);// 1 string
    // 找出来选中的那条数据在哪里
    var counter;
    for(var i=0;i<pageArray.length;i++){
        if(parseInt(obj.children[0].innerHTML) == pageArray[i].index) {
            counter = i;
        }
    }
    // 一个用于比较的副本和一个直接读取的数据副本
    // object.values方法返回一个数组，成员是遍历的键值
    var chosenLine = Object.values(pageArray[counter]);
    // 构造要添加的表格内容
    var str="";
    // 把表格第一列内容全放在一个数组中，用的时候直接取出来
    var objectArrayContent = ["index:","name:","age:","producer:","height:","bro:","product:"];
    // 循环添加每一行tr
    for (var i = 0;i < len;i++) {
        str+="<tr><td>"+objectArrayContent[i]+"</td><td><input value = "+chosenLine[i]+" /></td></tr>";
    }
    str+="<tr><td><button id=\"button-modify\">修改</button></td>"+
    "<td><button id=\"button-backToOrigin\">取消</button></td></tr>";  
    tableLayer.innerHTML = str;
    divLayer.appendChild(tableLayer);
    document.body.appendChild(divLayer);

    // 修改记录
    document.getElementById("button-modify").onclick = function(){
        var tbody = tableLayer.children[0];
        var newRecord = [];// 每个项都是字符串
        for(var i=0;i<len;i++){
            // 之所以没有取出数据是因为，获取的是innerHTML，并不是对象object
            // 所以需要获得这个input标签对象才能够获取到它的value属性
            newRecord[i] = tbody.getElementsByTagName("tr")[i].children[1].children[0].value;
        }; 
        // 判断两个数组内容相等的项数
        var equal = 0;
        for(var i=0;i<len;i++){
            if(chosenLine[i].toString() === newRecord[i] ){
                equal++;
            }
        }
        if(equal === len){
            // 数据没有发生变化
            document.body.removeChild(divLayer);
        }else {
            // 数据发生了变化
            // 把数组的每一项放在一个对象中
            var newObj = {"index":parseInt(newRecord[0]),"name":newRecord[1],"age":parseInt(newRecord[2]),
            "producer":newRecord[3],"height":parseInt(newRecord[4]),"bro":newRecord[5],"product":newRecord[6]};
            var newArr=[];
            for(var i=0;i<pageArray.length;i++){
                newArr[i] = pageArray[i];
            }
            newArr.splice(counter,1,newObj);
            initTbody(newArr);
            total(newArr);
            goPage(1,2);
            optionPage();
            document.body.removeChild(divLayer);
        }
    }

    // 关闭弹窗
    document.getElementById("button-backToOrigin").onclick = function(){
        document.body.removeChild(divLayer);
    }     
}; 

// 删除某一行的数据
var delLine = function(){

    // 创建一个div节点
    var div = document.createElement("div");
    div.id="div-del";
    div.className="div-del";    

    var table = document.createElement("table");
    table.className = "del-table";
    var str ="";
    str+="<tr><td colspan=\"2\">你想删除哪一项啊</td></tr><tr><td colspan=\"2\"><input id=\"number-input\" type=\"number\" /></td></tr>"+
    "<tr><td><button id=\"button-del\">删除</button></td><td><button id=\"button-backToOrigin\">取消</button></td></tr>";
    table.innerHTML = str;
    div.appendChild(table);
    document.body.appendChild(div);
    var numberInput = document.getElementById("number-input");
    numberInput.max = 9;
    numberInput.min = 0;
   
    document.getElementById("button-del").onclick = function(){
        var value = numberInput.value;
        console.log("value:"+value);
        // 逐一复制pageArray数据
        var newArr=[];
        for(var i=0;i<pageArray.length;i++){
            newArr[i] = pageArray[i];
        }
        console.log(newArr);
        newArr.splice(value,1);
        console.log(pageArray);
        console.log(newArr);
        initTbody(newArr);
        total(newArr);       
        goPage(1,2);
        document.body.removeChild(div);
    };
    
    // 关闭弹窗
    document.getElementById("button-backToOrigin").onclick = function(){
        document.body.removeChild(div);
    }  
};














