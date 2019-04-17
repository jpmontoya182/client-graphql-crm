import React, { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Layout/header';
import Clientes from './components/Clientes/clientes';
import EditarCliente from './components/Clientes/editarCliente';
import NuevoCliente from './components/Clientes/nuevoCliente';

import NuevoProducto from './components/Productos/nuevoProducto';
import Productos from './components/Productos/productos';
import EditarProducto from './components/Productos/editarProducto';

import NuevoPedido from './components/Pedidos/nuevoPedido';
import PedidosCliente from './components/Pedidos/pedidosCliente';

import Panel from './components/Panel/panel';
import Registro from './components/Auth/registro';
import Login from './components/Auth/login';

import Session from './components/Session';

const App = ({ refetch, session }) => {
	const { obtenerUsuario } = session;
	const mensaje = obtenerUsuario ? `Bienvenido ${obtenerUsuario.nombre}` : <Redirect to="/login" />;
	return (
		<Router>
			<Fragment>
				<Header session={session} />

				<div className="container">
					<p className="text-right">{mensaje}</p>
					<Switch>
						<Route exact path="/clientes" render={() => <Clientes session={session} />} />
						<Route exact path="/clientes/nuevo" render={() => <NuevoCliente session={session} />} />
						<Route exact path="/clientes/editar/:id" component={EditarCliente} />

						<Route exact path="/productos" component={Productos} />
						<Route exact path="/productos/nuevo" component={NuevoProducto} />
						<Route exact path="/productos/editar/:id" component={EditarProducto} />
						<Route exact path="/pedidos/nuevo/:id" render={() => <NuevoPedido session={session} />} />
						<Route exact path="/pedidos/:id" component={PedidosCliente} />

						<Route exact path="/panel" component={Panel} />

						<Route exact path="/registro" render={() => <Registro session={session} />} />
						<Route exact path="/login" render={() => <Login refetch={refetch} />} />
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
};

const RootSession = Session(App);

export { RootSession };
