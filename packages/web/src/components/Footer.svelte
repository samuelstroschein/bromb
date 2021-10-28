<script lang="ts">
  import BrombLogoLightMode from "../static/bromb-logo-light-mode.svg";
  import BrombLogoDarkMode from "../static/bromb-logo-dark-mode.svg";
  import { theme } from "../store";
</script>

<!-- TODO dark mode logo -->

<div class="flex justify-center pt-2">
  <p class="text-xs">
    <a class="text-base-content" href="https://bromb.co" target="_blank">
      Powered by <img
        class="h-3 -mt-0.5 inline"
        src="{$theme === 'dark' ? BrombLogoDarkMode : BrombLogoLightMode}"
        alt="Bromb"
      />
    </a>
  </p>
</div>
