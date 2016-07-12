'use strict';

// 10개 스위치와 연결된 시계 정보
let switchs = [
    [0,1,2],
    [3,7,9,11],
    [4,10,14,15],
    [0,4,5,6,7],
    [6,7,8,10,12],
    [0,2,14,15],
    [3,14,15],
    [4,5,7,14,15],
    [1,2,3,4,5],
    [3,4,5,9,13]
];

function set(clock, indexes, delta) {
    for (let i of indexes) {
        clock[i] += delta;

        if (clock[i] > 12) {
            clock[i] -= 12;
        } else if (clock[i] === 0) {
            clock[i] = 12;
        }
    }
}

function tryClock(clock, tryCount) {
    if (tryCount > 10) return tryCount;

    let done = true;
    for (let time of clock) {
        if (time !== 12) {
            done = false;
            break;
        }
    }

    // 기저 사례
    if (done) {
        return tryCount;
    }

    let ret = 9999999999999;

    for (let indexes of switchs) {
        set(clock, indexes, 3);
        let count = tryClock(clock, tryCount + 1);
        ret = Math.min(ret, count);
        set(clock, indexes, -3);
    }

    return ret;
}

let clocks = [12,6,6,6,6,6,12,12,12,12,12,12,12,12,12,12]; // 길이 16의 시계 시간 정보

console.log(tryClock(clocks, 0))
