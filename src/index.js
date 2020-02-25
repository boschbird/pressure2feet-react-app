import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Barometic Formula constants
const pStat = 1013.2500; // Static Pressure [hPa]
const tStd = 288.15; // Standard Temperature [K]
const lapseRate = -0.0065; // Standard Temperature Lapse Rate [K/m]
const rStar = 8.3144598; // Universal Gas Constant [J/(mol·K)]
const aGravity = 9.80665; // Gravitational Acceleration [m/s^2]
const molarMass = 0.0289644; // molar mass of Earth's air [kg/mol]

const ex1 = (rStar*lapseRate)/(aGravity*molarMass); //exponent 1
const metresToFeet = 3.28083989501;

const ex2 = (aGravity*molarMass)/(rStar*lapseRate); // exponent 2
const feetToMetres = 0.3048;

// NB all functions that are 'controlled' (i.e. components) require 
// the first letter of the function name to be CAPITALISED!!!!!
function PressureToHeight(props) {
  // props.atmPressure is the variable we want the user to access
  const height = metresToFeet * (tStd/lapseRate)*((pStat/(props.atmPressure))**ex1 - 1);
  return <p>The equivalent height is {Math.round(height)} ft.</p>
}

function HeightToPressure(props) {
  // props.altitude is the variable we want the user to access
  const pressure = pStat*(tStd/(tStd + lapseRate*(props.altitude)*feetToMetres))**ex2
  return <p>The equivalent standard atmospheres is {Math.round(pressure)} hPa.</p>
}

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.handlePressureChange = this.handlePressureChange.bind(this);
    this.handleHeightChange =this.handleHeightChange.bind(this);
    this.state = {pressure: 1013.25, height: 0};
  }

  handlePressureChange(e) {
    this.setState({pressure: e.target.value});
  }

  handleHeightChange(e) {
    this.setState({height: e.target.value});
  }

  render () {
    const pressure = this.state.pressure;
    const height = this.state.height;
    return (
      <>
        <fieldset>

          <legend> Enter the pressure in hPa: </legend>
          <input
            value = {pressure}
            onChange = {this.handlePressureChange} />

          <PressureToHeight 
            atmPressure={parseFloat(pressure)} />

        </fieldset>
        <fieldset>

          <legend> Enter the altitude (AMSL) in ft: </legend>
          <input
            value = {height}
            onChange = {this.handleHeightChange} />

          <HeightToPressure 
            altitude={parseFloat(height)} />

        </fieldset>
      </>
    );
  }
}

ReactDOM.render(
  <Converter />,
  document.getElementById('root')
);