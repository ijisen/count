/**
 * Created by jisen on 2016/6/16.
 */
//地图右侧数据统计  零时存放的数据
var COUNTDATA = '';
//当前地图位置  china-四川-成都-青羊区
var LOCATION_ARR = [];
$(function(){
    
    $('.supervise_title').on('click','a',function(){
        var provence_name = $(this).html(),
            breadcrumb =  $(this).parents('.supervise_title');
        if(provence_name == '全国'){
            chartPovience('china');
            selectData(['china']);
            breadcrumb.html('<span>教学监管</span> / <span>全国</span>');
        }else{
            breadcrumb.html('<a href="javascript:void(0);" title="教学监管">教学监管</a> / <a class="blue_on" name="china" href="javascript:void(0);" title="全国">全国</a> / <span>' + provence_name + '</span>');
            chartPovience(provence_name);
            selectData(['china', provence_name]);
        }
    });
    /*右侧选项卡*/
    $('.map_tab span').click(function(){
        if($(this).hasClass('map_span_on')){ return }
        var _index = $(this).index();
        $(this).addClass('map_span_on').siblings('span').removeClass('map_span_on');
        switch (_index){
            case 0 :
                showCountData('today');
                break;
            case 1 :
                showCountData('weekday');
                break;
            case 2 :
                showCountData('term');
                break;
        }
    });
});
/* tab 项数据写入 */
function selectData(arr){
    var _province = '',
        _city = '',
        _area = '',
        _arrLen = arr.length;
    switch(_arrLen){
        case 1 :
            _province = '全国';
            _city =  '全国';
            COUNTDATA = jsonArr.total;
            break;
        case 2 :
            _province = arr[1];
            if(jsonArr[_province] && jsonArr[_province].total){
                COUNTDATA = jsonArr[_province].total;
            }else{
                COUNTDATA = ''
            }

            break;
        case 3 :
            _province = arr[1];
            _city = arr[2];
            if(jsonArr[_province] && jsonArr[_province][_city] && jsonArr[_province][_city].total){
                COUNTDATA = jsonArr[_province][_city].total;
            }else{
                COUNTDATA = ''
            }
            break;
        case 4 :
            _province = arr[1];
            _city = arr[2];
            _area = arr[3];
            if(jsonArr[_province] && jsonArr[_province][_city] && jsonArr[_province][_city][_area] && jsonArr[_province][_city][_area].total){
                COUNTDATA = jsonArr[_province][_city][_area].total;
            }else{
                COUNTDATA = ''
            }
            break;
    }
  //  console.log('province: ' + _province );
 //   console.log('city: ' + _city );
    showCountData('today',arr);
    $('.map_tab span').removeClass('map_span_on').eq(0).addClass('map_span_on');

};
function showCountData (date,arr){
    var _col1 = '',
        _col2 = '',
        _col3 = '',
        _col4 = '',
        _tempArr = '',
        _arr_len = 0,
        _bg_info = $('.bg-info');
    if(arr){
        _arr_len = arr.length;
        if(_arr_len == 1){
            _bg_info.html('全国');
        }else{
            _bg_info.html(arr[_arr_len-1]);
        }
        LOCATION_ARR = arr;
        console.log(LOCATION_ARR)
    }
    if(COUNTDATA == '' ){
        _tempArr = '<h3 style="padding-top:100px; color:#999">该城市还暂未部署网点</h3>'
    }else{
        _col1 = COUNTDATA[date].col1;
        _col2 = COUNTDATA[date].col2;
        _col3 = COUNTDATA[date].col3;
        _col4 = COUNTDATA[date].col4;
        //同步课堂
        _tempArr = '<table cellpadding="0" cellspacing="0" border="0" class="r_table">' +
        '<tr class="tr_head">' +
        '<td colspan="2">同步课堂</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td>主课堂：<label style="font-size: 18px;">' + _col1[0] + '</label></td>' +
        '<td>辅课堂：<label style="font-size: 18px;">' + _col1[1] + '</label></td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td colspan="2" class="text-left">参与老师：' + _col1[2] + ' 人次</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td colspan="2" class="text-left">参与学生：' + _col1[3] + ' 人次</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td colspan="2" class="text-left">参与学校：' + _col1[4] + ' 所</td>' +
        '</tr>' +
        '</table>';
        //协同教研、听评课
        _tempArr += '<table cellpadding="0" cellspacing="0" border="0" class="r_table">' +
        '<tr class="tr_head">' +
        '<td>协同教研</td>' +
        '<td>听评课</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td>教研课题：' + _col2[0] + ' 个</td>' +
        '<td>评课数量：' + _col3[0] + ' 个</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td>参与老师：' + _col2[1] + ' 人</td>' +
        '<td>参与老师：' + _col3[1] + ' 人</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td>参与学校：' + _col2[2] + ' 所</td>' +
        '<td>参与学校：' + _col3[2] + ' 所</td>' +
        '</tr>' +
        '</table>';
        //课程资源
        _tempArr += '<table cellpadding="0" cellspacing="0" border="0" class="r_table">' +
        '<tr class="tr_head">' +
        '<td colspan="2">课程资源</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td class="text-left">资源数量：' + _col4[0] + ' 个</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td class="text-left">浏览次数：' + _col4[1] + ' 次</td>' +
        '</tr>' +
        '<tr class="tr_content">' +
        '<td class="text-left">下载次数：' + _col4[2] + ' 次</td>' +
        '</tr>' +
        '</table>';
    }
    $('.tab_content').html(_tempArr);
};
/* ========================================================================
 * Echarts 地图绘制 中国-省-市（eg：中国-四川省-成都市）
 * ========================================================================
 * 使用说明：
 * chartPovience(curIndx,provence_name);
 *    chartPovience 接口绘制中国地图 和 各省的地图包括 直辖市 自治区；
 *    在绘制全国地图时 chartPovience(0,china);
 *
 * ======================================================================== */
