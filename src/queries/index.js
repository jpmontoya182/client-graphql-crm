import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
	query obtenerClientes($limite: Int, $offset: Int, $vendedor: String) {
		obtenerClientes(limite: $limite, offset: $offset, vendedor: $vendedor) {
			id
			nombre
			apellido
			empresa
		}
		totalClientes(vendedor: $vendedor)
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

export const OBTENER_PEDIDO = gql`
	query obtenerPedidos($cliente: String) {
		obtenerPedidos(cliente: $cliente) {
			cliente
			estado
			id
			total
			fecha
			pedidos {
				id
				cantidad
			}
		}
	}
`;

// Graficas
export const TOP_CLIENTES = gql`
	query topClientes {
		topClientes {
			total
			cliente {
				nombre
			}
		}
	}
`;

// Usuarios
export const USUARIO_ACTUAL = gql`
	query obtenerUsuario {
		obtenerUsuario {
			id
			usuario
			nombre
			rol
		}
	}
`;

export const TOP_VENDEDORES = gql`
	query topVendedores {
		topVendedores {
			total
			vendedor {
				nombre
			}
		}
	}
`;
