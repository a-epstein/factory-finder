export default {
  ADDFILTER: ({ commit }: any, filter: string): void => {
    commit('ADDFILTER', filter)
  },
  REMOVEFILTER: ({ commit }: any, filter: string): void => {
    commit('REMOVEFILTER', filter)
  }
};
