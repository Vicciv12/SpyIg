'use client'
import React, { useState, useEffect } from 'react';
import Logo from '../app/assets/logo.svg';
import '../app/globals.css';

export default function Home() {
  const [instagramUser, setInstagramUser] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const [city, setCity] = useState('sua cidade');
  const [error, setError] = useState(''); // Estado para armazenar o erro

  const handleInputChange = (e) => {
    setInstagramUser(e.target.value);
    if (e.target.value) {
      setError(''); // Limpa o erro se o campo não estiver vazio
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!instagramUser.trim()) {
      setError('O nome de usuário é obrigatório');
    } else {
      console.log(`Buscando perfil para: ${instagramUser}`);
      // Insira a lógica para prosseguir com a busca
    }
  };

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();
        setCity(data.city || "sua cidade");
      } catch (error) {
        console.error("Erro ao obter a localização:", error);
        setCity("sua cidade");
      }
    };

    fetchCity();

    const generateRandomVisitorCount = () => Math.floor(Math.random() * (125 - 90 + 1)) + 90;
    const generateRandomInterval = () => Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    setVisitorCount(generateRandomVisitorCount());

    const updateVisitorCount = () => {
      setVisitorCount((prevCount) => {
        const change = Math.floor(Math.random() * 7) - 3;
        let newCount = prevCount + change;

        if (newCount < 90) newCount = 90;
        if (newCount > 125) newCount = 125;

        return newCount;
      });

      const newInterval = generateRandomInterval();
      clearInterval(intervalId);
      intervalId = setInterval(updateVisitorCount, newInterval);
    };

    let intervalId = setInterval(updateVisitorCount, generateRandomInterval());

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <Logo className="logo" />
      <h1>Primeiro, qual é o seu perfil?</h1>
      <p>Informe seu perfil para iniciar a análise</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Seu Instagram (sem o @)</label>
        <input
          id="username"
          type="text"
          placeholder="Ex.: neymarjr"
          value={instagramUser}
          onChange={handleInputChange}
          className={error ? 'input-error' : ''} // Adiciona classe de erro se houver erro
        />
        {error && <p className="error-text">{error}</p>} {/* Exibe a mensagem de erro */}
        <button type="submit">Continuar</button>
      </form>
      <p className="footer-text">
        Você e mais {visitorCount} pessoas de {city} estão acessando essa página neste momento.
      </p>
    </div>
  );
}
