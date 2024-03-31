import Modelo from "../modelos/Modelo"
import axios from "axios"
import { useEffect, useState } from "react"

export const Deletar = () =>{
    const [modelos, setModelos] = useState<Array<Modelo>>([])
    useEffect(() =>{
        axios.get('http://localhost:8080/listar')
        .then((response) =>{
            setModelos(response.data);
        })
        .catch((error) =>{
            console.log(error)
        })
    }, [])

    const AtualizarModelos = () =>{
        axios.get('http://localhost:8080/listar')
        .then((response) =>{
            setModelos(response.data);
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    const Deletar = (id: number) =>{
        axios.delete(`http://localhost:8080/deletar/${id}`)
                .then((response) =>{
                    AtualizarModelos();
                })
                .catch((error) =>{
                    console.error(error)
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
                                <td>
                                    <button onClick={() => Deletar(modelo.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}