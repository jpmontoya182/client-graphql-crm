import React, { Component, Fragment } from 'react';
import { PRODUCTO_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import FormEditarProducto from './formEditarProducto';

class EditarProducto extends Component {
	render() {
		const { id } = this.props.match.params;
		return (
			<Fragment>
				<h3 className="text-center">Editar Producto</h3>
				<div className="row justify-content-center">
					<Query query={PRODUCTO_QUERY} variables={{ id }}>
						{({ loading, error, data, refetch }) => {
							if (loading) return 'Cargando ...';
							if (error) return `Error : ${error.message}`;

							return <FormEditarProducto data={data} id={id} refetch={refetch} />;
						}}
					</Query>
				</div>
			</Fragment>
		);
	}
}

export default EditarProducto;
