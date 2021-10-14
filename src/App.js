import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";
import Favorite from "./Components/Favorite/Favorite";
import WatchList from "./Components/WatchLater/WatchLater";
import Header from "../src/Components/Header/Header";
import SimpleBottomNavigation from "./Components/BottomNavBar/BottomNavbar";
import Trending from "./Components/Trending/Trending";
import Search from "./Components/Search/Search";
import { GlobalProvider } from "./context/globalState";


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <div className="App" data-testid="appTest">
          <Container>
            <Switch>
              <Route path="/favorites" component={Favorite} />
              <Route path="/watchlist" component={WatchList} />
              <Route path="/search" component={Search} />
              <Route path="/trending" component={Trending} />
            </Switch>
          </Container>
        </div>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
