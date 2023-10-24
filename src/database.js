import { connect } from "mongoose";

(async()=>{
    try{
        const db=await connect('mongodb://127.0.0.1/chat');
        console.log("connected to db:", db.connection.name)
    }catch(error){
        console.error(error)
    }
})();