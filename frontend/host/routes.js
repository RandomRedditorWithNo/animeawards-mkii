/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Layouts, pages, and routing
import PublicLayout from './PublicLayout';
import HostLayout from './HostLayout';

import Profile from './pages/Profile';
import Login from './pages/HostLogin';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Results from './pages/Results';
import AllCategories from './pages/AllCategories';
import AdminPanel from './pages/AdminPanel';

import SingleCategory from './components/SingleCategory';
import CategoryEntries from './components/CategoryEntries';
import CategoryNominations from './components/CategoryNominations';
import CategoryJurors from './components/CategoryJurors';
import CategoryHMs from './components/CategoryHMs';
import CategoryInfo from './components/CategoryInfo';
import CategoryTools from './components/CategoryTools';

import NotFound from '../common/NotFound';

export default new VueRouter({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		document.body.scrollTop = 0; // For Safari
    	document.documentElement.scrollTop = 0;
	},
	routes: [
		// login for hosts
		{
			path: '/login',
			component: PublicLayout,
			children: [
				{path: '', component: Login},
				{path: '/profile', component: Profile},
			],
		},

		// Layout for the host dashboard
		{
			path: '/host',
			component: HostLayout,
			meta: {
				title: 'Host Dashboard',
			},
			children: [
				{
					path: '',
					redirect: 'categories',
				},
				{
					path: 'categories',
					component: Categories,
					meta: {
						title: 'Categories',
					},
					children: [
						{
							name: 'allCategories',
							path: '',
							component: AllCategories,
						},
						{
							path: ':categoryId',
							component: SingleCategory,
							props: true,
							meta: {
								title ({$store, $route}) {
									if (!$store.state.categories) return '...';
									// eslint-disable-next-line eqeqeq
									const category = $store.state.categories.find(cat => `${cat.id}` == $route.params.categoryId);
									return category ? category.name : '(Unknown category)';
								},
							},
							children: [
								{
									name: 'category',
									path: '',
									redirect: 'info',
								},
								{
									name: 'categoryInfo',
									path: 'info',
									component: CategoryInfo,
									meta: {
										title: 'Information',
									},
								},
								{
									name: 'categoryEntries',
									path: 'entries',
									component: CategoryEntries,
									meta: {
										title: 'Entries',
									},
								},
								{
									name: 'categoryNominations',
									path: 'nominations',
									component: CategoryNominations,
									meta: {
										title: 'Nominations',
									},
								},
								{
									name: 'categoryJurors',
									path: 'jurors',
									component: CategoryJurors,
									meta: {
										title: 'Jurors',
									},
								},
								{
									name: 'categoryHMs',
									path: 'hms',
									component: CategoryHMs,
									meta: {
										title: 'Honorable Mentions',
									},
								},
								{
									name: 'categoryTools',
									path: 'tools',
									component: CategoryTools,
									meta: {
										title: 'Tools',
									},
								},
							],
						},
					],
				},
				{
					path: 'users',
					component: Users,
					meta: {
						title: 'Users',
					},
				},
				{
					path: 'admin',
					component: AdminPanel,
					meta: {
						title: 'Admin Panel',
					},
				},
				{
					path: 'results',
					component: Results,
					meta: {
						title: 'Results Summary',
					},
				},
			],
		},

		// 404 route - keep last
		{path: '*', component: NotFound},
	],
});
