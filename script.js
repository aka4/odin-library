const myLibrary = []
const mock1 = new Book("JK Rowling", "Harry Potter", 394, false)
const mock2 = new Book("JK Rowling", "Harry Potter", 394, false)
const mock3 = new Book("JK Rowling", "Harry Potter", 394, false)
myLibrary.push(mock1)
myLibrary.push(mock2)
myLibrary.push(mock3)




function Book(author, name, pageNumber, readStatus) {
    this.author = author
    this.name = name
    this.pageNumber = pageNumber
    this.readStatus = readStatus
}

//on form submit: constructs book instance, pushes into array, and calls function that handles DOM elements creation
function addToLibrary(author, name, pageNumber, readStatus) {
    //form value of readStatus converted from string to boolean
    let readStatusBool = readStatus == "true" ? true : false
    const newBook = new Book(author, name, pageNumber, readStatusBool)
    myLibrary.push(newBook)
    addToDisplay(newBook)
}

//changes the Read status in the HTML element as well as in the object when readButton is clicked
function changeReadStatus(bookElement) {
    // currentBookIndex-1 since Form div is included in Array
    let currentBookIndex = Array.from(bookElement.parentNode.children).indexOf(bookElement)
    myLibrary[currentBookIndex-1].readStatus = myLibrary[currentBookIndex-1].readStatus == true ? false : true
    bookElement.lastChild.previousSibling.innerText = myLibrary[currentBookIndex-1].readStatus == true ? "Read" : "Not Read"
    bookElement.lastChild.previousSibling.classList.toggle("not-read-style")
}

//removes Book object from Array and from DOM
function removeBook(bookElement) {
    let currentBookIndex = Array.from(bookElement.parentNode.children).indexOf(bookElement)
    myLibrary.splice(currentBookIndex-1, 1)
    bookElement.remove()
}

//creates DOM elements and corresponding EventListeners for new book (or initial array of books in displayLibrary)
function addToDisplay(book) {
    const bookContainer = document.querySelector(".book-container")
    let div = document.createElement("div")
    div.setAttribute("class", "book-item")
    let i = 0
    for (let property in book) {
        // if property is readStatus do not create paragraph
        if(i >= 3) {
            continue
        }
        let paragraph = document.createElement("p")
        paragraph.innerText = book[property]
        div.appendChild(paragraph)
        i++
    }

    let readButton = document.createElement("button")
    readButton.setAttribute("class", "readButton")
    readButton.innerText = book.readStatus == true ? "Read" : "Not Read"
    if (!book.readStatus) {
        readButton.classList.add("not-read-style")
    }
    readButton.addEventListener("click", function(e) {
        changeReadStatus(e.target.parentNode)
    })
    div.appendChild(readButton)

    let removeButton = document.createElement("button")
    removeButton.setAttribute("class", "removeButton")
    removeButton.innerText = "Remove Book"
    removeButton.addEventListener("click", function(e) {
        removeBook(e.target.parentNode)
    })
    div.appendChild(removeButton)

    bookContainer.appendChild(div)
}

//only called once to display initial books in array
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