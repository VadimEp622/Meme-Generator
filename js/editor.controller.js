'use strict'

let gElCanvas
let gCtx
let gImg

// let gWindowWidth = window.innerWidth

// TODO: make on exiting meme edit to reset parameters



//-------------------On Functions----------------------//
function onInitCanvas(imageId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    onImgInput(imageId)

}

function onImgInput(imageId) {
    loadNewImgElement(imageId, renderLoadedImg)
}

function onFontSizeDecrease() {
    decreaseFont()
    drawAllTxt()
    drawFocusRect()
}

function onFontSizeIncrease() {
    increaseFont()
    drawAllTxt()
    drawFocusRect()
}

function onSetNextFocusTextBox() {
    setNextFocusTextBox()
    drawAllTxt()
    drawFocusRect()
}

function onTextInput(value) {
    setTxtBoxContent(value)
    drawAllTxt()
    drawFocusRect()
}


function onTextAlign(textAlign) {
    setTxtBoxTextAlign(textAlign)
    drawAllTxt()
    drawFocusRect()
}

function onAddTxtBox() {
    createCanvasTxtBox()
    const txtBoxes = getTxtBoxes()

    const strHtml = txtBoxes.map(txtBox => `
        <label>Text ${txtBox.textBoxId}:</label>
        <input
            data-id="${txtBox.textBoxId}" type="text" value="${txtBox.content}" 
            onmousedown="onInputClick(this.dataset.id)" onkeyup="onTextInput(this.value)">
        <br>
    `).join('')

    document.querySelector('.input-text-container').innerHTML = strHtml

    drawAllTxt()
    drawFocusRect()
}

function onInputClick(id) {
    setCurrSelectedTextBoxId(parseInt(id))
    drawAllTxt()
    drawFocusRect()
}

function onStrokeColorChange(color) {
    setStrokeColor(color)
    drawAllTxt()
    drawFocusRect()
}

function onFillColorChange(color) {
    setFillColor(color)
    drawAllTxt()
    drawFocusRect()
}

function onResetCanvasImg() {
    // gCtx.reset()
    resetMemeEditor()
    renderImg(gImg)
    onAddTxtBox()
}





//------------------------------------------------------//



function drawFocusRect() {
    const txtBox = getTxtBox()
    const { textXpos, textYpos, fontSize } = txtBox
    const contentLen = txtBox.content.length

    const pos = {
        x: 2,
        y: textYpos - 5,
        xEnd: parseInt(gElCanvas.width),
        yEnd: textYpos + fontSize,
    }

    drawRectangle(pos.x, pos.y, pos.xEnd - pos.x, pos.yEnd - pos.y)
}


function drawRectangle(x, y, dx, dy) {
    gCtx.lineWidth = 1
    gCtx.shadowColor = 'white';
    gCtx.shadowBlur = 5;
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, dx, dy)

    gCtx.restore()
}


function drawAllTxt() {
    const txtBoxes = getTxtBoxes()
    renderImg(gImg)
    txtBoxes.forEach(txtBox => drawText(txtBox))
}


function loadNewImgElement(imageId, onImageReady) {
    const imgFileName = getMemeById(imageId).fileName
    let img = new Image()
    img.src = `imgs/meme-imgs/${imgFileName}`
    img.onload = () => onImageReady(img)
    gImg = img
}

function renderLoadedImg(img) {
    gElCanvas.width = img.naturalWidth
    gElCanvas.height = img.naturalHeight
    setCanvasSize(img.naturalWidth, img.naturalHeight)

    const elContainer = document.querySelector('.canvas-container')
    elContainer.style.maxWidth = `${gElCanvas.width}px`
    elContainer.style.maxHeight = `${gElCanvas.height}px`
    gImg = img
    createCanvasTxtBox()
    renderImg(img)
    drawFocusRect()
}

function renderImg(img) {
    const canvas = getCanvas()
    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
}




function drawText(txtBox) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${txtBox.textStrokeColor}`
    gCtx.fillStyle = `${txtBox.textFillColor}`
    gCtx.font = `${txtBox.fontSize}px Arial`
    gCtx.textAlign = txtBox.textAlign
    gCtx.textBaseline = 'top'
    gCtx.fillText(txtBox.content, txtBox.textXpos, txtBox.textYpos) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txtBox.content, txtBox.textXpos, txtBox.textYpos) // Draws (strokes) a given text at the given (x, y) position.

    gCtx.save()
}


function downloadImg(elLink) {
    drawAllTxt()
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}


function resetMemeEditor() {
    resetEditor()
    document.querySelector('.input-text-container').innerHTML = `
        <label>Text 1:</label>
        <input
            data-id="1" type="text" value="" 
            onmousedown="onInputClick(this.dataset.id)" onkeyup="onTextInput(this.value)">
        <br>
    `
}