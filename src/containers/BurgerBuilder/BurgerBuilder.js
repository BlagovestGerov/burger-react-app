import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/IU/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


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
        totalPrice: 4,
        purchasable: false,
        pusrchasing: false
    };

    updatePurchaseState (ingredients) {
        this.ingredients = {
            ...this.state.ingredients
        };

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

    pusrchaseHandler = () => {
        this.setState({pusrchasing:true});
    }
    render () {

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        };
        // {salad: true, meat: false, ...}
        return (
            <Auxiliary>
               <Modal show={this.state.pusrchasing}> 
                   <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                < Burger ingredients={this.state.ingredients}/>
               <BuildControls 
               ingredientAdded={this.addIngrediantHandler}
               updateIngredients={this.removeIngredientHandler}
               disabled={disableInfo}
               purchasable={
                   this.state.purchasable
               }
               ordered={this.pusrchaseHandler}
               price={this.state.totalPrice}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder