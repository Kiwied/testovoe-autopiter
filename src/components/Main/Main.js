import React from "react";
import { Switch, Route, NavLink } from 'react-router-dom';

import './Main.css';
import SearchField from "../SearchField/SearchField";
import plusSign from "../../images/plus_sign.svg";
import SearchResult from "../SearchResult/SearchResult";
import SavedResult from "../SavedResult/SavedResult";

export default function Main({ fetchSuggestions, result, suggestions,
                               setResult, setSuggestions, setIsInputFocused,
                               isInputFocused, setSavedResults, savedResults })
{
  // вспомогательная функция для проверки объекта на "пустоту"
  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  // "отчистка" страницы при переходе на нее обратно с '/saved'
  const handleClearPage = () => {
    window.location.pathname !== '/' && setResult({});
    setSuggestions([]);
  }

  return (
    <main className="main">
      <h1 className="main__title">Мои организации</h1>

      <section className="main__container">
        <nav className="navigation">
          <NavLink exact to="/"
                   className="navigation__link"
                   activeClassName="navigation__link navigation__link_active"
                   onClick={handleClearPage}
          >Новая организация</NavLink>

          <NavLink to="/saved"
                   className="navigation__link"
                   activeClassName="navigation__link navigation__link_active"
          >Сохраненные организации ({savedResults.length})</NavLink>
        </nav>
          <Switch>
            <Route exact path="/">
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
            </Route>

            <Route path="/saved">
              <div className="orgs">
                {
                  savedResults.map((org, i) => (
                    <SavedResult org={org}
                                 key={i}
                                 setSavedResults={setSavedResults}
                                 savedResults={savedResults}
                    />
                  ))
                }
              </div>
            </Route>
          </Switch>
      </section>
    </main>
  )
}
