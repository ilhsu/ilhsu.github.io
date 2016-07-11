'use strict';

let fs = require('fs');

// 재귀 호출의 기저 사례(base case)
// 재귀호출에서 '문제'란 항상 수행해야할 작업과 그 작업을 적용할 자료의 조합을 말한다.

// 보드를 덮을 수 있는 4가지 경우의 수
const coverTypes = [
    [[0, 0], [1, 0], [1, 1]],
    [[0, 1], [0, 0], [1, 0]],
    [[0, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [1, -1]]
];

// 이미 덮이거나 검은 칸은 1로 표시한다고 정의하면 delta 값 변경만으로 set/unset 을 할 수 있다. 참고할만한 테크닉.
function setCover(y, x, board, type, delta) {
    let canDo = true;

    for (let yx of type) {
        let newY = y+yx[0];
        let newX = x+yx[1];

        if (newY < 0 || newY >= board.length || newX < 0 || newX >= board[0].length) {
            canDo = false;
        } else if ((board[newY][newX] += delta) > 1) {
            canDo = false
        }
    }

    return canDo;
}

function coverCase(board) {
    let firstY = -1, firstX = -1;

    // 남아있는 첫번째 흰 칸의 좌표를 찾는다.
    for (let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[i].length; ++j) {
            if (board[i][j] === 0) {
                firstY = i;
                firstX = j;
                break;
            }
        }

        if (firstY !== -1) break;
    }

    // 모든 흰 칸이 덮였을때
    if (firstY === -1) return 1;

    let caseCount = 0;

    for (let type of coverTypes) {
        if (setCover(firstY, firstX, board, type, 1))
            caseCount += coverCase(board);
        setCover(firstY, firstX, board, type, -1);
    }

    return caseCount;
}

// 파일을 읽어와서 각 TestCase 별로 coverCase 호출한다.
fs.readFile('boardcover.txt', 'utf8', function(err, data) {
    let lines = data.split(/\r?\n/);
    let testCount = parseInt(lines.shift());

    for (let i = 0; i < testCount; ++i) {
        let firstArr = lines.shift().split(' ');
        let rows = parseInt(firstArr[0]);
        let cols = parseInt(firstArr[1]);
        let board = [];
        let whiteCount = 0;

        for (let i = 0; i < rows; ++i) {
            board[i] = [];
            let line = lines.shift();

            for (let j = 0; j < cols; ++j) {
                if (line.charAt(j) === '#') {
                    board[i][j] = 1;
                } else {
                    board[i][j] = 0;
                    ++whiteCount;
                }
            }
        }

        // 제한사례: 흰 칸의 갯수가 3의 배수가 아니면 바로 끝냄
        if (whiteCount % 3 > 0) {
            console.log(0);
        } else {
            console.log(coverCase(board));
        }
    }
});
