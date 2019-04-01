import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../queries';

const DatosCliente = ({ id }) => {
	return (
		<Fragment>
			<h3 className="text-center mb-3">Resumen de cliente</h3>
			<Query query={CLIENTE_QUERY} variables={{ id }} pollInterval={500}>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if (loading) return 'Cargando...';
					if (error) return `Error ${error.message}`;

					const { nombre, apellido, edad, emails, empresa, tipo } = data.obtenerCliente;

					return (
						<ul className="list-unstyled my-5">
							<li className="border font-weight-bold p2">
								Nombres :
								<span className="font-weight-normal"> {nombre}</span>
							</li>
							<li className="border font-weight-bold p2">
								Apellidos :
								<span className="font-weight-normal"> {apellido}</span>
							</li>
							<li className="border font-weight-bold p2">
								Edad :
								<span className="font-weight-normal"> {edad}</span>
							</li>
							<li className="border font-weight-bold p2">
								Emails :
								<span className="font-weight-normal">{emails.map((email) => ` ${email.email}`)}</span>
							</li>
							<li className="border font-weight-bold p2">
								Empresa :
								<span className="font-weight-normal"> {empresa}</span>
							</li>
							<li className="border font-weight-bold p2">
								Tipo :
								<span className="font-weight-normal"> {tipo}</span>
							</li>
						</ul>
					);
				}}
			</Query>
		</Fragment>
	);
};

export default DatosCliente;
