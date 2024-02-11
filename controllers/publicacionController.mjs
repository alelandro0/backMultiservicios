import { uploadFileP } from "./uploadPublication.mjs ";
import User  from '../models/user.mjs';


const publicacionpost = async (req, res) => {
  const body = req.body;
  const url = req.files.image;
  try {
      if (url && url.length > 0) {
          // Subir la imagen
          const { imageUrl } = await uploadFileP(url[0]);
          
          // Crear la nueva publicación
          const newPublication = {
              image: imageUrl,  // Usar la URL de la imagen subida
              description: body.description
          };

          // Encontrar al usuario
          const user = await User.findById(req.userId); // Suponiendo que tienes req.userId disponible después de la autenticación

          // Agregar la nueva publicación al usuario
          user.publication.push(newPublication);

          // Guardar los cambios en el usuario
          await user.save();

          return res.status(201).json({ newPublication });
      }
      return res.status(400).json({ message: 'Debes subir una imagen' });
  } catch (error) {
      console.error('Error al crear una nueva publicación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
}

  const publicacionGet=  async (req, res) => {
    try {
      const publications = await Publication.find();
      res.json(publications);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  const postPublication= publicacionpost;
  const getPublication= publicacionGet;
   export {postPublication,getPublication}
