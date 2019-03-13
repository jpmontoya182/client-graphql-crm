import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
	{
		obtenerClientes {
			id
			nombre
			apellido
			empresa
		}
	}
`;

export const CLIENTE_QUERY = gql`
	query ConsultarCliente($id: ID!) {
		obtenerCliente(id: $id) {
			nombre
			apellido
			empresa
			edad
			emails {
				email
			}
		}
	}
`;
