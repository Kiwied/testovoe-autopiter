import React from 'react';

import SearchField from "../components/SearchField/SearchField";
import plusSign from "../images/plus_sign.svg";
import SearchResult from "../components/SearchResult/SearchResult";
import './NewOrgPage.css';

export default function NewOrgPage({ fetchSuggestions, suggestions, setResult,
                                     setIsInputFocused, isInputFocused, result,
                                     setSavedResults, savedResults })
{
  // вспомогательная функция для проверки объекта на "пустоту"
  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  return (
    <div className="orgs">
      <h3 className="orgs__title">Организация или ИП</h3>
      <SearchField fetchSuggestions={fetchSuggestions}
                   suggestions={suggestions}
                   setResult={setResult}
                   setIsInputFocused={setIsInputFocused}
                   isInputFocused={isInputFocused}
      />
      {
        // проверка для определения отрисовки результата
        // или его отсутствия
        isEmpty(result) ? (
          <div className="orgs__no-results">
            <img src={plusSign}
                 alt="Добавление новой организации"
                 className="orgs__add-org-icon"/>
            <p className="orgs__add-org-text">
              Для добавления новой организации введите ее
              название, ИНН или адрес.
            </p>
          </div>
        ) : (
          <SearchResult result={result}
                        setSavedResults={setSavedResults}
                        savedResults={savedResults}
          />
        )
      }
    </div>
  )
}
