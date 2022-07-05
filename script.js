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
}