/*应用程序“开饭啦”的Controller模块*/
//angular路由
angular.module(
    'main',
    ['ngRoute','controls']
    )
    .config(function($routeProvider){
      $routeProvider
          .when('/data',{
            templateUrl: 'tpl/data.html',
            controller: 'dataCtrl'
          })
          .when('/class',{
            templateUrl: 'tpl/class.html',
            controller: 'classCtrl'
          })
          .when('/device',{
            templateUrl: 'tpl/device.html',
            controller: 'devicetCtrl'
          })
    });
//angular控制
angular.module('controls', [])
  .controller('dataCtrl', function ($scope, $http) { //数据分析
    resetHtml(0);
      var data_analyse = new Data_analyse();
	  data_analyse.res_analyse();
      $('.four_tab').on('click','span',function(){
        if($(this).hasClass('four_tab_on')){
          return;
        }
        var index = $(this).index();
        $(this).addClass('four_tab_on').siblings('span').removeClass('four_tab_on');
        $('.two_tab').addClass('number_on').removeClass('result_on');
        data_analyse.is_effect = 0;
        switch(index){
          case 1 :
            data_analyse.class_analyse();
            break;
          case 2 :
            data_analyse.teach_analyse();
            break;
          case 3 :
            data_analyse.classEval_analyse();
            break;
          default :
            data_analyse.res_analyse();
            break;
        }
      });
      //数量统计-效果分析  切换栏
      $('.two_tab').on('click','span',function () {
        var _tab_index = $(this).index(),
            _tab_parent = $(this).parent(),
            _option_arr = '';
        if (_tab_index == 0 && data_analyse.is_effect == 1){ //数量统计
          data_analyse.is_effect = 0;
          _tab_parent.addClass('number_on').removeClass('result_on');

        }else if(_tab_index == 1 && data_analyse.is_effect == 0){ //效果分析
          data_analyse.is_effect = 1;
          _tab_parent.addClass('result_on').removeClass('number_on');

        }
        _option_arr = data_analyse.option_Arr[data_analyse.is_effect];
        data_analyse.analyze_wrap.html(data_analyse.tempArr[data_analyse.is_effect]);
        data_analyse.refresh(_option_arr);
        data_analyse.topPicSelect(_option_arr);
      });
  })
  .controller('classCtrl', function ($scope,$http,$routeParams,$location) {
    resetHtml(1);
    /*声音开关*/
    $('.voice').click(function(){
      if($(this).hasClass('voice_jy')){
        $(this).removeClass('voice_jy').addClass('voice_on');
      }
      else{
        $(this).removeClass('voice_on').addClass('voice_jy');
      }
    });
    /*播放视频*/
    $('.xs_video').mouseover(function(){
      $(this).parents('.classroom').find('.video_play').show();
    });
    $('.video_play').mouseout(function(){
      $(this).parents('.classroom').find('.video_play').hide();
    });
    /*删除视频*/
    $('.remove').click(function(){
      $(this).parents('.classroom').remove();
    });
    /*搜索框*/
    $('.xs_search').click(function(){
      $('.xs_search input').animate({left:20},500);
      $('.xs_search span').animate({left:190},500);
    })/*.mouseout(function(){
     $('.xs_search input').animate({left:90},500);
     $('.xs_search span').animate({left:120},500);
     })*/
    // Custom Selects
    if ($('[data-toggle="select"]').length) {
      $('[data-toggle="select"]').select2();
    }

    // Checkboxes and Radio buttons
    $('[data-toggle="checkbox"]').radiocheck();
    $('[data-toggle="radio"]').radiocheck();

  })
  .controller('devicetCtrl', function ($scope,$routeParams,$http,$rootScope) {
    resetHtml(2);
    /*搜索框*/
    $('.xs_search').click(function(){
      $('.xs_search input').animate({left:20},500);
      $('.xs_search span').animate({left:190},500);
    })/*.mouseout(function(){
     $('.xs_search input').animate({left:90},500);
     $('.xs_search span').animate({left:120},500);
     })*/
    // Custom Selects
    if ($('[data-toggle="select"]').length) {
      $('[data-toggle="select"]').select2();
    }
    // Checkboxes and Radio buttons
    $('[data-toggle="checkbox"]').radiocheck();
    $('[data-toggle="radio"]').radiocheck();

  });


