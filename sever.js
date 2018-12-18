const express = require("express")();
const mysql = require("mysql");
const static = require("express-static");
const url = require("url");
const ejs = require("ejs");
var sql = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"admin",
	database:"erp",
	timezone:"08:00"
})

//设置首页路由
express.get("/",(request,response)=>{
	ejs.renderFile("static/index.html",{},(error,data)=>{
		if(error){
			response.end(data);
		}
		else{
			response.end(data);
		}
	})
})
//获取数据库员工信息路由
express.get("/getworkersInfo",(request,response)=>{
	sql.query(`select * from workersList`,(error,data)=>{
		if(error){
			response.send("查询失败")
		}
		else{
			//重载性别数据
			for(let item of data){
				item.sex = item.sex ? "男":"女"
			}
			//重载是否在职数据
			for(let item of data){
				item.dimission = item.dimission ? "在职":"离职"
			}
			response.send(data);
		}
	})
})
//删除信息接口
express.get("/deleteworker",(request,response)=>{
	var id = url.parse(request.url,true).query.id;
	sql.query(`delete from workersList where id=${id}`,(error,data)=>{
		if(error){
			response.end("error");
			console.log("请求失败")
		}
		else{
			response.end("success");
			console.log("删除成功")
		}
	})
})
//请求参数
	//name			姓名  String *
	//birthday 		生日 Date yy-mm-dd*
	//sex 			性别
	//basicSalary	薪资	 Number *
	//joinDate		入职时间 Date yy-mm-dd*
	//dimission		是否离职*
	//department	部门 String *	
	//title			岗位 String *
	//leaveDate		离职时间 Date yy-mm-dd*
//添加信息接口
express.get("/addworker",(req,res)=>{
	//拿到前台像后台发送的数据
	var parms = url.parse(req.url,true).query;
	// console.log(parms);
	//sex && dimission 数据重载
	if (parms.sex == "男") {
		parms.sex = 1;
	}else{
		parms.sex = 0;
	}
	if (parms.dimission == "在职") {
		parms.dimission = 1;
	}else{
		parms.dimission = 0;
	}
	//判断leavedate是否有值，做重载
	if (!parms.leaveDate) {
		var sqlInto = `INSERT INTO workersList (name,sex,birthday,basicSalary,joinDate,dimission,department,title) values ("${parms.name}","${parms.sex}","${parms.birthday}","${parms.basicSalary}","${parms.joinDate}","${parms.dimission}","${parms.department}","${parms.title}")`;
	}else{
		var sqlInto = `INSERT INTO workersList (name,sex,birthday,basicSalary,joinDate,dimission,department,title,leaveDate) values ("${parms.name}","${parms.sex}","${parms.birthday}","${parms.basicSalary}","${parms.joinDate}","${parms.dimission}","${parms.department}","${parms.title}","${parms.leaveDate}")`;
	}
	sql.query(sqlInto,(error,data)=>{
		if (error) {
			console.log(error);
			console.log("操作失败");
			res.end("error")
		}else{
			console.log("添加成功")
			res.end("success");
		}
	})
})
//编辑信息接口
express.get("/editworker",(req,res)=>{
	//拿到前台像后台发送的数据
	var parms = url.parse(req.url,true).query;
	// console.log(parms);
	//sex && dimission 数据重载
	if (parms.sex == "男") {
		parms.sex = 1;
	}else{
		parms.sex = 0;
	}
	if (parms.dimission == "在职") {
		parms.dimission = 1;
	}else{
		parms.dimission = 0;
	}
	//判断leavedate是否有值，做重载
	if (!parms.leaveDate) {
		var sqlInto = `update workersList set name='${parms.name}',sex='${parms.sex}',birthday='${parms.birthday}',basicSalary='${parms.basicSalary}',joinDate='${parms.join}',dimission='${parms.dimission}',department='${parms.department}',title='${parms.title}' where id='${parms.id}'`;
	}else{
		var sqlInto = `update workersList set name='${parms.name}',sex='${parms.sex}',birthday='${parms.birthday}',basicSalary='${parms.basicSalary}',joinDate='${parms.join}',dimission='${parms.dimission}',department='${parms.department}',title='${parms.title}',leaveDate='${parms.leaveDate}' where id='${parms.id}'`;
	}
	sql.query(sqlInto,(error,data)=>{
		if (error) {
			console.log(error);
			console.log("修改操作失败");
			res.end("error")
		}else{
			console.log("修改操作成功")
			res.end("success");
		}
	})
})


