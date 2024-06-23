import mongoose from 'mongoose';

interface Options {
  mongoUrl: string;
  dbName: string;
}



export class MongoDatabase {

  static async connect(options: Options) {

    const { dbName, mongoUrl } = options;

    try {

      await mongoose.connect( mongoUrl, {
        dbName: dbName,
      });
    // const DB_HOST = process.env.DATABASE_HOST || "localhost";
    // const DB_PORT = process.env.DATABASE_PORT || "27017";
    
    // const mongodbConnection = `mongodb://${DB_HOST}:${DB_PORT}`;
    // console.log("url", mongodbConnection)
    //     await mongoose.connect(mongodbConnection);


      console.log('Mongo connected');
      return true;
      
    } catch (error) {
      console.log('Mongo connection error');
      throw error;
      
    }
  }
}