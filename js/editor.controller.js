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

function loadNewImgElement(imageId, onImageReady) {
    const imgFileName = getMemeById(imageId).fileName
    // console.log('imgFileName', imgFileName)
    let img = new Image()
    // console.log('img', img)
    img.src = `imgs/meme-imgs/${imgFileName}`
    img.onload = () => onImageReady(img)
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('canvas')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}
