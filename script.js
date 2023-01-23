let myLibrary = [];

const libraryContainer = document.querySelector("#library");
const overlayContainer = document.querySelector("body");

class Book {
  constructor(title, author, pages) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    let read = false;
  }

  readStatusToggle = function () {
    if (!this.read) {
      this.read = true;
    } else {
      this.read = false;
    }
  };
}

function addBookToLibrary(formData) {
  //let  formData = document.getElementById("bookForm"); //grab form from DOM

  let bookName = formData.title.value;
  let bookAuthorLabel = formData.author.value;
  let bookPagesLabel = formData.pages.value;

  let book1 = new Book(bookName, bookAuthorLabel, bookPagesLabel); //make new book object from form DOM data
  myLibrary.push(book1); //push that onto an array stack of book objects
}

let removeBookfromLibrary = function (library, book) {
  //loops through whole library array
  let removalIndex = null;
  for (let i = 0; i < library.length; i++) {
    if (library[i].title == book.title) {
      //finds matching title and index
      removalIndex = i;
    }
  }
  library.splice(removalIndex, 1); //removes that index
  displayLibrary(myLibrary);
};

function addBookForm() {
  const filter = document.createElement("div");
  filter.classList.add("filter");

  const bookForm = document.createElement("form");
  bookForm.setAttribute("id", "bookForm");
  bookForm.classList.add("bookForm");

  const bookTitleLabel = document.createElement("label");
  bookTitleLabel.setAttribute("for", "title");
  bookTitleLabel.textContent = "Book Title:";
  const bookTitleBox = document.createElement("input");
  bookTitleBox.setAttribute("type", "text");
  bookTitleBox.setAttribute("name", "title");
  bookTitleBox.setAttribute("required", "");

  const bookAuthorLabel = document.createElement("label");
  bookAuthorLabel.setAttribute("for", "author");
  bookAuthorLabel.textContent = "Book Author:";
  const bookAuthorBox = document.createElement("input");
  bookAuthorBox.setAttribute("type", "text");
  bookAuthorBox.setAttribute("name", "author");
  bookAuthorBox.setAttribute("required", "");

  const bookPagesLabel = document.createElement("label");
  bookPagesLabel.setAttribute("for", "pages");
  bookPagesLabel.textContent = "Page Count:";
  const bookPagesBox = document.createElement("input");
  bookPagesBox.setAttribute("type", "number");
  bookPagesBox.setAttribute("name", "pages");
  bookPagesBox.setAttribute("required", "");

  const submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.classList.add("addBook");
  submit.textContent = "SUBMIT";
  bookForm.addEventListener("submit", (event) => {
    addBookToLibrary(event.currentTarget);
    displayLibrary(myLibrary);
    bookForm.parentNode.removeChild(bookForm);
    filter.parentNode.removeChild(filter);
  });

  overlayContainer.appendChild(filter);
  overlayContainer.appendChild(bookForm);
  bookForm.append(
    bookTitleLabel,
    bookTitleBox,
    bookAuthorLabel,
    bookAuthorBox,
    bookPagesLabel,
    bookPagesBox,
    submit
  );
}

function displayLibrary(library) {
  libraryContainer.innerHTML = ""; //clear and refresh content
  let bookIndex = 0;
  library.forEach((book) => {
    const bookDisplay = document.createElement("div");
    bookDisplay.classList.add("bookDisplay");
    const bookContentGrid = document.createElement("div");
    bookContentGrid.classList.add("bookContentGrid");

    bookDisplay.setAttribute("data-id", `${bookIndex}`);
    bookIndex += 1;

    const bookTitleLabel = document.createElement("p");
    bookTitleLabel.classList.add("title");
    bookTitleLabel.textContent = `Title:`;
    const bookTitle = document.createElement("p");
    bookTitle.classList.add("title");
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
    readBox.setAttribute("type", "checkbox");
    if (book.read == true) {
      readBox.setAttribute("checked", "");
    }
    bookDisplay.addEventListener("click", (event) => {
      if (event.target == readBox) {
        book.readStatusToggle();
      }
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("x");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", () => {
      removeBookfromLibrary(myLibrary, book);
    });

    libraryContainer.appendChild(bookDisplay);
    bookDisplay.appendChild(bookContentGrid);
    bookContentGrid.append(
      bookTitleLabel,
      bookTitle,
      bookAuthorLabel,
      bookAuthor,
      bookPagesLabel,
      bookPages,
      bookRead,
      readBox
    );
    bookDisplay.appendChild(removeButton);
  });
}
