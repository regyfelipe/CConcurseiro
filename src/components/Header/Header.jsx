import React, {  useState, useRef, useEffect } from 'react';
import logo from '../../assets/imgs/favicon.png';
import '../../App.css';
import { Link } from 'react-router-dom';

export const HeaderPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const menuRef = useRef(null);

    const toggleMobileNav = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Detect screen resize to switch between mobile and desktop view
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header id="header" className="header d-flex align-items-center fixed-top">
                <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                    <Link to="/" className="d-flex align-items-center">
                    
                        <img src={logo} alt="logo" className="logo" />
                    </Link>

                    {isMobile ? (
                        <>
                            <i
                                className="bi bi-list menu-icon"
                                onClick={toggleMobileNav}
                                aria-expanded={isMenuOpen}
                                aria-controls="navmenu"
                            />
                            <nav ref={menuRef} id="navmenu" className={`m-navmenu ${isMenuOpen ? 'd-flex' : ''}`}>
                                <ul className="d-flex lista">
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li><Link to="/simulate">Simulados</Link></li>
                                    <li><Link to="/createQuestion">Criar Questao</Link></li>
                                    <li><Link to="/questionCard">Questoes</Link></li>

                                    
                                    <li><Link to="#about">About</Link></li>
                                    <li><Link to="/login">entra</Link></li>
                                </ul>
                            </nav>
                        </>
                    ) : (
                        <nav id="navmenu" className="navmenu d-flex">
                            <ul className="d-flex lista">
                                <li><Link to="/" className="active">Home</Link></li>
                                <li><Link to="/simulate">Simulados</Link></li>
                                <li><Link to="/createQuestion">Criar Questao</Link></li>
                                <li><Link to="/questionCard">Questoes</Link></li>
                                <li><Link to="#about">About</Link></li>
                                <li><Link to="/login">entra</Link></li>

                            </ul>
                        </nav>
                    )}
                </div>
            </header>
        </>
    );
};
