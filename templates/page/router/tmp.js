// <$城市管理$>
export default {
    path: '/<$modulesPath$>',
    name: '<$modulesName$>',
    meta: {
        breadcrumbName: '<$modulesName$>'
    },
    component(resolve) {
        require.ensure([], () => resolve(require('@/modules/<$modulesName$>')));
    },
    redirect: {
        name: '<$modulesName$>Default'
    },
    children: [{
        path: 'list',
        name: '<$modulesName$>List',
        meta: {
            breadcrumbName: 'List',
            requiresAuth: true
        },
        component(resolve) {
            require.ensure([], () => resolve(require('@/modules/<$modulesName$>/List/default')));
        },
        redirect: {
            name: '<$modulesName$>Default'
        },
        children: [{
            path: 'default',
            name: '<$modulesName$>Default',
            meta: {
                requiresAuth: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/modules/<$modulesName$>/List')));
            }
        }, {
            path: 'detail',
            name: '<$modulesName$>Detail',
            meta: {
                breadcrumbName: 'Detail',
                requiresAuth: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/modules/<$modulesName$>/Detail')));
            }
        }, {
            path: 'add',
            name: '<$modulesName$>Add',
            meta: {
                breadcrumbName: 'Add',
                requiresAuth: true
            },
            component(resolve) {
                require.ensure([], () => resolve(require('@/modules/<$modulesName$>/Add')));
            }
        }]
    }]
};
