import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/IU/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/IU/Spinner/Spinner';
import axios from '../../axios-orders';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

        // constructor(props) {
    //     super(props);
    //     this.state ={...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseState (ingredients) {
        // this.ingredients = {
        //     ...this.state.ingredients
        // };

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
        return sum + el;
        }, 0)
        this.setState({purchasable: sum > 0});
    }

    addIngrediantHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type)  => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        };
        const updateCounted = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice,ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);        
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
        axios.post('/orders.json',order)
        .then(response => 
            this.setState({loading: false, purchasing: false})
        )
        .catch(error =>             
            this.setState({loading: false, purchasing: false})
        );        
    }

    render () {

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        };

        let orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        // {salad: true, meat: false, ...}
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                < Burger ingredients={this.state.ingredients}/>
               <BuildControls 
               ingredientAdded={this.addIngrediantHandler}
               updateIngredients={this.removeIngredientHandler}
               disabled={disableInfo}
               purchasable={
                   this.state.purchasable
               }
               ordered={this.purchaseHandler}
               price={this.state.totalPrice}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder