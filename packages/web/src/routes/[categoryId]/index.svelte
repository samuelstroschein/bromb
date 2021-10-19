<script lang="ts">
  import {
    currentlySelectedCategory,
    endpoint,
    projectId,
    submissionId,
    metadata,
    widgetError,
  } from "../../store";
  import html2canvas from "html2canvas";
  import CameraIcon from "@svicons/ionicons-solid/camera.svelte";
  import CloseIcon from "@svicons/ionicons-outline/close.svelte";

  // import { router } from "tinro";
  import { onMount } from "svelte";

  type RequestBody = {
    projectId: string;
    categoryId: string;
    body: string;
    metadata: Record<string, unknown>;
  };

  type ResponseBody = {
    submissionId: number;
  };

  let message: string = "";

  let screenshotBase64: string | null = null;

  let buttonIsLoading = false;

  let textareaInput: HTMLTextAreaElement;

  $: isDisabled = message === "";

  async function handleScreenshot() {
    const canvas = await html2canvas(document.querySelector("body")!);
    screenshotBase64 = canvas.toDataURL();
  }

  function previewScreenshot() {
    let w = window.open("about:blank");
    let image = new Image();
    image.src = screenshotBase64!;
    setTimeout(function () {
      w!.document.write(image.outerHTML);
    }, 0);
  }

  async function handleSubmission() {
    if ($currentlySelectedCategory === null) {
      $widgetError = "Something went wrong. Please report the bug to bromb.";
      return;
    }
    buttonIsLoading = true;
    const body: RequestBody = {
      projectId: $projectId!,
      body: message,
      categoryId: $currentlySelectedCategory.id,
      metadata: $metadata!,
    };
    const response = await fetch(endpoint + "/api/submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    $submissionId = ((await response.json()) as Record<string, string>)[
      "submissionId"
    ];
    if (response.status === 200) {
      router.goto("/form/success");
    } else {
      router.goto("/form/failure");
    }
    buttonIsLoading = false;
  }

  onMount(() => {
    textareaInput.focus();
  });
</script>

<div class="form-control my-2">
  <p class="font-medium ">
    {$currentlySelectedCategory?.description}
  </p>
  <div class="h-2"></div>
  <textarea
    bind:this="{textareaInput}"
    class="textarea bg-base-200 leading-tight h-24"
    bind:value="{message}"></textarea>
</div>
<div class="flex flex-row justify-between space-x-2">
  <div
    class="{screenshotBase64 === null ? 'tooltip' : 'indicator'}"
    data-tip="{screenshotBase64 === null ? 'Take screenshot' : undefined}"
  >
    {#if screenshotBase64 !== null}
      <div
        class="indicator-item badge bg-warning border-warning cursor-pointer"
        on:click="{() => (screenshotBase64 = null)}"
      >
        <CloseIcon class="h-full" />
      </div>
    {/if}
    <button class="btn btn-square md:btn-sm" on:click="{handleScreenshot}">
      {#if screenshotBase64 === null}
        <CameraIcon class="p-2 md:p-1" />
      {:else}
        <img
          src="{screenshotBase64}"
          class="w-full h-full p-1 rounded-lg"
          alt="screenshot"
          on:click="{previewScreenshot}"
        />
      {/if}
    </button>
  </div>
  <button
    class="btn btn-primary md:btn-sm btn-block flex-shrink {buttonIsLoading
      ? 'loading'
      : ''}"
    on:click="{handleSubmission}"
    disabled="{isDisabled}"
  >
    {"Send"}
  </button>
</div>
