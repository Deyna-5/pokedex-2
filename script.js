var q = 0

document.addEventListener("DOMContentLoaded", function(){
       twentypokemons()
       document.getElementById("btn").addEventListener('click', function(){
              twentypokemons()
       })
})

function twentypokemons(){
       fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${q}&limit=20`)
       .then(res => res.json())
       .then(data => {
              data.results.forEach(pokemon => {
                     fetch(`${pokemon.url}`)
                     .then(res => res.json())
                     .then(data =>{
                            
                            var abilities = []
                            data.abilities.forEach(abilitie => {
                                   abilities.push(abilitie.ability.name)
                            })

                            var moves = []
                            var firstFive = data.moves.slice(0,5)
                            firstFive.forEach(move => {
                                   moves.push(move.move.name)
                            })

                            document.getElementById('pokemons').innerHTML +=
                            `
                            <div class="card my-2 p-3 w-50 mx-auto">
                                   <img class="card-img-top w-25 h-25 align-self-center" src="${data.sprites.front_default}" alt="Card image cap">
                                   <div class="card-body text-center font-weight-bold">
                                          <p>${data.name}</p>
                                          <button type="button" id="btn-pok" class="btn btn-primary mx-3" data-toggle="modal" data-target="#pokeModal" data-name="${data.name}" data-type="${data.types[0].type.name}" data-abilities="${abilities}" data-moves="${moves}">
                                                 ¡Quiero saber más de este Pokemon!
                                          </button>
                                   </div>
                            </div>
                            `

                            fetch (`${data.types[0].type.url}`)
                            .then(res => res.json())
                            .then(data => {
                                   var generation = data.generation.name
                                   document.getElementById('btn-pok').setAttribute('data-generation', generation)
                            })

                     })

              })
              q += 20
       })
}

$('#pokeModal').on('show.bs.modal', function (event) {
       var button = $(event.relatedTarget)
       var pokemon = button.data('name')
       var type = button.data('type')
       var generations = button.data('generation')
       var abilities = button.data('abilities')
       var moves = button.data('moves')
       var modal = $(this)
       modal.find('.modal-title').text(pokemon)
       modal.find('.type').text(type)
       modal.find('.generations').text(generations)
       modal.find('.abilities').text(abilities)
       modal.find('.moves').text(moves)
})
