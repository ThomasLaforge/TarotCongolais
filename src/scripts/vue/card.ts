let template = `
<div class="card" :class="selectedClass" @click="select">
    <img :src="imgPath" />
</div>
`

export const card = {
    template : template,
    props : ['value', 'selected'],
    data(){
        return {
        }
    },
    computed : {
        imgPath: function(){ 
            return '../../img/cartes/' + this.value + '.jpeg' 
        },
        selectedClass: function(){
            return this.selected ? 'card-selected' : 'card-not-selected'
        }
    },
    components: {
    },
    methods: {
        select(){
            this.$emit('selection')
        }
    }
}