import React, { Component } from 'react';
import axios from '../../axios-orders';
import * as ReactBootstrap from 'react-bootstrap'
import priceWithCommas from '../../functions/priceWithCommas';
import ControlBtn from '../../UI/ControlBtn/ControlBtn';

class FullView extends Component {
    state = {
        loadedProduct: null
    }
    componentDidMount() {
        if (this.props.match.params.productId) {
            if (!this.state.loadedProduct || (this.state.loadedProduct && this.state.loadedProduct.id !== this.props.id)) {
                axios.get('/products/' + this.props.match.params.productId + '.json')
                    .then(response => {
                        this.setState({ loadedProduct: response.data });
                    })
            }
        }
        console.log(this.props);
    }

    render() {
        let productView = <p>Loading...</p>

        if (this.state.loadedProduct) {
            productView = (
                <div>
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
                    </ReactBootstrap.Table>
                    <ControlBtn click={this.props.removeProduct} >-</ControlBtn>
                    <ControlBtn click={this.props.addProduct} >+</ControlBtn>
                    <p>Amount : {this.state.loadedProduct.amount}</p>
                </div>
            )
        }

        return productView;
    }
}

export default FullView;