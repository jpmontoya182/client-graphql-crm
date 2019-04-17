import React from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from '../../mutations';
import { withRouter } from 'react-router-dom';

const validarPedido = (props) => {
	let noValido = !props.productos || props.total <= 0;
	return noValido;
};

function GenerarPedido(props) {
	return (
		<Mutation mutation={NUEVO_PEDIDO} onCompleted={() => props.history.push('/clientes')}>
			{(crearPedido) => (
				<button
					type="button"
					className="btn btn-warning mt-4"
					disabled={validarPedido(props)}
					onClick={(e) => {
						const productosInput = props.productos.map(({ nombre, precio, stock, ...objeto }) => objeto);
						const input = {
							pedidos: productosInput,
							total: props.total,
							cliente: props.clienteId,
							vendedor: props.vendedor
						};
						crearPedido({ variables: { input } });
					}}
				>
					Generar Pedido
				</button>
			)}
		</Mutation>
	);
}

export default withRouter(GenerarPedido);
