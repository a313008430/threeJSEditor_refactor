import { writable } from "svelte/store";

type helper = THREE.DirectionalLightHelper;

/**
 * 数据
 */
export default {
    /** 选择的模型单例 */
    selectObject: writable<THREE.Object3D>(null),
    /** 选择的helper */
    selectHelper: writable<helper>(null),
};
