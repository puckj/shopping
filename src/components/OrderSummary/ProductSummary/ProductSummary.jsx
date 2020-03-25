import React, { Fragment } from 'react';
import priceWithCommas from '../../../functions/priceWithCommas';

const Product = (props) => {

    return (
        <Fragment>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.weight} lbs</td>
            <td>฿{priceWithCommas(props.price)}</td>
            <td>{props.amount}</td>
        </Fragment>
    )
}

export default Product;

