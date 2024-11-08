import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.css';
import AOS from 'aos'; 
import GLightbox from 'glightbox'; 
import AppRouter from "./router/Router";
import './App.css';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });

        GLightbox({
            selector: '.glightbox'
        });

        const scrollTopBtn = document.querySelector('.scroll-top');
        const toggleScrollTop = () => {
            if (scrollTopBtn) {
                window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
            }
        };
        
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Adiciona listeners de scroll
        window.addEventListener('scroll', toggleScrollTop);
        return () => {
            window.removeEventListener('scroll', toggleScrollTop); // Limpa o listener ao desmontar
        };
    }, []); 

    return (
        <div className="index-page">
            <AppRouter/>
            <button className="scroll-top" aria-label="Scroll to top">
                <i className="bi bi-arrow-up"></i>
            </button>
        </div>
    );
}

export default App;
