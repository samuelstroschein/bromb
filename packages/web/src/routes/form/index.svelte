<script lang="ts">
  import {
    currentlySelectedCategory,
    endpoint,
    submissionId,
    metadata,
    widgetError,
    widgetConfig,
  } from "../../store";
  import CameraIcon from "@svicons/ionicons-solid/camera.svelte";
  import CloseIcon from "@svicons/ionicons-solid/close.svelte";
  import { dataURL } from "@gripeless/pico";
  import { onMount } from "svelte";
  import type { Metadata } from "../../types/metadata";
  import { router } from "../../router";

  // used for conditional logic
  const screenshotName = "bromb-widget-screenshot.png";

  type Attachment = {
    name: string;
    base64: string;
  };

  // not using definitions to be copy & pastable with widget
  type RequestBody = {
    organizationName: string;
    projectName: string;
    categoryId: string;
    body: string;
    attachments: Attachment[];
    metadata: Metadata;
  };

  type ResponseBody = {
    submissionId: string;
  };

  let attachments: Attachment[] = [];

  let message: string = "";

  let buttonIsLoading = false;

  $: screenshotExists = attachments.some(
    (attachment) => attachment.name === screenshotName
  );

  let textareaInput: HTMLTextAreaElement;

  $: isDisabled = message === "";

  async function handleScreenshot() {
    try {
      const screenshot = await dataURL(window, { ignore: ["#bromb-widget"] });
      // remove previous screenshot, if exists
      attachments = attachments.filter(
        (attachment) => attachment.name !== screenshotName
      );
      attachments.push({
        name: screenshotName,
        base64: screenshot.value,
      });
    } catch (err) {
      console.error("Bromb: Taking a screenshot throwed an error.");
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
      attachments: attachments,
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
  <p class="font-medium text-base-content">
    {$currentlySelectedCategory?.description}
  </p>
  <br />
  <textarea
    placeholder="Please be detailed in your message."
    bind:this="{textareaInput}"
    class="textarea bg-base-300 text-base-content leading-tight h-24"
    bind:value="{message}"></textarea>
</div>
<column class="space-y-1">
  <row class="space-x-1">
    {#if screenshotExists}
      <button class="btn btn-square sm:btn-sm" on:click="{previewScreenshot}">
        <img
          src="{attachments.find(
            (attachment) => attachment.name === screenshotName
          )?.base64 ?? ''}"
          class="w-full h-full p-1 sm:p-0.5 rounded-lg"
          alt="screenshot"
        />
      </button>
    {/if}
    <button
      class="btn sm:btn-sm flex-grow {screenshotExists ? '' : 'btn-secondary'}"
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
