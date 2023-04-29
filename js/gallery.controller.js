'use strict'
// TODO EX: add tags to memes

const PAGE_CLASSES = ['page-main-gallery', 'page-meme-editor', 'page-saved-memes', 'page-about']


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
    // console.log('strHtml', strHtml)

    document.querySelector('.meme-gallery').innerHTML = strHtml
}

function onMemeClick(imageId) {
    console.log('imageId', imageId)
    changePageTo('page-meme-editor')

    onInitCanvas(imageId)

}

function onPageChange(pageName) {
    console.log('pageName', pageName)
    resetMemeEditor()
    changePageTo(pageName)
}

function changePageTo(toPage) {
    PAGE_CLASSES.forEach(pageClass => {
        document.querySelector(`.${pageClass}`).hidden = (pageClass === toPage) ? false : true
    })
}

function onToggleMenu() {
    const elNav = document.querySelector('.header-container .navigate')
    if (elNav.style.display === 'flex') elNav.style.display = 'none'
    else elNav.style.display = 'flex'
}