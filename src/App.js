import './App.css';
import {Header} from '../src/Components';
import SimpleBottomNavigation from './Components/BottomNavbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import Favorite from './Components/Favorite/Favorite';
import WatchLater from './Components/WatchLater/WatchLater';
import { Cover } from '../src/Components';


function App() {
  return (
    <BrowserRouter>
      
        <Header/>
        <div className="App">
          <Container>
            <Switch>
              <Route path='/' component={Cover} exact/>
              <Route path='/favorites' component={Favorite}/>
              <Route path='/watchlater' component={WatchLater}/>
            </Switch>
          </Container>
        </div>
          
        
        <SimpleBottomNavigation/>   
     
      
    </BrowserRouter>
  );
}

export default App;
