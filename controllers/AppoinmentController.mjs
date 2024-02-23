import Cita from '../models/AppointmentModel.mjs';
import User from '../models/user.mjs'; 


export const createAppointment = async (req, res) => {
    try {
        const { title, date, description, userId, estado } = req.body;

        // Verifica si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verifica que el estado proporcionado esté dentro de las opciones permitidas
        if (estado && !['pendiente', 'aceptada', 'rechazada'].includes(estado)) {
            return res.status(400).json({ message: 'Estado de cita no válido' });
        }

        // Crea la cita utilizando el modelo de cita
        const cita = await Cita.create({
            title,
            nombre: user.name,
            date,
            description,
            userId,
            estado: estado || 'pendiente' // Asigna 'pendiente' si no se proporciona ningún estado
        });

        res.status(201).json(cita);
    } catch (err) {
       
        res.status(400).json({ message: err.message }); // Cambio de código de estado a 400 en caso de error
    }
};

// Controlador para actualizar una cita
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const cita = await Cita.findByIdAndUpdate(id, { estado }, { new: true });
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json(cita);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const getUsers = async (req, res) => {
    try {
      // Consultar todos los usuarios en la base de datos
      const users = await User.find({ roll: 'Profesional' });
  
      // Enviar la respuesta con los usuarios encontrados
      res.status(200).json(users);
    } catch (error) {
      // Manejar cualquier error que ocurra durante la consulta a la base de datos
      console.error('Error al obtener usuarios:', error.message);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  };