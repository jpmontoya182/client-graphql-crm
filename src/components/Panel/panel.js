import React, { Fragment } from 'react';
import Clientes from './clientes';
import Vendedores from './vendedores';

const Panel = () => {
	return (
		<Fragment>
			<h1 className="text-center">Top 10 clientes que mas compran</h1>
			<Clientes />
			<h1 className="text-center">Top 10 vendedores </h1>
			<Vendedores />
		</Fragment>
	);
};

export default Panel;
