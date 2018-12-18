var  root = new Vue({
	el:"#wrap",
	data(){
		return {
			workerlistInfo:null,
			// activeName:"first",
			popup:{
				visible:false,
				message:"添加员工",
				data:{
					name:"",
					sex:"男",
					birthday:"",
					basicSalary:"",
					joinDate:"",
					dimission:"在职",
					department:"",
					title:"",
					leaveDate:"",
				},
				
			},
			rules:{
				name:[
					{
						required:true,
						message:"请输入姓名",
						trigger:"blur"
					},
					{
						min:2,
						max:8,
						message:"长度在2-8之间",
						trigger:"blur"
					}
				],
				basicSalary:[
					{
						required:true,
						message:"不能为空",
						trigger:"blur"
					}
				],
				dimission:[
					{
						required:true,
						message:"不能为空",
						trigger:"blur"
					}
				],
				department:[
					{
						required:true,
						message:"不能为空",
						trigger:"blur"
					}
				],
				title:[
					{
						required:true,
						message:"不能为空",
						trigger:"blur"
					}
				],
				leaveDate:[
					{
						required:true,
						message:"不能为空",
						trigger:"blur"
					}
				]
			}
		}
	},
	methods:{
		//左侧tab切换
		// handleClick(tab,event){
		// 	console.log(tab,event)
		// }
		//删除按钮
		deleteworker(id){
			var id = id.row.id;
			this.$confirm("是否确认删除","删除操作",{
				type:"warning",
				callback(action){
					if (action === "confirm") {
						axios.get(`http://192.168.1.117:81/deleteworker?id=${id}`).then((res)=>{
							if (res.data == "success") {
								axios.get("http://192.168.1.117:81/getworkersInfo").then((res)=>{
									root.workerlistInfo = res.data;
								})
								root.$message({
									type:"success",
									message:"删除成功"
								})
							}else{
								root.$message({
									typr:"warning",
									message:"删除失败"
								})
							}
						})
					}else{
						this.$message({
							typr:"info",
							message:"取消操作"
						})
					}
				}
			})
		},
		//添加按钮
		addbutton(){
			this.popup.visible = true;
			this.popup.message = "添加员工信息";
		},
		//编辑按钮
		editbutton(index){
			this.popup.visible = true;;
			this.popup.message = "编辑员工信息";
			var data = this.workerlistInfo[index]
			for(let item in data){
				this.popup.data[item] = data[item];
			}
		},
		//取消按钮
		cancle(){
			this.popup.visible = false;
			//消息提示
			this.$message({
				type:"info",
				message:"取消操作"
			})
		},
		//确定按钮
		determine(x){
			// this.popup.visible = false;
			this.$refs[x].validate((result)=>{
				if (result) {
					if (this.popup.message == "添加员工信息") {
						//添加按钮,前端向后端发送添加请求
						axios.get("/addworker",{
							params:this.popup.data
						}).then((res)=>{
							if (res.data == "success") {
								axios.get("http://192.168.1.117:81/getworkersInfo").then((res)=>{
									root.workerlistInfo = res.data;
								})
								root.popup={
									visible:false,
									message:"添加员工",
									data:{
										name:"",
										sex:"男",
										birthday:"",
										basicSalary:"",
										joinDate:"",
										dimission:"在职",
										department:"",
										title:"",
										leaveDate:"",
									}
								},
								root.$message({
									type:"success",
									message:"添加成功"
								})
							}
							//消息提示
							else{
								this.$message({
									type:"warning",
									message:"添加失败"
								})
							}
						})
					}
					if (this.popup.message == "编辑员工信息") {
						//编辑按钮,前端向后端发送添加请求
						axios.get("/editworker",{
							params:this.popup.data
						}).then((res)=>{
							if (res.data == "success") {
								axios.get("http://192.168.1.117:81/getworkersInfo").then((res)=>{
									root.workerlistInfo = res.data;
								})
								root.popup={
									visible:false,
									message:"添加员工",
									data:{
										name:"",
										sex:"男",
										birthday:"",
										basicSalary:"",
										joinDate:"",
										dimission:"在职",
										department:"",
										title:"",
										leaveDate:"",
									}
								},
								root.$message({
									type:"success",
									message:"修改成功成功"
								})
							}
							//消息提示
							else{
								this.$message({
									type:"warning",
									message:"修改失败"
								})
							}
						})
					}
				}
			})
		}
	},
	mounted(){
		axios.get("http://192.168.1.117:81/getworkersInfo").then((res)=>{
			this.workerlistInfo = res.data
		})
	}
})