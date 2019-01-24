import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
            salad: 1,
            bacon: 2,
            cheese: 2,
            meat: 1
        },
        tatalPrice: 4
    };

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
        this.setState({totalPrice: newPrice,ingredients: updateIngredients});
    }

    removeIngredientHandler = (type)  => {

    }

    render () {
        return (
            <Auxiliary>
                < Burger ingredients={this.state.ingredients}/>
               <BuildControls 
               ingredientAdded={this.addIngrediantHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder