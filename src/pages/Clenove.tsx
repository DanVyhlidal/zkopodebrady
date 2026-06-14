import { useState, useEffect } from 'react';
import './Clenove.css';

const getAssetPath = (path: string) => path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;

interface Dog {
  name: string;
  dob?: string;
  exams?: string;
  shows?: string;
  breeding?: string;
  bonitation?: string;
  image?: string;
}

interface Member {
  name: string;
  dogs: Dog[];
}

export default function Clenove() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage === null) return;
      if (e.key === 'Escape') {
        setLightboxImage(null);
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  useEffect(() => {
    async function loadMembers() {
      setIsLoading(true);
      const modules = import.meta.glob('/src/data/members/*.json');
      
      const loadPromises = Object.values(modules).map(async (moduleFn) => {
        const module = await moduleFn() as { default: Member };
        return module.default;
      });

      const loadedMembers = await Promise.all(loadPromises);
      loadedMembers.sort((a, b) => a.name.localeCompare(b.name, 'cs'));
      
      setMembers(loadedMembers);
      setIsLoading(false);
    }

    loadMembers();
  }, []);

  return (
    <div className="clenove-page">
      <h2 className="page-header">Členové</h2>
      <div className="members-list">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} className="member-card skeleton-card">
              <div className="skeleton-title"></div>
              <div className="dogs-list">
                <div className="dog-card skeleton-dog-card">
                  <div className="dog-info">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                  </div>
                  <div className="dog-image-container skeleton-image"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          members.map((member, index) => (
            <div key={index} className="member-card">
              <h3 className="member-name">{member.name}</h3>
              {member.dogs && member.dogs.length > 0 && (
                <div className="dogs-list">
                {member.dogs.map((dog, dIndex) => (
                  <div key={dIndex} className="dog-card">
                    <div className="dog-info">
                      <p><span className="info-label">Jméno psa:</span> <span className="info-value">{dog.name || '-'}</span></p>
                      <p><span className="info-label">Datum narození:</span> <span className="info-value">{dog.dob || '-'}</span></p>
                      <p><span className="info-label">Zkoušky:</span> <span className="info-value">{dog.exams || '-'}</span></p>
                      <p><span className="info-label">Výstavy:</span> <span className="info-value">{dog.shows || '-'}</span></p>
                      <p><span className="info-label">Bonitace:</span> <span className="info-value">{dog.bonitation || '-'}</span></p>
                      {dog.breeding && dog.breeding !== '-' && (
                        <p><span className="info-label">Chovnost:</span> <span className="info-value">{dog.breeding}</span></p>
                      )}
                    </div>
                    <div className="dog-image-container" onClick={() => {
                      if (dog.image) {
                        setLightboxImage(dog.image);
                        setIsZoomed(false);
                      }
                    }}>
                      <img
                        src={dog.image ? getAssetPath(dog.image) : getAssetPath("/images/clenove/placeholder.png")}
                        alt={`Pes ${dog.name}`}
                        className="dog-image"
                        loading="lazy"
                        decoding="async"
                      />
                      {dog.image && (
                        <div className="photo-overlay">
                          <span className="zoom-icon">🔍</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage !== null && (
        <div className="lightbox-overlay" onClick={() => { setLightboxImage(null); setIsZoomed(false); }}>
          <button className="lightbox-close" onClick={() => { setLightboxImage(null); setIsZoomed(false); }}>&times;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={getAssetPath(lightboxImage)} 
              alt="Detail" 
              className={isZoomed ? 'zoomed' : ''}
              onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
