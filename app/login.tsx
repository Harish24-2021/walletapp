import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { Button, Text, Card } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { generateCodeChallenge, generateCodeVerifier } from "./pkceUtils";
import Constants from "expo-constants";
import Axios from "axios";

const clientId =  "93483620654-bi8j5ardi768t1ovl6lc5qejj9lc0n0a.apps.googleusercontent.com"; // Replace with your actual client ID

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ setIsLoggedIn }) {
  const [token, setToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let codeVerifier = "";
  let codeChallenge = "";

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: clientId,
      redirectUri: AuthSession.makeRedirectUri(),
      responseType: "code",
      scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
      extraParams: {
        access_type: "offline",
        prompt: "consent",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      },
    },
    { authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth" }
  );

  useEffect(() => {
    const initOAuth = async () => {
      codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      if (response?.type === "success" && response.params.code) {
        exchangeCodeForToken(response.params.code);
      }
    };

    initOAuth();
  }, [response]);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: code,
          client_id: clientId,
          client_secret: Constants.expoConfig.extra.eas.clientSecret,
          redirect_uri: AuthSession.makeRedirectUri(),
          grant_type: "authorization_code",
        }),
      });

      const data = await response.json();
      setToken(data.access_token);
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert("Error", "Failed to authenticate.");
      console.error("Token exchange error:", error);
    }
  };

  const fetchGmailMessages = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.post("https://walletapp-backend-production.up.railway.app/api/fetchUserData", { token });
      setMessages(response.data.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch Gmail messages.");
      console.error("Error fetching Gmail messages:", error);
    }
    setIsLoading(false);
  };

  const processMessage = (message) => {
    const headers = message.payload.headers;
    return {
      from: headers.find((h) => h.name === "From")?.value || "Unknown",
      subject: headers.find((h) => h.name === "Subject")?.value || "No Subject",
      date: headers.find((h) => h.name === "Date")?.value || "Unknown Date",
    };
  };

  return (
    <View style={styles.container}>
      {!token ? (
        <Button mode="contained" onPress={() => promptAsync()} style={styles.loginButton}>
          Login with Google
        </Button>
      ) : (
        <View style={styles.content}>
          {messages.length === 0 ? (
            <Button mode="contained" onPress={fetchGmailMessages} style={styles.fetchButton}>
              Fetch Gmail Messages
            </Button>
          ) : (
            <View style={styles.messageContainer}>
              <Text style={styles.header}>Gmail Messages ({messages.length})</Text>
              {isLoading ? (
                <ActivityIndicator size="large" />
              ) : (
                <ScrollView>
                  {messages.map((message, index) => {
                    const { from, subject, date } = processMessage(message);
                    return (
                      <Card key={index} style={styles.card}>
                        <Card.Content>
                          <Text style={styles.messageTitle}>{subject}</Text>
                          <Text style={styles.messageFrom}>From: {from}</Text>
                          <Text style={styles.messageDate}>Date: {date}</Text>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  content: {
    width: "100%",
    maxWidth: 400,
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
  },
  fetchButton: {
    marginTop: 20,
  },
  messageContainer: {
    marginTop: 20,
    width: "100%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageFrom: {
    fontSize: 14,
    color: "#666",
  },
  messageDate: {
    fontSize: 12,
    color: "#999",
  },
});








// import React, { useEffect, useState } from "react";
// import { View, Button, Text, ScrollView, ActivityIndicator } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import * as AuthSession from "expo-auth-session";
// import { generateCodeChallenge, generateCodeVerifier } from "./pkceUtils";
// import Constants from "expo-constants";
// import Axios from "axios";

// // OAuth Config (clientId only)
// const clientId =
//   "93483620654-bi8j5ardi768t1ovl6lc5qejj9lc0n0a.apps.googleusercontent.com"; // Replace with your actual client ID

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen({ setIsLoggedIn }) {
//   const [token, setToken] = useState(
//     "ya29.a0AeXRPp4ElrWduVss9juT3uBhus3daPUKAVWr93PthEWUYs2ooxlHvlCb14Y3utxaNlQ2NLwRVunfQnTbHkgziju2hgh8wZhs7wZjfnTZ4ZRpL66JUhNV0k_wuzQ7yXYs4vf3Qr-x6pIE1fARn1TDNeQZlpH1k76RKjMBHK8UaCgYKAbwSARMSFQHGX2MiqrexkNo64dmhk6u1T_HVSg0175"
//   );
//   const [messages, setMessages] = useState([]); // State to store Gmail messages
//   const [isLoading, setIsLoading] = useState(false);
//   let codeVerifier = "";
//   let codeChallenge = "";
//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: clientId,
//       redirectUri: AuthSession.makeRedirectUri(),
//       responseType: "code",
//       scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
//       extraParams: {
//         access_type: "offline",
//         prompt: "consent",
//         code_challenge: codeChallenge,
//         code_challenge_method: "S256",
//       },
//     },
//     { authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth" }
//   );

//   useEffect(() => {
//     const initOAuth = async () => {
//       codeVerifier = generateCodeVerifier();
//       const codeChallenge = await generateCodeChallenge(codeVerifier);

//       if (response?.type === "success" && response.params.code) {
//         exchangeCodeForToken(response.params.code);
//       }
//     };

//     initOAuth();
//   }, [response]); // Added response to dependency array

//   const exchangeCodeForToken = async (code) => {
//     try {
//       const response = await fetch("https://oauth2.googleapis.com/token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           code: code,
//           client_id: clientId,
//           client_secret: Constants.expoConfig.extra.eas.clientSecret, // Replace with your actual client secret
//           redirect_uri: AuthSession.makeRedirectUri(),
//           grant_type: "authorization_code",
//         }),
//       });

//       const data = await response.json();
//       setToken(data.access_token);
//       console.log("Access Token:", data.access_token);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.error("Token exchange error:", error);
//     }
//   };

//   const fetchGmailMessages = async () => {
//     try {
//       setIsLoading(true);
//       Axios.post("http://localhost:5000/api/fetchUserData", {
//         token: token,
//       }).then((response) => {
//         console.log(response.data.data);
//         setMessages(response.data.data);
//         setIsLoading(false);
//       });
//     } catch (error) {
//       console.error("Error fetching Gmail messages:", error);
//     }
//   };

//   const processMessage = (message) => {
//     const messageData = message;
//     const data = messageData.payload;
//     const headers = data.headers;
//     const body = data.body;
//     const from = headers.find((header) => header.name === "From").value;
//     const subject = headers.find((header) => header.name === "Subject").value;
//     const date = headers.find((header) => header.name === "Date").value;
//     return {
//       from,
//       subject,
//       date,
//     };
//   };
//   console.log(messages, "messages");

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       {!token ? (
//         <Button title="Login with Google" onPress={() => promptAsync()} />
//       ) : (
//         <View>
//           {messages.length === 0 ? (
//             <Button title="Fetch Gmail Messages" onPress={fetchGmailMessages} />
//           ) : (
//             <View>
//               <Text>Gmail Messages: {messages.length.toString()}</Text>
//               {isLoading ?
//               <ActivityIndicator />:
//               <ScrollView>
//                 {messages &&
//                   messages.length &&
//                   messages?.map((message) => {
//                     const messageData = processMessage(message);
//                     return (
//                       <Text key={messageData.from}>
//                      From {messageData.from} 
//                      Date: {messageData.date}
//                      Subject: {messageData.subject}
//                       </Text>
//                     );
//                   })}
//               </ScrollView>}
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );
// }
