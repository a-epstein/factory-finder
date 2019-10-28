export default {
  ADDFILTER: (state: IFilterState, filter: string) => {
    state.filters.push(filter)
  },
  REMOVEFILTER: (state: IFilterState, filter: string) => {
    const idx = state.filters.findIndex((f) => f === filter)
    if (idx > -1) {
      state.filters.splice(idx, 1)
    }
  },
};
