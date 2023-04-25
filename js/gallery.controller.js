'use strict'
// TODO EX: add tags to memes
function onInit() {
    renderMemes()
}

function renderMemes() {
    const memes = getMemes()
    console.log('memes', memes)

    const strHtml = memes.map(meme =>
        `
        <article id="${meme.id}" class="meme-card" onmousedown="onMemeClick(this.id)">
            <section class="image-container">
                <img src="imgs/meme-imgs/${meme.fileName}">
                <section class="modal">${meme.tags.join(', ')}</section>
            </section>
        </article>
        `
    ).join('')
    console.log('strHtml', strHtml)

    document.querySelector('.meme-gallery').innerHTML = strHtml
}

//TODO: make onMemeClick recieve id, 
// change main into canvas Edit, 
// and add image to canvas using id
function onMemeClick(id){
    console.log('id', id)
}