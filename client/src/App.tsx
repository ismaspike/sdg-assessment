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
import Continents from './components/main/continents/continents';

const App = () => {
  return (
    <div className="app">
      <DataListProvider>
        <Router>
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
                element={<Continents />}
              />
              {Object.values(ContinentsList).map((continent) => (
                <Route
                  key={continent}
                  path={continent}
                  element={<Continents />}
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
