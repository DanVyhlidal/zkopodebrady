import './ProvozniRad.css';

export default function ProvozniRad() {
  return (
    <div className="provozni-rad-page">
      <h2 className="page-header">PROVOZNÍ ŘÁD</h2>

      <div className="provozni-rad-intro">
        <p>Celý areál cvičiště včetně jeho zázemí slouží k provozování zájmové kynologické činnosti a kynologickému výcviku psů podle platných stanov ČKS a zkušebních řádů platných pro sportovní výcvik.</p>
        <p><b>Všichni přítomní v areálu cvičiště jsou povinni se řídit tímto provozním řádem.</b></p>
      </div>

      <div className="rules-list">
        <div className="rule-item">
          <h3>1. Zákaz vstupu s nemocným či řádně nenaočkovaným psem</h3>
        </div>

        <div className="rule-item">
          <h3>2. Háravé feny mají vstup do areálu pouze po předchozí dohodě s instruktorem</h3>
        </div>

        <div className="rule-item">
          <h3>3. Do areálu je nutné vstupovat se psem na vodítku (uvolnit psa z vodítka lze pouze se souhlasem instruktora nebo v době, kdy neprobíhá žádný výcvik)</h3>
        </div>

        <div className="rule-item">
          <h3>4. Zákaz volného pobíhání psů bez dozoru psovoda</h3>
        </div>

        <div className="rule-item">
          <h3>5. Účastníci výcvikových kurzů mají povinnost</h3>
          <ul>
            <li>chodit včas na začátek výcviku</li>
            <li>dodržovat pokyny výcvikových instruktorů</li>
            <li>při nácviku obran se řídit pokyny figurantů</li>
            <li>použivat vhodné výcvikové pomůcky</li>
            <li>psa nepřetěžovat a netýrat</li>
          </ul>
        </div>

        <div className="rule-item">
          <h3>6. Pokud probíhá kurz začátečníků je možné na opačném konci výcvikové plochy Individuálně cvičit (bezpečnou vzdálenost vždy vymezuje instruktor kurzu)</h3>
        </div>

        <div className="rule-item">
          <h3>7. Každý návštěvník má povinnost uklízet výkaly po svém psu v prostorách cvičiště i okolo něj</h3>
        </div>

        <div className="rule-item">
          <h3>8. Za škody způsobené psem plně odpovídá a hradí je jeho majitel !!!</h3>
        </div>

        <div className="rule-item">
          <h3>9. Agresivní psi musí mít náhubek po celou dobu pobytu na cvičišti</h3>
        </div>

        <div className="rule-item">
          <h3>10. Zákaz přibližování k cizím odloženým psům!!!</h3>
        </div>

        <div className="rule-item">
          <h3>11. Nezletilé osoby mají povolen vstup v doprovodu osoby starší 18 let nebo s písemným souhlasem zákonných zástupců</h3>
        </div>
      </div>
    </div>
  );
}
