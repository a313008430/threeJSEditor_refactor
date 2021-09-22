import { writable } from "svelte/store";

export type selectHelper = THREE.DirectionalLightHelper;
export type selectObject = THREE.DirectionalLight | THREE.Mesh | THREE.Object3D;

/** 选择的模型单例  */
export const StoreSelectObject = writable<selectObject>(null);
/** 选择的helper */
export const StoreSelectHelper = writable<selectHelper>(null);
