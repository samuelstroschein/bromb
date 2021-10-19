<script lang="ts">
  import { onMount } from "svelte";

  import { submissionId, resetWidget, endpoint, metadata } from "../../store";

  let email = "";

  let emailInput: HTMLInputElement;

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
      resetWidget();
    }
  }

  onMount(() => {
    emailInput.focus();
  });
</script>

<div class="flex flex-col space-y-2">
  <div>
    <p class="font-bold">✅ Success</p>
  </div>
  {#if $metadata?.email === undefined}
    <p>Leave your email so that we can reply:</p>
    <input
      bind:this="{emailInput}"
      bind:value="{email}"
      type="text"
      placeholder="your email"
      class="input input-bordered md:input-sm"
    />
    <div class="flex flex-row items-center justify-center space-x-2">
      <button
        class="btn md:btn-sm btn-secondary"
        disabled="{isValidMail}"
        on:click="{resetWidget}">Close</button
      >
      <button
        class="btn btn-primary md:btn-sm w-full flex-shrink"
        disabled="{isValidMail === false}"
        on:click="{handleEmailConfirm}">Confirm</button
      >
    </div>
  {/if}
</div>
