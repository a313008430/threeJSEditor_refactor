<script lang="ts">
    /**
     * 属性标题
     */
    export let title;
    /**
     * 标题追加样式
     */
    export let titleClassName = "";
    /**
     * 文字是否换行
     */
    export let wrap = false;
</script>

<div class="px-3 flex {wrap ? 'flex-wrap' : ''} gap-4">
    <span {title} class={"attr-left-title " + titleClassName}>{title}</span>
    <span class=" flex-grow flex items-center whitespace-nowrap overflow-hidden pl-1">
        <slot />
    </span>
</div>
