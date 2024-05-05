import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import validate from "../../../../assets/img/validate.gif";
import QRCode from "react-qr-code";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import config from "../../../../urlLoader"

const WhatsAppBot = () => {
  const [serverMessage, setServerMessage] = useState("");
  const [numberBot, setNumberBot] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("serverMessage",serverMessage)
    console.log("numberBot",numberBot)
  }, [serverMessage,numberBot]);

  useEffect(() => {
    const newSocket = io(config.url, {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from server:", reason);
    });

    newSocket.on("qrCode", (message) => {
      console.log("Received server message:", message);
      setServerMessage(message);
    });

    newSocket.on("numberBot", (number) => {
      console.log("Received number bot:", number);
      setNumberBot(number);
    });

    setSocket(newSocket);

    return () => {
      // Nettoyer le socket lorsqu'il n'est plus utilisé
      newSocket.disconnect();
    };
  }, []);

  const handleDisconnect = () => {
    if (socket) {
      socket.emit("disconnectClient");
    }
  };

  return (
    <Box
      pt={{ base: "18px", md: "30px", xl: "30px" }}
      style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      {serverMessage !== "" && 
       serverMessage !== "disconnected" && 
       serverMessage !== "connected" && (
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "25%", width: "25%" }}
          value={serverMessage}
        />
      )}
      {serverMessage === "" && (
      <Flex alignItems='center' justifyContent='center'>
      <Spinner color='blue.500' size='xl' />
    </Flex>    
      )}
        {numberBot !== "" && serverMessage === "connected" && (
     <Box textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
     <Image width="70px" height="70px" src={validate} alt="Image Utilisateur Connecté" />
     <Text mt={4} fontSize="lg" fontWeight="bold">
       Bot connecté au numéro : {numberBot}
     </Text>
     <Text mt={2} fontSize="sm" color="red" onClick={handleDisconnect} cursor="pointer" fontStyle="italic">
       Déconnexion
     </Text>
   </Box>
     
      )}
      {serverMessage === "disconnected" && (
        <Box
          textAlign="center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Text mt={4} fontSize="lg" fontWeight="bold">  
          Déconnexion réussie, attendez le nouveau code QR.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default WhatsAppBot;
