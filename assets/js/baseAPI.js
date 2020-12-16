// 每次条用get ajax post的时候首先会调用这个函数
// 这个函数中我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})