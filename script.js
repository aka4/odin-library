const myLibrary = []
const mockBook = new Book("JK Rowling", "Harry Potter", 394, false)
myLibrary.push(mockBook)

function Book(author, name, pageNumber, readStatus) {
    this.author = author
    this.name = name
    this.pageNumber = pageNumber
    this.readStatus = readStatus
}

function addToLibrary(author, name, pageNumber, readStatus) {
    let readStatusBool = readStatus == "true" ? true : false
    const newBook = new Book(author, name, pageNumber, readStatusBool)
    myLibrary.push(newBook)
    addToDisplay(newBook)
}

function changeReadStatus(bookElement) {
    let currentBookIndex = Array.from(bookElement.parentNode.children).indexOf(bookElement)
    myLibrary[currentBookIndex-1].readStatus = !(myLibrary[currentBookIndex-1].readStatus)
    bookElement.lastChild.previousSibling.previousSibling.innerText = myLibrary[currentBookIndex-1].readStatus
}

function removeBook(bookElement) {
    let currentBookIndex = Array.from(bookElement.parentNode.children).indexOf(bookElement)
    myLibrary.splice(currentBookIndex-1, 1)
    bookElement.remove()
}


function addToDisplay(book) {
    const bookContainer = document.querySelector(".book-container")
    let div = document.createElement("div")
    div.setAttribute("class", "book-item")
    for (let property in book) {
        let paragraph = document.createElement("p")
        paragraph.innerText = book[property]
        div.appendChild(paragraph)
    }

    let readButton = document.createElement("button")
    readButton.setAttribute("id", "readButton")
    readButton.innerText = "Change Read Status"
    readButton.addEventListener("click", function(e) {
        changeReadStatus(e.target.parentNode)
    })
    div.appendChild(readButton)

    let removeButton = document.createElement("button")
    removeButton.setAttribute("id", "removeButton")
    removeButton.innerText = "Remove Book"
    removeButton.addEventListener("click", function(e) {
        removeBook(e.target.parentNode)
    })
    div.appendChild(removeButton)

    bookContainer.appendChild(div)
}

function displayLibrary() {
    myLibrary.forEach(book => {
        addToDisplay(book)
    })
}

document.getElementById("bookform").addEventListener("submit", function(e){
    e.preventDefault()

    let authorName = document.getElementById("author").value
    let bookName = document.getElementById("bookname").value
    let pages = document.getElementById("pages").value
    let readStatus = document.querySelector('input[name="readstatus"]:checked').value;
    addToLibrary(authorName, bookName, pages, readStatus)

    e.target.reset()
  });

displayLibrary()