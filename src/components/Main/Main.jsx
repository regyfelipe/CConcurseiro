import React from "react";
import { HeaderPage } from "../Header/Header";
import heroImag from '../../assets/imgs/hero-img.png';
import heroBg from '../../assets/imgs/hero-bg-2.jpg';
import { Link } from 'react-router-dom';
import './Main.css'

export class MainContainer extends React.Component {
    render() {
        return (
            <>
                <HeaderPage />
                <section id="hero" className="hero section dark-background">
                    <img src={heroBg} alt="" className="hero-bg" />
                    <div className="container">
                        <div className="row gy-4 justify-content-between">
                            <div className="col-lg-4 imagem-bg order-lg-last hero-img" data-aos="zoom-out" data-aos-delay={100}>
                                <img src={heroImag} className="img-fluid animated" alt="" />
                            </div>
                            <div className="col-lg-6  d-flex flex-column justify-content-center" data-aos="fade-in">
                                <h1><span>Concurseiro</span></h1>
                                <p>site sem fins lucrativos</p>
                                <div className="d-flex">
                                    <Link to="#about" className="btn-get-started">Get Started</Link>
                                    <Link to="https://www.instagram.com/fep.ink/" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-instagram" /><span>Desenvolverdor</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
                        <defs>
                            <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="wave1">
                            <use xlinkHref="#wave-path" x={50} y={3} />
                        </g>
                        <g className="wave2">
                            <use xlinkHref="#wave-path" x={50} y={0} />
                        </g>
                        <g className="wave3">
                            <use xlinkHref="#wave-path" x={50} y={9} />
                        </g>
                    </svg>
                </section>


                {/* About Section */}
                <section id="about" className="about section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row align-items-xl-center gy-5">
                            <div className="col-xl-5 content">
                                <h3>About Us</h3>
                                <h2>Ducimus rerum libero reprehenderit cumque</h2>
                                <p>Ipsa sint sit. Quis ducimus tempore dolores impedit et dolor cumque alias maxime. Enim reiciendis minus et rerum hic non. Dicta quas cum quia maiores iure. Quidem nulla qui assumenda incidunt voluptatem tempora deleniti soluta.</p>
                                <Link to="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right" /></Link>
                            </div>
                            <div className="col-xl-7">
                                <div className="row gy-4 icon-boxes">
                                    <div className="col-md-6" data-aos="fade-up" data-aos-delay={200}>
                                        <div className="icon-box">
                                            <i className="bi bi-buildings" />
                                            <h3>Eius provident</h3>
                                            <p>Magni repellendus vel ullam hic officia accusantium ipsa dolor omnis dolor voluptatem</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-up" data-aos-delay={300}>
                                        <div className="icon-box">
                                            <i className="bi bi-clipboard-pulse" />
                                            <h3>Rerum aperiam</h3>
                                            <p>Autem saepe animi et aut aspernatur culpa facere. Rerum saepe rerum voluptates quia</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-up" data-aos-delay={400}>
                                        <div className="icon-box">
                                            <i className="bi bi-command" />
                                            <h3>Veniam omnis</h3>
                                            <p>Omnis perferendis molestias culpa sed. Recusandae quas possimus. Quod consequatur corrupti</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6" data-aos="fade-up" data-aos-delay={500}>
                                        <div className="icon-box">
                                            <i className="bi bi-graph-up-arrow" />
                                            <h3>Delares sapiente</h3>
                                            <p>Sint et dolor voluptas minus possimus nostrum. Reiciendis commodi eligendi omnis quideme lorenda</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="contact section">

                    <div className="container section-title" data-aos="fade-up">
                        <h2>Contact</h2>
                        <div><span>Confira nosso</span> <span className="description-title">Contato</span></div>
                    </div>
                    <div className="container" data-aos="fade" data-aos-delay={100}>
                        <div className="row gy-4">
                            <div className="col-lg-4">
                                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={200}>
                                    <i className="bi bi-geo-alt flex-shrink-0" />
                                    <div>
                                        <h3>Endereço</h3>
                                        <p>Aquiraz</p>
                                    </div>
                                </div>
                                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={300}>
                                    <i className="bi bi-telephone flex-shrink-0" />
                                    <div>
                                        <h3>Contato</h3>
                                        <p>+55 85 9928 01698</p>
                                    </div>
                                </div>
                                <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                                    <i className="bi bi-envelope flex-shrink-0" />
                                    <div>
                                        <h3>E-mail</h3>
                                        <p>regyfelip@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="row gy-4">
                                        <div className="col-md-6">
                                            <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                                        </div>
                                        <div className="col-md-6 ">
                                            <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                        </div>
                                        <div className="col-md-12">
                                            <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                                        </div>
                                        <div className="col-md-12">
                                            <textarea className="form-control" name="message" rows={6} placeholder="Message" required defaultValue={""} />
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <div className="loading">Loading</div>
                                            <div className="error-message" />
                                            <div className="sent-message">Your message has been sent. Thank you!</div>
                                            <button type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>


            </>
        )
    }
}