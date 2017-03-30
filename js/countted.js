/*================================
 * +_+ 研修培训培训统计
 * j_s 编辑人：吉森
 * r_r 编辑时间：2017-03-17
 * -_- 说明：
 ==================================*/
$(function(){
    $('#more-select').on('click', function(){
        var _this =$(this);
        var child_i = _this.children('span');
        var _select_box = $('.more-select-box');
        if(_this.hasClass('active')){
            _this.removeClass('active');
            _select_box.hide('slow');
            child_i.html('+')
        }else{
            _this.addClass('active');
            _select_box.show('slow');
            child_i.html('-')
        }
    });
    Count.init();

});
//统计列表数据展示
var Count = function (){
    var count_control = new (function(){
        var count_con = '';
        function CountControl(){
            //记录当前统计类型  TrainCount == 培训统计 WatchCount ==收看统计 点名统计 == CallrollCount
            this.count_type = "TrainCount";  //count_type值与 data[key] 一一对应，以便数据读取
            //记录统计类型的筛选条件
            /*统计类型筛选条件公用筛选html页面。故分别保存三种类型的筛选数据，方便类型切花数据读取*/
            this.data = {};
            this.data.TrainCount = {
                "pageNow" : 1, //当前页码, 当页面为0时，说明此table还没有初始化
                "pageSize" : 20, //每页显示条数
                "beginDate" : "", //开始时间
                "endDate" : "", //结束时间
                "status" : "", //课程状态
                "equipId" : "", //设备Id
                "trainId" : "", //主培训Id
                "childTrainId" : "" //子培训Id
            };
            this.data.WatchCount = {};
            this.data.CallrollCount = {};

            //vue构造
            this.vue = {
                "TrainCount" : null,
                "WatchCount" : null,
                "CallrollCount" : null
            };

            //记录vue是否已经new Vue();
            this.vue_init = {
                "TrainCount" : false,
                "WatchCount" : false,
                "CallrollCount" : false
            };
            //三种统计类型对应的接口
            this.url = {
                "TrainCount" : "statistics/getTrainStatList.do",
                "WatchCount" : "statistics/getWatchStatList.do",
                "CallrollCount" : "statistics/getCallrollStatList.do"
            };
            //三种统计类型,是否需要初始化分页
            this.page_init = {
                "TrainCount" : true,
                "WatchCount" : true,
                "CallrollCount" : true
            };
            //是否启用清除数据功能,只有当有筛选数据时，才清除
            this.need_clear = false;
            count_con = this;

        };
        //统计类型切换  （TrainCount == 培训统计 WatchCount ==收看统计 点名统计 == CallrollCount）
        //更改 全局 count_type 变量， 以便引用匹配的 url和data 地址
        CountControl.prototype.selectCountType = function(){
            $('.count-banner').on('click', 'span', function(){
                var _this = $(this);
                var _type = _this.attr('rel');
                console.log(_type);
                if(!_this.hasClass('active')){
                    _this.addClass('active').siblings().removeClass('active');
                    count_con.count_type = _type;
                    count_con.clearSelected();
                    console.log(count_con.count_type);
                }
            });


        };
        //清除查询历史数据
        //课程状态的change()事件会刷新页面，故不需要调用refresh()函数
        CountControl.prototype.clearSelected = function(){
            var more_btn = $('#more-select');
            //清除所有input框的值
            $('.count-select input').val('').attr('rel',0);
            //隐藏子培训
            $('#train-child').parents('.form-groups').hide();
            //隐藏更多筛选条件
            if(more_btn.hasClass('active')){
                more_btn.click()
            }
            //查询条件都已情况，关闭清除按钮功能
            count_con.need_clear = false;
            //初始请求参数
            count_con.data[count_con.count_type] = {
                "pageNow" : 1, //当前页码, 当页面为0时，说明此table还没有初始化
                "pageSize" : 20, //每页显示条数
                "beginDate" : "", //开始时间
                "endDate" : "", //结束时间
                "status" : "", //课程状态
                "equipId" : "", //设备Id
                "trainId" : "", //主培训Id
                "childTrainId" : "" //子培训Id
            };

            //默认课程状态 为全部； 课程状态change绑定有刷新事件，会自动刷新，位置不可动（先清除数据，再加载）
            $('#train-status option').eq(0).prop('selected', 'true').change();
        };
        //培训统计表格
        CountControl.prototype.getCountData = function(){
            //_type =  TrainCount == 培训统计 WatchCount ==收看统计 CallrollCount == 点名统计
            var _type = count_con.count_type;
            //tag_id =  #TrainCount == 培训统计 #WatchCount ==收看统计 #CallrollCount == 点名统计
            var tag_id = '#' + _type;
            var select_data = count_con.data[_type];
            var _tips = '服务器异常，加载失败； 请稍后再尝试!';
            $(tag_id).show().siblings('div').hide();
            loading.loadDef(tag_id);
            var data = count_data[count_con.count_type];
            if(data && data.pageNow){
                if(data.numberTotal > 0){
                    console.log('numberTotal : ' + data.numberTotal);
                    setCountData(data);
                    // console.log('paglist len : ' + $('.paglist').length )
                }else{
                    _tips = '暂无相关统计数据！' ;
                    errors(_tips);
                }
            }else{
                errors(_tips);
            }
            //收看统计表格
            function setCountData(data) {
                var _type = count_con.count_type;
                var tag_id = '#' + _type;
                //请求结果返回的数据
                var beanList = data.beanList;
                //请求结果返回的数据的长度
                var bean_len = beanList.length;
                //TrainCount == 培训统计 WatchCount ==收看统计 CallrollCount == 点名统计 是否已经调用Vue构造函数，
                //Vue重复构造数据无法刷新,
                var is_init = count_con.vue_init[_type];
                    console.log('beanList len : ' + beanList.length);
                    if (!is_init) {
                        count_con.vue[_type] = new Vue(vueConfig(tag_id, _type));
                        count_con.vue_init[_type] = true;
                        count_con.vue[_type].call_page();
                    } else {
                        count_con.vue[_type].reaLoad(beanList);
                        //console.log(bean_len);
                        //count_con.vue[count_con.count_type].items.splice(bean_len);
                        //count_con.vue[count_con.count_type].items = beanList;
                    }
                    //vuejs参数配置
                    function vueConfig(tagId, type) {
                        var vue_option = {
                            el: tagId,
                            data: {
                                items: beanList
                            },
                            // 在 `methods` 对象中定义方法
                            methods: {
                                readInfo: function (id, title) {
                                    var course_id = parseInt(id); //查看详情，培训Id
                                    console.log('the couserId is ' + course_id);
                                    if (!isNaN(course_id) && course_id > 0) {
                                        ViewInfo.getData(course_id, type, title);
                                    } else {
                                        console.log('无法读取课程详情，稍后再试试！');
                                        alert_msg.error('无法读取课程详情，稍后再试试！');
                                    }
                                },
                                reaLoad: function (bean) {
                                    var arr_len = bean.length;
                                    console.log(arr_len);
                                    count_con.vue[type].items.splice(arr_len);
                                    count_con.vue[type].items = bean;
                                    this.call_page();
                                },
                                //分页
                                call_page: function () {
                                    console.log('call_page');
                                    //是否需要初始分页模块
                                    var page_init = count_con.page_init[type];
                                    //接口请求参数
                                    var select_data = '';
                                    var pagobj = '';
                                    var pagConfig = {};
                                    if (page_init) {
                                        select_data = count_con.data[type];
                                        pagConfig = {
                                            tag: tagId,
                                            pagLen: 5, //显示分页个数,
                                            getAjax: count_con.getCountData,
                                            setAjax: setCountData,
                                            needType: false
                                        };
                                        pagobj = new PagObj(pagConfig);
                                        pagobj.initial(select_data, data);
                                        //已经初始分页，关闭初始功能，避免重复初始
                                        count_con.page_init[type] = false;
                                    } else {
                                        console.log( type + ' page is not init');
                                    }
                                },
                                changeDate : function(val){
                                    var _arr = val.split('至');
                                    return '<p>起：' + _arr[0] + '</p><p>止：' + _arr[1] + '</p>';
                                }

                            },
                            filters : {
                                substrTitle : function(name){
                                    return substrTitle(name, 20)
                                }

                            }
                        };
                        return vue_option;
                    }
                console.log(tag_id);
                loading.loadOver(tag_id);
                $(tag_id).children('table').show().siblings('.empty').hide();
            }
            //错误处理
            function errors(tips){
                var _tag = $(tag_id);
                var _empty = 'div.empty';
                var tag_empty = _tag.children(_empty);
                if(tag_empty.length > 0){
                    tag_empty.remove();
                }
                _tag.append('<div class="empty"></div>');
                alert_msg.empty(_empty, tips);
                _tag.children('table').hide();
                _tag.children('.paglist').hide();
                loading.loadOver(tag_id);
            }
        };
        //设备数据查询
        CountControl.prototype.getTrainDevice = function(){
            //保存前一个设备Id
            var prev_id = 0;
            $("#train-device").equipList({
                attachObject: "#train-device-id",
                url : 'dict/getLiveEquipList4Creator.do',
                parameter : {
                    keyword : '',
                    pageNow : 1,
                    pageSize : 20
                },
                callback : getPresentId
            });
            //获取当前选择的设备Id；
            function getPresentId(){
                var _this_id = $('#train-device').attr('rel');
                console.log('当前选择设备id为： '+  _this_id);
                if(_this_id != prev_id){
                    console.log('刷新数据');
                    prev_id = _this_id;
                    count_con.data[count_con.count_type].equipId = _this_id;
                    count_con.refresh();
                }else{
                    console.log('上一次选择id为： ' + prev_id);
                    console.log('id没有改变');
                }
            }
        };
        //主培训培训项目查询
        CountControl.prototype.getTrainName = function(){
            var prev_id = 0;
            $("#train-father").trainName({
                attachObject: "#train-father-id",
                url : 'train/getMainTrainList.do',
                parameter : {
                    keyword : '',
                    pageNow : 1,
                    pageSize : 20
                },
                callback : getPresentId
            });
            //获取当前选择的父培训Id；
            function getPresentId(){
                var _this_id = $('#train-father').attr('rel');
                console.log('当前选择id为： '+  _this_id);
                if(_this_id != prev_id){
                    console.log('加载子培训数据');
                    prev_id = _this_id;
                    count_con.data[count_con.count_type].trainId = _this_id;
                    count_con.getChildTrain(_this_id);
                }else{
                    console.log('上一次选择id为： ' + prev_id);
                    console.log('id没有改变');
                }
            }
        };
        //子培训数据加载
        CountControl.prototype.getChildTrain = function(fatherId){
            var train_child = $('#train-child');
            $.ajax({
                type: 'get',
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                url:  'train/getChildTrainListByTrainId.do?trainId=' + fatherId,
                success: function (data) {
                    if(data){
                        setChildTrain(data);
                    }else{
                        console.log('getChildTrainListByTrainId.do has no data')
                    }
                },
                error: function (error) {
                    console.log('getChildTrainListByTrainId.do has error')
                }
            });

            function setChildTrain(data){
                var temp_html = '<option value="0">全部子培训</option>';
                if(data.length > 0){
                    $.each(data, function(i){
                        temp_html += '<option value="' + data[i].id + '">' + data[i].title + '</option>';
                    });
                }else{
                    temp_html = '<option value="0">没有子培训</option>';
                }
                train_child.html(temp_html).change().parents('.form-groups').show();
            }
        };
        //查询条件改变，按条件查询相关数据
        CountControl.prototype.refresh = function(){
            //查询条件改变，需要重新加载分页
            count_con.page_init[count_con.count_type] = true;
            //存在查询条件，开启清除按钮功能，
             count_con.need_clear = true;
            count_con.getCountData();
            console.log('refresh');
        };
        //根据pageNow == 0 判断三种统计类型是否需要重新初始化，
        // 当查询条件改变。统计类型改变都需要重新初始化
        // 当分页切换时，就不需要重新初始化
        CountControl.prototype.initCount = function initCount(){
            var _type = count_con.count_type;
            var page_now = count_con.data[_type].pageNow;
            var select_data = count_con.data[_type];


            console.log(pagConfig.tag);
            //  console.log('paglist len : ' + $('.paglist').length )
        };
        //筛选条件事件绑定
        CountControl.prototype.selectEvent = function(){
            // var data = count_con.data[count_con.count_type];
            //课程状态
            $('#train-status').change(function(){
                count_con.data[count_con.count_type].status = $(this).val();
                count_con.refresh();
                console.log('train Status change');
                console.log(count_con.data[count_con.count_type].status)
            });
            //子培训
            $('#train-child').change(function(){
                count_con.data[count_con.count_type].childTrainId = $(this).val();
                count_con.refresh();
                console.log('setChildTrain change')
            });
            //清除所有筛选条件
            $('#clear-select').on('click', function(){
                if(count_con.need_clear) count_con.clearSelected();

            });


        };
        //获取到开始时间，刷新数据
        CountControl.prototype.getBeginDate = function(date){
            count_con.data[count_con.count_type].beginDate = date;
            count_con.refresh();
            console.log('getBeginDate change : ' + count_con.data[count_con.count_type].beginDate);
        };
        //获取到开始时间，刷新数据
        CountControl.prototype.getEndDate = function(date){
            count_con.data[count_con.count_type].endDate = date;
            count_con.refresh();
            console.log('getEndDate change : ' + count_con.data[count_con.count_type].endDate);
        };
        //点名统计表格
        CountControl.prototype.init = function(){
            var _str = JSON.stringify(count_con.data.TrainCount);
            count_con.data.WatchCount = $.parseJSON(_str); //$为jQuery对象需要引入jQuery包
            count_con.data.CallrollCount = JSON.parse(_str);
            //统计类型事件绑定
            count_con.selectCountType();
            //页面预加载培训统计数据
            count_con.getCountData();
            //设备数据加载
            count_con.getTrainDevice();
            //主培训项目加载
            count_con.getTrainName();
            //筛选条件事件加载
            count_con.selectEvent();


        };
        return CountControl;

    }());
    return {
        init : function(){
            count_control.init();
        },
        getDate : function(obj){
            var date = obj.cal.getNewDateStr();
            var tag_id = obj.el.id;

            if(tag_id == 'beginDate'){
                console.log('I Have Get Begin Date : ' + date);
                count_control.getBeginDate(date);
            }else if(tag_id == 'endDate'){
                console.log('I Have Get EndDate Date : ' + date);
                count_control.getEndDate(date);
            }else{
                console.log('I Have Not Get EndDate Date : ' + tag_id);
            }
        },
        clearDate : function(obj){
            var date = '';
            var tag_id = obj.el.id;
            if(tag_id == 'beginDate'){
                console.log('Clear Begin Date : ' + date);
                count_control.getBeginDate(date);
            }else if(tag_id == 'endDate'){
                console.log('Clear EndDate Date : ' + date);
                count_control.getEndDate(date);
            }else{
                console.log('I Have Not Get EndDate Date : ' + tag_id);
            }
        }
    }
}();



