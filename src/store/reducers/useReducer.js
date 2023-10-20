import {createSlice} from '@reduxjs/toolkit'
import Pizza from "../../img/Testa.jpg";
import Feta from "../../img/Feta.jpg";
import Cuts from "../../img/ColdCuts.jpg";
import Mozzarella from "../../img/Mozzarella.jpg";
import Pepperoni from "../../img/Pepperoni.jpg";
import Spices from "../../img/Spices.jpg";
import cheese from "../../img/SwissCheese.jpg";
import Vegetables from "../../img/Vegetables.jpg";

const ItemSlice = createSlice({
    name: 'ingredients',
    initialState: {
        pizza: Pizza,
        total: 0,
        ingredients: [
            {
                name: "Feta",
                img: Feta,
                price: 1.5,
                id: 1,
                number: 0,
                status: false
            },
            {
                name: "Cold cuts",
                img: Cuts,
                price: 3,
                id: 2,
                number: 0,
                status: false
            },
            {
                name: "Mozzarella",
                img: Mozzarella,
                price: 1,
                id: 3,
                number: 0,
                status: false
            },
            {
                name: "Pepperoni",
                img: Pepperoni,
                price: 2.5,
                id: 4,
                number: 0,
                status: false
            },
            {
                name: "Spices",
                img: Spices,
                price: 0.25,
                id: 5,
                number: 0,
                status: false
            },
            {
                name: "Swiss cheese",
                img: cheese,
                price: 0.25,
                id: 6,
                number: 0,
                status: false
            },
            {
                name: "Vegetables",
                img: Vegetables,
                price: 0.75,
                id: 7,
                number: 0,
                status: false
            }
        ],
        savedItems: []
    },
    reducers: {
        CountItemDec(state, action) {
            state.ingredients = state.ingredients.map(item =>
                item.id === action.payload.id ? {
                    ...item,
                    number: item.number > 0 ? item.number - 1 : 0,
                    status: item.number > 1
                } : item
            );
            state.total = state.ingredients.reduce((total, item) => {
                return total + item.number * item.price;
            }, 0);
        },
        CountItemInc(state, action) {
            state.ingredients = state.ingredients.map(item =>
                item.id === action.payload.id ? {...item, number: item.number + 1, status: true} : item
            );
            state.total = state.ingredients.reduce((total, item) => {
                return total + item.number * item.price;
            }, 0);
        },
        ResetItem(state) {
            state.ingredients = state.ingredients.map(item =>
                ({...item, number: 0, status: false})
            );
            state.total = 0;
        },
        saveItems(state, action) {
            return {
                ...state,
                savedItems: [
                    ...state.savedItems,
                    {
                        id: action.payload.id,
                        items: action.payload.items,
                    },
                ],
            };
        },
        ShowCodeItems(state, action)  {
            return action.payload.items[0].items
        }
    }
});

export const {CountItemInc, CountItemDec, ResetItem, saveItems, ShowCodeItems} = ItemSlice.actions
export default ItemSlice.reducer