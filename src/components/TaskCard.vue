<template>
    <div class="task-card my-style">
        <div>
            <h4>{{ model.title }}</h4>
            <p>{{ model.description }}</p>
        </div>
        <div>
            <button @click="emitOnDone" v-if="!model.status">Done</button> 
            <button @click="emitOnRemove" v-else>Remove</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        model: {
            required: true,
            default: {
                id: 0,
                title: "do something",
                description: 'And do else',
                status: false
            }
        }
    },
    methods: {
        emitOnDone() {
            this.$emit('onDone'); // Генерируем событие onDone при нажатии на кнопку Done
        },
        emitOnRemove() {
            this.$emit('onRemove');
        }
    }
};
</script>

<style scoped>
.task-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button,
input,
.my-style {
    border-radius: 5px;
    border: solid 1px lightcoral;
    padding: 10px;
}
</style>
