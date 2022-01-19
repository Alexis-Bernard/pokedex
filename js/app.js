const P = new Pokedex.Pokedex()

const app = Vue.createApp({
    data() {
        return {
            pokemonsList: [],
            pokemonsDetailed: [],
            pokemonsSearched: [],
            nbPokemonChargeEachSearch: 20,
            scrollIsAtEndOfPage: false,
            searchText: ''
        }
    },
    methods: {
        async ChargeMore() {
            if (this.pokemonsDetailed.length != this.pokemonsList.length) {
                offset = this.pokemonsDetailed.length

                nbPokemonNotDisplayed = this.pokemonsList.length - this.pokemonsDetailed.length

                if (nbPokemonNotDisplayed < this.nbPokemonChargeEachSearch) {
                    nbPokemonNeedCharged = nbPokemonNotDisplayed
                }
                else {
                    nbPokemonNeedCharged = this.nbPokemonChargeEachSearch
                }

                for (let i = offset; i < offset + nbPokemonNeedCharged; i++) {
                    this.pokemonsDetailed.push(this.pokemonsList[i])

                    this.ChargeDetails(this.pokemonsDetailed[i])
                }
            }
        },
        async ChargeDetails(pokemon) {
            pokemonDetails = await P.getPokemonByName(pokemon.name)
            
            pokemon.types = pokemonDetails.types
            pokemon.abilities = pokemonDetails.abilities
        },
        async handleScroll(event) {
            if (this.searchMode == false && this.scrollIsAtEndOfPage == false && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.scrollIsAtEndOfPage = true

                await this.ChargeMore()

                this.scrollIsAtEndOfPage = false
            }
        },
        searchPokemon() {
            if (this.searchText != "") {
                this.pokemonsSearched = []

                if (+this.searchText){
                    if (this.searchText > 0 && this.searchText < this.pokemonsList.length){
                        this.pokemonsSearched = [this.pokemonsList[this.searchText - 1]]
    
                        this.ChargeDetails(this.pokemonsSearched[0], this.searchText - 1)
                    }
                }
                else if (this.searchText.length > 2) {
                    found = this.pokemonsList.filter(pok => pok.name.includes(this.searchText));

                    if (found){
                        for (let i = 0; i < found.length; i++) {
                            this.pokemonsSearched.push(found[i])
        
                            this.ChargeDetails(this.pokemonsSearched[i])
                        }
                    }
                }
            }
        }
    },
    async mounted() {
        this.offset += this.nbPokemonChargeEachSearch

        const interval = {
            offset: 0,
            limit: 649//898
        }

        this.pokemonsList = (await P.getPokemonsList(interval)).results
        
        id = 0
        this.pokemonsList.forEach(pokemon => { pokemon.id = ++id });

        this.ChargeMore()

        window.addEventListener('scroll', this.handleScroll);
    },
    computed: {
        searchMode(){
            return this.searchText.length > 2 || +this.searchText
        }
    }
})
