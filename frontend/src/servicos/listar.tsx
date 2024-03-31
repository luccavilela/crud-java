import { useState, useEffect } from "react"
import Modelo from "../modelos/Modelo"
import axios from "axios"

export const Listar = () =>{
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
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}