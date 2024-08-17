

import db from "../db.js"
const resolvers={
    Query:{
        games() {
            return db.games
        },
        reviews(){
            return db.reviews
        },
        review(_,args){
            return db.reviews.find((review)=>review.id===args.id)
        },
        game(_,args){
            return db.games.find((game)=>game.id===args.id)
        },
        author(_,args){
            return db.authors.find((author)=>author.id===args.id)
        },
        authors(){
          return db.authors
        }
    },
    Game:{
        reviews(parent) {
        return db.reviews.filter((r)=>r.game_id===parent.id)
        }
    },
    Author:{
        reviews(parent) {
        return db.reviews.filter((r)=>r.author_id===parent.id)
        }
    },
    Review:{
        author(parent) {
        return db.authors.find((a)=>a.id===parent.author_id)
        },
        game(parent) {
        return db.games .find((a)=>a.id===parent.game_id)
        }
    },
    Mutation:{
        deleteGame(_,args){
            db.games=db.games.filter((g)=>g.id!==args.id)
            return db.games
        },
        addGame(_,args){
          let game={
              ...args.game,
              id:Math.floor(Math.random()*1000).toString()
          }
          db.games.push(game)
            return game
        },
        editGame(_,args){
            db.games=db.games.map((g)=>{
                if(g.id===args.id){
                    return {...g,...args.edits}
                }
                return g
            })

            return db.games.find((g)=>g.id===args.id)
        }
    }
}

export default resolvers
