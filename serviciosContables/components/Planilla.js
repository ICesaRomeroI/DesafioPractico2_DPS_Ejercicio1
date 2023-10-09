import React from "react";
import {Text,StyleSheet,View,TouchableHighlight} from 'react-native';


const Planilla = ({item,eliminarEmpleado}) =>{  
    const dialogoEliminar = id =>{
        console.log('Eliminando......',id)
        eliminarEmpleado(id);
    }
    return(
        <View style={styles.empleado}> 
            <View>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.texto}>{item.nombre}</Text>
            </View>
            <View>
                <Text style={styles.label}>Apellido:</Text>
                <Text style={styles.texto}>{item.apellido}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sueldo Mensual:</Text>
                <Text style={styles.texto}>${item.sueldoMensual}</Text>
            </View>
            <View>
                <Text style={styles.label}>ISS:</Text>
                <Text style={styles.texto}>${item.iss}</Text>
            </View>
            <View>
                <Text style={styles.label}>AFP:</Text>
                <Text style={styles.texto}>${item.afp}</Text>
            </View>
            <View>
                <Text style={styles.label}>Renta:</Text>
                <Text style={styles.texto}>${item.renta}</Text>
            </View>
            <View>
                <Text style={styles.label}>Sueldo Neto:</Text>
                <Text style={styles.texto}>${item.sueldoNeto}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={() => dialogoEliminar(item.id)}
                style={styles.btnEliminar}
                >
                    <Text style={styles.textoEliminar}> &times; Eliminar &times; </Text>
                </TouchableHighlight>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    empleado:{
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom:'3%'
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    texto:{
        fontSize: 18,
    },
    btnEliminar:{
        width:'30%',
        padding: 5,
        backgroundColor: '#a62520',
        marginVertical: 10,
        alignSelf: 'center', 
        borderRadius:15,
    },
    textoEliminar:{
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default Planilla;