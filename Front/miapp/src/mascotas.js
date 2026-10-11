
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

// Imágenes de mascotas
const imagenPerro = require('../assets/img/perro.png');
const imagenGato = require('../assets/img/gato.png');

export default function MascotasScreen({
  navigation,
  mascotas = [],
  eliminarMascota,
}) {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Todas');

  // Seleccionar imagen según la especie
  const obtenerImagen = (especie) => {
    const tipo = especie.trim().toLowerCase();

    if (tipo === 'gato' || tipo === 'gata') {
      return imagenGato;
    }

    return imagenPerro;
  };

  // Filtrar mascotas por nombre, ID y especie
  const mascotasFiltradas = mascotas.filter((mascota) => {
    const texto = busqueda.trim().toLowerCase();
    const especie = mascota.especie.trim().toLowerCase();

    const coincideBusqueda =
      mascota.nombre.toLowerCase().includes(texto) ||
      String(mascota.id).includes(texto);

    let coincideEspecie = true;

    if (filtro === 'Perros') {
      coincideEspecie =
        especie === 'perro' || especie === 'perra';
    }

    if (filtro === 'Gatos') {
      coincideEspecie =
        especie === 'gato' || especie === 'gata';
    }

    return coincideBusqueda && coincideEspecie;
  });

  // Confirmar antes de eliminar
  const confirmarEliminar = (mascota) => {
    Alert.alert(
      'Eliminar mascota',
      `¿Estás seguro de eliminar a ${mascota.nombre}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarMascota(mascota.id),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contenidoScroll}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >

        {/* ENCABEZADO */}
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>
            Mis Mascotas
          </Text>

          <Text style={styles.subtitulo}>
            Administrá tus mascotas registradas
          </Text>

          <View style={styles.resumen}>
            <View style={styles.iconoResumen}>
              <Ionicons
                name="paw"
                size={27}
                color="#6840B5"
              />
            </View>

            <View>
              <Text style={styles.resumenNumero}>
                {mascotas.length}
              </Text>

              <Text style={styles.resumenTexto}>
                Mascotas registradas
              </Text>
            </View>
          </View>
        </View>

        {/* CONTENIDO */}
        <View style={styles.contenido}>

          {/* BUSCADOR */}
          <View style={styles.contenedorBuscador}>
            <Ionicons
              name="search-outline"
              size={22}
              color="#7952CC"
            />

            <TextInput
              style={styles.buscador}
              placeholder="Buscar por nombre o ID..."
              placeholderTextColor="#9686B0"
              value={busqueda}
              onChangeText={setBusqueda}
            />

            {busqueda.length > 0 && (
              <TouchableOpacity
                onPress={() => setBusqueda('')}
              >
                <Ionicons
                  name="close-circle"
                  size={21}
                  color="#9686B0"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* FILTROS */}
          <View style={styles.filtros}>
            {['Todas', 'Perros', 'Gatos'].map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={[
                  styles.filtroBoton,
                  filtro === opcion && styles.filtroActivo,
                ]}
                onPress={() => setFiltro(opcion)}
              >
                <Text
                  style={[
                    styles.filtroTexto,
                    filtro === opcion && styles.filtroTextoActivo,
                  ]}
                >
                  {opcion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* RESULTADOS */}
          <View style={styles.resultados}>
            <Text style={styles.resultadosTitulo}>
              Mascotas encontradas
            </Text>

            <Text style={styles.resultadosCantidad}>
              {mascotasFiltradas.length}
            </Text>
          </View>

          {/* LISTA DE MASCOTAS */}
          {mascotasFiltradas.length === 0 ? (
            <View style={styles.vacio}>
              <Ionicons
                name="paw-outline"
                size={55}
                color="#B8A0E6"
              />

              <Text style={styles.vacioTitulo}>
                No hay mascotas para mostrar
              </Text>

              <Text style={styles.vacioDescripcion}>
                {mascotas.length === 0
                  ? 'Registrá tu primera mascota para comenzar.'
                  : 'Probá cambiando la búsqueda o los filtros.'}
              </Text>
            </View>
          ) : (
            mascotasFiltradas.map((mascota) => (
              <View
                key={mascota.id}
                style={styles.tarjeta}
              >
                {/* INFORMACIÓN PRINCIPAL */}
                <View style={styles.infoPrincipal}>
                  <Image
                    source={obtenerImagen(mascota.especie)}
                    style={styles.imagenMascota}
                    resizeMode="cover"
                  />

                  <View style={styles.datos}>
                    <Text
                      style={styles.nombre}
                      numberOfLines={1}
                    >
                      {mascota.nombre}
                    </Text>

                    <Text
                      style={styles.especie}
                      numberOfLines={2}
                    >
                      {mascota.especie} - {mascota.raza}
                    </Text>

                    <View style={styles.etiquetaId}>
                      <Text style={styles.textoId}>
                        ID: {mascota.id}
                      </Text>
                    </View>

                    <View style={styles.edadContenedor}>
                      <Ionicons
                        name="calendar-outline"
                        size={15}
                        color="#7952CC"
                      />

                      <Text style={styles.edad}>
                        {mascota.edad} años
                      </Text>
                    </View>
                  </View>
                </View>

                {/* SEPARADOR */}
                <View style={styles.separador} />

                {/* PROPIETARIO */}
                <View style={styles.propietarioFila}>
                  <Ionicons
                    name="person-outline"
                    size={19}
                    color="#7952CC"
                  />

                  <Text
                    style={styles.propietario}
                    numberOfLines={2}
                  >
                    Propietario: {mascota.propietario}
                  </Text>
                </View>

                {/* BOTONES CRUD */}
                <View style={styles.filaBotones}>
                  <TouchableOpacity
                    style={styles.botonEditar}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('Editar', {
                        mascotaId: mascota.id,
                      })
                    }
                  >
                    <Ionicons
                      name="create-outline"
                      size={19}
                      color="#FFFFFF"
                    />

                    <Text style={styles.textoBoton}>
                      Editar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botonEliminar}
                    activeOpacity={0.8}
                    onPress={() => confirmarEliminar(mascota)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={19}
                      color="#FFFFFF"
                    />

                    <Text style={styles.textoBoton}>
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

          {/* BOTÓN AGREGAR */}
          <TouchableOpacity
            style={styles.botonAgregar}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Registrar')}
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#FFFFFF"
            />

            <Text style={styles.textoAgregar}>
              Registrar otra mascota
            </Text>
          </TouchableOpacity>

          <Text style={styles.pie}>
            Cuidando a nuestros mejores amigos
          </Text>

        </View>
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

  contenidoScroll: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  encabezado: {
    backgroundColor: '#6840B5',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  subtitulo: {
    fontSize: 14,
    color: '#E8DFFF',
    marginTop: 7,
  },

  resumen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    marginTop: 22,
  },

  iconoResumen: {
    width: 55,
    height: 55,
    backgroundColor: '#EDE3FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  resumenNumero: {
    fontSize: 28,
    fontWeight: '900',
    color: '#6840B5',
  },

  resumenTexto: {
    fontSize: 14,
    color: '#514568',
  },

  contenido: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  contenedorBuscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1D6F5',
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 2,
    minHeight: 55,
  },

  buscador: {
    flex: 1,
    fontSize: 15,
    color: '#30283D',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  filtros: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  filtroBoton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 13,
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0D4F5',
  },

  filtroActivo: {
    backgroundColor: '#6840B5',
    borderColor: '#6840B5',
  },

  filtroTexto: {
    color: '#6840B5',
    fontWeight: '700',
    fontSize: 13,
  },

  filtroTextoActivo: {
    color: '#FFFFFF',
  },

  resultados: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  resultadosTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#302052',
  },

  resultadosCantidad: {
    fontSize: 15,
    color: '#6840B5',
    fontWeight: 'bold',
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 16,
    elevation: 3,
  },

  infoPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imagenMascota: {
    width: 112,
    height: 125,
    borderRadius: 15,
    backgroundColor: '#EDE3FF',
  },

  datos: {
    flex: 1,
    paddingLeft: 15,
  },

  nombre: {
    fontSize: 22,
    fontWeight: '800',
    color: '#302052',
  },

  especie: {
    fontSize: 13,
    color: '#7952CC',
    marginTop: 5,
  },

  etiquetaId: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFE8FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },

  textoId: {
    fontSize: 12,
    color: '#6840B5',
    fontWeight: 'bold',
  },

  edadContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },

  edad: {
    fontSize: 14,
    color: '#514568',
  },

  separador: {
    height: 1,
    backgroundColor: '#F0EAF8',
    marginVertical: 15,
  },

  propietarioFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15,
  },

  propietario: {
    flex: 1,
    fontSize: 14,
    color: '#514568',
  },

  filaBotones: {
    flexDirection: 'row',
    gap: 12,
  },

  botonEditar: {
    flex: 1,
    backgroundColor: '#6840B5',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  botonEliminar: {
    flex: 1,
    backgroundColor: '#E05263',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  botonAgregar: {
    backgroundColor: '#6840B5',
    paddingVertical: 17,
    borderRadius: 15,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
  },

  textoAgregar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  vacio: {
    alignItems: 'center',
    paddingVertical: 65,
    paddingHorizontal: 20,
  },

  vacioTitulo: {
    fontSize: 18,
    color: '#5836A5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  vacioDescripcion: {
    fontSize: 14,
    color: '#777087',
    textAlign: 'center',
    marginTop: 10,
  },

  pie: {
    fontSize: 13,
    color: '#7952CC',
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 15,
  },
});
