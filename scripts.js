const Event = document.querySelector('#new_todo').addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        ToDo.submit(true)
    }
})

const lightTheme = document.querySelector('#light').addEventListener('click', () => {
    document.querySelector('#theme').classList.remove('dark')
    document.querySelector('#theme').classList.add('light')
})

const darkTheme = document.querySelector('#dark').addEventListener('click', () => {
    document.querySelector('#theme').classList.remove('light')
    document.querySelector('#theme').classList.add('dark')
})

// Armazenamento no browser
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("todos")) || []
    },

    set(todo) {
        localStorage.setItem("todos", JSON.stringify(todo))
    },

    clear() {
        localStorage.clear()
        window.location.reload()
    }
}

const ListToDo = {
    all: Storage.get(),

    add(todo) {
        ListToDo.all.push(todo)

        App.reload()
    },

    remove(index) {
        ListToDo.all.splice(index, 1)

        App.reload()
    },

    listToDo() {
        let list = 0

        ListToDo.all.forEach(todo => {
            list += todo
        });

        return list
    }
}

const DOM = {
    toDoContainer: document.querySelector('#container_to_do'),

    qtdItens: document.querySelector('#qtd_itens'),

    barNavigation: document.querySelectorAll('nav button'),

    addToDo(todo, index) {
        const CSSclass = todo.completed == true ? "finish" : null
        const html = `<li class="to-do ${CSSclass}" id="${index}" onclick="DOM.finish(${index})">
                        <div class="button">
                            <img src="./project/images/icon-check.svg" alt="icon check">
                        </div>
                        <p>${todo.description}</p>
                        <img onclick="ListToDo.remove(${index})" src="./project/images/icon-cross.svg" alt="close button">
                    </li>`

        DOM.toDoContainer.innerHTML += html
        DOM.qtdItens.innerHTML = `${index + 1} items left`
    },

    finish(index) {
        const dataToDo = ListToDo.all[index]

        if (dataToDo.completed == false) {
            document.getElementById(index).classList.add('finish')
            dataToDo.completed = true
            return null
        }

        document.getElementById(index).classList.remove('finish')
        dataToDo.completed = false
    },

    cssBarNavigation(opc) {
        const CSSclass = DOM.barNavigation
        CSSclass.forEach((e) => {
            e.classList.remove('active')
            if (e.value == opc) {
                e.classList.add('active')
            }
        })
    },

    clearToDo() {
        Storage.clear()
        DOM.toDoContainer.innerHTML = ""
        DOM.qtdItens.innerHTML = "0 items left"

    }
}

const ToDo = {
    description: document.querySelector('#new_todo'),

    getValues() {
        return {
            description: ToDo.description.value,
            completed: false,
        }
    },

    validateToDo() {
        let { description, completed } = ToDo.getValues()

        if (description.trim() === '') {
            throw new Error("Por favor, preencha o campo de maneira correta")
        } else {
            return {
                description,
                completed,
            }
        }
    },

    saveToDo(todo) {
        ListToDo.add(todo)
    },

    clearToDo() {
        ToDo.description.value = ''
    },

    submit(Event) {

        if (Event === true) {
            try {
                const newToDo = ToDo.validateToDo()

                ToDo.saveToDo(newToDo)

                ToDo.clearToDo()

            } catch (error) {
                alert(error.message)
            }
        }

    },

    Active(state) {
        return state.completed == false
    },

    Completed(state) {
        return state.completed == true
    }
}


const App = {
    init(opc) {

        DOM.toDoContainer.innerHTML = ""
        DOM.qtdItens.innerHTML = "0 items left"
        console.log(ListToDo.all)
        if (opc == 'all') {
            DOM.cssBarNavigation(opc)
            ListToDo.all.forEach(function (todo, index) {
                DOM.addToDo(todo, index)
            })

        } else if (opc == 'active') {
            DOM.cssBarNavigation(opc)
            const ActivesToDo = ListToDo.all.filter(ToDo.Active)
            ActivesToDo.forEach(function (todo, index) {
                DOM.addToDo(todo, index)
            })

        } else if (opc == 'completed') {
            DOM.cssBarNavigation(opc)
            const CompletedToDo = ListToDo.all.filter(ToDo.Completed)
            CompletedToDo.forEach(function (todo, index) {
                DOM.addToDo(todo, index)
            })

        }

        Storage.set(ListToDo.all)
    },

    reload() {
        // DOM.clearToDo()
        const opc = document.querySelector('.active').value
        App.init(opc)
    }
}

App.init('all')
