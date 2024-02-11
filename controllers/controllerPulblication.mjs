import User from '../models/user.mjs';
import { uploadFileP } from './uploadPublication.mjs';

const postPublication = async (req, res) => {
    const image = req.files.file; // Obtener el primer archivo
    const description = req.body.description; // Obtener la primera descripción
    const userId = req.user.id;
    try {
        const userToUpdate = await User.findById(userId);

        if (!userToUpdate) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const { downloadURL } = await uploadFileP(image[0]);
        console.log('Inicio de la URL:', downloadURL);

        userToUpdate.publication.push({
            image: downloadURL,
            description: description
        });

        await userToUpdate.save();
        console.log('URLs de las imágenes correctas:', downloadURL);
        return res.status(201).json({ message: 'Publicación realizada exitosamente.', downloadURL });
    } catch (error) {
        console.error('Error en la publicación de las imágenes:', error);
        return res.status(500).json({ message: 'Ocurrió un error en la publicación de las imágenes.' });
    }
};

const getPublication = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne(userId);
        // Verificar si el ID de usuario es válido
        if (!user) {
            return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
        }
        // Verificar si el usuario existe en la base de datos
        

        // Obtener todas las publicaciones del usuario
        const publications = user.publication.map(pub => ({
            image: pub.image,
            description: pub.description
        }));
        console.log("BD get publicacion ",publications);
        return res.status(200).json({ publications });
    } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export { postPublication, getPublication };