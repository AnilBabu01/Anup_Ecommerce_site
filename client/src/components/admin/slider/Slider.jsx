import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../metadata/Metadata";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
const formData = new FormData();
const Slider = ({ history }) => {
  const [imagesPreview, setImagesPreview] = useState([]);
  const [imagess, setimagess] = useState("");
  const name = "anil";
  const submitHandler = async (e) => {
    e.preventDefault();

    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      `${process.env.REACT_APP_URL}/api/admin/slider`,
      formData,
      config
    );

    console.log(data);
  };
  const setfileinfoform = (filelist) => {
    console.log(filelist);
    for (let [name, value] of formData) {
      if (name === "silder") {
        formData.delete(name);
      }
    }
    for (var i = 0; i < filelist.length; i++) {
      const file = filelist[i];

      formData.append("silder", file);
      console.log("file is ", file);
    }
  };

  const getsilderimg = async () => {
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.get(
      `${process.env.REACT_APP_URL}/api/admin/getslider`,
      formData,
      config
    );

    console.log(data.data.images);

    setimagess(data.data.images);
  };

  const deleteUserHandler = async (id) => {
    axios.defaults.headers.delete[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.delete(
      `${process.env.REACT_APP_URL}/api/admin/deleteimg/${id}`,

      config
    );

    console.log(data);
  };
  useEffect(() => {
    getsilderimg();
  }, []);
  return (
    <Fragment>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5 latesttext1 ">Add Slider Images</h1>
            <form
              className="shadow-lg"
              style={{ marginTop: "3rem" }}
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
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
              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
              >
                Add
              </button>
            </form>
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

            <table>
              <tr>
                <th>Images</th>

                <th>Action</th>
              </tr>
              {imagess &&
                imagess.map((e, index) => {
                  return (
                    <>
                      <tr key={e._id}>
                        <td>
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={e.image}
                            alt={e.image}
                          />
                        </td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteUserHandler(e._id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </table>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default Slider;
