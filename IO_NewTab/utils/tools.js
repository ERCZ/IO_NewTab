/**
 * 图片对象转换为base64
 * @param {Object} imgURL 图片对象
 */
function img2Base64(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return {
        width: img.width,
        height: img.height,
        base64: canvas.toDataURL('image/jpeg')
    }
}

/**
 * 判断两个时间戳是否在同一天
 * @param {number} timeStamp1 时间戳1
 * @param {number} timeStamp2 时间戳2
 */
function isSameDay(timeStamp1, timeStamp2) {
    var day1 = Math.floor(timeStamp1 / (1000 * 60 * 60 * 24));
    var day2 = Math.floor(timeStamp2 / (1000 * 60 * 60 * 24));
    return day1 === day2;
}

/**
 * 获取bing每日壁纸并存入localstorage
 * @param {Function} cb localstorage更新后的操作
 */
function getBingBg(cb) {
    var img = new Image();
    img.src = 'https://open.saintic.com/api/bingPic/?picSize=2';
    img.crossOrigin = '*';
    img.onload = function () {
        localStorage.removeItem('bgType');
        localStorage.removeItem('updatedTime');
        localStorage.removeItem('base64OfImg');
        localStorage.setItem('bgType', 'bingbg');
        localStorage.setItem('updatedTime', Date.now().toString());
        localStorage.setItem('base64OfImg', img2Base64(img).base64);
        if (cb) {
            cb();
        }
    }
}