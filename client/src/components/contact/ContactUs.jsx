import React from "react";
import "./Contact.css";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "emailjs-com";
function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_d2q5x8e",
        "template_tbr1971",
        e.target,
        "82HUNCTaunwlfzNDn"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  }
  return (
    <>
      <section className="Conttact" id="conn">
        <div className="containerr">
          <h1 className="section-heading">
            Contact <span>us</span>
          </h1>
          <p style={{ color: "red" }}>
            Home Delivery is the story of how it takes just a single day to
            change a person's outlook on life forever. Sunny Chopra (Vivek
            Oberoi) is a 28-year-old writer who has carved a name for himself as
            a popular agony uncle, named Gyan Guru, writing for the Times of
            Hindustan
          </p>
          <div className="card-wrappers   pnone">
            <div className="cardddd">
              <PhoneIcon />
              <h1>Call Me at</h1>
              <h6>75 05 78 69 56</h6>
            </div>

            <div className="cardddd">
              <EmailIcon />
              <h1>Email at</h1>
              <h6>anilb0175@gamil.com</h6>
            </div>
          </div>
          <div className="formcontainer">
            <form onSubmit={sendEmail}>
              <input
                className="inputtext"
                type="text"
                name="name"
                placeholder="your name "
              />
              <input
                className="inputtext"
                type="email"
                name="email"
                placeholder="your email "
              />

              <input
                className="inputtext"
                type="text"
                name="subject"
                placeholder="Subject"
              />
              <textarea
                className="textares"
                name="message"
                cols="30"
                rows="20"
                placeholder="type message"
              ></textarea>

              <input
                type="submit"
                value="Send Message"
                className="btn btn-primary"
                style={{ color: "black" }}
              ></input>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
