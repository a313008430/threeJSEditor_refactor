<script lang="ts">
    import ResizerLine from "../components/ResizerLine.svelte";
    import TopNav from "../components/TopNav.svelte";
</script>

<div class=" flex flex-col  h-screen">
    <!-- 顶部菜单 -->
    <div
        class=" flex-none bg-gray-200 text-gray-600 h-6 align-text-bottom border-b-[1px] border-solid border-gray-300"
    >
        <TopNav />
    </div>
    <!-- 中间区域 -->
    <div class="flex-grow h-4 flex flex-row">
        <div class="flex-grow bg-gray-100">3</div>
        <div class="flex-none bg-gray-200 w-80 "><ResizerLine />2</div>
    </div>
    <!-- 低部 -->
    <div
        class=" flex-none bg-gray-200 text-gray-600  px-2  h-6 align-text-bottom border-t-[1px] border-solid border-gray-300"
    >
        <span class=" text-xs">0</span>
    </div>
</div>
