// DOM Objects Selection (these remain global as they are entry points)
const libraryDiv = document.querySelector("#library"); // Renamed for clarity to avoid conflict with `library` property in class
const addBookBtn = document.querySelector("[data-open-modal]");
const modal = document.querySelector("[data-modal]");
const closeModalBtn = document.querySelector("[data-close-modal]");
const addBookForm = document.querySelector("#addBookForm");

// SVG Variables (these remain global as they are static assets)
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

// 1. Book Class (Data Model)
class Book {
  constructor(name, author, pages, read) {
    this.id = crypto.randomUUID(); // Unique ID for each book instance
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  // Method to toggle read status on the book instance itself
  toggleRead() {
    this.read = !this.read;
  }
}

// 2. LibraryManager Class (Manages the collection and UI)
class LibraryManager {
  constructor(libraryContainerElement, modalElement, formElement, addBookButton, closeModalButton) {
    this.books = []; // The array to hold all book objects
    this.libraryContainer = libraryContainerElement; // The #library div
    this.modal = modalElement;
    this.form = formElement;
    this.addBookButton = addBookButton;
    this.closeModalButton = closeModalButton;

    this.init(); // Call an initialization method
  }

  // Initialize event listeners and initial display
  init() {
    this.addBookButton.addEventListener("click", () => this.openModal());
    this.closeModalButton.addEventListener("click", () => this.closeModal());
    this.form.addEventListener("submit", (event) => this.handleFormSubmit(event));

    // Add some initial books for testing
    this.addBook("The Hobbit", "J.R.R. Tolkien", 310, true);
    this.addBook("1984", "George Orwell", 328, false);
    this.addBook("Dune", "Frank Herbert", 412, true);
    this.addBook("To Kill a Mockingbird", "Harper Lee", 281, false);

    this.displayBooks(); // Initial display
  }

  // Adds a new book instance to the collection
  addBook(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    this.books.push(newBook);
    // No displayBooks() call here, it will be called after form submission
  }

  // Removes a book by its ID
  removeBook(bookId) {
    const initialLength = this.books.length;
    this.books = this.books.filter(book => book.id !== bookId);
    if (this.books.length < initialLength) { // Only re-display if a book was actually removed
      this.displayBooks();
    }
  }

  // Toggles the read status of a book by its ID
  toggleReadStatus(bookId) {
    const bookToToggle = this.books.find(book => book.id === bookId);
    if (bookToToggle) {
      bookToToggle.toggleRead(); // Use the Book class's method
      this.displayBooks();
    }
  }

  // Renders all books in the collection to the DOM
  displayBooks() {
    // Clear all current content inside the library div
    this.libraryContainer.innerHTML = "";

    // Append the "Add Book" button back to the library div first
    // This places it before all the book cards in the grid.
    this.libraryContainer.appendChild(this.addBookButton);

    // Loop through each book and create its card
    this.books.forEach(book => { // Use forEach for cleaner iteration
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");
      bookDiv.dataset.bookId = book.id; // Store book ID

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
      // Use arrow function to preserve `this` context for class methods
      readBtn.addEventListener("click", () => this.toggleReadStatus(book.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.innerHTML = svgDelete;
      // Use arrow function to preserve `this` context for class methods
      deleteBtn.addEventListener("click", () => this.removeBook(book.id));

      btnsDiv.appendChild(readBtn);
      btnsDiv.appendChild(deleteBtn);

      bookDiv.appendChild(titleDiv);
      bookDiv.appendChild(imageDiv);
      bookDiv.appendChild(btnsDiv);

      this.libraryContainer.appendChild(bookDiv);
    });
  }

  // Modal related methods
  openModal() {
    this.modal.showModal();
    this.form.reset();
  }

  closeModal() {
    this.modal.close();
  }

  // Form submission handler method
  handleFormSubmit(event) {
    // method="dialog" on the form generally handles closing and prevents default submit behavior
    // If you remove method="dialog", you'd add event.preventDefault() here.

    const name = this.form.elements.bookName.value;
    const author = this.form.elements.bookAuthor.value;
    const pages = parseInt(this.form.elements.bookPages.value);
    const read = this.form.elements.bookRead.checked;

    this.addBook(name, author, pages, read); // Call the class's method to add book
    this.displayBooks(); // Re-render after adding
  }
}

// 3. Initialize the LibraryManager
// Ensure DOM elements are available before initializing
document.addEventListener('DOMContentLoaded', () => {
  const myLibraryManager = new LibraryManager(
    libraryDiv,
    modal,
    addBookForm,
    addBookBtn,
    closeModalBtn
  );
  // All further interactions are handled by myLibraryManager instance
});