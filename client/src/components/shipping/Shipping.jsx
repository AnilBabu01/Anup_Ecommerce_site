import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Shipping.css";
const formData = new FormData();
const Shipping = () => {
  const [name, setname] = useState("");
  const [url, seturl] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();

  const submitHandler = async (e) => {
    e.preventDefault();
    formData.set("name", name);
    formData.set("url", url);
    formData.set("address", address);
    formData.set("phone", phone);
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_URL}/api/shiping/new`,
      formData,
      config
    );
    console.log(data.status);
    if (data.status === true) {
      alert.success("You have successfully aaded Shipping");
      navigate("/");
    }
  };

  const setfileinfoform = (filelist) => {
    console.log("from upload ", filelist);
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
  return (
    <>
      <div className="mainshipping">
        <marquee>
          What do you know about shipping? So, what is shipping? It is the
          physical movement of goods from one point to another, such as the
          moving merchandise from the warehouse to the customer. The shipping
          process follows the manufacturing and the packing of goods and is
          controlled and overseen by a shipping or logistics company
        </marquee>

        <div className="centershipping">
          <div>
            <div className="mardivcontentlink">
              <a target="_blank" href="https://www.amazon.in">
                Amazon
              </a>
              <a target="_blank" href="https://www.flipkart.com">
                Flipkart
              </a>
              <a target="_blank" href="https://www.myntra.com/mantra">
                mantra
              </a>
            </div>

            <div>
              <h2>Please use our Service</h2>
              <form onSubmit={submitHandler}>
                <div className="inputgdiv">
                  <label>Enter your name</label>
                  <input
                    className="inputshipng"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    placeholder="name.."
                  />
                </div>
                <div className="inputgdiv">
                  <label>Enter your Product url</label>
                  <input
                    className="inputshipng"
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => {
                      seturl(e.target.value);
                    }}
                    placeholder="Url.."
                  />
                </div>

                <div className="inputgdiv">
                  <label>Enter your contact no</label>
                  <input
                    className="inputshipng"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                    placeholder="Phone.."
                  />
                </div>
                <div className="inputgdiv">
                  <label>Enter your Contact Address</label>
                  <input
                    className="inputshipng"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => {
                      setaddress(e.target.value);
                    }}
                    placeholder="Address.."
                  />
                </div>
                <div className="inputgdiv">
                  <label>Upload Your Receipt</label>
                  <input
                    className="inputshipng"
                    type="file"
                    placeholder="Phone.."
                    onChange={(e) => {
                      const files = Array.from(e.target.files);

                      const filelist = e.target.files;

                      setfileinfoform(filelist);
                    }}
                    multiple
                  />
                </div>
                <button
                  id="register_button"
                  type="submit"
                  className="receiptbtn"
                  disabled={name && address && phone && url ? false : true}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
