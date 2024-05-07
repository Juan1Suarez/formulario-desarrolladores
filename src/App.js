
import './App.css';
import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import provincias from './provincias';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('El nombre completo es requerido')
    .min(4, 'El nombre debe contener al menos 4 letras'),
  DNI: Yup.string()
    .required('El DNI es requerido')
    .matches(/^\d{8}$/, 'El DNI debe contener 8 digitos'),
  provincia: Yup.string().required('La provincia es requerida'),
  localidad: Yup.string()
    .required('La localidad es requerida')
    .min(3, 'La localidad debe contener al menos 3 letras'),
});

function App() {
  return (
    <><h1 className='titulo'>Bienvenidos al registro de desarrolladores </h1>
      <Formik
        initialValues={{
          fullname: '',
          DNI: '',
          localidad: '',
          provincia: ''
        }}
        validationSchema={validationSchema}

        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm();
          actions.setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className='form'>
            <Field className="field"
              type="text"
              name="fullname"
              placeholder="Nombre completo"
            />

            <ErrorMessage name="fullname" component="div" className='color' />

            <Field className="field"
              type="number"
              name="DNI"
              placeholder="DNI"
            />
            <ErrorMessage name="DNI" component="div" className='color' />



            <Typeahead class="form-select form-select-lg mb-3" aria-label="Large select example"
              id="typeaheadProvincia"
              name="provincia"
              labelKey="nombre"
              options={provincias}
              placeholder="Provincia"
              onChange={(selected) => setFieldValue('provincia', selected[0] ? selected[0].nombre : '')}
            />
            <br></br>
            <ErrorMessage name="provincia" component="div" className='color' />

            <Field className="field"
              type="text"
              name="localidad"
              placeholder="Localidad"
            />
            <ErrorMessage name="localidad" component="div" className='color' />

            <button className="boton" type="submit" disabled={isSubmitting}>
              Enviar
            </button>

          </Form>
        )}
      </Formik>

    </>
  );
}

export default App;
