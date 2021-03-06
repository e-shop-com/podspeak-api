const db = require('../db/knex.js')
const userModel = require('./userModel')

class ReactionModel{
    static getAll(){
        return db('reactions')
    }
    static getOne(id){
        return db('reactions').where({id}, '*').first()
    }
    static create(data){
        return db('reactions').insert(data).returning('*')
            .then(res => {
                return res[0]
            })
    }

    static filterByTimestamp(arr, timestamp) {
        return arr.filter(item => {
            let reactionTime = item.episode_timestamp.split(':')
            return parseInt(timestamp) === parseInt(reactionTime[1]) ? item : null
        })
    }

    static getByEpisode(episode_id, timestamp){
        return db('reactions').where({episode_id})
            .then(allReactions => {
                return timestamp ? this.filterByTimestamp(allReactions, timestamp) : allReactions
            })
    }

}

module.exports = ReactionModel
