import { GetAllMovies } from "../pages/GetallMovies"
import { GetMoviesById } from "../pages/GetMoviesById"
import { BrowserRouter, Switch, Route } from "react-router-dom";


export const Router = () => {
    return(
<BrowserRouter>
<Switch>

  <Route exact path={"/"}>      
    <GetAllMovies />
  </Route>

  <Route exact path={"/movies/:id"}>
    <GetMoviesById />
  </Route>

  
  <Route>
    <div>Página não encontrada</div>
  </Route>

</Switch>
</BrowserRouter>
    )
}
