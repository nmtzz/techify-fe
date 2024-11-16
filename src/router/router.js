import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/admin/AdminView.vue'),
            children: [
                {
                    path: '/admin/home',
                    name: 'HomeAdmin',
                    component: () => import('@/views/admin/HomeAdmin.vue'),
                },
                {
                    path: '/admin/category',
                    name: 'CategoryAdmin',
                    component: () => import('@/views/admin/CategoryAdmin.vue'),
                },
                {
                    path: '/admin/product',
                    name: 'ProductAdmin',
                    component: () => import('@/views/admin/ProductAdmin.vue'),
                },
                {
                    path: '/admin/product/add',
                    name: 'AddProduct',
                    component: () => import('@/components/admin/product_admin/AddProduct.vue'),
                }
            ]
        }

    ]
})

export default router
