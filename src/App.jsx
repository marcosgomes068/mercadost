import { useState, useEffect } from 'react'
import { Img } from 'react-image';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import img1 from './assets/imgd.jpg'
import img2 from './assets/imgt.jpg'
import img3 from './assets/mgu.jpg'
import abacaxi from './assets/frutas/abaca.jpg';
import banana from './assets/frutas/banana.jpg';
import maca from './assets/frutas/maça.jpg';
import morango from './assets/frutas/morang.jpg';
import pera from './assets/frutas/pera.jpg';
import uva from './assets/frutas/uva.jpg';
import abobora from './assets/legumes/abobora.jpg';
import alface from './assets/legumes/alface.jpg';
import batata from './assets/legumes/batt.jpg';
import brocolis from './assets/legumes/broco.jpg';
import cenoura from './assets/legumes/cenoura.jpg';
import tomate from './assets/legumes/tomate.jpg';
import ProdutosMercado from './comprars.jsx';

function Navbar({ onNavigate, pagina }) {
  return (
    <nav style={{
      width: '100%',
      background: 'linear-gradient(90deg, #388e3c 0%, #43a047 100%)',
      color: '#fff',
      padding: '0.7rem 0',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      boxShadow: '0 2px 12px rgba(56,142,60,0.10)',
      borderBottom: '1.5px solid #e0e0e0',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 900, fontSize: 26, letterSpacing: 1, fontFamily: 'Poppins, Arial, Helvetica, sans-serif', textShadow: '0 2px 8px #2e7d32' }}>Mercado Dashboard</span>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="#frutas" onClick={e => { e.preventDefault(); onNavigate('dashboard'); setTimeout(()=>{document.getElementById('frutas')?.scrollIntoView({behavior:'smooth'});}, 100); }} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, padding: '6px 16px', borderRadius: 8, background: 'rgba(56,142,60,0.10)', transition: 'background 0.2s', letterSpacing: 0.5 }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(56,142,60,0.25)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(56,142,60,0.10)'}
          >Frutas</a>
          <a href="#legumes" onClick={e => { e.preventDefault(); onNavigate('dashboard'); setTimeout(()=>{document.getElementById('legumes')?.scrollIntoView({behavior:'smooth'});}, 100); }} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, padding: '6px 16px', borderRadius: 8, background: 'rgba(56,142,60,0.10)', transition: 'background 0.2s', letterSpacing: 0.5 }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(56,142,60,0.25)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(56,142,60,0.10)'}
          >Legumes</a>
          <a href="#compras" onClick={e => { e.preventDefault(); onNavigate('compras'); }} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16, padding: '6px 16px', borderRadius: 8, background: 'rgba(56,142,60,0.10)', transition: 'background 0.2s', letterSpacing: 0.5 }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(56,142,60,0.25)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(56,142,60,0.10)'}
          >Compras</a>
        </div>
      </div>
    </nav>
  );
}

