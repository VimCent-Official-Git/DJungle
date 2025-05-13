import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../features/auth/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, status, error } = useSelector((state) => state.auth);

  const roleParam = searchParams.get('role') || 'client';

  useEffect(() => {
    if (user) {
      navigate(user.role === 'DJ' ? '/dj' : '/client');
    }
  }, [user, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es requerido')
      .min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: Yup.string()
      .email('Email inválido')
      .required('El email es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Debes confirmar tu contraseña'),
    role: Yup.string()
      .required('Debes seleccionar un rol')
      .oneOf(['DJ', 'CLIENT'], 'Rol inválido')
  });

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        {roleParam === 'dj' ? 'Registro para DJs' : 'Registro para Clientes'}
      </h1>
      
      <Formik
        initialValues={{ 
          name: '', 
          email: '', 
          password: '', 
          confirmPassword: '', 
          role: roleParam.toUpperCase() 
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(registerUser(values));
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <Field
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tu nombre"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="tu@email.com"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="hidden">
              <Field type="hidden" name="role" />
            </div>

            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'Registrando...' : 'Registrarse'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;