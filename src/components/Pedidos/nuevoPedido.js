import React, { Component, Fragment } from 'react';
import DatosCliente from './datosCliente';
import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../queries';
import './nuevoPedido.css';
import ContenidoPedido from './contenidoPedido';

class NuevoPedido extends Component {
	render() {
		const { id } = this.props.match.params;
		return (
			<Fragment>
				<h2 className="text-center mb-5">Nuevo Pedido</h2>
				<div className="row">
					<div className="col-md-3">
						<DatosCliente id={id} />
					</div>
					<div className="col-md-9">
						<Query query={PRODUCTOS_QUERY} variables={{ stock: true }}>
							{({ loading, error, data }) => {
								if (loading)
									return (
										<div className="spinner">
											<div className="cube1" />
											<div className="cube2" />
										</div>
									);

								if (error) return `Error : ${error.message}`;

								return <ContenidoPedido productos={data.obtenerProductos} id={id} />;
							}}
						</Query>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default NuevoPedido;
