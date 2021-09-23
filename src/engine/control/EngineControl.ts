import * as THREE from "three";
import { EventGlobal } from "../../common/core/EventEmitter";
import { EventMapGlobal } from "../../common/map/EventMap";
import {
    StoreSelectObject,
    StoreSelectHelper,
    StoreSelectMaterialObject,
} from "../../common/Stores";
import { ObjectType, CreateObject } from "../component/CreateObject";
import { instance } from "../core/instance";
import { ScenesControl } from "../libs/ScenesControl";
import { ScenesDirectionHelper } from "../libs/ScenesDirectionHelper";
import { TransformControls } from "../libs/TransformControls";

export default class EngineControl {
    @instance
    static inst: EngineControl;

    private renderTime: THREE.Clock = null;

    /**
     * 游戏渲染器
     */
    renderer: THREE.WebGLRenderer = null;

    /**
     * 游戏场景
     */
    scene: THREE.Scene = null;

    /**
     * 透视像机
     */
    camera: THREE.PerspectiveCamera = null;

    /**
     * canvas
     */
    canvas: HTMLCanvasElement;

    private tanFOV;
    private canvasOldHeight;

    private scenesDirectionHelper: ScenesDirectionHelper;

    /**
     * 物体选择控制器
     */
    private objectControl: TransformControls;

    /**
     * 场景旋转，缩放，移动等控制器
     */
    private scenesControl: ScenesControl;

    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;
    /**
     * 场景添加的对象列表
     */
    private objects = [];

    /**
     * 选中的helper组件
     */
    private selectHelper: THREE.Object3D;
    /**
     * 选中的实例对象组件
     */
    private selectObject: THREE.Object3D;

