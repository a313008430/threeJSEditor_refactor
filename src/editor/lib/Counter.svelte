<script lang="ts">
    let count: number = 0;
    const increment = () => {
        count += 1;
    };
</script>

<button
    class=" py-4 px-8 bg-yellow-500 bg-opacity-10 rounded-3xl w-52 cursor-pointer focus:ring-2 focus:ring-yellow-500 text-yellow-600"
    on:click={increment}
>
    Clicks: {count}
</button>

<div class="nav-btn">sadfasdf</div>
