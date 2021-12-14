let Todo = []

const lightTheme = document.querySelector('#light').addEventListener('click', () => {
    document.querySelector('#theme').classList.remove('dark')
    document.querySelector('#theme').classList.add('light')
})

const darkTheme = document.querySelector('#dark').addEventListener('click', () => {
    document.querySelector('#theme').classList.remove('light')
    document.querySelector('#theme').classList.add('dark')
})

// const completedToDo = document.querySelector('.button').addEventListener('click', () => {
//     document.querySelector('.to-do').classList.add('finish')
// })

async function getDatas() {
    try {
        const request = await fetch('./data.json')
        const data = await request.json()

        Todo = data

        showToDo(1)

    } catch (error) {
        console.error(error)
    }
}

function showToDo(opc) {
    console.log(opc)

    let output = ''
    let count = 0
    document.querySelector('#container_to_do').innerHTML = output


    Todo.map((prop) => {

        if (opc == 2) {
            showNavBar(1)

            if (prop.active == true) {
                output = `<li class="to-do">
                    <div class="button" id="${prop.id}">
                        <img src="./project/images/icon-check.svg" alt="icon check">
                    </div>
                    <p>${prop.todo}</p>
                    <img src="./project/images/icon-cross.svg" alt="close button">
                </li>`

                document.querySelector('#container_to_do').innerHTML += output

                count++
                document.querySelector('#qtd_itens').innerHTML = `${count} items left`
            }

        } else if (opc == 3) {
            showNavBar(2)

            if (prop.active != true) {

                output = `<li class="to-do">
                    <div class="button" id="${prop.id}">
                        <img src="./project/images/icon-check.svg" alt="icon check">
                    </div>
                    <p>${prop.todo}</p>
                    <img src="./project/images/icon-cross.svg" alt="close button">
                </li>`

                document.querySelector('#container_to_do').innerHTML += output

                count++
                document.querySelector('#qtd_itens').innerHTML = `${count} items left`
            }

        } else if (opc == 1) {
            showNavBar(0)

            output = `<li class="to-do">
                    <div class="button" id="${prop.id}">
                        <img src="./project/images/icon-check.svg" alt="icon check">
                    </div>
                    <p>${prop.todo}</p>
                    <img src="./project/images/icon-cross.svg" alt="close button">
                </li>`

            document.querySelector('#container_to_do').innerHTML += output

            document.querySelector('#qtd_itens').innerHTML = `${Todo.length} items left`
        }

    })


}

// document.querySelectorAll('nav button').addEventListener('click', (e) => {
//     console.log(e.value)
// })

// console.log(list[])

function showNavBar(opc) {
    const list = document.querySelectorAll('nav button').valueOf()
    console.log(list)
    for (i = 0; i < list.length; i++) {
        if (list[opc].value != list[i].value) {
            list[i].classList.remove('active')
        } else if (list[opc].value == list[i].value) {
            list[i].classList.add('active')
        }
    }
    return null
}

getDatas()