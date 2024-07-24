import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxStore/store';

import './App.scss';
import { Analytics } from '@vercel/analytics/react';

function App() {
	const Navbar = lazy(() => import('./components/navbar'));
	const Products = lazy(() => import('./components/products'));

	return (
		<Suspense fallback={'loading...'}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Analytics />
					<Navbar />
					<Products />
				</PersistGate>
			</Provider>
		</Suspense>
	);
}

export default App;
