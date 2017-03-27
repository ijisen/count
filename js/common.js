
/*================页面加载效果===================
 * +_+ 说明：      页面加载效果
 * j_s 编辑人：    jisen
 * r_r 编辑时间：  2017-01-13
 * -_- 说明：      loading.loadDef(tagId)  eg: loading.loadDef('.main');
 *                 loading.loadOver(tagId) eg: loading.loadOver('.main');
 *                 loadDef 和 loadOver 需成对出现，且tagId得一样
 * ==============================================*/
var loading = {
    /*===================================
     *说明:  当tagId ==body 时为全局刷新  需要将loading加载到当body下， 同时需要隐藏body下的main
     *       当tagId == main 时为局部刷新，需要将loading加载到main下，同时需要隐藏main下的wrap
     *       当tagId != body || tagId != main 时为局部刷新，需要将loading加载到tagId下，不需要隐藏标签
     *  */
    loadDef: function (tagId) {
        var tag_id = tagId ? tagId : 'body';
        var tag_box = $(tag_id);
        var hide_box = $('.main');
        var load_box = tag_box.children('.loading').length;
        if (load_box) return;
        if (tag_id == 'body') {
            hide_box.hide();
            $('.footer_cop').hide();
            tag_box.append('<div class="loading"><p class="anima"></p></div>');
        } else if (tag_id == '.main') {
            hide_box.children('.wrap').hide();
            tag_box.append('<div class="loading"><p class="img"></p></div>');
        } else {
            tag_box.append('<div class="loading"><p class="img"></p></div>');
        }
    },
    /*===================================
     *说明: 当tagId == body 时为全局刷新， 需要将当body下的loading删除，同时需要显示body下的main
     *      当tagId == main 时为局部刷新， 需要将当main下的loading删除，同时需要显示main下的wrap
     *      当tagId != body 时为局部刷新， 需要将当tagId下的loading删除，不需要显示标签
     *       callback用于回调使用
     *  */
    loadOver: function (tagId, callback) {
        var tag_id = tagId ? tagId : 'body';
        var tag_box = $(tag_id);
        var show_box = $('.main');
        var load_box = tag_box.children('.loading');
        if (tag_id == '.main') {
            show_box = $('.wrap');
        }
        show_box.show();
        (callback && typeof callback == 'function') && callback();
        load_box.remove();

    }
};
//分页
//初始化分页
//课堂列表 筛选条件
var PagObj = (function () {
    var paglist = $('.paglist'),
      paglist_ul = '',
      pag_index = '',
      pag_previous = '',
      pag_box = '',
      pag_box_span = '',
      pag_next = '',
      pag_self = '';

    function PagObj(config) {
        this.tagDiv = $(config.tag);
        this.pagListLen = config.pagLen; //每组页码个数
        this.slectedData = '';
        this.getAjax = config.getAjax;
        this.setAjax = config.setAjax;
        this.needType = config.needType;
        this.pageTotal = 1; //总页面数
        this.pagNow = 1;
        pag_self = this;
        paglist = pag_self.tagDiv.children('.paglist');
    }

    PagObj.prototype.initial = function (slectedData, data) {
        var numberTotal = data.numberTotal;
        var temp_html = '';
        var pagListLen = pag_self.pagListLen;
        pag_self.pagNow = 1;
        pag_self.pageTotal = data.pageTotal;
        pag_self.slectedData = slectedData;
        if (paglist.length > 0) {
            paglist.remove();
        }
        pag_self.tagDiv.append('<div class="paglist clearfix"><ul class="pagnation">' +
        (pag_self.pageTotal > pag_self.pagListLen ? '<li class="index disabled"><span>首页</span></li>' : '') +
        '<li class="previous"><span>上一页</span></li>' +
        '<li class="pag-box"></li>' +
        '<li class="next"><span>下一页</span></li>' +
        '</ul></div>');
        paglist = pag_self.tagDiv.children('.paglist');
        paglist_ul = paglist.children('ul');
        pag_index = paglist_ul.children('li.index');
        pag_previous = paglist_ul.children('li.previous');
        pag_box = paglist_ul.children('li.pag-box');
        pag_next = paglist_ul.children('li.next');
        // console.log(this.slectedData);
        console.log('PagObj initial');
        if (pag_self.pageTotal > 0) {
            if (pag_self.pageTotal > 0 && pag_self.pageTotal <= pagListLen) {
                if (pag_self.pageTotal == 1) {
                    if (numberTotal == 0) {
                        paglist_ul.html('').hide();
                        return false
                    }
                    pag_next.addClass('disabled');
                }
                for (var i = 1; i <= pag_self.pageTotal; i++) {
                    temp_html += '<span>' + i + '</span>';
                }
            } else if (pag_self.pageTotal > pagListLen) {
                for (var k = 1; k <= pagListLen; k++) {
                    temp_html += '<span>' + k + '</span>';
                }
                temp_html += '<span class="empty">...</span><span class="pageTotal">' + pag_self.pageTotal + '</span>';
            }
            pag_box.html(temp_html);
            pag_box_span = pag_box.children('span');
            paglist_ul.show();
            pag_previous.addClass('disabled');
            pag_index.addClass('disabled');
            pag_box_span.eq(0).addClass('active');
            pag_self.click();
        } else {
            paglist_ul.html('').hide();
        }
    };
    PagObj.prototype.prevPag = function () {
        var temp_html = '',
          k = 0,
          pagListLen = pag_self.pagListLen,
          tag_index = pag_box.children('span.active').index();
        if (pag_self.pagNow > 1) {
            pag_self.pagNow--;
            if (pag_self.pagNow % pagListLen == 0 && pag_self.pagNow != 1) {
                // console.log('this.pagNow % pagListLen == 0');
                if (pag_self.pagNow > pagListLen) {
                    for (k = pagListLen; k > 0; k--) {
                        temp_html += '<span>' + (pag_self.pagNow - k + 1) + '</span>';
                    }
                } else {
                    for (k = 1; k <= pagListLen; k++) {
                        temp_html += '<span>' + k + '</span>';
                    }
                }
                temp_html += '<span class="empty">...</span><span class="pageTotal">' + pag_self.pageTotal + '</span>';
                pag_box.html(temp_html);
                pag_box_span = pag_box.children('span');
            } else {
                if (tag_index == 0) {
                    // console.log('tag_index');
                    if (pag_self.pagNow > pagListLen) {
                        for (k = pagListLen; k > 0; k--) {
                            temp_html += '<span>' + (pag_self.pagNow - k + 1) + '</span>';
                        }
                    } else {
                        for (i = 1; i <= pagListLen; i++) {
                            temp_html += '<span>' + i + '</span>';
                        }
                    }
                    temp_html += '<span class="empty">...</span><span class="pageTotal">' + pag_self.pageTotal + '</span>';
                    pag_box.html(temp_html);
                    pag_box_span = pag_box.children('span');
                }
            }
            $.each(pag_box_span, function (i) {
                var text = pag_box_span.eq(i).text();
                if (text == pag_self.pagNow) {
                    pag_box_span.removeClass('active').eq(i).addClass('active');
                    return false
                }
            });
            pag_self.refresh(pag_self.pagNow);
        }


        //console.log(this.pagNow);

    };
    PagObj.prototype.nextPag = function () {
        var temp_html = '',
          i = 0,
          pagListLen = pag_self.pagListLen;
        if (pag_self.pagNow < pag_self.pageTotal) {
            pag_self.pagNow++;
            // pag_previous.removeClass('disabled');
        }
        if (pag_self.pagNow % pagListLen == 1 && pag_self.pagNow != 1) {
            if (pag_self.pagNow + pagListLen - 1 < pag_self.pageTotal) {
                for (i = 1; i <= pagListLen; i++) {
                    temp_html += '<span>' + (pag_self.pagNow - 1 + i) + '</span>';
                }
                if (pag_self.pagNow + pagListLen == pag_self.pageTotal) {
                    temp_html += '<span class="pageTotal">' + pag_self.pageTotal + '</span>';
                } else {
                    temp_html += '<span class="empty">...</span><span class="pageTotal">' + pag_self.pageTotal + '</span>';
                }
            } else {
                for (i = 1; i <= pagListLen; i++) {
                    temp_html += '<span>' + ((pag_self.pageTotal - pagListLen) - 0 + i) + '</span>';
                }
            }
            pag_box.html(temp_html);
        }
        pag_box_span = pag_box.children('span');
        $.each(pag_box_span, function (i) {
            var text = pag_box_span.eq(i).text();
            if (text == pag_self.pagNow) {
                pag_box_span.removeClass('active').eq(i).addClass('active');
                return false
            }
        });
        pag_self.refresh(pag_self.pagNow);
        // console.log(this.pagNow);
    };
    PagObj.prototype.refresh = function (page_now) {
        if (page_now == pag_self.pageTotal) {
            pag_next.addClass('disabled');
        } else {
            pag_next.removeClass('disabled');
        }
        if (page_now != 1) {
            pag_previous.removeClass('disabled');
            pag_index.removeClass('disabled');
        } else {
            pag_previous.addClass('disabled');
            pag_index.addClass('disabled');
        }
        pag_self.slectedData.pageNow = page_now;
        pag_self.pagNow = page_now;
        if (pag_self.needType) {
            pag_self.getAjax(type, pag_self.slectedData, pag_self.setAjax);
        } else {
            pag_self.getAjax(pag_self.slectedData, pag_self.setAjax);
        }
    };
    PagObj.prototype.click = function () {
        var pagListLen = pag_self.pagListLen;
        pag_index.on('click', function () {
            var disabled = $(this).hasClass('disabled');
            var temp_html = '';
            if (!disabled) {
                pag_self.pagNow = 1;
                pag_self.refresh(1);
                for (var i = 0; i < pagListLen; i++) {
                    temp_html += '<span>' + (i + 1) + '</span>';
                }
                if (pag_self.pageTotal > pagListLen) {
                    temp_html += '<span class="empty">...</span><span class="pageTotal">' + pag_self.pageTotal + '</span>';
                }
                pag_box.html(temp_html);
                pag_box_span = pag_box.children('span');
                pag_box_span.first().addClass('active');
                console.log('index');
            }
            console.log('disabled');

        });
        pag_previous.on('click', function () {
            var disabled = $(this).hasClass('disabled');
            if (!disabled) {
                pag_self.prevPag();
                console.log('prevPag');
                return;
            }
            console.log('disabled');

        });
        pag_next.on('click', function () {
            var disabled = $(this).hasClass('disabled');
            if (!disabled) {
                pag_self.nextPag();
                console.log('nextPag');
                return;
            }
            console.log('disabled');

        });
        pag_box.on('click', 'span', function () {
            var tagClass = $(this).attr('class'),
              pagnow = $(this).html(),
              temp_html = '';

            if (!tagClass) {
                $(this).siblings('span').removeClass('active').end().addClass('active');
                pag_self.pagNow = pagnow;
                pag_self.refresh(pagnow);
                console.log('!tagClass');
            } else if (tagClass == 'pageTotal') {
                for (var i = pagListLen; i > 0; i--) {
                    temp_html += '<span>' + (pagnow - i + 1) + '</span>';
                }
                pag_box.html(temp_html);
                pag_box_span = pag_box.children('span');
                pag_box_span.last().addClass('active');
                pag_self.pagNow = pagnow;
                pag_self.refresh(pagnow);
                console.log('pageTotal')
            } else if (tagClass == 'empty') {
                console.log('empty')
            } else {
                console.log('active');
            }
        });
    };
    return PagObj
}());



