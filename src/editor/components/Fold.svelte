<script lang="ts">
    import { ArrowRight } from "../assets/Icons";

    export let title: string = "title";
    export let open: boolean = true;
    console.log(ArrowRight);
</script>

<div class="border-t border-b border-t-gray-400 border-b-gray-300 my-1">
    <div
        class=" bg-gray-300 h-6 leading-6 cursor-pointer select-none "
        on:click={() => {
            open = !open;
        }}
    >
        <i
            class="float-left overflow-hidden block transition-transform duration-300 {open
                ? 'rotate-90'
                : 'rotate-0'}">{@html ArrowRight.default}</i
        >{title}
    </div>
    {#if open}
        <slot />
    {/if}
</div>

<style>
</style>
