import * as React from "react";
import { Container, Content } from "native-base";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { AppFooter } from "./components/AppFooter";
import { NativeRouter, Route } from "react-router-native";
import { Cities } from "./components/cities/Cities";
import { Provider as PaperProvider } from "react-native-paper";
import { City } from "./components/city/City";

const App = () => {
  return (
    <PaperProvider>
      <NativeRouter>
        <Container>
          <ImageBackground
            source={require("./images/background.png")}
            style={styles.back}
          >
            <Content>
              <View style={styles.container}>
                <Route exact path="/" component={City} />
                <Route path="/allCities/:isStar" component={Cities} />
                <Route exact path="/allCities" component={Cities} />
                <Route path="/city/:id" component={City} />
                <Route exact active path="/city" component={City} />
              </View>
            </Content>
          </ImageBackground>
          <AppFooter />
        </Container>
      </NativeRouter>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  back: {
    flex: 1,
    flexDirection: "column",
    resizeMode: "stretch",
  },
});

export default App;