//alert  弹框
var alert_msg = {
    tagDiv: '',
    modalHtml: function () {
        var html = '<div class="modal fade alert-modal">' +
          '<div class="modal-content modal-dialog" >' +
          '<div class="alert_header">' +
          '<a href="javascript:void(0);" data-dismiss="modal" title="关闭">+</a>' +
          '</div>' +
          '<div class="alert_body"></div>' +
          '</div>' +
          '</div>';
        $('body').append(html);
        this.tagDiv = $('.alert_body');
    },
    tagModal: function () {
        $('.alert-modal').modal('show').on('shown.bs.modal', function () {
            var tagModal = $('.confirm-modal');
            if (tagModal.length > 0) {
                $('.modal-backdrop').eq(0).remove();
                tagModal.remove();
            }
        }).on('hidden.bs.modal', function () {
            $(this).remove();
            if ($('.modal-backdrop').length > 0) {
                $('body').addClass('modal-open');
            }
        });
    },
    success: function (text) {
        if ($('.alert-modal').length > 0) {
            return false;
        }
        this.modalHtml();
        this.tagDiv.html('<h3 class="success">' + text + '</h3>');
        this.tagModal();
        console.log('success');
    },
    error: function (text) {
        if ($('.alert-modal').length > 0) {
            return false;
        }
        this.modalHtml();
        this.tagDiv.html('<h3 class="error">' + text + '</h3>');
        this.tagModal();
        throw new Error(text);
    },
    login: function (is_provide_wechat_login) {
        if (WHETHER_LOGIN) {
            return;
        }
        var html = '<div class="modal fade bs-login-modal">' +
          '<div class="modal-content modal-dialog" style="position: absolute;right:490px">' +
          '<div class="modal-header">' +
          '<h4 class="modal-title">登录<a href="javascript:void(0);" id="dengr" data-dismiss="modal">+</a></h4></div> ' +
          '<div class="modal-body"><div class="form-groups mbl"><label class="control-label">用户名 ：</label>' +
          '<div class="control-div"><input class="form-control" placeholder="请输入用户名" type="text" name="username"></div></div>' +
          '<div class="form-groups"><label class="control-label">密码 ：</label>' +
          '<div class="control-div"><input class="form-control" placeholder="请输入密码" type="password" name="password"></div></div>' +
          '</div><div class="modal-footer"><a href="javascript:void(0);" class="btn btn-inverse" id="submits">登录</a>' +
          '<p style="display: block;"><a href="javascript:void(0);" title="微信登录" style="margin-right:10px;';
        if(!is_provide_wechat_login) {
            html += 'display:none';
        }
        html += ';" onclick="loginByWechat();">微信登录</a><a href="#" onclick="newpassword()" title="点击此处找回密码">忘记密码?</a></p></div>' +
        '<div class="login-loading"></div></div></div>';
        tag_modal = $('.bs-login-modal');
        if (tag_modal.length == 0) {
            $('body').append(html);
            tag_modal = $('.bs-login-modal');
            tag_modal.modal('show');
            tag_modal.find('#submits').on('click', function () {
                var username = tag_modal.find('input[name="username"]').val().trim(),
                  password = tag_modal.find('input[name="password"]').val().trim(),
                  loade = tag_modal.find('.login-loading');

                console.log(username);
                if (username == '') {
                    $('input[name="username"]').focus().css({
                        borderColor: '#ff6727',
                        outline: 'none'
                    }).focusout(function () {
                        $(this).attr('style', '')
                    });
                    return false
                }
                if (password == '') {
                    $('input[name="password"]').focus().css({
                        borderColor: '#ff6727',
                        outline: 'none'
                    }).focusout(function () {
                        $(this).attr('style', '')
                    });
                    return false
                }
                loade.show();
                $.ajax({
                    url: LOCATION_URL + "crUser/login.do",
                    type: 'get',
                    data: {
                        username: username,
                        password: password
                    },
                    success: function (data) {
                        if (data.success) {
                            location.reload();
                        } else {
                            loade.hide();
                            alert_msg.error(data.message);
                        }
                    },
                    error: function () {
                        loade.hide();
                        alert_msg.error('服务器异常，请稍后尝试');
                    }
                });
            })
        } else {
            if (tag_modal.css('display') != 'block') {
                tag_modal.modal('show');
            }
        }
        //登录框keydown事件
        $(document).keydown(function (event) {
            var alert_modal = $('.alert-modal');
            if (event.keyCode == 13 && $('.bs-login-modal').length > 0) { //绑定回车
                if (alert_modal.length > 0) {
                    alert_modal.modal('hide');
                } else {
                    $('#submits').click(); //自动/触发登录按钮
                }
            }
        });
    },
    empty: function (tag, text) {
        var tag_elem = $(tag);
        var temp_html = '<div class="xtjy_wrap"><div class="xtjy_error"><img src="' + LOCATION_URL + 'images/null.png"><p>' + text + '</p></div></div>';
        tag_elem.html(temp_html);
        loading.loadOver(tag);
        return tag_elem.find('.xtjy_wrap');
    },
    error_return: function (options) {
        /* ---------------------------
         * 调用说明：
         error_return({
         tips : '未登录',
         btn_title :  '返回首页',
         url :  'index.html'
         })
         ------------------------------ */
        var options = options || {};
        options.tips = options.tips || '请先登录';
        options.btn_title = options.btn_title || '返回首页';
        options.url = options.url || 'index.html';
        options.btn_hidden = options.btn_hidden || false;
        confirmModal({
            content: options.tips,
            cancer_name: options.btn_title,
            cancer: function () {
                location.href = options.url;
            }
        });
        if (options.btn_hidden) {
            $('.confirm-modal').find('.modal-content').css('min-height', 60).end().find('.confirm_footer').remove();
        }
        throw new Error(options.tips);
    }
};

