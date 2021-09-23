<script lang="ts" context="module">
    let vertexNormalsHelperList: Map<number, VertexNormalsHelper> = new Map();
    let curType: string = null;
</script>

<script lang="ts">
    import { onDestroy } from "svelte";

    import { EventGlobal } from "../../common/core/EventEmitter";
    import { EventMapGlobal } from "../../common/map/EventMap";

    import { StoreSelectObject } from "../../common/Stores";
    import { VertexNormalsHelper } from "../../engine/libs/VertexNormalsHelper";

    import AttributesBox from "./AttributesBox.svelte";
    import Fold from "./Fold.svelte";

    /**
     * 这个界面里面的 $: 还不是特别熟练需要优化
     */

    let geometry: THREE.BoxGeometry & THREE.SphereGeometry,
        //sphere geometry
        sphereList: { key: string; val: number }[] = [];

    let selectObject: THREE.Mesh;

    $: if (sphereList) {
        sphereList.map((e) => {
            if (e.val) {
                return e;
            } else {
                e.val = 0;
                return e;
            }
        });

        if (sphereList.length) updateGeometry();
    }

    $: vertexNormalsHelperList.get(selectObject.id)?.update();

    // TODO 这里需要优化 ，调用次数太多 参考 material 优化
    $: if ($StoreSelectObject) {
        selectObject = $StoreSelectObject as THREE.Mesh;
        geometry = selectObject?.geometry as any;

        switch (geometry?.type) {
            case "SphereGeometry":
                if (curType == "SphereGeometry") {
                    break;
                }
                sphereList = [];
                curType = "SphereGeometry";

                if (!sphereList.length) {
                    for (const key in geometry.parameters) {
                        if (Object.prototype.hasOwnProperty.call(geometry.parameters, key)) {
                            const element = geometry.parameters[key];
                            switch (key) {
                                case "phiStart":
                                case "phiLength":
                                case "thetaStart":
                                case "thetaLength":
                                    sphereList.push({
                                        key: key,
                                        val: THREE.MathUtils.radToDeg(element),
                                    });
                                    break;
                                case "widthSegments":
                                case "heightSegments":
                                    sphereList.push({
                                        key: key,
                                        val: Math.floor(element),
                                    });
                                    break;
                                default:
                                    sphereList.push({ key: key, val: element });
                                    break;
                            }
                        }
                    }
                }
                break;
            case "BoxGeometry":
                if (curType == "BoxGeometry") {
                    break;
                }
                sphereList = [];
                curType = "BoxGeometry";
                if (!sphereList.length) {
                    for (const key in geometry.parameters) {
                        if (Object.prototype.hasOwnProperty.call(geometry.parameters, key)) {
                            const element = geometry.parameters[key];
                            sphereList.push({ key: key, val: element });
                        }
                    }
                }
                break;
        }
    }

    onDestroy(() => {
        curType = null;
    });

    function updateGeometry() {
        if (geometry) {
            geometry.dispose();
            switch (geometry.type) {
                case "SphereGeometry":
                    selectObject.geometry = new THREE.SphereGeometry(
                        sphereList[0].val,
                        sphereList[1].val,
                        sphereList[2].val,
                        THREE.MathUtils.degToRad(sphereList[3].val),
                        THREE.MathUtils.degToRad(sphereList[4].val),
                        THREE.MathUtils.degToRad(sphereList[5].val),
                        THREE.MathUtils.degToRad(sphereList[6].val)
                    );
                    break;
                case "BoxGeometry":
                    selectObject.geometry = new THREE.BoxGeometry(
                        sphereList[0].val,
                        sphereList[1].val,
                        sphereList[2].val,
                        sphereList[3].val,
                        sphereList[4].val,
                        sphereList[5].val
                    );
                    break;
            }
            geometry = selectObject.geometry as any;
            // let vertexHelper = vertexNormalsHelperList.get(selectObject.id);
            // if (vertexHelper) {
            //     vertexHelper.object.geometry = selectObject.geometry;
            //     vertexHelper.update();
            // }
        }

        EventGlobal.emit(EventMapGlobal.render);
    }

    /**
     * 显示法线
     */
    function showVertexNormals() {
        if (selectObject) {
            if (vertexNormalsHelperList.has(selectObject.id)) {
                let helper = vertexNormalsHelperList.get(selectObject.id);
                helper.parent.remove(helper);
                vertexNormalsHelperList.delete(selectObject.id);
            } else {
                let helper = new VertexNormalsHelper(selectObject);
                selectObject.parent.add(helper);
                vertexNormalsHelperList.set(selectObject.id, helper);
            }

            EventGlobal.emit(EventMapGlobal.render);
        }
    }
</script>

{#if geometry}
    <Fold title="Geometry" open={false}>
        <!-- type -->

        <AttributesBox title="Type">{geometry.type}</AttributesBox>
        <!-- uuid -->
        <AttributesBox title="UUID">{geometry.uuid}</AttributesBox>
        <!-- name -->
        <AttributesBox title="Name">
            <div class="flex-1 flex items-center">
                <input type="text" class=" attr-input-r " bind:value={geometry.name} />
            </div>
        </AttributesBox>
        {#if ["SphereGeometry", "BoxGeometry"].includes(geometry?.type)}
            {#each sphereList as item}
                <AttributesBox title={item.key}>
                    <div class="flex-1 flex items-center">
                        <input
                            type="number"
                            step="1"
                            class=" attr-input-r "
                            bind:value={item.val}
                        />
                    </div>
                </AttributesBox>
            {/each}
        {/if}

        <!-- Attributes -->
        <AttributesBox title="Attributes">
            <div class="w-full leading-6">
                <div>
                    <div class=" w-1/2 inline-block">index</div>
                    {geometry.index.count}
                </div>
                <div>
                    <div class=" w-1/2 inline-block">position</div>
                    {geometry.attributes.position.count}({geometry.attributes.position.itemSize})
                </div>
                <div>
                    <div class=" w-1/2 inline-block">normal</div>
                    {geometry.attributes.normal.count}({geometry.attributes.normal.itemSize})
                </div>
                <div>
                    <div class=" w-1/2 inline-block">uv</div>
                    {geometry.attributes.uv.count}({geometry.attributes.uv.itemSize})
                </div>
            </div>
        </AttributesBox>

        <AttributesBox title="Bounds">
            {geometry.boundingSphere?.radius}
        </AttributesBox>

        <div class=" py-4 text-center">
            <button
                class="bg-gray-300 px-4 hover:bg-gray-100 active:bg-gray-50 active:text-gray-800"
                on:click={showVertexNormals}>SHOW VERTEX NORMALS</button
            >
        </div>
    </Fold>
{/if}
