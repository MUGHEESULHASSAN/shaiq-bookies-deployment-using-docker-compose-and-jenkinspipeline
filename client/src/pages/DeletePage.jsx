import React, { useEffect, useState } from "react";
import BookTableRow from "../components/BookTableRow";
import axios from "axios";
import { toast } from "react-toastify";

// Use the backend URL from environment variables
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DeletePage = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/books/delete/${id}`, {
        withCredentials: true, // if using cookies for auth
      });
      if (res.status === 200) {
        toast.success(res.data.msg);
        setBooks(Array.isArray(res.data.books) ? res.data.books : []);
      } else {
        toast.error(res.data.msg || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting book");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/books/get-books`, {
          withCredentials: true, // if using cookies for auth
        });

        if (res.status === 200 && Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          setBooks([]);
          setMessage("Books Not Found");
        }
      } catch (error) {
        console.error(error);
        setBooks([]);
        setMessage("Error fetching books");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto p-10">
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th className="text-black dark:text-white">Title</th>
            <th className="text-black dark:text-white">Category</th>
            <th className="text-black dark:text-white">Description</th>
            <th className="text-black dark:text-white">Price</th>
            <th className="text-black dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {message === "" ? (
            books.map((book, index) => (
              <BookTableRow
                onDelete={handleDelete}
                index={index + 1}
                key={book._id}
                book={book}
              />
            ))
          ) : (
            <tr className="text-red-500 dark:bg-slate-900 text-2xl text-center">
              <td colSpan={6}>{message}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeletePage;
