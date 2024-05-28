import logo from "./logo.svg";
import "./App.css";
import React, { useContext, useState } from "react";

import Header from "./pages/Header";
import Mid_Left from "./pages/Mid_Left";
import Footer from "./pages/Footer";
import { useLocation } from "react-router-dom";
import MenuAcc from "./pages/MenuAcc";
import { UserContext } from "./UserContext";
function App(props) {
  let params1 = useLocation();
  const [tongqty, setQty] = useState();

  function loginContext(xx) {
    setQty(xx);
  }

  function renderMenu() {
    if (params1.pathname.includes("account")) {
      return <MenuAcc />;
    } else if (params1.pathname.includes("cart")) {
    } else {
      return <Mid_Left />;
    }
  }

  return (
    <>
      <UserContext.Provider
        value={{
          tongqty: tongqty,
          loginContext: loginContext,
        }}
      >
        <Header />
        <section>
          <div className="container">
            <div className="row">
              {renderMenu()}
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
