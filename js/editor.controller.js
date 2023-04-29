'use strict'

let gElCanvas
let gCtx
let gImg

let gWindowWidth=window.innerWidth
// TODO: make canvas adjust to img width



//-------------------On Functions----------------------//
function onInitCanvas(imageId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    window.addEventListener('resize', resizeCanvas)
    console.log('window', window)
    console.log('gWindowWidth', gWindowWidth)

    // resizeCanvas()

    onImgInput(imageId)

}

function onImgInput(imageId) {
    loadNewImgElement(imageId, renderLoadedImg)
}

function onFontSizeDecrease() {
    decreaseFont()
    const txtBox = getTxtBox()

    drawAllTxt()
}

function onFontSizeIncrease() {
    increaseFont()
    const txtBox = getTxtBox()

    drawAllTxt()
}

function onTextInput(value) {
    // console.log('value', value)
    const canvas = getCanvas()
    // console.log('canvas', canvas)
    setTxtBoxContent(value)
    const txtBox = getTxtBox()
    // console.log('txtBox', txtBox)


    drawAllTxt()
}


function onTextAlign(textAlign) {
    // console.log('textAlign', textAlign)
    setTxtBoxTextAlign(textAlign)
    const txtBox = getTxtBox()

    drawAllTxt()
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
}

function onInputClick(id) {
    console.log('id', id)
    setCurrSelectedTextBoxId(parseInt(id))
}

function onStrokeColorChange(color) {
    console.log('color', color)
    setStrokeColor(color)
    drawAllTxt()
}

function onFillColorChange(color){
    setFillColor(color)
    drawAllTxt()
}
//------------------------------------------------------//


function drawAllTxt() {
    const txtBoxes = getTxtBoxes()
    const currTxtBoxId = getCurrSelectedTextBoxId()
    renderImg(gImg)
    txtBoxes.forEach(txtBox => {
        setCurrSelectedTextBoxId(txtBox.textBoxId)
        // drawText(txtBox)
        drawText(
            txtBox.content,
            txtBox.textXpos,
            txtBox.textYpos,
            txtBox.fontSize,
            txtBox.textAlign,
            txtBox.textStrokeColor,
            txtBox.textFillColor
        )
    })
    setCurrSelectedTextBoxId(currTxtBoxId)
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
    
    // const elMemeEditorContainer=document.querySelector('.meme-editor-tool-container')
    // const elCanvasContainer = document.querySelector('.canvas-container')
    // const elContainer = document.querySelector('canvas')

    // console.log('elContainer', elContainer)
    // console.log('elContainer.innerWidth', elContainer.innerWidth)

    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight

    
    // console.log('elMemeEditorContainer.offsetWidth', elMemeEditorContainer.offsetWidth)

    // elCanvasContainer.width = elMemeEditorContainer.offsetWidth/3
    // elCanvasContainer.height = elMemeEditorContainer.offsetWidth/3
    // gElCanvas.width = elMemeEditorContainer.offsetWidth/3
    // gElCanvas.height = elMemeEditorContainer.offsetWidth/3
    // console.log('elContainer.offsetHeight', elContainer.offsetHeight)

    // gElCanvas.width = elContainer.clientWidth
    // console.log('elContainer.clientWidth', elContainer.clientWidth)
    // console.log('elContainer.clientWidth', elContainer.screenX)

    // drawAllTxt()
}





// TODO: make function recieve just one whole textBox object, and fill gCtx with its keys values
function drawText(text, x, y, fontSize, textAlign, strokeColor, fillColor) {
    // console.log('text, x, y, fontSize, textAlign, strokeColor, fillColor', text, x, y, fontSize, textAlign, strokeColor, fillColor)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${strokeColor}`
    gCtx.fillStyle = `${fillColor}`
    gCtx.font = `${fontSize}px Arial`
    gCtx.textAlign = textAlign
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.

}


function downloadImg(elLink) {
    // console.log('elLink', elLink)
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}