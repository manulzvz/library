// DOM Objects Selection
const library = document.querySelector("#library");

// Library Array
const myLibrary = [];

// SVG Variables
const svgBook = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m51.422 38.059v18.199h-2.8398v-18.199h-2.8398v-2.8398h-19.656v2.8398h-2.8398v26.727h25.336v-2.8398h-2.8398l-0.003907-2.8438h2.8398v2.8398h2.8398l0.003906-2.8398h2.8398v2.8398h-2.8398v2.8398h28.176l-0.003906-23.883h-5.6797v15.359h-19.656v2.8398h16.816v-26.723h-16.816v2.8398h-2.8398zm-8.5273 8.4961v2.8398h2.8398v2.8398h-2.8398v-2.8398h-9.3789v-2.8398zm0-7.3164v2.8398h2.8398v2.8398h-2.8398v-2.8398h-9.3789v-2.8398zm14.211 7.3164h9.3789v2.8398h-9.3789v2.8398h-2.8398v-2.8398h2.8398zm0-7.3164h9.3789v2.8398h-9.3789v2.8398h-2.8398v-2.8398h2.8398zm-33.859 25.547h-2.8477v-23.887h5.6797v15.359h19.656v2.8398l-16.809 0.003906v-26.727h16.816v2.8398h2.8398v2.8398h5.6797v-2.8398h19.656v2.8398h2.8398l-0.003906 2.8438v26.727h-53.516v-2.8398z" fill-rule="evenodd"/>
</svg>`;

// Object Constructor of Book
function Book(name, author, pages, read) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to create book and store it in an array
function addBookToLibrary(name, author, pages, read) {
  const newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
}

// Adding manually some books for easier testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);

// Function that loops through the array and displays each book on the page
function displayBooks(myLibrary) {
  // Clear the container first to avoid duplicates
  library.innerHTML = "";
  // Loop through each book on the array
  for (const book of myLibrary) {
    // Create the main book div
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    // Create the title div
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = book.name;
    // Create the img div
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("img");
    imageDiv.innerHTML = svgBook;
    // Create the btns div
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("btns");
    // Create the respective buttons
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    const readBtn = document.createElement("button");
    readBtn.classList.add("readBtn");
    // Append buttons to btnsDiv
    btnsDiv.appendChild(readBtn);
    btnsDiv.appendChild(deleteBtn);
    // Append all elements to book div
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(imageDiv);
    bookDiv.appendChild(btnsDiv);
    // Add book div to library
    library.appendChild(bookDiv);
  }
}

displayBooks(myLibrary);
