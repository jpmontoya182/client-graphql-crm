import React, { Fragment } from 'react';

function PedidosCliente(props) {
	const clienteId = props.match.params.id;

	return (
		<Fragment>
			<h1 className="text-center mb-5">Pedidos Cliente</h1>
			<div className="row">Pedidos aqui</div>
			<p>{clienteId}</p>
		</Fragment>
	);
}

export default PedidosCliente;
