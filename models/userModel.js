const db = require('../db/knex.js')
const auth = require('../authService')

class UserModel {
    static getAll(){
        return db('users')
    }
    static getOne(id){
        return db('users').where({id}).first()    
    }
    static async getWithEmail(email){
        return db('users')
    }
    static checkEmail(email){
        return db('users').where({email}).first()
            .then(res => {
                return res ? res : false
            })
    }
    static update(id, data){
        // Placeholder; data should be verified 
        return db('users').where({id}).update(data)
    }
    static async create(data, req){
        //Checks if email is taken. True means email is taken, false it is not.
        const emailTaken = await this.checkEmail(data.email)
        if (emailTaken) return {message: 'That email is taken'}
        // Sends to authService to hash password and delete plaintext password
        let hashedData = await auth.signup(data)
        // Adds active propery to data
        hashedData.active = true
        return db('users').insert(hashedData).returning('*')
    }
    static async verify({email, password}) {
        // Check and see if a user exists, checkEmail returns user data if true, undefined if false
       const userData= await this.checkEmail(email)
       if(!userData) { return {error: 'No user exists with that email'} }
       else {
        const { hashed_password } = userData
        const verification = await auth.verifyPassword(password, hashed_password)
        if(!verification) { return {error: 'The password is incorrect'}}
        const token = await auth.newToken(userData)
        return {token}
       }
        // If no user, send them to a signup form
    }
}

module.exports = UserModel