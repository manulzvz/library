// DOM Objects Selection
const library = document.querySelector("#library");


// Library Array
const myLibrary = [];

// Object Constructor of Book
function Book(name, author, pages, read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

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
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.textContent = book.name;
        library.appendChild(bookDiv);
    }
}

displayBooks(myLibrary);




