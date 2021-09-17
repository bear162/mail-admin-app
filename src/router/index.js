import Vue from 'vue';
import VueRouter from 'vue-router';
import loading from '@/views/layout/loading.vue';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/login.vue';
import register from '../views/layout/register.vue';
import store from '../store';
import index from '../views/page/index.vue';
import list from '../views/page/list.vue';
import add from '../views/page/add.vue';

Vue.use(VueRouter);

const admin = {
  path: '/product',
  name: 'product',
  component: Home,
  meta: {
    title: '商品',
    show: false,
    isenter: true,
    icon: 'inbox',
  },
  children: [{
    path: 'list',
    name: 'list',
    component: list,
    meta: {
      title: '商品列表',
      isenter: true,
      show: false,
    },
  }, {
    path: 'add',
    name: 'add',
    component: add,
    meta: {
      isenter: true,
      title: '添加列表',
      show: false,
    },
  },
  {
    path: 'idet/:id',
    name: 'idet',
    component: add,
    meta: {
      show: true,
      isenter: true,
      title: '编辑列表',
    },
  },
  ],
};
const custromer = {
  path: '/product',
  name: 'product',
  component: Home,
  meta: {
    isenter: true,
    title: '商品',
    show: true,
    icon: 'inbox',
  },
  children: [{
    path: 'list',
    name: 'list',
    component: list,
    meta: {
      isenter: true,
      title: '商品列表',
      show: false,
    },
  }, {
    path: 'add',
    name: 'add',
    component: add,
    meta: {
      isenter: true,
      title: '添加列表',
      show: true,
    },
  },
  {
    path: 'idet/:id',
    name: 'idet',
    component: add,
    meta: {
      isenter: true,
      title: '编辑列表',
      show: true,
    },
  },
  ],
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      show: false,
      isenter: true,
      icon: 'home',
    },
    children: [{
      path: 'index',
      name: 'Index',
      component: index,
      meta: {
        isenter: true,
        title: '统计',
        show: false,
      },
    }],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      show: true,
    },

  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {
      title: '注册',
      show: true,
    },
  },
  {
    path: '/loading',
    name: 'loading',
    component: loading,
    meta: {
      title: '登录中',
      show: true,
    },
  },

];

const router = new VueRouter({
  routes,
});
// router.afterEach((to, from) => {
//   if (store.state.loginuser.user.role === 'admin') {
//   console.log('hello');
//   console.log(custromer);
//   console.log(admin);
//   console.log(to, from);
//   } else {
//     console.log('nonm');
//   }
// });
let ismenu = false;
router.beforeEach((to, from, next) => {
  console.log(to.meta);
  if (to.meta.isenter) {
    const { status } = store.getters;
    if (status === 'loging') {
      console.log('正在登录中');
      next('/loading');
    } else if (status === 'login') {
      if (store.state.loginuser.user.role === 'admin') {
        if (ismenu === false) {
          store.dispatch('addrouters', routes.concat(admin)).then((a) => {
            router.addRoute(admin);
            console.log(a);
            next('/index');
          });
          ismenu = true;
        }
        console.log('您是管理员');
      } else {
        if (ismenu === false) {
          store.dispatch('addrouters', routes.concat(admin)).then((a) => {
            router.addRoute('product', admin);
            console.log(a);
            console.log('完成添加');
          });

          ismenu = true;
        }
        next();
        console.log(custromer);
        console.log('您是管理员');
      }
      console.log(router);
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
