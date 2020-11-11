<script>
  import matrixBackground from 'images/matrix_background.jpg';
  import { signIn } from 'api/user';
  import { user } from 'stores/user';
  import * as app from '@sapper/app';

  import TextField from '../../components/TextField';

  let login = ''
  let password = ''
  let errorMessage = ''

  const handleLoginChange = e => {
    login = e.target.value
  }

  const handlePasswordChange = e => {
    password = e.target.value
  }

  const handleSignIn = async () => {
    const { user: currentUser, error } = await signIn({ login, password })

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
        <button type="button" class="btn btn-primary w-100 mt-4" on:click="{handleSignIn}">
          Sign In
        </button>
      </div>
  </div>
</div>
