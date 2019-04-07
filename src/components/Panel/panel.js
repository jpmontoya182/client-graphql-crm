import React, { Fragment } from 'react';
import Clientes from './clientes';

const Panel = () => {
	return (
		<Fragment>
			<h1 className="text-center">Top 10 clientes que mas compran</h1>
			<Clientes />
		</Fragment>
	);
};

export default Panel;
