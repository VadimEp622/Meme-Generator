'use strict'
// TODO EX: add tags to memes

const PAGE_CLASSES = ['page-main-gallery', 'page-meme-editor', 'page-saved-memes', 'page-about']


function onInit() {
    renderMemes()
}

function renderMemes() {
    const memes = getMemes()

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

    document.querySelector('.meme-gallery').innerHTML = strHtml
}

function onMemeClick(imageId) {
    changePageTo('page-meme-editor')
    onInitCanvas(imageId)

}

function onPageChange(pageName) {
    resetMemeEditor()
    changePageTo(pageName)
    onCloseMobileMenu()
}

function changePageTo(toPage) {
    PAGE_CLASSES.forEach(pageClass => {
        document.querySelector(`.${pageClass}`).hidden = (pageClass === toPage) ? false : true
    })
}

function onToggleMobileMenu() {
    document.body.classList.toggle('menu-open')
}

function onCloseMobileMenu() {
    if (!document.body.classList.contains('menu-open')) return
    document.body.classList.remove('menu-open')
}