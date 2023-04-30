'use strict'

// shift+alt+i
const MEMES = [
    { fileName: '003.jpg', tags: ['funny', 'akward'] },
    { fileName: '004.jpg', tags: ['cute', 'dog'] },
    { fileName: '005.jpg', tags: ['cute', 'dog', 'baby'] },
    { fileName: '006.jpg', tags: ['cute', 'cat'] },
    { fileName: '12.jpg', tags: ['akward'] },
    { fileName: '19.jpg', tags: ['angry'] },
    { fileName: '2.jpg', tags: ['happy', 'dancing'] },
    { fileName: '5.jpg', tags: ['baby', 'happy'] },
    { fileName: '8.jpg', tags: ['akward', 'happy'] },
    { fileName: '9.jpg', tags: ['baby', 'funny', 'happy'] },
    { fileName: 'Ancient-Aliens.jpg', tags: ['akward', 'funny'] },
    { fileName: 'drevil.jpg', tags: ['akward', 'funny'] },
    { fileName: 'img11.jpg', tags: [''] },
    { fileName: 'img12.jpg', tags: [''] },
    { fileName: 'img2.jpg', tags: [''] },
    { fileName: 'img4.jpg', tags: [''] },
    { fileName: 'img5.jpg', tags: [''] },
    { fileName: 'img6.jpg', tags: [''] },
    { fileName: 'leo.jpg', tags: [''] },
    { fileName: 'meme1.jpg', tags: [''] },
    { fileName: 'One-Does-Not-Simply.jpg', tags: [''] },
    { fileName: 'Oprah-You-Get-A.jpg', tags: [''] },
    { fileName: 'patrick.jpg', tags: [''] },
    { fileName: 'putin.jpg', tags: [''] },
    { fileName: 'X-Everywhere.jpg', tags: [''] },
]


const gMemes = []

function getMemes() {
    gMemes.push(..._createMemes())
    return gMemes
}


function getMemeById(id) {
    return gMemes.find(meme => meme.id === id)
}




//----------PRIVATE FUNCTIONS----------//

function _createMemes() {
    let memes = MEMES.map(meme => _createMeme(meme.fileName, meme.tags))
    return memes
}

function _createMeme(fileName, tags) {
    return {
        id: makeId(),
        tags,
        fileName,
    }
}
