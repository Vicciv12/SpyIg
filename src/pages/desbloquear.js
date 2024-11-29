import React, { useState, useEffect } from 'react';
import Logo from '../app/assets/logo.svg';
import Verify from '../app/assets/verify.svg'; // Importação do ícone de verificação
import '../app/globals.css';

const UnlockReportPage = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer); // Limpa o intervalo quando o componente é desmontado
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const cards = [
    "Veja quem visualiza seus stories e quantas vezes essa pessoa visualiza.",
    "Veja quem visualiza o perfil do seu(a) ex e com quem ele(a) conversa.",
    "Quem tá te querendo, veja quem passou mais tempo vendo seu perfil.",
    "Não tem acesso ao Instagram do seu namorado(a)? Veja o que ele anda aprontando.",
    "Veja se outras pessoas mencionam seu @ nas conversas delas com outras.",
    "Veja quem reenviou seus stories ou destaques para outras pessoas.",
    "Tempo de tela com você: Veja quem passou mais tempo vendo suas fotos e seu perfil."
  ];

  return (
    <div className="container">
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <Logo className="logo" />
      <h1>🔓 Desbloquear Relatório Completo</h1>
      <p className="description">
        Você está prestes a ter em suas mãos o <strong>PODER ABSOLUTO</strong>{" "}
        para saber exatamente quem te observa, quem te menciona e quem gasta{" "}
        <strong>HORAS</strong> olhando suas fotos e seu perfil.
      </p>
      {/* Cards de Detalhes */}
      <div className="cards">
        {cards.map((text, index) => (
          <div key={index} className="card">
            <Verify className="verify-icon" /> {/* Ícone de verificação */}
            <p>{text}</p>
            {index === 1 && <span className="badge">Novidade</span>}{" "}
            {/* Badge de "Novidade" */}
          </div>
        ))}
      </div>
      
      {/* Oferta por Tempo Limitado */}
      <div className="limited-offer">
        <span className="offer-text">
          Oferta por tempo limitado: {formatTime(timeLeft)}
        </span>
      </div>

      {/* Seção de Oferta e Preço */}
      <div className="offer-section">
        <div className="offer-box">
          <span className="discount-badge">50% off</span>
          <h2>Relatório Completo</h2>
          <p className="availability">Últimos @ disponíveis</p>
          <p className="original-price">de R$ 59,80 por:</p>
          <p className="price">R$ 29,90</p>
          <p className="payment-info">à vista</p>
        </div>

        <div className="bonus-section">
          <div className="bonus-card">
            <h3>Acesso vitalício</h3>
            <p>Sem mensalidades, pagamento único</p>
          </div>
          <div className="bonus-card">
            <h3>+ Bônus</h3>
            <p>Ebook: Manual da conquista e reconquista</p>
          </div>
        </div>
      </div>
      {/* Botão de Ação */}
      <button className="purchase-button">
        Eu quero o relatório completo
      </button>{" "}
      {/* Adicionar o link para compra. */}
    </div>
  );
};

export default UnlockReportPage;
