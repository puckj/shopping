import React, { Component, Fragment } from 'react';
import classes from './ShopControl.module.css'
import Products from '../../components/Products/Products';
import axios from '../../axios-orders';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../UI/Modal/Modal';

class ShopControl extends Component {
    state = {
        products: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    componentDidMount() {
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
    }


    productViewHandler = (id) => {
        this.props.history.push({ pathname: '/' + id })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = (e) => {
        alert('purchase successfully');
        this.setState({ purchasing: false })
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
                    purchasing={this.purchaseHandler}
                />
            )
        }

        let orderSummary = <OrderSummary
            products={this.state.products}
            totalPrice={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        />

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {products}
            </Fragment>
        )
    }
}

export default ShopControl;