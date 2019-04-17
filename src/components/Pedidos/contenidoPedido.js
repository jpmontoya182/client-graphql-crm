import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import Resumen from './resumen';
import GenerarPedido from './generarPedido';
import { MensajeError } from '../Share/alertas';

class ContenidoPedido extends Component {
	state = {
		productos: [],
		total: 0
	};

	seleccionarProducto = (productos) => {
		this.setState({ productos }, () => {
			this.actualizarTotal();
		});
	};

	actualizarTotal = () => {
		const { productos } = this.state;

		if (productos.length === 0) {
			this.setState({
				total: 0
			});
			return;
		}

		let nuevoTotal = 0;

		productos.map((producto) => (nuevoTotal += producto.cantidad * producto.precio));

		this.setState({
			total: nuevoTotal
		});
	};

	actualizarCantidad = (cantidad, index) => {
		const productos = this.state.productos;
		productos[index].cantidad = Number(cantidad);

		this.setState(
			{
				productos
			},
			() => {
				this.actualizarTotal();
			}
		);
	};

	eliminarProducto = (id) => () => {
		const productos = this.state.productos;
		const productosRestantes = productos.filter((producto) => producto.id !== id);

		this.setState(
			{
				productos: productosRestantes
			},
			() => {
				this.actualizarTotal();
			}
		);
	};

	render() {
		const mensaje = this.state.total < 0 ? <MensajeError mensaje="Las cantidades no pueden ser negativas" /> : '';
		return (
			<Fragment>
				<h2 className="text-center mb-5">Seleccionar Articulos</h2>
				{mensaje}
				<Select
					onChange={this.seleccionarProducto}
					options={this.props.productos}
					isMulti={true}
					components={Animated()}
					placeholder={'Seleccionar Productos'}
					getOptionValue={(options) => options.id}
					getOptionLabel={(options) => options.nombre}
					value={this.state.productos}
				/>
				<Resumen
					productos={this.state.productos}
					actualizarCantidad={this.actualizarCantidad}
					eliminarProducto={this.eliminarProducto}
				/>
				<p className="font-weight-bold float-right mt-3">
					Total :
					<span className="font-weight-bold">$ {this.state.total}</span>
				</p>
				<GenerarPedido
					productos={this.state.productos}
					total={this.state.total}
					clienteId={this.props.id}
					vendedor={this.props.vendedor}
				/>
			</Fragment>
		);
	}
}

export default ContenidoPedido;
