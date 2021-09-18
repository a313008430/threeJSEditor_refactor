<script lang="ts">
    /**
     * 用来处理分屏拖动适配的组件
     */
    import { onMount } from "svelte";

    let node: HTMLDivElement = null,
        isClick: boolean = false,
        oldX: number = 0,
        curX: number = 0;

    export let resizeEvent = null;
    export let resizeEventMouseUp = null;

    onMount(() => {
        node.classList.add("relative");
    });
    function onMouseDown(e: MouseEvent) {
        e.preventDefault();
        isClick = true;
        oldX = e.pageX;
        curX = node.parentElement.clientWidth;
    }
    function onMouseMove(e: MouseEvent) {
        e.preventDefault();
        if (isClick) {
            let x = curX + oldX - e.pageX;
            if (
                document.documentElement.clientWidth - x < 50 ||
                document.documentElement.clientWidth - x > document.documentElement.clientWidth - 50
            ) {
                x = node.parentElement.clientWidth;
            }
            node.parentElement.style.width = `${x}px`;
            if (resizeEvent) resizeEvent();
        }
    }
    function onMouseUp(e: MouseEvent) {
        e.preventDefault();
        if (resizeEventMouseUp && isClick) resizeEventMouseUp();
        isClick = false;
    }
</script>

<!-- 用来处理分屏拖动适配的组件 -->
<!-- 拖动的线 -->
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<div
    bind:this={node}
    on:mousedown={onMouseDown}
    class=" hover:bg-yellow-300  transition-colors duration-50 h-full w-2 cursor-col-resize -translate-x-1 absolute left-0 select-none"
/>
