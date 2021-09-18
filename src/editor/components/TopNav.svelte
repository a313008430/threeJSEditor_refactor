<script lang="ts">
    let list: HTMLDivElement,
        enter: boolean = false,
        menus = [
            {
                title: "文件",
                child: [
                    {
                        title: "文件",
                        event: () => {
                            console.log(1);
                        },
                    },
                    { title: "导入" },
                ],
            },
            { title: "编辑", child: [{ title: "拷贝" }, { title: "删除" }] },
            { title: "添加", child: [{ title: "组" }, { title: "正文体" }] },
            { title: "帮助", child: [] },
        ],
        curMenusIdx: number = null;

    function onMouseEnter(e: MouseEvent, idx: number) {
        enter = true;
        curMenusIdx = idx;
        if (!menus[idx].child.length) {
            return;
        }
        let node: HTMLDivElement = e.target as HTMLDivElement;
        list.style.transform = `translateX(${node.offsetLeft}px)`;
    }

    function onMouseOut() {
        enter = false;
    }
</script>

<div class="relative select-none ">
    <div class="overflow-hidden">
        {#each menus as item, i}
            <div
                on:mouseenter={(e) => {
                    onMouseEnter(e, i);
                }}
                on:mouseleave={onMouseOut}
                class="hover:bg-gray-300  hover:text-gray-600 inline-block px-3 cursor-pointer text-gray-500 float-left"
            >
                {item.title}
            </div>
        {/each}
    </div>

    <div
        bind:this={list}
        on:mouseenter={(e) => {
            enter = true;
        }}
        on:mouseleave={onMouseOut}
        class="w-40 absolute bg-gray-200 transition-transform duration-100 "
    >
        {#if menus[curMenusIdx] && menus[curMenusIdx].child?.length && enter}
            {#each menus[curMenusIdx].child as item}
                <div
                    class="hover:bg-pink-800 hover:text-white cursor-pointer px-2"
                    on:click={item.event}
                >
                    {item.title}
                </div>
            {/each}
        {/if}
    </div>
</div>
