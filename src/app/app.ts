import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  modelo_iot: string = '';
  codigo_imei: string = '';

  async registrarGps() {
    if (!this.modelo_iot || !this.codigo_imei) {
      alert('Por favor rellenar todos los campos');
      return;
    }

    const datosFormulario = {
      modelo_iot: this.modelo_iot,
      codigo_imei: this.codigo_imei
    };

    try {
      const respuesta = await fetch('http://127.0.0.1:5000/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosFormulario)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.status === 'ok') {
        alert('Registro completado con exito');
        this.modelo_iot = '';
        this.codigo_imei = '';
      } else {
        // Ahora nos mostrará el mensaje real de Postgres aquí sin trabarse
        alert('Error en Servidor:\n' + (resultado.error || 'No se pudo procesar'));
      }
    } catch (error) {
      alert('Error critico de conexion con Python');
    }
  }
}