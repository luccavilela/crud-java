import { useState, useEffect } from "react"
import Modelo from "../modelos/Modelo"
import axios from "axios"

export const Atualizar = () =>{
    const [modelos, setModelos] = useState<Array<Modelo>>([])
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [modelo, setModelo] = useState("");
    const [editando, setEditando] = useState(false)   
    const [id, setId] = useState('')
    useEffect(() =>{
        axios.get('http://localhost:8080/listar')
        .then((response) =>{
            setModelos(response.data);
        })
        .catch((error) =>{
            console.log(error)
        })
    }, [])

    const Atualizar = () =>{
        if(nome && descricao && modelo){
            axios.put(`http://localhost:8080/atualizar/${id}`, {nome, descricao, modelo})
              .then(()=>{
                  setEditando(false)
                  setNome('')
                  setDescricao('')
                  setModelo('')
                  AtualizarModelos()
              })
              .catch((error) =>{
                console.error(error)
              })
          }
    }

    const Editar = (id:any, nome: string, descricao:string, modelo: string) =>{
        setId(id)
        setNome(nome)
        setDescricao(descricao)
        setModelo(modelo)
        setEditando(true)
    }

    const AtualizarModelos = () =>{
        axios.get('http://localhost:8080/listar')
        .then((response) =>{
            setModelos(response.data);
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    return(
        <div>
            <h2>Lista de modelos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Modelo</th>
                    </tr>
                </thead>
                <tbody>
                    {modelos.map((modelo)=>(
                            <tr key={modelo.id}>
                                <td>{modelo.nome}</td>
                                <td>{modelo.descricao}</td>
                                <td>{modelo.modelo}</td>
                                {!editando &&(<td><button onClick={() => Editar(modelo.id, modelo.nome, modelo.descricao, modelo.modelo)}>Editar</button></td>)}
                            </tr>
                        ))}
                </tbody>
            </table>
            {editando?(
                <>
                    <div>
                        <div>
                            <label>Nome:</label>
                            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            <label>Descrição:</label>
                            <input type="text" placeholder="Descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                            <label>Modelo:</label>
                            <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)}/>
                            <button onClick={Atualizar}>Atualizar</button>
                        </div>
                    </div>
                </>
            ):
            (
                <>

                </>
            )}
        </div>
    )
}