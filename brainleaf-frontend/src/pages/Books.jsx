import BookList from "../components/BookList";

const Books = ({ search }) => {
  return (
    <div>
      <BookList search={search} />
    </div>
  );
};

export default Books;