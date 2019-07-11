const elements = document.querySelectorAll('span')
const elementClasses = elements[0].className
const button = document.querySelector('#change_form')

// Animation logic
let index = 0 // Index for class change
setInterval(() => {
    index++
    if (index > 2) {
        index = 0
    }
    for (let i = 0; i < elements.length; i++) {
        if (i % 3 === 0) {
            let classModifier = index + 1

            elements[i].className = elementClasses + classModifier
        } else if (i % 3 === 1) {
            let classModifier = index + 2

            if (classModifier === 4) {
                classModifier = 1
            }

            elements[i].className = elementClasses + classModifier
        } else if (i % 3 === 2) {
            let classModifier = index + 3

            if (classModifier === 4) {
                classModifier = 1
            } else if (classModifier === 5) {
                classModifier = 2
            }

            elements[i].className = elementClasses + classModifier
        }
    }

}, 200)


// Render logic


const spaceWidth = 15 // Space between elements
const elementWidth = elements[0].offsetWidth // Element width
const elementFullWidth = elementWidth + spaceWidth // Element width with space

let delta = Math.PI * 2 / elements.length;
let angle = 0;

/**
 * Function for position calculate
 * @param {number} multiplier
 * @returns {string}
 */
const getPosition = (multiplier) => {
    return multiplier * elementWidth + multiplier * spaceWidth + 'px'
}

let rectangle = true

const renderGarland = () => {
    let maxLeftPosition = '0'
    let maxTopPosition = '0'
    let minLeftPosition = '0'

    let multiplierForTopSide = 1
    let multiplierForLeftSide = 1
    let multiplierForBottomSide = 1
    let multiplierForRightSide = 1

    if (rectangle) {
        for (let i = 0; i < elements.length; i++) {
            if (i < 10) { // Top side render
                elements[i].style.left = getPosition(multiplierForTopSide)
                elements[i].style.top = '0'
                maxLeftPosition = elements[i].style.left // Set max left position for left side render
                minLeftPosition = elements[0].style.left // Set min left position for right side render
                multiplierForTopSide++
            } else if (i < 15) { // Left side render
                elements[i].style.left = parseInt(maxLeftPosition, 10) + elementFullWidth +'px'
                elements[i].style.top = getPosition(multiplierForLeftSide)
                maxTopPosition = elements[i].style.top // Set max top position for bottom side render
                multiplierForLeftSide++
            } else if (i < 25) { // Bottom side render
                elements[i].style.top = parseInt(maxTopPosition, 10) + elementFullWidth +'px'
                elements[i].style.left = getPosition(multiplierForBottomSide)
                multiplierForBottomSide++
            } else if (i < 30) { // Right side render
                elements[i].style.left = parseInt(minLeftPosition, 10) - elementFullWidth +'px'
                elements[i].style.top = getPosition(multiplierForRightSide)
                multiplierForRightSide++
            }
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.left =  200 * Math.cos(angle) + 200 + 'px';
            elements[i].style.top = 200 * Math.sin(angle) + 200 + 'px';

            angle += delta;
        }
    }
}

renderGarland()


button.addEventListener('click', () => {
    rectangle = !rectangle
    if (rectangle) {
        button.innerHTML = 'Circle'
    } else {
        button.innerHTML = 'Rectangle'
    }
    renderGarland()
})






