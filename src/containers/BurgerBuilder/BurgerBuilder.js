import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/IU/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/IU/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

class BurgerBuilder extends Component{

        // constructor(props) {
    //     super(props);
    //     this.state ={...}
    // }
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = () => {
        console.log(this.props);
    //   axios.get('https://react-my-burger-28d04.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch( error => {
    //       this.setState({error: true})
    //   });
    }
    

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
       return sum > 0;
    }

    // addIngrediantHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updateCounted = oldCount + 1;
    //     const updateIngredients = {
    //         // ...this.props.ings
    //         ...this.state.ingredients
    //     }
    //     updateIngredients[type] = updateCounted;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    //     this.updatePurchaseState(updateIngredients);
    // }

    // removeIngredientHandler = (type)  => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0) {
    //         return;
    //     };
    //     const updateCounted = oldCount - 1;
    //     const updateIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updateIngredients[type] = updateCounted;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice,ingredients: updateIngredients});
    //     this.updatePurchaseState(updateIngredients);        
    // }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        
        // const queryParams = [];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const querString = queryParams.join('&')
        this.props.history.push('/checkout');
    }

    render () {

        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        };

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disableInfo}
                purchasable={
                    this.updatePurchaseState(this.props.ings)
                }
                ordered={this.purchaseHandler}
            price={this.props.price}/>
            </Auxiliary>
        );  
        orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>;
    }

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
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));