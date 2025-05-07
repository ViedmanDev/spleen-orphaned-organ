// src/pages/personal-diseases/gdtm.jsx

import React from 'react';
import { Canvas } from '@react-three/fiber';
// import { Suspense } from 'react'; // solo si usas modelos 3D cargados dinámicamente

function InfartoEsplenico() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Infarto Esplénico</h1>

      {/* Sección 1: ¿Qué es la enfermedad? */}
      <section>
        <h2>¿Qué es?</h2>
        <p>
          El infarto esplénico es una condición médica en la que se produce la necrosis (muerte del tejido)
          del bazo debido a una interrupción del flujo sanguíneo. Generalmente se debe a una obstrucción
          en la arteria esplénica o una de sus ramas.
        </p>
        <p>
          Puede estar asociado con trastornos hematológicos, estados de hipercoagulabilidad, infecciones,
          trauma o enfermedades autoinmunes.
        </p>

        <div style={{ height: '400px', marginTop: '1rem' }}>
          {/* Aquí va el modelo 3D */}
          <Canvas>
            {/* <Suspense fallback={null}> */}
            {/*     <Modelo3DInfarto /> */}
            {/* </Suspense> */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
          </Canvas>
        </div>
      </section>

      {/* Sección 2: Síntomas */}
      <section>
        <h2>Síntomas</h2>
        <ul>
          <li>Dolor agudo en el cuadrante superior izquierdo del abdomen</li>
          <li>Fiebre</li>
          <li>Náuseas o vómitos</li>
          <li>Malestar general</li>
        </ul>
        {/* 3D en el futuro */}
      </section>

      {/* Sección 3: Tratamiento */}
      <section>
        <h2>Tratamiento</h2>
        <p>
          El tratamiento puede ser conservador en casos leves, con manejo del dolor, antibióticos
          y control de condiciones subyacentes. En casos más graves, puede requerirse cirugía
          como esplenectomía (extirpación del bazo).
        </p>
      </section>

      {/* Sección 4: Prevención y Cuidados */}
      <section>
        <h2>Prevención y Cuidados</h2>
        <ul>
          <li>Control adecuado de enfermedades predisponentes (como lupus o anemia falciforme)</li>
          <li>Hidratación y anticoagulación si el médico lo indica</li>
          <li>Evitar el sedentarismo y mantener una dieta equilibrada</li>
        </ul>
      </section>

      {/* Comparación con trombosis esplénica */}
      <section style={{ marginTop: '2rem', backgroundColor: '#f2f2f2', padding: '1rem', borderRadius: '8px' }}>
        <h2>¿En qué se diferencia del trombosis esplénica?</h2>
        <p>
          Aunque ambas afectan el flujo sanguíneo en el bazo, la **trombosis esplénica** consiste en
          la formación de un coágulo dentro de la vena esplénica, mientras que el infarto esplénico
          afecta típicamente a la arteria y causa muerte del tejido. La trombosis puede llevar a
          congestión y esplenomegalia, pero no siempre causa necrosis.
        </p>
      </section>
    </div>
  );
}

export default InfartoEsplenico;
