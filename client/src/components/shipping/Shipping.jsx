import React from "react";
import "./Shipping.css";
const Shipping = () => {
  return (
    <>
      <div className="mainshipping">
        <div className="centershipping">
          <div>
            <h2>Welcome to nepalifykart shipping service</h2>

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
              <form>
                <div className="inputgdiv">
                  <label>Enter your Product url</label>
                  <input
                    className="inputshipng"
                    type="text"
                    placeholder="Url.."
                  />
                </div>
                <div className="inputgdiv">
                  <label>Enter your Address</label>
                  <input
                    className="inputshipng"
                    type="text"
                    placeholder="Address.."
                  />
                </div>
                <div className="inputgdiv">
                  <label>Enter your Contact Phone no</label>
                  <input
                    className="inputshipng"
                    type="text"
                    placeholder="Phone.."
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
