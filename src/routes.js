import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from "./pages/Login";
import List from "./pages/List";
import Book from "./pages/Book";
const Routes = createAppContainer(
  // Precisa usar por volta de todas as rotas
  createSwitchNavigator({
    Login,
    List,
    Book
  })
);

export default Routes;
