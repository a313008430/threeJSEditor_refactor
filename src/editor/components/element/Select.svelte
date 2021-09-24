<script lang="ts">
    export let value: string | number = null;
    export let list: [string, string | number][] = [];
    /** 任性数据类型  但是第一个必须是key string */
    export let listNoIdx: [string, ...any][] = [];
    export const change: Function = null;
</script>

<select bind:value on:change>
    {#each list as key}
        <option value={key[1]}>{key[0]}</option>
    {/each}
    {#each listNoIdx as key, i}
        <option value={i}>{key[0]}</option>
    {/each}
</select>
