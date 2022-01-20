import React, {useState} from "react";
import { FiSearch } from "react-icons/fi"
import "./style.css"
import api from "./services/api"


function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})


  async function HandleSearch() {
    if(input === ''){
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
      return response
    } catch {
      console.log('erro')
      setInput('')
    }
  }

  

  return (
    <div className="container">
      <h1 className="title">Buscador</h1>

      <div className="container-input">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />

        <button className="search" onClick={HandleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
