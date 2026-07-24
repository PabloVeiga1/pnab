import "./Header.css";
import { useState } from "react";

export default function Header() {
    
    const [descobertas,setDescoberta] = useState(0)

    return (
        <header className="header">
        <div className="header-info">
            <h2>Caminho de Bronze</h2>
            <span>{descobertas}/6 descobertas</span>
        </div>
        <button className="gps-button">
            <span className="gps-dot"></span>
            GPS
        </button>
        </header>
    );
}