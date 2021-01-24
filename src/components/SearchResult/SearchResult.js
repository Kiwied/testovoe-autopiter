import React from "react";

import './SearchResult.css';
import okIcon from '../../images/ok-sign.svg';

export default function SearchResult({ result, setSavedResults, savedResults }) {
  const [isResultSaved, setIsResultSaved] = React.useState(false);

  // проверка сохранена ли уже эта организация
  React.useEffect(() => {
    setIsResultSaved(false);
    savedResults.map((org) => org.data.inn === result.data.inn && setIsResultSaved(true));
  }, [])

  function handleSaveResult() {
    setSavedResults([result, ...savedResults]);
    localStorage.removeItem('saved');
    localStorage.setItem('saved', JSON.stringify([result, ...savedResults]));
    setIsResultSaved(true);
  }

  return (
    <div className="orgs__result">
      <h2 className="result__name">{result.value}</h2>

      <div className="result__container">
        <div className="result__data-container">
          <div className="result__data">
            <h3 className="result__data-title">Юридический адрес</h3>
            <p className="result__data-value">{result.data.address.unrestricted_value}</p>
          </div>

          <div className="result__data">
            <h3 className="result__data-title">
              {
                // проверка на ИП, т.к. у них в объекте нет 'management' свойства
                result.data.type !== 'INDIVIDUAL'
                  ? result.data.management.post.charAt(0)
                  + result.data.management.post.slice(1).toLowerCase()
                  : result.data.opf.full
              }
            </h3>
            <p className="result__data-value">
              { result.data.type !== 'INDIVIDUAL'
                ? result.data.management.name
                : result.data.name.full
              }
            </p>
          </div>

          {
            !isResultSaved
              ? <button type="button"
                        className="result__save-btn"
                        onClick={handleSaveResult}>Сохранить</button>
              : <button type="button"
                        className="result__save-btn result__save-btn_saved">
                  <img src={okIcon} alt="Сохранено"/> Сохранено</button>
          }
        </div>

        <div className="result__numbers">
          <p className="result__number">
            <span className="result__number result__number_span">ИНН</span>
            {result.data.inn}
          </p>
          {
            // проверка на присутствие свойства kpp, т.к. не у всех
            // организаций есть КПП
            result.data.kpp &&
            <p className="result__number">
              <span className="result__number result__number_span">КПП</span>
              {result.data.kpp}
            </p>
          }
          <p className="result__number">
            <span className="result__number result__number_span">ОГРН</span>
            {result.data.ogrn}
          </p>
        </div>
      </div>
    </div>
  )
}
