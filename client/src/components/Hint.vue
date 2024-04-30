<template>
    <div :class="['hint', {'hint--success' : status}]">
        <p>{{ data }}</p>
    </div>
</template>
  
<script>
export default {
    name: 'Hint',

    props: {
        data: {
            type: String,
            default: 'Empty Hint'
        },
        status: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped lang="sass">
.hint
    position: fixed
    top: 100px
    right: 20px
    max-width: 350px
    background: #ed1c24
    color: white
    padding: 15px
    animation-name: hint
    animation-duration: 3s
    animation-fill-mode: forwards
    transform: translateX(150%)


    &--success
        background: #35b935

    @keyframes hint
        10%
            transform: translateX(0)
        90%    
            transform: translateX(0)
        100%
            transform: translateX(150%)

    &::after
        content: ''
        display: block
        position: absolute
        top: 0
        right: 0
        width: 5px
        height: 100%
        background: black

    & p
        font-size: clamp(12px, 1vw, 16px)
        line-height: 1.5
        font-weight: 600
        
</style>
  