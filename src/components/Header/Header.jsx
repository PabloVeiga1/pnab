import "./Header.css";
import { useState } from "react";
import { monumentos } from "../../data/monumentos";

export default function Header() {
    const totalEcontrados = monumentos.filter(m => m.status === "encontrado").length
    return (
        <header className="header">
        <div className="header-info">
            <h2>Caminho de Bronze</h2>
            <span>{totalEcontrados} / {monumentos.length} descobertas</span>
        </div>
        </header>
    );
}