let container = document.querySelector('.container')
let redSide = Array.from(document.querySelectorAll('.redSide'))
let blueSide = Array.from(document.querySelectorAll('.blueSide'))
let first = Array.from(document.querySelectorAll('.first'))
let options = redSide.concat(blueSide, first)
let boxes = []
let redBig = true
let blueBig = true
let blueTurn = true

for (let i = 0; i < 9; i++) {
    let box = document.createElement('div')
    box.classList.add('boxes')
    box.dataset.colour = 'none'
    container.appendChild(box)
    boxes.push(box)
}

boxes.forEach(box => {
    box.addEventListener('click', e => {
        options.forEach(o => {
            o.style.pointerEvents = 'none'
        })


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
redSide.forEach(size => {
    size.addEventListener('click', e => changeSize('red'))
})
blueSide.forEach(size => {
    size.addEventListener('click', e => changeSize('blue'))
})
first.forEach(size => {
    size.addEventListener('click', e => changeTurn())
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
    let combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let colour = ['red', 'blue']

    colour.forEach(c => {
        let colour = c

        combinations.forEach(combo => {
            let a = boxes[combo[0]]
            let b = boxes[combo[1]]
            let c = boxes[combo[2]]

            if (a.dataset.colour.toString().includes(colour) && b.dataset.colour.toString().includes(colour) && c.dataset.colour.toString().includes(colour)){
                declareWinner(colour)
            }
        })
    })
}

function declareWinner(c) {
    boxes.forEach(box => {
        box.style.pointerEvents = 'none'
        let winner = document.querySelector('#winner')
        winner.innerHTML = 'Winner: ' + c
        winner.style.display = 'block'
    })
}