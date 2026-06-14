import { useState, useEffect } from 'react';
import './Galerie.css';

interface GalleryEvent {
  title: string;
  date: string;
  drive_folder_id: string;
}

interface DriveImage {
  id: string;
  name: string;
  thumbnailLink?: string;
}

const getThumbnailUrl = (img: DriveImage, size: string) => {
  if (img.thumbnailLink) {
    const lastEqualsIndex = img.thumbnailLink.lastIndexOf('=');
    if (lastEqualsIndex !== -1) {
      return img.thumbnailLink.substring(0, lastEqualsIndex) + '=' + size;
    }
  }
  return `https://drive.google.com/thumbnail?id=${img.id}&sz=${size}`;
};

export default function Galerie() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [images, setImages] = useState<DriveImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImageLoading, setLightboxImageLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  // Fetch gallery subfolders (events) from the main Google Drive folder
  useEffect(() => {
    async function loadEvents() {
      const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
      const rootFolderId = import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID;
      
      if (!apiKey || !rootFolderId) {
        setError('Chybí VITE_GOOGLE_DRIVE_API_KEY nebo VITE_GOOGLE_DRIVE_ROOT_FOLDER_ID v .env souboru.');
        return;
      }

      try {
        const query = `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
        // orderBy=createdTime desc to sort by latest created folder first
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,createdTime)&orderBy=createdTime desc`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Chyba při načítání alb z Google Drive.');
        }
        
        const data = await response.json();
        const loaded: GalleryEvent[] = (data.files || []).map((f: any) => ({
          title: f.name,
          date: f.createdTime || new Date().toISOString(),
          drive_folder_id: f.id
        }));

        // Sort by date extracted from title, fallback to createdTime
        loaded.sort((a, b) => {
          const parseDate = (name: string, fallback: string) => {
            const match = name.match(/(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/);
            if (match) {
              const day = parseInt(match[1], 10);
              const month = parseInt(match[2], 10) - 1;
              const year = parseInt(match[3], 10);
              return new Date(year, month, day).getTime();
            }
            return new Date(fallback).getTime();
          };
          return parseDate(b.title, b.date) - parseDate(a.title, a.date);
        });

        setEvents(loaded);
        if (loaded.length > 0) {
          setSelectedEvent(loaded[0]);
        }
      } catch (err: any) {
        setError(err.message || 'Neznámá chyba při načítání alb.');
      }
    }
    loadEvents();
  }, []);

  // Fetch images when an event is selected
  useEffect(() => {
    if (!selectedEvent) return;

    async function fetchImages() {
      setLoadingImages(true);
      setError(null);
      setLightboxIndex(null); // Reset lightbox on event change
      
      const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;
      if (!apiKey) {
        setError('Google Drive API Key chybí. Přidejte VITE_GOOGLE_DRIVE_API_KEY do .env souboru.');
        setLoadingImages(false);
        return;
      }

      try {
        const folderId = selectedEvent!.drive_folder_id;
        // Search for all images within the specific folder
        const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,thumbnailLink)`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Chyba při načítání obrázků z Google Drive. Je složka veřejná?');
        }
        
        const data = await response.json();
        setImages(data.files || []);
      } catch (err: any) {
        setError(err.message || 'Neznámá chyba');
      } finally {
        setLoadingImages(false);
      }
    }

    fetchImages();
  }, [selectedEvent]);

  // Reset loading state when lightbox image changes
  useEffect(() => {
    setLightboxImageLoading(true);
  }, [lightboxIndex]);

  // Lightbox navigation
  const openLightbox = (index: number) => { setLightboxIndex(index); setIsZoomed(false); };
  const closeLightbox = () => { setLightboxIndex(null); setIsZoomed(false); };
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    setIsZoomed(false);
  };
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
        setIsZoomed(false);
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <div className="galerie-page">
      <div className="container">
        <h2 className="page-header">Galerie</h2>
        
        <div className="gallery-tabs">
          {events.map((evt, index) => (
            <button 
              key={index} 
              className={`gallery-tab ${selectedEvent === evt ? 'active' : ''}`}
              onClick={() => setSelectedEvent(evt)}
            >
              {evt.title}
            </button>
          ))}
        </div>

        <div className="gallery-view">
          {error && <div className="error">{error}</div>}
          
          {loadingImages && !error && (
            <div className="photos-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="photo-item skeleton-pulse"></div>
              ))}
            </div>
          )}
          
          {!loadingImages && !error && images.length === 0 && selectedEvent && (
            <div className="no-images">V této galerii nejsou žádné fotografie.</div>
          )}
          
          {!loadingImages && !error && images.length > 0 && (
            <div className="photos-grid">
              {images.map((img, index) => (
                <div key={img.id} className="photo-item" onClick={() => openLightbox(index)}>
                  <img 
                    src={getThumbnailUrl(img, 'w400')} 
                    alt={img.name} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="gallery-thumbnail"
                  />
                  <div className="photo-overlay"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
          <button className="lightbox-prev" onClick={goToPrevious}>&#10094;</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightboxImageLoading && <div className="lightbox-loader"></div>}
            <img 
              src={getThumbnailUrl(images[lightboxIndex], 'w2000')} 
              alt={images[lightboxIndex].name} 
              referrerPolicy="no-referrer"
              onLoad={() => setLightboxImageLoading(false)}
              style={{ display: lightboxImageLoading ? 'none' : 'block' }}
              className={isZoomed ? 'zoomed' : ''}
              onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
            />
            {!lightboxImageLoading && (
              <div className="lightbox-caption">{lightboxIndex + 1} / {images.length}</div>
            )}
          </div>
          <button className="lightbox-next" onClick={goToNext}>&#10095;</button>
        </div>
      )}
    </div>
  );
}
