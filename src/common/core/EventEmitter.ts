import { EventEmitter } from "eventemitter3";
/** 回头优化一下，使用thee自带的 EventDispatcher  */
const EventGlobal = new EventEmitter();
export { EventGlobal };
