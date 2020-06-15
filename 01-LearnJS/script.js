
var Listelement = document.querySelector('#app ul')
var Inputelement = document.querySelector('#app input')
var Buttonelement = document.querySelector('#app button')
var todos = JSON.parse(localStorage.getItem('list_todos')) ||[]


function renderTodo() {
    Listelement.innerHTML = ''
    for (todo of todos) {
        var todoElement = document.createElement('li')
        var todoText = document.createTextNode(todo)

        var stateTodo = todo.split('-')

        if (stateTodo[1] === "Editing") {
            var InputChanges = document.createElement('input')
            InputChanges.setAttribute('type', 'text')
            InputChanges.setAttribute('value',stateTodo[0])

            var LinkElementSave = document.createElement('a')
            var LinkTextSaving = document.createTextNode('Salvar')

            var LinkElementCancel = document.createElement('a')
            var LinkTextCancel = document.createTextNode('Cancelar')

            var pos = todos.indexOf(todo)

            LinkElementCancel.setAttribute('href', '#')

            LinkElementCancel.setAttribute('onclick', 'CancelTodo(' + pos + ')')

            LinkElementSave.setAttribute('href', '#')

            InputChanges.setAttribute('id', pos)

            LinkElementSave.setAttribute('onclick', 'SaveTodo(' + pos + ')')

            LinkElementSave.appendChild(LinkTextSaving)
            LinkElementCancel.appendChild(LinkTextCancel)

            todoElement.appendChild(InputChanges)
            todoElement.appendChild(LinkElementSave)
            todoElement.appendChild(LinkElementCancel)
            Listelement.appendChild(todoElement)
        } else {
            var LinkElement = document.createElement('a')
            var LinkText = document.createTextNode('Excluir')

            var LinkElementEditing = document.createElement('a')
            var LinkEditingText = document.createTextNode('Editar')

            LinkElementEditing.appendChild(LinkEditingText)

            var pos = todos.indexOf(todo)

            LinkElementEditing.setAttribute('href', '#')

            LinkElementEditing.setAttribute('onclick', 'EditTodo(' + pos + ')')


            LinkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')

            LinkElement.setAttribute('href', '#')

            LinkElement.appendChild(LinkText)


            todoElement.appendChild(todoText)
            todoElement.appendChild(LinkElement)
            todoElement.appendChild(LinkElementEditing)
            Listelement.appendChild(todoElement)
        }

    }
}

renderTodo()

Buttonelement.onclick = addTodo


function addTodo() {
    var todoText = Inputelement.value+'-'
    todos.push(todoText)
    Inputelement.value = ''
    renderTodo()
    SaveInStorage()

}

function deleteTodo(pos) {
    todos.splice(pos, 1)
    renderTodo()
    SaveInStorage()

}

function EditTodo(pos) {
    var todo = todos[pos]
    var stateTodo = todo.split('-')[1]
    console.log(stateTodo)
    if (stateTodo !== 'Editing') {
        todos[pos] = todo + 'Editing'
        renderTodo()
    }
}

function SaveTodo(pos) {
    var input = document.querySelector(`[id='${pos}']`)
    todos[pos] = input.value + '-'
    renderTodo()
    SaveInStorage()
}

function CancelTodo(pos) {
    var todo = todos[pos].split('-')[0]
    todos[pos] = todo + '-'
    renderTodo()
}

function SaveInStorage(){
    localStorage.setItem('list_todos',JSON.stringify(todos))
}



