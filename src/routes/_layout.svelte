<script>
  import { onDestroy , onMount } from 'svelte';
  import * as sapper from '@sapper/app';
  import { user } from 'Stores/user';
  import { authUser } from 'Api/user';

	export let segment;

  let currentUser;
  let isLoading = segment !== 'login';
  const unsubscribe = user.subscribe(value => {
		currentUser = value;
  });

  async function checkUser() {
    if (!currentUser && segment !== 'login') {
      const { user: auth } = await authUser().finally(()=> {
        isLoading = false
      });
      user.set(auth);
      if(!auth) sapper.goto('/login')
    }
	};

  onMount(checkUser);

  onDestroy(unsubscribe)

</script>


{#if isLoading}
  <div class="d-flex justify-content-center h-100 align-items-center">
    <div class="spinner-border text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{:else if currentUser || segment ==='login'}
  <slot></slot>
{:else}
  <div class="d-flex justify-content-center h-100 align-items-center">
    Please <a href="login" class="mx-1">login</a>first.
  </div>
{/if}
