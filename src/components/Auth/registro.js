import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from '../../mutations';
import { MensajeError } from '../Share/alertas';
import { withRouter } from 'react-router-dom';

const InitialState = {
	usuario: '',
	nombre: '',
	password: '',
	rol: '',
	repetirPassword: ''
};

class Registro extends Component {
	state = {
		...InitialState
	};

	actualizarState = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	limpiarState = () => {
		this.setState({
			...InitialState
		});
	};

	validarForm = (event) => {
		const { usuario, nombre, password, rol, repetirPassword } = this.state;
		const noValido = !usuario || !nombre || !rol || !password || password !== repetirPassword;
		return noValido;
	};

	crearRegistro = (event, crearUsuario) => {
		event.preventDefault();

		crearUsuario().then((data) => {
			this.limpiarState();
		});

		this.props.history.push('/login');
	};

	render() {
		const { usuario, nombre, password, rol, repetirPassword } = this.state;
		return (
			<div>
				<h1 className="text-center mb-5">Nuevo Usuario</h1>
				<div className="row  justify-content-center">
					<Mutation mutation={NUEVO_USUARIO} variables={{ usuario, nombre, password, rol }}>
						{(crearUsuario, { loading, error, data }) => {
							return (
								<form
									className="col-md-8"
									onSubmit={(event) => this.crearRegistro(event, crearUsuario)}
								>
									{error && <MensajeError mensaje={error.message} />}
									<div className="form-group">
										<label>Nombre Completo</label>
										<input
											type="text"
											name="nombre"
											className="form-control"
											placeholder="Nombre Completo"
											onChange={this.actualizarState}
											value={nombre}
										/>
										<small className="form-text text-muted">
											(Agrega tu nombre y apellidos completos)
										</small>
									</div>
									<div className="form-group">
										<label>Usuario</label>
										<input
											type="text"
											name="usuario"
											className="form-control"
											placeholder="Nombre Usuario"
											onChange={this.actualizarState}
											value={usuario}
										/>
										<small className="form-text text-muted">
											(Sin espacios y sin caracteres especiales)
										</small>
									</div>

									<div className="form-row">
										<div className="form-group col-md-6">
											<label>Password</label>
											<input
												type="password"
												name="password"
												className="form-control"
												placeholder="Password"
												onChange={this.actualizarState}
												value={password}
											/>
										</div>
										<div className="form-group  col-md-6">
											<label>Repetir Password</label>
											<input
												type="password"
												name="repetirPassword"
												className="form-control"
												placeholder="Repetir Password"
												onChange={this.actualizarState}
												value={repetirPassword}
											/>
										</div>
									</div>
									<div className="form-group">
										<label>Rol :</label>
										<select
											className="form-control"
											value={rol}
											name="rol"
											onChange={this.actualizarState}
										>
											<option value="">Elegir ...</option>
											<option value="Administrador">Administrador</option>
											<option value="Vendedor">Vendedor</option>
										</select>
									</div>

									<button
										type="submit"
										className="btn btn-success float-right"
										disabled={loading || this.validarForm()}
									>
										Crear Usuario
									</button>
								</form>
							);
						}}
					</Mutation>
				</div>
			</div>
		);
	}
}

export default withRouter(Registro);
