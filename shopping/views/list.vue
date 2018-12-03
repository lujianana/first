<template>
    <div v-show="list.length">
      
         <div class="list-control">
            <div class="list-control-filter">
                <span>品牌：</span>
                <span
                    class="list-control-filter-item"
                    :class="{on: item === filterBrand}"
                    v-for="item in brands"
                  >{{ item }}</span>
            </div>
           
          </div>







        <Product v-for="item in list" :info="item" :key="item.id"></Product>
         </div>
</template>
<script>
    import Product from '../components/product.vue';
    export default {
        components: { Product },
        computed: {
            list () {
                return this.$store.state.productList;
            },
             brands()
                     { return this.$store.getters.brands;  }
                   

        },
        data () {
            return {
                filterBrand: '',
                filterColor: '',
                order: ''
            }
        },
        methods: {
            
        },
        mounted () {
            this.$store.dispatch('getProductList');
        }
    }
</script>
<style scoped>
    .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
</style>