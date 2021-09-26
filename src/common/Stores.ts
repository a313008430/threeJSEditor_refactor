import { writable } from "svelte/store";

export type selectHelper = THREE.DirectionalLightHelper;
export type selectObject = THREE.DirectionalLight | THREE.Mesh | THREE.Object3D;
// export type selectObjectMaterial = THREE.MeshStandardMaterial;

/** 选择的模型单例  */
export const StoreSelectObject = writable<selectObject>(null);
/** 选择的模型属性更新  */
export const StoreSelectMaterialObject = writable<any>(null);
/** 选择的helper */
export const StoreSelectHelper = writable<selectHelper>(null);
/** 界面面数等数据  */
export const EngineInfoStore = writable<{ objects; vertices; triangles }>({
    objects: 0,
    vertices: 0,
    triangles: 0,
});
