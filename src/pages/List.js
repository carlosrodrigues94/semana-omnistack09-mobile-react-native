import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Image,
  Alert
} from "react-native";
//Componente criado do total zero
import SpotList from "../components/SpotList";
import logo from "../assets/logo.png";
// Vai buscar as technologias armazenadas no storage usando o useState
// deixar o segundo array vazio do useEffect para ele executar uma unica vez a função

export default function List() {
  const [techs, setTechs] = useState([]);
  // vai ficar assim depois [ReactJS, [Node.js]]

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.1.6:8081", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("techs").then(storagedTechs => {
      const techsArray = storagedTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);
  return (
    <SafeAreaView style={StyleSheet.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {/*Percorre o array de technologias e para cada tech ele retorna 
    o que foi passado ali depois da arrow function, cada vez que usa o map tem que passar uma key */}
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
