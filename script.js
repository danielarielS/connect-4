/////// alerts the names ////////
var player1;
var player2;
$(document).ready(function() {
    player1 = prompt("youre the first, so you will probably win")
        .toLowerCase()
        .replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    player2 = prompt("youre the last, dont feel bad for losing")
        .toLowerCase()
        .replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    $("#left").prepend(player1);
    $("#right").prepend(player2);
});
/////// keeps count ////////
var curPlayer = "player1";
function playerCur() {
    if (curPlayer == "player1") {
        curPlayer = "player2";
    } else {
        curPlayer = "player1";
    }
}
////// displays the count on the side ////////
var leftCount = 21;
var rightCount = 21;
function movesLeft() {
    if (curPlayer == "player1") {
        leftCount--;
        $(".leftCount")
            .empty()
            .append(leftCount);
    } else if (curPlayer == "player2") {
        rightCount--;
        $(".rightCount")
            .empty()
            .append(rightCount);
    }
}
//////// check victory easy way ///////
function checkVictory(arg) {
    var str = "";
    for (var i = 0; i < arg.length; i++) {
        if (arg.eq(i).hasClass(curPlayer)) {
            str += "yes";
        } else {
            str += "no";
        }
    }
    if (str.includes("yesyesyesyes")) {
        // playerCur();
        if (curPlayer == "player1") {
            alert(player1 + " is the winner😀😀😀");
        } else {
            alert(player2 + " is the winner😀😀😀");
        }

        location.reload();
    }
}
///////check victory hard way ////////////
function checkWinDia() {
    var columns = $(".column");

    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 6; row++) {
            var target = columns
                .eq(col)
                .children()
                .eq(row);
            if (
                (target.hasClass(curPlayer) &&
                    target
                        .parent()
                        .next()
                        .find(".row" + (row - 1))
                        .hasClass(curPlayer) &&
                    target
                        .parent()
                        .next()
                        .next()
                        .find(".row" + (row - 2))
                        .hasClass(curPlayer) &&
                    target
                        .parent()
                        .next()
                        .next()
                        .next()
                        .find(".row" + (row - 3))
                        .hasClass(curPlayer)) ||
                (target.hasClass(curPlayer) &&
                    target
                        .parent()
                        .next()
                        .find(".row" + (row + 1))
                        .hasClass(curPlayer) &&
                    target
                        .parent()
                        .next()
                        .next()
                        .find(".row" + (row + 2))
                        .hasClass(curPlayer) &&
                    target
                        .parent()
                        .next()
                        .next()
                        .next()
                        .find(".row" + (row + 3))
                        .hasClass(curPlayer))
            ) {
                return true;
            }
        }
    }
}
///////// mouse click //////////////
$(".column").click(function(e) {
    var slotsInColumn = $(e.currentTarget).find(".slot");
    for (var i = 5; i < slotsInColumn.length; i--) {
        if (
            !slotsInColumn.eq(i).hasClass("player1") &&
            !slotsInColumn.eq(i).hasClass("player2")
        ) {
            slotsInColumn.eq(i).addClass(curPlayer);

            break;
        }
    }
    var col = $(e.currentTarget).index();
    var row = i;
    if (checkVictory(slotsInColumn)) {
        return;
    } else if (checkWinDia()) {
        if (curPlayer == "player1") {
            alert(player1 + " is the winner😀😀😀");
        } else {
            alert(player2 + " is the winner😀😀😀");
        }
    } else {
        var slotsInRow = $(".row" + i);
        if (checkVictory(slotsInRow)) {
            return;
        }
    }
    movesLeft();
    playerCur();
    coin.attr("id", curPlayer);
});

/////// button to restart game /////////
$("button").click(function() {
    location.reload();
});

//////// mousemove /////////
var grid = $("#grid");
var coin = $(".coin");

