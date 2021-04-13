<script>
  import { onMount } from "svelte";
  import { Magic } from "magic-sdk";
  import { goto } from "$app/navigation";

  let isLoggingIn = false;
  let errorMsg = undefined;
  let isMounted = false;

  onMount(() => {
    isMounted = true;
  });

  const login = async (email) => {
    errorMsg &&= undefined;

    try {
      const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);
      const didToken = await magic.auth.loginWithMagicLink({ email });

      const res = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200) goto("/");
      else throw new Error(await res.text());
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      errorMsg = err.message;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (isLoggingIn) return;
    isLoggingIn = true;
    login(e.currentTarget.email.value).then(() => (isLoggingIn = false));
  };
</script>

<form on:submit={submit}>
  <h2>Log in</h2>

  <label for="email">Email<span aria-hidden={true}>*</span></label>
  <input type="email" name="email" required placeholder="hello@magic.link" />

  <button disabled={isLoggingIn} type="submit">Sign Up / Login</button>

  {#if errorMsg}
    <p class="error">{errorMsg}</p>
  {/if}
</form>

<style>
  form {
    padding: 3rem;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 25px;
  }
  label {
    display: block;
    font-weight: 600;
  }
  input {
    display: block;
    padding: 8px;
    width: 100%;
    margin: 0.3rem 0 1rem;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 0 0 3px transparent;
    transition: all 0.2s;
  }
  input:focus {
    outline: none;
    border-color: #6851ff;
    box-shadow: 0 0 0 3px #a796ff;
  }
  input:invalid {
    border-color: #d02f20;
    box-shadow: 0 0 0 3px #fba67f;
  }
  .error {
    color: brown;
    margin: 1rem 0 0;
  }
</style>
