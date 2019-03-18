/**
 * Created by shenlisha on 2018/8/10.
 */
function storeInLocalStorage(key) {
    return function(data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}
var utils = {
    filter(obj) {
        return (key) => {
            return obj[key] || key
        }
    },
    ctrlTimeStamp(timestamp) {
        if (typeof timestamp === 'string') {
            timestamp = timestamp.replace('+0800', '').replace(/-/g, '/').replace('T', ' ');
        }
        return timestamp;
    },
    formatTimestamp(timestamp) {
        if (!timestamp) return;
        timestamp = utils.ctrlTimeStamp(timestamp);
        var date = new Date(timestamp),
            strPad = utils.strPad;
        var Y = date.getFullYear(),
            M = strPad(date.getMonth() + 1, 2),
            D = strPad(date.getDate(), 2),
            h = strPad(date.getHours(), 2),
            m = strPad(date.getMinutes(), 2),
            s = strPad(date.getSeconds(), 2);
        return [Y, M, D].join('-') + ' ' + [h, m, s].join(':');
    },
    download(dataString, name) {
        download('\ufeff' + dataString, name + '.csv', 'text/csv;charset=utf8;');
    },
    uniqArray(data) {
        let obj = {};
        data.forEach(item => {
            let key = item;
            if (obj[key] === undefined) {
                obj[key] = 1
            } else {
                obj[key] += 1;
            }
        });
        return obj;
    },
    setPersons: storeInLocalStorage('persons'),
    
    getPersons() {
        return JSON.parse(window.localStorage.persons);
    },
    setPresents: storeInLocalStorage('presents'),
    
    getPresents() {
        return JSON.parse(window.localStorage.presents);
    },
};
module.exports = utils;