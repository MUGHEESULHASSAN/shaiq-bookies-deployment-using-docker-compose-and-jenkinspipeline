import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Story Book");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("Free");

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Backend URL from .env

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendUrl}/books/add-book`, // use env variable
        {
          title,
          category,
          description,
          price,
        },
        {
          withCredentials: true, // only if your backend uses cookies
        }
      );

      if (res.status === 200) {
        toast.success("Book added successfully");
        setTitle("");
        setCategory("Story Book");
        setDescription("");
        setPrice("Free");
      } else {
        toast.error("Failed to add the book");
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
      console.error(error);
    }
  };

  return (
    <section className="bg-red-50 dark:bg-slate-900">
      <div className="m-auto max-w-2xl py-10">
        <div className="px-6 py-8 mb-4 shadow-lg rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-primary-red text-center font-semibold mb-6">
              Add Book
            </h2>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block font-bold mb-2">
                Book Category
              </label>
              <select
                id="category"
                name="category"
                className="border rounded w-full py-2 px-3 bg-white dark:bg-slate-900"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Story Book">Story Book</option>
                <option value="Science Fiction Book">Science Fiction Book</option>
                <option value="Health Book">Health Book</option>
                <option value="Programming Book">Programming Book</option>
                <option value="Travel Book">Travel Book</option>
              </select>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Book Name</label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2 bg-white dark:bg-slate-900"
                placeholder="e.g., Roadmap to Full Stack"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3 bg-white dark:bg-slate-900"
                rows="4"
                placeholder="Add any book details, summary, or description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block font-bold mb-2">
                Price
              </label>
              <select
                id="price"
                name="price"
                className="border rounded w-full py-2 px-3 bg-white dark:bg-slate-900"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="Free">Free</option>
                <option value="$10">$10</option>
                <option value="$15">$15</option>
                <option value="$20">$20</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary-red hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBook;
