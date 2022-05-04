let myLibrary = [
    {
    title:"New IP",
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
  let read = false;
}

Book.prototype.readStatusToggle = function(){
  /*let removalIndex = null;
  for(let i = 0; i<library.length;i++){
    if(library[i].title == book.title){
      if(library[i].read = true){library[i].read = false}
      else{library[i].read = true}; 
    };
  };*/

  if (!this.read) {
    this.read = true;
    console.log("I AM FUCKING READ");
  }else{
    this.read = false;
  }
}

function addBookToLibrary(formData){
  
    //let  formData = document.getElementById("bookForm"); //grab form from DOM

    let bookName = formData.title.value;
    let bookAuthorLabel = formData.author.value;
    let bookPagesLabel = formData.pages.value;

    let book1 = new Book(bookName, bookAuthorLabel, bookPagesLabel); //make new book object from form DOM data
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

function addBookForm() {
  
  const bookForm = document.createElement("form");
  bookForm.setAttribute("id","bookForm"); 
  bookForm.classList.add('bookForm');

  const bookTitleLabel = document.createElement("label");
  bookTitleLabel.setAttribute("for","title"); 
  bookTitleLabel.textContent = "BOOK TITLE:";
  const bookTitleBox = document.createElement("input");
  bookTitleBox.setAttribute('type',"text");
  bookTitleBox.setAttribute('name',"title"); 

  const bookAuthorLabel = document.createElement("label");
  bookAuthorLabel.setAttribute('for',"author"); 
  bookAuthorLabel.textContent = "BOOK Author:";
  const bookAuthorBox = document.createElement("input");
  bookAuthorBox.setAttribute('type',"text"); 
  bookAuthorBox.setAttribute('name',"author"); 

  const bookPagesLabel = document.createElement("label");
  bookPagesLabel.setAttribute('for',"pages"); 
  bookPagesLabel.textContent = "Page Count:";
  const bookPagesBox = document.createElement("input");
  bookPagesBox.setAttribute('type',"text"); 
  bookPagesBox.setAttribute('name',"pages"); 

  const submit = document.createElement("BUTTON");
  submit.setAttribute('type',"submit"); 
  submit.textContent = "SUBMIT";
  submit.addEventListener('click', (event) => {
    addBookToLibrary(event.target.parentNode);
    displayLibrary(myLibrary);
    bookForm.parentNode.removeChild(bookForm);
  });
  overlayContainer.appendChild(bookForm);
  bookForm.append(
    bookTitleLabel, 
    bookTitleBox, 
    bookAuthorLabel, 
    bookAuthorBox, 
    bookPagesLabel, 
    bookPagesBox, 
    submit);
}

function displayLibrary(library){
  libraryContainer.innerHTML = ""; //clear and refresh content
  library.forEach(book => {
    const bookDisplay = document.createElement("div");
    bookDisplay.classList.add('bookDisplay');
    const bookContentGrid = document.createElement("div");
    bookContentGrid.classList.add('bookContentGrid');

    const bookTitleLabel = document.createElement("p");
    bookTitleLabel.classList.add('title');
    bookTitleLabel.textContent = `Title:`;
    const bookTitle = document.createElement("p");
    bookTitle.classList.add('title');
    bookTitle.textContent = `${book.title}`;

    const bookAuthorLabel = document.createElement("p");
    bookAuthorLabel.textContent = `Author:`;
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `${book.author}`;

    const bookPagesLabel = document.createElement("p");
    bookPagesLabel.textContent = `Pages:`;
    const bookPages = document.createElement("p");
    bookPages.textContent = `${book.pages}`;

    const bookRead = document.createElement("p");
    bookRead.textContent = "Read:";
    const readBox = document.createElement("input");
    readBox.setAttribute('type',"checkbox"); 
    if (book.read == true){
      readBox.setAttribute('checked', ""); 
    }
    readBox.addEventListener('click', () => {
      /*book.readStatusToggle(); // this function is not a function of book */
      console.log(book); //OKAY try: creating a whole new child of prototype book that has all the "this." info, the book prototype only having the function of ReadStatusToggle
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add('x');
    removeButton.textContent = "X";
    removeButton.addEventListener('click', () => {
      removeBookfromLibrary(myLibrary, book);
    });

    /*libraryContainer.appendChild(bookDisplay);
    bookDisplay.appendChild(bookTitleLabel);
    bookDisplay.appendChild(bookAuthorLabel);
    bookDisplay.appendChild(bookPagesLabel);
    bookDisplay.appendChild(bookRead);
    bookDisplay.appendChild(readBox);
    bookDisplay.appendChild(removeButton);*/
    libraryContainer.appendChild(bookDisplay)
    bookDisplay.appendChild(bookContentGrid);
    bookContentGrid.append(
      bookTitleLabel,
      bookTitle,
      bookAuthorLabel,
      bookAuthor,
      bookPagesLabel,
      bookPages,
      bookRead,
      readBox,
    );
    bookDisplay.appendChild(removeButton);
  });

}