import React, { useState, useRef, useEffect } from 'react';
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
                                <span className="close-btn" onClick={toggleMobileNav}>✕</span>
                                <ul className="d-flex lista colorDark">
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        </svg>
                                        <Link to="/" className="active">Home</Link></li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M8 3L8 6.69003C8 7.43013 8 7.80019 8.23811 7.94371C8.24836 7.94989 8.25884 7.95571 8.26951 7.96115C8.51756 8.08746 8.84124 7.89707 9.4886 7.51629C9.97254 7.23164 10.2145 7.08931 10.4815 7.08447C10.4938 7.08425 10.5062 7.08425 10.5185 7.08447C10.7855 7.08931 11.0275 7.23164 11.5114 7.51629C12.1588 7.89707 12.4824 8.08747 12.7305 7.96115C12.7412 7.95571 12.7516 7.94989 12.7619 7.94372C13 7.80019 13 7.43013 13 6.69003V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M20.5 17C19.1193 17 18 18.1193 18 19.5C18 20.8807 19.1193 22 20.5 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                        <Link to="/simulate">Criar Simulados</Link></li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M7.99805 16H11.998M7.99805 11H15.998" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        </svg>
                                        <Link to="/simul">Consulta Simulados</Link></li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M14.236 5.29178C14.236 4.77191 14.236 4.51198 14.1789 4.29871C14.0238 3.71997 13.5717 3.26793 12.9931 3.11285C12.4315 2.96238 11.5684 2.96238 11.0068 3.11285C10.4281 3.26793 9.97609 3.71997 9.82101 4.29871C9.76387 4.51198 9.76387 4.77191 9.76387 5.29178C9.76387 6.34588 9.76387 9.109 9.43641 9.43647C9.10894 9.76393 6.34582 9.76393 5.29172 9.76393C4.77185 9.76393 4.51192 9.76393 4.29865 9.82107C3.71991 9.97615 3.26787 10.4282 3.11279 11.0069C2.96232 11.5685 2.96232 12.4315 3.11279 12.9931C3.26787 13.5718 3.71991 14.0239 4.29865 14.1789C4.51192 14.2361 4.77185 14.2361 5.29172 14.2361C6.34582 14.2361 9.10894 14.2361 9.43641 14.5635C9.76387 14.891 9.76387 15.418 9.76387 16.4721C9.76387 16.992 9.76387 19.4881 9.82101 19.7013C9.97609 20.28 10.4281 20.7321 11.0068 20.8871C11.5684 21.0376 12.4315 21.0376 12.9931 20.8871C13.5717 20.7321 14.0238 20.28 14.1789 19.7013C14.236 19.4881 14.236 16.992 14.236 16.4721C14.236 15.418 14.236 14.891 14.5635 14.5635C14.8909 14.2361 17.654 14.2361 18.7082 14.2361C19.228 14.2361 19.488 14.2361 19.7013 14.1789C20.28 14.0239 20.732 13.5718 20.8871 12.9931C21.0376 12.4315 21.0376 11.5685 20.8871 11.0069C20.732 10.4282 20.28 9.97615 19.7013 9.82107C19.488 9.76393 19.228 9.76393 18.7082 9.76393C17.654 9.76393 14.8909 9.76393 14.5635 9.43647C14.236 9.109 14.236 6.34588 14.236 5.29178Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <Link to="/createQuestion">Criar Questão</Link></li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M3.5 9V14C3.5 17.7712 3.5 19.6569 4.67157 20.8284C5.84315 22 7.72876 22 11.5 22H12.5C16.2712 22 18.1569 22 19.3284 20.8284C20.5 19.6569 20.5 17.7712 20.5 14V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.5 17H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.5 7H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13.5 12H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6.5 16.5C6.5 16.5 7.46758 16.7672 8 18C8 18 9 15 11 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10 5H3.5M10 5C10 4.15973 7.67332 2.58984 7.08333 2M10 5C10 5.84027 7.67331 7.41016 7.08333 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <Link to="/questionCard">Questões</Link></li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <rect x="2" y="15" width="20" height="6" rx="3" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M6 9C6 6.17157 6 4.75736 6.87868 3.87868C7.75736 3 9.17157 3 12 3C14.8284 3 16.2426 3 17.1213 3.87868C18 4.75736 18 6.17157 18 9C18 11.8284 18 13.2426 17.1213 14.1213C16.2426 15 14.8284 15 12 15C9.17157 15 7.75736 15 6.87868 14.1213C6 13.2426 6 11.8284 6 9Z" stroke="currentColor" stroke-width="1.5" />
                                            <path d="M11.9955 18H12.0045M7 18H7.00897M16.991 18H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.5 6H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <Link to="/login">Entrar</Link></li>
                                </ul>
                            </nav>
                        </>
                    ) : (
                        <nav id="navmenu" className="navmenu d-flex">
                            <ul className="d-flex lista">
                                <li><Link to="/" className="active">Home</Link></li>
                                <li><Link to="/simulate">Simulados</Link></li>
                                <li><Link to="/simul">Consulta simulados</Link></li>
                                <li><Link to="/createQuestion">Criar Questao</Link></li>
                                <li><Link to="/questionCard">Questoes</Link></li>
                                <li><Link to="/importa">Importa</Link></li>
                                <li><Link to="/login">entra</Link></li>

                            </ul>
                        </nav>
                    )}
                </div>
            </header>
        </>
    );
};