    init(canvas: HTMLCanvasElement) {
        if (this.canvas) return;
        // console.log(canvas);

        this.canvas = canvas;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.renderTime = new THREE.Clock();

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            context: canvas.getContext("webgl2"), //小程序 不支持webgl2
            alpha: true,
            //抗锯齿
            antialias: true,
        });
        this.renderer.setClearColor(0xaaaaaa);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        //相机
        this.camera = new THREE.PerspectiveCamera(
            50,
            canvas.clientWidth / canvas.clientHeight,
            0.01,
            1000
        );
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(new THREE.Vector3());

        // this.renderer.setAnimationLoop(() => {
        //     this.animate();
        // });
        setTimeout(() => {
            this.renderer.setSize(canvas.offsetWidth, canvas.clientHeight, false);
            this.tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
            this.canvasOldHeight = canvas.clientHeight;

            this.animate();
        });

        //场景旋转，缩放，移动等控制器
        this.scenesControl = new ScenesControl(this.camera, this.canvas);
        this.scenesControl["addEventListener"]("change", () => {
            this.animate();
        });

        this.addFloorGrid();
        this.objectControl = this.objectSelect();
        this.addScenesDirectionHelper();

        EventGlobal.addListener(EventMapGlobal.render, () => {
            this.animate();
        });

        EventGlobal.addListener(EventMapGlobal.resize, this.resize, this);
        EventGlobal.addListener(EventMapGlobal.updateScenesSize, this.resize, this);
        EventGlobal.addListener(EventMapGlobal.addObject, this.addObject, this);

        this.addObject(ObjectType.box);
        this.addObject(ObjectType.directionalLight);
    }

    private addObject(type: ObjectType) {
        let obj = CreateObject.inst.create(type);
        if (!obj) return;
        this.scene.add(obj.object);
        if (obj.helper) {
            this.scene.add(obj.helper);
            var picker = obj.helper.getObjectByName("picker");
            if (picker !== undefined) {
                this.objects.push(picker);
            }
        }

        this.objects.push(obj.object);

        this.animate();
    }

    /**
     * 场景坐标方向辅助组件
     */
    private addScenesDirectionHelper() {
        let viewHelper = new ScenesDirectionHelper(this.camera, { dom: this.canvas });
        viewHelper.controls = this.scenesControl;
        this.scenesDirectionHelper = viewHelper;
        EventGlobal.addListener(EventMapGlobal.update, () => {
            if (viewHelper.animating === true) {
                viewHelper.update(this.dt);
            }
        });
    }

    /**
     * 物体选中，双击定焦
     */
    private objectSelect() {
        let control = new TransformControls(this.camera, this.canvas);
        this.scene.add(control);

        control.addEventListener("change", () => {
            this.animate();
        });
        control.addEventListener("objectChange", () => {
            StoreSelectObject.update((e) => {
                return e;
            });
        });

        control.addEventListener("dragging-changed", (event) => {
            this.scenesControl.enabled = !event.value;
        });

        //绑定画面触摸事件
        let onDownPosition = new THREE.Vector2(),
            onUpPosition = new THREE.Vector2();
        EventGlobal.addListener(EventMapGlobal.onPointerDown, (e: MouseEvent) => {
            if (e.target != this.canvas) return;
            onDownPosition.set(e.clientX, e.clientY);
        });

        EventGlobal.addListener(EventMapGlobal.onPointerUp, (e: MouseEvent) => {
            if (e.target != this.canvas || !this.objects.length) return;
            onUpPosition.set(e.clientX, e.clientY);
            if (onDownPosition.distanceTo(onUpPosition)) return;

            let obj = this.getSelectObjectIntersects(
                { x: e.clientX - this.canvas.offsetLeft, y: e.clientY - this.canvas.offsetTop },
                this.objects
            );

            if (obj.length > 0) {
                let object = obj[0].object;
                if (object.userData.object !== undefined) {
                    if (this.selectObject?.id === object.userData.object.id) return;
                    control.attach(object.userData.object);
                    this.selectObject = object.userData.object;
                    if (object.name === "picker") {
                        StoreSelectHelper.set(object.parent as any);
                        this.selectHelper = object.parent;
                        control.setMode("translate");
                    }
                } else {
                    if (this.selectObject?.id === object.id) return;
                    control.attach(object);
                    this.selectObject = object;

                    this.selectHelper = null;
                    StoreSelectHelper.set(null);

                    // if (object.name === "picker") {
                    //     StoreSelectHelper.set(object.parent as any);
                    // }
                }
                // StoreSelectAttrObject.set(this.selectObject);
                StoreSelectObject.set(this.selectObject);
                StoreSelectMaterialObject.set(this.selectObject["material"] as any);
                console.log(this.selectObject);
            } else {
                control.detach();
                StoreSelectObject.set(null);
                StoreSelectMaterialObject.set(null);
                // StoreSelectAttrObject.set(null);
                StoreSelectHelper.set(null);
                this.selectHelper = null;
                this.selectObject = null;
            }
        });

        EventGlobal.addListener(EventMapGlobal.onDoubleClick, (e: MouseEvent) => {
            if (e.target != this.canvas) return;
            let obj = this.getSelectObjectIntersects(
                { x: e.clientX - this.canvas.offsetLeft, y: e.clientY - this.canvas.offsetTop },
                this.objects
            );
            if (obj.length > 0) {
                let object = obj[0].object;
                this.scenesControl.focus(object);
            }
        });

        EventGlobal.addListener(EventMapGlobal.onKeyDown, (e: KeyboardEvent) => {
            // console.log(e.key);
            switch (e.key) {
                case "Shift":
                    control.setTranslationSnap(1);
                    control.setRotationSnap(THREE.MathUtils.degToRad(15));
                    control.setScaleSnap(0.25);
                    break;

                case "w":
                case "W":
                    control.setMode("translate");
                    break;
                case "e":
                    if (!this.selectHelper) control.setMode("rotate");
                    break;
                case "r":
                    if (!this.selectHelper) control.setMode("scale");
                    break;
                case "+":
                    control.setSize(control.size + 0.1);
                    break;
                case "-":
                    control.setSize(Math.max(control.size - 0.1, 0.1));
                    break;
                case "X":
                case "x":
                    control.showX = !control.showX;
                    break;

                case "y":
                case "Y":
                    control.showY = !control.showY;
                    break;

                case "z":
                case "Z":
                    control.showZ = !control.showZ;
                    break;

                case " ":
                    control.enabled = !control.enabled;
                    break;
            }
        });

        EventGlobal.addListener(EventMapGlobal.onKeyUp, (e: KeyboardEvent) => {
            switch (e.key) {
                case "Shift":
                    control.setTranslationSnap(null);
                    control.setRotationSnap(null);
                    control.setScaleSnap(null);
                    break;
            }
        });

        return control;
    }

    /**
     * 添加场景地面辅助网格
     */
    private addFloorGrid() {
        //辅助网格线
        var grid = new THREE.Group();
        var grid1 = new THREE.GridHelper(30, 30, 0xc5c5c5);
        grid1.material["color"].setHex(0xc5c5c5);
        grid1.material["vertexColors"] = false;
        grid.add(grid1);

        var grid2 = new THREE.GridHelper(30, 6, 0x777777);
        grid2.material["color"].setHex(0x777777);
        grid2.material["depthFunc"] = THREE.AlwaysDepth;
        grid2.material["vertexColors"] = false;
        grid.add(grid2);
        this.scene.add(grid);
    }

    /**
     * 返回选择的对象
     * @param point 鼠标坐标
     * @param objects 对象列表
     * @returns 返回对象实例
     */
    private getSelectObjectIntersects(point, objects: THREE.Object3D[]) {
        this.mouse.set(
            (point.x / this.canvas.clientWidth) * 2 - 1,
            -((point.y / this.canvas.clientHeight) * 2) + 1
        );
        this.raycaster.setFromCamera(this.mouse, this.camera);
        return this.raycaster.intersectObjects(objects);
    }

    private dt: number;
    private animate() {
        this.renderer.setViewport(
            0,
            0,
            this.canvas.clientWidth + (this.canvas.width - this.canvas.clientWidth),
            this.canvas.clientHeight + (this.canvas.height - this.canvas.clientHeight)
        );
        this.renderer.render(this.scene, this.camera);

        //----------
        this.dt = this.renderTime.getDelta();
        this.renderer.autoClear = false;
        this.scenesDirectionHelper.render(this.renderer);
        this.renderer.autoClear = true;
        //----------

        EventGlobal.emit(EventMapGlobal.update, this.dt);
        this.camera.updateProjectionMatrix();
    }

    private resize() {
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);

        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;

        //这一行注销会模糊
        this.camera.fov =
            (360 / Math.PI) *
            Math.atan(this.tanFOV * (this.canvas.clientHeight / this.canvasOldHeight));
        this.camera.updateProjectionMatrix();
        this.animate();
        // this.camera.lookAt(this.scene.position);
    }
}
