'use strict'

const MEMES = [
    '003.jpg',
    '004.jpg',
    '005.jpg',
    '006.jpg',
    '12.jpg',
    '19.jpg',
    '2.jpg',
    '5.jpg',
    '8.jpg',
    '9.jpg',
    'Ancient-Aliens.jpg',
    'drevil.jpg',
    'img11.jpg',
    'img12.jpg',
    'img2.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'leo.jpg',
    'meme1.jpg',
    'One-Does-Not-Simply.jpg',
    'Oprah-You-Get-A.jpg',
    'patrick.jpg',
    'putin.jpg',
    'X-Everywhere.jpg'
]


const gMemes = []

function getMemes() {
    gMemes.push(..._createMemes())
    // console.log('gMemes', gMemes)

    return gMemes
}






//----------PRIVATE FUNCTIONS----------//

function _createMemes() {
    let memes = MEMES.map(meme => meme)
    // console.log('memes', memes)
    
    return memes
}

function _createMeme(fileName) {
    return {
        fileName
    }
}
