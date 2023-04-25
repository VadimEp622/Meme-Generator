'use strict'

function onInit() {
    renderMemes()
}

function renderMemes() {
    const memes = getMemes()
    console.log('memes', memes)

    const strHtml = memes.map(meme =>
        `
        <article class="meme-card">
            <img src="imgs/meme-imgs (various aspect ratios)/${meme}">
        </article>
        `
    ).join('')
    console.log('strHtml', strHtml)

    document.querySelector('.meme-gallery').innerHTML = strHtml
}