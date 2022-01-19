app.component('pokemon', {
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    },
    template:
        /*html*/
        `<div class="col s12 m6 l3">
            <div class="card small pokemon">
                <div class="card-content center-align">
                    <img class="activator responsive-img waves-effect pokemonImage" :src="image">

                    <span class="card-title activator grey-text">
                        {{ this.number }}
                    </span>

                    <span class="card-title activator grey-text text-darken-4">
                        {{ this.pokemon.name }}
                    </span>
                </div>

                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4 center-align">
                        {{ this.pokemon.id }}. {{ this.pokemon.name }}
                    </span>
                    
                    <h6>Types :</h6>
                    <ul>
                        <li v-for="type in pokemon.types"> - {{ type.type.name }}</li>
                    </ul>

                    <h6>Abilities :</h6>
                    <ul>
                        <li v-for="ability in pokemon.abilities"> - {{ ability.ability.name }}</li>
                    </ul>
                </div>
            </div>
        </div>`,
    data() {
        return {
            
        }
    },
    computed: {
        image() {
            return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + this.pokemon.id + '.svg'
        },
        number() {
            return '#' + ('000' + this.pokemon.id).substr(-3)
        }
    }
})