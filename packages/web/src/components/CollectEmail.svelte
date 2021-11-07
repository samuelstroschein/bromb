<script lang="ts">
  import { onMount } from "svelte";
  import CountdownTimer from "./CountdownTimer.svelte";

  // using function props instead of event dispatchers for better
  // type safety
  export let onEmailProvided: (email: string) => unknown;
  export let onNoEmailProvided: () => unknown;

  export let isSubmitting = false;

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

<column class="space-y-2">
  <p class="text-base-content">Then enter your email below.</p>
  <input
    bind:this="{emailInput}"
    bind:value="{email}"
    type="text"
    placeholder="your email"
    class="input input-bordered md:input-sm text-base-content"
  />
  <br />

  <row class="items-center justify-center space-x-2">
    <button
      class="btn md:btn-sm btn-secondary"
      disabled="{isValidMail}"
      on:click="{onNoEmailProvided}">No</button
    >
    {#if isSubmitting}
      <button
        class="btn btn-primary btn-ghost md:btn-sm w-full flex-shrink loading"
        disabled="{false}">submitting...</button
      >
    {:else if email === ""}
      <CountdownTimer seconds="{8}" onFinished="{onNoEmailProvided}" />
    {:else}
      <button
        class="btn btn-primary md:btn-sm w-full flex-shrink"
        disabled="{isValidMail === false}"
        on:click="{() => {
          onEmailProvided(email);
        }}">Confirm</button
      >
    {/if}
  </row>
</column>
