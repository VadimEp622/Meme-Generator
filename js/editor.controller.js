'use strict'

let gElCanvas
let gCtx
let gImg

let gWindowWidth = window.innerWidth

// TODO: make on exiting meme edit to reset parameters



//-------------------On Functions----------------------//
function onInitCanvas(imageId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // window.addEventListener('resize', resizeCanvas)
    // console.log('window', window)
    // console.log('gWindowWidth', gWindowWidth)


    onImgInput(imageId)

    resizeCanvas()


}

function onImgInput(imageId) {
    loadNewImgElement(imageId, renderLoadedImg)
}

function onFontSizeDecrease() {
    decreaseFont()
    const txtBox = getTxtBox()

    drawAllTxt()
    drawFocusRect()
}

function onFontSizeIncrease() {
    increaseFont()
    const txtBox = getTxtBox()

    drawAllTxt()
    drawFocusRect()
}

function onSetNextFocusTextBox(){
    setNextFocusTextBox()

    drawAllTxt()
    drawFocusRect()
}

function onTextInput(value) {
    // console.log('value', value)
    // const canvas = getCanvas()
    // console.log('canvas', canvas)
    setTxtBoxContent(value)
    // const txtBox = getTxtBox()
    // console.log('txtBox', txtBox)


    drawAllTxt()
    drawFocusRect()
}


function onTextAlign(textAlign) {
    // console.log('textAlign', textAlign)
    setTxtBoxTextAlign(textAlign)
    // const txtBox = getTxtBox()

    drawAllTxt()
    drawFocusRect()
}

function onAddTxtBox() {
    createCanvasTxtBox()
    const txtBoxes = getTxtBoxes()
    // console.log('txtBoxes', txtBoxes)

    const strHtml = txtBoxes.map(txtBox => `
    <label>Text ${txtBox.textBoxId}:</label>
    <input  data-id="${txtBox.textBoxId}" type="text" value="${txtBox.content}" 
    onmousedown="onInputClick(this.dataset.id)" onkeyup="onTextInput(this.value)"><br>
    `).join('')

    document.querySelector('.input-text-container').innerHTML = strHtml

    drawAllTxt()
    drawFocusRect()
}

function onInputClick(id) {
    console.log('id', id)

    drawAllTxt()
    setCurrSelectedTextBoxId(parseInt(id))
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

function onResetCanvasImg(){
    resetMemeEditor()
    renderImg(gImg)
    onAddTxtBox()
}





//------------------------------------------------------//



function drawFocusRect() {
    const txtBox = getTxtBox()
    const { textXpos, textYpos, fontSize } = txtBox
    const contentLen = txtBox.content.length
    console.log('textXpos, textYpos', textXpos, textYpos)

    const pos = {
        x: 2,
        y: textYpos - 5,
        xEnd: parseInt(gElCanvas.width),
        yEnd: textYpos + fontSize,
    }

    drawRectangle(pos.x, pos.y, pos.xEnd - pos.x, pos.yEnd - pos.y)
}


function drawRectangle(x, y, dx, dy) {
    // gCtx.save()

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
    // resizeCanvas()
    renderImg(img)
    drawFocusRect()
}

function renderImg(img) {
    // Draw the img on the canvas
    const canvas = getCanvas()
    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height)
}


function resizeCanvas() {
    // gElCanvas.width = gElCanvas.offsetWidth
    // gElCanvas.height = gElCanvas.offsetHeight
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
    // console.log('elLink', elLink)
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}


function resetMemeEditor() {
    gCtx.reset()
    resetEditor()
    document.querySelector('.input-text-container').innerHTML = `
    <label>Text 1:</label>
    <input  data-id="1" type="text" value="" 
    onmousedown="onInputClick(this.dataset.id)" onkeyup="onTextInput(this.value)"><br>
    `
}