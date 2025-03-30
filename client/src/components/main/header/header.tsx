import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../types/routes.types';
import { ContinentsList } from '../../../types/common.types';
import { useState, useEffect, useRef } from 'react';
import { useDataListContext } from '../../../context';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLSpanElement | null>(null);
  const { continentsList } = useDataListContext();
  const goTo = (url: string) => {
    navigate(url);
  };

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header" role="banner">
      <div className="header__items">
        <div className="header__logo-container">
          <img
            src="/assets/main-logo.png"
            alt="SDG logo"
            className="header__logo-img"
            onClick={() => {
              goTo(RoutePaths.CONTINENTS);
            }}
            data-testid="header-logo"
          />
        </div>
        <div className="header__links-container">
          <button
            className={`header__link --continents ${location.pathname.includes(RoutePaths.CONTINENTS) ? '--active' : ''}`}
            onClick={() => {
              goTo(RoutePaths.CONTINENTS);
            }}
          >
            Continents
          </button>
          <div className="header__dropdown-switch">
            <span
              ref={buttonRef}
              className={`header__link${!location.pathname.includes(RoutePaths.CONTINENTS) ? ' --active' : ''}`}
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
              Countries
            </span>
            <div
              ref={dropdownRef}
              className={`header__dropdown ${isDropdownVisible ? 'visible' : ''}`}
            >
              {Object.values(ContinentsList).map((continent) => (
                <button
                  key={continent}
                  className="header__dropdown-item"
                  onClick={() => {
                    goTo(`/${continent.toLowerCase()}`);
                    setIsDropdownVisible(false);
                  }}
                >
                  {continent}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
