const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {ApolloServer} =require('apollo-server-express');
const http=require("http")
const path=require("path")
const {fileLoader,mergeTypes, mergeResolvers} = require("merge-graphql-schemas")
const app = express()


const db = async() =>{
    try {
      const success= await mongoose.connect(process.env.DATABASE_CLOUD,{
          useNewUrlParser : true ,
          useUnifiedTopology: true ,
          useCreateIndex :true ,
          useFindAndModify : true  
           });
           console.log("db connected")
    }catch(error){
       console.log('db connection error ' ,error)
    }
}
db();

//typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})
//middleware
apolloServer.applyMiddleware({app});
const httpserver = http.createServer(app)



app.listen(process.env.PORT, function(){
    console.log(`server is ready at  port ${process.env.PORT}`)
    console.log(`GraphQl server is ready at  port ${process.env.PORT}${apolloServer.graphqlPath}`)
})
