import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import axios from 'axios';
import { ProductContext } from './contexts/ProductContext'

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import { CartContext } from './contexts/CartContext';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		axios
		.post(data, item)
		.then(res => {
			this.setState({
				items: res.data
			})
			this.props.history.push('/cart');
		})
		.catch(err => {
			console.log(err);
		})
	};

	return (
		<div className="App">
			<CartContext.Provider value= {cart}>
			<Navigation cart={cart} />

			{/* Routes */}
			<ProductContext.Provider value={{products, addItem}}>
			<Route
				exact
				path="/"
				component = {Products}
				// render={() => (
				// 	<Products
				// 		products={products}
				// 		addItem={addItem}
				// 	/>
				// )}
			/>
			<Route
				path="/cart"
				component = {ShoppingCart}
				// render={() => <ShoppingCart cart={cart} />}
			/>
			</ProductContext.Provider>
			</CartContext.Provider>
		</div>
	);
}

export default App;
