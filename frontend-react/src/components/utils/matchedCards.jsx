import React, { useEffect, useState } from "react";
import ChatComponent from '../ChatComponents';



function MatchedCards(props) {
  // eslint-disable-next-line
  const { element } = props;
  const [matches, setMatches] = useState([]);
  const [values, setValues] = useState([]);
  const [chatStates, setChatStates] = useState({}); // Manage chat status for each user
  // eslint-disable-next-line
  const [ userName,setUserName] = useState('')
 
  useEffect(() => {
    // eslint-disable-next-line
    setMatches(props.element);
    // eslint-disable-next-line
    console.log(props.element);
    // eslint-disable-next-line
    setValues(props.element[0]?.values || []);

    // Initialising the Chat Status Object
    const initialChatStates = {};
    // eslint-disable-next-line
    props.element.forEach(match => {
      initialChatStates[match.name] = false; //  Initial state is off
    });
    setChatStates(initialChatStates);
    // eslint-disable-next-line
  }, [props.element]);

  useEffect(() => {
    if (element) {
        setMatches(element);
        // eslint-disable-next-line
        setValues(element[0]?.values || []);
      // Getting a username from local storage
      const storedUserName =  JSON.parse(window.localStorage.getItem('user')).name ;
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, []);

  const handleConnectClick = (match) => {
    const subject = encodeURIComponent("Someone has connected with you!");
    const body = encodeURIComponent(
      `Hello ${match.name} I can see that we are interested in similar values, and I would love to connect with you!`
    );

    const mailtoLink = `mailto:${match.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };

  const toggleChat = (user) => {
    // Toggles the state of the chat box with the specified user
    setChatStates(prevStates => ({
      ...prevStates,
      [user]: !prevStates[user]
    }));
  };

  return (
    <div className="flex flex-row flex-wrap justify-center mt-20 ">
      {matches.map((match) => (
        <div key={match._id} className="rounded-lg shadow-xl m-4 p-4">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold underline underline-offset-4">
                {match.name}
              </h1>
              <div className="flex items-center mt-8 gap-2 row-span-2">
                {values.map((value) => (
                  <div key={value} className="items-center">
                    <div
                      className="text-lg border-2 border-black rounded-md h-max w-max p-2 shadow-xl
                  hover:scale-105 hover:bg-GoodBridge_Cream"
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
             {/* Add Connect button and bind corresponding handler function */}
              <button
                className="rounded-lg hover:shadow-inner m-4 p-4 hover:bg-GoodBridge_Cream hover:scale-105"
                onClick={() => handleConnectClick(match)}
              >
                Email  {match.name}
              </button>
               {/* Add Chat button and bind corresponding handler function */}
              <button
                className="rounded-lg hover:shadow-inner m-4 p-4 hover:bg-GoodBridge_Cream hover:scale-105"
                onClick={() => toggleChat(match.name)}
              >
                Chat with {match.name}
              </button>
            </div>
            <div className="flex flex-col"></div>
          </div>
        </div>
      ))}
      {/* Renders the chat box based on the state of the chat */}
      {matches.map((match) => (
        chatStates[match.name] && 
       
        <ChatComponent
          key={match.name}
          sender={userName}
          receiver={match.name} 
          closeChat={() => toggleChat(match.name)}
        />
      ))}
    </div>
  );
}

export default MatchedCards;