<template>
<div>
  <div class="header">
    <router-link to="/list"  class="header-title">电商项目</router-link>

    <div class="header-menu">

      <router-link  to='/list'  class="header-menu-cart">   
        购物车
         <span >11</span>
      </router-link>

    </div>

   </div>
  <router-view></router-view>
</div>
</template>
<script>
  
  export default 
{
    
    computed:
 {
        
    cartList () 
{
                return this.$store.state.cartList;
            }
  
      }
  
  }

</script>