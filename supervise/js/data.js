/**
 * Created by jisen on 2016/6/17.
 */
function Data_analyse(){
	this.tempArr = []; //数量统计和效果分析 对应的页面HTML
    this.option_Arr = [];//数量统计和效果分析 对应的数据格式
    this.analyze_wrap = $('.analyze_wrap');
    this.is_effect = 0; //判断当前栏目 数量统计/效果分析 === 0/1；
    this.chart_effect_bar1 = ''; //需要绘制的图表数量 ， 目前页面设计最多为三个
	this.chart_effect_bar2 = '';
	this.chart_effect_bar3 = '';
    //资源分析
    this.res_analyse = function(){
        console.log(this);
		this.tempArr[0] = 
			'<div class="analyze n_content"><div class="top bo_40px"><h3 class="tab_h3">各学校资源数量统计图</h3><div class="top_pic"><div class="top-pic-select"><ul><li class="top-pic-select-active"><span>本周</span></li>' +'<li><span>本月</span></li><li><span>本学期</span></li><li><span>本学年</span></li></ul>' +
			'<p class="top-pic-select-hover"></p></div>' +
			'<div id="main_first" style="width: 100%; height: 100%"></div></div></div><div class="left bo_40px"><h3 class="tab_h3">各学科资源数量占比图</h3><div class="left_pic">' +
			'<div id="main_second" style="width: 100%; height: 100%"></div>' +
			'</div></div><div class="right bo_40px"><h3 class="tab_h3">资源拥有量学校TOP10</h3><ul class="right_pic" id="sort-bar"></ul></div></div>';
		this.tempArr[1] =
			'<div class="analyze r_content"><div class="top bo_40px"><h3 class="tab_h3">各学校资源下载量统计图</h3><div class="top_pic">' +
			'<div class="top-pic-select"><ul><li class="top-pic-select-active"><span>本周</span></li><li><span>本月</span></li><li><span>本学期</span></li><li><span>本学年</span></li>' +'</ul><p class="top-pic-select-hover"></p></div><div id="main_first" style="width: 100%; height: 100%"></div></div></div><div class="top bo_40px"><h3 class="tab_h3">各学校资源点评量统计图</h3>' +
			'<div class="top_pic"><div id="main_second" style="width: 100%; height: 100%"></div></div></div></div>';
        this.option_Arr = [
            [this.option_bar,this.option_pie],
            [JSON.parse(JSON.stringify(this.option_bar)),JSON.parse(JSON.stringify(this.option_bar))]
        ];
		
		this.analyze_wrap.html(this.tempArr[this.is_effect]);
        
		this.chart_effect_bar1 = echarts.init(document.getElementById('main_first'));
		this.chart_effect_bar1.setOption(this.option_Arr[this.is_effect][0]);
		this.chart_effect_bar2 = echarts.init(document.getElementById('main_second'));
		this.chart_effect_bar2.setOption(this.option_Arr[this.is_effect][1]);
		
		this.topTenBar();  //排行前十名
		//初始查看 时间  
		this.topPicSelect(this.option_Arr[this.is_effect]);
		
		//初始化 资源分析-效果分析 数据和样式
		this.option_Arr[1][0].series[0].itemStyle.normal.color = '#fb7134';
        for(var k = 0; k < this.option_Arr[1].length; k ++){
            for(var v = 0,li = this.option_Arr[1][k].series[0].data.length; v<li; v++){
                this.option_Arr[1][k].series[0].data[v].value = Math.round(Math.random() * 10000);
            }
        }
        this.option_Arr[1][1].series[0].itemStyle.normal.color = '#92c233';
    };
	//课程分析
	this.class_analyse = function(){
        this.tempArr[0] =
                    '<div class="analyze n_content"><div class="top bo_40px"><h3 class="tab_h3">各学校参加课堂数量统计图</h3><div class="top_pic">' +
                    '<div class="top-pic-select"><ul><li class="top-pic-select-active"><span>本周</span></li><li><span>本月</span></li>' +
                    '<li><span>本学期</span></li><li><span>本学年</span></li></ul><p class="top-pic-select-hover"></p></div>' +
                    '<div id="main_first" style="width: 100%; height: 100%"></div>' +
                    '</div></div><div class="left bo_40px"><h3 class="tab_h3">本辖区开课情况总计</h3><div class="left_pic">' +
                    '<div id="main_second" style="width: 100%; height: 100%"></div>' +
                    '</div></div><div class="right bo_40px"><h3 class="tab_h3">本辖区各学科课堂数量占比图</h3><div class="right_pic">' +
                    '<div id="main_third" style="width: 100%; height: 100%"></div>' +
                    '</div></div></div>';
        this.tempArr[1] =
					' <div class="analyze r_content"><div class="top bo_40px"><h3 class="tab_h3">各学科课堂平均关注度与打分率统计图</h3>' +
                    '<div class="top_pic"><div class="top-pic-select"><ul><li class="top-pic-select-active"><span>本周</span></li><li><span>本月</span></li>' +
                    '<li><span>本学期</span></li><li><span>本学年</span></li></ul><p class="top-pic-select-hover"></p></div>' +
                    '<div id="main_first" style="width: 100%; height: 100%"></div></div>' +
                    '</div><div class="top bo_40px"><h3 class="tab_h3">各学校异常结课统计图</h3><div class="top_pic">' +
                    '<div id="main_second" style="width: 100%; height: 100%"></div></div></div></div>';
		this.option_Arr = [
			[this.option_stack,this.option_line,JSON.parse(JSON.stringify(this.option_pie))],
			[JSON.parse(JSON.stringify(this.option_stack)),JSON.parse(JSON.stringify(this.option_bar))]
        ];

		this.analyze_wrap.html(this.tempArr[this.is_effect]);

        this.chart_effect_bar1 = echarts.init(document.getElementById('main_first'));
        this.chart_effect_bar1.setOption(this.option_Arr[this.is_effect][0]);
        this.chart_effect_bar2 = echarts.init(document.getElementById('main_second'));
        this.chart_effect_bar2.setOption(this.option_Arr[this.is_effect][1]);
        this.chart_effect_bar3 = echarts.init(document.getElementById('main_third'));
        this.chart_effect_bar3.setOption(this.option_Arr[this.is_effect][2]);

		this.topPicSelect(this.option_Arr[this.is_effect]);

		//初始化 课程分析-效果分析 数据和样式
		this.option_Arr[1][0].series[0].stack = '';
	};
	//教研分析
	this.teach_analyse = function(){
		this.tempArr[0] =
                    '<div class="analyze n_content"><div class="top bo_40px"><h3 class="tab_h3">各学校资源数量统计图</h3>' +
                    '<div class="top_pic"><div class="top-pic-select"><ul>' +
                    '<li class="top-pic-select-active"><span>本周</span></li><li><span>本月</span></li><li><span>本学期</span></li>' +
                    '<li><span>本学年</span></li></ul><p class="top-pic-select-hover"></p></div><div id="main_first" style="width: 100%; height: 100%"></div></div></div></div>';
        this.tempArr[1] =
					' <div class="analyze r_content"><div class="top bo_40px"><h3 class="tab_h3">各学校资源下载量统计图</h3><div class="top_pic">' +
                    '<div class="top-pic-select"><ul><li class="top-pic-select-active"><span>本周</span></li><li><span>本月</span></li><li><span>本学期</span></li><li><span>本学年</span></li>' +
                    '</ul><p class="top-pic-select-hover"></p></div><div id="main_first" style="width: 100%; height: 100%"></div></div></div><div class="top bo_40px"><h3 class="tab_h3">各学校资源点评量统计图</h3>' +
                    '<div class="top_pic"><div id="main_second" style="width: 100%; height: 100%"></div></div></div></div>';
		this.option_Arr = [
			[this.option_bar],
			[JSON.parse(JSON.stringify(this.option_bar)),JSON.parse(JSON.stringify(this.option_bar))]
        ];
		this.analyze_wrap.html(this.tempArr[this.is_effect]);
        this.chart_effect_bar1 = echarts.init(document.getElementById('main_first'));
        this.chart_effect_bar1.setOption(this.option_Arr[this.is_effect][0]);

		this.topPicSelect(this.option_Arr[this.is_effect]);

		//初始化 教研分析-效果分析 数据和样式
		this.option_Arr[1][0].series[0].itemStyle.normal.color = '#fb7134';
        for(var k = 0; k < this.option_Arr[1].length; k ++){
			for(var v = 0,li = this.option_Arr[1][k].series[0].data.length; v<li; v++){
				this.option_Arr[1][k].series[0].data[v].value = Math.round(Math.random() * 10000);
			}
        }
        this.option_Arr[1][1].series[0].itemStyle.normal.color = '#92c233';
	};
	//评课分析
    this.classEval_analyse = function(){
		this.tempArr[0] =
                    '<div class="analyze n_content"><div class="top bo_40px"><h3 class="tab_h3">各学校资源数量统计图</h3>' +
                    '<div class="top_pic"><div class="top-pic-select"><ul><li class="top-pic-select-active"><span>本周</span></li>' +
                    '<li><span>本月</span></li><li><span>本学期</span></li><li><span>本学年</span></li></ul>' +
                    '<p class="top-pic-select-hover"></p></div><div id="main_first" style="width: 100%; height: 100%"></div></div>' +
                    '</div></div>';
        this.tempArr[1] =
					'<div class="analyze n_content"><div class="top bo_40px"><h3 class="tab_h3">各学校资源数量统计图</h3><div class="top_pic"><div class="top-pic-select"><ul><li class="top-pic-select-active"><span>本周</span></li>' +
                    '<li><span>本月</span></li><li><span>本学期</span></li><li><span>本学年</span></li></ul>' +
                    '<p class="top-pic-select-hover"></p></div>' +
                    '<div id="main_first" style="width: 100%; height: 100%"></div></div></div><div class="left bo_40px"><h3 class="tab_h3">各学科资源数量占比图</h3><div class="left_pic">' +
                    '<div id="main_second" style="width: 100%; height: 100%"></div>' +
                    '</div></div><div class="right bo_40px"><h3 class="tab_h3">资源拥有量学校TOP10</h3><ul class="right_pic" id="sort-bar"></ul></div></div>';
		this.option_Arr = [
			[this.option_bar],
            [JSON.parse(JSON.stringify(this.option_stack)),JSON.parse(JSON.stringify(this.option_pie))]
        ];

		this.analyze_wrap.html(this.tempArr[this.is_effect]);

		this.chart_effect_bar1 = echarts.init(document.getElementById('main_first'));
		this.chart_effect_bar1.setOption(this.option_Arr[this.is_effect][0]);

		this.topPicSelect(this.option_Arr[this.is_effect]);

		//初始化 评课分析-效果分析 样式
		this.option_Arr[1][0].series[0].stack = '';
	};
    //前十排行榜
    this.topTenBar = function() {
        if(!$('#sort-bar')){
            console.log('topTenBar');
            return;
        }
        var sortData = [
                {value: Math.round(Math.random() * 10000), name: '健康小学'},
                {value: Math.round(Math.random() * 10000), name: '实验三小'},
                {value: Math.round(Math.random() * 10000), name: '实验一小'},
                {value: Math.round(Math.random() * 10000), name: '实验二小'},
                {value: Math.round(Math.random() * 10000), name: '海拉尔回族小学'},
                {value: Math.round(Math.random() * 10000), name: '文化节小学'},
                {value: Math.round(Math.random() * 10000), name: '龙纹小学'},
                {value: Math.round(Math.random() * 10000), name: '王朝小学'},
                {value: Math.round(Math.random() * 10000), name: '北大附小'},
                {value: Math.round(Math.random() * 10000), name: '康健小学'}
            ],
            total = 0,
            tempArr = '',
            width_arr = [];
        for (var k = 0, len = sortData.length; k < len; k++) {
            total += sortData[k].value;
        }
        //按年龄从小到大排序
        sortData.sort(function (a, b) {
            return b.value - a.value;
        });
        for (var i = 0; i < sortData.length; i++) {
            tempArr += ' <li>' +
                '<span data-type="name">' + sortData[i].name + '</span>' +
                '<span data-type="index">' + (i - 0 + 1) + '</span>' +
                '<span data-type="bar"></span>' +
                '<span data-type="text" style="display: none">' + Math.ceil((sortData[i].value / total).toFixed(4) * 100) + '%</span>' +
                '</li>';
            width_arr.push(Math.ceil(sortData[i].value * 280 / sortData[0].value));
        }
        $('#sort-bar').html(tempArr);
        setTimeout(function () {
            $('#sort-bar').find('span[data-type="bar"]').each(function (i) {
                $(this).width(width_arr[i])
            }).end().find('span[data-type="text"]').show(1200)
        }, 100);
    };
    //更新数据
	this.refresh = function(data){
		var data_len = data.length;
		//更新数据使用
		for(var k = 0; k < data_len; k ++){
			for(var v = 0,li = data[k].series[0].data.length; v<li; v++){
				data[k].series[0].data[v].value = Math.round(Math.random() * 10000);
			}
		}
		switch(data_len){
			case 1 :
				this.chart_effect_bar1 = echarts.init(document.getElementById('main_first'));
				this.chart_effect_bar1.setOption(data[0]);
				break;
			case 2 :
				this.chart_effect_bar1 = echarts.init(document.getElementById('main_first'));
				this.chart_effect_bar1.setOption(data[0]);
				this.chart_effect_bar2 = echarts.init(document.getElementById('main_second'));
				this.chart_effect_bar2.setOption(data[1]);
				break;
			case 3 :
                this.chart_effect_bar1 = echarts.init(document.getElementById('main_first'));
                this.chart_effect_bar1.setOption(data[0]);
                this.chart_effect_bar2 = echarts.init(document.getElementById('main_second'));
                this.chart_effect_bar2.setOption(data[1]);
                this.chart_effect_bar3 = echarts.init(document.getElementById('main_third'));
                this.chart_effect_bar3.setOption(data[2]);
				break;
        }
        this.topTenBar();

	};
    // 时间奋斗统计  本周/本月/本学期/本学年
    this.topPicSelect = function(data) {
        var _that = this,
            _copy_tag = $('.top-pic-select-active').children('span'),
            _li_width = _copy_tag.width(),
            _li_left = _copy_tag.position(),
            _float_banner = $('.top-pic-select-hover'),
            _option_arr = data ;
        _float_banner.css({left: _li_left.left, width: _li_width}).show();
        $('.top-pic-select li').mouseover(function () {
            _li_left = $(this).children('span').position();
            _li_width = $(this).children('span').width();
            _float_banner.css({left: _li_left.left, width: _li_width});

        }).mouseout(function (event) {
            var s = event.relatedTarget.nodeName;
            if (s != 'LI' && s != 'span') {
                _copy_tag = $(this).parent().children('.top-pic-select-active').children('span');
                _li_left = _copy_tag.position();
                _li_width = _copy_tag.width();
                _float_banner.css({left: _li_left.left, width: _li_width});
            }
        }).on('click','span', function () {
            if (!$(this).parent().hasClass('top-pic-select-active')) {
                _li_left = $(this).parent().position();
                $(this).parent().addClass('top-pic-select-active').siblings().removeClass('top-pic-select-active');
                var tag_index = $(this).parent().index();
                _that.refresh(_option_arr);
            }
        });
    };


    this.option_bar = {
        tooltip: {
            show: true
        },
        legend: {
            orient: 'horizontal', // 'vertical'
            x: 'right',
            itemGap: 20,
            textStyle: {fontWeight: 'bold'},
            selectedMode: false,
            data: ['数量']
        },
        xAxis: [
            {
                type: 'category',
                axisLine: {    // 轴线
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid',
                        width: 1
                    }
                },
                axisTick: {    // 轴标记
                    show: true,
                    length: 5,
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid',
                        width: 1
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',    // {number}
                    rotate: 25,
                    margin: 2,
                    clickable: true,
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(0,0,0,0.1)', 'rgba(200,200,200,0.1)']
                    }
                },
                data: ["健康小学", "实验三小", "实验一小", "实验二小", "海拉尔回族小学", "文化节小学", "龙纹小学", "王朝小学", "北大附小", "清华附小", "康健小学", "北池子小学"]
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '单位：个',
                axisLine: {    // 轴线
                    show: true,
                    lineStyle: {
                        color: '#999',
                        type: 'solid',
                        width: 0
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',    // {number}
                    textStyle: {
                        color: '#666'
                    }
                }
            }
        ],
        series: [
            {
                name: "数量",
                type: "bar",
                barWidth: 15,
                clickable: false,
                itemStyle: {
                    normal: {
                        color: '#26bc83',
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{b}\n{c}',
                            textStyle: {
                                fontWeight: ''
                            }

                        }
                    }
                },
                data: [
                    {value: Math.round(Math.random() * 10000), name: '健康小学'},
                    {value: Math.round(Math.random() * 10000), name: '实验三小'},
                    {value: Math.round(Math.random() * 10000), name: '实验一小'},
                    {value: Math.round(Math.random() * 10000), name: '实验二小'},
                    {value: Math.round(Math.random() * 10000), name: '海拉尔回族小学'},
                    {value: Math.round(Math.random() * 10000), name: '文化节小学'},
                    {value: Math.round(Math.random() * 10000), name: '龙纹小学'},
                    {value: Math.round(Math.random() * 10000), name: '王朝小学'},
                    {value: Math.round(Math.random() * 10000), name: '北大附小'},
                    {value: Math.round(Math.random() * 10000), name: '清华附小'},
                    {value: Math.round(Math.random() * 10000), name: '康健小学'},
                    {value: Math.round(Math.random() * 10000), name: '北池子小学'}
                ]
            }
        ]
    };

