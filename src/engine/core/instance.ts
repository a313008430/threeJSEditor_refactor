/**
 * 实例列表
 */
const instanceList:Map< number, {new ():void}> = new Map();

/**
 * 实例的id
 */
let instanceId:number = 100;

/**
 * 单例装饰器
 */
export function instance(target: any, key: string){
    if(!instanceList.has(target["#instanceId"])){
        instanceId++;
        target["#instanceId"] = instanceId;
        instanceList.set(instanceId, new target())
    }
    target[key] = instanceList.get(instanceId)
}