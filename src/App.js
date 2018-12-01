import React, { Component } from "react";
import MyDataTable from "./components/MyDataTable";
import logo from "./logo.png";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
        </header>

        <section style={{ padding: "1rem", overflowX: "auto" }}>
          <MyDataTable />
        </section>
      </div>
    );
  }
}

export default App;
