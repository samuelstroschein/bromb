<script lang="ts">
  import {
    currentlySelectedCategory,
    endpoint,
    submissionId,
    metadata,
    widgetError,
    widgetConfig,
  } from "../../store";
  import html2canvas from "html2canvas";
  import CameraIcon from "@svicons/ionicons-solid/camera.svelte";
  import CloseIcon from "@svicons/ionicons-solid/close.svelte";

  import { onMount } from "svelte";
  import type { Metadata } from "../../types/metadata";
  import { router } from "../../router";

  type RequestBody = {
    organizationName: string;
    projectName: string;
    categoryId: string;
    body: string;
    metadata: Metadata;
  };

  type ResponseBody = {
    submissionId: string;
  };

  let message: string = "";

  let buttonIsLoading = false;

  let textareaInput: HTMLTextAreaElement;

  $: isDisabled = message === "";

  async function handleScreenshot() {
    if ($metadata?.["screenshot"]) {
      $metadata["screenshot"] = undefined;
    } else {
      const canvas = await html2canvas(document.querySelector("body")!);
      if ($metadata) {
        $metadata["screenshot"] = canvas.toDataURL();
      }
    }
  }

  function previewScreenshot() {
    let w = window.open("about:blank");
    let image = new Image();
    image.src = $metadata?.["screenshot"]!;
    setTimeout(function () {
      w!.document.write(image.outerHTML);
    }, 0);
  }

  async function handleSubmission() {
    if ($currentlySelectedCategory === null || $widgetConfig === null) {
      $widgetError = "Something went wrong. Please report the bug to bromb.";
      return;
    }
    buttonIsLoading = true;
    const body: RequestBody = {
      projectName: $widgetConfig.projectName,
      organizationName: $widgetConfig.organizationName,
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
    $submissionId = ((await response.json()) as ResponseBody).submissionId;
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
<column class="space-y-1">
  <row class="space-x-1">
    {#if $metadata?.["screenshot"]}
      <button class="btn btn-square sm:btn-sm" on:click="{handleScreenshot}">
        <img
          src="{$metadata['screenshot']}"
          class="w-full h-full p-1 sm:p-0.5 rounded-lg"
          alt="screenshot"
          on:click="{previewScreenshot}"
        />
      </button>
    {/if}
    <button
      class="btn sm:btn-sm flex-grow {$metadata?.['screenshot']
        ? ''
        : 'btn-secondary'}"
      on:click="{handleScreenshot}"
    >
      <row class="items-center">
        {#if $metadata?.["screenshot"] === undefined}
          <CameraIcon class="h-8 sm:h-5 pr-2 pb-1 sm:pb-0.5" />
          Take a screenshot
        {:else}
          <CloseIcon class="h-8 sm:h-5 pr-2 pb-1 sm:pb-0.5" />
          Remove screenshot
        {/if}
      </row>
    </button>
  </row>
  <button
    class="btn btn-primary sm:btn-sm btn-block flex-shrink {buttonIsLoading
      ? 'loading'
      : ''}"
    on:click="{handleSubmission}"
    disabled="{isDisabled}"
  >
    {"Send"}
  </button>
</column>
