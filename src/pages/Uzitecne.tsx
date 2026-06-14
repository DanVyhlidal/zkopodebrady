import './Uzitecne.css';

export default function Uzitecne() {
  const links = [
    { title: 'Zkušební řády', url: 'https://www.kynologie.cz/zkusebni-rady.htm', image: '/images/uzitecne/zkusebni_rady.png' },
    { title: 'Český kynologický svaz', url: 'http://www.kynologie.cz/', image: '/images/uzitecne/cesky_kynologicky_svaz.png' },
    { title: 'Český klub německých ovčáků', url: 'https://www.sckno.cz/', image: '/images/uzitecne/cesky_club_ovcaku.jpg' },
    { title: 'Centrální evidenci zvířat a věcí ČR', url: 'https://www.identifikace.cz/', image: '/images/uzitecne/centralni_evidence.webp' },
    { title: 'Registr zvířat – BackHome', url: 'https://www.backhome.cz/', image: '/images/uzitecne/backhome.jpg' },
    { title: 'Evidence pasů společenských zvířat a čipů', url: 'https://www.petpas.sk/', image: '/images/uzitecne/evidence_pasu.jpg' },
  ];

  return (
    <div className="uzitecne-page">
      <h2 className="page-header">UŽITEČNÉ ODKAZY</h2>

      <div className="links-list">
        {links.map((link, index) => (
          <div key={index} className="link-row">
            <div className="link-icon-column">
              {link.image ? (
                <img src={link.image} alt={link.title} className="uzitecne-image" />
              ) : (
                <div className="link-icon-placeholder">
                  {/* Empty placeholder to maintain layout */}
                </div>
              )}
            </div>
            <div className="link-text-column">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
