import { ObjectType } from "../../engine/component/CreateObject";
import { EventGlobal } from "../core/EventEmitter";
import { EventMapGlobal } from "../map/EventMap";

const TopMenusConfig = [
    {
        title: "文件",
        child: [
            {
                title: "文件",
                event: () => {
                    console.log(1);
                },
                line: false,
                enabled: false,
            },
            {
                title: "导入",
                event: () => {
                    console.log(1);
                },
                line: false,
                enabled: false,
            },
        ],
    },
    {
        title: "编辑",
        child: [
            {
                title: "拷贝",
                event: () => {
                    console.log(1);
                },
                line: false,
                enabled: false,
            },
            {
                title: "删除",
                event: () => {
                    console.log(1);
                },
                line: false,
                enabled: false,
            },
        ],
    },
    {
        title: "添加",
        child: [
            {
                title: "组",
                event: () => {
                    EventGlobal.emit(EventMapGlobal.addObject, ObjectType.group);
                },
                line: true,
                enabled: false,
            },
            {
                title: "正方体",
                event: () => {
                    EventGlobal.emit(EventMapGlobal.addObject, ObjectType.box);
                },
                line: false,
                enabled: true,
            },
            {
                title: "圆",
                event: () => {
                    EventGlobal.emit(EventMapGlobal.addObject, ObjectType.sphere);
                },
                line: true,
                enabled: true,
            },
            {
                title: "环境光",
                event: () => {
                    EventGlobal.emit(EventMapGlobal.addObject, ObjectType.ambientLight);
                },
                enabled: false,
            },
            {
                title: "平行光",
                event: () => {
                    EventGlobal.emit(EventMapGlobal.addObject, ObjectType.directionalLight);
                },
                line: false,
                enabled: true,
            },
            {
                title: "半光球",
                event: () => {
                    console.log(1);
                },
                line: false,
            },
            {
                title: "点光源",
                event: () => {
                    console.log(1);
                },
                line: false,
            },
        ],
    },
    { title: "帮助", child: [] },
];
export default TopMenusConfig;
