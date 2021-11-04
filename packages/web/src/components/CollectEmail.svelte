<script lang="ts">
  import { onMount } from "svelte";

  // using function props instead of event dispatchers for better
  // type safety
  export let onEmailProvided: (email: string) => unknown;
  export let onNoEmailProvided: () => unknown;

  let email = "";

  let emailInput: HTMLInputElement | undefined;

  $: isValidMail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  onMount(() => {
    if (emailInput) {
      emailInput.focus();
    }
  });
</script>

<div class="flex flex-col space-y-2">
  <p class="text-base-content">Leave your email so that we can reply:</p>
  <input
    bind:this="{emailInput}"
    bind:value="{email}"
    type="text"
    placeholder="your email"
    class="input input-bordered md:input-sm text-base-content"
  />
  <div class="flex flex-row items-center justify-center space-x-2">
    <button
      class="btn md:btn-sm btn-secondary"
      disabled="{isValidMail}"
      on:click="{() => {
        onNoEmailProvided();
      }}">Close</button
    >
    <button
      class="btn btn-primary md:btn-sm w-full flex-shrink"
      disabled="{isValidMail === false}"
      on:click="{() => {
        onEmailProvided(email);
      }}">Confirm</button
    >
  </div>
</div>
