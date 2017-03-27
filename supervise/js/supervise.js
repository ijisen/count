$(function(){
        loginIn();
        console.log('i am co111mmin');

});

//登录前的状态
function logOut(){

}
//登录后的状态
function loginIn(){
   // baseModel.init(removeFooter);
    $('.supervise').show(function(){
        // SHOWDATA = jsonArr.total;
        selectData(['china']);
        chartPovience('china');
        $('.data-banner').show();
    });
    function removeFooter(){
        $('.footer_cop').remove();
    }

}
function resetHtml(tag){
    var tab_tag = $('.data-banner').find('a');
    tab_tag.removeClass('active').eq(tag).addClass('active');
    $('.supervise-close').bind('click',function () {
        $('#ng-box').html('');
        tab_tag.removeClass('active')
    });
}



