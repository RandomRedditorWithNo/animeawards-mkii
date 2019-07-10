// Import style stuff
import './styles/main.scss';

// Import libraries
import Vue from 'vue';
import router from './routes';

// What will be the Vue instance
let vm; // eslint-disable-line prefer-const

// Fetch core user data and store it on the Vue instance when we get it
// NOTE: This is done as its own thing rather than in the Vue instance's
//       `created` hook because having the promise lets us use `await` to ensure
//       we have user data before navigating (which is important for when the
//       page is initially loading)
const loadPromise = fetch('/api/me').then(async redditResponse => {
	if (!redditResponse.ok) throw redditResponse;
	vm.me = await redditResponse.json();
}).catch(console.error).finally(() => {
	vm.loaded = true;
});

// Handle authentication on page navigation
router.beforeEach(async (to, from, next) => {
	// We must have the user info loaded before we can route
	await loadPromise;
	if (to.path.startsWith('/host')) {
		if (!vm.me) {
			// The user is not logged in, so have them log in
			return next('/login');
		}
		if (vm.me.level >= 2) {
			// The user is a host, so send them to the page
			return next();
		}
		// The user is not a host, so send them home
		return next('/');
	}
	next();
});

// Create the Vue instance
// NOTE: Not mounted yet because we have to register routing guards for
//       authentication before mounting the element. If we don't wait to mount,
//       the initial page load won't have the navigation guard registered in
//       time.
import App from './App';
vm = new Vue({
	// el: '#app',
	data: {
		me: null,
		loaded: false,
	},
	computed: {
		// Auth helpers
		isHost () {
			return this.me && this.me.level >= 2;
		},
		isMod () {
			return this.me && this.me.level >= 3;
		},
		isAdmin () {
			return this.me && this.me.level >= 4;
		},
	},
	router,
	render: create => create(App),
});

// Now that we have authentication set up, mount the Vue instance to the page
vm.$mount('#app');
