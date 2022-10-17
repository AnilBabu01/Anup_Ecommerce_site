import React from "react";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Home from "../home/Home";
import Subhome from "../home/Subgome";
import Slideruse from "../slider/Silderuse";
import Product from "../product/Product";
import Metadata from "../metadata/Metadata";
import Wemon from "./Women";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import "./Categories.css";
import ComNavlink from "./ComNavlink";
const Categories = () => {
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  console.log("from cate", products);
  return (
    <>
      <Wemon />
    </>
  );
};

export default Categories;
