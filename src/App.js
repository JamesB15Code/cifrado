import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    opcion: 0, // 1 para cifrar, 2 para descifrar
    mensaje: "",
    resultado: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClearText = () => {
    this.setState({ mensaje: "", resultado: "" });
  };

  handleCifradoCesar = () => {
    const { opcion, mensaje } = this.state;
    const abecedario = "abcdefghijklmnopqrstuvwxyz";
    const desplamiento = 5;
    let text = "";

    if (opcion === "1") {
      // Cifrar
      for (let i = 0; i < mensaje.length; i++) {
        const caracter = mensaje[i];

        if (/[a-zA-Zñ]/.test(caracter)) {
          const indice = abecedario.indexOf(caracter);
          const indiceCifrado = (indice + desplamiento) % abecedario.length;
          const cifrado = abecedario.charAt(indiceCifrado);
          text += cifrado;
        } else {
          text += caracter;
        }
      }
    } else if (opcion === "2") {
      // Descifrar
      for (let i = 0; i < mensaje.length; i++) {
        const caracter = mensaje[i];

        if (/[a-zA-Zñ]/.test(caracter)) {
          const indice = abecedario.indexOf(caracter);
          const indiceDescifrado =
            (indice - desplamiento + abecedario.length) % abecedario.length;
          const descifrado = abecedario.charAt(indiceDescifrado);
          text += descifrado;
        } else {
          text += caracter;
        }
      }
    } else {
      this.setState({
        resultado:
          "Opción no válida. Debe seleccionar una opcion para cifrar o descifrar.",
      });
      return;
    }

    this.setState({ resultado: text });
  };

  render() {
    const { opcion, mensaje, resultado } = this.state;

    return (
      <div className="App">
        <h1>Cifrado César</h1>
        <label>
          Opción:
          <select
            name="opcion"
            value={opcion}
            onChange={this.handleInputChange}
          >
            <option value="">Seleccione una opcion</option>
            <option value="1">Cifrar</option>
            <option value="2">Descifrar</option>
          </select>
        </label>

        <br />
        <label>
          Mensaje:
          <textarea
            type="text"
            name="mensaje" // Add the name attribute
            value={mensaje}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <button onClick={this.handleCifradoCesar}>Realizar</button>
        <button onClick={this.handleClearText}>Limpiar Texto</button>

        <br />
        <div>Resultado: {resultado}</div>
      </div>
    );
  }
}

export default App;
