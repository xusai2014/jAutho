import request from '@/common/request';

export async function getList(params) {
    return request.get({
        url: '/autodelivery/posflow/report',
        params
    });
}


