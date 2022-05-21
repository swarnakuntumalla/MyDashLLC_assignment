import React  from "react";
import BarChart from '../Barchart';
import Header from "../Header"

import "./index.css";

function Home (){
    return (
      <div>
        <Header/>
        <div className="home-container">
            <h1>Bar Chart</h1>
            <BarChart/>
        </div>
      </div>
    );
}

export default Home;
