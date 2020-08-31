import React from 'react';
import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <div className="bg-primary py-3 position">
            <Container>
                <p className="text-center text-white">&copy; Todos los derechos reservados</p>
            </Container>
        </div>
    );
};

export default Footer;