function ImagensLinha() {
  const imagens = [img1, img2, img3];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 para direita
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % imagens.length);
        setAnimating(false);
      }, 600);
    }, 2500);
    return () => clearInterval(interval);
  }, [imagens.length]);

  const getIndices = () => {
    const prev = (index - 1 + imagens.length) % imagens.length;
    const next = (index + 1) % imagens.length;
    return [prev, index, next];
  };
  const [prevIdx, midIdx, nextIdx] = getIndices();

  // Animação de translação horizontal
  const getStyle = (pos) => {
    let base = {
      objectFit: 'contain',
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      transition: 'all 0.7s cubic-bezier(.4,1.2,.6,1)',
      position: 'relative',
      zIndex: pos === 1 ? 2 : 1,
      opacity: pos === 1 ? 1 : 0.7,
      background: '#fff',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      aspectRatio: 'auto'
    };
    if (pos === 0) {
      base.maxWidth = 120;
      base.maxHeight = 120;
      base.transform = animating ? 'translateX(120px)' : 'translateX(0)';
    } else if (pos === 1) {
      base.maxWidth = 200;
      base.maxHeight = 200;
      base.transform = animating ? 'translateX(0)' : 'translateX(0)';
      base.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
    } else if (pos === 2) {
      base.maxWidth = 120;
      base.maxHeight = 120;
      base.transform = animating ? 'translateX(-120px)' : 'translateX(0)';
    }
    return base;
  };

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 40,
      background: 'transparent', // container invisível
      borderBottom: 'none',
      borderTop: 'none',
      padding: '32px 0',
      marginTop: 80,
      minHeight: 180,
      overflow: 'hidden',
      position: 'relative'
    }}>
      <img
        src={imagens[prevIdx]}
        alt={`Promoção ${prevIdx+1}`}
        style={getStyle(0)}
      />
      <img
        src={imagens[midIdx]}
        alt={`Promoção ${midIdx+1}`}
        style={getStyle(1)}
      />
      <img
        src={imagens[nextIdx]}
        alt={`Promoção ${nextIdx+1}`}
        style={getStyle(2)}
      />
    </div>
  );
}

