let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tokien',
        pages: 295,
        readStatus: 'not read yet'
    },
    {
        title: 'The Bible',
        author: 'God',
        pages: 2000,
        readStatus: 'has been read'
    }
];


function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;

    if (readStatus){
        this.readStatus = 'has been read';
    } else {
        this.readStatus = 'not read yet';
    }

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages; ${this.readStatus}`;
    }
}


function addBookToLibrary(title, author, pages, readStatus){
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    document.getElementById('card-container').innerHTML = '';
    appendAllBooks();
}


function verifyFields(){
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let readStatus = document.getElementById('readStatus').checked;

    errorFlag = false;

    if (!title.value){
        title.classList.add("missing-info");
        errorFlag = true;
    }
    else {
        title.classList.remove("missing-info");
    }
    if (!author.value){
        author.classList.add("missing-info");
        errorFlag = true;
    }
    else {
        author.classList.remove("missing-info");
    }
    if (!pages.value || !Number.isInteger(Number(pages.value))){
        pages.classList.add("missing-info");
        errorFlag = true;
    }
    else {
        pages.classList.remove("missing-info");
    }

    if (!errorFlag){
        addBookToLibrary(title.value, author.value, pages.value, readStatus);
    }

}


function appendAllBooks(){
    let cardContainer = document.getElementById("card-container");
    myLibrary.forEach ((book) => {
        let newBook = document.createElement("p");
        let text = document.createTextNode(`${book.title} by ${book.author}, ${book.pages} pages, ${book.readStatus}`);
        newBook.appendChild(text);
        cardContainer.appendChild(newBook);
    });
}



let addBookButton = document.getElementById('addBook');
addBookButton.addEventListener("click", verifyFields);

window.onload = appendAllBooks;