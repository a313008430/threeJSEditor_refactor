<script lang="ts">
    export const click: MouseEvent = null;
    export let src: string;
</script>

<div on:click class=" bg-gray-300 ml-1">
    <img {src} class=" w-10 h-4" alt="" />
</div>