//"查看"详情，绘制图形
var ViewInfo = function(){
    var pre_id = 0;
    var pre_type = 0;
    var view_info = new(function(){
        var view_con = '';
        function ViewControl(){
            this.courseId  = 0;
            //记录当前统计类型  TrainCount == 培训统计 WatchCount ==收看统计 点名统计 == CallrollCount
            this.count_type = "TrainCount";
            //三种统计类型对应的接口
            this.url = {
                "TrainCount" : "statistics/getTrainStatDetail.do",
                "WatchCount" : "statistics/getWatchStatDetail.do",
                "CallrollCount" : "statistics/getCallrollStatDetail.do"
            };

            this.vue =  '';
            //图形颜色配置
            this.echats_color = [
                '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
                '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
            ];


            view_con = this;

            view_con.init();
        }
        ViewControl.prototype.getViewInfoData = function(id, type, title){
            var _tips = '服务器异常，加载失败； 请稍后再尝试!';
            //tag_id =  #TrainCount == 培训统计 #WatchCount ==收看统计 #CallrollCount == 点名统计
            var tag_id = '#' + type;
            view_con.courseId = id;
            view_con.count_type = type;
            loading.loadDef(tag_id);
            setModalTitle(type, title);
            var data = map_data[type];
            if(data && data.id){
                view_con.vue.reaLoad(data);
                loading.loadOver(tag_id);
                //显示模态框
                $('.bs-countEcharts-modal').modal('show');
            }else{
                _tips = '暂无相关统计数据！' ;
                errors(_tips);
            }

            //错误处理
            function errors(tips){
                loading.loadOver(tag_id);
                alert_msg.error(tips);
            }
            function setModalTitle(type, title){
                var _type_name = '培训统计';
                switch (type){
                    case "WatchCount" :
                        _type_name = '收看统计';
                        break;
                    case "CallrollCount" :
                        _type_name = '点名统计';
                        break;
                    default :
                        _type_name = '培训统计';
                        break;
                }
                $('.bs-countEcharts-modal .modal-title').children('span').html(title + '--' + _type_name)
            }


        };
        //数据处理,配置为Echarts的数据格式
        ViewControl.prototype.configEchartsData = function(data, id){
            var _type = data.type;
            var color = view_con.echats_color;
            var config_arr = {
                stack : function(id, data){
                    var arg = data.data;
                    var series = [];
                    var legend = [];
                    //横坐标名称
                    var xAxis = ['第一次', '第二次', '第三次', '第四次', '第五次'];
                    var xAxis_len = xAxis.length;
                    $.each(arg, function (i) {
                        var _name = arg[i].name;
                        var _data = arg[i].data;
                        var _data_len = _data.length;
                        var _color = color[i];
                        if (_data_len != xAxis_len) {
                            xAxis_len = _data_len;
                            console.log('xAxis_len has changeed : ' + xAxis_len);
                        }
                        series.push({
                            name: _name,
                            type: 'bar',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'inside',
                                        formatter: "{c}人"
                                    },
                                    color : _color
                                }
                            },
                            data: _data
                        });
                        legend.push(_name)
                    });
                    var config = {
                        type : data.type,
                        title : data.name,
                        series : series,
                        legend : legend,
                        xAxis : xAxis.splice(0,xAxis_len),
                        id : id,
                        //formatter 是否使用函数回调，
                        // 1 函数回调，则str为字符串  setFormatter('应签到人数', params);
                        //0 普通字符串赋值 str传入echarts字符串 "{b} <br/>{a} : {c}人 <br/>{a1} : {c1}人"
                        //0 如果按默认加载，可以不用传值
                        formatter : 1,
                        formatter_str : '应签到人数'
                    };
                    view_con.drawEcharts(config);
                },
                bar : function(id, data){
                    var arg = data.data;
                    //数据
                    var series = [];
                    //横坐标名称
                    var xAxis = [];
                    $.each(arg, function (i) {
                        var _name = arg[i].name;
                        var _value = arg[i].value;
                        series.push(_value);
                        xAxis.push(_name);
                    });
                    var config = {
                        type : data.type,
                        title : data.name,
                        series : series,
                        xAxis : xAxis,
                        id : id
                    };
                    view_con.drawEcharts(config);
                },
                pie : function(id, data){
                    var arg = data.data;
                    //数据
                    var series = arg;
                    //图例名称
                    var legend = [];
                    $.each(arg, function (i) {
                        legend.push(arg[i].name);
                    });
                    var config = {
                        type : data.type,
                        title : data.name,
                        //tips : "副标题",
                        series : series,
                        legend : legend,
                        id : id
                    };
                    view_con.drawEcharts(config);
                }
            };
            config_arr[_type](id, data);
        };
        //echarts图表绘制
        ViewControl.prototype.drawEcharts = function(config){
            var darw_map = {
                stack : function(config){
                   // console.log('myChart ID is' + config.id);
                    console.log(document.getElementById(config.id));
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById(config.id));
                    var option = {
                        title : {
                            text: config.title || '堆栈图' ,
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {type : 'shadow'},
                            padding:10,
                            textStyle : {
                                'align' : 'left'
                            },
                            formatter: config.formatter_str || "{b} <br/>{a} : {c}人 <br/>{a1} : {c1}人"
                        },
                        legend: {x : 'left', data: config.legend, selectedMode: false},
                        yAxis : [{type : 'value'}],
                        xAxis : [
                            {
                                type : 'category',
                                data: config.xAxis
                            }
                        ],
                        series : config.series
                    };
                    if(config.formatter){
                        option.tooltip.formatter = function(params){
                            return setFormatter(config.formatter_str, params);
                        };
                    }
                    myChart.setOption(option);
                    //鼠标放在图形上，显示求和数据
                    function setFormatter(totalName, params){
                        var k = 0;
                        var len = params.length;
                        var temp_str = '';
                        var total = 0;
                        for(k = 0; k<len; k++){
                            var num = params[k].data;
                            temp_str +=  params[k].seriesName + '：' + num + '人<br/>';
                            total += num;
                        }
                        return params[0].name + '：<br/>' + totalName + ' ：' + total + '人<br/>' + temp_str;
                    }
                },
                bar : function(config){
                   // console.log('myChart ID is' + config.id);
                    console.log(document.getElementById(config.id));
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById(config.id));
                    var option = {
                        title : {
                            text: config.title || '饼图',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {type : 'shadow'},
                            formatter: "{b} : {c}人"
                        },
                        calculable : true,
                        yAxis : [{type : 'value'}],
                        xAxis : [
                            {
                                type : 'category',
                                data: config.xAxis
                            }
                        ],
                        series : [
                            {
                                type:'bar',
                                itemStyle : setMapColor(),
                                data: config.series
                            }
                        ]
                    };
                    console.log(option.toString());
                    myChart.setOption(option);
            },
                pie : function(config){
                    console.log('myChart ID is' + config.id);
                    console.log(document.getElementById(config.id));
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById(config.id));
                    var option = {
                        title : {
                            text: config.title || '饼图' ,
                            subtext:  view_con.count_type == "WatchCount" ? '点播收看数据截止为：【当前日前一天24:00:00】' : '',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}(人) ({d}%)",
                            textStyle : {
                                'align' : 'left'
                            }
                        },
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data: config.legend
                        },
                        calculable : true,
                        series : [
                            {
                                name : config.title || '饼图' ,
                                type:'pie',
                                radius : '60%',
                                center: ['50%', '60%'],
                                itemStyle : setMapColor(),
                                data: config.series
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
            };


            //延迟绘制图形，Vue生成Id有延时
            setTimeout(function(){
                darw_map[config.type](config);
            },200);




            //配置图标颜色
            function setMapColor(){
                var colorList = view_con.echats_color;
                var itemStyle = {
                    normal: {
                        color: function(params) {
                            return colorList[params.dataIndex]
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                };
                return itemStyle;
            }
        };
        //
        ViewControl.prototype.vue_init = function(){
            view_con.vue = new Vue({
                el: '#ViewInfo',
                data: {
                    cout_type: view_con.count_type,
                    infoData : {},
                    //下载链接地址
                    downFileName : {},
                    //是否显示下载按钮
                    haveCount : false
                },
                methods: {
                    replaceMethod : function(data, id){
                        var echarts_type =  data.type;
                        var echarts_id =  id;
                        console.log("name is : " + data.name);
                        console.log("type is : " + data.type);
                        console.log("id is : " + id);
                        view_con.configEchartsData(data, id);

                    },
                    reaLoad: function (bean) {
                        var arr_len = bean.length;
                        var _type = view_con.count_type;
                        var _courseId = view_con.courseId;
                        console.log(arr_len);
                        // view_con.vue.infoData.splice(arr_len);
                        view_con.vue.infoData = bean;
                        view_con.vue.cout_type = _type;

                        //只有当有统计数据时，才加载下载功能
                        if(bean.chart && bean.chart.length > 0 ){
                            console.log(bean.chart.length);
                            //显示下载按钮
                            view_con.vue.haveCount = true;
                            //写入下载分类按钮
                            view_con.vue.downFileName = setDownFileName(_type, bean);
                        }else{
                            view_con.vue.haveCount = false;
                        }


                        //根据cout_type设置downFileName字段名称及下载地址
                        function setDownFileName(type, data){
                            //下载地址 默认存放 TrainCount 统计培训
                            var _url = "#";
                            //下载列表按钮数据， 默认存放 TrainCount 统计培训
                            var _obj = {
                                "all" : [
                                    {
                                        "name" : "全部名单",
                                        "params" : _url + '?type=default&childTrainId=' + _courseId
                                    }
                                ],
                                "left" : [
                                    {
                                        "name" : "指定参训人全部名单",
                                        "params" : _url + '?type=assignParticipator&childTrainId=' + _courseId
                                    },
                                    {
                                        "name" : "指定参训人实到名单",
                                        "params" : _url + '?type=actualAssignParticipator&childTrainId=' + _courseId
                                    },
                                    {
                                        "name" : "指定参训人缺席名单",
                                        "params" : _url + '?type=absentAssignParticipator&childTrainId=' + _courseId
                                    }
                                ],
                                "right" : [
                                    {
                                        "name" : "报名人全部名单",
                                        "params" : _url + '?type=applyApprove&childTrainId=' + _courseId
                                    },
                                    {
                                        "name" : "报名人实到名单",
                                        "params" : _url + '?type=actualApply&childTrainId=' + _courseId
                                    },
                                    {
                                        "name" : "报名人缺席名单",
                                        "params" : _url + '?type=absentApply&childTrainId=' + _courseId
                                    }
                                ]

                            };
                            switch (type){
                                //收看统计
                                case "WatchCount" :
                                    //_url = "statistics/exportWatch.do";
                                    _obj = {
                                        "all" : [
                                            {
                                                "name" : "全部名单",
                                                "params" : _url + '?watchType=&watchTernimal=&watchTernimalFlag=&childTrainId=' + _courseId
                                            }
                                        ],
                                        "left" : [
                                            {
                                                "name" : "直播收看全部名单",
                                                "params" : _url + '?watchType=1&watchTernimal=&watchTernimalFlag=&childTrainId=' + _courseId
                                            },
                                            {
                                                "name" : "网页直播收看名单",
                                                "params" : _url + '?watchType=1&watchTernimal=webpage&watchTernimalFlag=true&childTrainId=' + _courseId
                                            },
                                            {
                                                "name" : "智能终端直播收看",
                                                "params" : _url + '?watchType=1&watchTernimal=webpage&watchTernimalFlag=false&childTrainId=' + _courseId
                                            }
                                        ],
                                        "right" : [
                                            {
                                                "name" : "点播收看全部名单",
                                                "params" : _url + '?watchType=2&watchTernimal=&watchTernimalFlag=&childTrainId=' + _courseId
                                            },
                                            {
                                                "name" : "网页点播收看名单",
                                                "params" : _url + '?watchType=2&watchTernimal=webpage&watchTernimalFlag=true&childTrainId=' + _courseId
                                            },
                                            {
                                                "name" : "智能终端点播收看",
                                                "params" : _url + '?watchType=2&watchTernimal=webpage&watchTernimalFlag=false&childTrainId=' + _courseId
                                            }
                                        ]
                                    };
                                    break;
                                //点名统计
                                case "CallrollCount" :
                                  //  _url = "statistics/exportCallroll.do";
                                    _obj = setCallrollCountData(data);

                                    //点名统计的下载按钮需要根据点名次数(callrollArr)来设置
                                function setCallrollCountData(data){
                                    var callroll_arr = data.callrollArr || [];
                                    var callroll_len = callroll_arr.length;
                                    console.log(callroll_len);
                                    var times = ['一', '二', '三', '四', '五', '六', '七'];
                                    var _obj = {
                                        "all" : [
                                            {
                                                "name" : "全部名单",
                                                "params" : _url +  '?times=&isSignIn=&childTrainId=' + _courseId
                                            }
                                        ],
                                        "left" : [],
                                        "right" : []
                                    };
                                    $.each(callroll_arr, function(i){
                                        var k = i+1;
                                        var _num = times[i];
                                        _obj.left.push({
                                            "name" : "第" + _num + '次签到人员名单',
                                            "params" : _url + '?times=' + k + '&isSignIn=true&childTrainId=' + _courseId
                                        });
                                        _obj.right.push({
                                            "name" : "第" + _num + '次未签到人员名单',
                                            "params" : _url + '?times=' + k + '&isSignIn=false&childTrainId=' + _courseId
                                        });
                                    });
                                    return _obj;
                                }
                                    break;
                            }
                            return _obj;
                        }
                    },
                    //“下载各类人员名单”按钮事件,控制下载框的显隐藏，同时传递当前课程Id
                    showDownBox : function(){
                        $('#downCountFile').toggle();
                    }
                }
            });
            console.log('Vue Is Inited')
        };
        ViewControl.prototype.init = function(){
            view_con.vue_init();
            console.log(123);

        };
        return ViewControl;
    }());
    return {
        getData : function(id, type, title){
            //当前请求Id与上一次一致，切统计类型也一致的情况下，才不要加载新数据
            console.log(title);
            if(pre_id == id && pre_type == type){
                $('.bs-countEcharts-modal').modal('show');
                console.log('I Was View Old Info');
                console.log('I Was View count_type ： ' + type);
                console.log('I Was View pre_type ： ' + pre_type);
                console.log('I Was View pre_id ： ' + pre_id);
                console.log('I Was View course_id ： ' + id);
                return ;
            }
            console.log('加载新的详情数据！');
            pre_id = id;
            pre_type = type;
            view_info.getViewInfoData(id, type, title);
        }
    }
}();