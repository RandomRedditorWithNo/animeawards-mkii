<template>
	<section class="hero has-background-dark">
		<div class="hero-body">
			<div class="container">
				<div class="columns is-centered mt-10">
					<div class="column is-4">
						<img class="BFimage" :src="logo" />
					</div>
				</div>
				<div class="columns is-centered is-vcentered ">
					<div class="column is-4-tablet is-4-desktop is-3-widescreen">
						<img loading="lazy" :src="snooImage"/>
					</div>
					<div class="column is-centered has-text-white box has-background-dperiwinkle is-size-5 pl-40 pr-40 pt-40 pb-100">
						<nav class="homeIntroThingy level mt-40">
							<div class="level-item has-text-centered">
								<router-link to="/results/genre" >
								<div>
									<p class="heading has-text-gold">Genre</p>
									<p class="title">
										<fa-icon icon="book" size="3x" class="has-text-gold mb-20 mt-20" />
									</p>
								</div>
								</router-link>
							</div>
							<div class="level-item has-text-centered">
								<router-link to="/results/character" >
								<div>
									<p class="heading has-text-gold">Character</p>
									<p class="title">
										<fa-icon icon="user-friends" size="3x" class="has-text-gold mb-20 mt-20" />
									</p>
								</div>
								</router-link>
							</div>
							<div class="level-item has-text-centered">
								<router-link to="/results/production" >
								<div>
									<p class="heading has-text-gold">Production</p>
									<p class="title">
										<fa-icon icon="pencil-ruler" size="3x" class="has-text-gold mb-20 mt-20" />
									</p>
								</div>
								</router-link>
							</div>
							<div class="level-item has-text-centered">
								<router-link to="/results/main" >
								<div>
									<p class="heading has-text-gold">Main</p>
									<p class="title">
										<fa-icon icon="crown" size="3x" class="has-text-gold mb-20 mt-20" />
									</p>
								</div>
								</router-link>
							</div>
						</nav>
						<p>
							Welcome, one and all, to the 2019 r/Anime Awards results!
							Over the past few months we've laid the groundwork for our annual selection of the best shows of the year.
							We've recruited our jurors, cruelly subjected them to innumerable episodes of anime, and simultaneously opened it up to you, the community of /r/anime.
							Every year we try to improve these awards to better showcase the shows and creators we love.
							Now presenting an even bigger, better, and of course saltier, r/anime awards.
							You can watch <a class="has-text-periwinkle" href="https://youtu.be/VYZ2fezPKUA" target="_blank">the full livestream here</a>.
							The Winners Reel can be watched below.
						</p>
						<figure class="image is-16by9">
							<iframe class="has-ratio" width="950" height="650" src="https://www.youtube.com/embed/xPepKZYsgig" frameborder="0" allow="accelerometer; autoplay;gyroscope; picture-in-picture" allowfullscreen></iframe>
						</figure>
						<br>
						<p>
							This site contains all of the info about the winners and rankings for the 30 award categories featured this year.
							These are separated into over-arching category groups: genre awards, character awards, production awards, and main awards.
							On each of these pages you will find the winner and runners-up for each category, as well as a toggle with which you can compare the results of the community vote to the rankings awarded by the category's jury.
							For more detailed result statistics and other info, click the name of the award.
						</p>
						<br>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import logo from '../../../img/awards2019.png';
import snoo from '../../../img/bannerSnooJump.png';

export default {
	data () {
		return {
			deleting: false,
			snooImage: snoo,
			logo,
		};
	},
	computed: {
		...mapState([
			'me',
		]),
		...mapGetters([
			'accountOldEnough',
		]),
		info () {
			return `${JSON.stringify(this.me, null, 4)}`;
		},
	},
	methods: {
		async deleteVotes () {
			this.deleting = true;
			await fetch('/api/votes/all/delete', {
				method: 'GET',
			});
			this.deleting = false;
		},
	},
};
</script>
