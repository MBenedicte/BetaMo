import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@mui/material";
import Favorite from "./Components/Favorite/Favorite";
import WatchLater from "./Components/WatchLater/WatchLater";
import Cover from "../src/Components/Cover/Cover";
import Header from "../src/Components/Header/Header";
import SimpleBottomNavigation from "./Components/BottomNavbar";
import Trending from "./Components/Trending/Trending";
import Search from "./Components/Search/Search";
import { GlobalProvider } from "./context/globalState";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Container>
            <Switch>
              <Route path="/" component={Cover} exact />
              <Route path="/trending" component={Trending} />
              <Route path="/favorites" component={Favorite} />
              <Route path="/watchlater" component={WatchLater} />
              <Route path="/search" component={Search} />
            </Switch>
          </Container>
        </div>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
