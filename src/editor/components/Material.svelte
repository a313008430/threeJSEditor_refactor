<script context="module" lang="ts">
    let materialId: number = null;
    const materialClasses = {
        LineBasicMaterial: THREE.LineBasicMaterial,
        LineDashedMaterial: THREE.LineDashedMaterial,
        MeshBasicMaterial: THREE.MeshBasicMaterial,
        MeshDepthMaterial: THREE.MeshDepthMaterial,
        MeshNormalMaterial: THREE.MeshNormalMaterial,
        MeshLambertMaterial: THREE.MeshLambertMaterial,
        MeshMatcapMaterial: THREE.MeshMatcapMaterial,
        MeshPhongMaterial: THREE.MeshPhongMaterial,
        MeshToonMaterial: THREE.MeshToonMaterial,
        MeshStandardMaterial: THREE.MeshStandardMaterial,
        MeshPhysicalMaterial: THREE.MeshPhysicalMaterial,
        RawShaderMaterial: THREE.RawShaderMaterial,
        ShaderMaterial: THREE.ShaderMaterial,
        ShadowMaterial: THREE.ShadowMaterial,
        SpriteMaterial: THREE.SpriteMaterial,
        PointsMaterial: THREE.PointsMaterial,
    };

    const properties = [
        "name",
        "color",
        "roughness",
        "metalness",
        "emissive",
        "specular",
        "shininess",
        "clearcoat",
        "clearcoatRoughness",
        "vertexShader",
        "vertexColors",
        "vertexTangents",
        "depthPacking",
        "skinning",
        "map",
        "matcap",
        "alphaMap",
        "bumpMap",
        "normalMap",
        "clearcoatNormalMap",
        "displacementMap",
        "roughnessMap",
        "metalnessMap",
        "specularMap",
        "envMap",
        "lightMap",
        "aoMap",
        "emissiveMap",
        "gradientMap",
        "side",
        "size",
        "sizeAttenuation",
        "flatShading",
        "blending",
        "opacity",
        "transparent",
        "alphaTest",
        "depthTest",
        "depthWrite",
        "wireframe",
    ];
</script>

<script lang="ts">
    import AttributesBox from "./AttributesBox.svelte";
    import Fold from "./Fold.svelte";

    import { StoreSelectMaterialObject, StoreSelectObject } from "../../common/Stores";
    import { EventGlobal } from "../../common/core/EventEmitter";
    import { EventMapGlobal } from "../../common/map/EventMap";
    import { afterUpdate } from "svelte";
    let material: THREE.LineBasicMaterial &
        THREE.LineDashedMaterial &
        THREE.MeshBasicMaterial &
        THREE.MeshDepthMaterial &
        THREE.MeshNormalMaterial &
        THREE.MeshLambertMaterial &
        THREE.MeshMatcapMaterial &
        THREE.MeshPhongMaterial &
        THREE.MeshToonMaterial &
        THREE.MeshStandardMaterial &
        THREE.MeshPhysicalMaterial &
        THREE.RawShaderMaterial &
        THREE.ShaderMaterial &
        THREE.ShadowMaterial &
        THREE.SpriteMaterial &
        THREE.PointsMaterial;
    let materialColor;
    let emissiveColor;

    let fileInput: HTMLInputElement,
        enabledMap: boolean = false;
    let textureMap: THREE.Texture, textureCLickCall: Function;

    $: if ($StoreSelectMaterialObject) {
        material = $StoreSelectMaterialObject as any;
        if (materialId === material?.id) {
            material.color.setStyle(materialColor);
            material.emissive.setStyle(emissiveColor);
        } else {
            textureMap = null;
            enabledMap = false;
        }
        materialId = material.id;
        materialColor = "#" + material?.color.getHexString();
        emissiveColor = "#" + material?.emissive.getHexString();

        if (enabledMap) {
            material.map = textureMap || null;
        } else {
            //初始
            if (material.map && !textureMap) {
                textureMap = material.map;
                enabledMap = true;
            } else {
                material.map = null;
            }
        }

        material.needsUpdate = true;

        render();
        console.log(material, "material");
    }

    function render() {
        EventGlobal.emit(EventMapGlobal.render);
    }

    function setImg(callBack) {
        fileInput.click();
        textureCLickCall = callBack;
    }

    function fileInputChange(e) {
        let file: File = e.target.files[0];
        if (file?.type.match("image.*")) {
            new THREE.TextureLoader().load(URL.createObjectURL(file), (e) => {
                if (textureCLickCall) {
                    textureCLickCall(e);
                }
            });
        }
    }
</script>

