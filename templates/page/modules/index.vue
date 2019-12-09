<script>

import list from './list';
import { mapActions } from 'vuex';

export default {
    async created() {
        this.$changeLoadingState(true);
        try {
            await this.getList();
        } catch (error) {

        }
        this.$changeLoadingState(false);
    },
    computed: {},
    components: {
        list
    },
    methods: {
        ...mapActions('<$modules$>', {
            getList: 'getList'
        })
    }
};
</script>

<template>
    <article class="main">
    <list></list>
    </article>
</template>
