import { Spinner } from 'react-bootstrap';

const SpinLoader = () => {
    return (
        <div className="overlay d-flex justify-content-center align-items-center m-auto" style={{ minHeight: '50vh' }}>
            <Spinner animation="border" variant="primary" size="lg" className="overlay-content" />
        </div>
    );
};

export default SpinLoader;
