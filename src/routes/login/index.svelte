<script>
  import { signIn } from 'Api/user';
  import { user } from 'Stores/user';
  import * as app from '@sapper/app';

  import matrixBackground from './matrix_background.jpg';
  import TextField from '../../components/TextField';
  import Spinner from '../../components/Spinner'

  let login = ''
  let password = ''
  let errorMessage = ''
  let isLoading = false

  const handleLoginChange = e => {
    login = e.target.value
  }

  const handlePasswordChange = e => {
    password = e.target.value
  }

  const handleSignIn = async () => {
    isLoading = true
    const { user: currentUser, error } = await signIn({ login, password }).finally(() => {
      isLoading = false
    })

    errorMessage = error

    if (currentUser) {
      user.set(currentUser)
      app.goto('/')
    }
  }

</script>

<style src="./style.scss"></style>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="login" style="background-image: url('{matrixBackground}')">
  <div class="login__signin-content position-relative p-4">
    <h1 class="login__signin-content__title">Sign In</h1>
      <div class="login__signin-form w-100">
        {#if errorMessage}
          <div class="alert alert-danger my-2" role="alert">
            {errorMessage}
          </div>
        {/if}
        <TextField
          className="mt-3"
          name="user[login]"
          value={login}
          type="text"
          label="Your login"
          placeholder="Enter your login"
          onChange={handleLoginChange}
        />
        <TextField
          className="mt-3"
          name="user[password]"
          value={password}
          label="Your password"
          type="password"
          placeholder="Enter your password"
          onChange={handlePasswordChange}
        />
        <button type="button" class="btn btn-primary w-100 mt-4" on:click="{handleSignIn}" disabled={isLoading}>
          {#if isLoading}
            <Spinner />
          {:else}
            Sign In
          {/if}
        </button>
      </div>
  </div>
</div>
