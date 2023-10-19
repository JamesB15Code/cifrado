import React, { useState } from "react";
import "./App.css";


function App() {
  const [message, setMessage] = useState("");
  const [diametro, setDiametro] = useState("");
  const [lados, setLados] = useState("");
  const [result, setResult] = useState("");
  const [matrixToShow, setMatrixToShow] = useState("");
  const [modoCifrado, setModoCifrado] = useState(true);

  const cifrarTexto = () => {
    if (message && diametro && lados) {
      const diametroUtilizado = modoCifrado ? diametro : lados;
      const ladosUtilizados = modoCifrado ? lados : diametro;

      const messageArray = message.split(" ").filter((word) => word);
      const rows = Math.ceil(messageArray.join("").length / ladosUtilizados);
      const encryptedMatrix = [];

      for (let i = 0; i < rows; i++) {
        encryptedMatrix[i] = [];
      }

      let rowIndex = 0;
      let colIndex = 0;

      for (const word of messageArray) {
        for (const letter of word) {
          encryptedMatrix[rowIndex][colIndex] = letter;
          colIndex = (colIndex + 1) % ladosUtilizados;
          rowIndex += colIndex === 0 ? 1 : 0;
        }
      }

      const resultArray = [];

      for (let col = 0; col < ladosUtilizados; col++) {
        for (let row = 0; row < rows; row++) {
          if (encryptedMatrix[row][col]) {
            resultArray.push(encryptedMatrix[row][col]);
          }
        }
      }

      const result = resultArray.join(" ");
      setResult(result);

      // Establece la matriz en el estado para mostrar
      const matrixToShow = encryptedMatrix.map((row) => row.join(" ")).join("\n");
      setMatrixToShow(matrixToShow);
    } else {
      setResult(
        "Por favor, ingresa un mensaje, un diámetro y el número de lados del semicilindro."
      );
    }
  };

  const toggleModo = () => {
    // Cambia el modo entre cifrado y descifrado.
    setModoCifrado((modoAnterior) => !modoAnterior);
  };

  return (
    <div className="App2">
      <h1>Escítala React App</h1>
      <h3>James Brian Hernandez Hernandez</h3>
      <div className="input-container">
        <p>Para su práctica realiza este ejemplo, empleando 3 filas con 9 caracteres de longitud</p>
        <p>Con la siguiente frase: <br/><br/>ejemplodelmetododelescitala</p>
        <label className="diameter">Ingresa las filas:</label>
        <input
          type="number"
          id="diameter"
          placeholder="Ingresa las filas"
          value={diametro}
          onChange={(e) => setDiametro(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label className="sides">Ingresa el número de longitud:</label>
        <input
          type="number"
          id="sides"
          placeholder="Ingresa número de longitud"
          value={lados}
          onChange={(e) => setLados(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          placeholder="Ingresa el mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btnEscitala" onClick={cifrarTexto}>
          {modoCifrado ? "Cifrar" : "Descifrar"}
        </button>
        <button className="btnToggleModo" onClick={toggleModo}>
          Cambiar Modo
        </button>
      </div>

      <div className="">
        <pre>{result}</pre>
      </div>
      <div className="matriz">
        <textarea readOnly id="matrixToShow" value={matrixToShow} />
      </div>
    </div>
  );
}

export default App;
