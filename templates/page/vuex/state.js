const current = new Date();
current.setDate(current.getDate() - 1);
export default {
    joinStatus: 0,
    dimensionList: [
        {
            value: 0,
            label: '未接入DSP'
        },
        {
            value: 1,
            label: '已接入DSP'
        },
        {
            value: 2,
            label: '黑名单广告位'
        }
    ],
    searchForm: {
        phoneNum: '',
        region: ''
    },
    date: current,
    list: [],
    pager: {
        pageNum: 1,
        total: 0,
        pageSize: 100
    }
};
