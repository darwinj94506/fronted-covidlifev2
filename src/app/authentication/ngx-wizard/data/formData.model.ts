import { VORoleHospitalIn } from "src/app/core/domain/inputs/vo-role-hospital.in";
import { UserGeneroEnum, UserAisladoPorEnum } from "src/app/core/domain/enums";
import { VOPacienteIn } from "src/app/core/domain/inputs";

//Wizard form data class Starts
export class FormUserData {
    name: String = '';
    lastname: String = '';
    ci: String = '';
    email: String = '';
    password: String = '';   
    roles: VORoleHospitalIn [];
    telefono?: String = '';
    fechaNacimiento: Date = null ;
    genero: UserGeneroEnum = null;
    latitud?: number;
    longitud?: number;
    direccion?: String = '';
    datos_paciente?: VOPacienteIn = null
    token_notificacion_movil?: String
    token_notificacion_web?: String
}
export class FormDataPaciente{
    aislado_por: UserAisladoPorEnum = null;
    alergia_medicamentos: String ='';
    tiene_diagnosticado_enfermedad: String ='';
    es_diagnosticado_cancer: Boolean = null;
    es_embarazada: Boolean = null;
    esta_dando_lactar: Boolean = null;
    fue_es_fumador: Boolean = null;
    tiene_carnet_discapacidad: Boolean = null;
    tiene_diabetes: Boolean = null;
    tiene_presion_alta: Boolean = null;
    familiares_cerco: number = null;
    id_seguimiento_inicial?: String ='';
}



export class FormData {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    work: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';

    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
}
//Wizard form data class Ends

//Personal tab data class starts
export class Personal {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
}
//Personal tab data class ends

//Address tab data class starts
export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}
//Address tab data class Ends