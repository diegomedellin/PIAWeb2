import { HttpInterceptorFn } from '@angular/common/http';

// Este interceptor se ejecuta antes de cada petición HTTP.
// La idea es agregar automáticamente el token al header si existe.
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // Sacamos el token del localStorage (si hay sesión guardada)
  const token = localStorage.getItem('token');

  // Si existe token, clonamos la petición y le agregamos el header Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // así lo espera el backend
      }
    });
  }

  // Dejamos continuar la petición hacia el backend
  return next(req);
};



