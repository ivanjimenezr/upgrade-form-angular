import { UserRegister } from './../models/UserRegister';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comparePassword } from './customValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // Incialización del formulario
  public userRegisterForm: FormGroup;
  
  // variable submitted a false
  public submitted : boolean  = false;

  // Inicializamos FormBuilder en el constructor
  constructor(private formBuilder: FormBuilder) {
    // Nuestro formulario - sin campos por defecto
		 // Podemos meter valores por defecto en las comillas
     this.userRegisterForm = this.formBuilder.group({
       name: ['', [Validators.required, Validators.maxLength(20)]],
       password: ['', [Validators.required, Validators.maxLength(20)]],
       passwordRepeat: ['', [Validators.required, Validators.maxLength(20)]],
     },
     {
      // Validación custom de password
      validator: comparePassword('password', 'passwordRepeat')
    }
     );
  }

  ngOnInit(): void {
  }

//Función accionada al clickar en submit
public onSubmit(): void {
  // El usuario ha pulsado en submit->cambia a true submitted
  this.submitted = true;
  // Si el formulario es valido
  if (this.userRegisterForm.valid) {
    // Creamos un Usuario y lo emitimos
    const user: UserRegister = {
      name: this.userRegisterForm.get('name')?.value,
      password: this.userRegisterForm.get('password')?.value,
      passwordRepeat: this.userRegisterForm.get('passwordRepeat')?.value,

    };
    console.log(user);
    // Reseteamos todos los campos y el indicador de envío o submitted
    this.userRegisterForm.reset();
    this.submitted = false
  }
}

}
