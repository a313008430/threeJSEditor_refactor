/**
 * 全局事件
 */
const enum EventMapGlobal {
    /** 引擎 update 事件 */
    update = "update",
    /** 浏览器resize */
    resize = "resize",
    /** 更新场景尺寸  */
    updateScenesSize = "updateScenesSize",
    /** 渲染 需要传入一个boolean值 true为渲染， false停止渲染 但是会渲染一次 */
    render = "render",
    /** 摇杆控制事件 */
    // control = "control",
    /** 添加一个3d物体 */
    addObject = "addObject",
    /** 删除一个物体 */
    removeObject = "removeObject",
    /** 渲染时间 */
    frameTime = "frameTime",

    onPointerDown = "onPointerDown",
    onPointerUp = "onPointerUp",
    onPointerMove = "onPointerMove",
    onDoubleClick = "onDoubleClick",
    onKeyDown = "onKeyDown",
    onKeyUp = "onKeyUp",
}

/** 物理事件 */
// const enum EventPhysicalMap {
//     /** 碰撞 */
//     collide = "collide",
// }
export { EventMapGlobal };
