import React from "react";

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";

import "./App.css";

const App = () => {
  return (
    <div className="container text-center">
      <Header />
      <SearchForm />
    </div>
  );
};

export default App;
