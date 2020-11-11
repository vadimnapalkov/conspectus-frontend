<script>
  import { onDestroy } from 'svelte';
  import { user } from 'stores/user';
  import { logoutUser } from 'api/user';
  import * as app from '@sapper/app';

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