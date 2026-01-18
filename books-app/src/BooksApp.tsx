import { useEffect, useState } from "react";

/* =======================
   Types
======================= */
type Book = {
  id: string;
  name: string;
  author: string;
  genre: string;
  rating: number;
  description: string;
  imgUrl?: string;
  isRead: boolean;
};

/* =======================
   Constants
======================= */
const PLACEHOLDER_IMG =
  "https://via.placeholder.com/120x160?text=Book";

/* =======================
   Component
======================= */
export function BooksApp() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    genre: "",
    rating: 0,
    description: "",
  });

  /* =======================
     Lifecycle (useEffect)
  ======================= */

  // componentDidMount
  useEffect(() => {
    console.log("BooksApp mounted");
  }, []);

  // componentDidUpdate
  useEffect(() => {
    console.log("Books changed", books);
  }, [books]);

  useEffect(() => {
    console.log("Filter changed", filter);
  }, [filter]);

  useEffect(() => {
    console.log("Selected book changed", selectedBookId);
  }, [selectedBookId]);

  /* =======================
     Logic
  ======================= */

  const filteredBooks = books.filter((book) =>
    book.id.includes(filter) ||
    book.name.toLowerCase().includes(filter.toLowerCase()) ||
    book.author.toLowerCase().includes(filter.toLowerCase())
  );

  const selectedBook = books.find(
    (book) => book.id === selectedBookId
  );

  const addBook = () => {
    const book: Book = {
      id: crypto.randomUUID(),
      imgUrl: PLACEHOLDER_IMG,
      isRead: false,
      ...newBook,
    };

    setBooks((prev) => [...prev, book]);

    setNewBook({
      name: "",
      author: "",
      genre: "",
      rating: 0,
      description: "",
    });
  };

  const toggleRead = (id: string) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? { ...book, isRead: !book.isRead }
          : book
      )
    );
  };

  /* =======================
     Book Details Page
  ======================= */
  if (selectedBook) {
    return (
      <div className="container details">
        <img src={selectedBook.imgUrl || PLACEHOLDER_IMG} />
        <h2>{selectedBook.name}</h2>

        <p><b>Author:</b> {selectedBook.author}</p>
        <p><b>Genre:</b> {selectedBook.genre}</p>
        <p><b>Rating:</b> {selectedBook.rating}</p>
        <p>{selectedBook.description}</p>

        <label>
          <input
            type="checkbox"
            checked={selectedBook.isRead}
            onChange={() => toggleRead(selectedBook.id)}
          />{" "}
          Read
        </label>

        <button onClick={() => setSelectedBookId(null)}>
          Back to list
        </button>
      </div>
    );
  }

  /* =======================
     Books List Page
  ======================= */
  return (
    <div className="container">
      <h1>Books</h1>

      <input
        className="filter"
        placeholder="Filter by id, name or author"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <ul className="books-list">
        {filteredBooks.map((book) => (
          <li key={book.id} className="book-card">
            <img src={book.imgUrl || PLACEHOLDER_IMG} />

            <div className="book-info">
              <strong>{book.name}</strong>
              <span>{book.author}</span>
              <span>⭐ {book.rating}</span>

              <button onClick={() => setSelectedBookId(book.id)}>
                Details
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Add new book</h2>

      <div className="add-form">
        <input
          placeholder="Name"
          value={newBook.name}
          onChange={(e) =>
            setNewBook({ ...newBook, name: e.target.value })
          }
        />

        <input
          placeholder="Author"
          value={newBook.author}
          onChange={(e) =>
            setNewBook({ ...newBook, author: e.target.value })
          }
        />

        <input
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) =>
            setNewBook({ ...newBook, genre: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Rating"
          value={newBook.rating}
          onChange={(e) =>
            setNewBook({
              ...newBook,
              rating: Number(e.target.value),
            })
          }
        />

        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({
              ...newBook,
              description: e.target.value,
            })
          }
        />

        <button onClick={addBook}>Add</button>
      </div>
    </div>
  );
}