{#if material}
    <Fold title="Material" open={true}>
        <input
            type="file"
            bind:this={fileInput}
            on:change={fileInputChange}
            class=" hidden"
            name=""
            id=""
        />
        <!-- type -->
        <AttributesBox title="Type">{material.type}</AttributesBox>
        <!-- uuid -->
        <AttributesBox title="UUID">{material.uuid}</AttributesBox>

        {#each properties as key}
            {#if Object.prototype.hasOwnProperty.call(material, key)}
                <AttributesBox title={key} titleClassName="overflow-hidden  ">
                    {#if key == "name"}
                        <input type="text" class="attr-input-r" bind:value={material.name} />
                    {/if}
                    {#if key == "color"}
                        <input type="color" bind:value={materialColor} class=" attr-input-r" />
                    {/if}
                    {#if key == "roughness"}
                        <input
                            type="number"
                            step="0.01"
                            class="attr-input-r"
                            bind:value={material.roughness}
                        />
                    {/if}
                    {#if key == "metalness"}
                        <input
                            type="number"
                            step="0.01"
                            class="attr-input-r"
                            bind:value={material.metalness}
                        />
                    {/if}
                    {#if key == "emissive"}
                        <input type="color" bind:value={emissiveColor} class=" attr-input-r" />
                        <input
                            type="number"
                            step="0.01"
                            class="attr-input-r"
                            bind:value={material.emissiveIntensity}
                        />
                    {/if}
                    {#if key == "specular"}
                        {key}
                    {/if}
                    {#if key == "shininess"}
                        {key}
                    {/if}
                    {#if key == "clearcoat"}
                        {key}
                    {/if}
                    {#if key == "clearcoatRoughness"}
                        {key}
                    {/if}
                    {#if key == "vertexShader"}
                        {key}
                    {/if}
                    {#if key == "vertexColors"}
                        <input
                            type="checkbox"
                            bind:checked={material.vertexColors}
                            class="attr-input-checkbox-r"
                        />
                    {/if}
                    {#if key == "vertexTangents"}
                        {key}
                    {/if}
                    {#if key == "depthPacking"}
                        {key}
                    {/if}
                    {#if key == "skinning"}
                        <!-- 属性有，但是d.ts没了 可能是要删除 -->
                        <input
                            type="checkbox"
                            bind:checked={material["skinning"]}
                            class="attr-input-checkbox-r"
                        />
                    {/if}
                    {#if key == "map"}
                        <input
                            type="checkbox"
                            bind:checked={enabledMap}
                            class="attr-input-checkbox-r"
                        />
                        <div
                            on:click={() => {
                                setImg((e) => (textureMap = e));
                            }}
                            class=" bg-gray-300 ml-1"
                        >
                            <img src={textureMap?.image?.src} class=" w-10 h-4" alt="" />
                        </div>
                    {/if}
                    {#if key == "matcap"}
                        {key}
                    {/if}
                    {#if key == "alphaMap"}
                        {key}
                    {/if}
                    {#if key == "bumpMap"}
                        {key}
                    {/if}
                    {#if key == "normalMap"}
                        {key}
                    {/if}
                    {#if key == "clearcoatNormalMap"}
                        {key}
                    {/if}
                    {#if key == "displacementMap"}
                        {key}
                    {/if}
                    {#if key == "roughnessMap"}
                        {key}
                    {/if}
                    {#if key == "metalnessMap"}
                        {key}
                    {/if}
                    {#if key == "specularMap"}
                        {key}
                    {/if}
                    {#if key == "envMap"}
                        {key}
                    {/if}
                    {#if key == "lightMap"}
                        {key}
                    {/if}
                    {#if key == "aoMap"}
                        {key}
                    {/if}
                    {#if key == "emissiveMap"}
                        {key}
                    {/if}
                    {#if key == "gradientMap"}
                        {key}
                    {/if}
                    {#if key == "side"}
                        {key}
                    {/if}
                    {#if key == "size"}
                        {key}
                    {/if}
                    {#if key == "sizeAttenuation"}
                        {key}
                    {/if}
                    {#if key == "flatShading"}
                        {key}
                    {/if}
                    {#if key == "blending"}
                        {key}
                    {/if}
                    {#if key == "opacity"}
                        {key}
                    {/if}
                    {#if key == "transparent"}
                        {key}
                    {/if}
                    {#if key == "alphaTest"}
                        {key}
                    {/if}
                    {#if key == "depthTest"}
                        {key}
                    {/if}
                    {#if key == "depthWrite"}
                        {key}
                    {/if}
                    {#if key == "wireframe"}
                        {key}
                    {/if}
                </AttributesBox>
            {/if}
        {/each}
    </Fold>
{/if}
