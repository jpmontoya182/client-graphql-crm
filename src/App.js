import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Layout/header';
import Clientes from './components/Clientes/clientes';
import EditarCliente from './components/Clientes/editarCliente';
import NuevoCliente from './components/Clientes/nuevoCliente';

import NuevoProducto from './components/Productos/nuevoProducto';
import Productos from './components/Productos/productos';
import EditarProducto from './components/Productos/editarProducto';

const client = new ApolloClient({
	uri: 'http://localhost:7001/graphql',
	cache: new InMemoryCache({
		addTypename: false
	}),
	onError: ({ networkError, graphQLErrors }) => {
		console.log(`graphQLErrors :  ${graphQLErrors}`);
		console.log(`networkError :  ${networkError}`);
	}
});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<Fragment>
						<Header />
						<div className="container">
							<Switch>
								<Route exact path="/clientes" component={Clientes} />
								<Route exact path="/clientes/nuevo" component={NuevoCliente} />
								<Route exact path="/clientes/editar/:id" component={EditarCliente} />

								<Route exact path="/productos" component={Productos} />
								<Route exact path="/productos/nuevo" component={NuevoProducto} />
								<Route exact path="/productos/editar/:id" component={EditarProducto} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;
