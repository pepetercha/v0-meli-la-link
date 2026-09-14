import React, { useState } from "react";

function App() {
  const [contenido, setContenido] = useState("");
  const API_BASE = "https://telemetria-node-production-0641.up.railway.app/api";

  async function mostrarListaDeseos() {
    try {
      const res = await fetch(`${API_BASE}/wishlist`);
      const data = await res.json();
      setContenido(`
        <h2>Mi lista de deseos</h2>
        <ul>${data.map(d => `<li>${d.item}</li>`).join("")}</ul>
        <input type="text" id="nuevoItem" placeholder="Producto o enlace">
        <button onclick="window.agregarItem()">Añadir</button>
      `);
    } catch (error) {
      console.error("Error cargando wishlist:", error);
      setContenido("<p>Error cargando la lista de deseos</p>");
    }
  }

  window.agregarItem = async function() {
    const item = document.getElementById("nuevoItem")?.value;
    if(item?.trim()) {
      try {
        await fetch(`${API_BASE}/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item })
        });
        mostrarListaDeseos();
      } catch (error) {
        console.error("Error agregando item:", error);
      }
    }
  };

  async function mostrarSobreMi() {
    try {
      const res = await fetch(`${API_BASE}/perfil`);
      const data = await res.json();
      setContenido(`
        <h2>Sobre mí</h2>
        <form onsubmit="window.guardarBio(event)">
          <textarea id="bio">${data.bio || ""}</textarea><br>
          <button type="submit">Guardar</button>
        </form>
      `);
    } catch (error) {
      console.error("Error cargando perfil:", error);
      setContenido("<p>Error cargando el perfil</p>");
    }
  }

  window.guardarBio = async function(event) {
    event.preventDefault();
    const bio = document.getElementById("bio")?.value;
    if(bio) {
      try {
        await fetch(`${API_BASE}/perfil`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bio })
        });
        await mostrarSobreMi();
      } catch (error) {
        console.error("Error guardando bio:", error);
      }
    }
  };

  async function mostrarEnlaces() {
    setContenido(`
      <h2>Mis enlaces</h2>
      <ul>
        <li><a href="https://facebook.com/valdocer" target="_blank">Facebook</a></li>
        <li><a href="https://instagram.com/valdocer" target="_blank">Instagram</a></li>
        <li><a href="https://mercadolibre.com/u/valdocer" target="_blank">Mercado Libre</a></li>
      </ul>
    `);
  }

  return (
    <div>
      <h1>VALDOCER</h1>
      <p>@valdocer</p>
      
      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <button onClick={mostrarSobreMi}>Sobre mí</button>
        <button onClick={mostrarListaDeseos}>Lista de deseos</button>
        <button onClick={mostrarEnlaces}>Enlaces</button>
      </nav>
      
      <div id="contenido" dangerouslySetInnerHTML={{ __html: contenido || "<p>Bienvenido a mi espacio digital. Aquí encontrarás todos mis enlaces, redes sociales y contenido favorito en un solo lugar.</p>" }} />
    </div>
  );
}

export default App;
