<script>
  import { onDestroy } from 'svelte';
  import * as app from '@sapper/app';
  import { user } from 'Stores/user';
  import { logoutUser } from 'Api/user';

  let currentUser;

  const unsubscribe = user.subscribe(value => {
		currentUser = value;
  });

  const handleCloseClick = async() => {
    await logoutUser()
    user.set(null)
    app.goto('/login')
  }

  onDestroy(unsubscribe)
</script>

<style src="./style.scss"></style>

<div class="UserPanel d-flex align-items-center">
  Hi, {currentUser.login} <i class="fas fa-times ml-3 cursor-pointer" on:click="{handleCloseClick}"></i>
</div>