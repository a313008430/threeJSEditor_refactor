<script lang="ts">
    import { onMount } from "svelte";
    import { Engine } from "../../engine";
    let canvas: HTMLCanvasElement;
    onMount(() => {
        new Engine().init(canvas);
    });
</script>

<!-- 引擎场景 -->
<canvas class="h-full w-full" bind:this={canvas} />