(function () {
    // 'use strict';
    var map_City_Chart = '',
        _povience_curIndx = 0,
        _povience_mapType = '',
        _povience_option = '',
        _city_mapType = [],
        _city_option = '',
        _city_map = '',
        mapGeoData = echarts.util.mapData.params;
    console.log(mapGeoData);
    _povience_option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        series: [
            {
                name: '随机数据',
                type: 'map',
                mapType: 'china',
                roam: true,
                scaleLimit : {
                    max:5,
                    min:0.5
                },
                selectedMode: 'single',
                itemStyle: {
                    normal: {
                        borderWidth:1,
                        borderColor:'#fff',
                        color: '#bcd7ec',
                        label: {
                            show: true
                        }
                    },
                    emphasis: {                 // 也是选中样式
                        label: {
                            show: true,
                            textStyle: {
                                color: '#229cfd'
                            }
                        }
                    }
                },
                data: []
            }
        ]
    };
    _city_option = {
        /*title: {
         text : '全国344个主要城市（县）地图 by Pactera 陈然',
         link : 'http://www.pactera.com/',
         subtext : '北京市 （滚轮或点击切换）'
         },*/
        tooltip : {
            trigger: 'item',
            formatter: '{b}'
        },
        dataRange: {
            min: 0,
            max: 2500,
            x: 'left',
            y: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true,
            show : false
        },
        series : [
            {
                name: '全国344个主要城市（县）地图',
                type: 'map',
                mapType: 'china',
                roam: true,
                selectedMode : 'single',
                scaleLimit : {
                    max:5,
                    min:0.5
                },
                itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                },
                data:[]
            }
        ]
    };
    _povience_mapType = [
        'china',
        // 23个省
        '广东', '青海', '四川', '海南', '陕西',
        '甘肃', '云南', '湖南', '湖北', '黑龙江',
        '贵州', '山东', '江西', '河南', '河北',
        '山西', '安徽', '福建', '浙江', '江苏',
        '吉林', '辽宁', '台湾',
        // 5个自治区
        '新疆', '广西', '宁夏', '内蒙古', '西藏',
        // 4个直辖市
        '北京', '天津', '上海', '重庆',
        // 2个特别行政区
        '香港', '澳门'
    ];
    _city_map = {
        "北京市": "110100",
        "天津市": "120100",
        "上海市": "310100",
        "重庆市": "500100",

        "崇明县": "310200",            // ??
        "湖北省直辖县市": "429000",       // ??
        "铜仁市": "522200",            // ??
        "毕节市": "522400",            // ??

        "石家庄市": "130100",
        "唐山市": "130200",
        "秦皇岛市": "130300",
        "邯郸市": "130400",
        "邢台市": "130500",
        "保定市": "130600",
        "张家口市": "130700",
        "承德市": "130800",
        "沧州市": "130900",
        "廊坊市": "131000",
        "衡水市": "131100",
        "太原市": "140100",
        "大同市": "140200",
        "阳泉市": "140300",
        "长治市": "140400",
        "晋城市": "140500",
        "朔州市": "140600",
        "晋中市": "140700",
        "运城市": "140800",
        "忻州市": "140900",
        "临汾市": "141000",
        "吕梁市": "141100",
        "呼和浩特市": "150100",
        "包头市": "150200",
        "乌海市": "150300",
        "赤峰市": "150400",
        "通辽市": "150500",
        "鄂尔多斯市": "150600",
        "呼伦贝尔市": "150700",
        "巴彦淖尔市": "150800",
        "乌兰察布市": "150900",
        "兴安盟": "152200",
        "锡林郭勒盟": "152500",
        "阿拉善盟": "152900",
        "沈阳市": "210100",
        "大连市": "210200",
        "鞍山市": "210300",
        "抚顺市": "210400",
        "本溪市": "210500",
        "丹东市": "210600",
        "锦州市": "210700",
        "营口市": "210800",
        "阜新市": "210900",
        "辽阳市": "211000",
        "盘锦市": "211100",
        "铁岭市": "211200",
        "朝阳市": "211300",
        "葫芦岛市": "211400",
        "长春市": "220100",
        "吉林市": "220200",
        "四平市": "220300",
        "辽源市": "220400",
        "通化市": "220500",
        "白山市": "220600",
        "松原市": "220700",
        "白城市": "220800",
        "延边朝鲜族自治州": "222400",
        "哈尔滨市": "230100",
        "齐齐哈尔市": "230200",
        "鸡西市": "230300",
        "鹤岗市": "230400",
        "双鸭山市": "230500",
        "大庆市": "230600",
        "伊春市": "230700",
        "佳木斯市": "230800",
        "七台河市": "230900",
        "牡丹江市": "231000",
        "黑河市": "231100",
        "绥化市": "231200",
        "大兴安岭地区": "232700",
        "南京市": "320100",
        "无锡市": "320200",
        "徐州市": "320300",
        "常州市": "320400",
        "苏州市": "320500",
        "南通市": "320600",
        "连云港市": "320700",
        "淮安市": "320800",
        "盐城市": "320900",
        "扬州市": "321000",
        "镇江市": "321100",
        "泰州市": "321200",
        "宿迁市": "321300",
        "杭州市": "330100",
        "宁波市": "330200",
        "温州市": "330300",
        "嘉兴市": "330400",
        "湖州市": "330500",
        "绍兴市": "330600",
        "金华市": "330700",
        "衢州市": "330800",
        "舟山市": "330900",
        "台州市": "331000",
        "丽水市": "331100",
        "合肥市": "340100",
        "芜湖市": "340200",
        "蚌埠市": "340300",
        "淮南市": "340400",
        "马鞍山市": "340500",
        "淮北市": "340600",
        "铜陵市": "340700",
        "安庆市": "340800",
        "黄山市": "341000",
        "滁州市": "341100",
        "阜阳市": "341200",
        "宿州市": "341300",
        "六安市": "341500",
        "亳州市": "341600",
        "池州市": "341700",
        "宣城市": "341800",
        "福州市": "350100",
        "厦门市": "350200",
        "莆田市": "350300",
        "三明市": "350400",
        "泉州市": "350500",
        "漳州市": "350600",
        "南平市": "350700",
        "龙岩市": "350800",
        "宁德市": "350900",
        "南昌市": "360100",
        "景德镇市": "360200",
        "萍乡市": "360300",
        "九江市": "360400",
        "新余市": "360500",
        "鹰潭市": "360600",
        "赣州市": "360700",
        "吉安市": "360800",
        "宜春市": "360900",
        "抚州市": "361000",
        "上饶市": "361100",
        "济南市": "370100",
        "青岛市": "370200",
        "淄博市": "370300",
        "枣庄市": "370400",
        "东营市": "370500",
        "烟台市": "370600",
        "潍坊市": "370700",
        "济宁市": "370800",
        "泰安市": "370900",
        "威海市": "371000",
        "日照市": "371100",
        "莱芜市": "371200",
        "临沂市": "371300",
        "德州市": "371400",
        "聊城市": "371500",
        "滨州市": "371600",
        "菏泽市": "371700",
        "郑州市": "410100",
        "开封市": "410200",
        "洛阳市": "410300",
        "平顶山市": "410400",
        "安阳市": "410500",
        "鹤壁市": "410600",
        "新乡市": "410700",
        "焦作市": "410800",
        "濮阳市": "410900",
        "许昌市": "411000",
        "漯河市": "411100",
        "三门峡市": "411200",
        "南阳市": "411300",
        "商丘市": "411400",
        "信阳市": "411500",
        "周口市": "411600",
        "驻马店市": "411700",
        "省直辖县级行政区划": "469000",
        "武汉市": "420100",
        "黄石市": "420200",
        "十堰市": "420300",
        "宜昌市": "420500",
        "襄阳市": "420600",
        "鄂州市": "420700",
        "荆门市": "420800",
        "孝感市": "420900",
        "荆州市": "421000",
        "黄冈市": "421100",
        "咸宁市": "421200",
        "随州市": "421300",
        "恩施土家族苗族自治州": "422800",
        "长沙市": "430100",
        "株洲市": "430200",
        "湘潭市": "430300",
        "衡阳市": "430400",
        "邵阳市": "430500",
        "岳阳市": "430600",
        "常德市": "430700",
        "张家界市": "430800",
        "益阳市": "430900",
        "郴州市": "431000",
        "永州市": "431100",
        "怀化市": "431200",
        "娄底市": "431300",
        "湘西土家族苗族自治州": "433100",
        "广州市": "440100",
        "韶关市": "440200",
        "深圳市": "440300",
        "珠海市": "440400",
        "汕头市": "440500",
        "佛山市": "440600",
        "江门市": "440700",
        "湛江市": "440800",
        "茂名市": "440900",
        "肇庆市": "441200",
        "惠州市": "441300",
        "梅州市": "441400",
        "汕尾市": "441500",
        "河源市": "441600",
        "阳江市": "441700",
        "清远市": "441800",
        "东莞市": "441900",
        "中山市": "442000",
        "潮州市": "445100",
        "揭阳市": "445200",
        "云浮市": "445300",
        "南宁市": "450100",
        "柳州市": "450200",
        "桂林市": "450300",
        "梧州市": "450400",
        "北海市": "450500",
        "防城港市": "450600",
        "钦州市": "450700",
        "贵港市": "450800",
        "玉林市": "450900",
        "百色市": "451000",
        "贺州市": "451100",
        "河池市": "451200",
        "来宾市": "451300",
        "崇左市": "451400",
        "海口市": "460100",
        "三亚市": "460200",
        "三沙市": "460300",
        "成都市": "510100",
        "自贡市": "510300",
        "攀枝花市": "510400",
        "泸州市": "510500",
        "德阳市": "510600",
        "绵阳市": "510700",
        "广元市": "510800",
        "遂宁市": "510900",
        "内江市": "511000",
        "乐山市": "511100",
        "南充市": "511300",
        "眉山市": "511400",
        "宜宾市": "511500",
        "广安市": "511600",
        "达州市": "511700",
        "雅安市": "511800",
        "巴中市": "511900",
        "资阳市": "512000",
        "阿坝藏族羌族自治州": "513200",
        "甘孜藏族自治州": "513300",
        "凉山彝族自治州": "513400",
        "贵阳市": "520100",
        "六盘水市": "520200",
        "遵义市": "520300",
        "安顺市": "520400",
        "黔西南布依族苗族自治州": "522300",
        "黔东南苗族侗族自治州": "522600",
        "黔南布依族苗族自治州": "522700",
        "昆明市": "530100",
        "曲靖市": "530300",
        "玉溪市": "530400",
        "保山市": "530500",
        "昭通市": "530600",
        "丽江市": "530700",
        "普洱市": "530800",
        "临沧市": "530900",
        "楚雄彝族自治州": "532300",
        "红河哈尼族彝族自治州": "532500",
        "文山壮族苗族自治州": "532600",
        "西双版纳傣族自治州": "532800",
        "大理白族自治州": "532900",
        "德宏傣族景颇族自治州": "533100",
        "怒江傈僳族自治州": "533300",
        "迪庆藏族自治州": "533400",
        "拉萨市": "540100",
        "昌都地区": "542100",
        "山南地区": "542200",
        "日喀则地区": "542300",
        "那曲地区": "542400",
        "阿里地区": "542500",
        "林芝地区": "542600",
        "西安市": "610100",
        "铜川市": "610200",
        "宝鸡市": "610300",
        "咸阳市": "610400",
        "渭南市": "610500",
        "延安市": "610600",
        "汉中市": "610700",
        "榆林市": "610800",
        "安康市": "610900",
        "商洛市": "611000",
        "兰州市": "620100",
        "嘉峪关市": "620200",
        "金昌市": "620300",
        "白银市": "620400",
        "天水市": "620500",
        "武威市": "620600",
        "张掖市": "620700",
        "平凉市": "620800",
        "酒泉市": "620900",
        "庆阳市": "621000",
        "定西市": "621100",
        "陇南市": "621200",
        "临夏回族自治州": "622900",
        "甘南藏族自治州": "623000",
        "西宁市": "630100",
        "海东地区": "632100",
        "海北藏族自治州": "632200",
        "黄南藏族自治州": "632300",
        "海南藏族自治州": "632500",
        "果洛藏族自治州": "632600",
        "玉树藏族自治州": "632700",
        "海西蒙古族藏族自治州": "632800",
        "银川市": "640100",
        "石嘴山市": "640200",
        "吴忠市": "640300",
        "固原市": "640400",
        "中卫市": "640500",
        "乌鲁木齐市": "650100",
        "克拉玛依市": "650200",
        "吐鲁番地区": "652100",
        "哈密地区": "652200",
        "昌吉回族自治州": "652300",
        "博尔塔拉蒙古自治州": "652700",
        "巴音郭楞蒙古自治州": "652800",
        "阿克苏地区": "652900",
        "克孜勒苏柯尔克孜自治州": "653000",
        "喀什地区": "653100",
        "和田地区": "653200",
        "伊犁哈萨克自治州": "654000",
        "塔城地区": "654200",
        "阿勒泰地区": "654300",
        "自治区直辖县级行政区划": "659000",
        "台湾省": "710000",
        "香港特别行政区": "810100",
        "澳门特别行政区": "820000"
    };
    for (var city in _city_map) {
        _city_mapType.push(city);
        // 自定义扩展图表类型
        mapGeoData.params[city] = {
            getGeoJson: (function (c) {
                var geoJsonName = _city_map[c];
                //console.log(geoJsonName)
                return function (callback) {
                    $.getJSON('js/geoJson/china-main-city/' + geoJsonName + '.json', callback);
                }
            })(city)
        }
    }
    return chartPovience = function (povience) {
        var povience_is_exits = false;
        for(var i = 0; i < _povience_mapType.length; i++){
            if(_povience_mapType[i] == povience){
                _povience_curIndx = i;
                povience_is_exits = true;
                break;
            }
        }
        if(!povience_is_exits){return}
        _povience_option.series[0].mapType = povience;
        $('#main-box').html('<div id="main" style="height: 100%; width: 100%"></div>');
        map_City_Chart = echarts.init(document.getElementById('main'));
        map_City_Chart.on(echarts.config.EVENT.MAP_SELECTED, function (param) {
            var len = _povience_mapType.length;
            var mt = _povience_mapType[_povience_curIndx % len];
          //  console.log(mt + 456);
            var selected = param.selected;
            if (mt == 'china') {
                // 全国选择时指定到选中的省份
                for (var i in selected) {
                    if (selected[i]) {
                        mt = i;
                        while (len--) {
                            if (_povience_mapType[len] == mt) {
                                _povience_curIndx = len;
                            }
                        }
                        break;
                    }
                }
                $('.supervise_title').html('<span>教学监管</span> / <a class="blue_on" name="china" href="javascript:void(0);" title="全国">全国</a> / <span>' + mt + '</span>');
                selectData(['china',mt]);
                _povience_option.series[0].mapType = mt;
                map_City_Chart.setOption( _povience_option, true);
            } else {
                var str = '';
                for (var p in selected) {
                    if (selected[p]) {
                        str = p ;
                    }
                }
                if(str == ''){return false} //判断是否选中
                selectData(['china', mt, str]);
                for (var k in _city_map) {
                    if(str == k){     //判断 当前城市 是否为直辖市、自治区 ，如果是就不再调用chartCity();
                       $('.supervise_title').html('<span>教学监管</span> / ' +
                        '<a class="blue_on" name="china" href="javascript:void(0);" title="全国">全国</a> / ' +
                        '<a class="blue_on" name="province" href="javascript:void(0);" title="' + mt + '">' + mt + '</a> / ' +
                        '<span>' + str + '</span>');
                        console.log('我去chartCity');
                        chartCity(mt,str);
                        break;
                    }
                }
            }
        });
        map_City_Chart.setOption(_povience_option);
    };
    function chartCity(_povience_name,city_name){
        $('#main-box').html('<div id="main" style="height: 100%; width: 100%"></div>');
        map_City_Chart = echarts.init(document.getElementById('main'));
        map_City_Chart.on(echarts.config.EVENT.MAP_SELECTED, function (param){
            var selected = param.selected,
                mt = '';
            for (var p in selected) {
                if (selected[p]) {
                    mt = p;
                }
            }
            if(mt != ''){
                selectData(['china', _povience_name, city_name, mt]);
              //  console.log(mt);
            }else{
                selectData(['china', _povience_name, city_name]);
            }
        });
        _city_option.series[0].mapType = city_name;
        map_City_Chart.setOption(_city_option);
    }
} ());
/* ========================================================================
 * json零时数据
 * ======================================================================== */

