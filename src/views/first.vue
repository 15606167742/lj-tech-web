<template>
	<div class="first">
		<div class="box box1">
			<div class="title">活跃用户数量</div>
			<div class="cont">
				<div class="cell color_1" v-for="a in activeUserList">
					<div class="bubbles">{{a.count}}</div>
					<div class="datetime">{{a.datetime}}</div>
				</div>
			</div>
		</div>
		<div class="box box2">
			<div class="title">每日实名人数</div>
			<div class="cont">
				<div class="cell color_6" v-for="r in realNameList">
					<div class="bubbles">{{r.count}}</div>
					<div class="datetime">{{r.datetime}}</div>
				</div>
			</div>
		</div>
		<div class="box box2">
			<div class="title">每日注册人数</div>
			<div class="cont">
				<div class="cell color_2" v-for="r in registerMemberList">
					<div class="bubbles">{{r.count}}</div>
					<div class="datetime">{{r.datetime}}</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="box box3">
				<div class="title">DD</div>
				<div ref="chart1" class="chart"></div>
			</div>
			<div class="box box3">
				<div class="title">能量值</div>
				<div ref="chart2" class="chart"></div>
			</div>
		</div>
		<div class="box box2">
			<div class="title">礼包购买数</div>
			<div class="cont">
				<div class="cell color_3" v-for="r in reelPurchaseList">
					<div class="bubbles">{{r.count}}</div>
					<div class="datetime">{{r.datetime}}</div>
				</div>
			</div>
		</div>
		<div class="box box2">
			<div class="title">能量值活跃用户</div>
			<div class="cont">
				<div class="cell color_4" v-for="p in powerUserList">
					<div class="bubbles">{{p.count}}</div>
					<div class="datetime">{{p.datetime}}</div>
				</div>
			</div>
		</div>
		<div class="box box2">
			<div class="title">有效用户数量</div>
			<div class="cont">
				<div class="cell color_5" v-for="u in usefulUserList">
					<div class="bubbles">{{u.count}}</div>
					<div class="datetime">{{u.datetime}}</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="box box4">
				<div class="title">礼包</div>
				<div ref="chart3" class="chart"></div>
			</div>
		</div>
		<div class="box box2">
			<div class="title">每日DD</div>
			<div class="cont">
				<div class="cell color_7" v-for="r in dailyDDList">
					<div class="block">{{r.count}}</div>
					<div class="datetime">{{r.datetime}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeUserList: [],
				realNameList: [],
				registerMemberList: [],
				reelPurchaseList: [],
				powerUserList: [],
				usefulUserList: [],
				dateList: [],
				pointIncomeList: [],
				pointExpendList: [],
				powerAddList: [],
				powerSubList: [],
				reelTypeList: [],
				reelQtyList: [],
				dailyDDList: [],
				chart1: {},
				chart2: {},
				chart3: {},
				//柱状图
				option_bar: {
					grid: {
						left: '15%',
						bottom: 30,
						width: 'auto',
						height: 'auto'
					},
					tooltip: {
						show: true,
						trigger: 'item'
					},
					legend: {
						show: true,
						top: 8,
						textStyle: {
							color: "#333",
						},
					},
					xAxis: {
						show: true,
						type: 'category',
						scale: false,
						axisLine: {
							show: true,
							lineStyle: {
								color: '#333',
								width: 1,
								type: 'solid'
							}
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: true
						},
						splitLine: {
							show: false
						}
					},
					yAxis: {
						show: true,
						type: 'value',
						scale: false,
						axisLine: {
							show: true,
							lineStyle: {
								color: '#333',
								width: 1,
								type: 'solid'
							}
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: true
						},
						splitLine: {
							show: true,
							lineStyle: {
								opacity: 0.5,
							},
						}
					},
					series: [{
						type: 'bar',
						seriesLayoutBy: 'row',
						barMaxWidth: 50,
					}, {
						type: 'bar',
						seriesLayoutBy: 'row',
						barMaxWidth: 50,
					}],
					textStyle: {
						color: "#333",
					},
					color: ['#FF0000', '#66DDFF', '#FFCC00', '#22EE66'],
					dataset: {
						source: [
							['2016', '2017', '2018', '2019', '2020'],
							[40, 50, 55, 45, 60],
							[50, 50, 60, 70, 70],
							[20, 30, 25, 15, 50],
							[20, 20, 30, 30, 10]
						],
						dimensions: ['时间', '销量', '库存', '种类一', '种类二'],
						sourceHeader: false,
					},
				},
			};
		},
		mounted() {
			this.chart1 = this.$echarts.init(this.$refs.chart1);
			this.chart2 = this.$echarts.init(this.$refs.chart2);
			this.chart3 = this.$echarts.init(this.$refs.chart3);
			window.onresize = () => {
				this.chart1.resize();
				this.chart2.resize();
				this.chart3.resize();
			}
			this.getAllData();
			this.interval = setInterval(()=>{
				this.getAllData();
			}, 300000)
		},
		destroyed() {
			clearInterval(this.interval);
		},
		methods: {
			getAllData() {
				this.$axios.get('/admin/dateStatistic/queryDate')
					.then(data => {
						this.clearList();
						data.forEach(item => {
							this.activeUserList.push({
								id: item.id,
								count: item.activeQty?item.activeQty:0,
								datetime: item.recordDate
							});
							this.realNameList.push({
								id: item.id,
								count: item.registerCount?item.registerCount:0,
								datetime: item.recordDate
							});
							this.registerMemberList.push({
								id: item.id,
								count: item.addCount?item.addCount:0,
								datetime: item.recordDate
							});
							this.reelPurchaseList.push({
								id: item.id,
								count: item.millQtys?item.millQtys:0,
								datetime: item.recordDate
							});
							this.powerUserList.push({
								id: item.id,
								count: item.powerTaskQty?item.powerTaskQty:0,
								datetime: item.recordDate
							});
							this.usefulUserList.push({
								id: item.id,
								count: item.usefulCount?item.usefulCount:0,
								datetime: item.recordDate
							});
							this.dateList.push(item.recordDate);
							this.pointIncomeList.push(item.income);
							this.pointExpendList.push(item.expenditure);
							this.powerAddList.push(item.powersAdd);
							this.powerSubList.push(item.powersSub);
							this.setAllOption();
						})
					}).end();
					
					this.$axios.get('/admin/dateStatistic/coinData')
						.then(data => {
							this.clearList1();
							data.millList.forEach(item => {
								this.reelTypeList.push(item.millType);
								this.reelQtyList.push(item.millQty);
								this.setAllOption1();
							})
							this.dailyDDList.push({
								count: data.yestodayCoin?data.yestodayCoin:0,
								datetime: '昨日总DD'
							},{
								count: data.subCoin?data.subCoin:0,
								datetime: '新增DD'
							},{
								count: data.todayCoin?data.todayCoin:0,
								datetime: '今日总DD'
							},{
								count: data.inCome?data.inCome:0,
								datetime: '每日转入DD'
							});
						}).end();
			},
			clearList() {
				this.activeUserList.splice(0, this.activeUserList.length);
				this.realNameList.splice(0, this.realNameList.length);
				this.registerMemberList.splice(0, this.registerMemberList.length);
				this.reelPurchaseList.splice(0, this.reelPurchaseList.length);
				this.powerUserList.splice(0, this.powerUserList.length);
				this.usefulUserList.splice(0, this.usefulUserList.length);
				this.dateList.splice(0, this.dateList.length);
				this.pointIncomeList.splice(0, this.pointIncomeList.length);
				this.pointExpendList.splice(0, this.pointExpendList.length);
				this.powerAddList.splice(0, this.powerAddList.length);
				this.powerSubList.splice(0, this.powerSubList.length);
			},
			clearList1() {
				this.reelTypeList.splice(0, this.reelTypeList.length);
				this.reelQtyList.splice(0, this.reelQtyList.length);
				this.dailyDDList.splice(0, this.dailyDDList.length);
			},
			setAllOption() {
				this.option_bar.series = [{
						type: 'bar',
						seriesLayoutBy: 'row',
						barMaxWidth: 50,
					}, {
						type: 'bar',
						seriesLayoutBy: 'row',
						barMaxWidth: 50,
					},
				]
				
				this.option_bar.color = ['#FF0000', '#66DDFF'];
				this.option_bar.dataset = {
					source: [this.dateList, this.pointIncomeList, this.pointExpendList],
					dimensions: ['日期', '转入', '转出'],
					sourceHeader: false,
				}
				this.chart1.setOption(this.option_bar);
				
				this.option_bar.color = ['#FFCC00', '#22EE66'];
				this.option_bar.dataset = {
					source: [this.dateList, this.powerAddList, this.powerSubList],
					dimensions: ['日期', '产生', '消耗'],
					sourceHeader: false,
				}
				this.chart2.setOption(this.option_bar);
			},
			setAllOption1() {
				this.option_bar.series = [{
					type: 'bar',
					seriesLayoutBy: 'row',
					barMaxWidth: 50,
					label:{
						show: true,
						position: 'top',
					}
				}]
				this.option_bar.color = ['#66AADD'];
				this.option_bar.dataset = {
					source: [this.reelTypeList, this.reelQtyList],
					dimensions: ['礼包名称', '礼包数量'],
					sourceHeader: false,
				}
				this.chart3.setOption(this.option_bar);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.first {
		min-width: 800px;
		height: 100%;
		overflow: auto;

		.row {
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
		}

		.box {
			box-sizing: border-box;
			padding: 10px;
			border: 1px solid #EEE;
			border-radius: 10px;

			.title {
				text-align: center;
				font-size: 18px;
				font-weight: bold;
				letter-spacing: 2px;
				color: #777;
			}

			.cont {
				margin-top: 20px;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.cell {
					.bubbles {
						width: 120px;
						height: 120px;
						border-radius: 50%;
						text-align: center;
						line-height: 120px;
						font-size: 24px;
						font-weight: bold;
					}
					
					.block {
						padding: 20px;
						border-radius: 5px;
						font-size: 18px;
						font-weight: bold;
					}

					.datetime {
						margin: 10px 0;
						text-align: center;
						font-size: 16px;
					}
				}

				.color_1 {
					.bubbles {
						background-image: radial-gradient(circle, #FFF 50%, #F9D 100%);
						color: #A38;
					}

					.datetime {
						color: #A38;
					}
				}

				.color_2 {
					.bubbles {
						background-image: radial-gradient(circle, #FFF 50%, #BFF 100%);
						color: #9BB;
					}

					.datetime {
						color: #9BB;
					}
				}
				
				.color_3 {
					.bubbles {
						background-image: radial-gradient(circle, #FFF 50%, #FD8 100%);
						color: #BA7;
					}
				
					.datetime {
						color: #BA7;
					}
				}
				
				.color_4 {
					.bubbles {
						background-image: radial-gradient(circle, #FFF 50%, #AF8 100%);
						color: #5A2;
					}
				
					.datetime {
						color: #5A2;
					}
				}
				
				.color_5 {
					.bubbles {
						background-image: radial-gradient(circle, #FFF 50%, #C9F 100%);
						color: #63A;
					}
				
					.datetime {
						color: #63A;
					}
				}
				
				.color_6 {
					.bubbles {
						background-image: radial-gradient(circle, #FFF 50%, #9AF 100%);
						color: #34A;
					}
				
					.datetime {
						color: #34A;
					}
				}
				
				.color_7 {
					.block {
						background-image: linear-gradient(to bottom, #FB7 0%, #FFF 30%, #FFF 70%, #FB7 100%);
						color: #F60;
					}
				
					.datetime {
						color: #F60;
					}
				}
			}

			.chart {
				margin-top: 20px;
				height: 300px;
			}
		}

		.box1 {}

		.box2 {
			margin-top: 20px;
		}

		.box3 {
			width: calc(50% - 10px);
		}
		
		.box4 {
			width: 100%;
		}
	}
</style>
