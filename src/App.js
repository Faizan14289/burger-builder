import Layout from "./hoc/Layout/Layout"
import Checkout from "./containers/Checkout/Checkout";
import {Route, Routes} from "react-router";
import BurgerBuilder from "./containers/BurgerBuilder/burgerbuilder"
import Orders from "./containers/Orders/Orders";
function App() {
  return (
    <div>
      <Layout>
        {/*<BurgerBuilder/>*/}
        {/*  <Checkout />*/}
          <Routes>
              <Route path={"/checkout/*"} element={<Checkout />} />
              <Route path={"/orders"} element={<Orders />} />
              <Route path={"/"}  element={<BurgerBuilder />} />
          </Routes>
      </Layout>
    </div>
  );
}

export default App;
