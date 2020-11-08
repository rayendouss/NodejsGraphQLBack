const {gql} = require('apollo-server-express')

const me= () =>'rayen'
module.exports ={
    Query:{
        me 
    }
}