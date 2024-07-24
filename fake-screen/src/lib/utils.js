export function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

export function genID() {
    let id = 0;
    return () => id++;
};

export const isStr = str => testStr => str === testStr;

export function twoDigits(n) {
    return (n < 10 && n >= 0 ? '0' : '') + n;
}

export function getDayStr(d) {
    return 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',')[
        d
    ];
}

export function getMonthStr(m) {
    return 'January,February,March,April,May,June,July,August,September,October,November,December'.split(
        ',',
    )[m];
}

export function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
