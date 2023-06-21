import {
  Box,
  Button,

  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import Message from "./components/Message";
import {
  signOut,
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./firebase";
import { useEffect, useRef, useState } from "react";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";



const auth = getAuth(app);
const db = getFirestore(app);
/* Login Handler */
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};
/* Log-Out Handler */
const logouthandler = () => {
  signOut(auth);
};

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForScroll = useRef(null);
  /* submit handler */
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createAt: serverTimestamp(),
      });
      // divForScroll.current.scrollIntoView({ behavior: "smooth" });
      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createAt", "asc"));

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
    const unsubscribeFormessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });
    return () => {
      unsubscribe();
      unsubscribeFormessage();
    };
  }, []);

  return (
    <Box bg={"red.50"}>
      {user ? (
        <Container h={"100vh"} bg={"white"}>
          <VStack h={"full"} bg={"telegram.100"} paddingY={4}>
            <Button onClick={logouthandler} colorScheme="green" w={"full"}>
              Logout
            </Button>
            <VStack
              h="full"
              w={"full"}
              bg={"purple.100"}
              overflowY={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  url={item.uri}
                ></Message>
              ))}
              <div ref={divForScroll}></div>
            </VStack>
            <form
              onSubmit={submithandler}
              style={{ width: "100%", backgroundColor: "gold" }}
            >
              <HStack>
                <Input
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value)
                  }}
                  placeholder="Enter a msg"
                ></Input>
                <Button colorScheme="purple" type="submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack bg={"white"} justifyContent={"center"} h={"100vh"}>
          <Button onClick={loginHandler} colorScheme="purple">
            Sign with Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
