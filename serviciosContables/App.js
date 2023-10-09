import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight,
TouchableWithoutFeedback, Keyboard, Platform, Image } from 'react-native';
import Formulario from './components/Formulario';
import Planilla from './components/Planilla';
import Colors from './src/utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [planillas,setPlanilla] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() =>{ 
    obtenerPlanillaStorage = async () =>{
    try {
      const planillaStorage = await AsyncStorage.getItem('planilla');
      if (planillaStorage) {
        setPlanilla(JSON.parse(planillaStorage))
      }
    } catch (error) {
      console.log(error);
    }
    obtenerPlanillaStorage();
    }
},[]);


  const eliminarEmpleado = id => {
    const planillaFiltradas = planillas.filter(planilla => planilla.id !== id);
    setPlanilla(planillaFiltradas);
    guardarPlanillaStorage(JSON.stringify(planillaFiltradas));
  }

  const mostrarFormulario = () =>{
    guardarMostrarForm(!mostrarForm);
  }
  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  }

  const guardarPlanillaStorage = async (planillasJSON) =>{
    try {
      await AsyncStorage.setItem('planilla',planillasJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}> 
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Servicios Contables S.A. de C.V.</Text>
          <Image source={require("./src/utils/img/planilla.png")} style={styles.logo} />
          <View>
        <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
          <Text style={styles.textoMostrarForm}>{mostrarForm ? 'Cancelar Agregar Empleado' : 'Agregar Nuevo Empleado'}</Text>
        </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm?(
            <>
            <Text style={styles.titulo}>Agregar Nuevo Empleado</Text>
            <Formulario
            planillas={planillas}
            setPlanillas={setPlanilla}
            guardarMostrarForm={guardarMostrarForm}
            guardarPlanillaStorage={guardarPlanillaStorage}
            />
            </>
          ):(
            <>
            <View style={styles.tituloContainer}>
            <Text style={styles.tituloCont}>{planillas.length > 0 ? 'Administrar Empleados' : 'No hay empleados, agregue uno nuevo'}</Text>
            </View>
            <FlatList
            style={styles.listado}
            data={planillas}
            renderItem={({item}) => <Planilla item={item}
            eliminarEmpleado={eliminarEmpleado}/>}
            />
            </>
          )
        }
        </View>
        </View>
    </TouchableWithoutFeedback>
    </>
  )
}
const styles = StyleSheet.create({
  contenedor: {
  backgroundColor: Colors.PRIMARY_COLOR,
  flex: 1
  },
  titulo: {
  color: '#FFF',
  marginTop: Platform.OS === 'ios' ? 40 : 20,
  marginBottom: 20,
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center'
  },
  tituloCont: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
    },
  tituloContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenido: {
  flex: 1,
  marginHorizontal: '2.5%',
  },
  listado: {
  flex: 1,
  },
  btnMostrarForm: {
  padding: 10,
  backgroundColor: Colors.BUTTON_COLOR,
  marginVertical: 10
  },
  textoMostrarForm: {
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center'
  },
  logo: {
    width: 60,  
    height: 60,
    marginLeft: '40%',
    position: "relative",
  },
  });
export default App;