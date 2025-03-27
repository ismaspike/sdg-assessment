import './styles/main.scss';
import { DataListProvider } from './context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { ContinentsList } from './types/common.types';
import { RoutePaths } from './types/routes.types';
import Header from './components/main/header/header';
import ChartPage from './components/main/chart-page/chart-page';

const App = () => {
  return (
    <div className="app">
      <DataListProvider>
        <Router>
          <div className="header-container">
            <Header />
          </div>
          <div className="content-container">
            <Routes>
              <Route
                key="not-found"
                path={RoutePaths.NOT_FOUND}
                element={<Navigate to={RoutePaths.CONTINENTS} replace />}
              />
              <Route
                key="default"
                path={RoutePaths.DEFAULT}
                element={<Navigate to={RoutePaths.CONTINENTS} replace />}
              />
              <Route
                key={RoutePaths.CONTINENTS}
                path={RoutePaths.CONTINENTS}
                element={<ChartPage />}
              />
              {Object.values(ContinentsList).map((continent) => (
                <Route
                  key={continent}
                  path={continent}
                  element={<ChartPage continent={continent} />}
                />
              ))}
            </Routes>
          </div>
        </Router>
      </DataListProvider>
    </div>
  );
};

export default App;
