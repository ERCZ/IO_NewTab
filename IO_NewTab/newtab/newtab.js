searchInput.addEventListener('keyup', cmdParse);

/**
 * 解析搜索框命令及参数并分发任务
 * @param {Object} e 事件参数
 */
function cmdParse(e) {
    if (e.keyCode !== 13) return;
    var inputValue = searchInput.value.trim();
    var keyValue = inputValue.split(' ');
    var cmd = keyValue[0];
    var param = keyValue.splice(1).join(' ').trim();
    if (cmd === 'io') {
        io(param);
    } else if (cmd === 'go') {
        go(param);
    } else {
        search(cmd, param);
    }
}

/**
 * 处理io命令
 * @param {string} param 命令参数
 */
function io(param) {
    if (param === 'conf') {
        //打开设置页面
        var aside = document.querySelector('.aside');
        aside.innerHTML = '<iframe src="../options/options.html" frameborder="0"></iframe>';
        aside.style.flexBasis = '600px';
    }
}

/**
 * 处理各类搜索命令，如无匹配命令将命令和参数合并使用默认搜索引擎搜索
 * @param {string} cmd 命令
 * @param {string} param 参数
 */
function search(cmd, param) {
    var regexp = /\{\{.*\}\}/;
    var url = '';
    getValue(['search', 'defaultSearchEngine'], function (result) {
        if (result.search[cmd]) {
            url = result.search[cmd].url.replace(regexp, encodeURIComponent(param));
        } else {
            url = result.search[result.defaultSearchEngine].url.replace(regexp, encodeURIComponent((cmd + ' ' + param).trim()));
        }
        location.href = url;
    });
}

/**
 * 处理go命令，实现网页及达
 * @param {string} param 参数
 */
function go(param) {
    getValue('go', function (result) {
        if (result.go[param]) {
            location.href = result.go[param];
        }
    })
}