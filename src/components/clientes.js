import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../queries';
import { Link } from 'react-router-dom';
import { ELIMINAR_CLIENTE } from '../mutations';
import Paginador from '../components/paginador';

class Contactos extends Component {
	limite = 3;
	state = {
		paginador: {
			offset: 0,
			actual: 1
		}
	};

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
		return (
			<Query
				query={CLIENTES_QUERY}
				pollInterval={2000}
				variables={{ limite: this.limite, offset: this.state.paginador.offset }}
			>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if (loading) return 'Cargando ...';
					if (error) return `Error : ${error.message}`;
					return (
						<Fragment>
							<h2 className="text-center">Listado Clientes</h2>
							<ul className="list-group mt-4">
								{data.obtenerClientes.map((item) => {
									const { id } = item;
									return (
										<li key={item.id} className="list-group-item">
											<div className="row justify-content-between align-items-center">
												<div className="col-md-8 d-flex justify-content-between align-items-center">
													{item.nombre} {item.apellido} - {item.empresa}
												</div>
												<div className="col-md-4 d-flex justify-content-end">
													<Mutation mutation={ELIMINAR_CLIENTE}>
														{(eliminarCliente) => (
															<button
																type="button"
																className="btn btn-danger d-block  d-md-inline-block mr-1"
																onClick={() => {
																	if (window.confirm('Desea eliminar el registro')) {
																		eliminarCliente({
																			variables: { id }
																		});
																	}
																}}
															>
																&times; Eliminar
															</button>
														)}
													</Mutation>
													<Link
														to={`/cliente/editar/${item.id}`}
														className="btn btn-success d-block d-md-inline-block"
													>
														Editar
													</Link>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
							<Paginador
								actual={this.state.paginador.actual}
								totalClientes={data.totalClientes}
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

export default Contactos;
