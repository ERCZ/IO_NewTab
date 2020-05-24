var searchInput = document.getElementById('searchboxexample');
var borderColor = document.getElementById('bordercolor');
var borderRadius = document.getElementById('borderradius');
var fontColor = document.getElementById('fontcolor');
var fontSize = document.getElementById('fontsize');
var inputBgColor = document.getElementById('inputbgcolor');
var isTransparent = document.getElementById('istransparent');
var bingBg = document.getElementById('bingbg');
var userBg = document.getElementById('userbg');
var bgImageWrap = document.getElementById('bgimagewrap');
var bgImage = document.getElementById('bgimage');
var defaultEngine = document.getElementById('defaultengine');
var searchList = document.getElementById('searchlist');
var goList = document.getElementById('golist');
var seCmd = document.getElementById('se-cmd');
var seName = document.getElementById('se-name');
var seUrl = document.getElementById('se-url');
var addSE = document.getElementById('add-se');

/** 更新界面 */
updateStyle();
updateSearchList();
updateGoList();

/** 添加更改事件 */
borderColor.addEventListener('change', function (e) {
    searchInput.style.borderColor = borderColor.value;
    setValue({ borderColor: borderColor.value });
});
borderRadius.addEventListener('change', function (e) {
    searchInput.style.borderRadius = borderRadius.value + 'px';
    setValue({ borderRadius: borderRadius.value + 'px' });
});
inputBgColor.addEventListener('change', function (e) {
    if (!isTransparent.checked) {
        searchInput.style.backgroundColor = inputBgColor.value;
        setValue({ inputBgColor: inputBgColor.value });
    }
});
isTransparent.addEventListener('change', function (e) {
    if (isTransparent.checked) {
        searchInput.style.backgroundColor = 'transparent';
        setValue({ inputBgColor: 'transparent' });
    } else {
        searchInput.style.backgroundColor = inputBgColor.value;
        setValue({ inputBgColor: inputBgColor.value });
    }
});
fontColor.addEventListener('change', function (e) {
    searchInput.style.color = fontColor.value;
    setValue({ fontColor: fontColor.value });
});
fontSize.addEventListener('change', function (e) {
    searchInput.style.fontSize = fontSize.value + 'px';
    setValue({ fontSize: fontSize.value + 'px' });
});
bingBg.addEventListener('change', function (e) {
    if (bingBg.checked) {
        bgImageWrap.style.display = 'none';
        setValue({ bgType: 'bingbg' });
    }
});
userBg.addEventListener('change', function (e) {
    if (userBg.checked) {
        bgImageWrap.style.display = 'block';
        setValue({ bgType: 'userbg' });
        localStorage.removeItem('bgType');
        localStorage.removeItem('updatedTime');
        localStorage.removeItem('base64OfImg');
        localStorage.setItem('bgType', 'userbg');
    }
});
bgImage.addEventListener('change', function (e) {
    var img = bgImage.files[0];
    if (img.size <= 1024 * 1024 * 2) {
        var fr = new FileReader();
        fr.readAsDataURL(img);
        fr.onload = function () {
            localStorage.setItem('base64OfImg', fr.result);
            //通知页面更换背景
            getValue('userBgChanged', function (result) {
                setValue({ userBgChanged: !result.userBgChanged });
            });
        }
    }
});
defaultEngine.addEventListener('change', function (e) {
    setValue({ defaultSearchEngine: defaultEngine.value });
});

/** 添加搜索引擎 */
addSE.addEventListener('click', function (e) {
    var cmd = seCmd.value;
    var name = seName.value;
    var url = seUrl.value;
    if (cmd.indexOf(' ') === -1) {
        getValue('search', function (result) {
            result.search[cmd] = {};
            result.search[cmd].name = name;
            result.search[cmd].url = url;
            setValue({ search: result.search }, function () {
                updateSearchList();
                seCmd.value = '';
                seName.value = '';
                seUrl.value = '';
            })
        })
    }
});

/** 响应删除搜索引擎事件 */
searchList.addEventListener('click', function (e) {
    if (e.target.nodeName === 'BUTTON') {
        var curElement = e.target;
        var key = curElement.getAttribute('data-key');
        getValue('search', function (result) {
            delete result.search[key];
            setValue({ search: result.search }, function () {
                updateSearchList();
            })
        })
    }
});
/** 响应删除go命令中存储的网址的事件 */
goList.addEventListener('click', function (e) {
    if (e.target.nodeName === 'BUTTON') {
        var curElement = e.target;
        var key = curElement.getAttribute('data-key');
        getValue('go', function (result) {
            delete result.go[key];
            setValue({ go: result.go }, function () {
                updateGoList();
            })
        })
    }
});


/**
 * 更新设置页面搜索框设置与背景设置的样式
 */
function updateStyle() {
    var array = ['inputBgColor', 'borderColor', 'borderRadius', 'fontColor', 'fontSize', 'bgType'];
    getValue(array, function (result) {
        searchInput.style.borderColor = result.borderColor;
        searchInput.style.fontSize = result.fontSize;
        searchInput.style.color = result.fontColor;
        searchInput.style.backgroundColor = result.inputBgColor;
        searchInput.style.borderRadius = result.borderRadius;

        borderColor.value = result.borderColor;
        borderRadius.value = parseInt(result.borderRadius);
        fontColor.value = result.fontColor;
        fontSize.value = parseInt(result.fontSize);

        if (result.inputBgColor === 'transparent') {
            isTransparent.checked = true;
            inputBgColor.value = '#ffffff';
        } else {
            isTransparent.checked = false;
            inputBgColor.value = result.inputBgColor;
        }

        if (result.bgType === 'bingbg') {
            bingBg.checked = true;
            bgImageWrap.style.display = 'none';
        } else {
            userBg.checked = true;
            bgImageWrap.style.display = 'block';
        }
    });
}

/**
 * 更新默认搜索引擎与搜索引擎列表
 */
function updateSearchList() {
    getValue(['search', 'defaultSearchEngine'], function (result) {
        var temp = '';
        var temp2 = '';
        var keys = Object.keys(result.search);
        var tbody = searchList.getElementsByTagName('tbody')[0];
        for (var i = 0; i < keys.length; i++) {
            temp += `<option value="${keys[i]}">${result.search[keys[i]].name}</option>`;
            temp2 += `<tr><td>${keys[i]}</td><td>${result.search[keys[i]].name}</td><td>${result.search[keys[i]].url}</td><td><button data-key="${keys[i]}">删除</button></td></tr>`;
        }
        defaultEngine.innerHTML = temp;
        defaultEngine.value = result.defaultSearchEngine;
        tbody.innerHTML = temp2;
    });
}

/**
 * 更新go命令列表
 */
function updateGoList() {
    getValue('go', function (result) {
        var temp = '';
        var keys = Object.keys(result.go);
        var tbody = goList.getElementsByTagName('tbody')[0];
        for (var i = 0; i < keys.length; i++) {
            temp += `<tr><td>${keys[i]}</td><td>${result.go[keys[i]]}</td><td><button data-key="${keys[i]}">删除</button></td></tr>`;
        }
        tbody.innerHTML = temp;
    });
}