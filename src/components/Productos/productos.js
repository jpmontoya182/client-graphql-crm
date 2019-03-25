import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../queries';
import { ELIMINAR_PRODUCTO } from '../../mutations';
import { Link } from 'react-router-dom';
import { MensajeExito } from '../Share/alertas';
import Paginador from '../Share/paginador';

const InitialState = {
	alerta: {
		mostrar: false,
		mensaje: ''
	},
	paginador: {
		offset: 0,
		actual: 1
	}
};

class Productos extends Component {
	state = {
		...InitialState
	};

	limite = 3;

	paginaAnterior = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset - this.limite,
				actual: this.state.paginador.actual - 1
			}
		});
	};

	paginaSiguiente = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset + this.limite,
				actual: this.state.paginador.actual + 1
			}
		});
	};

	render() {
		const { alerta: { mostrar, mensaje } } = this.state;
		const alerta = mostrar ? <MensajeExito mensaje={mensaje} /> : '';
		return (
			<Query
				query={PRODUCTOS_QUERY}
				pollInterval={2000}
				variables={{ limite: this.limite, offset: this.state.paginador.offset }}
			>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if (loading) return 'Cargando ...';
					if (error) return `Error : ${error.message}`;
					return (
						<Fragment>
							<h2 className="text-center mb-5">Productos</h2>
							{alerta}
							<table className="table">
								<thead>
									<tr className="table-primary">
										<th scope="col">Nombre</th>
										<th scope="col">Precio</th>
										<th scope="col">Stock</th>
										<th scope="col">Editar</th>
										<th scope="col">Eliminar</th>
									</tr>
								</thead>
								<tbody>
									{data.obtenerProductos.map((producto) => {
										const { id } = producto;
										return (
											<tr key={id}>
												<td>{producto.nombre}</td>
												<td>{producto.precio}</td>
												<td>{producto.stock}</td>
												<td>
													<Link to={`/productos/editar/${id}`} className="btn btn-success">
														Editar Producto
													</Link>
												</td>
												<td>
													<Mutation
														mutation={ELIMINAR_PRODUCTO}
														onCompleted={(data) => {
															this.setState(
																{
																	alerta: {
																		mostrar: true,
																		mensaje: data.eliminarProducto
																	}
																},
																() => {
																	setTimeout(() => {
																		this.setState({
																			alerta: {
																				...InitialState
																			}
																		});
																	}, 3000);
																}
															);
														}}
													>
														{(eliminarProducto) => {
															return (
																<button
																	type="button"
																	className="btn btn-danger"
																	onClick={() => {
																		if (
																			window.confirm('Desea eliminar el producto')
																		) {
																			eliminarProducto({
																				variables: { id }
																			});
																		}
																	}}
																>
																	&times; Eliminar
																</button>
															);
														}}
													</Mutation>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<Paginador
								actual={this.state.paginador.actual}
								total={data.totalProductos}
								limite={this.limite}
								paginaAnterior={this.paginaAnterior}
								paginaSiguiente={this.paginaSiguiente}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Productos;
