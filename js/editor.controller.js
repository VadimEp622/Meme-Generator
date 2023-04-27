'use strict'

let gElCanvas
let gCtx

let gImg

let gTxtInputs = [
    {
        txtId: 1,
        content: ''
    },
]

let gCanvasHeight = 400
let gCanvasWidth = 400

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
    img.onload = () => onImageReady(img)
    gImg = img
}

function renderLoadedImg(img){
    gImg = img
    renderImg(img)
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


function onTextInput(value) {
    console.log('value', value)

    gTxtInputs[0].content = value
    // console.log('gTxtInputs[0].content', gTxtInputs[0].content)


    drawText(value, gCanvasWidth / 2, gCanvasWidth / 4)
}


function drawText(text, x, y) {
    // gCtx.restore()

    // gCtx.reset()

    renderImg(gImg)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.

    // gCtx.save()
}