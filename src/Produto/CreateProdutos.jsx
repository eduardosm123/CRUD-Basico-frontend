import React from "react"
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { definirProdutoFormCreate, limparFormularioCreateProduto, definirCategoriaCreateProduto } from "../redux/reducers/produtoSlice";
import { definirLista as definirListaCategoria, limparLista as limparListaCategoria } from "../redux/reducers/categoriaSlice";

function CreateProdutos() {

    const values = useSelector((state) => state.produto.produtoForm.create)
    const categorias = useSelector((state) => state.categoria.categoriasList.lista)

    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:3000/api/category')
            .then(res => dispatch(definirListaCategoria(res.data)))
            .catch(err => console.log(err))
    }, []);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values)
        axios.post('http://localhost:3000/api/product', values).
            then(res => { 
                dispatch(limparListaCategoria())
                dispatch(limparFormularioCreateProduto())
                navigate("/produtos")
            }).
            catch(err => console.log(err))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if ( name === 'category') {
            dispatch(definirCategoriaCreateProduto(value))
        } else {
            dispatch(definirProdutoFormCreate({ campo: name, valor: value }));
        }
    }
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Adicionar Produtos</h1>
                <form onSubmit={handleSubmit} >
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="name">Nome do Produtos:</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Digite o nome da Produtos"
                            value={values.name}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="price">Preço do Produtos:</label>
                        <input type="number"
                            name="price"
                            className="form-control"
                            placeholder="Digite o preço"
                            value={values.price}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="description">Descrição do Produtos:</label>
                        <input type="text"
                            name="description"
                            className="form-control"
                            placeholder="Digite a descrição do produto"
                            value={values.description}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-2 d-flex flex-column">
                        <label htmlFor="category">Categoria do Produto:</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={handleChange}>
                            <option value={values.category.name}>Escolha a categoria</option>
                            {categorias.map((categoria, index) => (
                                <option key={index} value={categoria.name}>{categoria.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-success">Cadastrar</button>
                    <Link to={"/produtos"} className="btn btn-primary ms-3">Voltar</Link>
                </form>
            </div>
        </div>
    )
}

export default CreateProdutos;