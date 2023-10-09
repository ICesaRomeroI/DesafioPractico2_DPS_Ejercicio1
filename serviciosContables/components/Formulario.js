import React, {useState} from 'react';
import {Text,StyleSheet,View,TextInput,TouchableHighlight,Alert,ScrollView} from 'react-native';
import shortid from 'react-id-generator';
import Colors from '../src/utils/Colors';


const Formulario = ({planillas,setPlanillas,guardarMostrarForm,guardarPlanillaStorage}) =>{
    //Variables

    const [nombre,guardarNombre] = useState('');
    const [apellido,guardarApellido] = useState('');
    const [sueldoMensual,guardarSueldoMensual] = useState('');
    let [sueldoNeto, guardarSueldoNeto] = useState('');
    let [iss, guardarISS] = useState('');
    let [afp, guardarAFP] = useState('');
    let [renta, guardarRenta] = useState('');
    

     // Función para validar letras
  const validarLetras = (texto) => {
    return /^[A-Za-z\s]+$/.test(texto);
  };

  // Función para validar números
  const validarNumeros = (texto) => {
    return /^\d+$/.test(texto);
  };

  // Función para manejar cambios en el campo Nombre
  const handleNombreChange = (texto) => {
    if (validarLetras(texto)) {
      guardarNombre(texto);
    }
  };

  // Función para manejar cambios en el campo Apellido
  const handleApellidoChange = (texto) => {
    if (validarLetras(texto)) {
      guardarApellido(texto);
    }
  };

  // Función para manejar cambios en el campo Sueldo Mensual
  const handleSueldoMensualChange = (texto) => {
    if (validarNumeros(texto)) {
      guardarSueldoMensual(texto);
    }
  };

    //crear planilla
    const crearPlanilla = () =>{
        if (
            nombre.trim().length === 0 ||
            apellido.trim().length === 0 ||
            sueldoMensual.trim().length === 0 
        ) {
             //falla la validacion
             mostrarAlerta();
             return;
        } else {
        
            calcularSueldoNeto();
           
        }
    
        const planilla = {nombre,apellido,sueldoMensual,iss,afp,renta,sueldoNeto};
        planilla.id = shortid();
    
        const planillasNuevo = [...planillas,planilla];
        setPlanillas(planillasNuevo);
    
        guardarPlanillaStorage(JSON.stringify(planillasNuevo));
    
        guardarMostrarForm(false);
        guardarNombre('');
        guardarApellido('');
        guardarSueldoMensual('');
        guardarSueldoNeto('');
        guardarAFP('');
        guardarISS('');
        guardarRenta('');
    }
    const calcularSueldoNeto = () =>{
         iss = (parseFloat(sueldoMensual) * 0.03).toFixed(2);
         afp = (parseFloat(sueldoMensual) * 0.0725).toFixed(2);
         renta = 0;

        if (sueldoMensual <= 325) {
            renta = 0;
            sueldoNeto = (sueldoMensual-renta-iss-afp).toFixed(2);
            
        } else if (sueldoMensual > 325 && sueldoMensual <=700) {
            renta = (sueldoMensual*0.15).toFixed(2);
            sueldoNeto = (sueldoMensual-renta-iss-afp).toFixed(2);

        } else if (sueldoMensual > 700 && sueldoMensual <=1200) {
            renta = (sueldoMensual*0.17).toFixed(2);
            sueldoNeto = (sueldoMensual-renta-iss-afp).toFixed(2);
                 
        } else if (sueldoMensual > 1200 && sueldoMensual <=2200) {
            renta = (sueldoMensual*0.21).toFixed(2);
            sueldoNeto = (sueldoMensual-renta-iss-afp).toFixed(2);

        } else if (sueldoMensual > 2200 && sueldoMensual <=3700) {
            renta = (sueldoMensual*0.25).toFixed(2);
            sueldoNeto = (sueldoMensual-renta-iss-afp).toFixed(2);

        } else if (sueldoMensual > 3700 ) {
            renta = (sueldoMensual*0.29).toFixed(2);
            sueldoNeto = (sueldoMensual-renta-iss-afp).toFixed(2);

        }else{

        }

        guardarISS(iss);
        guardarAFP(afp);
        guardarRenta(renta);
        guardarSueldoNeto(sueldoNeto)
        
         
    }

    const mostrarAlerta = () =>{
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    return(
        <>
        <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNombreChange}
          value={nombre}
        />
      </View>
      <View>
        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleApellidoChange}
          value={apellido}
        />
      </View>
      <View>
        <Text style={styles.label}>Sueldo Mensual:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleSueldoMensualChange}
          value={sueldoMensual}
        />
      </View>
      <View>
      <TouchableHighlight
        onPress={() => {
        crearPlanilla();
        }}
        style={styles.btnSubmit}
      >
        <Text style={styles.textoSubmit}>Agregar Empleado a planilla</Text>
      </TouchableHighlight>
      </View>
    </ScrollView>
        
        </>
    )


}
const styles = StyleSheet.create({
    formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1
    },
    label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20
    },
    input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
    },
    btnSubmit: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10
    },
    textoSubmit: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
    }
    })

    export default Formulario;