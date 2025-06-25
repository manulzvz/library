// DOM Objects Selection
const library = document.querySelector("#library");
const addBookBtn = document.querySelector("[data-open-modal]"); // The "Add Book" button
const modal = document.querySelector("[data-modal]"); // The <dialog> element
const closeModalBtn = document.querySelector("[data-close-modal]"); // The 'X' button inside the modal
const addBookForm = document.querySelector("#addBookForm"); // The form itself

// Library Array
const myLibrary = [];

// SVG Variables (these remain global as they are constants)
const svgBook = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m51.422 38.059v18.199h-2.8398v-18.199h-2.8398v-2.8398h-19.656v2.8398h-2.8398v26.727h25.336v-2.8398h-2.8398l-0.003907-2.8438h2.8398v2.8398h2.8398l0.003906-2.8398h2.8398v2.8398h-2.8398v2.8398h28.176l-0.003906-23.883h-5.6797v15.359h-19.656v2.8398h16.816v-26.723h-16.816v2.8398h-2.8398zm-8.5273 8.4961v2.8398h2.8398v2.8398h-2.8398v-2.8398h-9.3789v-2.8398zm0-7.3164v2.8398h2.8398v2.8398h-2.8398v-2.8398h-9.3789v-2.8398zm14.211 7.3164h9.3789v2.8398h-9.3789v2.8398h-2.8398v-2.8398h2.8398zm0-7.3164h9.3789v2.8398h-9.3789v2.8398h-2.8398v-2.8398h2.8398zm-33.859 25.547h-2.8477v-23.887h5.6797v15.359h19.656v2.8398l-16.809 0.003906v-26.727h16.816v2.8398h2.8398v2.8398h5.6797v-2.8398h19.656v2.8398h2.8398l-0.003906 2.8438v26.727h-53.516v-2.8398z" fill-rule="evenodd"/>
</svg>`;
const svgRead = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m15 19.992h-5v5.0039h5z"/>
 <path d="m85 19.992v5.0039h5v-5.0039z"/>
 <path d="m10 24.992h-5v20.008h5z"/>
 <path d="m90 24.992v20.008h5l-0.003906-20.008h-5z"/>
 <path d="m5 45h-5v10.004h5z"/>
 <path d="m55 45h-10v5.0039h10z"/>
 <path d="m100 45h-5v10.004h5z"/>
 <path d="m35 50.004h-25v5.0039h25z"/>
 <path d="m45 50.004h-5v5.0039h5z"/>
 <path d="m60 55.004v-5.0039h-5v5.0039z"/>
 <path d="m90 50.004h-25v5.0039h25z"/>
 <path d="m10 75.012v-20.008h-5v20.008z"/>
 <path d="m40 75.012v-20.008h-5v20.008z"/>
 <path d="m64.996 75.012v-20.008h-5v20.008z"/>
 <path d="m95 75.012v-20.008h-5v20.008z"/>
 <path d="m25 60.004h-5v5.0039h5z"/>
 <path d="m80 60.004h-5v5.0039h5z"/>
 <path d="m20 65.004h-5v5.0039h5z"/>
 <path d="m75 65.004h-5v5.0039h5z"/>
 <path d="m10 80.008h25v-5.0039l-25 0.003906v5.0039z"/>
 <path d="m64.996 80.008h25v-5.0039h-25z"/>
</svg>`;
const svgDelete = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m35.297 0v11.766h-11.762v5.8828h52.922v-5.8828h-11.762v-11.766h-29.402zm23.52 11.766h-17.641v-5.8828h17.641z"/>
 <path d="m23.535 23.527v-5.8828h-5.8789v11.766h5.8789v64.707h5.8789v-64.703h41.16v64.707h5.8789v-64.707h5.8789v-11.766h-5.8789v5.8828z"/>
 <path d="m35.297 88.238h5.8789v-47.059h-5.8789z"/>
 <path d="m47.062 88.238h5.8789v-47.059h-5.8789z"/>
 <path d="m58.816 88.238h5.8789v-47.059h-5.8789z"/>
 <path d="m29.418 100h41.16v-5.8828h-41.16z"/>
</svg>`;

// Book Class - this is a blueprint for each book object
class Book {
  constructor(name, author, pages, read) {
    this.id = crypto.randomUUID(); // UNIQUE ID IS CRUCIAL FOR MANAGEMENT
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Function to create book and store it in the global array
// This remains a function because it directly interacts with the global `myLibrary` array
function addBookToLibrary(name, author, pages, read) {
  const newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
}

// Adding manually some books for easier testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);

// Function that loops through the array and displays each book on the page
function displayBooks() {
  const addBtn = document.querySelector(".open-modal-btn");
  // Temporarily move the button out of the way
  addBtn.remove();
  // Clear book cards
  library.innerHTML = "";
  // Re-insert the button
  library.appendChild(addBtn);
  for (const book of myLibrary) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.dataset.bookId = book.id;

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = book.name;

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("img");
    imageDiv.innerHTML = svgBook;

    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btns");

    const readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    readBtn.innerHTML = svgRead;

    if (book.read) {
      readBtn.classList.add("read-true");
    } else {
      readBtn.classList.add("read-false");
    }

    readBtn.addEventListener("click", () => {
      toggleReadStatus(book.id); // Pass the book's ID
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = svgDelete;

    deleteBtn.addEventListener("click", () => {
      removeBook(book.id); // Pass the book's ID
    });

    btnsDiv.appendChild(readBtn);
    btnsDiv.appendChild(deleteBtn);

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(imageDiv);
    bookDiv.appendChild(btnsDiv);

    library.appendChild(bookDiv);
  }
}

// --- Modal Functionality ---

function openModal() {
  modal.showModal();
  addBookForm.reset(); // Reset form fields when modal opens
}

function closeModal() {
  modal.close();
}

// --- Form Submission Handler ---
function handleFormSubmit(event) {
  // Prevent default form submission if you want to handle it entirely client-side
  // event.preventDefault(); // If you want to keep the modal open for validation, uncomment this.

  const name = addBookForm.elements.bookName.value;
  const author = addBookForm.elements.bookAuthor.value;
  const pages = parseInt(addBookForm.elements.bookPages.value);
  const read = addBookForm.elements.bookRead.checked;

  addBookToLibrary(name, author, pages, read); // Call the function to add book

  displayBooks(); // Re-render the library with the new book

}

// --- Book Management Functions ---

function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks(); // Re-render the library
  }
}

function toggleReadStatus(bookId) {
  const bookToToggle = myLibrary.find((book) => book.id === bookId);

  if (bookToToggle) {
    bookToToggle.read = !bookToToggle.read;
    displayBooks(); // Re-render the library
  }
}

// --- Event Listeners ---
addBookBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
addBookForm.addEventListener("submit", handleFormSubmit);

// Initial display of books when script loads
displayBooks();
