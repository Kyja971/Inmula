import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { authInterceptor } from './core/interceptor/auth-interceptor';
import { errorInterceptor } from './core/interceptor/error-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SocketIoModule.forRoot(AppModule.wsConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),  
   ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public static wsConfig: SocketIoConfig = {
    url: `http://${environment.socketServerUrl}`,
    options: {
      autoConnect: false,
    }
  }
}
