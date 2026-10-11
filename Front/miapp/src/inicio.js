
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function InicioScreen({
  navigation,
  totalMascotas = 0,
}) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6840B5"
      />

      <ScrollView
        contentContainerStyle={styles.contenido}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.encabezado}>
          <Text style={styles.saludo}>
            BIENVENIDO A
          </Text>

          <Text style={styles.titulo}>
            Mi Mundo
          </Text>

          <Text style={styles.tituloDestacado}>
            Mascota
          </Text>

          <Text style={styles.descripcion}>
            Cuidá, registrá y organizá la información
            de tus mascotas en un solo lugar.
          </Text>
        </View>

        {/* Imagen principal */}
        <View style={styles.contenedorImagen}>
          <Image
            source={require('../assets/img/xdxd3.png')}
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>

        {/* Tarjeta de estadísticas */}
        <View style={styles.tarjetaEstadistica}>
          <View style={styles.iconoEstadistica}>
            <Text style={styles.numeroIcono}>01</Text>
          </View>

          <View style={styles.infoEstadistica}>
            <Text style={styles.etiqueta}>
              TOTAL DE MASCOTAS
            </Text>

            <Text style={styles.numero}>
              {totalMascotas}
            </Text>

            <Text style={styles.detalle}>
              Mascotas registradas
            </Text>
          </View>
        </View>

        {/* Botones de navegación */}
        <View style={styles.botones}>
          <TouchableOpacity
            style={styles.botonPrincipal}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Registrar')}
          >
            <Text style={styles.simbolo}>+</Text>
            <Text style={styles.textoPrincipal}>
              Registrar Mascota
            </Text>
            <Text style={styles.flechaPrincipal}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonSecundario}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Mascotas')}
          >
            <Text style={styles.iconoLista}>☰</Text>
            <Text style={styles.textoSecundario}>
              Ver Mis Mascotas
            </Text>
            <Text style={styles.flechaSecundaria}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Mensaje final */}
        <View style={styles.pie}>
          <Text style={styles.textoPie}>
            Porque ellos también son familia
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4FF',
  },

  contenido: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  encabezado: {
    backgroundColor: '#6840B5',
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 45,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  saludo: {
    color: '#E9DFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  tituloDestacado: {
    fontSize: 43,
    fontWeight: '900',
    color: '#E8D6FF',
  },

  descripcion: {
    color: '#F2EAFF',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 15,
  },

  contenedorImagen: {
    marginHorizontal: 29,
    marginTop: -24,
    backgroundColor: '#F0E8FF',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
  },

  imagen: {
    width: '100%',
    height: 244,

  },

  tarjetaEstadistica: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 25,
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  iconoEstadistica: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#EDE3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },

  numeroIcono: {
    color: '#6840B5',
    fontSize: 25,
    fontWeight: '900',
  },

  infoEstadistica: {
    flex: 1,
  },

  etiqueta: {
    fontSize: 12,
    color: '#8B7AA9',
    fontWeight: '700',
    letterSpacing: 1,
  },

  numero: {
    fontSize: 35,
    fontWeight: '900',
    color: '#6840B5',
    marginVertical: 3,
  },

  detalle: {
    fontSize: 13,
    color: '#777087',
  },

  botones: {
    marginHorizontal: 24,
    marginTop: 25,
    gap: 14,
  },

  botonPrincipal: {
    backgroundColor: '#6840B5',
    paddingHorizontal: 22,
    paddingVertical: 17,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },

  simbolo: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 15,
  },

  textoPrincipal: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  flechaPrincipal: {
    color: '#FFFFFF',
    fontSize: 30,
  },

  botonSecundario: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D9C9F4',
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconoLista: {
    fontSize: 23,
    color: '#6840B5',
    marginRight: 15,
  },

  textoSecundario: {
    flex: 1,
    color: '#6840B5',
    fontSize: 16,
    fontWeight: 'bold',
  },

  flechaSecundaria: {
    color: '#6840B5',
    fontSize: 30,
  },

  pie: {
    alignItems: 'center',
    marginTop: 34,
    paddingHorizontal: 20,
  },

  textoPie: {
    fontSize: 14,
    color: '#7952CC',
    fontWeight: '600',
    textAlign: 'center',
  },
});
