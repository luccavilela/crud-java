import Modelo from "../modelos/Modelo";
import { useEffect, useState } from "react";
import axios from "axios";

export const Cadastro = () => {
  const [modelos, setModelos] = useState<Array<Modelo>>([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modelo, setModelo] = useState("");

  const registrar = () => {
      setNome("");
      setDescricao("")
      setModelo("")
      if(nome !== "" && descricao !== "" && modelo !== ""){
          axios.post("http://localhost:8080/cadastrar", {nome, descricao, modelo})
          .then(()=>{
              setNome("")
              setDescricao("")
              setModelo("")
              let mod = new Modelo(nome, descricao, modelo);
              modelos.push(mod);
          })
      }
  }
  return (
    <div>
    <div>
        <label>Nome:</label><br/>
        <input className="nomeInput" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
    </div>
    <div>
        <label>Descrição:</label><br/>
        <input className="descricaoInput" type="text" placeholder="Descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
    </div>
    <div>
        <label>Modelo:</label><br/>
        <input className="modeloInput" type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
    </div>
    <button className="registrar" type="button" onClick={registrar}>Registrar</button>
    </div>
  );
}