'use strict'

function getRandomIntInclusive(min, max) {
    max = Math.floor(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function drawRandomSlotItem(arr) {
    var idx = getRandomIntInclusive(0, arr.length - 1)
    var item = arr[idx]
    arr.splice(idx, 1)
    return item
}