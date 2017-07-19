let template = `
<div class="card" :class="selectedClass" @click="select" v-if="card">
    <img :src="imgPath" />
</div>
`

export const card = {
    template : template,
    props : ['card', 'selected'],
    data(){
        return {
        }
    },
    computed : {
        imgPath: function(){
            return '../../img/cartes/' + this.card.getPath() + '.jpeg' 
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