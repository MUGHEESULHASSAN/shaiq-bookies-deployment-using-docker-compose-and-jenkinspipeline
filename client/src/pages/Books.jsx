import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { CiFilter } from "react-icons/ci";
import { TiTick } from "react-icons/ti";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [paid, setPaid] = useState(false);
  const [free, setFree] = useState(false);

  // Use environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/get-books`); // use backend URL from env
        if (res.status === 200) {
          setBooks(res.data);
        } else {
          setMessage("Books Not Found");
        }
      } catch (error) {
        setMessage("Error fetching books");
      }
    };

    fetchData();
  }, [backendUrl]);

  const handleDropdown = () => setShowFilter(!showFilter);

  const filteredBooks = books.filter((book) => {
    if (free && paid) return true;
    if (free) return book.price === "Free";
    if (paid) return book.price !== "Free";
    return true;
  });

  return (
    <section className="bg-red-50 dark:bg-slate-900 px-4 py-4">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-primary-red mb-6 text-center">
          Browse Books
        </h2>
        <div className="relative">
          <CiFilter
            onClick={handleDropdown}
            className="filter-icon text-4xl ml-auto mb-3 hover:cursor-pointer hover:scale-105"
          />
          {showFilter && (
            <div className="filter-dropdown shadow-md shadow-gray-700 rounded-lg w-20 h-16 absolute z-10 right-0 top-8 dark:bg-slate-900 dark:text-white">
              <ul className="p-2 h-full">
                <li
                  onClick={() => setFree(!free)}
                  className="border-b hover:cursor-pointer hover:font-semibold h-1/2"
                >
                  Free {free && <TiTick className="inline mb-1" />}
                </li>
                <li
                  onClick={() => setPaid(!paid)}
                  className="border-b hover:cursor-pointer hover:font-semibold h-1/2"
                >
                  Paid {paid && <TiTick className="inline mb-1" />}
                </li>
              </ul>
            </div>
          )}
        </div>
        {message === "" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book._id} item={book} />
            ))}
          </div>
        ) : (
          <div className="text-red-500 dark:bg-slate-900  text-2xl text-center">
            {message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;
