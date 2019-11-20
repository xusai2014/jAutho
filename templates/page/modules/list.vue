<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
        data() {
            return {};
        },
        computed: {
            ...mapState('searchList', {
                pager: 'pager',
                searchDate: 'date',
                joinStatus: 'joinStatus',
                dimensionList: 'dimensionList'
            }),
            ...mapGetters('searchList', {
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
            ...mapActions('searchList', {
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
                <ah-select
                        :value="joinStatus"
                        @change="onDimensionChange"
                        placeholder="请选择"
                >
                    <ah-option
                            v-for="item in dimensionList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></ah-option>
                </ah-select>
            </span>
            <div class="box-card-actions">
                <ah-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期"
                        @change="onDateChange"
                ></ah-date-picker>
            </div>
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
