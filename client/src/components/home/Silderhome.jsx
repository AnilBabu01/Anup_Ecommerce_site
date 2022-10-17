import React, { Component, useState, useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProducts, clearErrors } from "../actions/productActions";
import ProductCard from "./Productcard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
const Sliderhome = () => {
  const dispatch = useDispatch();
  const [products, setproducts] = useState([]);
  const [slides, setslides] = useState({
    slide: [
      {
        img: "https://dummyimage.com/600x400/000/7CFC00",
      },
      {
        img: "https://dummyimage.com/600x400/000/ccccc",
      },
      {
        img: "https://dummyimage.com/600x400/000/dddddd",
      },
      {
        img: "https://dummyimage.com/600x400/000/fff",
      },
      {
        img: "https://dummyimage.com/600x400/000/B22222",
      },
      {
        img: "https://dummyimage.com/600x400/000/7CFC00",
      },
      {
        img: "https://dummyimage.com/600x400/000/ccccc",
      },
      {
        img: "https://dummyimage.com/600x400/000/dddddd",
      },
      {
        img: "https://dummyimage.com/600x400/000/B22222",
      },
      {
        img: "https://dummyimage.com/600x400/000/7CFC00",
      },
    ],
  });

  const category = "Electronic Device";
  const getproduct = async () => {
    axios.defaults.headers.get[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/api/product/getAllProduct?category=${category}`
    );

    console.log("drom category", data.products);
    setproducts(data.products);
  };

  useEffect(() => {
    getproduct();
  }, [dispatch]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <h2>slider</h2>
      <Slider {...settings}>
        {products &&
          products.map((product, index) => {
            return (
              <div key={product._id}>
                <ProductCard product={product} />

                {/* <img src={slide.img} alt={`slide${index}`} /> */}
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Sliderhome;
