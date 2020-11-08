import { Injectable } from '@angular/core';
import { FormData, Personal, Address, FormDataPaciente, FormUserData, VORoleHospital} from './formData.model';
import { WorkflowService } from '../workflow/workflow.service';
import { STEPS } from '../workflow/workflow.model';
import { RolesUserEnum } from 'src/app/core/domain/enums';

@Injectable()
export class FormDataService {
    isDoctor: boolean = false;
    private formData: FormData = new FormData();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;
    // 
    private formDataPaciente: FormDataPaciente = new FormDataPaciente();
    private formUserData: FormUserData = new FormUserData();
    private hospitalRol: VORoleHospital = new VORoleHospital();
    // private rolHospital: 

    constructor(private workflowService: WorkflowService) {
    }

    setHospitalRol(idHospital){
        this.hospitalRol.idHospital = idHospital;
        this.hospitalRol.roles = [RolesUserEnum.PACIENTE]
    }

    getHospitalRol(){
        var rol : VORoleHospital = {
            idHospital: this.hospitalRol.idHospital,
            roles: this.hospitalRol.roles
        }
        return rol;
    }
   
    setIsDoctor(){
        this.isDoctor = !this.isDoctor
    }

    // FormUserData
    getDataUser(): FormUserData {
        var user: FormUserData = {
            name: this.formUserData.name,
            lastname: this.formUserData.lastname,
            telefono:this.formUserData.telefono,
            email: this.formUserData.email,
            password: this.formUserData.password,
            ci: this.formUserData.ci,
            fechaNacimiento: this.formUserData.fechaNacimiento,
            genero: this.formUserData.genero,
            roles: this.formUserData.roles,
            direccion : this.formUserData.direccion
        }
        return user
    }

    setUser(data: FormUserData) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formUserData.name = data.name;
        this.formUserData.lastname = data.lastname;
        this.formUserData.telefono = data.telefono;
        this.formUserData.email = data.email;
        this.formUserData.password  = data.password;
        this.formUserData.ci = data.ci;
        this.formUserData.fechaNacimiento = data.fechaNacimiento;
        this.formUserData.genero = data.genero;
        this.formUserData.roles = [];
        this.formUserData.direccion = data.direccion;
        this.formUserData.datos_paciente = null;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }

    setPacienteHospital(idHospital:string){
        
        this.formUserData.roles = [{
            idHospital: idHospital, 
            roles: [RolesUserEnum.PACIENTE]
          }]
        //   console.log(this.formDataPaciente)
    }

    getDataPaciente(): FormDataPaciente{
        var paciente: FormDataPaciente = {
            aislado_por: this.formDataPaciente.aislado_por,
            alergia_medicamentos: this.formDataPaciente.alergia_medicamentos,
            es_diagnosticado_cancer:this.formDataPaciente.es_diagnosticado_cancer,
            es_embarazada:this.formDataPaciente.es_embarazada,
            esta_dando_lactar: this.formDataPaciente.esta_dando_lactar,
            familiares_cerco: this.formDataPaciente.familiares_cerco,
            fue_es_fumador:this.formDataPaciente.fue_es_fumador,
            tiene_carnet_discapacidad:this.formDataPaciente.tiene_carnet_discapacidad,
            tiene_diabetes: this.formDataPaciente.tiene_diabetes,
            tiene_diagnosticado_enfermedad:this.formDataPaciente.tiene_diagnosticado_enfermedad,
            tiene_presion_alta:this.formDataPaciente.tiene_presion_alta,
        }
        return paciente;
    }

    // parseInt("17", 8);

    setDataPaciente(data:FormDataPaciente){
        this.formDataPaciente.aislado_por = data.aislado_por;
        this.formDataPaciente.alergia_medicamentos=data.alergia_medicamentos;
        this.formDataPaciente.es_diagnosticado_cancer=data.es_diagnosticado_cancer;
        this.formDataPaciente.es_embarazada=data.es_embarazada;
        this.formDataPaciente.esta_dando_lactar=data.esta_dando_lactar;
        this.formDataPaciente.familiares_cerco=data.familiares_cerco;
        this.formDataPaciente.fue_es_fumador=data.fue_es_fumador;
        this.formDataPaciente.tiene_carnet_discapacidad=data.tiene_carnet_discapacidad;
        this.formDataPaciente.tiene_diabetes=data.tiene_diabetes;
        this.formDataPaciente.tiene_diagnosticado_enfermedad=data.tiene_diagnosticado_enfermedad;
        this.formDataPaciente.tiene_presion_alta=data.tiene_presion_alta;
        // this.formUserData.datos_paciente = {...this.formDataPaciente};
        this.isWorkFormValid = true;
        this.workflowService.validateStep(STEPS.work);
    }

//datos originales

    //Get Personal Tab Data
    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email
        };
        return personal;
    }

    //Set Personal Tab Data
    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }

    //Get Work Tab Data
    getWork(): string {
        // Return the work type
        return this.formData.work;
    }

    //Set Work Tab Data
    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    //Get Address Tab Data
    getAddress(): Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    }
    
    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }

    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
            this.isWorkFormValid &&
            this.isAddressFormValid;
    }
}