var tip = document.getElementById('tip');
var siteName = document.getElementById('sitename');
var siteUrl = document.getElementById('siteurl');
var button = document.getElementsByTagName('button')[0];

/** 初始化网址输入框的值为当前活动窗口url */
tabsQuery({ active: true }, function (result) {
    siteUrl.value = result[0].url;
});

/** 添加按钮点击事件，存储该网址到go命令 */
button.addEventListener('click', function (e) {
    getValue('go', function (result) {
        var name = siteName.value.trim();
        var url = siteUrl.value;
        if (result.go[name]) {
            showTip('该名称已存在', 'error');
        } else {
            if (name.indexOf(' ') !== -1) {
                showTip('名称中不能含有空格，可使用-或_代替', 'error');
            } else {
                var newValue = result.go;
                newValue[name] = url;
                setValue({ go: newValue }, function () {
                    showTip('添加成功', 'success');
                });
            }
        }
    });
});

/** 输入名称回车后触发按钮点击事件 */
siteName.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        button.click();
    }
});

/**
 * 展示提示信息
 * @param {string} message 要显示的提示
 * @param {string} type 显示类型
 */
function showTip(message, type) {
    tip.style.display = 'block';
    if (type === 'error') {
        tip.style.backgroundColor = '#f56c6c';
    } else {
        tip.style.backgroundColor = '#67c23a';
    }
    tip.innerHTML = message;
}