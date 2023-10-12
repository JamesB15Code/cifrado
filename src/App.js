import React, { Component } from "react";
import "./App.css";
import CryptoJS from "crypto-js";

class App extends Component {
  state = {
    opcion: "encrypt", // Opción "encrypt" para cifrar, "decrypt" para descifrar
    mensaje: "",
    resultado: "",
    clave: "miClaveSecreta", // Puedes cambiar esto a tu clave secreta
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClearText = () => {
    this.setState({ mensaje: "", resultado: "" });
  };

  handleCifradoCesar = () => {
    const { opcion, mensaje, clave } = this.state;

    if (opcion === "encrypt") {
      const ciphertext = CryptoJS.AES.encrypt(mensaje, clave).toString();
      this.setState({ resultado: ciphertext });
    } else if (opcion === "decrypt") {
      try {
        const bytes = CryptoJS.AES.decrypt(mensaje, clave);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        this.setState({ resultado: originalText });
      } catch (error) {
        this.setState({
          resultado: "Error al descifrar. Clave incorrecta o mensaje no válido.",
        });
      }
    } else {
      this.setState({
        resultado:
          "Opción no válida. Debe seleccionar una opción para cifrar o descifrar.",
      });
    }
  };

  render() {
    const { opcion, mensaje, resultado } = this.state;

    return (
      <div className="App">
        <h1>Cifrado CryptoJS</h1>
        <label>
          Opción:
          <select
            name="opcion"
            value={opcion}
            onChange={this.handleInputChange}
          >
            <option value="encrypt">Cifrar</option>
            <option value="decrypt">Descifrar</option>
          </select>
        </label>

        <br />
        <label>
          Mensaje:
          <textarea
            type="text"
            name="mensaje"
            value={mensaje}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <button onClick={this.handleCifradoCesar}>Realizar</button>
        <button onClick={this.handleClearText}>Limpiar Texto</button>

        <br />
        <div>Resultado:
          <textarea value={resultado}/>
           </div>
      </div>
    );
  }
}

export default App;
