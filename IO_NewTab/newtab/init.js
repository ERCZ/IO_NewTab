var searchInput = document.getElementById('searchinput');

/** 页面加载时初始化页面上可配置的部分 */
getValue(defaultConfig, function (result) {
    // console.log(result);
    //如果是初次运行，将部分用户配置用默认配置初始化
    if (result.isFirstRun === 1) {
        defaultConfig.isFirstRun = 0;
        setValue(defaultConfig, function () {
            console.log('首次运行初始化完成');
        });
    }
    //使用用户配置或默认值设置样式
    //搜索框样式配置
    searchInput.style.borderColor = result.borderColor;
    searchInput.style.fontSize = result.fontSize;
    searchInput.style.color = result.fontColor;
    searchInput.style.backgroundColor = result.inputBgColor;
    searchInput.style.borderRadius = result.borderRadius;
    //背景图片样式配置
    if (result.bgType === 'bingbg') {
        if (!isSameDay(Date.now(), parseInt(localStorage.getItem('updatedTime'))) || !localStorage.getItem('base64OfImg')) {
            getBingBg(function () {
                document.body.style.backgroundImage = `url('${localStorage.getItem('base64OfImg')}')`;
            });
        } else {
            document.body.style.backgroundImage = `url('${localStorage.getItem('base64OfImg')}')`;
        }
    } else {
        if (localStorage.getItem('base64OfImg')) {
            document.body.style.backgroundImage = `url('${localStorage.getItem('base64OfImg')}')`;
        } else {
            document.body.style.backgroundImage = 'url("../assets/defaultbg.jpg")';
        }
    }
});

/** 监听用户配置的改变并及时更新样式 */
onChangedListener(function (changes) {
    if (changes.borderColor) {
        searchInput.style.borderColor = changes.borderColor.newValue;
    }
    if (changes.borderRadius) {
        searchInput.style.borderRadius = changes.borderRadius.newValue;
    }
    if (changes.fontColor) {
        searchInput.style.color = changes.fontColor.newValue;
    }
    if (changes.fontSize) {
        searchInput.style.fontSize = changes.fontSize.newValue;
    }
    if (changes.inputBgColor) {
        searchInput.style.backgroundColor = changes.inputBgColor.newValue;
    }
    if (changes.bgType) {
        if (changes.bgType.newValue === 'bingbg') {
            getBingBg(function () {
                document.body.style.backgroundImage = `url('${localStorage.getItem('base64OfImg')}')`;
            });
        } else {
            document.body.style.backgroundImage = 'url("../assets/defaultbg.jpg")';
        }
    }
    if (changes.userBgChanged) {
        document.body.style.backgroundImage = `url('${localStorage.getItem('base64OfImg')}')`;
    }
});

/** 点击页面主体部分时使搜索框聚焦并隐藏设置界面 */
document.querySelector('.main').addEventListener('click', function () {
    var aside = document.querySelector('.aside');
    aside.style.flexBasis = '0';
    searchInput.focus();
});