function SecaoFrutas() {
  const frutas = [
    { nome: 'Banana', img: banana },
    { nome: 'Maçã', img: maca },
    { nome: 'Uva', img: uva },
    { nome: 'Abacaxi', img: abacaxi },
    { nome: 'Morango', img: morango },
    { nome: 'Pera', img: pera }
  ];
  return (
    <section id="frutas" style={{
      width: '100%',
      maxWidth: 1100,
      margin: '48px auto 0',
      padding: '40px 0 32px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(120deg, #f1f8e9 0%, #fffde7 60%, #ffe082 100%)',
      borderRadius: 28,
      boxShadow: '0 8px 32px 0 rgba(56,142,60,0.13)',
      border: '2px solid #fffde7',
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden',
      minHeight: 340
    }}>
      <div style={{
        position: 'absolute',
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        background: 'radial-gradient(circle, #ffe082 60%, #fffde7 100%)',
        filter: 'blur(18px)',
        opacity: 0.7,
        zIndex: 0
      }} />
      <h2 style={{ color: '#ff9800', fontWeight: 900, fontSize: 34, marginBottom: 24, letterSpacing: 2, textShadow: '0 2px 8px #fffde7', fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}>🍌 Frutas em destaque</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 32,
        justifyContent: 'center',
        zIndex: 1,
        width: '100%',
        maxWidth: 900,
      }}>
        {frutas.map((fruta, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12, type: 'spring', bounce: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.97)', borderRadius: 20, boxShadow: '0 4px 18px rgba(255,193,7,0.13)', padding: 0, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', border: '2px solid #ffe082', position: 'relative', overflow: 'hidden', width: '100%', minHeight: 280 }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 32px #ffe08299'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(255,193,7,0.13)'; }}
          >
            {/* Balão de preço estilo mercado */}
            <span style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'radial-gradient(circle at 60% 40%, #fff176 70%, #ff9800 100%)',
              color: '#d84315',
              fontWeight: 900,
              fontSize: 20,
              padding: '8px 18px 8px 18px',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 2px 8px #ffecb3',
              border: '2.5px solid #fffde7',
              zIndex: 2,
              transform: 'rotate(-8deg) scale(1.05)',
              textShadow: '0 2px 8px #fffde7',
              letterSpacing: 1
            }}>
              R$ {(Math.random() * 8 + 2).toFixed(2).replace('.', ',')}
            </span>
            <Img src={fruta.img} alt={fruta.nome} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: '18px 18px 0 0', boxShadow: '0 2px 8px rgba(255,193,7,0.13)', display: 'block' }} />
            <span style={{ margin: '18px 0 14px 0', fontWeight: 700, color: '#ff9800', fontSize: 22, letterSpacing: 1, fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}>{fruta.nome}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SecaoLegumes() {
  const legumes = [
    { nome: 'Cenoura', img: cenoura },
    { nome: 'Tomate', img: tomate },
    { nome: 'Batata', img: batata },
    { nome: 'Alface', img: alface },
    { nome: 'Brócolis', img: brocolis },
    { nome: 'Abóbora', img: abobora }
  ];
  return (
    <section id="legumes" style={{
      width: '100%',
      maxWidth: 1100,
      margin: '48px auto 0',
      padding: '40px 0 32px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(120deg, #e0f7fa 0%, #fffde7 60%, #ffe082 100%)',
      borderRadius: 28,
      boxShadow: '0 8px 32px 0 rgba(33,150,243,0.11)',
      border: '2px solid #fffde7',
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden',
      minHeight: 340
    }}>
      <div style={{
        position: 'absolute',
        top: -40,
        left: -40,
        width: 120,
        height: 120,
        background: 'radial-gradient(circle, #b2ebf2 60%, #fffde7 100%)',
        filter: 'blur(18px)',
        opacity: 0.7,
        zIndex: 0
      }} />
      <h2 style={{ color: '#009688', fontWeight: 900, fontSize: 34, marginBottom: 24, letterSpacing: 2, textShadow: '0 2px 8px #fffde7', fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}>🥕 Legumes em destaque</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 32,
        justifyContent: 'center',
        zIndex: 1,
        width: '100%',
        maxWidth: 900,
      }}>
        {legumes.map((legume, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12, type: 'spring', bounce: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.97)', borderRadius: 20, boxShadow: '0 4px 18px rgba(33,150,243,0.13)', padding: 0, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', border: '2px solid #b2ebf2', position: 'relative', overflow: 'hidden', width: '100%', minHeight: 280 }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 32px #b2ebf299'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(33,150,243,0.13)'; }}
          >
            <span style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'radial-gradient(circle at 60% 40%, #b2ebf2 70%, #009688 100%)',
              color: '#00695c',
              fontWeight: 900,
              fontSize: 20,
              padding: '8px 18px 8px 18px',
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 2px 8px #b2ebf2',
              border: '2.5px solid #fffde7',
              zIndex: 2,
              transform: 'rotate(-8deg) scale(1.05)',
              textShadow: '0 2px 8px #fffde7',
              letterSpacing: 1
            }}>
              R$ {(Math.random() * 8 + 2).toFixed(2).replace('.', ',')}
            </span>
            <Img src={legume.img} alt={legume.nome} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: '18px 18px 0 0', boxShadow: '0 2px 8px rgba(33,150,243,0.13)', display: 'block' }} />
            <span style={{ margin: '18px 0 14px 0', fontWeight: 700, color: '#009688', fontSize: 22, letterSpacing: 1, fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}>{legume.nome}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PaginaCompras() {
  return (
    <section id="compras" style={{
      width: '100%',
      maxWidth: 900,
      margin: '48px auto 0',
      padding: '40px 0 32px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(120deg, #e8f5e9 0%, #fffde7 100%)',
      borderRadius: 28,
      boxShadow: '0 8px 32px 0 rgba(56,142,60,0.13)',
      border: '2px solid #fffde7',
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden',
      minHeight: 320
    }}>
      <h2 style={{ color: '#388e3c', fontWeight: 900, fontSize: 32, marginBottom: 24, letterSpacing: 2, textShadow: '0 2px 8px #fffde7', fontFamily: 'Poppins, Arial, Helvetica, sans-serif' }}>
        🛒 Carrinho de Compras
      </h2>
      <p style={{ color: '#333', fontSize: 20, marginBottom: 24, textAlign: 'center', maxWidth: 600, fontWeight: 500 }}>
        Aqui você pode visualizar e finalizar suas compras. Em breve, funcionalidades de adicionar/remover produtos e resumo do pedido!
      </p>
      <div style={{
        width: '100%',
        maxWidth: 600,
        minHeight: 120,
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 2px 12px #388e3c22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#888',
        fontSize: 18,
        fontStyle: 'italic',
        padding: '32px 0',
        marginBottom: 16
      }}>
        Seu carrinho está vazio.
      </div>
      <button style={{
        background: 'linear-gradient(90deg, #43a047 0%, #8bc34a 100%)',
        color: '#fff',
        fontWeight: 700,
        fontSize: 20,
        padding: '14px 40px',
        borderRadius: 14,
        boxShadow: '0 4px 16px #43a04733',
        border: 'none',
        letterSpacing: 1,
        transition: 'background 0.2s, transform 0.2s',
        marginTop: 8,
        cursor: 'pointer',
        textShadow: '0 2px 8px #388e3c44',
        fontFamily: 'Poppins, Arial, Helvetica, sans-serif'
      }}
        onMouseOver={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #388e3c 0%, #689f38 100%)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'linear-gradient(90deg, #43a047 0%, #8bc34a 100%)'; e.currentTarget.style.transform = 'scale(1)'; }}
        disabled
      >
        Finalizar compra
      </button>
    </section>
  );
}

function MapaLocalizacao() {
  return (
    <section style={{
      width: '100%',
      maxWidth: 800,
      margin: '40px auto 0',
      padding: '32px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(120deg, #e3f2fd 0%, #fffde7 100%)',
      borderRadius: 24,
      boxShadow: '0 8px 32px 0 rgba(33,150,243,0.10)',
      border: '2px solid #fffde7',
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden',
      minHeight: 180
    }}>
      <h2 style={{ color: '#1976d2', fontWeight: 900, fontSize: 30, marginBottom: 18, letterSpacing: 2, textShadow: '0 2px 8px #fffde7' }}>
        📍 Nossa localização
      </h2>
      <p style={{ color: '#333', fontSize: 18, marginBottom: 24, textAlign: 'center', maxWidth: 500 }}>
        Veja onde estamos! Venha nos visitar e aproveite as ofertas presencialmente.
      </p>
      <div style={{ width: '100%', maxWidth: 600, height: 320, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px #1976d244', border: '2px solid #e3f2fd' }}>
        <iframe
          title="Mapa Mercado"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-46.633309%2C-23.55052%2C-46.623309%2C-23.54052&amp;layer=mapnik"
          style={{ width: '100%', height: '100%', border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

function ContatoInfo() {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(90deg, #388e3c 0%, #43a047 100%)',
      color: '#fff',
      padding: '36px 0 24px 0',
      marginTop: 48,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      boxShadow: '0 -4px 24px #388e3c22',
      fontFamily: 'Poppins, Arial, Helvetica, sans-serif',
      letterSpacing: 0.5
    }}>
      <h2 style={{ fontWeight: 900, fontSize: 22, marginBottom: 8, letterSpacing: 2, textShadow: '0 2px 8px #2e7d32' }}>
        Contato & Informações
      </h2>
      <p style={{ fontSize: 16, margin: '6px 0', fontWeight: 500 }}>
        Telefone: <a href="tel:+5511999999999" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 700 }}>+55 (11) 99999-9999</a>
      </p>
      <p style={{ fontSize: 16, margin: '6px 0', fontWeight: 500 }}>
        Email: <a href="mailto:contato@mercadovite.com" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 700 }}>contato@mercadovite.com</a>
      </p>
      <p style={{ fontSize: 16, margin: '6px 0', fontWeight: 500 }}>
        Endereço: Av. Exemplo, 1234 - Centro, São Paulo/SP
      </p>
      <div style={{ marginTop: 18, fontSize: 14, opacity: 0.8 }}>
        &copy; {new Date().getFullYear()} Mercado Dashboard. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function App() {
  const [pagina, setPagina] = useState('dashboard');

  return (
    <>
      <Navbar onNavigate={setPagina} pagina={pagina} />
      {pagina === 'dashboard' ? (
        <>
          <ImagensLinha />
          <SecaoFrutas />
          <SecaoLegumes />
          <MapaLocalizacao />
          <ContatoInfo />
        </>
      ) : (
        <ProdutosMercado />
      )}
    </>
  )
}

export default App
