document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0
    const candyColors = ['url(images/red.png)', 'url(images/yellow.png)', 'url(images/orange.png)', 'url(images/purple.png)', 'url(images/blue.png)', 'url(images/green.png)']

    // Define audio element and set the source of your background music
    const audio = new Audio('audio/Candy-Crush-Saga-Theme-Song.mp3');

    // Function to play the background music
    function playMusic() {
        audio.play();
    }

    // Function to stop the background music
    function stopMusic() {
        audio.pause();
    }

    // Toggle button click event listener
    document.getElementById('toggleButton').addEventListener('click', function () {
        var iconElement = document.getElementById('icon');

        // Toggle the image source between volume-on.png and volume-off.png
        if (iconElement.src.includes('volume-on.png')) {
            iconElement.src = 'images/volume-off.png';
            stopMusic();
        } else {
            iconElement.src = 'images/volume-on.png';
            playMusic();
        }

    });

    // Play music automatically when the browser opens
    playMusic();



    //CREATING THE BOARD
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)

            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]

            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard()

    //DRAGGING THE CANDIES

    let colorBeingDragged
    let colorBeingReplaced
    let squareIDBeingDragged
    let squareIDBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(e) {
        colorBeingDragged = this.style.backgroundImage
        squareIDBeingDragged = parseInt(this.id)
        this.classList.add('dragged');
        console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')

    }

    function dragEnd(e) {
        e.preventDefault();
        console.log(this.id, 'dragend')

        let validMoves = [squareIDBeingDragged - 1, squareIDBeingDragged - width, squareIDBeingDragged + 1, squareIDBeingDragged + width]

        let validMove = validMoves.includes(squareIDBeingReplaced)

        if (squareIDBeingReplaced && validMove) {
            squareIDBeingReplaced = null
        } else if (squareIDBeingReplaced && !validMove) {
            squares[squareIDBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged
        } else {
            squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged
        }
    }

    function dragOver(e) {
        e.preventDefault();
        console.log(this.id, 'dragover')

    }

    function dragEnter(e) {
        e.preventDefault();
        console.log(this.id, 'dragenter')

    }

    function dragLeave(e) {
        e.preventDefault();
        console.log(this.id, 'dragleave')

    }

    function dragDrop(e) {
        e.preventDefault();
        console.log(this.id, 'dragdrop')
        colorBeingReplaced = this.style.backgroundImage
        squareIDBeingReplaced = parseInt(this.id)
        squares[squareIDBeingReplaced].style.backgroundImage = colorBeingDragged
        squares[squareIDBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    //CHECKING FOR MATCHES
    //check for row of three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowofThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

            if (notValid.includes(i))
                continue

            if (rowofThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowofThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkRowForThree()

    //check for column of three
    function checkColForThree() {
        for (i = 0; i < 47; i++) {
            let colofThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (colofThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                colofThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColForThree()

    //check for row of four
    function checkRowForFour() {
        for (i = 0; i < 56; i++) {
            let rowofFour = [i, i + 1, i + 2, i + 3];
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 27, 38, 39, 45, 46, 47, 53, 54, 55]

            if (notValid.includes(i))
                continue

            if (rowofFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowofFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkRowForFour()

    //check for column of four
    function checkColForFour() {
        for (i = 0; i < 48; i++) {
            let colofFour = [i, i + width, i + width * 2, i + width * 3];
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (colofFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                colofFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColForFour()

    //DROP CANDIES DOWN AFTER MATCHES
    function dropCandies() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundImage === '') {
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }
        }
    }

    window.setInterval(function () {
        dropCandies()
        checkRowForThree()
        checkColForThree()
        checkRowForFour()
        checkColForFour()
    }, 100)
})