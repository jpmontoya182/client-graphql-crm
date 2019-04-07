import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { ACTUALIZAR_ESTADO } from '../../mutations';
import { PRODUCTO_QUERY } from '../../queries';
import ResumenProducto from './resumenProducto';

const Pedido = (props) => {
	const { pedido: { id, pedidos, fecha, total, estado, cliente } } = props;
	const fechaT = new Date(Number(fecha));

	let clase;
	switch (estado) {
		case 'PENDIENTE':
			clase = 'border-light';
			break;
		case 'COMPLETADO':
			clase = 'border-success';
			break;
		case 'CANCELADO':
			clase = 'border-danger';
			break;
		default:
			break;
	}

	return (
		<div className="col-md-4">
			<div className={`card mb-3 ${clase}`}>
				<div className="card-body">
					<p className="card-text font-weight-bold ">
						Estado:
						<Mutation mutation={ACTUALIZAR_ESTADO}>
							{(actualizarEstado) => (
								<select
									className="form-control my-3"
									value={estado}
									onChange={(event) => {
										const input = {
											id,
											pedidos,
											fecha,
											total,
											cliente,
											estado: event.target.value
										};

										actualizarEstado({
											variables: { input }
										});
									}}
								>
									<option value="PENDIENTE">PENDIENTE</option>
									<option value="COMPLETADO">COMPLETADO</option>
									<option value="CANCELADO">CANCELADO</option>
								</select>
							)}
						</Mutation>
					</p>
					<p className="card-text font-weight-bold">
						Pedido ID:
						<span className="font-weight-normal"> {id}</span>
					</p>
					<p className="card-text font-weight-bold">
						Fecha Pedido:
						<span className="font-weight-normal"> {fechaT.toLocaleString('es-CO')}</span>
					</p>
					<p className="card-text font-weight-bold">
						Total:
						<span className="font-weight-normal"> $ {total} </span>
					</p>

					<h3 className="card-text text-center mb-3">Artículos del pedido</h3>
					{pedidos.map((producto, index) => {
						const { id } = producto;
						return (
							<Query key={index} query={PRODUCTO_QUERY} variables={{ id }}>
								{({ loading, error, data }) => {
									if (loading) return 'Cargando...';
									if (error) return `Error : ${error.message}`;

									return (
										<ResumenProducto
											producto={data.obtenerProducto}
											cantidad={producto.cantidad}
											key={producto.id}
										/>
									);
								}}
							</Query>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Pedido;
