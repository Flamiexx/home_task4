import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";

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

const PLACEHOLDER_IMG = "https://via.placeholder.com/120x160?text=Book";

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

  useEffect(() => console.log("BooksApp mounted"), []);
  useEffect(() => console.log("Books changed", books), [books]);
  useEffect(() => console.log("Filter changed", filter), [filter]);
  useEffect(() => console.log("Selected book changed", selectedBookId), [selectedBookId]);

  const filteredBooks = books.filter(
    (book) =>
      book.id.includes(filter) ||
      book.name.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase())
  );

  const selectedBook = books.find((book) => book.id === selectedBookId);

  const addBook = () => {
    const book: Book = {
      id: crypto.randomUUID(),
      imgUrl: PLACEHOLDER_IMG,
      isRead: false,
      ...newBook,
    };
    setBooks((prev) => [...prev, book]);
    setNewBook({ name: "", author: "", genre: "", rating: 0, description: "" });
  };

  const toggleRead = (id: string) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, isRead: !book.isRead } : book))
    );
  };

  if (selectedBook) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <img
              src={selectedBook.imgUrl || PLACEHOLDER_IMG}
              width={120}
              height={160}
              alt={selectedBook.name}
            />
            <Box>
              <Typography variant="h5" gutterBottom>
                {selectedBook.name}
              </Typography>
              <Typography>Author: {selectedBook.author}</Typography>
              <Typography>Genre: {selectedBook.genre}</Typography>
              <Typography>Rating: ⭐ {selectedBook.rating}</Typography>
            </Box>
          </Box>

          <Typography sx={{ mb: 2 }}>{selectedBook.description}</Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={selectedBook.isRead}
                onChange={() => toggleRead(selectedBook.id)}
              />
            }
            label="Read"
          />

          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={() => setSelectedBookId(null)}>
              Back to list
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Books
      </Typography>

      <TextField
        fullWidth
        label="Filter by id, name or author"
        value={filter}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {filteredBooks.map((book) => (
          <Grid size={{ xs: 12 }} key={book.id}>
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid size="auto">
                  <img
                    src={book.imgUrl || PLACEHOLDER_IMG}
                    width={80}
                    height={110}
                    alt={book.name}
                  />
                </Grid>

                <Grid size="grow">
                  <Typography fontWeight={600}>{book.name}</Typography>
                  <Typography color="text.secondary">{book.author}</Typography>
                  <Typography>⭐ {book.rating}</Typography>
                </Grid>

                <Grid size="auto">
                  <Button variant="outlined" onClick={() => setSelectedBookId(book.id)}>
                    Details
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Add new book
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Name"
              value={newBook.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBook({ ...newBook, name: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Author"
              value={newBook.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Genre"
              value={newBook.genre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBook({ ...newBook, genre: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              type="number"
              fullWidth
              label="Rating"
              value={newBook.rating}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBook({ ...newBook, rating: Number(e.target.value) })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={newBook.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button variant="contained" onClick={addBook}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
