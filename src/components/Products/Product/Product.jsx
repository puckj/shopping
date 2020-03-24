import React, { Fragment } from 'react';
import priceWithCommas from '../../../functions/priceWithCommas';
import ControlBtn from '../../../UI/ControlBtn/ControlBtn';
import { withRouter } from 'react-router-dom';

const Product = (props) => {

    return (
        <Fragment>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.weight} lbs</td>
            <td>฿{priceWithCommas(props.price)}</td>
            <td>
                <a onClick={props.productView}>view</a>
            </td>
            <td>
                <ControlBtn click={props.removeProduct} >-</ControlBtn>
                <ControlBtn click={props.addProduct} >+</ControlBtn>
            </td>
            <td>{props.amount}</td>
        </Fragment>
    )
}

export default Product;

