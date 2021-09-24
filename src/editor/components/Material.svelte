<script context="module" lang="ts">
    let materialId: number = null;
    let foldOpen: boolean = false;
    const materialClasses: [string, any][] = [
        ["LineBasicMaterial", THREE.LineBasicMaterial],
        ["LineDashedMaterial", THREE.LineDashedMaterial],
        ["MeshBasicMaterial", THREE.MeshBasicMaterial],
        ["MeshDepthMaterial", THREE.MeshDepthMaterial],
        ["MeshNormalMaterial", THREE.MeshNormalMaterial],
        ["MeshLambertMaterial", THREE.MeshLambertMaterial],
        ["MeshMatcapMaterial", THREE.MeshMatcapMaterial],
        ["MeshPhongMaterial", THREE.MeshPhongMaterial],
        ["MeshToonMaterial", THREE.MeshToonMaterial],
        ["MeshStandardMaterial", THREE.MeshStandardMaterial],
        ["MeshPhysicalMaterial", THREE.MeshPhysicalMaterial],
        //这个功能需要传入shader，后期有时间再修改，这是自定义shader
        // ["RawShaderMaterial", THREE.RawShaderMaterial],
        ["ShaderMaterial", THREE.ShaderMaterial],
        ["ShadowMaterial", THREE.ShadowMaterial],
        // ["SpriteMaterial", THREE.SpriteMaterial],
        // ["PointsMaterial", THREE.PointsMaterial],
    ];

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
        // "vertexShader",
        "vertexColors",
        // "vertexTangents",
        "depthPacking",
        // "skinning",
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
    import Checkbox from "./element/Checkbox.svelte";
    import TextureButton from "./element/TextureButton.svelte";
    import Select from "./element/Select.svelte";
    import App from "../App.svelte";
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
    let maps = {
        map: { enabled: false, texture: null },
        alphaMap: { enabled: false, texture: null },
        bumpMap: { enabled: false, texture: null },
        normalMap: { enabled: false, texture: null },
        displacementMap: { enabled: false, texture: null },
        roughnessMap: { enabled: false, texture: null },
        metalnessMap: { enabled: false, texture: null },
        envMap: { enabled: false, texture: null },
        lightMap: { enabled: false, texture: null },
        aoMap: { enabled: false, texture: null },
        emissiveMap: { enabled: false, texture: null },
        specularMap: { enabled: false, texture: null },
        matcap: { enabled: false, texture: null },
        clearcoatNormalMap: { enabled: false, texture: null },
        gradientMap: { enabled: false, texture: null },
    };

    let fileInput: HTMLInputElement;
    let textureCLickCall: Function;

    let materialType: number = 0;

    //如果不这样处理会提示 'THREE' is not defined
    let three = THREE;

    $: if ($StoreSelectMaterialObject) {
        material = $StoreSelectMaterialObject as any;

        materialType = getMaterialTypeIndex(material.type);

        if (materialId === material?.id) {
            material.color?.setStyle(materialColor);
            material.emissive?.setStyle(emissiveColor);
        }

        for (const key in maps) {
            if (
                Object.prototype.hasOwnProperty.call(maps, key) &&
                Object.prototype.hasOwnProperty.call(material, key)
            ) {
                const element = maps[key];
                if (materialId !== material?.id) {
                    element.texture = null;
                    element.enabled = false;
                }

                setMap(key, element.texture, element.enabled);
            }
        }

        materialId = material.id;
        materialColor = "#" + material?.color?.getHexString();
        emissiveColor = "#" + material?.emissive?.getHexString();

        material.needsUpdate = true;

        render();
        // console.log(material, "material");
    } else {
        material = null;
    }

    function materialChange() {
        let m = new materialClasses[materialType][1]();
        ($StoreSelectObject as THREE.Mesh).material = m;
        StoreSelectMaterialObject.set(m);
        // console.log(materialType, material);
    }

    function getMaterialTypeIndex(key: string) {
        for (let x = materialClasses.length - 1; x--; x > -1) {
            if (key === materialClasses[x][0]) {
                return x;
            }
        }
    }

    function setMap(key: string, texture: THREE.Texture, enabled: boolean) {
        if (enabled) {
            material[key] = texture || null;
        } else {
            //初始
            if (material.map && !texture) {
                texture = material[key];
                enabled = true;
            } else {
                material[key] = null;
            }
        }
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
    <Fold title="Material" bind:open={foldOpen}>
        <input
            type="file"
            bind:this={fileInput}
            on:change={fileInputChange}
            class=" hidden"
            name=""
            id=""
        />
        <!-- type -->
        <AttributesBox title="Type">
            <Select
                on:change={materialChange}
                bind:value={materialType}
                listNoIdx={materialClasses}
            />
        </AttributesBox>
        <!-- uuid -->
        <AttributesBox title="UUID">{material.uuid}</AttributesBox>

        {#each properties as key}
            {#if Object.prototype.hasOwnProperty.call(material, key)}
                <AttributesBox bind:title={key} titleClassName="overflow-hidden">
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
                        <Checkbox bind:checked={material.vertexColors} />
                    {/if}
                    <!-- {#if key == "vertexTangents"}
                        {key}
                    {/if} -->
                    {#if key == "depthPacking"}
                        <Select
                            bind:value={material.depthPacking}
                            list={[
                                ["RGBADepthPacking", three.RGBADepthPacking],
                                ["BasicDepthPacking", three.BasicDepthPacking],
                            ]}
                        />
                    {/if}
                    <!-- {#if key == "skinning"}
                      
                        <Checkbox bind:checked={material["skinning"]} />
                    {/if} -->
                    {#if key == "map"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "matcap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "alphaMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "bumpMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.bumpScale}
                        />
                    {/if}
                    {#if key == "normalMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.normalScale.x}
                        />
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.normalScale.y}
                        />
                    {/if}
                    {#if key == "clearcoatNormalMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />

                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.clearcoatNormalScale.x}
                        />
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.clearcoatNormalScale.y}
                        />
                    {/if}
                    {#if key == "displacementMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.displacementScale}
                        />
                    {/if}
                    {#if key == "roughnessMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "metalnessMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "specularMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "envMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.envMapIntensity}
                        />
                    {/if}
                    {#if key == "lightMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "aoMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r ml-1"
                            bind:value={material.aoMapIntensity}
                        />
                    {/if}
                    {#if key == "emissiveMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "gradientMap"}
                        <Checkbox bind:checked={maps[key].enabled} />
                        <TextureButton
                            on:click={() => setImg((e) => (maps[key].texture = e))}
                            src={maps[key].texture?.image?.src}
                        />
                    {/if}
                    {#if key == "side"}
                        <Select
                            bind:value={material.side}
                            list={[
                                ["Front", three.FrontSide],
                                ["Back", three.BackSide],
                                ["Double", three.DoubleSide],
                            ]}
                        />
                    {/if}
                    {#if key == "size"}
                        <input
                            type="number"
                            step="0.1"
                            class="attr-input-r"
                            bind:value={material.size}
                        />
                    {/if}
                    {#if key == "sizeAttenuation"}
                        <Checkbox bind:checked={material.sizeAttenuation} />
                    {/if}
                    {#if key == "flatShading"}
                        <Checkbox bind:checked={material.flatShading} />
                    {/if}
                    {#if key == "blending"}
                        <Select
                            bind:value={material.blending}
                            list={[
                                ["No", three.NoBlending],
                                ["Normal", three.NormalBlending],
                                ["Additive", three.AdditiveBlending],
                                ["Subtractive", three.SubtractiveBlending],
                                ["Multiply", three.MultiplyBlending],
                                ["Custom", three.CustomBlending],
                            ]}
                        />
                    {/if}
                    {#if key == "opacity"}
                        <input
                            type="number"
                            step="0.01"
                            class="attr-input-r"
                            bind:value={material.opacity}
                        />
                    {/if}
                    {#if key == "transparent"}
                        <Checkbox bind:checked={material.transparent} />
                    {/if}
                    {#if key == "alphaTest"}
                        <input
                            type="number"
                            step="0.01"
                            class="attr-input-r"
                            bind:value={material.alphaTest}
                        />
                    {/if}
                    {#if key == "depthTest"}
                        <Checkbox bind:checked={material.depthTest} />
                    {/if}
                    {#if key == "depthWrite"}
                        <Checkbox bind:checked={material.depthWrite} />
                    {/if}
                    {#if key == "wireframe"}
                        <Checkbox bind:checked={material.wireframe} />
                    {/if}
                </AttributesBox>
            {/if}
        {/each}
    </Fold>
{/if}
