import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = []
// (?!components)\.vue$
importPages(require.context('../view', true, /.vue$/, 'lazy'))
function importPages(r) {
    r.keys().forEach(key => {
        routes.push({ path: (key.split('.'))[1].split('/index')[0], component: () => r(key) })
    })
    
}

const router = new Router({
    // mode: 'history',
    routes: [
        ...routes,
        {
            path: '/',
            component: resolve => require(['../view/home/index.vue'], resolve) // 首页
        },
        {
            path: '/electPower',
            redirect: '/electricityPower/mothIndex',
            component: resolve => require(['../view/electricityPower/index.vue'], resolve),// 首页
            children: [
                // {
                //     path: '/',
                //     component: resolve => require(['../view/electricityPower/electricityType/dayIndex.vue'], resolve),// 首页
                // },
                {
                    path: '/electricityPower/dayIndex',
                    name:'day',
                    component: resolve => require(['../view/electricityPower/electricityType/dayIndex.vue'], resolve),// 首页
                },
                {
                    path: '/electricityPower/mothIndex',
                    name:'moth',
                    component: resolve => require(['../view/electricityPower/electricityType/mothIndex.vue'], resolve),// 首页
                }
            ]
        },
        {
            path: '*',
            component: resolve => require(['../view/404/404.vue'], resolve) // 404
        },
    ]
})

// console.log(router,'routerrouterrouter')
export default router
