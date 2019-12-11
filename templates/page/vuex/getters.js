import { toThousands } from '@/common/util';

export function columnsList(state) {
    return [
        {
            label: '手机号',
            prop: 'phoneNum',
            width: '',
            align: 'left',
            formatter: (row, column)=>{
                const arr = row[column.property].split('');
                const [a, b, c, d, e, f, g, h] = arr;
                return `${a}${b}${c}${d}-${e}${f}-${g}${h}`;
            }
        },
        {
            label: '司机姓名',
            prop: 'phoneNum',
            width: '',
            align: 'left'
        },
        {
            label: '城市',
            prop: 'phoneNum',
            width: '',
            align: 'left'

        },
        {
            label: '时间',
            prop: 'phoneNum',
            width: '',
            align: 'left',
            showTooltip: true
        },
        {
            label: '已评订单数',
            prop: 'phoneNum',
            width: '',
            align: 'left'
        },
        {
            label: '用户评分',
            prop: 'phoneNum',
            width: '',
            align: 'left'
        },
        {
            label: '车内脏乱有异味',
            prop: 'phoneNum',
            width: '120',
            align: 'left'
        },
        {
            label: '驾驶习惯差，乘坐不舒服',
            prop: 'phoneNum',
            width: '120',
            align: 'left'
        },
        {
            label: '未着正装，服务不标准',
            prop: 'phoneNum',
            width: '120',
            align: 'left'
        },
        {
            label: '未配备饮用水，WIFI',
            prop: 'phoneNum',
            width: '120',
            align: 'left'
        },
        {
            label: '上下车不开车门',
            prop: 'phoneNum',
            width: '120',
            align: 'left'
        },
        {
            label: '不熟悉路况',
            prop: 'phoneNum',
            width: '',
            align: 'left'
        }
    ];
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