/*---------------------------
 *用例：error_return
 *   confirmModal({
 *        title: '提示',
 *        content: '您确认删除吗？',
 *        ok_name: '确认',
 *        cancer_name : '取消',
 *        ok: function () {
 *           console.log('ok')
 *         },
 *        cancer:function(){
 *           console.log('取消')
 *        }
 });
 * ---------------------------*/


//confirm  弹框
function confirmModal(config) {
    var title = config.title || '提示';
    var content = config.content || 'confirmModal 数据格式错误';
    var ok = config.ok || null;
    var cancer = config.cancer || null;
    var ok_name = config.ok_name || '确认';
    var cancer_name = config.cancer_name || '取消';
    var tag_modal = $('.confirm-modal');
    var html = '<div class="modal fade confirm-modal"> ' +
      '<div class="modal-content modal-dialog">' +
      '<div class="confirm_body"><h3>' + content + '</h3></div>' +
      '<div class="confirm_footer">' +
      '<button class="btn btn-default">' + cancer_name + '</button>' +
      '<button class="btn btn-info mll">' + ok_name + '</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    if (tag_modal.length > 0) {
        tag_modal.remove();
    }
    $('body').append(html);
    tag_modal = $('.confirm-modal');
    //禁止模态框全屏点击关闭
    tag_modal.modal({backdrop: 'static', keyboard: false, show: false});
    tag_modal.find('button').eq(0).one('click', function () {
        removeModal();
        (cancer && typeof cancer == 'function') && cancer();
    });
    if (ok && typeof ok == 'function') {
        tag_modal.find('button').eq(1).one('click', ok);
    } else {
        tag_modal.find('button').eq(1).remove();
    }
    tag_modal.modal('show');//.find('button').eq(1).end().eq(0).bind('click', cancer);
    function removeModal() {
        tag_modal.modal('hide').on('hidden.bs.modal', function () {
            $(this).remove();
        });
    }
}
/**/
//01字符截取
/*function substrTitle(str,len){
 return  str.length > len ?  str.substr(0,len) + '...' : str;
 }*/
