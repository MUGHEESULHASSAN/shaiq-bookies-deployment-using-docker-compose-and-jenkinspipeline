import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";
import axios from "axios";

const Caraousel = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  // Use backend URL from environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/books/get-books`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setBooks(res.data);
        } else {
          setMessage("Books Not Found");
        }
      } catch (error) {
        setMessage("Error fetching books");
        console.error(error);
      }
    };

    fetchData();
  }, [backendUrl]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white text-black dark:bg-slate-900 dark:text-white pt-8 pb-8 mx-auto md:px-10 px-4">
      <div>
        <h1 className="font-bold text-center text-primary-red text-3xl pb-6">
          Free offered books
        </h1>
        <p className="pb-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          voluptas ipsum repellat. A dicta voluptatibus, perspiciatis molestiae
          adipisci, nemo blanditiis quibusdam neque accusantium qui laborum
          debitis eum, deserunt nulla reiciendis!
        </p>
      </div>
      <Slider {...settings}>
        {message === "" ? (
          books.map((book) => (
            <div key={book._id} className="px-2">
              <Card item={book} isCarousel={true} />
            </div>
          ))
        ) : (
          <div className="text-red-500 text-2xl text-center">{message}</div>
        )}
      </Slider>
    </div>
  );
};

export default Caraousel;
