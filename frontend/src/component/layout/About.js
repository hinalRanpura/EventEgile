import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./About.css"
import MetaData from "./MetaData";
import FacebookIcon from "@material-ui/icons/Facebook"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"
import TwitterIcon from "@material-ui/icons/Twitter"
import InstagramIcon from "@material-ui/icons/Instagram"
const About = () => {
    return (
        <>
            <MetaData title="About Us" />

            <section className="about">
                <div className="main">
                    <div class="wrapper">
                        <div class="profile">
                            <div class="overlay">
                                <div class="about d-flex flex-column">
                                    <h4>Event Agile</h4> <span>MERNStack Developer</span>
                                </div>
                                <ul class="social-icons">
                                    <li><FacebookIcon /></li>
                                    <li><WhatsAppIcon /></li>
                                    <li><TwitterIcon /></li>
                                    <li><InstagramIcon /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*<img src="https://i.pinimg.com/originals/81/53/db/8153dbf1c9ed0dcc0b36747f5a109451.jpg" alt="Trulli" width="500" height="333"/>*/}
                    <div className="about-text">
                        <h1>About Us</h1>
                        <h5>Developer & Designer</h5>
                        <p>I am  a MERN Stack developer. I have created Event Agile website that will help you to book a event or view Venues. It has two sided website that is for user, manager and  admin . manager can provide venues, decoration service or catering service on website and add update or delete that. Admin is authenticated for add, update or delete users reviews decorations catrers or venues. It is the perfect web application using mern stack for Ecommerce website.</p>
                        <button type="button">let's talk</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
