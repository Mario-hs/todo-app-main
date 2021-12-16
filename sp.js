const Event = document.querySelector('#new_todo').addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        ToDo.submit(true)
    }
})

// Armazenamento no browser
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("todos")) || []
    },

    set(todo) {
        localStorage.setItem("todos", JSON.stringify(todo))
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

    addToDo(todo) {
        const CSSclass = todo.completed == true ? "finish" : null
        const html = `<li class="to-do ${CSSclass}">
                        <div class="button">
                            <img src="./project/images/icon-check.svg" alt="icon check">
                        </div>
                        <p>${todo.description}</p>
                        <img src="./project/images/icon-cross.svg" alt="close button">
                    </li>`

        DOM.toDoContainer.innerHTML += html
    },

    clearToDo() {
        DOM.toDoContainer.innerHTML = ""
    }
}

const ToDo = {
    description: document.querySelector('#new_todo'),

    getValues() {
        console.log(ToDo.description.value)
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
            console.log(description, completed)
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

    }
}

const App = {
    init() {
        ListToDo.all.forEach(function (todo, index) {
            DOM.addToDo(todo, index)
        })

        Storage.set(ListToDo.all)
    },

    reload() {
        DOM.clearToDo()
        App.init()
    }
}

App.init()
