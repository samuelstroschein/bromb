<script lang="ts">
  import {
    currentlySelectedCategory,
    metadata,
    widgetError,
    widgetConfig,
  } from "../../store";
  import CameraIcon from "@svicons/ionicons-solid/camera.svelte";
  import CloseIcon from "@svicons/ionicons-solid/close.svelte";
  import { dataURL } from "@gripeless/pico";
  import { onMount } from "svelte";
  import type { Metadata } from "../../types/Metadata";
  import { router } from "../../router";
  import CollectEmail from "../../components/CollectEmail.svelte";

  type Attachment = {
    name: string;
    dataUrl: string;
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

  // used for conditional logic
  const screenshotName = "bromb-widget-screenshot.png";

  let showCollectEmail = false;

  let attachments: Attachment[] = [];

  let message: string = "";

  let isSubmitting = false;

  $: screenshotExists = attachments.some(
    (attachment) => attachment.name === screenshotName
  );

  let textareaInput: HTMLTextAreaElement;

  $: isDisabled = message === "";

  async function takeScreenshot() {
    try {
      const screenshot = await dataURL(window, { ignore: ["#bromb-widget"] });
      // remove previous screenshot, if exists
      attachments = attachments.filter(
        (attachment) => attachment.name !== screenshotName
      );
      attachments = [
        ...attachments,
        {
          name: screenshotName,
          dataUrl: screenshot.value,
        },
      ];
    } catch (err) {
      console.error("Bromb: Taking a screenshot throwed an error.");
    }
  }

  function removeScreenshot() {
    attachments = attachments.filter(
      (attachment) => attachment.name !== screenshotName
    );
  }

  function previewScreenshot() {
    const screenshot = attachments.find(
      (attachment) => attachment.name === screenshotName
    );
    if (screenshot === undefined) {
      alert(
        "Hmm, couldn't find the screenshot. That's likely a bug in bromb and not from the website your are visiting right now."
      );
      return;
    }
    const w = window.open("about:blank");
    const image = new Image();
    image.src = screenshot.dataUrl;
    setTimeout(function () {
      w!.document.write(image.outerHTML);
    }, 0);
  }

  async function handleSubmission() {
    if ($currentlySelectedCategory === null || $widgetConfig === null) {
      $widgetError = "Error 293jsa";
      return;
    }
    isSubmitting = true;
    const body: RequestBody = {
      categoryId: $currentlySelectedCategory.id,
      organizationName: $widgetConfig.organizationName,
      projectName: $widgetConfig.projectName,
      body: message,
      metadata: $metadata!,
      attachments: attachments,
    };
    const response = await fetch($widgetConfig.submissionEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      router.goto("/form/success");
    } else {
      router.goto("/form/failure");
    }
    isSubmitting = false;
  }

  onMount(() => {
    textareaInput.focus();
  });
</script>

{#if isSubmitting}
  <sl-spinner></sl-spinner>
{:else if showCollectEmail === false}
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
            )?.dataUrl ?? ''}"
            class="w-full h-full p-1 sm:p-0.5 rounded-lg"
            alt="screenshot"
          />
        </button>
      {/if}
      <button
        class="btn sm:btn-sm flex-grow {screenshotExists
          ? ''
          : 'btn-secondary'}"
        on:click="{screenshotExists ? removeScreenshot : takeScreenshot}"
      >
        <row class="items-center">
          {#if screenshotExists === false}
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
      class="btn btn-primary sm:btn-sm btn-block flex-shrink"
      on:click="{handleSubmission}"
      disabled="{isDisabled}"
    >
      {"Send"}
    </button>
  </column>
{:else}
  <CollectEmail
    onEmailProvided="{(email) => {
      if ($metadata) {
        $metadata.email = email;
      }
      handleSubmission();
    }}"
    onNoEmailProvided="{handleSubmission}"
  />
{/if}
