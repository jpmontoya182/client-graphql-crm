import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
	mutation crearCliente($input: ClienteInput) {
		crearCliente(input: $input) {
			id
			nombre
			apellido
		}
	}
`;

export const ACTUALIZAR_CLIENTE = gql`
	mutation actualizarCliente($input: ClienteInput) {
		actualizarCliente(input: $input) {
			id
			nombre
			apellido
			empresa
			tipo
			edad
			emails {
				email
			}
		}
	}
`;

export const ELIMINAR_CLIENTE = gql`
	mutation eliminarCliente($id: ID!) {
		eliminarCliente(id: $id)
	}
`;

export const NUEVO_PRODUCTO = gql`
	mutation crearProducto($input: ProductoInput) {
		crearProducto(input: $input) {
			id
		}
	}
`;

export const ELIMINAR_PRODUCTO = gql`
	mutation eliminarProducto($id: ID!) {
		eliminarProducto(id: $id)
	}
`;

export const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($input: ProductoInput) {
		actualizarProducto(input: $input) {
			nombre
			precio
			stock
		}
	}
`;

export const NUEVO_PEDIDO = gql`
	mutation crearPedido($input: PedidoInput) {
		crearPedido(input: $input) {
			id
			fecha
			total
			pedidos {
				id
				cantidad
			}
		}
	}
`;

export const ACTUALIZAR_ESTADO = gql`
	mutation actualizarEstado($input: PedidoInput) {
		actualizarEstado(input: $input)
	}
`;

export const NUEVO_USUARIO = gql`
	mutation crearUsuario($usuario: String!, $nombre: String!, $password: String!, $rol: String!) {
		crearUsuario(usuario: $usuario, nombre: $nombre, password: $password, rol: $rol)
	}
`;

export const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($usuario: String!, $password: String!) {
		autenticarUsuario(usuario: $usuario, password: $password) {
			token
		}
	}
`;
