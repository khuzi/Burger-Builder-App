import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Aux.component';
import Burger from '../../components/Burger/Burger.component';
import BuildControls from '../../components/Burger/BuildControls/buildControls.component';
import Modal from '../../components/UI/Modal/Modal.component';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.component';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner.component';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 4,
        purchasing: false
        // loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    // addIngredientsHandler = (type) => {
    //     const oldCont = this.state.ingredients[type];
    //     const updatedCount = oldCont + 1;
    //     const updatedIngredients  = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice , ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientsHandler = (type) => {
    //     const oldCont = this.state.ingredients[type];
    //     if(oldCont <= 0) {     
    //         return;
    //     }
    //     const updatedCount = oldCont - 1;
    //     const updatedIngredients  = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENTS_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice , ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //=============================OLD APPROACH=============================

        // const queryParams = [];
        // for (const key in this.props.ings) {
        //     queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ings[key]));
        // }

        // queryParams.push("price=" + this.props.price);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        //=========================NEW APPROACH (REDUX)=========================
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)}
            />
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));





// import  React ,{ Component } from 'react';
// import { connect } from 'react-redux';

// import Aux from '../../hoc/Auxiliary/Aux.component';
// import Burger from '../../components/Burger/Burger.component';
// import BuildControls from '../../components/Burger/BuildControls/buildControls.component';
// import Modal from '../../components/UI/Modal/Modal.component';
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.component';
// import axios from '../../axios-orders';
// import Spinner from '../../components/UI/Spinner/Spinner.component';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as burgerBuilderActions from '../../store/actions/index';

// class BurgerBuilder extends Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {...}
//     // }
//     state = {
//         purchasing: false
//     }

//     componentDidMount () {
//         console.log(this.props); 
//         this.props.onInitIngredients();
//     }

//     updatePurchaseState ( ingredients ) {
//         const sum = Object.keys( ingredients )
//             .map( igKey => {
//                 return ingredients[igKey];
//             } )
//             .reduce( ( sum, el ) => {
//                 return sum + el;
//             }, 0 );
//         return sum > 0;
//     }

//     purchaseHandler = () => {
//         this.setState( { purchasing: true } );
//     }

//     purchaseCancelHandler = () => {
//         this.setState( { purchasing: false } );
//     }

//     purchaseContinueHandler = () => {
//         this.props.history.push('/checkout');
//     }

//     render () {
//         const disabledInfo = {
//             ...this.props.ings
//         };
//         for ( let key in disabledInfo ) {
//             disabledInfo[key] = disabledInfo[key] <= 0
//         }
//         let orderSummary = null;
//         let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

//         if ( this.props.ings ) {
//             burger = (
//                 <Aux>
//                     <Burger ingredients={this.props.ings} />
//                     <BuildControls
//                         ingredientAdded={this.props.onIngredientAdded}
//                         ingredientRemoved={this.props.onIngredientRemoved}
//                         disabled={disabledInfo}
//                         purchasable={this.updatePurchaseState(this.props.ings)}
//                         ordered={this.purchaseHandler}
//                         price={this.props.price} />
//                 </Aux>
//             );
//             orderSummary = <OrderSummary
//                 ingredients={this.props.ings}
//                 price={this.props.price}
//                 purchaseCancelled={this.purchaseCancelHandler}
//                 purchaseContinued={this.purchaseContinueHandler} />;
//         }
//         // {salad: true, meat: false, ...}
//         return (
//             <Aux>
//                 <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
//                     {orderSummary}
//                 </Modal>
//                 {burger}
//             </Aux>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         ings: state.ingredients,
//         price: state.totalPrice,
//         error: state.error
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));