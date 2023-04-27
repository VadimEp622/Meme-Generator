'use strict'

let gElCanvas
let gCtx
let gImg

// let gCanvasHeight = 400
// let gCanvasWidth = 400

// let gCurrSelectedTextId = 1

// let gTxtInputs = [
// {
// textId: 1,
// content: '',
// textAlign: 'center',
// textWidth,
// textHeight,
// },
// ]



// TODO: make canvas adjust to img width

function onInitCanvas(imageId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // resizeCanvas()

    onImgInput(imageId)

}

function onImgInput(imageId) {
    loadNewImgElement(imageId, renderLoadedImg)
}

// DONE: find a way to put the actual, from the folder, image height and width, into new Image()
//maybe 'imgElement.naturalWidth' , or 'imgElement.naturalHeight' might work
function loadNewImgElement(imageId, onImageReady) {
    const imgFileName = getMemeById(imageId).fileName
    // console.log('imgFileName', imgFileName)
    let img = new Image()
    // console.log('img', img)
    img.src = `imgs/meme-imgs/${imgFileName}`
    // console.log('img.naturalWidth', img.naturalWidth)
    // console.log('img.naturalHeight', img.naturalHeight)

    gElCanvas.width = img.naturalWidth
    gElCanvas.height = img.naturalHeight

    setCanvasSize(img.naturalWidth, img.naturalHeight)

    img.onload = () => onImageReady(img)
    gImg = img
}

function renderLoadedImg(img) {
    gImg = img
    createCanvasTxtBox()
    renderImg(img)
    // resizeCanvas()
}

function renderImg(img) {
    // Draw the img on the canvas
    const canvas = getCanvas()
    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight

    // console.log('elContainer.offsetWidth', elContainer.offsetWidth)
    // console.log('elContainer.offsetHeight', elContainer.offsetHeight)

    // gElCanvas.width = elContainer.clientWidth
    // console.log('elContainer.clientWidth', elContainer.clientWidth)
    // console.log('elContainer.clientWidth', elContainer.screenX)
}

function onFontSizeDecrease(){
    decreaseFont()
    const txtBox = getTxtBox()
    drawText(txtBox.content, txtBox.textXpos, txtBox.textYpos, txtBox.fontSize, txtBox.textAlign)
}

function onFontSizeIncrease(){
    increaseFont()
    const txtBox = getTxtBox()
    drawText(txtBox.content, txtBox.textXpos, txtBox.textYpos, txtBox.fontSize, txtBox.textAlign)
}

function onTextInput(value) {
    // console.log('value', value)
    const canvas = getCanvas()
    // console.log('canvas', canvas)
    setTxtBoxContent(value)
    const txtBox = getTxtBox()
    // console.log('txtBox', txtBox)

    drawText(txtBox.content, txtBox.textXpos, txtBox.textYpos, txtBox.fontSize, txtBox.textAlign)
}


function onTextAlign(textAlign) {
    console.log('textAlign', textAlign)
    setTxtBoxTextAlign(textAlign)
    const txtBox = getTxtBox()
    drawText(txtBox.content, txtBox.textXpos, txtBox.textYpos, txtBox.fontSize, txtBox.textAlign)
}

function onAddTxtBox() {
    // const newTxtBox = createCanvasTxtBox()
    // const strHtml=``
}


function drawText(text, x, y, fontSize, textAlign) {
    console.log('text, x, y, fontSize, textAlign --', text, x, y, fontSize, textAlign)

    renderImg(gImg)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = `${fontSize}px Arial`
    gCtx.textAlign = textAlign
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.

}