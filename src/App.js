
import './App.css';
import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.min.css';
import provincias from './provincias';
import { Formik, Field, Form, ErrorMessage  } from 'formik';

function App() {
  const [provincia, setProvincia] = useState([]);
  return (
    <><h1 className='titulo'>Bienvenidos al registro de desarrolladores </h1>
      <Formik
        initialValues={{
          fullname: '',
          DNI: '',
          localidad: '',
          provincia: ''
        }}
        validate={values => {
          const errors = {};

          if (!values.fullname) {
            errors.fullname = 'El nombre completo es requerido';
          }
          else if (values.fullname.length < 4) {
            errors.fullname = 'El nombre debe contener al menos 4 letras'
          }

          if (!values.DNI) {
            errors.DNI = 'El DNI es requerido';
          }
          else if (!/^\d{8}$/.test(values.DNI)) {
            errors.DNI = 'El DNI debe contener 8 digitos'
          }

          if (!values.localidad) {
            errors.localidad = 'La localidad es requerida';
          }
          else if (values.localidad.length < 3) {
            errors.localidad = 'La localidad debe contener al menos 3 letras'
          }

          if (!values.provincia) {
            errors.provincia = 'Selecciona una provincia';
          }


          return errors;
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
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
              selected={provincia}
              onChange={setProvincia}
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
              Submit
            </button>

          </Form>
        )}
      </Formik>

    </>
  );
}

export default App;
