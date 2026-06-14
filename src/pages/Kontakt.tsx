import './Kontakt.css';

export default function Kontakt() {
  return (
    <div className="kontakt-page">
      <div className="container">
        <h2 className="page-header">OBECNÉ INFORMACE</h2>
        <div className="kontakt-layout">
          {/* Column 1: Map */}
          <div className="kontakt-col map-col">
            <div className="map-placeholder">
              <iframe 
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_DRIVE_API_KEY}&q=50.1650556,15.0928333&language=cs`}
                width="100%" 
                height="100%" 
                frameBorder="0"
                style={{ border: 'none' }} 
                title="Mapa ZKO Poděbrady"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Column 2: Info */}
          <div className="kontakt-col info-col">
            <h3 className="kontakt-org-name"><i>ZÁKLADNÍ KYNOLOGICKÁ ORGANIZACE</i> - 349</h3>
            <h2 className="kontakt-city">PODĚBRADY</h2>
            
            <ul className="kontakt-list">
              <li>
                <span className="kontakt-icon"><i className="fas fa-map-marker-alt"></i></span>
                <span className="kontakt-text"><a href="https://maps.google.com/?q=50.1650556,15.0928333" target="_blank" rel="noopener noreferrer">V Hruškách, 290 01 Poděbrady</a></span>
              </li>
              <li>
                <span className="kontakt-icon"><i className="far fa-clock"></i></span>
                <span className="kontakt-text">Provozní doba: neděle 9h - 12h, ostatní dny dle dohody</span>
              </li>
              <li>
                <span className="kontakt-icon"><i className="fas fa-user-clock"></i></span>
                <span className="kontakt-text">
                  Začátečník, pokročilý : Neděle 9h - 10h<br />
                  Sportovní kynologie: Neděle 9h - 12h
                </span>
              </li>
              <li>
                <span className="kontakt-icon"><i className="far fa-envelope"></i></span>
                <span className="kontakt-text"><a href="mailto:zkopodebrady@seznam.cz">zkopodebrady@seznam.cz</a></span>
              </li>
              <li>
                <span className="kontakt-icon"><i className="fas fa-phone-alt"></i></span>
                <span className="kontakt-text">
                  +420 737 165 615 - Benešová Eva (Výcvik)<br />
                  +420 723 232 612 - Čeněk Hetver (Správce areálu)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
