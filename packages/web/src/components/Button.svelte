<script lang="ts">
  export let type: "primary" | "secondary";
  export let disabled = false;
  export let expanded = false;

  $: color =
    type === "primary"
      ? disabled
        ? "text-white bg-blue-400"
        : "bg-blue-600 text-white hover:bg-blue-800"
      : "bg-gray-200 hover:bg-gray-400";

  $: otherAttributes = disabled ? "cursor-default" : "cursor-pointer";

  $: width = expanded ? "w-full" : "w-20";
</script>

<button
  disabled="{disabled}"
  class="rounded {width} {color} {otherAttributes} p-2"
  on:click
>
  <slot />
</button>
