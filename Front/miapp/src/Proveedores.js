    import { View,Text } from "react-native";

    export function Proveedores({ Nombre, Direccion, Telefono, Correo }) {
        return (
            <View>
                <Text>{Nombre}</Text>
                <Text>{Direccion}</Text>
                <Text>{Telefono}</Text>
                <Text>{Correo}</Text>

            </View>
        );
    }