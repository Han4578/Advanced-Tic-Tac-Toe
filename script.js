let container = document.querySelector('.container')
let container2 = document.querySelector('.container2')
let redSide = Array.from(document.querySelectorAll('.redSide'))
let mode = document.querySelector('#mode')
let modebar = document.querySelector('.mode')
let blueSide = Array.from(document.querySelectorAll('.blueSide'))
let first = Array.from(document.querySelectorAll('.first'))
let options = redSide.concat(blueSide, first)
let boxes = []
let boxes2 = []
let redBig = true
let blueBig = true
let blueTurn = true
let is3x3 = true

for (let i = 0; i < 9; i++) {
    let box = document.createElement('div')
    box.classList.add('boxes')
    box.dataset.colour = 'none'
    container.appendChild(box)
    boxes.push(box)
}

for (let i = 0; i < 16; i++) {
    let box = document.createElement('div')
    box.classList.add('boxes')
    box.dataset.colour = 'none'
    container2.appendChild(box)
    boxes2.push(box)
}

mode.addEventListener('input', () => {
    container.classList.toggle('display')
    container2.classList.toggle('display')
    is3x3 = !is3x3
})

for (const b of [boxes, boxes2]) {
    b.forEach(box => {
        box.addEventListener('click', e => {
            options.forEach(o => {
                o.style.pointerEvents = 'none'
            })
            modebar.style.display = 'none'
    
            let image = document.createElement('img')
            let c
    
            if (Array.from(e.target.children).length == 0) {
                if (blueTurn && blueBig) {
                    image.src = 'images/bigRing.png'
                    c = 'blue'
                } else if (blueTurn && !blueBig) {
                    image.src = 'images/smallRing.png'
                    c = 'blue'
                } else if (!blueTurn && redBig) {
                    image.src = 'images/bigCross.png'
                    c = 'red'
                } else {
                    image.src = 'images/smallCross.png'
                    c = 'red'
                }
                e.target.appendChild(image)
                changeSize(c)
                changeTurn()
                e.target.dataset.colour = c
    
            } else {
                let newSrc = e.target.firstChild.src
                if (e.target.firstChild.src.indexOf('images/bigRing.png') != -1 && blueTurn && !blueBig) {
                    newSrc = 'images/ringInRing.png'
                    a = 'blue'
                    c = 'blue'
                } else if (e.target.firstChild.src.indexOf('images/bigCross.png') != -1 && blueTurn && !blueBig) {
                    newSrc = 'images/ringInCross.png'
                    a = 'blue red'
                    c = 'blue'
                } else if (e.target.firstChild.src.indexOf('images/bigCross.png') != -1 && !blueTurn && !redBig) {
                    newSrc = 'images/crossInCross.png'
                    a = 'red'
                    c = 'red'
                } else if (e.target.firstChild.src.indexOf("images/bigRing.png") != -1 && !blueTurn && !redBig) {
                    newSrc = 'images/crossInRing.png'
                    a = 'blue red'
                    c = 'red'
                }
    
                if (e.target.firstChild.src !== newSrc) {
                    e.target.firstChild.src = newSrc
                    changeSize(c)
                    changeTurn()
                    e.target.dataset.colour = a
                }
            }
    
            checkForWin()
        })
    })
}
redSide.forEach(size => {
    size.addEventListener('click', () => changeSize('red'))
})
blueSide.forEach(size => {
    size.addEventListener('click', () => changeSize('blue'))
})
first.forEach(size => {
    size.addEventListener('click', () => changeTurn())
})

function changeSize(colour) {

    if (colour == 'blue') {
        blueBig = !blueBig
        blueSide.forEach(size => {
            size.classList.remove('selected')
            if (blueBig && size.classList.contains('big')) {
                size.classList.add('selected')
            } else if (!blueBig && size.classList.contains('small')) {
                size.classList.add('selected')
            }
        })
    } else {
        redBig = !redBig
        redSide.forEach(size => {
            size.classList.remove('selected')
            if (redBig && size.classList.contains('big')) {
                size.classList.add('selected')
            } else if (!redBig && size.classList.contains('small')) {
                size.classList.add('selected')
            }
        })
    }
}

function changeTurn() {
    blueTurn = !blueTurn
    first.forEach(c => {
        c.classList.remove('selected')
        if (blueTurn && c.classList.contains('blueFirst')) {
            c.classList.add('selected')
        } else if (!blueTurn && c.classList.contains('redFirst')) {
            c.classList.add('selected')
        }
    })
}

function checkForWin() {
    let combinations = (is3x3)?[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]:[
        [ 0,  1,  2,  3],
        [ 4,  5,  6,  7],
        [ 8,  9, 10, 11],
        [12, 13, 14, 15],
        [ 0,  4,  8, 12],
        [ 1,  5,  9, 13],
        [ 2,  6, 10, 14],
        [ 3,  7, 11, 15],
        [ 0,  5, 10, 15],
        [ 3,  6,  9, 12]
    ];
    let colour = ['red', 'blue']
    let win = false

    colour.forEach(c => {
        let colour = c

        combinations.forEach(combo => {
            let box = (is3x3)? boxes: boxes2;
            let a = box[combo[0]]
            let b = box[combo[1]]
            let c = box[combo[2]]
            let d = (!is3x3)? box[combo[3]]: '';

            if (is3x3 && a.dataset.colour.toString().includes(colour) && b.dataset.colour.toString().includes(colour) && c.dataset.colour.toString().includes(colour)){
                declareWinner(colour)
                win = true
            }

            if (!is3x3 && a.dataset.colour.toString().includes(colour) && b.dataset.colour.toString().includes(colour) && c.dataset.colour.toString().includes(colour) && d.dataset.colour.toString().includes(colour)){
                declareWinner(colour)
                win = true
            }
        })
    })
    if (!win) checkForDraw()
}

function checkForDraw() {
    let box = (is3x3)? boxes: boxes2;
    let isDraw = true

    for (const b of box) {
        if (b.children.length == 0) isDraw = false
    }

    if (isDraw) declareWinner('draw')
}

function declareWinner(c) {
    boxes.forEach(box => {
        box.style.pointerEvents = 'none'
        let winner = document.querySelector('#winner')
        winner.innerHTML = (c == 'draw')? 'Draw' :'Winner: ' + c;
        winner.style.display = 'block'
    })
}