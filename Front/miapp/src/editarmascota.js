
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const imagenPerro = require('../assets/img/perro.png');
const imagenGato = require('../assets/img/gato.png');

export default function EditarScreen({
  navigation,
  route,
  mascotas = [],
  editarMascota,
}) {
  const mascotaId = route.params?.mascotaId;

  const mascota = mascotas.find(
    (item) => item.id === mascotaId
  );

  const [nombre, setNombre] = useState(mascota?.nombre || '');
  const [especie, setEspecie] = useState(mascota?.especie || '');
  const [raza, setRaza] = useState(mascota?.raza || '');
  const [edad, setEdad] = useState(
    mascota ? String(mascota.edad) : ''
  );
  const [propietario, setPropietario] = useState(
    mascota?.propietario || ''
  );
  const [mostrarEspecies, setMostrarEspecies] = useState(false);

  const especies = ['Perro', 'Gato', 'Otro'];

  const obtenerImagen = () => {
    const tipo = especie.trim().toLowerCase();

    if (tipo === 'gato' || tipo === 'gata') {
      return imagenGato;
    }

    return imagenPerro;
  };

  const guardarCambios = () => {
    if (!mascota) {
      Alert.alert('Error', 'No se encontró la mascota.');
      return;
    }

    if (
      !nombre.trim() ||
      !especie.trim() ||
      !raza.trim() ||
      !edad.trim() ||
      !propietario.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Completá todos los campos.'
      );
      return;
    }

    const edadNumero = Number(edad);

    if (!Number.isInteger(edadNumero) || edadNumero < 0) {
      Alert.alert(
        'Edad incorrecta',
        'Ingresá una edad válida en años.'
      );
      return;
    }

    editarMascota(mascotaId, {
      nombre: nombre.trim(),
      especie: especie.trim(),
      raza: raza.trim(),
      edad: edadNumero,
      propietario: propietario.trim(),
    });

    Alert.alert(
      'Actualización exitosa',
      'Los datos de la mascota se actualizaron correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!mascota) {
    return (
      <View style={styles.vacio}>
        <Text style={styles.titulo}>
          Mascota no encontrada
        </Text>
        <TouchableOpacity
          style={styles.botonGuardar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoGuardar}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contenido}
      >
        {/* Imagen de la mascota */}
        <View style={styles.tarjetaPerfil}>
          <Image
            source={obtenerImagen()}
            style={styles.imagen}
            resizeMode="cover"
          />

          <View style={styles.etiquetaId}>
            <Text style={styles.textoId}>
              ID: {mascota.id}
            </Text>
          </View>

          <Text style={styles.nombrePerfil}>
            {mascota.nombre}
          </Text>

          <Text style={styles.descripcionPerfil}>
            {mascota.especie} - {mascota.raza}
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.tarjetaFormulario}>
          <View style={styles.cabecera}>
            <View style={styles.iconoCabecera}>
              <Ionicons
                name="create-outline"
                size={25}
                color="#6840B5"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.tituloFormulario}>
                Modificar Datos
              </Text>
              <Text style={styles.subtitulo}>
                Actualizá la información de tu mascota
              </Text>
            </View>
          </View>

          <Text style={styles.label}>
            Nombre de la mascota
          </Text>
          <View style={styles.campo}>
            <Ionicons
              name="person-outline"
              size={21}
              color="#6840B5"
            />
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Nombre"
            />
          </View>

          <Text style={styles.label}>Especie</Text>
          <TouchableOpacity
            style={styles.campo}
            onPress={() => setMostrarEspecies(!mostrarEspecies)}
          >
            <Ionicons
              name="paw-outline"
              size={21}
              color="#6840B5"
            />
            <Text style={styles.textoSelector}>
              {especie || 'Seleccioná una especie'}
            </Text>
            <Ionicons
              name={mostrarEspecies ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#6840B5"
            />
          </TouchableOpacity>

          {mostrarEspecies && (
            <View style={styles.opciones}>
              {especies.map((opcion) => (
                <TouchableOpacity
                  key={opcion}
                  style={styles.opcion}
                  onPress={() => {
                    setEspecie(opcion);
                    setMostrarEspecies(false);
                  }}
                >
                  <Text style={styles.textoOpcion}>
                    {opcion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Raza</Text>
          <View style={styles.campo}>
            <Ionicons
              name="fitness-outline"
              size={21}
              color="#6840B5"
            />
            <TextInput
              style={styles.input}
              value={raza}
              onChangeText={setRaza}
              placeholder="Raza"
            />
          </View>

          <Text style={styles.label}>Edad (años)</Text>
          <View style={styles.campo}>
            <Ionicons
              name="calendar-outline"
              size={21}
              color="#6840B5"
            />
            <TextInput
              style={styles.input}
              value={edad}
              onChangeText={setEdad}
              keyboardType="number-pad"
              placeholder="Edad"
            />
          </View>

          <Text style={styles.label}>
            Nombre del propietario
          </Text>
          <View style={styles.campo}>
            <Ionicons
              name="person-circle-outline"
              size={21}
              color="#6840B5"
            />
            <TextInput
              style={styles.input}
              value={propietario}
              onChangeText={setPropietario}
              placeholder="Propietario"
            />
          </View>

          <TouchableOpacity
            style={styles.botonGuardar}
            onPress={guardarCambios}
          >
            <Ionicons
              name="save-outline"
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.textoGuardar}>
              Guardar Cambios
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonCancelar}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="close-outline"
              size={23}
              color="#6840B5"
            />
            <Text style={styles.textoCancelar}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pie}>
          Gracias por cuidar de tus mejores amigos
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FF',
  },
  contenido: {
    padding: 17,
    paddingBottom: 35,
  },
  tarjetaPerfil: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 20,
  },
  imagen: {
    width: '100%',
    height: 195,
    borderRadius: 16,
    backgroundColor: '#EDE3FF',
  },
  etiquetaId: {
    position: 'absolute',
    top: 22,
    right: 22,
    backgroundColor: '#6840B5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  textoId: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  nombrePerfil: {
    fontSize: 24,
    fontWeight: '800',
    color: '#302052',
    marginTop: 13,
  },
  descripcionPerfil: {
    fontSize: 14,
    color: '#7952CC',
    marginTop: 4,
    marginBottom: 10,
  },
  tarjetaFormulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 20,
    elevation: 3,
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  iconoCabecera: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#EDE3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  tituloFormulario: {
    fontSize: 20,
    fontWeight: '800',
    color: '#302052',
  },
  subtitulo: {
    fontSize: 12,
    color: '#8B7AA9',
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#302052',
    marginTop: 17,
    marginBottom: 9,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 54,
    borderWidth: 1,
    borderColor: '#DDD3F0',
    borderRadius: 13,
    backgroundColor: '#FCFAFF',
    paddingHorizontal: 14,
    gap: 11,
  },
  input: {
    flex: 1,
    color: '#30283D',
    fontSize: 14,
    paddingVertical: 12,
  },
  textoSelector: {
    flex: 1,
    color: '#30283D',
    fontSize: 14,
  },
  opciones: {
    borderWidth: 1,
    borderColor: '#DDD3F0',
    borderRadius: 12,
    marginTop: 6,
    overflow: 'hidden',
  },
  opcion: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAF8',
  },
  textoOpcion: {
    color: '#5836A5',
    fontSize: 15,
  },
  botonGuardar: {
    backgroundColor: '#6840B5',
    borderRadius: 14,
    paddingVertical: 17,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textoGuardar: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botonCancelar: {
    borderWidth: 1.5,
    borderColor: '#7952CC',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  textoCancelar: {
    fontSize: 16,
    color: '#6840B5',
    fontWeight: 'bold',
  },
  vacio: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#F7F4FF',
  },
  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#5836A5',
    textAlign: 'center',
  },
  pie: {
    textAlign: 'center',
    color: '#7952CC',
    fontSize: 13,
    marginTop: 25,
    fontWeight: '600',
  },
});
