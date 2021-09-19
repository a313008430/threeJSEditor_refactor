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
    /** 摇杆控制事件 */
    // control = "control",

    onPointerDown = "onPointerDown",
    onPointerUp = "onPointerUp",
    onPointerMove = "onPointerMove",
}

/** 物理事件 */
// const enum EventPhysicalMap {
//     /** 碰撞 */
//     collide = "collide",
// }
export { EventMapGlobal };
