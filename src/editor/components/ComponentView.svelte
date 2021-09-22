<script lang="ts">
    import { icons } from "../assets/Icons";
    import { selectHelper, StoreSelectHelper, StoreSelectObject } from "../../common/Stores";
    import Fold from "./Fold.svelte";
    import { afterUpdate, beforeUpdate } from "svelte";
    import AttributesBox from "./AttributesBox.svelte";
    import Geometry from "./Geometry.svelte";
    // import THREE from "three";
    let selectObject: any = null;
    let selectLight: THREE.DirectionalLight = null;
    let selectHelp: selectHelper = null;
    let lightColor;

    $: selectHelp = $StoreSelectHelper;

    afterUpdate(() => {
        if (selectHelp) selectHelp.update();
    });

    $: selectObject = $StoreSelectObject;

    $: if (selectObject) {
        if (selectObject.type !== "Mesh") {
            selectLight = selectObject as THREE.DirectionalLight;
            selectLight.color.setStyle(lightColor);
            lightColor = "#" + selectLight.color.getHexString();
        } else {
            selectLight = null;
        }
    }

    $: if (selectHelp) {
        selectHelp.update();
    }
</script>

<div class="component-view">
    <div class=" bg-gray-300 leading-8">
        <button class=" px-3 bg-gray-200"
            ><img class=" inline w-3 mx-1" src={icons} alt="" />Inspector</button
        >
    </div>
    <div class=" content bg-gray-200 leading-8 justify-between">
        {#if selectObject != null}
            <!-- type -->
            <AttributesBox title="Type">{selectObject.type}</AttributesBox>
            <!-- uuid -->
            <AttributesBox title="UUID">{selectObject.uuid}</AttributesBox>
            <!-- name -->
            <AttributesBox title="Name">
                <div class="flex-1 flex items-center">
                    <input type="text" class=" attr-input-r " value={selectObject.name} />
                </div>
            </AttributesBox>
            <!-- transform -->
            <Fold title="Transform">
                <AttributesBox title="Position">
                    <div class="flex-1 flex items-center">
                        <span class="px-1">x</span>
                        <input
                            type="number"
                            step="0.1"
                            bind:value={selectObject.position.x}
                            class=" attr-input-r "
                        />
                    </div>
                    <div class="flex-1 flex items-center">
                        <span class=" px-1">y</span>
                        <input
                            type="number"
                            step="0.1"
                            bind:value={selectObject.position.y}
                            class=" attr-input-r "
                        />
                    </div>
                    <div class="flex-1 flex items-center">
                        <span class=" px-1">z</span>
                        <input
                            type="number"
                            step="0.1"
                            bind:value={selectObject.position.z}
                            class=" attr-input-r "
                        />
                    </div>
                </AttributesBox>

                {#if selectHelp == null}
                    <AttributesBox title="Rotation">
                        <div class="flex-1 flex items-center">
                            <span class="px-1">x</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.rotation.x}
                                class=" attr-input-r "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">y</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.rotation.y}
                                class=" attr-input-r "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">z</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.rotation.z}
                                class=" attr-input-r "
                            />
                        </div>
                    </AttributesBox>
                    <AttributesBox title="Scale">
                        <div class="flex-1 flex items-center">
                            <span class="px-1">x</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.scale.x}
                                class=" attr-input-r "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">y</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.scale.y}
                                class=" attr-input-r "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">z</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.scale.z}
                                class=" attr-input-r "
                            />
                        </div>
                    </AttributesBox>
                {/if}
            </Fold>
            <!-- visible -->
            <AttributesBox title="Visible">
                <input
                    type="checkbox"
                    bind:checked={selectObject.visible}
                    class="outline-none px-1  h-4 w-4  rounded-md"
                />
            </AttributesBox>

            <!-- Frustum Cull*- -->
            <AttributesBox title="Frustum Cull" titleClassName="leading-4">
                <input
                    type="checkbox"
                    bind:checked={selectObject.frustumCulled}
                    class=" outline-none px-1  h-4 w-4  rounded-md"
                />
            </AttributesBox>
            <!-- Shadow -->
            <AttributesBox title="Shadow">
                <input
                    id="cost"
                    type="checkbox"
                    bind:checked={selectObject.castShadow}
                    class=" outline-none px-1  h-4 w-4  rounded-md"
                />
                <label class="px-1 select-none" for="cost">cost</label>
                {#if selectObject.type == "Mesh"}
                    <input
                        id="receive"
                        type="checkbox"
                        bind:checked={selectObject.receiveShadow}
                        class=" outline-none px-1  h-4 w-4  rounded-md"
                    />
                    <label class="px-1 select-none" for="receive">receive</label>
                {/if}
            </AttributesBox>

            <!-- 灯光相关 -->
            {#if selectLight}
                <AttributesBox title="Intensity">
                    <input
                        type="number"
                        step="0.1"
                        bind:value={selectLight.intensity}
                        class=" attr-input-r "
                    />
                </AttributesBox>
                <AttributesBox title="Color">
                    <input type="color" bind:value={lightColor} class=" attr-input-r " />
                </AttributesBox>
                <AttributesBox title="Shadow Bias">
                    <input
                        type="number"
                        step="0.0001"
                        bind:value={selectLight.shadow.bias}
                        class=" attr-input-r"
                    />
                </AttributesBox>
                <AttributesBox title="Shadow Normal Bias">
                    <input
                        type="number"
                        step="0.1"
                        bind:value={selectLight.shadow.normalBias}
                        class=" attr-input-r "
                    />
                </AttributesBox>
                <AttributesBox title="Shadow Radius">
                    <input
                        type="number"
                        step="0.01"
                        bind:value={selectLight.shadow.radius}
                        class=" attr-input-r "
                    />
                </AttributesBox>
            {/if}

            <!-- RenderOrder -->
            <AttributesBox title="RenderOrder">
                <input type="number" bind:value={selectObject.renderOrder} class=" attr-input-r " />
            </AttributesBox>

            <Geometry />

            <!-- 临时组件 -->
            {#if false}
                <!-- input number -->
                <div class="px-3 flex  ">
                    <span class="attr-left-title">Type</span>
                    <span class=" flex-grow flex flex-row space-x-1 whitespace-nowrap">
                        <div class="flex-1 flex items-center">
                            <input type="number" placeholder="0" class=" attr-input-r " />
                        </div>
                        <div class="flex-1 flex items-center">
                            <input type="number" placeholder="0" class=" attr-input-r " />
                        </div>
                    </span>
                </div>
                <!-- input range -->
                <div class=" flex px-3 ">
                    <span class="attr-left-title">Type</span>
                    <span class=" flex-grow flex  flex-row space-x-1 whitespace-nowrap">
                        <div class="flex-1 flex items-center">
                            <input
                                type="range"
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6  rounded-md"
                            />
                        </div>
                    </span>
                </div>
                <!-- input check -->
                <div class="px-3 flex">
                    <span class="attr-left-title">Type</span>
                    <span class=" flex-grow flex items-center whitespace-nowrap ">
                        <input type="checkbox" class=" outline-none px-1  h-4 w-4  rounded-md" />
                    </span>
                </div>
                <!-- input option -->
                <div class="px-3 flex">
                    <span class="attr-left-title">Type</span>
                    <span class=" flex-grow flex items-center whitespace-nowrap ">
                        <select class=" w-full rounded-md">
                            <option>0</option>
                            <option selected>1</option>
                            <option>2</option>
                        </select>
                    </span>
                </div>
            {/if}
        {/if}
    </div>
</div>

<!-- 
<style lang="scss">
    .component-view {
        .content {
            // padding: 0 1rem;
        }
    }
</style> -->
