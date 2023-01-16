import './App.css';
import './css/style.css';
import { BrowserRouter } from 'react-router-dom';
import ApplicationRoutes from './routes/ApplicationRoutes';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ApplicationRoutes />
            </BrowserRouter>
        </div>
    );
}

export default App;
