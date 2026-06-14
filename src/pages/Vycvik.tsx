import './Vycvik.css';

export default function Vycvik() {
  return (
    <div className="vycvik-page">
      <h2 className="page-header">VÝCVIK</h2>

      <div className="vycvik-columns">
        <div className="vycvik-column">
          <h3 className="column-title">ZAČÁTEČNÍK / POKROČILÝ</h3>
          <div className="vycvik-image-placeholder">
            <img src="/images/vycvik/zacatecnici_thumbnail.jpg" alt="Začátečník / Pokročilý" />
          </div>

          <ul className="info-list">
            <li>
              <span className="vycvik-icon"><i className="far fa-clock"></i></span>
              <span className="info-text">
                <strong>Den konání:</strong> vždy v neděli od 9h - 10h
              </span>
            </li>
            <li>
              <span className="vycvik-icon"><i className="fas fa-wallet"></i></span>
              <span className="info-text">
                <strong>Cena kurzu pro začátečníky:</strong> 2 000,- Kč / 12 lekcí<br />
                <strong>Cena kurzu pro pokročilé:</strong> 2 000,- Kč / rok
              </span>
            </li>
            <li>
              <span className="vycvik-icon"><i className="fas fa-info-circle"></i></span>
              <span className="info-text">
                V případě zájmu o kurz se dostavte v neděli od 9 hod. do areálu cvičiště, případně telefonicky kontaktujte naši výcvikářku pí. Benešovou (737 165 615)
              </span>
            </li>
          </ul>

          <h4 className="section-title">Co vás čeká</h4>
          <ul className="bullet-list">
            <li>základy poslušnosti</li>
            <li>nácvik obran</li>
            <li>socializace vašeho pejska v rámci poznání cizího prostředí, seznamování s cizími psy a získání důvěry k cizím lidem</li>
          </ul>

          <h4 className="section-title">Co s sebou</h4>
          <ul className="bullet-list">
            <li>očkovací průkaz s platným očkováním</li>
            <li>vodítko</li>
            <li>hladký stahovací řetízkový obojek</li>
            <li>kožený obojek na obrany</li>
            <li>měkký míček na šňůrce nebo jinou hračku</li>
            <li>pamlsky (ne granule)</li>
          </ul>

          <h4 className="section-title">HLAVNÍ VÝCVIKÁŘ :</h4>
          <p>Benešová Eva</p>

          <h4 className="section-title">Po absolvování</h4>
          <p>Po absolvování výcvikového kurzu pro začátečníky se můžete přihlásit do kurzu pro pokročilé a pokračovat ve výcviku svého psa i nadále.</p>
          <p><b>Podmínkou pro vstup do kurzu pro pokročilé, je absolvování výcviku pro začátečníky.</b></p>
        </div>

        <div className="vycvik-column">
          <h3 className="column-title">SPORTOVNÍ KYNOLOGIE</h3>
          <div className="vycvik-image-placeholder">
            <img src="/images/vycvik/Sportovni_kynologie_thumbnail.jpg" alt="Sportovní Kynologie" />
          </div>

          <ul className="info-list">
            <li>
              <span className="vycvik-icon"><i className="far fa-clock"></i></span>
              <span className="info-text">
                <strong>Den konání:</strong> vždy v neděli od 9h
              </span>
            </li>
            <li>
              <span className="vycvik-icon"><i className="fas fa-wallet"></i></span>
              <span className="info-text">
                <strong>Cena nečlen:</strong> 2000,- Kč / rok
              </span>
            </li>
          </ul>

          <h4 className="section-title">Co vás čeká</h4>
          <ul className="bullet-list">
            <li>nácvik poslušnosti podle zkušebních řádů NZŘ, IGP</li>
            <li>nácvik obran</li>
            <li>nácvik stop</li>
            <li>příprava na zkoušky (dle zkušebních řádů), výstavy, bonitace</li>
          </ul>

          <h4 className="section-title">HLAVNÍ VÝCVIKÁŘ :</h4>
          <p>Benešová Eva</p>

          <h4 className="section-title">Figuranti:</h4>
          <p>Krupka Karel<br />Hrubý Zdeněk</p>
          <p><b>V případě, že máte zájem o sportovní kynologii rádi vás seznámíme s podmínkami, za kterých se jí můžete věnovat.</b></p>
        </div>
      </div>
    </div>
  );
}
