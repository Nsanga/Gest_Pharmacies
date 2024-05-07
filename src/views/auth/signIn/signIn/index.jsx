import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
// import { Logo } from './logo'
import { PasswordField } from "./PasswordField";
import { connect, useDispatch } from "react-redux";
import { useState } from "react";
import logo from "assets/img/pharmacieUSSD.png";
import { loginRequest } from "redux/login/action";

const SignIn = ({ error }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    setUsernameError("");
    setPasswordError("");

    // Vérifiez les champs manquants et mettez à jour les messages d'erreur
    if (!username) {
      setUsernameError("Veuillez entrer votre nom d'utilisateur.");
    }

    if (!password) {
      setPasswordError("Veuillez entrer votre mot de passe.");
    }

    // Si des champs sont manquants, arrêtez la procédure de connexion
    if (!username || !password) {
      return;
    }

    setIsLoading(true);

    try {
      dispatch(loginRequest(username, password));
      // Simulez une attente (remplacez cela par votre logique de connexion réelle)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Une fois la connexion réussie ou échouée, arrêtez le chargement
      setIsLoading(false);
      setDisplayAlert(true);
    } catch (error) {
      // Gérer les erreurs ici
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        // md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="6">
        <Stack
          spacing={{ base: "2", lg: "4" }}
          align="center"
          justifyContent="center"
        >
          <Image
            src={logo}
            width={{ base: 100, lg: 150 }}
            height={{ base: 100, lg: 120 }}
            objectFit="contain"
          />
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}
            >
              Connectez-vous à votre compte
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "gray.100",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isRequired>
                <FormLabel htmlFor="phone-number">Nom d'utilisateur</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
              </FormControl>
              <PasswordField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </Stack>
            <Stack spacing="6">
              <Button
                bg="blue"
                color="white"
                isLoading={isLoading}
                loadingText="Connexion"
                spinnerPlacement="end"
                _hover={{ bg: "blue.500", color: "white" }}
                onClick={handleLogin}
              >
                Connexion
              </Button>
            </Stack>
            {displayAlert && (
              <Alert
                status="error"
                variant="solid"
                transition="all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)"
                transform="translateY(100)"
                opacity={1}
                my={4}
              >
                <AlertIcon />
                {error}
              </Alert>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

const mapStateToProps = ({ LoginReducer }) => ({
  token: LoginReducer.token,
  loading: LoginReducer.loading,
  error: LoginReducer.error,
});

export default connect(mapStateToProps)(SignIn);
