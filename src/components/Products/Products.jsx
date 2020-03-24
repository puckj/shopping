import React, { Fragment } from 'react';
import Product from './Product/Product.jsx'
import priceWithCommas from '../../functions/priceWithCommas'
import * as ReactBootstrap from 'react-bootstrap'

const Products = (props) => {
    
    const transformProducts = Object.keys(props.products).map(pdKey => {   
        return [...Array(props.products[pdKey])].map((product, i) => {
            return (<tr>
                <Product
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    weight={product.weight}
                    price={product.price}
                    amount={product.amount}
                    addProduct={() => props.addProduct(product.id)}
                    removeProduct={() => props.removeProduct(product.id)}
                    productView={()=> props.clickedView(product.id)}
                />
            </tr>)
        })
    });

    return (
        <Fragment>
            <ReactBootstrap.Table striped bordered hover>
                <thead>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Detail</th>
                    <th>Add/Remove</th>
                    <th>Amount</th>
                </thead>
                {transformProducts}
            </ReactBootstrap.Table>
            <button>
                Checkout
            </button>
            <p>Total Price : ฿ {priceWithCommas(props.totalPrice)}</p>
        </Fragment>
    )
}

export default Products;