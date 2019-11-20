import * as api from './api';

export async function getList({ commit, state }, params = {}) {

    let data = await api.getList({
        joinStatus: state.joinStatus,
        page: state.pager.pageNum,
        pageSize: state.pager.pageSize,
        date: getTimeStr(state.date, 'yyyyMMdd')
    });
    commit('SET_LIST', data);
}

export function resetList({ commit }) {
    commit('RESET_LIST');
}

export function setDimension({ commit }, data) {
    commit('SET_DEMENSION', data);
}

export function setDate({ commit }, data) {
    commit('SET_DATE', data);
}

export function setPageNum({ commit }, data) {
    commit('SET_PAGENUM', data);
}
