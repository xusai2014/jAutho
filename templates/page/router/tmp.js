// <$城市管理$>
export default {
    path: '<$modulesPath$>',
    name: '<$modulesName$>',
    meta: {
        breadcrumbName: '<$modulesName$>'
    },
    component(resolve) {
        require.ensure([], () => resolve(require('@/modules/<$modulesName$>')));
    },
    children: [{
        path: 'list',
        name: '<$modulesName$>List',
        meta: {
            breadcrumbName: 'list'
        },
        component(resolve) {
            require.ensure([], () => resolve(require('@/modules/<$modulesName$>/List')));
        }
    }, {
        path: 'add',
        name: '<$modulesName$>List',
        meta: {
            breadcrumbName: 'add'
        },
        component(resolve) {
            require.ensure([], () => resolve(require('@/modules/<$modulesName$>/Add')));
        }
    }]
};
