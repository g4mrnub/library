let myLibrary = [
    {
    title:"titular title",
    author:"Authorson",
    pages:2
    },
    {
    title:"Sequel 2",
    author:"Hack",
    pages:3
    }
  ];

const libraryContainer = document.querySelector('#library');
const overlayContainer = document.querySelector('body');

function Book(title, author, pages) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(){
  
    let  formData = document.getElementById("bookForm"); //grab form from DOM

    let bookName = formData.title.value;
    let bookAuthor = formData.author.value;
    let bookPages = formData.pages.value;
    let bookRead = false;

    let book1 = new Book(bookName, bookAuthor, bookPages); //make new book object from form DOM data

  myLibrary.push(book1); //push that onto an array stack of book objects
}

let removeBookfromLibrary = function(library, book){ //loops through whole library array
  let removalIndex = null;
  for(let i = 0; i<library.length;i++){
    if(library[i].title == book.title){ //finds matching title and index
      removalIndex = i;
    }
  }
  library.splice(removalIndex,1); //removes that index
  displayLibrary(myLibrary);
}

function readStatusToggle(library, book){
  let removalIndex = null;
  for(let i = 0; i<library.length;i++){
    if(library[i].title == book.title){
      if(library[i].read = true){library[i].read = false}
      else{library[i].read = true};
    };
  };
}

function addBookForm() {
  
  const bookForm = document.createElement("form");
  bookForm.setAttribute("id","bookForm"); 
  bookForm.classList.add('bookForm');

  const bookTitle = document.createElement("label");
  bookTitle.setAttribute("for","title"); 
  bookTitle.textContent = "BOOK TITLE:";
  const bookTitleBox = document.createElement("input");
  bookTitleBox.setAttribute('type',"text");
  bookTitleBox.setAttribute('name',"title"); 

  const bookAuthor = document.createElement("label");
  bookAuthor.setAttribute('for',"author"); 
  bookAuthor.textContent = "BOOK Author:";
  const bookAuthorBox = document.createElement("input");
  bookAuthorBox.setAttribute('type',"text"); 
  bookAuthorBox.setAttribute('name',"author"); 

  const bookPages = document.createElement("label");
  bookPages.setAttribute('for',"pages"); 
  bookPages.textContent = "Page Count:";
  const bookPagesBox = document.createElement("input");
  bookPagesBox.setAttribute('type',"text"); 
  bookPagesBox.setAttribute('name',"pages"); 

  const submit = document.createElement("BUTTON");
  submit.setAttribute('type',"submit"); 
  submit.textContent = "SUBMIT";
  submit.addEventListener('click', (event) => {
    addBookToLibrary();
    displayLibrary(myLibrary);
    bookForm.parentNode.removeChild(bookForm);
  });
  overlayContainer.appendChild(bookForm);
  bookForm.append(bookTitle, bookTitleBox, bookAuthor, bookAuthorBox, bookPages, bookPagesBox, submit);
}

function displayLibrary(library){
  libraryContainer.innerHTML = ""; //clear and refresh content
  library.forEach(book => {
    const bookDisplay = document.createElement("div");
    bookDisplay.classList.add('bookDisplay');
    const bookTitle = document.createElement("p");
    bookTitle.textContent = `Title: ${book.title}`;
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;
    const bookPages = document.createElement("p");
    bookPages.textContent = `Pages: ${book.pages}`;

    const bookRead = document.createElement("p");
    bookRead.textContent = "Read:";
    const readBox = document.createElement("input");
    readBox.setAttribute('type',"checkbox"); 
    readBox.addEventListener('click', () => {
      readStatusToggle(myLibrary, book);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.addEventListener('click', () => {
      removeBookfromLibrary(myLibrary, book);
    });

    libraryContainer.appendChild(bookDisplay);
    bookDisplay.appendChild(bookTitle);
    bookDisplay.appendChild(bookAuthor);
    bookDisplay.appendChild(bookPages);
    bookDisplay.appendChild(removeButton);
    bookDisplay.appendChild(bookRead);
    bookDisplay.appendChild(readBox);

  });

}