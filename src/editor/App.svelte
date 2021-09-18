<script lang="ts">
    import { EventGlobal } from "../common/core/eventEmitter";
    import { EventMapGlobal } from "../common/map/EventMap";

    import "./global.scss";
    import MainView from "./views/MainView.svelte";

    function onResize() {
        EventGlobal.emit(EventMapGlobal.resize);
    }
</script>

<svelte:window on:resize={onResize} />
<MainView />
