<script lang="ts">
    import { onMount } from "svelte";
    import { Engine } from "../../engine";

    let canvas: HTMLCanvasElement;
    onMount(() => {
        Engine.init(canvas);
    });
</script>

<!-- 引擎场景 -->
<canvas class="h-full w-full flex-grow select-none" bind:this={canvas} />
