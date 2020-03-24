import React, { Component, Fragment } from 'react';
import classes from './ShopControl.module.css'
import Products from '../../components/Products/Products';
import axios from '../../axios-orders';

// const tProducts = [
//     { id: 1, name: 'Sony RB 43 Pentium 4c', weight: 30, price: 2010, amount: 0 },
//     { id: 2, name: 'HP z555', weight: 21, price: 1599, amount: 0 },
//     { id: 3, name: 'Fujitsu Centrino 1.8 Gh', weight: 33, price: 2090, amount: 0 },
//     { id: 4, name: 'Toshiba S125 MP4', weight: 50, price: 2163, amount: 0 },
//     { id: 5, name: 'PowerMac G5/2.0 Ghz', weight: 19.5, price: 2218, amount: 0 }
// ]

class ShopControl extends Component {
    state = {
        products: null,
        totalPrice: 0,
        purchasable: false
    }

    componentDidMount() {
        console.log(this.props);
        
        axios.get('/products.json')
            .then(res => {
                this.setState({ products: res.data })
            })
            .catch(err => {
                console.log(err);
            })
        axios.get('/totalPrice.json')
            .then(res => {
                this.setState({ totalPrice: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        axios.put('/products.json', this.state.products)
        axios.put('/totalPrice.json', this.state.totalPrice)
    }

    // updatePurchaseState(products) {
    //     const sum = Object.keys(products).map(igKey => {
    //         return products[igKey];
    //     }).reduce((sum, el) => {
    //         return sum + el;
    //     }, 0)
    //     this.setState({ purchasable: sum > 0 })
    // }

    addProductHandler = (id) => {
        const oldCount = this.state.products[id].amount;
        const updateCount = oldCount + 1;
        const updatedProducts = {
            ...this.state.products
        }
        updatedProducts[id].amount = updateCount;
        const priceAddition = this.state.products[id].price;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            products: updatedProducts,
            totalPrice: newPrice
        })
        // this.updatePurchaseState(updatedProducts);
    }

    removeProductHandler = (id) => {
        const oldCount = this.state.products[id].amount;

        if (oldCount <= 0) {
            return;
        }

        const updateCount = oldCount - 1;
        const updatedProducts = {
            ...this.state.products
        }
        updatedProducts[id].amount = updateCount;
        const priceAddition = this.state.products[id].price;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            products: updatedProducts,
            totalPrice: newPrice
        })
        // this.updatePurchaseState(updatedProducts);
    }

    productViewHandler = (id) => {
        this.props.history.push({ pathname: '/' + id })
    }

    render() {
        let products = null;

        if (this.state.products) {
            products = (
                <Products
                    products={this.state.products}
                    addProduct={this.addProductHandler}
                    removeProduct={this.removeProductHandler}
                    totalPrice={this.state.totalPrice}
                    clickedView={this.productViewHandler}
                />
            )
        }
        return (
            <Fragment>
                {products}
            </Fragment>
        )
    }
}

export default ShopControl;