<template>
	<main class="main">
		<form @submit.prevent="submitForm">
			<div class="input-wrapper">
				<input type="text" name="name" required placeholder="Имя пользователя" v-model="userName" />
				<button class="input-wrapper__button" type="submit">OK</button>
			</div>
		</form>
	</main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'MainPage',
	data() {
		return {
			userName: ''
		}
	},
	methods: {
		...mapActions({
			login: 'signatures/login'
		}),
		submitForm() {
			this.login(this.userName);
		}
	}
}
</script>