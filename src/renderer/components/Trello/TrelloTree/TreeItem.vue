<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{ board.name }}</strong>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        props: ['board'],
    };
</script>