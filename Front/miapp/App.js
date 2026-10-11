
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Tus imports originales
import inicio from './src/inicio';
import mascotas from './src/mascotas';
import registrarmascotas from './src/registrarmascotas';
import editarmascota from './src/editarmascota';

const Stack = createNativeStackNavigator();

export default function App() {

  // Lista de mascotas registradas
  const [listaMascotas, setListaMascotas] = useState([]);

  // Contador para generar IDs automáticamente
  const [siguienteId, setSiguienteId] = useState(1);

  // CREAR: Registrar una nueva mascota
  const agregarMascota = (datos) => {
    const nuevaMascota = {
      ...datos,
      id: siguienteId,
    };

    setListaMascotas((anteriores) => [
      ...anteriores,
      nuevaMascota,
    ]);

    setSiguienteId((anterior) => anterior + 1);
  };

  // ACTUALIZAR: Editar una mascota existente
  const editarMascota = (id, datosActualizados) => {
    setListaMascotas((anteriores) =>
      anteriores.map((mascota) =>
        mascota.id === id
          ? { ...mascota, ...datosActualizados }
          : mascota
      )
    );
  };

  // ELIMINAR: Borrar una mascota por su ID
  const eliminarMascota = (id) => {
    setListaMascotas((anteriores) =>
      anteriores.filter((mascota) => mascota.id !== id)
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7952CC',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#F7F4FF',
          },
        }}
      >

        {/* Pantalla de Inicio */}
        <Stack.Screen
          name="Inicio"
          options={{ title: 'Mi Mundo Mascota' }}
        >
          {(props) => React.createElement(inicio, {
            ...props,
            totalMascotas: listaMascotas.length,
          })}
        </Stack.Screen>

        {/* Pantalla de lista de mascotas */}
        <Stack.Screen
          name="Mascotas"
          options={{ title: 'Mis Mascotas' }}
        >
          {(props) => React.createElement(mascotas, {
            ...props,
            mascotas: listaMascotas,
            eliminarMascota: eliminarMascota,
          })}
        </Stack.Screen>

        {/* Pantalla para registrar mascotas */}
        <Stack.Screen
          name="Registrar"
          options={{ title: 'Registrar Mascota' }}
        >
          {(props) => React.createElement(registrarmascotas, {
            ...props,
            agregarMascota: agregarMascota,
          })}
        </Stack.Screen>

        {/* Pantalla para editar mascotas */}
        <Stack.Screen
          name="Editar"
          options={{ title: 'Editar Mascota' }}
        >
          {(props) => React.createElement(editarmascota, {
            ...props,
            mascotas: listaMascotas,
            editarMascota: editarMascota,
          })}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
