import React, { Component, Fragment } from 'react';
import { NUEVO_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';

class NuevoCliente extends Component {
	state = {
		cliente: {
			nombre: '',
			apellido: '',
			empresa: '',
			edad: '',
			email: '',
			tipo: ''
		},
		error: false,
		emails: []
	};

	handleNombreChange = (event) => {
		this.setState({
			cliente: {
				...this.state.cliente,
				nombre: event.target.value
			}
		});
	};
	handleApellidoChange = (event) => {
		this.setState({
			cliente: {
				...this.state.cliente,
				apellido: event.target.value
			}
		});
	};
	handleEmpresaChange = (event) => {
		this.setState({
			cliente: {
				...this.state.cliente,
				empresa: event.target.value
			}
		});
	};
	handleEdadChange = (event) => {
		this.setState({
			cliente: {
				...this.state.cliente,
				edad: event.target.value
			}
		});
	};
	handleEmailChange = (event) => {
		this.setState({
			cliente: {
				...this.state.cliente,
				email: event.target.value
			}
		});
	};
	handleTipoChange = (event) => {
		this.setState({
			cliente: {
				...this.state.cliente,
				tipo: event.target.value
			}
		});
	};

	nuevoCampo = () => {
		this.setState({ emails: this.state.emails.concat([ {} ]) });
	};
	quitarCampo = (idx) => () => {
		this.setState({
			emails: this.state.emails.filter((email, index) => {
				console.log(email);
				console.log(idx);
				console.log(index);
				return idx !== index;
			})
		});
	};

	LeerCampoEmail = (idx) => (event) => {
		const nuevoEmail = this.state.emails.map((email, index) => {
			if (idx !== index) return email;
			return {
				...email,
				email: event.target.value
			};
		});

		this.setState({
			emails: nuevoEmail
		});
	};

	render() {
		const { error } = this.state;
		let respuesta = error ? (
			<p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p>
		) : (
			''
		);
		return (
			<Fragment>
				<h2 className="text-center">Nuevo Cliente</h2>
				{respuesta}
				<div className="row justify-content-center">
					<Mutation mutation={NUEVO_CLIENTE} onCompleted={() => this.props.history.push('/clientes')}>
						{(crearCliente) => (
							<form
								className="col-md-8 m-3"
								onSubmit={(e) => {
									e.preventDefault();
									const { nombre, apellido, empresa, edad, tipo } = this.state.cliente;
									const { emails } = this.state;

									if (
										nombre === '' ||
										apellido === '' ||
										empresa === '' ||
										edad === '' ||
										tipo === ''
									) {
										this.setState({
											error: true
										});
										return;
									}

									this.setState({
										error: false
									});

									const input = {
										nombre,
										apellido,
										empresa,
										edad: Number(edad),
										tipo,
										emails
									};

									crearCliente({
										variables: { input }
									});
								}}
							>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Nombre</label>
										<input
											type="text"
											className="form-control"
											placeholder="Nombre"
											onChange={this.handleNombreChange}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Apellido</label>
										<input
											type="text"
											className="form-control"
											placeholder="Apellido"
											onChange={this.handleApellidoChange}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label>Empresa</label>
										<input
											type="text"
											className="form-control"
											placeholder="Empresa"
											onChange={this.handleEmpresaChange}
										/>
									</div>
									{this.state.emails.map((input, index) => (
										<div key={index} className="form-group col-md-12">
											<label>Correo {index + 1}:</label>
											<div className="input-group">
												<input
													type="email"
													placeholder="Email"
													className="form-control"
													onChange={this.LeerCampoEmail(index)}
												/>
												<div className="input-group-append">
													<button
														type="button"
														className="btn btn-danger"
														onClick={this.quitarCampo(index)}
													>
														&times; Eliminar
													</button>
												</div>
											</div>
										</div>
									))}
									<div className="form-group col-md-12 justify-content-center d-flex">
										<button type="button" className="btn btn-warning" onClick={this.nuevoCampo}>
											+ Agregar Email
										</button>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Edad</label>
										<input
											type="text"
											className="form-control"
											placeholder="Edad"
											onChange={this.handleEdadChange}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Tipo Cliente</label>
										<select className="form-control" onChange={this.handleTipoChange}>
											<option value="">Elegir...</option>
											<option value="PREMIUM">PREMIUM</option>
											<option value="BASICO">BÁSICO</option>
										</select>
									</div>
								</div>
								<button type="submit" className="btn btn-success float-right">
									Agregar Cliente
								</button>
							</form>
						)}
					</Mutation>
				</div>
			</Fragment>
		);
	}
}

export default NuevoCliente;
