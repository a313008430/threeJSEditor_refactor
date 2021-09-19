<script lang="ts">
    import { EventGlobal } from "../common/core/eventEmitter";
    import { EventMapGlobal } from "../common/map/EventMap";

    import "./global.scss";
    import MainView from "./views/MainView.svelte";

    function onResize() {
        EventGlobal.emit(EventMapGlobal.resize);
    }

    function onPointerDown(event) {
        EventGlobal.emit(EventMapGlobal.onPointerDown, event);
    }
    function onPointerUp(event) {
        EventGlobal.emit(EventMapGlobal.onPointerUp, event);
    }
    function onPointerMove(event) {
        EventGlobal.emit(EventMapGlobal.onPointerMove, event);
    }
    function onDoubleClick(event) {
        EventGlobal.emit(EventMapGlobal.onDoubleClick, event);
    }
</script>

<svelte:window
    on:resize={onResize}
    on:pointerdown={onPointerDown}
    on:pointerup={onPointerUp}
    on:pointermove={onPointerMove}
    on:dblclick={onDoubleClick}
/>
<MainView />
