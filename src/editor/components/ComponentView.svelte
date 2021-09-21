<script lang="ts">
    import { icons } from "../assets/Icons";
    import Stores, { selectHelper } from "../../common/Stores";
    import Fold from "./Fold.svelte";
    // import THREE from "three";
    let selectObject: THREE.Object3D = null;
    let selectHelp: selectHelper = null;
    Stores.selectObject.subscribe((e) => {
        selectObject = e;
        if (selectHelp) selectHelp.update();
    });
    Stores.selectHelper.subscribe((e) => {
        selectHelp = e;
        console.log(selectHelp);
    });
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
            <div class=" flex flex-wrap px-3">
                <span class=" flex-shrink-0 whitespace-nowrap w-1/4 min-w-[50px] ">Type</span>
                <span class=" flex-grow ">{selectObject.type}</span>
            </div>
            <!-- uuid -->
            <div class=" flex px-3">
                <span class=" flex-shrink-0 whitespace-nowrap w-1/4 min-w-[50px] ">UUID</span>
                <span class=" flex-grow whitespace-nowrap overflow-hidden" title={selectObject.uuid}
                    >{selectObject.uuid}</span
                >
            </div>
            <!-- name -->
            <div class=" flex  px-3">
                <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Name</span>
                <span class=" flex-grow flex flex-row space-x-1 whitespace-nowrap">
                    <div class="flex-1 flex items-center">
                        <input
                            type="text"
                            class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            value={selectObject.name}
                        />
                    </div>
                </span>
            </div>
            <!-- transform -->
            <Fold title="Transform">
                <div class="px-3 flex">
                    <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Position</span
                    >
                    <span class=" flex-grow flex flex-row space-x-1 whitespace-nowrap">
                        <div class="flex-1 flex items-center">
                            <span class="px-1">x</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.position.x}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">y</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.position.y}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">z</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.position.z}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                    </span>
                </div>
                <div class="px-3 flex">
                    <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Rotation</span
                    >
                    <span class=" flex-grow flex flex-row space-x-1 whitespace-nowrap">
                        <div class="flex-1 flex items-center">
                            <span class="px-1">x</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.rotation.x}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">y</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.rotation.y}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">z</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.rotation.z}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                    </span>
                </div>
                <div class="px-3 flex">
                    <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Scale</span>
                    <span class=" flex-grow flex flex-row space-x-1 whitespace-nowrap">
                        <div class="flex-1 flex items-center">
                            <span class="px-1">x</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.scale.x}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">y</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.scale.y}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <span class=" px-1">z</span>
                            <input
                                type="number"
                                step="0.1"
                                bind:value={selectObject.scale.z}
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                    </span>
                </div>
            </Fold>
            <!-- visible -->
            <div class="px-3 flex">
                <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Visible</span>
                <span class=" flex-grow flex items-center whitespace-nowrap ">
                    <input
                        type="checkbox"
                        bind:checked={selectObject.visible}
                        class=" outline-none px-1  h-4 w-4  rounded-md"
                    />
                </span>
            </div>
            <!-- Frustum Cull*- -->
            <div class="px-3 flex">
                <span class="flex-shrink-0 leading-4 w-1/4 min-w-[50px]">Frustum Cull</span>
                <span class=" flex-grow flex items-center whitespace-nowrap ">
                    <input
                        type="checkbox"
                        bind:checked={selectObject.frustumCulled}
                        class=" outline-none px-1  h-4 w-4  rounded-md"
                    />
                </span>
            </div>
            <!-- Shadow -->
            <div class="px-3 flex">
                <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Shadow</span>
                <span class=" flex-grow flex items-center whitespace-nowrap ">
                    <input
                        id="cost"
                        type="checkbox"
                        bind:checked={selectObject.castShadow}
                        class=" outline-none px-1  h-4 w-4  rounded-md"
                    />

                    <label class="px-1 select-none" for="cost">cost</label>
                    <input
                        id="receive"
                        type="checkbox"
                        bind:checked={selectObject.receiveShadow}
                        class=" outline-none px-1  h-4 w-4  rounded-md"
                    />
                    <label class="px-1 select-none" for="receive">receive</label>
                </span>
            </div>

            <!-- 临时组件 -->
            {#if false}
                <!-- input number -->
                <div class="px-3 flex  ">
                    <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Type</span>
                    <span class=" flex-grow flex flex-row space-x-1 whitespace-nowrap">
                        <div class="flex-1 flex items-center">
                            <input
                                type="number"
                                placeholder="0"
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                        <div class="flex-1 flex items-center">
                            <input
                                type="number"
                                placeholder="0"
                                class=" outline-none w-full min-w-[40px] px-1 flex-1 h-6 cursor-row-resize rounded-md "
                            />
                        </div>
                    </span>
                </div>
                <!-- input range -->
                <div class=" flex px-3 ">
                    <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Type</span>
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
                    <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Type</span>
                    <span class=" flex-grow flex items-center whitespace-nowrap ">
                        <input type="checkbox" class=" outline-none px-1  h-4 w-4  rounded-md" />
                    </span>
                </div>
                <!-- input option -->
                <div class="px-3 flex">
                    <span class="flex-shrink-0 whitespace-nowrap  w-1/4 min-w-[50px]">Type</span>
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

<style lang="scss">
    .component-view {
        .content {
            // padding: 0 1rem;
        }
    }
</style>
