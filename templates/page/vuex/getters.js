import { toThousands } from '@/common/util';

export function columnsList(state) {
    let dimension = state.joinStatus;
    if (dimension === 1) {
        return [
            {
                label: '统计日期',
                prop: 'flowDate',
                width: '',
                align: 'left',
                formatter: (row, column)=>{
                    const arr = row[column.property].split('');
                    const [a, b, c, d, e, f, g, h] = arr;
                    return `${a}${b}${c}${d}-${e}${f}-${g}${h}`;
                }
            },
            {
                label: '广告位名称',
                prop: 'adposName',
                width: '',
                align: 'left'
            },
            {
                label: '广告位ID',
                prop: 'adposId',
                width: '',
                align: 'left'

            },
            {
                label: '日请求量',
                prop: 'maxReq',
                width: '',
                align: 'left',
                showTooltip: true
            },
            {
                label: '广告位路径',
                prop: 'adposPath',
                width: '',
                align: 'left'
            }
        ];
    } else if (dimension === 0) {
        return [
            {
                label: '统计日期',
                prop: 'flowDate',
                width: '',
                align: 'left',
                formatter: (row, column)=>{
                    const arr = row[column.property].split('');
                    const [a, b, c, d, e, f, g, h] = arr;
                    return `${a}${b}${c}${d}-${e}${f}-${g}${h}`;
                }
            },
            {
                label: '广告位名称',
                prop: 'adposName',
                width: '',
                align: 'left'
            },
            {
                label: '广告位ID',
                prop: 'adposId',
                width: '',
                align: 'left'

            },
            {
                label: '日请求量',
                prop: 'maxReq',
                width: '',
                align: 'left',
                showTooltip: true
            },
            {
                label: '未接入DSP原因',
                prop: 'reason',
                width: '',
                align: 'left'
            },
            {
                label: '广告位页面url',
                prop: 'pageUrl',
                width: '',
                align: 'left',
                renderDom: (row, column) => {
                    return `<a href='${row[column.property]}' />`;
                }
            }
        ];
    } else if (dimension === 2) {
        return [
            {
                label: '统计日期',
                prop: 'flowDate',
                width: '',
                align: 'left',
                formatter: (row, column)=>{
                    const arr = row[column.property].split('');
                    const [a, b, c, d, e, f, g, h] = arr;
                    return `${a}${b}${c}${d}-${e}${f}-${g}${h}`;
                }
            },
            {
                label: '广告位名称',
                prop: 'adposName',
                width: '',
                align: 'left'
            }, {
                label: '广告位ID',
                prop: 'adposId',
                width: '',
                align: 'left'
            }, {
                label: '日请求量',
                prop: 'maxReq',
                width: '',
                align: 'left',
                showTooltip: true
            },
            {
                label: '广告位地址',
                prop: 'pageUrl',
                width: '',
                align: 'left'
            }

        ];
    }
    return [];
}

export function formattedSummary(state) {
    let data = {};
    let { summary = {} } = state;
    Object.keys(summary).map(item => {
        data[item] = toThousands(summary[item] || 0);
    });
    return data;
}

export function formattedList(state) {
    let data = [];
    state.list.map(item => {
        let obj = {};
        Object.keys(item).map(key => {
            if (Number.isFinite(item[key])) {
                obj[key + 'Origin'] = item[key];
                obj[key] = toThousands(item[key] || 0);
            } else {
                obj[key] = item[key];
            }
        });
        data.push(obj);
    });
    return data;
}

export function getSearchDate(state) {
    return state.date;
}
