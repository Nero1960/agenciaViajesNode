import { Viaje } from "../models/Viajes.js"
import { Testimonial } from "../models/Testimoniales.js"

//request: lo que enviamos. response: lo que express nos responde
const paginaInicio = async (request,response)  => {

    //consultar 3 viajes del modelo viaje
    try {

        //realizar multiples consultas con promesas
        const promiseDB = [];
        promiseDB.push(Viaje.findAll({ limit: 3 }));
        promiseDB.push(Testimonial.findAll({ limit: 3 }));
        const resultado = await Promise.all( promiseDB );

        response.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
        
    } catch (error) {
        console.log(error);
    }
   
};

const paginaNosotros = (request, response ) => {
    response.render('nosotros', {
        pagina: 'Nosotros'
    })

};

const paginaViajes = async (request, response) => {

    //consultar base de datos
    const viajes = await Viaje.findAll();
    
    
    response.render('viajes', {
        pagina: 'Viajes',
        viajes
    })
}

const paginaDetalleViaje = async (request, response) => {
    console.log(request.params);

    const { slug } = request.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug }});
        console.log(viaje);

        response.render('viaje', {
            pagina: 'Información viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
   
}


const paginaTestimoniales = async (request, response) => {

    try {

        const testimoniales = await Testimonial.findAll();

        response.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
        
    } catch (error) {
        console.log(error);
        
    }



    
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimoniales
}