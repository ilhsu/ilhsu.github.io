'use strict';

let fs = require('fs');

// 재귀 호출의 기저 사례(base case)
// 재귀호출에서 '문제'란 항상 수행해야할 작업과 그 작업을 적용할 자료의 조합을 말한다.

// 보드를 덮을 수 있는 4가지 경우의 수, 수학에서의 y 좌표와는 상하를 반전해서 생각해야 한다. 아래쪽 방향이 y 좌표 + 이다.
const coverTypes = [
    [[0, 0], [1, 0], [1, 1]],
    [[0, 1], [0, 0], [1, 0]],
    [[0, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [1, -1]]
];

function setCover(y, x, board, type) {
    let canDo = true;

    for (let yx of type) {
        let newY = y+yx[0];
        let newX = x+yx[1];
        if (!board[newY] || board[newY][newX] !== 0) {
            canDo = false;
            break;
        }
    }

    if (canDo) {
        for (let yx of type) {
            board[y+yx[0]][x+yx[1]] = 1;
        }
    }

    return canDo;
}

function unsetCover(y, x, board, type) {
    for (let yx of type) {
        board[y+yx[0]][x+yx[1]] = 0;
    }
}

function coverCase(lastY, board, whiteCount) {
    // 모든 흰 칸이 덮였을때
    if (whiteCount === 0) return 1;

    let caseCount = 0;
    let firstY = -1, firstX = -1;

    for (let i = lastY; i < board.length; ++i) {
        let row = board[i];

        for (let j = 0; j < row.length; ++j) {
            if (row[j] === 0) {
                firstY = i;
                firstX = j;
                break;
            }
        }

        if (firstY !== -1) {
            break;
        }
    }

    for (let type of coverTypes) {
        if (setCover(firstY, firstX, board, type)) {
            caseCount += coverCase(firstY, board, whiteCount - 3);
            unsetCover(firstY, firstX, board, type);
        }
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
                    board[i][j] = -1;
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
            console.log(coverCase(0, board, whiteCount));
        }
    }
});