import { instance } from "../core/instance";

export const enum ObjectType {
    group,
    box,
    sphere,
    // ambientLight,
    directionalLight,
}
/**
 * 创建物体实例
 */
export class CreateObject {
    @instance
    static inst: CreateObject;

    create(type: ObjectType) {
        switch (type) {
            case ObjectType.box:
                return this.createBox();
            case ObjectType.sphere:
                return this.createSphere();
            // case ObjectType.ambientLight:
            //     return this.createAmbientLight();
            case ObjectType.directionalLight:
                return this.createDirectionalLight();
            default:
                return null;
        }
    }

    createBox() {
        let geometry = new THREE.BoxGeometry(),
            material = new THREE.MeshStandardMaterial(),
            cube = new THREE.Mesh(geometry, material);
        cube.name = "Box";

        return { object: cube, helper: null };
    }
    createSphere() {
        let geometry = new THREE.SphereGeometry(),
            material = new THREE.MeshStandardMaterial(),
            cube = new THREE.Mesh(geometry, material);

        cube.name = "Sphere";

        return { object: cube, helper: null };
    }

    createAmbientLight() {
        const light = new THREE.AmbientLight(0x404040, 1);
        light.position.set(1, 1, 1);

        return { object: light, helper: null };
    }
    createDirectionalLight() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 10, 7.5);
        let helper = new THREE.DirectionalLightHelper(light, 1);
        light.name = "DirectionalLight";

        var geometry = new THREE.SphereGeometry(2, 4, 2);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false });
        var picker = new THREE.Mesh(geometry, material);
        picker.name = "picker";
        picker.userData.object = light;
        helper.add(picker);

        return { object: light, helper: helper };
    }
}
