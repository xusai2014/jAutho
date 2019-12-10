<script>
    import breadCrumbsNav from '../common/breadcrumb';

    export default {
        created() {
        },
        computed: {
        },
        components: {
            breadCrumbsNav
        },
        watch: {
        },
        methods: {
        }
    };
</script>

<template>
    <article class="main">
        <bread-crumbs-nav></bread-crumbs-nav>
        <router-view></router-view>
    </article>
</template>

<style lang="stylus" scoped>

</style>
