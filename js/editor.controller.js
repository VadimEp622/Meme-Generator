'use strict'

let gElCanvas
let gCtx

// TODO: make canvas adjust to img width

function onInitCanvas(imageId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    onImgInput(imageId)

    resizeCanvas()
}

function onImgInput(imageId) {
    loadNewImgElement(imageId, renderImg)

}

// DONE: find a way to put the actual, from the folder, image height and width, into new Image()
//maybe 'imgElement.naturalWidth' , or 'imgElement.naturalHeight' might work
function loadNewImgElement(imageId, onImageReady) {
    const imgFileName = getMemeById(imageId).fileName
    // console.log('imgFileName', imgFileName)
    let img = new Image()
    console.log('img', img)
    img.src = `imgs/meme-imgs/${imgFileName}`
    console.log('img.naturalWidth', img.naturalWidth)
    console.log('img.naturalHeight', img.naturalHeight)
    gElCanvas.width = img.naturalWidth
    gElCanvas.height = img.naturalHeight
    img.onload = () => onImageReady(img)
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    // const elContainer = document.querySelector('canvas')
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}
