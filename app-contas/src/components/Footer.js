import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-left mt-auto'>
            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', position: 'fixed', bottom: 0, width: '100%' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-dark' href='https://mdbootstrap.com/'>
                    Flávia Costa
                </a>
            </div>
        </MDBFooter>
    );
};

export default Footer;

