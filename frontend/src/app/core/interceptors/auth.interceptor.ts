import { HttpInterceptorFn } from '@angular/common/http';

// Interceptor que se ejecuta antes de cada petición HTTP.
// Su único objetivo es revisar si hay un token guardado
// y, si existe, agregarlo a los headers para que el backend
// reconozca al usuario autenticado.
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Sacamos el token del localStorage (si el usuario inició sesión antes)
  const token = localStorage.getItem('token');

  // Si tenemos token, clonamos la petición y le agregamos el header Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // formato estándar que espera el backend
      }
    });
  }

  // Dejamos que la petición continúe normalmente
  return next(req);
};

