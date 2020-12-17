// 每次条用get ajax post的时候首先会调用这个函数
// 这个函数中我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }

    // 全局同意挂载complete 回调函数  限制登录访问权限
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})