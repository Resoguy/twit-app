import { Routes, Route } from 'react-router-dom';
import s from './App.module.scss';
import Toolbar from './components/Toolbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	return (
		<>
			<Toolbar />
			<div className={s.container}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
