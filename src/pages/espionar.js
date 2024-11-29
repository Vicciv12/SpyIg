'use client';
import React, { useState, useEffect } from 'react';
import '../app/globals.css';

export default function Preview() {
    const [city, setCity] = useState('sua cidade'); // Estado para armazenar a cidade

    useEffect(() => {
        // Função para buscar a cidade do usuário
        const fetchCity = async () => {
            try {
                const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
                const data = await response.json();
                setCity(data.city || 'sua cidade'); // Atualiza o estado com a cidade ou fallback
            } catch (error) {
                console.error('Erro ao obter a localização:', error);
                setCity('sua cidade'); // Fallback para o valor padrão
            }
        };

        fetchCity(); // Chama a função fetchCity ao montar o componente
    }, []); // O array vazio garante que o efeito execute apenas uma vez

    return (
        <div className="preview-container">
            {/* Cabeçalho */}
            <div className="preview-header">
                <span className="icon">👁️</span>
                <h1 className="title">Prévia</h1>
            </div>

            {/* Aviso de tempo limitado */}
            <div className="limited-time-alert">
                Essa prévia está disponível por tempo limitado
            </div>

            {/* Lista de prints recuperados */}
            <div className="prints-list">
                <h2 className="list-title">Prints recuperados de pessoas que te conhecem:</h2>
                <ul className="list-items">
                    <li>
                        <span className="check-icon">✔️</span> Entre seus seguidores
                    </li>
                    <li>
                        <span className="check-icon">✔️</span> Amigas(os) de seus seguidores
                    </li>
                    <li>
                        <span className="check-icon">✔️</span> Fingem ser seus amigos
                    </li>
                    <li>
                        <span className="check-icon">✔️</span> Que têm interesse em você
                    </li>
                    <li>
                        <span className="check-icon">✔️</span> Moram em {city}
                    </li>
                </ul>
            </div>

            {/* Print recuperado */}
            <div className="print bg-dark rounded-2xl relative h-[240px] mt-[40px] w-full">
                <div className="itens space-x-3 flex items-end absolute z-4 left-4 top-35">
                    <div className="min-h-25 min-w-25 mb-8 rounded-full bg-profile-new bg-cover bg-no-repeat"></div>
                    <div className="messages select-none pointer-events-none space-y-3 pr-20">
                        <div className="message-box">
                            <span>
                                {nome} do <span className="blur-sm">dados ocultos</span> {/* Passar o nome da pessoa de acordo com o user do insta */}
                            </span>
                        </div>
                        <div className="message-box">
                            <span>saudades</span>
                        </div>
                        <div className="message-box overflow-clip">
                            <span className="blur-sm">são dados ocultos, apenas no relatório</span>
                        </div>
                    </div>
                </div>
                <div className="bg-layer absolute z-2 rounded-2xl h-full w-full"></div>
                <div className="bg-shadow absolute z-1 scale-85 opacity-70 -top-35 rounded-2xl h-full w-full"></div>
            </div>

            {/* Alerta */}
            <div className="alert-box">
                <h2>Tem alguém fingindo ser sua amiga</h2>
                <div className="alert">
                    Nossa inteligência artificial detectou que uma de suas seguidoras <strong>mencionou você</strong>
                </div>
            </div>
        </div>
    );
}
