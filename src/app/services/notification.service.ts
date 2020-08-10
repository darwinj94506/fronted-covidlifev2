import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltrarSeguimientoOut, LoginOut } from '../core/domain/outputs';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'key=AAAAPF0UZl8:APA91bHpp0-YTRUkw3euurLDJbu6ds62sbI-Jx6YLPO5nSWCt4XvfODXpxZuSnF0EFMHCXf6Gn0O4n0ZwS8gurbo3xo_gPJcWDdrd_l5mQJfm3usipKp9u1CxW-A2eamYsdcMCKohHuU'
    })
  };

@Injectable({ providedIn: 'root' })
export class NotificationService {
    
    constructor(private httpClient: HttpClient){}
   
    sendMovilNotification(message:String, title:String, seguimiento?: FiltrarSeguimientoOut, doctor?: LoginOut): Observable<any>{
        return this.httpClient.post<any>('https://fcm.googleapis.com/fcm/send', {            
                to: seguimiento.idPaciente.token_notificacion_movil,
                priority:"high",
                notification: {
                    body: message,
                    title: title,
                    sound: "default"
                },
                data: { 
                    idSeguimiento: seguimiento._id,
                    nombreDoctor: `${doctor.name} ${doctor.lastname}`,
                    nombrePaciente:`${seguimiento.idPaciente.name} ${seguimiento.idPaciente.lastname}`,
                    click_action: "FLUTTER_NOTIFICATION_CLICK",
                }
            }, httpOptions );
    }

}