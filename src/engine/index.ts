import * as THREE from "three";
import { EventGlobal } from "../common/core/eventEmitter";
import { EventMapGlobal } from "../common/map/EventMap";

export class Engine {
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
        // this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, true);
        // console.log(canvas.clientWidth, canvas.clientHeight);

        this.sceneGame = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

        this.tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
        this.canvasOldHeight = canvas.clientHeight;

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.sceneGame.add(cube);

        this.camera.position.z = 5;

        this.animate();
        EventGlobal.addListener(EventMapGlobal.update, () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });

        EventGlobal.addListener(EventMapGlobal.resize, this.resize, this);
        EventGlobal.addListener(EventMapGlobal.updateScenesSize, this.resize, this);
    }

    private dt: number;
    private animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.sceneGame, this.camera);
        this.dt = this.renderTime.getDelta();
        EventGlobal.emit(EventMapGlobal.update, this.dt);
    }

    private resize() {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.fov =
            (360 / Math.PI) *
            Math.atan(this.tanFOV * (this.canvas.clientHeight / this.canvasOldHeight));

        this.camera.updateProjectionMatrix();
        this.camera.lookAt(this.sceneGame.position);
        // this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
    }
}
