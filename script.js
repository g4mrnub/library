let myLibrary = [
  ];

const libraryContainer = document.querySelector('#library');
const overlayContainer = document.querySelector('body');

function BookOverlord(){
}

BookOverlord.prototype.readStatusToggle = function(){
  if (!this.read) {
    this.read = true;
  }else{
    this.read = false;
  }
}

function Book(title, author, pages) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  let read = false;
}

Book.prototype = Object.create(BookOverlord.prototype);

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

/*let findArrayBook = function(library, domBook){ //loops through whole library array
  let bookIndex = null;
  for(let i = 0; i<library.length;i++){
    if(library[i].title == domBook.title){ //domBook NEEDS A DATA KEY INSTEAD BECAUSE p ELEMENTS IN NORMAL DIVS ARE ANONYMOUS WITHOUT IDs
                                            //so it doesn't even know what "title" property is since it doesn't have a "name" value.
                                            //I PASSED AN ARRAY OBJECT NOT DOM OBJECT INTO book argument last time because
                                            //its array index was inside a for loop iteration and not globally scoped.
                                            //I need to still pass an arrayBook instead then but find it with the data key attribute
                                            //and use that in the book array index
      bookIndex = i;
    }
  }
  return library[bookIndex];
}
*/

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
  let bookIndex = 0;
  library.forEach(book => {
    const bookDisplay = document.createElement("div");
    bookDisplay.classList.add('bookDisplay');
    const bookContentGrid = document.createElement("div");
    bookContentGrid.classList.add('bookContentGrid');

    bookDisplay.setAttribute('data-id', `${bookIndex}`);
    bookIndex += 1;

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
    bookDisplay.addEventListener('click', (event) => {
      if(event.target == readBox){
        book.readStatusToggle();
      }

      //OKAY GOT IT.
      /* ((rn I find array books by matching DOM and object VALUES) this time I assign new 
        books KEYS and match datakeys to array indices. I display books one at time,)=OPTIONAL ACTUALLY.
        I delegate the "find array book" to a separate function which returns the book object inside the array, so the "book" can be found
        in a global context instead of the for loop where scope is lost in callback function.
        findArrayBook(myLibrary, event.currentTarget).readStatusToggle();

        okay you don't need the findArray function if you just use the datakey from the dom element inside the library array index
        myLibrary[event.currentTarget.getAttribute('data-id')].readStatusToggle();

        WOW LOL the "readStatusToggle() is not a function" error was from my hardcoded book cards that weren't constructed
        with the constructor/protype function assignment. The scope of the event listener callback was completely fine...
        It at least got me to make a real protype chain with correct memory use of the function but the data-id was not needed or 
        my attempt at the findArrayBook function.
      */
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add('x');
    removeButton.textContent = "X";
    removeButton.addEventListener('click', () => {
      removeBookfromLibrary(myLibrary, book);
    });

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