//工资管理路由
//设置首页路由
express.get("/",(request,response)=>{
	ejs.renderFile("static/wage.html",{},(error,data)=>{
		if(error){
			response.end(data);
		}
		else{
			response.end(data);
		}
	})
})
//获取数据库员工信息路由
express.get("/getwagesInfo",(request,response)=>{
	sql.query(`select * from wagelist`,(error,data)=>{
		if(error){
			response.send("查询失败")
		}
		else{
			//重载是否在职数据
			for(let item of data){
				item.setTlement = item.setTlement ? "是":"否"
			}
			response.send(data);
		}
	})
})
//删除信息接口
express.get("/deletewage",(request,response)=>{
	var id = url.parse(request.url,true).query.id;
	sql.query(`delete from wagelist where id=${id}`,(error,data)=>{
		if(error){
			response.end("error");
			console.log("请求失败")
		}
		else{
			response.end("success");
			console.log("删除成功")
		}
	})
})
//请求参数
	// id:"",				id号
	// name:"",			姓名  String *
	// salary:"",			应发工资
	// startDate:"",		起始时间
	// endDate:"",			结束时间
	// realWages:"",		实发工资
	// setTlement:"是",		是否结算
	// remark:""			备注
//添加信息接口
express.get("/addwage",(req,res)=>{
	//拿到前台像后台发送的数据
	var parms = url.parse(req.url,true).query;
	// console.log(parms);
	// setTlement 数据重载
	if (parms.setTlement == "是") {
		parms.setTlement = 1;
	}else{
		parms.setTlement = 0;
	}
	//判断leavedate是否有值，做重载
	if (!parms.endDate) {
		var sqlInto = `INSERT INTO wagelist (id,name,salary,startDate,realWages,setTlement) values ("${parms.id}","${parms.name}","${parms.salary}","${parms.startDate}","${parms.realWages}","${parms.setTlement}")`;
	}else{
		var sqlInto = `INSERT INTO wagelist (id,name,salary,startDate,realWages,setTlement,endDate) values ("${parms.id}","${parms.name}","${parms.salary}","${parms.startDate}","${parms.realWages}","${parms.setTlement}","${parms.endDate}")`;
	}
	sql.query(sqlInto,(error,data)=>{
		if (error) {
			console.log(error);
			console.log("操作失败");
			res.end("error")
		}else{
			console.log("添加成功")
			res.end("success");
		}
	})
})
//编辑信息接口
express.get("/editwage",(req,res)=>{
	//拿到前台像后台发送的数据
	var parms = url.parse(req.url,true).query;
	// console.log(parms);
	// setTlement 数据重载
	if (parms.setTlement == "是") {
		parms.setTlement = 1;
	}else{
		parms.setTlement = 0;
	}
	//判断leavedate是否有值，做重载
	if (!parms.endDate) {
		var sqlInto = `INSERT INTO wagelist (id,name,salary,startDate,realWages,setTlement) values ("${parms.id}","${parms.name}","${parms.salary}","${parms.startDate}","${parms.realWages}","${parms.setTlement}")`;
	}else{
		var sqlInto = `INSERT INTO wagelist (id,name,salary,startDate,realWages,setTlement,endDate) values ("${parms.id}","${parms.name}","${parms.salary}","${parms.startDate}","${parms.realWages}","${parms.setTlement}","${parms.endDate}")`;
	}
	sql.query(sqlInto,(error,data)=>{
		if (error) {
			console.log(error);
			console.log("修改操作失败");
			res.end("error")
		}else{
			console.log("修改操作成功")
			res.end("success");
		}
	})
})

express.listen(81);
express.use(static(`${__dirname}/static`))