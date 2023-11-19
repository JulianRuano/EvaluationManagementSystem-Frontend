import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  labours: []
}

const labourSlice = createSlice({
  name: 'labours',
  initialState,
  reducers: {
    addLabours: (state, action) => {
      state.labours = [...state.labours, action.payload]
    }
  }
})

export const { setLabour, clearLabour } = labourSlice.actions

export default labourSlice.reducer