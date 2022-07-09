// Pre-initialized books. This is the library
let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tokien',
        pages: 295,
        readStatus: 'Not read'
    },
    {
        title: 'The Bible',
        author: 'God',
        pages: 2000,
        readStatus: 'Read'
    },
    {
        title: 'Moby Dick',
        author: 'Herman Melville',
        pages: 500,
        readStatus: 'Not read'
    },
    {
        title: 'Atlas Shrugged',
        author: 'Ayn Rand',
        pages: 750,
        readStatus: 'Read'
    }
];


// Book object creator
function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;

    if (readStatus){
        this.readStatus = 'Read';
    } else {
        this.readStatus = 'Not read';
    }

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages; ${this.readStatus}`;
    }
}


function addBookToLibrary(title, author, pages, readStatus){
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);

    addBookToDOM(newBook)

    // Clear input fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('readStatus').checked = false;
}


function addBookToDOM (book){
        // Get/make main containers
        const cardContainer = document.getElementById('card-container');
        const newEntry = document.createElement('li');
        const div = document.createElement('div');
    
        // Create paragraph elements and text for each info
        const newTitle = document.createElement('p');
        newTitle.textContent = `${book.title}`;
        newTitle.classList.add('book-title');
    
        const newAuthor = document.createElement('p');
        newAuthor.textContent = `by ${book.author}`;
        newAuthor.classList.add('book-author');
    
        const newPages = document.createElement('p');
        newPages.textContent = `${book.pages} pages`;
        newPages.classList.add('book-pages');
    
        // Make into a button
        const newReadStatus = document.createElement('button');
        newReadStatus.textContent = `${book.readStatus}`;
        newReadStatus.classList.add('book-readStatus');
        if(book.readStatus == 'Read'){
            newReadStatus.classList.add('read');
        }
        else {
            newReadStatus.classList.add('unread');
        }
    
        // Append what has been made
        div.appendChild(newTitle);
        div.appendChild(newAuthor);
        div.appendChild(newPages);
        div.appendChild(newReadStatus);
        newEntry.appendChild(div);
    
        // Apply class styling
        newEntry.classList.add('col-sm-3');
        newEntry.classList.add('g-4');
        div.classList.add('book');
        cardContainer.appendChild(newEntry);
}


function verifyFields(){
    // Get DOM elements
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let readStatus = document.getElementById('readStatus').checked;

    // Set flag to false for check at the end
    errorFlag = false;

    // Check that title contains any string
    if (!title.value){
        title.classList.add("missing-info");
        errorFlag = true;
    }
    else {
        title.classList.remove("missing-info");
    }

    // Check that author contains any string
    if (!author.value){
        author.classList.add("missing-info");
        errorFlag = true;
    }
    else {
        author.classList.remove("missing-info");
    }

    // Check that pages contains an integer
    if (!pages.value || !Number.isInteger(Number(pages.value))){
        pages.classList.add("missing-info");
        errorFlag = true;
    }
    else {
        pages.classList.remove("missing-info");
    }

    // If no errors from the above, add the book to our library
    if (!errorFlag){
        addBookToLibrary(title.value, author.value, pages.value, readStatus);
    }

}


// Start by appending all books already present in the library
function appendAllBooks(){
    // Get the main container element
    const cardContainer = document.getElementById("card-container");

    // Loop through each book in the library
    for (let i = 0; i < 12; i++){
    myLibrary.forEach ((book) => {
        addBookToDOM(book);
    });}
}


// Add event listener to the "Add Book" button in the footer
let addBookButton = document.getElementById('addBook');
addBookButton.addEventListener("click", verifyFields);

// On window load, append all books in the library
window.onload = appendAllBooks;