
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

// COMPONENTE FUERA DE REGISTRARSCREEN
// Esto evita que el teclado pierda el foco al escribir.
function Campo({
  titulo,
  icono,
  valor,
  cambiar,
  placeholder,
  teclado = 'default',
}) {
  return (
    <View style={styles.grupoCampo}>
      <Text style={styles.label}>
        {titulo}
        <Text style={styles.requerido}> *</Text>
      </Text>

      <View style={styles.inputContenedor}>
        <View style={styles.iconoCampo}>
          <Ionicons
            name={icono}
            size={21}
            color="#6840B5"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9686B0"
          value={valor}
          onChangeText={cambiar}
          keyboardType={teclado}
          autoCorrect={false}
        />
      </View>
    </View>
  );
}

export default function RegistrarScreen({
  navigation,
  agregarMascota,
}) {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [propietario, setPropietario] = useState('');
  const [mostrarEspecies, setMostrarEspecies] = useState(false);

  const especies = ['Perro', 'Gato', 'Otro'];

  // LIMPIAR FORMULARIO
  const limpiarFormulario = () => {
    setNombre('');
    setEspecie('');
    setRaza('');
    setEdad('');
    setPropietario('');
    setMostrarEspecies(false);
  };

  // GUARDAR MASCOTA
  const guardarMascota = () => {
    if (
      !nombre.trim() ||
      !especie.trim() ||
      !raza.trim() ||
      !edad.trim() ||
      !propietario.trim()
    ) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, completá todos los campos.'
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

    // Guardar los datos en App.js
    agregarMascota({
      nombre: nombre.trim(),
      especie: especie.trim(),
      raza: raza.trim(),
      edad: edadNumero,
      propietario: propietario.trim(),
    });

    limpiarFormulario();

    Alert.alert(
      'Registro exitoso',
      'La mascota se registró correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate('Mascotas'),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* IMAGEN DE ENCABEZADO */}
        <View style={styles.banner}>
          <Image
            source={require('../assets/img/registro_mascotas.png')}
            style={styles.imagen}
            resizeMode="cover"
          />
        </View>

        {/* TÍTULO */}
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>
            Nuevo Amigo
          </Text>

          <Text style={styles.subtitulo}>
            Completá la información de tu mascota
            para registrarla en Mi Mundo Mascota.
          </Text>
        </View>

        {/* TARJETA DEL FORMULARIO */}
        <View style={styles.tarjeta}>
          <View style={styles.cabeceraFormulario}>
            <View style={styles.iconoPrincipal}>
              <Ionicons
                name="paw"
                size={27}
                color="#6840B5"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.tituloFormulario}>
                Datos de la Mascota
              </Text>

              <Text style={styles.descripcionFormulario}>
                Completá todos los campos
              </Text>
            </View>
          </View>

          {/* NOMBRE */}
          <Campo
            titulo="Nombre de la mascota"
            icono="person-outline"
            valor={nombre}
            cambiar={setNombre}
            placeholder="Ej. Luna"
          />

          {/* ESPECIE */}
          <View style={styles.grupoCampo}>
            <Text style={styles.label}>
              Especie
              <Text style={styles.requerido}> *</Text>
            </Text>

            <TouchableOpacity
              style={styles.inputContenedor}
              activeOpacity={0.8}
              onPress={() =>
                setMostrarEspecies(!mostrarEspecies)
              }
            >
              <View style={styles.iconoCampo}>
                <Ionicons
                  name="paw-outline"
                  size={21}
                  color="#6840B5"
                />
              </View>

              <Text
                style={[
                  styles.textoSelector,
                  !especie && styles.placeholderSelector,
                ]}
              >
                {especie || 'Seleccioná una especie'}
              </Text>

              <Ionicons
                name={
                  mostrarEspecies
                    ? 'chevron-up'
                    : 'chevron-down'
                }
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
          </View>

          {/* RAZA */}
          <Campo
            titulo="Raza"
            icono="fitness-outline"
            valor={raza}
            cambiar={setRaza}
            placeholder="Ej. Golden Retriever"
          />

          {/* EDAD */}
          <Campo
            titulo="Edad (años)"
            icono="calendar-outline"
            valor={edad}
            cambiar={setEdad}
            placeholder="Ej. 3"
            teclado="number-pad"
          />

          {/* PROPIETARIO */}
          <Campo
            titulo="Nombre del propietario"
            icono="person-circle-outline"
            valor={propietario}
            cambiar={setPropietario}
            placeholder="Ej. Ana Torres"
          />

          {/* BOTÓN GUARDAR */}
          <TouchableOpacity
            style={styles.botonGuardar}
            onPress={guardarMascota}
            activeOpacity={0.8}
          >
            <Ionicons
              name="paw"
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.textoGuardar}>
              Registrar Mascota
            </Text>
          </TouchableOpacity>

          {/* BOTÓN CANCELAR */}
          <TouchableOpacity
            style={styles.botonCancelar}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="close"
              size={22}
              color="#6840B5"
            />

            <Text style={styles.textoCancelar}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>

        {/* MENSAJE FINAL */}
        <Text style={styles.pie}>
          Los pequeños detalles hacen grandes historias
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

  scroll: {
    flex: 1,
  },

  contenido: {
    flexGrow: 1,
    paddingBottom: 35,
  },

  banner: {
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#EDE3FF',
  },

  imagen: {
    width: '100%',
    height: 175,
  },

  encabezado: {
    paddingHorizontal: 25,
    marginTop: 23,
    marginBottom: 20,
  },

  titulo: {
    fontSize: 29,
    fontWeight: '900',
    color: '#5836A5',
  },

  subtitulo: {
    fontSize: 14,
    color: '#777087',
    lineHeight: 21,
    marginTop: 8,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },

  cabeceraFormulario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  iconoPrincipal: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#EDE3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  tituloFormulario: {
    fontSize: 19,
    fontWeight: '800',
    color: '#302052',
  },

  descripcionFormulario: {
    fontSize: 13,
    color: '#8B7AA9',
    marginTop: 4,
  },

  grupoCampo: {
    marginTop: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#302052',
    marginBottom: 9,
  },

  requerido: {
    color: '#E05263',
  },

  inputContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD3F0',
    borderRadius: 13,
    backgroundColor: '#FCFAFF',
    paddingHorizontal: 12,
    minHeight: 54,
  },

  iconoCampo: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EDE3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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

  placeholderSelector: {
    color: '#9686B0',
  },

  opciones: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD3F0',
    borderRadius: 12,
    marginTop: 5,
    overflow: 'hidden',
  },

  opcion: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EAF8',
  },

  textoOpcion: {
    fontSize: 15,
    color: '#5836A5',
  },

  botonGuardar: {
    backgroundColor: '#6840B5',
    borderRadius: 15,
    paddingVertical: 17,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    elevation: 3,
  },

  textoGuardar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  botonCancelar: {
    borderWidth: 1.5,
    borderColor: '#7952CC',
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  textoCancelar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6840B5',
  },

  pie: {
    textAlign: 'center',
    color: '#7952CC',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 28,
    marginHorizontal: 25,
  },
});
