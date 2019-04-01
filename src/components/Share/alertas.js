import React from 'react';

export const MensajeExito = ({ mensaje }) => {
	return <p className="alert alert-success py-3 text-center my-3">{mensaje}</p>;
};

export const MensajeError = ({ mensaje }) => {
	return <p className="alert alert-danger py-3 text-center my-3">{mensaje}</p>;
};
