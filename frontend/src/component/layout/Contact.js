import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Contact.css"
import EmailIcon from "@material-ui/icons/Email" 
import PhoneIcon from "@material-ui/icons/Phone"
import LocationIcon from "@material-ui/icons/LocationOn"
import MetaData from "./MetaData";
const Contact = () => {
  return (
    <>
              <MetaData title="Contact Us" />

        <section className="contact">
            <div className="content">
                <h2>Contact Us</h2>
                <p>Event Agile is event organization company</p>
            </div>
            <div className="container">
                <div className="contactInfo">
                    <div className="box">
                        <div className="icon"><LocationIcon/></div>
                        <div className="text">
                            <h3>Address</h3>
                            <p>GLS University, Ahmedabad</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon"><EmailIcon/></div>
                        <div className="text">
                            <h3>Email</h3>
                            <p>eventagile12@outlook.com</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon"><PhoneIcon/></div>
                        <div className="text">
                            <h3>Phone No.</h3>
                            <p>897456321</p>
                        </div>
                    </div>
                </div>
                <div className="contactForm">
                    <form>
                        <h2>Send Message</h2>
                        <div className="inputBox">
                            <input type="text" name="" required />
                            <span>Full Name</span>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="" required />
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <textarea required></textarea>
                            <span>Type your Message...</span>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Send" required />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  );
}

export default Contact;
