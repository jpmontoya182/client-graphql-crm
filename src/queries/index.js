import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
	query obtenerClientes($limite: Int, $offset: Int) {
		obtenerClientes(limite: $limite, offset: $offset) {
			id
			nombre
			apellido
			empresa
		}
		totalClientes
	}
`;

export const CLIENTE_QUERY = gql`
	query ConsultarCliente($id: ID!) {
		obtenerCliente(id: $id) {
			id
			nombre
			apellido
			empresa
			edad
			emails {
				email
			}
			tipo
		}
	}
`;
