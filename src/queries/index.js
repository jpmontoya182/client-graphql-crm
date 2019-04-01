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

export const PRODUCTOS_QUERY = gql`
	query obtenerProductos($limite: Int, $offset: Int, $stock: Boolean) {
		obtenerProductos(limite: $limite, offset: $offset, stock: $stock) {
			id
			nombre
			stock
			precio
		}
		totalProductos
	}
`;

export const PRODUCTO_QUERY = gql`
	query obtenerProducto($id: ID!) {
		obtenerProducto(id: $id) {
			id
			nombre
			precio
			stock
		}
	}
`;
