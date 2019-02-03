import React, { Component } from 'react';
import Button from '../../../components/IU/Button/Button';
import Spinner from '../../../components/IU/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
     this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Blagovest Gerov',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '1000',
                    country: 'Bulgaria'
                },
                email: 'test@test.com'
            },
           deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false})
        }
            
        );    
    }

    render () {
        let form = (
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Pstal Code"/>
        <Button 
        btnType="Success"
        clicked={this.orderHandler}>Order</Button>                    
        </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;