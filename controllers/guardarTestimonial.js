import { Testimonial } from '../models/Testimoniales.js'
const guardarTestimonial = async (request, response ) => {

    //leer datos del formulario
    const { nombre, correo, mensaje } = request.body;
    const errores = [];

    if( nombre.trim() === ''){
        errores.push({mensaje : 'El Nombre esta vacío'})
    }
    if( correo.trim() === ''){
        errores.push({mensaje : 'El correo esta vacío'})
    }
    if( mensaje.trim() === ''){
        errores.push({mensaje : 'El Mensaje esta vacío'})
    }

    if(errores.length > 0){

        //consultar los testimoniales previos
        const testimoniales = await Testimonial.findAll();
        //mostrar vista con errores
        response.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })

    } else {
        //almacenar en la base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            response.redirect('/testimoniales')
            
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}