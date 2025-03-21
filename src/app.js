console.log("hello world");

const todoInput = document.getElementById("todo-input");
const todoAddButton = document.getElementById("todo-add-button");
const todoListWrapper = document.getElementById("todo-list-wrapper");
const deleteButton = document.querySelectorAll(".delete-button");
const test = document.querySelectorAll(".todo-checkbox-invisible");
const todoItemsList = [];

loadFromLocalStorage();

function loadFromLocalStorage() {
	const keys = Object.keys(localStorage);
	keys.forEach((todoId) => {
		const todoInputValue = localStorage.getItem(todoId);
		const newTodoListItem = createListNode(todoId, todoInputValue);
		todoListWrapper.prepend(newTodoListItem);
	});
}

todoAddButton.addEventListener("click", () => {
	addTodoToList();
	todoInput.value = "";
});
todoInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		addTodoToList();
		todoInput.value = "";
	}
});

function addTodoToList() {
	const todoInputValue = todoInput.value.trim();
	if (todoInputValue === "") {
		return;
	}
	const todoId = self.crypto.randomUUID();
	const newTodoListItem = createListNode(todoId, todoInputValue);
	localStorage.setItem(todoId, todoInputValue);
	todoListWrapper.prepend(newTodoListItem);
	todoItemsList.push(todoInputValue);
}

function createListNode(todoId, todoInputValue) {
	const newTodoListItem = document.createElement("li");
	newTodoListItem.innerHTML = `
        <li tabindex="0" class="todo-list-item" data-todo-id=${todoId}>
            <input type="checkbox" id="todo-checkbox-${
							todoItemsList.length + 1
						}" class="todo-checkbox-invisible" />
			<label for="todo-checkbox-${todoItemsList.length + 1}" class="todo-icon-checkbox">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
					<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
				</svg>
			</label>
			<label for="todo-checkbox-${todoItemsList.length + 1}" class="todo-text">${todoInputValue}</label>
			<button class="delete-button">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
					<path
						d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
				</svg>
			</button>
        </li>
    `;
	const deleteButton = newTodoListItem.querySelector(".delete-button");
	deleteButton.addEventListener("click", (event) => {
		localStorage.removeItem(todoId);
		todoListWrapper.removeChild(newTodoListItem);
	});
	return newTodoListItem;
}
