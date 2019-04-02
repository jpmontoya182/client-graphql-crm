import React, { Fragment } from 'react';
import { OBTENER_PEDIDO } from '../../queries';
import { Query } from 'react-apollo';
import './spinner.css';
import Pedido from './pedido';

function PedidosCliente(props) {
	const cliente = props.match.params.id;

	return (
		<Fragment>
			<h1 className="text-center mb-5">Pedidos Cliente</h1>
			<div className="row">
				<Query query={OBTENER_PEDIDO} variables={{ cliente }} pollInterval={5000}>
					{({ loading, error, data, startPolling, stopPolling }) => {
						if (loading)
							return (
								<div className="spinner">
									<div className="cube1" />
									<div className="cube2" />
								</div>
							);

						if (error) return `Error : ${error.message}`;
						return data.obtenerPedidos.map((pedido) => (
							<Pedido pedido={pedido} key={pedido.id} cliente={cliente} />
						));
					}}
				</Query>
			</div>
		</Fragment>
	);
}

export default PedidosCliente;
