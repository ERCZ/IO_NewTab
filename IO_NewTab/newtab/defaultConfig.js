/** 默认配置，同时可作为chrome.storage查询对象 */
var defaultConfig = {
    isFirstRun: 1,
    inputBgColor: 'transparent',
    borderColor: '#ffffff',
    borderRadius: '25px',
    fontColor: '#ffffff',
    fontSize: '24px',
    bgType: 'bingbg',
    defaultSearchEngine: 'bd',
    userBgChanged: true,
    search: {
        gg: {
            name: 'google',
            url: 'https://www.google.com/search?q={{keyword}}'
        },
        bd: {
            name: 'baidu',
            url: 'https://www.baidu.com/s?wd={{keyword}}'
        },
        sg: {
            name: 'sogou',
            url: 'https://www.sogou.com/web?query={{keyword}}'
        },
        bing: {
            name: 'bing',
            url: 'https://cn.bing.com/search?q={{keyword}}'
        },
        mdn: {
            name: 'mdn',
            url: 'https://developer.mozilla.org/zh-CN/search?q={{keyword}}'
        }
    },
    go: {
        bilibili: 'https://www.bilibili.com'
    }
}