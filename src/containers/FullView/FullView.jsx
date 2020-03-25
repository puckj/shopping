import React, { Component } from 'react';
import axios from '../../axios-orders';
import * as ReactBootstrap from 'react-bootstrap'
import priceWithCommas from '../../functions/priceWithCommas';
import ControlBtn from '../../UI/ControlBtn/ControlBtn';

class FullView extends Component {
    state = {
        loadedProduct: null,
        loadedTotalPrice: null
    }

    componentDidMount() {
        if (this.props.match.params.productId) {
            if (!this.state.loadedProduct || (this.state.loadedProduct && this.state.loadedProduct.id !== this.props.id)) {
                axios.get('/products/' + this.props.match.params.productId + '.json')
                    .then(response => {
                        this.setState({ loadedProduct: response.data });
                    })
                axios.get('/totalPrice.json')
                    .then(response => {
                        this.setState({ loadedTotalPrice: response.data });
                    })
            }
        }
    }

    componentDidUpdate() {
        if (this.state.loadedProduct) {
            axios.put('/products/' + this.state.loadedProduct.id + '.json', this.state.loadedProduct)
            axios.put('/totalPrice.json', this.state.loadedTotalPrice)
        }
    }

    addProductHandler = () => {
        const oldCount = this.state.loadedProduct.amount;
        const updateCount = oldCount + 1;
        const updatedProduct = {
            ...this.state.loadedProduct
        }
        updatedProduct.amount = updateCount;

        const priceAddition = this.state.loadedProduct.price;
        const oldPrice = this.state.loadedTotalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            loadedProduct: updatedProduct,
            loadedTotalPrice: newPrice
        })
    }

    removeProductHandler = () => {
        const oldCount = this.state.loadedProduct.amount;

        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedProduct = {
            ...this.state.loadedProduct
        }
        updatedProduct.amount = updateCount;

        const priceAddition = this.state.loadedProduct.price;
        const oldPrice = this.state.loadedTotalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            loadedProduct: updatedProduct,
            loadedTotalPrice: newPrice
        })
    }

    backHandler = () => {
        this.props.history.push({ pathname: '/' })
    }

    render() {
        let productView = <p>Loading...</p>

        if (this.state.loadedProduct) {
            productView = (
                <div>

                    <button onClick={this.backHandler}>Back</button>

                    <h3>Product Details</h3>
                    <ReactBootstrap.Table striped bordered hover>
                        <tr>
                            <td>ID</td>
                            <td>{this.state.loadedProduct.id}</td>
                        </tr>
                        <tr>
                            <td>Product Name</td>
                            <td>{this.state.loadedProduct.name}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>฿ {priceWithCommas(this.state.loadedProduct.price)}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{this.state.loadedProduct.weight} lbs</td>
                        </tr>
                        <tr>
                            <td>Amount</td>
                            <td>{this.state.loadedProduct.amount}</td>
                        </tr>
                    </ReactBootstrap.Table>
                    <ControlBtn click={this.removeProductHandler} >Less</ControlBtn>
                    <ControlBtn click={this.addProductHandler} >Add</ControlBtn>

                </div>
            )
        }

        return productView;
    }
}

export default FullView;