<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
        async created() {
            this.$changeLoadingState(true);
            try {
                await this.getList();
            } catch (error) {

            }
            this.$changeLoadingState(false);
        },
        data() {
            return {};
        },
        computed: {
            ...mapState('<$modules$>', {
                pager: 'pager',
                searchDate: 'date',
                joinStatus: 'joinStatus',
                dimensionList: 'dimensionList',
                formInline: 'searchForm'
            }),
            ...mapGetters('<$modules$>', {
                columnsList: 'columnsList',
                formattedList: 'formattedList',
                getSearchDate: 'getSearchDate'
            }),
            date: {
                get() {
                    return this.searchDate;
                },
                set(v) {
                    this.setDate(v);
                }
            }
        },
        methods: {
            ...mapActions('<$modules$>', {
                setDimension: 'setDimension',
                setDate: 'setDate',
                setPageNum: 'setPageNum',
                resetList: 'resetList',
                getList: 'getList'
            }),
            async getData() {
                this.$changeLoadingState(true);
                try {
                    await this.getList();
                } catch (error) {}
                this.$changeLoadingState(false);
            },
            onDimensionChange(v) {
                this.setDimension(v);
                this.getData();
            },
            onDateChange(v) {
                this.setDate(new Date(v));
                this.getData();
            },
            handleCurrentChange(val) {
                this.setPageNum(val);
                this.getData();
            },
            search() {
                this.setPageNum(1);
                this.getData();
            }
        }
    };
</script>
<template>
    <ah-card class="box-card">
        <div slot="header" class="box-card-header">
            <span class="box-card-title">
                <ah-form :inline="true" :model="formInline" label-width="80px" size="mini" label-position="right">
                    <ah-form-item label="手机号">
                        <ah-input v-model="formInline.phoneNum" placeholder="手机号"></ah-input>
                    </ah-form-item>
                    <ah-form-item label="车牌号">
                        <ah-input v-model="formInline.phoneNum" placeholder="车牌号"></ah-input>
                    </ah-form-item>
                    <ah-form-item label="车型级别">
                        <ah-select v-model="formInline.region" placeholder="车型级别">
                            <ah-option label="区域一" value="shanghai"></ah-option>
                            <ah-option label="区域二" value="beijing"></ah-option>
                        </ah-select>
                    </ah-form-item>
                    <ah-form-item label="城市">
                        <ah-select v-model="formInline.region" placeholder="城市">
                            <ah-option label="区域一" value="shanghai"></ah-option>
                            <ah-option label="区域二" value="beijing"></ah-option>
                        </ah-select>
                    </ah-form-item>
                    <ah-form-item label="合同状态">
                        <ah-select v-model="formInline.region" placeholder="车型级别">
                            <ah-option label="区域一" value="shanghai"></ah-option>
                            <ah-option label="区域二" value="beijing"></ah-option>
                        </ah-select>
                    </ah-form-item>
                    <ah-form-item label="服务状态">
                        <ah-select v-model="formInline.region" placeholder="车型级别">
                            <ah-option label="区域一" value="shanghai"></ah-option>
                            <ah-option label="区域二" value="beijing"></ah-option>
                        </ah-select>
                    </ah-form-item>
                    <ah-form-item>
                        <ah-button type="primary" icon="ah-icon-refresh" @click="onSubmit">重置</ah-button>
                        <ah-button type="primary" icon="ah-icon-remove" @click="onSubmit">查询</ah-button>
                    </ah-form-item>
                    <div class="box-card-actions">
                        <router-link :to='{name: "<$modulesName$>Add"}'>
                            <ah-button type="primary">新建</ah-button>
                        </router-link>
                    </div>
                </ah-form>
            </span>

        </div>
        <div class="table-container">
            <ah-table
                    :data="formattedList"
                    stripe
                    border
                    size="mini"
                    header-row-class-name="header-align"
                    header-cell-class-name="header-align"
                    style="width: 100%"
            >
                <ah-table-column
                        v-for="column in columnsList"
                        :prop="column.prop"
                        :label="column.label"
                        :width="column.width"
                        :type="column.type"
                        :min-width="column.minWidth"
                        :fixed="column.fixed"
                        :sortable="column.sortable"
                        :sort-method="column.sortMethod"
                        :sort-by="column.sortBy"
                        :sort-orders="column.sortOrders"
                        :resizable="column.resizable"
                        :formatter="column.formatter"
                        :show-overflow-tooltip="column.showTooltip"
                        :align="column.align"
                        class="header-class"
                >
                </ah-table-column>
                <ah-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <router-link :to='{name: "<$modulesName$>Detail" }'>
                            <ah-button type="text" size="small">查看</ah-button>
                        </router-link>
                    </template>
                </ah-table-column>
            </ah-table>
            <div class="table-list-page">
                <ah-pagination
                        background
                        @current-change="handleCurrentChange"
                        :current-page="pager.pageNum"
                        layout="total, prev, pager, next, jumper"
                        :total="pager.total"
                        :page-size="pager.pageSize"
                ></ah-pagination>
            </div>
        </div>
    </ah-card>
</template>
<style lang="stylus" scoped>
    .ah-form-item
        width 190px
        margin-right 0
        margin-bottom 0

        .ah-input
            width 100px

        .ah-select
            width 100px

        .ah-button
            margin-left 10px
            width 70px
    .box-card
        .box-card-header
            overflow hidden
        .box-card-title
            line-height 32px
        .box-card-actions
            float right
        .table-list-page
            text-align right
            padding-top 20px
            box-sizing border-box
</style>
