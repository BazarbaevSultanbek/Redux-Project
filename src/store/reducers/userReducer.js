import { createSlice } from '@reduxjs/toolkit'

const UserSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUser(state, action) {
          return [...state,{name:action.payload.name}]
        },
        deleteUser(state, action) {
            return state.filter(item=>item !=action.payload.id)
        },
    }
})

export const { addUser, deleteUser } = UserSlice.actions
export default UserSlice.reducer