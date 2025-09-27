import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MapPin, Clock, Calendar, Heart, Crown, Music, Send } from 'lucide-react';
import banabaImage from './banaba1.png';
import mariposaImg from './mariposaSF.png';
import piggibackSong from './piggiback.mp3';


declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const QuinceaneraWebsite = () => {
  // Contador regresivo
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  // Música
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  // RSVP
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  
  // Animaciones
  const butterfliesRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const eventDate = new Date('2025-10-11T16:00:00'); // Fecha del evento

  // -------------------- Animaciones --------------------
  useEffect(() => {
    const container = butterfliesRef.current;
    if (!container) return;

    // Animación de aleteo
    gsap.to(".butterfly", {
      scaleY: 0.8,
      duration: 0.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    })

  }, []);

  // -------------------- Contador regresivo --------------------
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((diff / (1000 * 60)) % 60));
      setSeconds(Math.floor((diff / 1000) % 60));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // -------------------- Música --------------------
  audioRef.current = new Audio(piggibackSong);
  audioRef.current.loop = true;

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-black to-black text-white overflow-hidden relative">
      {/* Partículas brillantes */}
      <div ref={sparklesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(400)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px rgba(255, 105, 180, 0.7)'
            }}
          />
        ))}
      </div>

      {/* Mariposas detrás */}
      <div ref={butterfliesRef} className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => {
          const size = 30 + Math.random() * 40;
          const left = Math.random() * 90 + 5;
          const top = Math.random() * 80 + 10;
          const hue = Math.floor(Math.random() * 360);
          return (
            <img
              key={`back-${i}`}
              src={mariposaImg}
              alt="Mariposa"
              className="butterfly absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                filter: `drop-shadow(0 0 6px hsl(${hue}, 80%, 70%)) hue-rotate(${hue}deg)`
              }}
            />
          );
        })}
      </div>
      
      {/* Mariposas delante */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {[...Array(20)].map((_, i) => {
          const size = 30 + Math.random() * 40;
          const left = Math.random() * 90 + 5;
          const top = Math.random() * 80 + 10;
          const hue = Math.floor(Math.random() * 360);
          return (
            <img
              key={`front-${i}`}
              src={mariposaImg}
              alt="Mariposa"
              className="butterfly absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                filter: `drop-shadow(0 0 8px hsl(${hue}, 90%, 75%)) hue-rotate(${hue}deg)`
              }}
            />
          );
        })}
      </div>



      {/* Botón de música */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 p-3 bg-pink-900/50 backdrop-blur-sm rounded-full border border-pink-500/30 hover:bg-pink-700/50 transition-all duration-300 group"
      >
        <Music className={`w-6 h-6 ${isMusicPlaying ? 'text-pink-300' : 'text-pink-200'}`} />
        <div className={`absolute inset-0 rounded-full bg-pink-500/20 group-hover:bg-pink-500/30 ${isMusicPlaying ? 'animate-ping' : ''}`}></div>
      </button>

      {/* Sección Bienvenida con silueta */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20">
        <div className="text-center mb-12 relative z-10">
          <div className="mb-8">
            <Crown className="w-16 h-16 mx-auto text-pink-300 mb-4 filter drop-shadow-[0_0_10px_rgba(255,105,180,0.7)]" />
            <h1 ref={titleRef} className="text-6xl font-dancing-script text-pink-300">Mis Quince Años</h1>
          </div>
          <div className="relative w-96 h-[30rem] mx-auto mb-12 group">
            <img
              src={banabaImage}
              alt="Quinceañera"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,105,180,0.8)]"
            />
          </div>
          <p className="font-great-vibes text-white text-5xl md:text-5xl">
            Una celebración llena de magia y sueños
          </p>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-pink-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-pink-300 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de Invitación */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-3xl border border-pink-500/30 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24">
            <Heart className="w-full h-full text-pink-500/20" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20">
            <Crown className="w-full h-full text-pink-500/20" />
          </div>
          
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-dancing-script text-pink-300 mb-6 filter drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">
              Estás Invitado
            </h2>
            <p className="text-xl text-pink-200 mb-2">Para celebrar los 15 años de</p>
            <p className="text-3xl md:text-4xl font-bold text-white mb-8 font-great-vibes">Giannina Cesia Oyardo Poma</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="text-pink-400" />
                <span className="text-lg">11 de Octubre, 2025</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-pink-400" />
                <span className="text-lg">16:00 PM</span>
              </div>
            </div>
            
            <p className="text-lg text-pink-100 italic mb-2">"La adolescencia es como una mariposa,</p>
            <p className="text-lg text-pink-100 italic">hermosa y llena de transformaciones"</p>
          </div>
        </div>
      </section>
      
      {/* Sección de Ubicación */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-dancing-script text-pink-300 mb-12 filter drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">
            Ubicación
          </h2>
          
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-pink-500/30 p-6 mb-8">
            <p className="text-lg text-pink-200 mb-4">"CASA JARDIN DE EVENTOS"</p>
            <p className="text-white mb-6">Alto Achumani, Urb. Huayllani calle#1 N°1 "Puente Huayllani"</p>
            
            {/* Espacio para Google Maps */}
            <div className="aspect-video bg-gradient-to-br from-pink-900/50 to-black/50 rounded-lg overflow-hidden border border-pink-500/30 mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d921.4661370463438!2d-68.05174973043658!3d-16.509444999014725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDMwJzM0LjAiUyA2OMKwMDMnMDQuMCJX!5e1!3m2!1sen!2sbo!4v1758940846617!5m2!1sen!2sbo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Quinceañera"
              ></iframe>
            </div>            
            <a 
              href="https://maps.app.goo.gl/VF156vCtX1nmecM56" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-800 rounded-full text-white font-medium hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/30 border border-pink-500/50"
            >
              <MapPin className="w-5 h-5" />
              Cómo llegar desde la 21 de Calacoto
            </a>
          </div>
        </div>
      </section>
      
      {/* Sección de Cuenta Regresiva */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-dancing-script text-pink-300 mb-12 filter drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">
            Cuenta Regresiva
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: days, label: 'Días' },
              { value: hours, label: 'Horas' },
              { value: minutes, label: 'Minutos' },
              { value: seconds, label: 'Segundos' }
            ].map((item, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-md rounded-xl border border-pink-500/30 p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold text-pink-300 mb-2 filter drop-shadow-[0_0_8px_rgba(255,105,180,0.5)]">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-pink-200 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sección de Confirmación (RSVP) */}
      <section className="py-20 px-4 relative">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-dancing-script text-pink-300 mb-12 text-center filter drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">
            Confirma Tu Asistencia
          </h2>
          
          {rsvpSubmitted ? (
            <div className="bg-black/40 backdrop-blur-md rounded-3xl border border-pink-500/30 p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-pink-900 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-pink-300 fill-current" />
              </div>
              <h3 className="text-2xl text-pink-300 mb-4">¡Gracias por confirmar!</h3>
              <p className="text-pink-200">Te esperamos en esta celebración especial</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="bg-black/40 backdrop-blur-md rounded-3xl border border-pink-500/30 p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-pink-200 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-black/30 border border-pink-500/30 rounded-lg px-4 py-3 text-white placeholder-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-pink-200 mb-2">Número de invitados</label>
                  <select
                    id="guests"
                    required
                    className="w-full bg-black/30 border border-pink-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Selecciona...</option>
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-pink-200 mb-2">Mensaje (opcional)</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-black/30 border border-pink-500/30 rounded-lg px-4 py-3 text-white placeholder-pink-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="¿Algo que quieras compartir?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-500 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-pink-500/30 border border-pink-500/50"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Confirmar Asistencia
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md border-t border-pink-500/30 py-10 px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-pink-300 font-great-vibes text-lg md:text-xl">
            Padrino de Torta: <span className="font-bold text-white text-2xl md:text-3xl">Froiland Figueredo y Sra</span>
          </p>
          <p className="text-pink-300 font-great-vibes text-lg md:text-xl">
            Padrinos: <span className="font-bold text-white text-2xl md:text-3xl">Jhimmy Oyardo y Tatiana Meave</span>
          </p>
          <a
            href="https://wa.me/59172508868"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-800 rounded-full text-white font-medium hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/40 border border-pink-500/50"
          >
            Contactar por WhatsApp
          </a>
          <p className="text-pink-200 text-sm mt-4">© 2025 Mis Quince Años. Giannina Cesia Oyardo Poma.</p>
        </div>
      </footer>


      {/* Iframe de música dentro del JSX */}
      <iframe
        id="musicIframe"
        width="0"
        height="0"
        src="https://www.youtube.com/embed/ZkD4TnSDBuQ?enablejsapi=1&autoplay=0&loop=1&playlist=ZkD4TnSDBuQ"
        title="Música de fondo"
        frameBorder="0"
        allow="autoplay"
        style={{ display: 'none' }}
      ></iframe>
    </div>
  );
};

export default QuinceaneraWebsite;
