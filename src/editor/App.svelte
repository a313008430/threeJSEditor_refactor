<script lang="ts">
    import { EventGlobal } from "../common/core/EventEmitter";
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
    function onKeyDown(event) {
        EventGlobal.emit(EventMapGlobal.onKeyDown, event);
    }
    function onKeyUp(event) {
        EventGlobal.emit(EventMapGlobal.onKeyUp, event);
    }
</script>

<svelte:window
    on:resize={onResize}
    on:pointerdown={onPointerDown}
    on:pointerup={onPointerUp}
    on:pointermove={onPointerMove}
    on:dblclick={onDoubleClick}
    on:keydown={onKeyDown}
    on:keyup={onKeyUp}
/>
<MainView />
