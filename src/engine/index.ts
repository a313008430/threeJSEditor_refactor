import * as THREE from "three";
import { EventGlobal } from "../common/core/eventEmitter";
import { EventMapGlobal } from "../common/map/EventMap";
import { ScenesControl } from "./ScenesControl";
import { ScenesDirectionHelper } from "./ScenesDirectionHelper";

class EngineControl {
    private renderTime: THREE.Clock = null;

    /**
     * 游戏渲染器
     */
    renderer: THREE.WebGLRenderer = null;

    /**
     * 游戏场景
     */
    sceneGame: THREE.Scene = null;

    /**
     * 透视像机
     */
    camera: THREE.PerspectiveCamera = null;

    /**
     * canvas
     */
    canvas: HTMLCanvasElement;

    tanFOV;
    canvasOldHeight;

    private viewHelper: ScenesDirectionHelper;

    init(canvas: HTMLCanvasElement) {
        if (this.canvas) return;
        // console.log(canvas);

        this.canvas = canvas;

        this.renderTime = new THREE.Clock();

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            context: canvas.getContext("webgl2"), //小程序 不支持webgl2
            alpha: true,
            //抗锯齿
            antialias: true,
        });
        this.renderer.setClearColor(0xaaaaaa);
        // this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, true);
        // console.log(canvas.clientWidth, canvas.clientHeight);

        this.sceneGame = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            50,
            canvas.clientWidth / canvas.clientHeight,
            0.01,
            1000
        );
        this.renderer.setAnimationLoop(() => {
            this.animate();
        });

        setTimeout(() => {
            this.renderer.setSize(canvas.offsetWidth, canvas.clientHeight, false);
        });

        this.tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
        this.canvasOldHeight = canvas.clientHeight;

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.sceneGame.add(cube);

        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(new THREE.Vector3());

        // this.animate();
        EventGlobal.addListener(EventMapGlobal.update, () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });

        EventGlobal.addListener(EventMapGlobal.resize, this.resize, this);
        EventGlobal.addListener(EventMapGlobal.updateScenesSize, this.resize, this);

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
        this.sceneGame.add(grid);

        //添加场景旋转
        var controls = new ScenesControl(this.camera, this.canvas);
        controls.addEventListener("change", function () {
            // signals.cameraChanged.dispatch(camera);
            // signals.refreshSidebarObject3D.dispatch(camera);
        });

        //绑定显示当前场景方向
        var viewHelper = new ScenesDirectionHelper(this.camera, { dom: this.canvas });
        viewHelper.controls = controls;
        this.viewHelper = viewHelper;
        EventGlobal.addListener(EventMapGlobal.update, () => {
            if (viewHelper.animating === true) {
                viewHelper.update(this.dt);
            }
        });

        //绑定画面触摸事件
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this), false);
        this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this), false);
        this.canvas.addEventListener("dblclick", this.onDoubleClick.bind(this), false);

        this.onDownPosition = new THREE.Vector2();
        this.onUpPosition = new THREE.Vector2();
        this.onDoubleClickPosition = new THREE.Vector2();

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }
    onDownPosition;
    onUpPosition;
    onDoubleClickPosition;

    raycaster;
    mouse;
    objects = [];

    private onMouseDown(event) {
        var array = this.getMousePosition(this.canvas, event.clientX, event.clientY);
        this.onDownPosition.fromArray(array);
        document.addEventListener("mouseup", this.onMouseUp.call(this, event), false);
    }
    private onTouchStart(event) {
        var touch = event.changedTouches[0];

        var array = this.getMousePosition(this.canvas, touch.clientX, touch.clientY);
        this.onDownPosition.fromArray(array);

        document.addEventListener("touchend", this.onTouchEnd.call(this, event), false);
    }

    onTouchEnd(event) {
        var touch = event.changedTouches[0];

        var array = this.getMousePosition(this.canvas, touch.clientX, touch.clientY);
        this.onUpPosition.fromArray(array);

        this.handleClick();

        document.removeEventListener("touchend", this.onTouchEnd, false);
    }
    private onDoubleClick() {}

    private onMouseUp(event) {
        var array = this.getMousePosition(this.canvas, event.clientX, event.clientY);
        this.onUpPosition.fromArray(array);

        this.handleClick();

        document.removeEventListener("mouseup", this.onMouseUp, false);
    }

    private handleClick() {
        if (this.onDownPosition.distanceTo(this.onUpPosition) === 0) {
            var intersects = this.getIntersects(this.onUpPosition, this.objects);
            console.log(intersects);

            if (intersects.length > 0) {
                var object = intersects[0].object;

                console.log(object);

                if (object.userData.object !== undefined) {
                    // helper
                    // editor.select(object.userData.object);
                } else {
                    // editor.select(object);
                }
            } else {
                // editor.select(null);
            }

            // render();
        }
    }

    getIntersects(point, objects) {
        this.mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);

        this.raycaster.setFromCamera(this.mouse, this.camera);

        return this.raycaster.intersectObjects(objects);
    }

    getMousePosition(dom, x, y) {
        var rect = dom.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    }

    private dt: number;
    private animate() {
        // requestAnimationFrame(() => this.animate());
        this.renderer.setViewport(
            0,
            0,
            this.canvas.clientWidth + (this.canvas.width - this.canvas.clientWidth),
            this.canvas.clientHeight + (this.canvas.height - this.canvas.clientHeight)
        );
        this.renderer.render(this.sceneGame, this.camera);

        this.dt = this.renderTime.getDelta();

        this.renderer.autoClear = false;

        this.viewHelper.render(this.renderer);

        this.renderer.autoClear = true;

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
        // this.camera.lookAt(this.sceneGame.position);
    }
}

export const Engine = new EngineControl();
