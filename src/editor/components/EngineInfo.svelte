<script lang="ts">
    import { EventGlobal } from "../../common/core/EventEmitter";
    import { EventMapGlobal } from "../../common/map/EventMap";
    import { EngineInfoStore } from "../../common/Stores";
    import { EngineInfo } from "../../engine/control/EngineInfo";

    let frameTime: string = "0";
    let objects = 0;
    let vertices = 0;
    let triangles = 0;

    EventGlobal.addListener(EventMapGlobal.frameTime, (dt) => {
        frameTime = EngineInfo.inst.updateFrameTime(dt);
    });

    $: {
        let info = $EngineInfoStore;
        objects = info.objects;
        vertices = info.vertices;
        triangles = info.triangles;
    }
</script>

<div class=" absolute text-white left-2 bottom-2 text-shadow-25 text-xs">
    <div>objects {objects}</div>
    <div>vertices {vertices}</div>
    <div>triangles {triangles}</div>
    <div>frametime {frameTime} ms</div>
</div>
