<script lang="ts">
    import { EventGlobal } from "../../common/core/EventEmitter";
    import { EventMapGlobal } from "../../common/map/EventMap";
    import ComponentView from "../components/ComponentView.svelte";

    import EngineScenes from "../components/EngineScenes.svelte";

    import ResizerLine from "../components/ResizerLine.svelte";
    import TopNav from "../components/TopNav.svelte";

    function resizeScenes() {
        EventGlobal.emit(EventMapGlobal.updateScenesSize);
    }
</script>

<div class=" flex flex-col h-screen text-gray-500 font-sans text-sm">
    <!-- 顶部菜单 -->
    <div
        class=" flex-none items-center bg-gray-200  align-text-bottom border-b-[1px] border-solid border-gray-300"
    >
        <TopNav />
    </div>
    <!-- 中间区域 -->
    <div class="flex-grow h-4 flex flex-row">
        <div class="flex-grow bg-gray-100 flex flex-row"><EngineScenes /></div>
        <div class="flex-none bg-gray-200 w-80 relative ">
            <ResizerLine resizeEventMouseUp={resizeScenes} />
            <ComponentView />
        </div>
    </div>
    <!-- 低部 -->
    <div
        class=" flex-none bg-gray-200   px-2  h-6 align-text-bottom border-t-[1px] border-solid border-gray-300"
    >
        <span class=" text-xs">0</span>
    </div>
</div>
