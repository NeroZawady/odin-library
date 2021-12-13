const tableBody = document.querySelector("tbody");
const buttonNewBook = document.querySelector("#newBook");
const formContainer = document.querySelector("#formContainer");
const form = document.querySelector("#form");
const buttonCancel = document.querySelector("#cancel");
const buttonSubmit = document.querySelector("#submit");
const books = [];

class Book {
    constructor(title, author, pages, read, tr) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.tr = tr;
    }
}

initilizeBooks();

function initilizeBooks() {
    books.push(new Book("Title 1", "Author 1", 1, false, document.createElement("tr")));
    books.push(new Book("Title 2", "Author 2", 2, true, document.createElement("tr")));
    books.push(new Book("Title 3", "Author 3", 3, false, document.createElement("tr")));

    for(let book of books) {
        addBookToDOM(book);
    }
}

function addBookToDOM(book) {
    let elements = createBookElements();
    setBookElementsContent(book, elements);
    addElementsToBook(book, elements);

    elements.checkbox.addEventListener("change", () => (book.read = !book.read));
    elements.buttonRemove.addEventListener("click", () => {
        book.tr.remove();
        books.splice(books.indexOf(book), 1);
    });

    tableBody.appendChild(book.tr);
}

function createBookElements() {
    let title = document.createElement("td");
    let author = document.createElement("td");
    let pages = document.createElement("td");
    let read = document.createElement("td");
    let checkbox = document.createElement("input");
    let remove = document.createElement("td");
    let buttonRemove = document.createElement("button");

    return {title, author, pages, read, checkbox, remove, buttonRemove};
}

function setBookElementsContent(book, elements) {
    elements.title.textContent = book.title;
    elements.author.textContent = book.author;
    elements.pages.textContent = book.pages;
    elements.checkbox.setAttribute("type", "checkbox");
    elements.checkbox.checked = book.read;
    elements.buttonRemove.textContent = "X";
}

function addElementsToBook(book, elements) {
    book.tr.appendChild(elements.title);
    book.tr.appendChild(elements.author);
    book.tr.appendChild(elements.pages);
    book.tr.appendChild(elements.read);
    elements.read.appendChild(elements.checkbox);
    book.tr.appendChild(elements.remove);
    elements.remove.appendChild(elements.buttonRemove);
}

buttonNewBook.addEventListener("click", () => {
    formContainer.style.display = "block";
})

buttonCancel.addEventListener("click", () => {
    formContainer.style.display = "none";
})

window.onclick = (event) => {
    if(event.target == formContainer) {
        formContainer.style.display = "none";
    }
}

form.addEventListener("submit", () => {
    books.push(new Book(form.querySelector("#title").value,
                        form.querySelector("#author").value,
                        +form.querySelector("#pages").value,
                        form.querySelector("#read").checked,
                        document.createElement("tr")));

    addBookToDOM(books[books.length - 1]);

    formContainer.style.display = "none";
    form.reset();

    event.preventDefault();
})