coin.attr("id", curPlayer);
$("#grid").on("mousemove", function(e) {
    console.log(coin.offset().left);
    if (
        e.clientX < grid.offset().left + coin.width() / 2 ||
        e.clientX >= grid.offset().left + grid.width() - coin.width() / 2
    ) {
        console.log("stop move");
    } else {
        coin.css({
            transform:
                "translateX(" + (e.clientX - 37 - grid.offset().left) + "px)"
        });
    }
});

// .animate(
//     {
//         top: 700
//     },
//     "slow",
//     function() {
//         $(this).removeAttr("style");
//     }
// );

// function checkD(e) {
//     var slotsInColumn = $(e.currentTarget).find(".slot");
//     for (var i = 5; i < slotsInColumn.length; i--) {
//         if (slotsInColumn.eq(i).hasClass(curPlayer)) {
//             if (
//                 $(e.currentTarget)
//                     .next()
//                     .find(".row" + (i + 1))
//                     .hasClass(curPlayer) &&
//                 $(e.currentTarget)
//                     .next()
//                     .next()
//                     .find(".row" + (i + 2))
//                     .hasClass(curPlayer) &&
//                 $(e.currentTarget)
//                     .next()
//                     .next()
//                     .next()
//                     .find(".row" + (i + 3))
//                     .hasClass(curPlayer)
//             ) {
//                 alert("DDDDDDD");
//             }
//         }
//         break;
//     }
// }
// function checkWinRow() {
//     var str = "";
//     for (var i = 0; i < $(".column").length; i++) {
//         if (
//             $(".row" + i)
//                 .eq(i)
//                 .hasClass(curPlayer)
//         ) {
//             str += "yes";
//         } else {
//             str += "no";
//         }
//     }
//     if (str.includes("yesyesyesyes")) {
//         playerCur();
//         alert(curPlayer + " is the winner😀😀😀");
//     }
// }
// var grid = [
//     [0, 6, 12, 18, 24, 30, 36],
//     [1, 7, 13, 19, 25, 31, 37],
//     [2, 8, 14, 20, 26, 32, 38],
//     [3, 9, 15, 21, 27, 33, 39],
//     [4, 10, 16, 22, 28, 34, 40],
//     [5, 11, 17, 23, 29, 35, 41]
// ];
// for (var i = 0; i < grid.length; i++) {
//     var rows = grid[i];
//     for (var j = 0; j < rows.length; j++) {
//         if (
//             grid[i][j].hasClass("player1") &&
//             grid[i + 1][j + 1].hasClass("player1") &&
//             grid[i + 2][j + 2].hasClass("player1") &&
//             grid[i + 3][j + 3].hasClass("player1")
//         ) {
//             console.log("player1 wins");
//         } else if (
//             grid[i][j].hasClass("player2") &&
//             grid[i + 1][j + 1].hasClass("player2") &&
//             grid[i + 2][j + 2].hasClass("player2") &&
//             grid[i + 3][j + 3].hasClass("player2")
//         ) {
//             console.log("player2 wins");
//         }
//     }
// }

// (function() {
//   var curPlayer = 'player1';
//  // checking whos turn is it
//   function playerCur() {
//     if (curPlayer == 'player1'){
//       curPlayer = 'player2'
//     }else {
//       curPlayer = 'player1'
//     }
//
//   }
// })
// $('.column').on('click', function(e) {
//   var slotsInColumn = $(e.currentTarget).find('.slot')
// })
//
// for (var i = 5; i >= slotsInColumn.length; i--) {
//   if (!slotsInColumn.eq(i).hasClass('player1') && !slotsInColumn.eq(i).hasClass('player2')) {
//     slotsInColumn.eq(i).addClass(curPlayer)
//     break;
//   }
// }
//
// function checkVictory(slots) {
//     var str = "";
//     for (var i = 0; i < slots.length; i++) {
//         if (slots.eq(i).hasClass(curPlayer)) {
//             str += "yes";
//         } else {
//             str += "no";
//         }
//     }
//     return str.includes("yesyesyesyes");
// }
//
// if (checkVictory(slotsInColumn)) {
//   showVictoryMessage(curPlayer)
// } else {
//   var slotsInRow = $('.row' + i)
// }
