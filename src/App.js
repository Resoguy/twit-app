import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkLoginAction } from './store/actionCreators';
import s from './App.module.scss';
import Toolbar from './components/Toolbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PrivateRoute from './layouts/PrivateRoute';
import PublicRoute from './layouts/PublicRoute';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkLoginAction());
	}, []);

	return (
		<>
			<Toolbar />
			<div className={s.container}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='login'
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path='register'
						element={
							<PublicRoute>
								<Register />
							</PublicRoute>
						}
					/>
					<Route
						path='profile'
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
