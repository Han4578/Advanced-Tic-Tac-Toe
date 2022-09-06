let container = document.querySelector('.container')
let redSide = document.querySelectorAll('.redSide')
let blueSide = document.querySelectorAll('.blueSide')
let first = document.querySelectorAll('.first')
let boxes = []
let redBig = true
let blueBig = true
let blueTurn = true

for (let i = 0; i < 9; i++) {
    let box = document.createElement('div')
    box.id = i
    box.classList.add('boxes')
    container.appendChild(box)
    boxes.push(box)
}

boxes.forEach(box => {
    box.addEventListener('click', e => {
        let image = document.createElement('img')
        let c
        if (Array.from(e.target.children).length == 0) {
            if (blueTurn && blueBig) {
                image.src = 'images/bigRing.png'
                image.dataset.colour = 'blue'
                c = 'blue'
            } else if (blueTurn && !blueBig) {
                image.src = 'images/smallRing.png'
                image.dataset.colour = 'blue'
                c ='blue'
            } else if (!blueTurn && redBig) {
                image.src = 'images/bigCross.png'
                image.dataset.colour = 'red'
                c = 'red'
            } else {
                image.src = 'images/smallCross.png'
                image.dataset.colour = 'red'
                c = 'red'
            }
            e.target.appendChild(image)
        }

        changeSize(c)
        changeTurn()
    })
});

redSide.forEach(size => {
    size.addEventListener('click', e => changeSize('red'))
})
blueSide.forEach(size => {
    size.addEventListener('click', e => changeSize('blue'))
})
first.forEach(size => {
    size.addEventListener('click', e => changeColor())
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

function changeColor() {
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