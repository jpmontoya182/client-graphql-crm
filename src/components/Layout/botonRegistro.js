import React from 'react';
import { Link } from 'react-router-dom';

function BotonRegistro({ session }) {
	const { rol } = session.session.obtenerUsuario;
	if (rol !== 'Administrador') return null;

	return (
		<Link to="/registro" className="btn btn-warning ml-md-2 mt-2 mt-md-0">
			Crear Usuarios
		</Link>
	);
}

export default BotonRegistro;
