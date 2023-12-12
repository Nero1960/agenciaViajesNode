import express from 'express';
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales,
    paginaDetalleViaje 
} from '../controllers/paginasControllers.js';

import {
    guardarTestimonial
} from '../controllers/guardarTestimonial.js'

const router = express.Router();

router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/testimoniales', paginaTestimoniales);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);
router.post('/testimoniales', guardarTestimonial)



export default router;