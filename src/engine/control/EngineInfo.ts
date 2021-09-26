import type { BoxGeometry } from "three";
import { EventGlobal } from "../../common/core/EventEmitter";
import { EventMapGlobal } from "../../common/map/EventMap";
import { EngineInfoStore } from "../../common/Stores";
import { instance } from "../core/instance";

export class EngineInfo {
    /**
     * 引擎数据参数详情
     */
    @instance
    static inst: EngineInfo;

    objects: number = 0;
    vertices: number = 0;
    triangles: number = 0;

    private scene: THREE.Scene;

    update(scene?: THREE.Scene) {
        if (scene) this.scene = scene;
        if (this.scene) {
            scene = this.scene;
        }

        this.objects = 0;
        this.vertices = 0;
        this.triangles = 0;
        let child = scene.children;

        for (let i = child.length - 1; i > -1; i--) {
            let obj = child[i];
            obj.traverseVisible((object: THREE.Mesh) => {
                this.objects++;
                if (object.isMesh) {
                    let geometry = object.geometry as any;
                    if (geometry.isGeometry) {
                        this.vertices += geometry.vertices.length;
                        this.triangles += geometry.faces.length;
                    } else if (geometry.isBufferGeometry) {
                        this.vertices += geometry.attributes.position.count;
                        if (geometry.index != null) {
                            this.triangles += geometry.index.count / 3;
                        } else {
                            this.triangles += geometry.attributes.position.count / 3;
                        }
                    }
                }
            });
        }

        EngineInfoStore.set({
            objects: this.objects,
            vertices: this.vertices,
            triangles: this.triangles,
        });
    }

    updateFrameTime(time: number) {
        return Number(time).toFixed(2);
    }
}