var jsonArr = {
    "total": {
        "today" : {
            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
        },
        "weekday" : {
            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
        },
        "term" : {
            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
        }

    },
        "北京": {
            "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
            },
            "东城区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "西城区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "朝阳区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "宣武区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "西城区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "崇文区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "石景山区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "丰台区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "海淀区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "顺义区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "平谷区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "密云县": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "怀柔区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "延庆县": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "昌平区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "房山区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "大兴区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "通州区": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            }

        },
        "天津": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "上海": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "重庆": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "河北": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "河南": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "云南": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "辽宁": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "黑龙江": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "湖南": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "安徽": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "山东": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "新疆": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "江苏": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "浙江": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "江西": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "湖北": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "广西": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "甘肃": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "山西": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "内蒙古": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "陕西": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "吉林": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "福建": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "贵州": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "广东": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "青海": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "西藏": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "四川": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            },
            "成都市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                },
                "彭州市": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "都江堰市": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "郫县": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "新都区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "青白江区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "金堂县": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "温江区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "金牛区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "青羊区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "成华区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "武侯区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "锦江区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "龙泉驿区": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "崇州市": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "大邑县": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "新津县": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "双流县": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "邛崃市": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                },
                "浦江县": {
                    "total": {
                        "today" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "weekday" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        },
                        "term" : {
                            "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                            "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                        }
                    }
                }
            },
            "德阳市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "广元市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "巴中市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "达州市": {
                "total": {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            },
            "阿坝藏族羌族自治州": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "绵阳市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "南充市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "广安市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "遂宁市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "资阳市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "甘孜藏族自治州": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "雅安市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "眉山市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "内江市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "乐山市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "自贡市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "宜宾市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "泸州市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "凉山彝族自治州": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            },
            "攀枝花市": {
                "total": {
                    "today" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "weekday" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    },
                    "term" : {
                        "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                        "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                    }
                }
            }
        },
        "宁夏": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "海南": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "台湾": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "香港": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        },
        "澳门": {
            "total": {
                "today" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "weekday" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                },
                "term" : {
                    "col1": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col2": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col3": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)],
                    "col4": [Math.round(Math.random() * 10000), Math.round(Math.random() * 10000), Math.round(Math.random() * 10000)]
                }
            }
        }
}

