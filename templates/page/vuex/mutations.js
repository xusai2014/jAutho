export function SET_LIST(state, data) {
    let {list = [], pageNum = 1, pageSize, total = 0} = data || {};
    state.list = list;
    state.pager.pageNum = pageNum;
    state.pager.total = total;
    state.pager.pageSize = pageSize;
}

export function SET_DEMENSION(state, data) {
    state.joinStatus = data;
}

export function SET_DATE(state, data) {
    state.date = data;
}

export function SET_PAGENUM(state, data) {
    state.pager.pageNum = data;
}

export function RESET_LIST(state) {
    state.list = [];
    state.pager.pageNum = 1;
    state.pager.total = 0;
    state.date = new Date();
    state.joinStatus = 0;
}
