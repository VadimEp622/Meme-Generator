'use strict'

const gCanvas = _createCanvas()
const gTxtBoxes = []

let gTxtBoxId = 1
let gCurrTextAlign = 'center'
let gCurrSelectedTextId = 1



// GET //
function getCanvas() {
    return gCanvas
}
function getTxtBoxes() {
    return gTxtBoxes
}
function getTxtBox() {
    return gTxtBoxes.find(txtBox => txtBox.textBoxId === gCurrSelectedTextId)
}
function getTxtBoxContent() {
    return gTxtBoxes[_getTxtBoxIdx()].content
}
function getCurrSelectedTextBoxId() {
    return gCurrSelectedTextId
}


// SET //
function setCanvasSize(width, height) {
    gCanvas.width = width
    gCanvas.height = height
    console.log('gCanvas', gCanvas)
}
function setTxtBoxContent(content) {
    gTxtBoxes[_getTxtBoxIdx()].content = content
}
function setTxtBoxTextAlign(textAlign) {
    const currIdx = _getTxtBoxIdx()
    gTxtBoxes[currIdx].textAlign = textAlign
    gTxtBoxes[currIdx].textXpos = _getTxtXposByTextAlign(textAlign)
    gCurrTextAlign = textAlign
}
function decreaseFont() {
    const currIdx = _getTxtBoxIdx()
    if (gTxtBoxes[currIdx].fontSize < 20) return
    gTxtBoxes[currIdx].fontSize -= 2
}
function increaseFont() {
    const currIdx = _getTxtBoxIdx()
    gTxtBoxes[currIdx].fontSize += 2
}
function setCurrSelectedTextBoxId(id) {
    gCurrSelectedTextId = id
}
function setStrokeColor(color) {
    const currIdx = _getTxtBoxIdx()
    gTxtBoxes[currIdx].textStrokeColor = color
}
function setFillColor(color) {
    const currIdx = _getTxtBoxIdx()
    gTxtBoxes[currIdx].textFillColor = color
}
function setNextFocusTextBox() {
    gCurrSelectedTextId++
    if (_getTxtBoxIdx() < 0) gCurrSelectedTextId = 1
}


// CREATE //
function createCanvasTxtBox() {
    const txtBox = _createTxtBox()
    gCurrSelectedTextId = txtBox.textBoxId
    txtBox.textXpos = _getTxtXposByTextAlign(gCurrTextAlign)
    txtBox.textYpos = _getTxtYposById(txtBox.textBoxId)
    gTxtBoxes.push(txtBox)
    return txtBox
}


function resetEditor() {
    gTxtBoxId = 1
    gTxtBoxes.splice(0, gTxtBoxes.length)
    gCurrTextAlign = 'center'
    gCurrSelectedTextId = 1
}



//----------PRIVATE FUNCTIONS----------//

function _createCanvas() {
    return {
        width: 100,
        height: 100,
    }
}

function _createTxtBox() {
    return {
        textBoxId: gTxtBoxId++,
        content: '',
        textAlign: 'center',
        textStrokeColor: 'black',
        textFillColor: 'white',
        textXpos: null,
        textYpos: null,
        fontSize: 40,
    }
}

function _getTxtXposByTextAlign(textAlign) {
    if (textAlign === 'left') return 0
    else if (textAlign === 'center') return gCanvas.width * 0.5
    else return gCanvas.width
}

function _getTxtYposById(textBoxId) {
    if (textBoxId === 1) return gCanvas.height * 0.1
    else if (textBoxId === 2) return gCanvas.height * 0.8
    else return gCanvas.height * 0.4
}

function _getTxtBoxIdx() {
    return gTxtBoxes.findIndex(txtBox => txtBox.textBoxId === gCurrSelectedTextId)
}
