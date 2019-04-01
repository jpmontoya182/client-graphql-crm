import React, { Fragment } from 'react';

function Producto(props) {
	const { producto } = props;
	return (
		<Fragment>
			<tr>
				<td>{producto.nombre}</td>
				<td>$ {producto.precio}</td>
				<td>{producto.stock}</td>
				<td>
					<input
						min="1"
						type="number"
						className="form-control"
						onChange={(event) => {
							if (event.target.value > producto.stock) {
								event.target.value = 0;
							}
							props.actualizarCantidad(event.target.value, props.index);
						}}
					/>
				</td>
				<td>
					<button
						type="button"
						className="btn btn-danger font-weight-bold"
						onClick={props.eliminarProducto(producto.id)}
					>
						&times; Eliminar
					</button>
				</td>
			</tr>
		</Fragment>
	);
}

export default Producto;
