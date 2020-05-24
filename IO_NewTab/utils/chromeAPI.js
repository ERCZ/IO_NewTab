/**
 * 向chrome.storage.sync中设置值
 * @param {Object} param 键值对象
 * @param {function} cb 回调函数
 */
function setValue(param, cb) {
    chrome.storage.sync.set(param, cb);
}

/**
 * 读取chrome.storage.sync中的值
 * @param {string | string[] | Object} param 查询参数
 * @param {function} cb 回调函数，传入一个查询结果对象
 */
function getValue(param, cb) {
    chrome.storage.sync.get(param, cb);
}

/**
 * 监听chrome.storage,当其中的值发生改变时调用回调函数
 * @param {function} cb 回调函数，传入一个改变值的对象以及更改的存储区域名称
 */
function onChangedListener(cb) {
    chrome.storage.onChanged.addListener(cb);
}

/**
 * 查找指定条件的标签页
 * @param {Object} param 查询条件对象
 * @param {function} cb 回调函数，传入一个查询结果数组
 */
function tabsQuery(param, cb) {
    chrome.tabs.query(param, cb);
}