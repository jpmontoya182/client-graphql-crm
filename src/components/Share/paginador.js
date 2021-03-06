import React, { Component, Fragment } from 'react';

class Paginador extends Component {
	state = {
		paginador: {
			paginas: Math.ceil(Number(this.props.total) / this.props.limite)
		}
	};
	render() {
		const { actual } = this.props;
		const btnAnterior =
			actual > 1 ? (
				<button type="button" className="btn btn-success mr-2" onClick={this.props.paginaAnterior}>
					&laquo; Anterior
				</button>
			) : (
				<button
					type="button"
					className="btn btn-default mr-2"
					onClick={this.props.paginaAnterior}
					disabled={true}
				>
					&laquo; Anterior
				</button>
			);
		const { paginas } = this.state.paginador;
		const btnSiguiente =
			actual !== paginas ? (
				<button type="button" className="btn btn-success" onClick={this.props.paginaSiguiente}>
					Siguiente &raquo;
				</button>
			) : (
				<button type="button" className="btn btn-default" onClick={this.props.paginaSiguiente} disabled={true}>
					Siguiente &raquo;
				</button>
			);

		return (
			<Fragment>
				<div className="mt-5 d-flex justify-content-center">
					{btnAnterior}
					{btnSiguiente}
				</div>
			</Fragment>
		);
	}
}

export default Paginador;
