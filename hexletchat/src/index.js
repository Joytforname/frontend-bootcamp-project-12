import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import appRoot from './AppRoot';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await appRoot());
};

app();
