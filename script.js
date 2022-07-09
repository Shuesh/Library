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

    addBookToDOM(newBook);

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
    
        // Read Status toggle button
        const newReadStatus = document.createElement('button');
        newReadStatus.textContent = `${book.readStatus}`;
        newReadStatus.classList.add('book-readStatus');
        if(book.readStatus == 'Read'){
            newReadStatus.classList.add('read');
        }
        else {
            newReadStatus.classList.add('unread');
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('removeButton');
    
        // Append what has been made
        div.appendChild(newTitle);
        div.appendChild(newAuthor);
        div.appendChild(newPages);
        div.appendChild(newReadStatus);
        div.appendChild(removeButton);
        newEntry.appendChild(div);
    
        // Apply class styling
        newEntry.classList.add('col-sm-3');
        newEntry.classList.add('g-4');
        div.classList.add('book');
        cardContainer.appendChild(newEntry);

        addReadStatusListener(newReadStatus);
        addRemoveListener(removeButton);
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

    // Check if the book already exists in the library
    // .every() goes until it receives a false value, then quits the loop

    myLibrary.every(book => {
        if (title.value.toLowerCase() === book.title.toLowerCase() && author.value.toLowerCase() === book.author.toLowerCase() && Number(pages.value) === book.pages){
            errorFlag = true;
            title.classList.add("missing-info");
            author.classList.add("missing-info");
            pages.classList.add("missing-info");
            return false;
        }

        return true;
    });

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
    myLibrary.forEach ((book) => {
        addBookToDOM(book);
    });
}


function toggleReadStatus(){
    // Toggle DOM readStatus
    if (this.textContent === "Read"){
        this.textContent = "Not Read";
        this.classList.remove("read");
        this.classList.add("unread");
    }
    else {
        this.textContent = "Read";
        this.classList.remove("unread");
        this.classList.add("read");
    }

    // Update library array
    let parent = this.parentElement
    myLibrary.forEach(book => {
        if (book.title == parent.children[0].textContent && ('by ' + book.author) == parent.children[1].textContent && (book.pages + ' pages') == parent.children[2].textContent){
                book.readStatus = this.textContent;
        }
    });

}


function removeBook(){
    // console.log(`Remove ${this.parentElement.child[0].value}`);
    let parent = this.parentElement
    // DOM
    parent.parentElement.parentElement.removeChild(parent.parentElement);

    // myLibrary array
    for (let i = 0; i < myLibrary.length; i++){        
        if (myLibrary[i].title == parent.children[0].textContent && ('by ' + myLibrary[i].author) == parent.children[1].textContent && (myLibrary[i].pages + ' pages') == parent.children[2].textContent){
                myLibrary.splice(i,1);
        }
    };
}



// ~~~~~Event Listeners~~~~~

// Add event listener to the "Add Book" button in the footer
let addBookButton = document.getElementById('addBook');
addBookButton.addEventListener("click", verifyFields);

// On window load, append all books in the library
window.onload = appendAllBooks;

// Add event listener to Read/Not read buttons
function addReadStatusListener(button){
    button.addEventListener("click", toggleReadStatus);
}

// Add event listener to Remove buttons
function addRemoveListener(button){
    button.addEventListener("click", removeBook);
}