function substrTitle(str, len) {
    if (typeof str == "undefined" || str == null) {
        return "";
    }
    var byteLen = len * 2;
    var str_byteLen = 0;
    var temp_str = '';
    if (str.length <= len) {
        temp_str = str;
    } else {
        for (var k = 0; k < str.length; k++) {
            str[k].charCodeAt() > 255 ? str_byteLen += 2 : str_byteLen += 1;
        }
        if (str_byteLen <= byteLen) {
            temp_str = str;
        } else {
            // console.log(byteLen);
            for (var i = 0; i < str.length; i++) {
                if (byteLen <= 0) {
                    break;
                } else {
                    str[i].charCodeAt() > 255 ? byteLen -= 2 : byteLen -= 1;
                    temp_str += str[i];
                }
            }
            temp_str += '...';
        }
    }
    return temp_str;

}


var count_data = {
    "TrainCount" : {
        "pageNow":1,
        "pageTotal":1,
        "numberTotal":3,
        "numberToal4Statistics":0,
        "beanList":[
            {
                "id":4622,
                "name":"asdgasdg--111111111111111111",
                "data":"2017-03-14 10:08至2017-03-14 10:38",
                "status":"准备中",
                "equipNum":"10008",
                "equipName":"北京市教委--测试08",
                "participatorCount":8000,
                "applyCount": '-',
                "actuallyRealizedCount":8000,
                "watchCount" : '-',
                "earnestRate" : '-'
            },
            {
                "id":4514,
                "name":"7堂课，教你数据运营成功法则--用户为什么总是在流失，提升留存的两个方法、三个阶段",
                "data":"2017-01-13 16:29至2017-01-13 17:59",
                "status":"准备中",
                "equipNum":"869314",
                "equipName":"北京市教委--朗新小鱼",
                "participatorCount":9000,
                "applyCount": '-',
                "actuallyRealizedCount":9000,
                "watchCount" : '-',
                "earnestRate" : '-'
            },
            {
                "id":4513,
                "name":"7堂课，教你数据运营成功法则--用数据分析做运营增长，你需要做好这四个方面",
                "data":"2017-01-13 16:29至2017-01-13 17:59",
                "status":"反馈中",
                "equipNum":"869314",
                "equipName":"北京市教委--朗新小鱼",
                "participatorCount":12000,
                "applyCount": 10000,
                "actuallyRealizedCount":10000,
                "watchCount" : 14000,
                "earnestRate" : '98%'
            }
        ]
    },
    "WatchCount" : {
        "pageNow":1,
        "pageTotal":1,
        "numberTotal":3,
        "numberToal4Statistics":0,
        "beanList":[
            {
                "equipName":"北京市教委--测试08",
                "data":"2017-03-14 10:08至2017-03-14 10:38",
                "webpageRecordWatchCount":8000,
                "recordWatchCount":3000,
                "webpageLiveWatchCount":5000,
                "equipNum":"10008",
                "liveWatchCount":1800,
                "terminalRecordWatchCount":1200,
                "terminalLiveWatchCount":3000,
                "name":"asdgasdg--111111111111111111",
                "id":4622,
                "status":"准备中",
                "watchCount":2000
            },
            {
                "equipName":"北京市教委--朗新小鱼",
                "data":"2017-01-13 16:29至2017-01-13 17:59",
                "webpageRecordWatchCount":12000,
                "recordWatchCount":6000,
                "webpageLiveWatchCount":6000,
                "equipNum":"869314",
                "liveWatchCount":4000,
                "terminalRecordWatchCount":2000,
                "terminalLiveWatchCount":3000,
                "name":"7堂课，教你数据运营成功法则--用户为什么总是在流失，提升留存的两个方法、三个阶段",
                "id":4514,
                "status":"准备中",
                "watchCount":3000
            },
            {
                "equipName":"北京市教委--朗新小鱼",
                "data":"2017-01-12 16:18至2017-01-12 17:48",
                "webpageRecordWatchCount":20000,
                "recordWatchCount":12000,
                "webpageLiveWatchCount":8000,
                "liveWatchCount":7000,
                "terminalRecordWatchCount":5000,
                "terminalLiveWatchCount":7000,
                "watchCount":1000,
                "equipNum":"869314",
                "name":"7堂课，教你数据运营成功法则--用数据分析做运营增长，你需要做好这四个方面",
                "id":4513,
                "status":"反馈中"
            }
        ]
    },
    "CallrollCount" : {
        "pageNow":1,
        "pageTotal":1,
        "numberTotal":3,
        "numberToal4Statistics":0,
        "beanList":[
            {
                "id":4622,
                "name":"asdgasdg--111111111111111111",
                "data":"2017-03-14 10:08至2017-03-14 10:38",
                "status":"准备中",
                "equipName":"北京市教委--测试08",
                "equipNum":"10008",
                "callrollWay":"manual",
                "participatorCount": '-',
                "callrollTimes": '-',
                "earnestRate": '-'
            },
            {
                "id":4514,
                "name":"7堂课，教你数据运营成功法则--用户为什么总是在流失，提升留存的两个方法、三个阶段",
                "data":"2017-01-13 16:29至2017-01-13 17:59",
                "status":"准备中",
                "equipName":"北京市教委--朗新小鱼",
                "equipNum":"869314",
                "callrollWay":"manual",
                "participatorCount": '-',
                "callrollTimes": '-',
                "earnestRate": '-'
            },
            {
                "id":4513,
                "name":"7堂课，教你数据运营成功法则--用数据分析做运营增长，你需要做好这四个方面",
                "data":"2017-01-12 16:18至2017-01-12 17:48",
                "equipName":"北京市教委--朗新小鱼",
                "equipNum":"869314",
                "status":"反馈中",
                "callrollWay":"manual",
                "participatorCount": 5000,
                "callrollTimes": 5,
                "earnestRate":"99%"
            }
        ]
    }
};
var map_data = {
    "TrainCount" : {
        "address":"北京市朝阳区炎黄艺术馆",
        "data":"2017-01-12 16:18至2017-01-12 17:48",
        "allowToSignUp":true,
        "name":"7堂课，教你数据运营成功法则--用数据分析做运营增长，你需要做好这四个方面",
        "isPublic":1,
        "id":4513,
        "personInfo":{
            "assignParticipatorCount":4000,
            "absentAssignParticipatorCount":3000,
            "assignAbsenRate":6000,
            "participatorCount":8000,
            "absentApplyRate":7000,
            "applyCount":5000,
            "actualAssignParticipatorCount":2000,
            "absentApplyCount":3000,
            "actualParticipatorCount":4000,
            "applyApproveCount":5000
        },
        "chart":[
            {
                "data":[
                    {
                        "name":"指定实到人数",
                        "value":5000
                    },
                    {
                        "name":"指定缺席人数",
                        "value":1000
                    },
                    {
                        "name":"报名实到人数",
                        "value":8000
                    },
                    {
                        "name":"报名缺席人数",
                        "value":500
                    }
                ],
                "name":"总参训人",
                "type":"pie"
            },
            {
                "data":[
                    {
                        "name":"指定实到人数",
                        "value":5000
                    },
                    {
                        "name":"指定缺席人数",
                        "value":1000
                    },
                    {
                        "name":"报名实到人数",
                        "value":8000
                    },
                    {
                        "name":"报名缺席人数",
                        "value":500
                    }
                ],
                "name":"总参训人",
                "type":"bar"
            },
            {
                "data":[
                    {
                        "name":"指定实到人数",
                        "value":5000
                    },
                    {
                        "name":"指定缺席人数",
                        "value":1000
                    }
                ],
                "name":"指定参训人员情况",
                "type":"pie"
            },
            {
                "data":[
                    {
                        "name":"报名实到人数",
                        "value":8000
                    },
                    {
                        "name":"报名缺席人数",
                        "value":500
                    }
                ],
                "name":"报名人员情况",
                "type":"pie"
            },
            {
                "data":[
                    {
                        "name":"提交反馈人数",
                        "value":5000
                    },
                    {
                        "name":"未提交反馈人数",
                        "value":1000
                    }
                ],
                "name":"反馈人数",
                "type":"pie"
            }
        ],
        "feedbackInfo":{
            "feedbackRate":5000,
            "planFeedbackCount":4900,
            "feedbackedCount": '98%'
        },
        "status":"反馈中"
    },
    "WatchCount" : {
        "address":"北京市朝阳区炎黄艺术馆",
        "data":"2017-01-12 16:18至2017-01-12 17:48",
        "allowToSignUp":true,
        "name":"7堂课，教你数据运营成功法则--用数据分析做运营增长，你需要做好这四个方面",
        "isPublic":1,
        "id":4513,
        "watchInfo":{
            "webpageRecordWatchCount":20000,
            "recordWatchCount":12000,
            "webpageLiveWatchCount":8000,
            "liveWatchCount":7000,
            "terminalRecordWatchCount":5000,
            "terminalLiveWatchCount":7000,
            "watchCount":1000
        },
        "chart":[
            {
                "data":[
                    {
                        "name":"网页直播收看",
                        "value":8000
                    },
                    {
                        "name":"智能终端直播收看",
                        "value":6000
                    },
                    {
                        "name":"网页点播收看",
                        "value":5000
                    },
                    {
                        "name":"智能终端点播收看",
                        "value":3000
                    }
                ],
                "name":"总收看人数",
                "type":"pie"
            },
            {
                "data":[
                    {
                        "name":"网页直播收看",
                        "value":8000
                    },
                    {
                        "name":"智能终端直播收看",
                        "value":6000
                    }
                ],
                "name":"直播收看人数",
                "type":"pie"
            },
            {
                "data":[
                    {
                        "name":"网页点播收看",
                        "value":5000
                    },
                    {
                        "name":"智能终端点播收看",
                        "value":3000
                    }
                ],
                "name":"点播收看人数",
                "type":"pie"
            }
        ],
        "status":"反馈中"
    },
    "CallrollCount" : {
        "id":4513,
        "date":"2017-03-08 13:59至2017-03-08 14:29",
        "address":"北京市朝阳区炎黄艺术馆",
        "name":"7堂课，教你数据运营成功法则--用数据分析做运营增长，你需要做好这四个方面",
        "status":"反馈中",
        "isPublic":1,
        "allowToSignUp":0,
        "callrollInfo":{
            "participatorCount":"5000",
            "callrollNumber":"5",
            "earnestRate":"99%"
        },
        "callrollArr":[
            {
                "callrollTime":"2017-01-12 16:18",
                "signInCount":"4990",
                "unSignInCount":"10",
                "earnestRate":"90%"
            },
            {
                "callrollTime":"2017-01-12 17:18",
                "signInCount":"4998",
                "unSignInCount":"2",
                "earnestRate":"99%"
            },
            {
                "callrollTime":"2017-01-12 18:18",
                "signInCount":"4995",
                "unSignInCount":"5",
                "earnestRate":"95%"
            },
            {
                "callrollTime":"2017-01-12 19:18",
                "signInCount":"4999",
                "unSignInCount":"1",
                "earnestRate":"99%"
            },
            {
                "callrollTime":"2017-01-12 20:18",
                "signInCount":"5000",
                "unSignInCount":"0",
                "earnestRate":"100%"
            }
        ],
        "chart":[
            {
                "name":"点名总情况",
                "type":"pie",
                "data":[
                    {
                        "name":"未签到",
                        "value": "100"
                    },
                    {
                        "name":"签到",
                        "value":"4990"
                    }
                ]
            },
            {
                "name":"历次点名情况",
                "type":"stack",
                "data":[
                    {
                        "name":"签到",
                        "data":[2000, 2200, 2100, 2150, 2000]
                    },
                    {
                        "name":"未签到",
                        "data":[100, 200, 500, 100, 150]
                    }
                ]
            }
        ]
    }
};