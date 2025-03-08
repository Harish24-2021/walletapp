import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

// OAuth Config
const clientId = "93483620654-bi8j5ardi768t1ovl6lc5qejj9lc0n0a.apps.googleusercontent.com";
const redirectUri = AuthSession.makeRedirectUri(); // Auto-generates correct URI

// Define Discovery Document (Gmail API Endpoints)
const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [token, setToken] = useState<string | null>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      redirectUri,
      responseType: "token",
      scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.params.access_token);
      console.log("Access Token:", response.params.access_token);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login to Read Gmail Transactions</Text>
      <Button title="Login with Google" onPress={() => promptAsync()} />
      {token && <Text>Authenticated! Token Received.</Text>}
    </View>
  );
}
