import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import HouseCard from './components/HouseCard/HouseCard';
import Houses from './components/Houses/Houses';
import CreateHouse from './components/CreateHouse/CreateHouse';
import HouseDetail from './components/HouseDetail/HouseDetail';
function App() {
  return (
    <div className="App">
            <Nav />
        <Switch>
            <Route exact path="/" component={Houses} /> {/* UNA DE LAS FORMAS */}
            <Route exact path="/houses/:houseId" component={HouseDetail} />
            <Route exact path='/house/create' component={CreateHouse} />
        </Switch>
    </div>
  );
};

export default App;
