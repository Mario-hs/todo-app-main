// Armazenamento no browser
const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("to-dos:todo")) || []
    },

    set(todo){
        localStorage.setItem("to-dos:todo",
        JSON.stringify(todo))
    }
}





const ListToDo = {
    all: Storage.get(),

    add(todo){
        ListToDo.all.push(todo)

        App.reload()
    },

    remove(index){
        ListToDo.all.splice(index, 1)

        App.reload()
    },

    listToDo(){
        let list = 0

        ListToDo.all.forEach(todo => {
            list += todo
        });

        return list
    }
}

const DOM = {
    toDoContainer: document.querySelector('#container_to_do'),

    addToDo(todo){
        const html =  `<li class="to-do finish">
                        <div class="button">
                            <img src="./project/images/icon-check.svg" alt="icon check">
                        </div>
                        <p>${todo.todo}</p>
                        <img src="./project/images/icon-cross.svg" alt="close button">
                    </li>`

        DOM.toDoContainer.innerHTML += html
    },

    clearToDo(){
        DOM.toDoContainer.innerHTML = ""
    }
}

const ToDo = {
    description: document.querySelector('.to-do p'),

    getValues(){
        return {
            description: ToDo.description.value,
        }
    },

    saveToDo(todo){
        ToDo.add(todo)
    },

    clearToDo(){
        ToDo.description.value = ''
    },

    submit(event){
        event.preventDefault()

        try {
            ToDo.saveToDo(todo)

            ToDo.clearToDo()
            
        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init(){
        ListToDo.all.forEach(function(todo, index){
            DOM.addToDo(todo, index)
        })

        Storage.set(ToDo.all)
    }, 

    reload(){
        DOM.clearToDo()
        App.init()
    }
}

App.init()
