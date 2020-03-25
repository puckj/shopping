import React, { Fragment, Component } from 'react';
import ProductSummary from './ProductSummary/ProductSummary';
import * as ReactBootstrap from 'react-bootstrap'
import Button from '../../UI/Button/Button';
import priceWithCommas from '../../functions/priceWithCommas';

class OrderSummary extends Component {
    render() {
        let transformProducts = <p>Loading...</p>

        if (this.props.products) {
            transformProducts = Object.keys(this.props.products).map(pdKey => {
                return [...Array(this.props.products[pdKey])].map((product, i) => {
                    let productList = null;
                    if (product.amount > 0) {
                        productList =
                            <tr>
                                <ProductSummary
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    weight={product.weight}
                                    price={product.price}
                                    amount={product.amount}
                                />
                            </tr>
                    }
                    return productList;
                })
            });
        }


        return (
            <Fragment>
                <h3>Your Order</h3>
                <ReactBootstrap.Table striped bordered hover>
                    <thead>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Weight</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                    </thead>
                    {transformProducts}
                </ReactBootstrap.Table>
                <p>Total Price : ฿ {priceWithCommas(this.props.totalPrice)}</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCLE</Button>
                <Button btnType="Success" clicked={(e)=> this.props.purchaseContinued(e)}>CONTINUE</Button>
            </Fragment>
        )
    }
}
export default OrderSummary;