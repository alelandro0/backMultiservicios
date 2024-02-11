// routes.js (o tu archivo de rutas)
import express  from 'express';
const router = express.Router();
import { postPublication,getPublication } from "../controllers/publicacionController.mjs";


router.get('/',  async (req, res, next) => {
    try {
      await getPublication(req, res, next);
    } catch (error) {
      next(error);
    }
  });
  
  // Crear una nueva publicación
  router.post('/',  async (req, res, next) => {
    try {
      await postPublication(req, res, next);
    } catch (error) {
      next(error);
    }
  });

export default router;
