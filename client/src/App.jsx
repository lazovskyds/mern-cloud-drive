import React, { useEffect } from 'react';
import { Navbar, Drive } from './components';
import { Registration, Login } from './pages';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './actions/user';


function App() {
	const isAuth = useSelector(({user}) => user.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(auth());
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<section className="wrapper">
				<Navbar />
				<section className="page">
					{ !isAuth 
						? <Switch>
							<Route exact path="/registration" component={Registration} />
							<Route exact path="/login" component={Login} />
							<Redirect to="/login" />
						</Switch>
						: <Switch>
							<Route exact path="/" component={Drive} />
							<Redirect to="/" />
						</Switch>
					}
				</section>
			</section>
		</BrowserRouter>
	)
}

export default App;