// 为echarts对象加载数据

    /*myChart.on(echarts.config.EVENT.CLICK, function(param){
     console.log(param.name)
     });*/
    this.option_pie = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} 个文件 <br/>占比： {d}%",
            textStyle: {
                align: 'left'
            }
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'top',
            selectedMode: false,
            data: ['语文', '数学', '化学', '英语', '政治', '历史', '生物', '地理', '物理']
        },
        calculable: true,
        series: [
            {
                name: '数据详情',
                type: 'pie',
                radius: ['50%', '94%'],
                legendHoverLink: true,

                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                data: [
                    {value: Math.round(Math.random() * 10000), name: '语文'},
                    {value: Math.round(Math.random() * 10000), name: '数学'},
                    {value: Math.round(Math.random() * 10000), name: '化学'},
                    {value: Math.round(Math.random() * 10000), name: '英语'},
                    {value: Math.round(Math.random() * 10000), name: '政治'},
                    {value: Math.round(Math.random() * 10000), name: '历史'},
                    {value: Math.round(Math.random() * 10000), name: '生物'},
                    {value: Math.round(Math.random() * 10000), name: '地理'},
                    {value: Math.round(Math.random() * 10000), name: '物理'}
                ]
            }
        ]
    };

    this.option_line = {
        tooltip : {
            trigger: 'item'
        },
        xAxis : [
            {
                type: 'category',
                axisLine: {    // 轴线
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid',
                        width: 1
                    }
                },
                axisTick: {    // 轴标记
                    show: true,
                    length: 5,
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid',
                        width: 1
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',    // {number}
                    rotate: 30,
                    margin: 2,
                    clickable: false,
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                },
                data: ["第一周", "第二周", "第三周", "第四周", "第五周", "第六周", "第七周"]
            }
        ],
        yAxis : [
            {
                type: 'value',
                name: '单位：次',
                axisLine: {    // 轴线
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid',
                        width: 1
                    }
                },

                axisLabel: {
                    show: true,
                    interval: 'auto',    // {number}
                    margin: 5,
                    textStyle: {
                        color: '#999',
                        fontSize: 14
                    }
                }
            }
        ],
        series : [
            {
                name:'开课情况',
                type:'line',
                symbol : 'rectangle',
                symbolSize : 6,
                smooth: false,
                itemStyle: {
                    normal: {
                        color: '#768fce',
                        label: {
                            show: false
                        }
                    }
                },
                data:[
                    {value: Math.round(Math.random() * 10000), name: '第一周'},
                    {value: Math.round(Math.random() * 10000), name: '第二周'},
                    {value: Math.round(Math.random() * 10000), name: '第三周'},
                    {value: Math.round(Math.random() * 10000), name: '第四周'},
                    {value: Math.round(Math.random() * 10000), name: '第五周'},
                    {value: Math.round(Math.random() * 10000), name: '第六周'},
                    {value: Math.round(Math.random() * 10000), name: '第七周'}
                ]
            }
        ]
    };
    this.option_stack = {
        tooltip: {
            show: true
        },
        legend: {
            orient: 'horizontal', // 'vertical'
            x: 'right',
            itemGap: 20,
            textStyle: {fontWeight: 'bold'},
            selectedMode: false,
            data: ['主课堂','辅课堂']
        },
        xAxis: [
            {
                type: 'category',
                axisLine: {    // 轴线
                    show: true,
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid',
                        width: 1
                    }
                },
                axisTick: {    // 轴标记
                    show: true,
                    length: 5,
                    lineStyle: {
                        color: '#ccc',
                        type: 'solid',
                        width: 1
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',    // {number}
                    rotate: 25,
                    margin: 2,
                    clickable: false,
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(0,0,0,0.1)', 'rgba(200,200,200,0.1)']
                    }
                },
                data: ["健康小学", "实验三小", "实验一小", "实验二小", "海拉尔回族小学", "文化节小学", "龙纹小学", "王朝小学", "北大附小", "清华附小", "康健小学", "北池子小学"]
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '单位：个',
                axisLine: {    // 轴线
                    show: true,
                    lineStyle: {
                        color: '#999',
                        type: 'solid',
                        width: 0
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',    // {number}
                    textStyle: {
                        color: '#666'
                    }
                }
            }
        ],
        series: [
            {
                name: "主课堂",
                type: "bar",
                barMaxWidth: 15,
                barGap:0,
                clickable: false,
                stack:'group',
                itemStyle: {
                    normal: {
                        color: '#82c2fe',
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{b}\n{c}',
                            textStyle: {
                                fontWeight: ''
                            }

                        }
                    }
                },
                data: [
                    {value: Math.round(Math.random() * 10000), name: '健康小学'},
                    {value: Math.round(Math.random() * 10000), name: '实验三小'},
                    {value: Math.round(Math.random() * 10000), name: '实验一小'},
                    {value: Math.round(Math.random() * 10000), name: '实验二小'},
                    {value: Math.round(Math.random() * 10000), name: '海拉尔回族小学'},
                    {value: Math.round(Math.random() * 10000), name: '文化节小学'},
                    {value: Math.round(Math.random() * 10000), name: '龙纹小学'},
                    {value: Math.round(Math.random() * 10000), name: '王朝小学'},
                    {value: Math.round(Math.random() * 10000), name: '北大附小'},
                    {value: Math.round(Math.random() * 10000), name: '清华附小'},
                    {value: Math.round(Math.random() * 10000), name: '康健小学'},
                    {value: Math.round(Math.random() * 10000), name: '北池子小学'}
                ]
            },
            {
                name: "辅课堂",
                type: "bar",
                barMaxWidth: 15,
                barGap:0,
                clickable: false,
                stack:'group',
                itemStyle: {
                    normal: {
                        color: '#995ac1',
                        label: {
                            show: false,
                            position: 'top',
                            formatter: '{b}\n{c}',
                            textStyle: {
                                fontWeight: ''
                            }

                        }
                    }
                },
                data: [
                    {value: Math.round(Math.random() * 10000), name: '健康小学'},
                    {value: Math.round(Math.random() * 10000), name: '实验三小'},
                    {value: Math.round(Math.random() * 10000), name: '实验一小'},
                    {value: Math.round(Math.random() * 10000), name: '实验二小'},
                    {value: Math.round(Math.random() * 10000), name: '海拉尔回族小学'},
                    {value: Math.round(Math.random() * 10000), name: '文化节小学'},
                    {value: Math.round(Math.random() * 10000), name: '龙纹小学'},
                    {value: Math.round(Math.random() * 10000), name: '王朝小学'},
                    {value: Math.round(Math.random() * 10000), name: '北大附小'},
                    {value: Math.round(Math.random() * 10000), name: '清华附小'},
                    {value: Math.round(Math.random() * 10000), name: '康健小学'},
                    {value: Math.round(Math.random() * 10000), name: '北池子小学'}
                ]
            }
        ]
    };
}




