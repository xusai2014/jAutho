// <$城市管理$>
export default {
    path: '<$modulesPath$>',
    name: '<$modulesName$>',
    meta: {
        breadcrumbName: ''
    },
    component(resolve) {
        require.ensure([], () => resolve(require('@/modules/<$modulesName$>')));
    }
};
