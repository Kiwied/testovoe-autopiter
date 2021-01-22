import React from "react";

import './SavedResult.css';
import arrowUp from '../../images/arrow-up.svg';
import arrowDown from '../../images/arrow-down.svg';

export default function SavedResult({ org, setSavedResults, savedResults }) {
  const [areDetailsOpen, setAreDetailsOpen] = React.useState(false);

  // удаление организации из Сохраненных
  function handleDeleteResult() {
    setSavedResults((savedResult) => savedResult.filter((data) => data.data.inn !== org.data.inn))
    const newSavedResults = savedResults.filter((data) => data.data.inn !== org.data.inn)
    localStorage.setItem('saved', JSON.stringify(newSavedResults));
  }

  function handleOpenDetails() {
    setAreDetailsOpen(!areDetailsOpen);
  }

  return (
    <div className="saved-result">
      <h3 className="saved-result__name">{org.value}</h3>
      <div className="saved-result__data-container">
        <p className="saved-result__data">
          <span className="saved-result__data_span">ИНН</span>
          {org.data.inn}
        </p>
        {
          areDetailsOpen &&
          (
            <>
              {
                // проверка на присутствие свойства kpp, т.к. не у всех
                // организаций есть КПП
                org.data.kpp &&
                <p className="saved-result__data">
                  <span className="saved-result__data_span">КПП</span>
                  {org.data.kpp}
                </p>
              }
              <p className="saved-result__data">
                <span className="saved-result__data_span">ОГРН</span>
                {org.data.ogrn}
              </p>
              <p className="saved-result__data">
                <span className="saved-result__data_span">Юридический адрес</span>
                {org.data.address.unrestricted_value}
              </p>
              <p className="saved-result__data">
                <span className="saved-result__data_span">
                  {
                    // проверка на ИП, т.к. у них в объекте нет 'management' свойства
                    org.data.type !== 'INDIVIDUAL'
                      ? org.data.management.post.charAt(0)
                      + org.data.management.post.slice(1).toLowerCase()
                      : org.data.opf.full
                  }
                </span>
                { org.data.type !== 'INDIVIDUAL'
                  ? org.data.management.name
                  : org.data.name.full
                }
              </p>
            </>
          )
        }
      </div>
      <button type="button"
              className="saved-result__delete-btn"
              onClick={handleDeleteResult}/>
      {!areDetailsOpen
        ? (<button type="button"
                   className="saved-result__details-btn"
                   onClick={handleOpenDetails}>
            подробнее<img src={arrowDown}
                          alt="подробнее"
                          className="saved-result__details-icon"/>
          </button>)
        : (<button type="button"
                   className="saved-result__details-btn"
                   onClick={handleOpenDetails}>
            скрыть подробности<img src={arrowUp}
                                   alt="скрыть подробности"
                                   className="saved-result__details-icon"/>
          </button>)
      }
    </div>
  )
}
