import mongoose from "mongoose"

export default async function connect() {
    try {
        const url = process.env.DATABASE_URL

        if(!url){
            throw new Error('Please Provide database url')
        }

        //checking connection by global
        let cached = global.mongoose

        if(!cached){
            cached = global.mongoose = {
                conn: null,
                promise : null
            }
        }

        if(cached.conn){
            console.log('Cashed Connection Served Successfully')
            return cached.conn
        }

        if(!cached.promise){

            const opts = {
                bufferCommands : true,
                maxPoolSize : 10
            }
            
            cached.promise = mongoose
            .connect(url, opts)
            .then(() => mongoose.connection)
        }
        
        try {
            cached.conn = await cached.promise
        } catch (error:unknown) {
            cached.promise = null
            throw error
        }

        return cached.conn
    
    } catch (error) {
        console.log('E:// Error is occured in connecting to db')
    }
}