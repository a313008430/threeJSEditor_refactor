<script lang="ts">
    import TopMenusConfig from "../../common/config/TopMenusConfig";

    let list: HTMLDivElement,
        enter: boolean = false,
        menus = TopMenusConfig,
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

<div class="relative select-none  z-10">
    <div class="overflow-hidden leading-6">
        {#each menus as item, i}
            <div
                on:pointerenter={(e) => {
                    onMouseEnter(e, i);
                }}
                on:pointerleave={onMouseOut}
                class="hover:bg-gray-300  hover:text-gray-600 inline-block px-3 cursor-pointer text-gray-500 float-left"
            >
                {item.title}
            </div>
        {/each}
    </div>

    <div
        bind:this={list}
        on:pointerenter={(e) => {
            enter = true;
        }}
        on:pointerleave={onMouseOut}
        class="w-40 absolute bg-gray-200 transition-transform duration-100 "
    >
        {#if menus[curMenusIdx] && menus[curMenusIdx].child?.length && enter}
            {#each menus[curMenusIdx].child as item}
                <div
                    class="{item.enabled
                        ? 'hover:bg-pink-800 hover:text-white cursor-pointer '
                        : ' cursor-not-allowed  text-gray-300'}  px-2 py-1"
                    on:click={item.enabled ? item.event : null}
                >
                    {item.title}
                </div>
                {#if item.line}
                    <div class="divide-y divide-gray-300">
                        <div />
                        <div />
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
</div>
