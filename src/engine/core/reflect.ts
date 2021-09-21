/**
 * 元数据管理器
 * @deprecated 当有启用第一个装饰器方法的时候，在源码的地方就会生成一个现在这样的方法，里面会判定 Reflect.metadata 是否是一个方法，然后会把元数据的 type 和 值 传过来 这个值 是根据泛型的名字创建的
 * 
 * @example 
 *   function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }
 */

/** 缓存所有依赖的数据 */
// const metaData = new Map();

Object.assign(Reflect, {
	/**
	 * @param metadataKey 目前这个key暂时为design:type 其它的需要暂时看用途
	 * metadataValue 返回的是一个方法，如果是string number等系统类型话就会有名称分别对String Number等，
	 * 如果是自定义的泛型类型，在开发模式下会以类为名称，如果混淆以后，类的name字段就没了，需要用装饰方法给类单独绑定唯一ID，
	 */
	metadata: function (metadataKey: string, metadataValue: any) {
		// console.log(metadataValue.prototype);
		// console.log(metadataKey, metadataValue, metadataValue.name);
		// console.log(typeof metadataValue);
		// console.log(Reflect.get());

		function decorator(target:any, propertyKey:any) {
			// console.log(target, propertyKey);
		}
		return decorator;
	},
});

export class ReflectControl {}
