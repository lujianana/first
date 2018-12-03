import Vue from 'vue';

import VueRouter from 'vue-router';

import Routers from './router';

import Vuex from 'vuex';

import App from './app.vue';

import './style.css';


import product_data from './product';


Vue.use(VueRouter);

Vue.use(Vuex);


// ·������

const RouterConfig = 
{
  
  // ʹ�� HTML5 �� History ·��ģʽ
 
   mode: 'history',
   
 routes: Routers

};

const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) =>
 {
   
 window.document.title = to.meta.title;
  
  next();

}
);


router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});



// ��������

function getFilterArray (array) 
{
   
let res=new Set(array);

 return [...res];

}




const store = new Vuex.Store(
{
  
  state: 
{
      
  productList: [],
    
    cartList: []
   
 },
   
 getters:
 {
  
      brands: state => 
{
           
 const brands = state.productList.map(item=>item.brand)
 ; 
          return getFilterArray(brands);
    
    },
      
  colors: state => 
{
   
         const colors = state.productList.map(item => item.color);
     
       return getFilterArray(colors);
     
   }
   
 },
   
 mutations:
 {
       
 // �����Ʒ�б�
      
  setProductList (state, data) 
{

            state.productList = data;
      
  },
        
// ��ӵ����ﳵ
   
     addCart (state, id) 
{
        
    // ���жϹ��ﳵ�Ƿ����У�����У�����+1
      
      const isAdded = state.cartList.find(item => item.id === id);
         
   if (isAdded)
{
             
   isAdded.count ++;
    
        }
 else
 {
       
         state.cartList.push(
{
               
     id: id,
    
              
  count: 1
       
         })
          
  }
      
  },
     
   // �޸���Ʒ����
   
     editCartCount (state, payload)
 {
       
     const product = state.cartList.find(item => item.id === payload.id);
   
         product.count += payload.count;
     
   },
       
 // ɾ����Ʒ
     
   deleteCart (state, id) 
{
          
  const index = state.cartList.findIndex(item => item.id === id);
      
      state.cartList.splice(index, 1);
  
      },
      
  // ��չ��ﳵ
    
    emptyCart (state) 
{
          
  state.cartList = [];
     
   }
 
   },
   
 actions: {
  
      // ������Ʒ�б�
     
   getProductList (context) 
{
       
     // ��ʵ����ͨ�� ajax ��ȡ���������첽ģ��
   
         setTimeout(() => 
{
        
        context.commit('setProductList', product_data);
   
         }, 500);
   
     },
   
     // ����
       
 buy (context) {
         
   // ��ʵ����Ӧͨ�� ajax �ύ�������������չ����б�
       
    return new Promise(resolve=> {
  
              setTimeout(() => {
    
                context.commit('emptyCart');
          
          resolve();
          
      }, 500)
         
   });
   
     }
  
  }
});


new Vue
(
{
  
  el: '#app',
   
 router: router,
 
   store: store,
 
   render: h =>
 {
        return h(App)
    }
});