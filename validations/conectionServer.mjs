import mongoose from "mongoose";
async function main() {
    try {
        await mongoose.connect(process.env.BD_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: {
                w: 'majority',
                j: true,
                wtimeout: 1000
            },
        });
        console.log("Conectado a MongoDB :D");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
    }
}
export default main