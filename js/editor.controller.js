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


    onImgInput(imageId)

    resizeCanvas()
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
    console.log('img', img)
    img.src = `imgs/meme-imgs/${imgFileName}`
    console.log('img.naturalWidth', img.naturalWidth)
    console.log('img.naturalHeight', img.naturalHeight)

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
}

function renderImg(img) {
    // Draw the img on the canvas
    const canvas = getCanvas()
    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
}


function resizeCanvas() {
    // const elContainer = document.querySelector('canvas')
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}


function onTextInput(value) {
    // console.log('value', value)
    const canvas = getCanvas()
    // console.log('canvas', canvas)
    setTxtBoxContent(value)
    const txtBox = getTxtBox()
    // console.log('txtBox', txtBox)

    drawText(txtBox.content, txtBox.textXpos, txtBox.textYpos, txtBox.textAlign)
}


function onTextAlign(textAlign) {
    console.log('textAlign', textAlign)
    setTxtBoxTextAlign(textAlign)

    const txtBox = getTxtBox()
    drawText(txtBox.content, txtBox.textXpos, txtBox.textYpos, txtBox.textAlign)
}

function onAddTxtBox() {
    // const newTxtBox = createCanvasTxtBox()
    // const strHtml=``
}


function drawText(text, x, y, textAlign) {
    console.log('text, x, y, textAlign', text, x, y, textAlign)

    renderImg(gImg)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = textAlign
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.

}