<script lang="ts">
  import { onMount } from "svelte";

  import { submissionId, closeWidget, endpoint, metadata } from "../../store";

  let email = "";

  let emailInput: HTMLInputElement | undefined;

  $: isValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  async function handleEmailConfirm() {
    const response = await fetch(endpoint + "/api/add-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submissionId: $submissionId,
        email: email,
      }),
    });
    if (response.status === 200) {
      // close widget
      setTimeout(closeWidget, 750);
    }
  }

  onMount(() => {
    if (emailInput) {
      emailInput.focus();
    } else {
      //  email is collected, thus close widget automatically
      setTimeout(closeWidget, 750);
    }
  });
</script>

<div class="flex flex-col space-y-2">
  <div class="self-center">
    <p class="font-bold text-base-content">✅ Success</p>
  </div>
  {#if $metadata?.email === undefined}
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
        on:click="{closeWidget}">Close</button
      >
      <button
        class="btn btn-primary md:btn-sm w-full flex-shrink"
        disabled="{isValidMail === false}"
        on:click="{handleEmailConfirm}">Confirm</button
      >
    </div>
  {/if}
</div>
