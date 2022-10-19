import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../metadata/Metadata";
import axios from "axios";
import { useAlert } from "react-alert";

const formData = new FormData();
const Addrental = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [addrress, setaddrress] = useState("");
  const [phone, setphone] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imgcheck, setimgcheck] = useState(false);

  const alert = useAlert();

  useEffect(() => {}, []);
  /// formdata type

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    formData.set("productname", name);
    formData.set("price", price);
    formData.set("desc", description);
    formData.set("address", addrress);
    formData.set("phone", phone);

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/rental/new`,
      formData
    );

    console.log("from add rental", data.status);
    if (data.status === true) {
      alert.success(data.msg);
    }
  };

  const setfileinfoform = (filelist) => {
    setimgcheck(true);
    for (let [name, value] of formData) {
      if (name === "avatar") {
        formData.delete(name);
      }
    }

    const file = filelist[0];

    formData.append("image", file);
    console.log("file is ", file);
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="mainaddrental">
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4 centerrental">New Rental Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Enter Product Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">Enter Your Address</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={addrress}
                    onChange={(e) => setaddrress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name_field">Enter Your Contact no</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);

                        setImagesPreview([]);

                        files.forEach((file) => {
                          const reader = new FileReader();

                          reader.onload = () => {
                            if (reader.readyState === 2) {
                              setImagesPreview((oldArray) => [
                                ...oldArray,
                                reader.result,
                              ]);
                            }
                          };

                          reader.readAsDataURL(file);
                        });
                        const filelist = e.target.files;
                        console.log(filelist);
                        setfileinfoform(filelist);
                      }}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={
                    name && price && description && imgcheck ? false : true
                  }
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default Addrental;
